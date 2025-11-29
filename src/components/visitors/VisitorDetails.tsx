import React from 'react';
import { Visitor } from '@/types';
import { Badge } from '@/components/common';
import { format } from 'date-fns';
import {
  Mail,
  Phone,
  Building,
  FileText,
  Users,
  Calendar,
  Clock,
  IdCard,
  Car,
} from 'lucide-react';

interface VisitorDetailsProps {
  visitor: Visitor;
}

export const VisitorDetails: React.FC<VisitorDetailsProps> = ({ visitor }) => {
  const getStatusBadge = (status: Visitor['status']) => {
    switch (status) {
      case 'checked-in':
        return <Badge variant="success">Checked In</Badge>;
      case 'checked-out':
        return <Badge variant="default">Checked Out</Badge>;
      case 'expected':
        return <Badge variant="warning">Expected</Badge>;
      default:
        return null;
    }
  };

  const DetailRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | undefined;
  }> = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-0">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-1">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{visitor.fullName}</h3>
          <p className="text-sm text-gray-500 mt-1">Visitor Code: {visitor.visitorCode}</p>
        </div>
        {getStatusBadge(visitor.status)}
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
        <div className="space-y-0">
          <DetailRow icon={<Mail size={18} />} label="Email" value={visitor.email} />
          <DetailRow icon={<Phone size={18} />} label="Phone" value={visitor.phoneNumber} />
          <DetailRow icon={<Building size={18} />} label="Company" value={visitor.company} />
        </div>
      </div>

      {/* Visit Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Visit Information</h4>
        <div className="space-y-0">
          <DetailRow
            icon={<Users size={18} />}
            label="Host Staff"
            value={visitor.hostStaffName}
          />
          <DetailRow icon={<FileText size={18} />} label="Purpose" value={visitor.purpose} />
          <DetailRow
            icon={<Calendar size={18} />}
            label="Check-in Date"
            value={format(new Date(visitor.checkInTime), 'MMMM dd, yyyy')}
          />
          <DetailRow
            icon={<Clock size={18} />}
            label="Check-in Time"
            value={format(new Date(visitor.checkInTime), 'hh:mm a')}
          />
          {visitor.checkOutTime && (
            <DetailRow
              icon={<Clock size={18} />}
              label="Check-out Time"
              value={format(new Date(visitor.checkOutTime), 'hh:mm a')}
            />
          )}
        </div>
      </div>

      {/* Identification */}
      {(visitor.idType || visitor.idNumber || visitor.vehicleNumber) && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Identification</h4>
          <div className="space-y-0">
            {visitor.idType && (
              <DetailRow
                icon={<IdCard size={18} />}
                label="ID Type"
                value={visitor.idType.replace('-', ' ').toUpperCase()}
              />
            )}
            {visitor.idNumber && (
              <DetailRow icon={<IdCard size={18} />} label="ID Number" value={visitor.idNumber} />
            )}
            {visitor.vehicleNumber && (
              <DetailRow
                icon={<Car size={18} />}
                label="Vehicle Number"
                value={visitor.vehicleNumber}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
