import React from 'react';
import { Visitor } from '@/types';
import { Table, Badge } from '@/components/common';
import { format } from 'date-fns';
import { Eye, Printer, LogOut } from 'lucide-react';

interface VisitorListProps {
  visitors: Visitor[];
  onViewDetails: (visitor: Visitor) => void;
  onPrintBadge: (visitor: Visitor) => void;
  onCheckOut: (visitor: Visitor) => void;
}

export const VisitorList: React.FC<VisitorListProps> = ({
  visitors,
  onViewDetails,
  onPrintBadge,
  onCheckOut,
}) => {
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

  const columns = [
    {
      key: 'fullName',
      header: 'Visitor Name',
      render: (visitor: Visitor) => (
        <div>
          <p className="font-medium">{visitor.fullName}</p>
          <p className="text-xs text-gray-500">{visitor.email}</p>
        </div>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Phone',
    },
    {
      key: 'company',
      header: 'Company',
      render: (visitor: Visitor) => visitor.company || '-',
    },
    {
      key: 'hostStaffName',
      header: 'Host Staff',
    },
    {
      key: 'checkInTime',
      header: 'Check In',
      render: (visitor: Visitor) => (
        <div>
          <p>{format(new Date(visitor.checkInTime), 'MMM dd, yyyy')}</p>
          <p className="text-xs text-gray-500">
            {format(new Date(visitor.checkInTime), 'hh:mm a')}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (visitor: Visitor) => getStatusBadge(visitor.status),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (visitor: Visitor) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(visitor);
            }}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrintBadge(visitor);
            }}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
            title="Print Badge"
          >
            <Printer size={18} />
          </button>
          {visitor.status === 'checked-in' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCheckOut(visitor);
              }}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Check Out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      data={visitors}
      columns={columns}
      onRowClick={onViewDetails}
      emptyMessage="No visitors found"
    />
  );
};
