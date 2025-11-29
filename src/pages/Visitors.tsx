import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button, Modal } from '@/components/common';
import { VisitorForm } from '@/components/visitors/VisitorForm';
import { VisitorList } from '@/components/visitors/VisitorList';
import { VisitorDetails } from '@/components/visitors/VisitorDetails';
import { VisitorBadge } from '@/components/visitors/VisitorBadge';
import { SearchVisitors } from '@/components/dashboard/SearchVisitors';
import { useVisitorStore } from '@/stores/visitorStore';
import { useUserStore } from '@/stores/userStore';
import { Visitor, VisitorFormData, VisitorSearchParams } from '@/types';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export const Visitors: React.FC = () => {
  const { visitors, loading, fetchVisitors, createVisitor, checkOutVisitor } =
    useVisitorStore();
  const { users, fetchUsers } = useUserStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setFilteredVisitors(visitors);
  }, [visitors]);

  const loadData = async () => {
    try {
      await Promise.all([fetchVisitors(), fetchUsers()]);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleCreateVisitor = async (data: VisitorFormData) => {
    try {
      await createVisitor(data);
      toast.success('Visitor created successfully');
      setIsCreateModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create visitor');
      throw error;
    }
  };

  const handleViewDetails = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setIsDetailsModalOpen(true);
  };

  const handlePrintBadge = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setIsBadgeModalOpen(true);
  };

  const handleCheckOut = async (visitor: Visitor) => {
    if (window.confirm(`Are you sure you want to check out ${visitor.fullName}?`)) {
      try {
        await checkOutVisitor(visitor.id);
        toast.success('Visitor checked out successfully');
      } catch (error) {
        toast.error('Failed to check out visitor');
      }
    }
  };

  const handleSearch = (params: VisitorSearchParams) => {
    let filtered = [...visitors];

    if (params.visitorName) {
      filtered = filtered.filter((v) =>
        v.fullName.toLowerCase().includes(params.visitorName!.toLowerCase())
      );
    }

    if (params.hostStaffId) {
      filtered = filtered.filter((v) => v.hostStaffId === params.hostStaffId);
    }

    if (params.dateFrom) {
      filtered = filtered.filter(
        (v) => new Date(v.checkInTime) >= new Date(params.dateFrom!)
      );
    }

    if (params.dateTo) {
      filtered = filtered.filter((v) => new Date(v.checkInTime) <= new Date(params.dateTo!));
    }

    setFilteredVisitors(filtered);
  };

  return (
    <div>
      <Header
        title="Visitors"
        subtitle="Manage all visitor check-ins and check-outs"
        action={
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center">
            <UserPlus size={18} className="mr-2" />
            New Visitor
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Search */}
        <SearchVisitors
          onSearch={handleSearch}
          staffMembers={users.map((u) => ({ id: u.id, name: u.fullName }))}
        />

        {/* Visitor List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading visitors...</p>
          </div>
        ) : (
          <VisitorList
            visitors={filteredVisitors}
            onViewDetails={handleViewDetails}
            onPrintBadge={handlePrintBadge}
            onCheckOut={handleCheckOut}
          />
        )}
      </div>

      {/* Create Visitor Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Register New Visitor"
        size="lg"
      >
        <VisitorForm onSubmit={handleCreateVisitor} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* Visitor Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Visitor Details"
        size="md"
      >
        {selectedVisitor && <VisitorDetails visitor={selectedVisitor} />}
      </Modal>

      {/* Visitor Badge Modal */}
      <Modal
        isOpen={isBadgeModalOpen}
        onClose={() => {
          setIsBadgeModalOpen(false);
          setSelectedVisitor(null);
        }}
        title="Visitor Badge"
        size="md"
      >
        {selectedVisitor && <VisitorBadge visitor={selectedVisitor} />}
      </Modal>
    </div>
  );
};
