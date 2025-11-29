import React from 'react';
import { Visitor } from '@/types';
import { Badge } from '@/components/common';
import { format } from 'date-fns';

interface RecentVisitorsProps {
  visitors: Visitor[];
  onViewAll: () => void;
}

export const RecentVisitors: React.FC<RecentVisitorsProps> = ({ visitors, onViewAll }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Visitors</h3>
        <button
          onClick={onViewAll}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {visitors.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recent visitors</p>
        ) : (
          visitors.slice(0, 5).map((visitor) => (
            <div
              key={visitor.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {visitor.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{visitor.fullName}</p>
                  <p className="text-xs text-gray-500">
                    Host: {visitor.hostStaffName}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(visitor.status)}
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(visitor.checkInTime), 'hh:mm a')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
