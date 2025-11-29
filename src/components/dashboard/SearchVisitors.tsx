import React, { useState } from 'react';
import { Input, Select, Button } from '@/components/common';
import { Search } from 'lucide-react';
import { VisitorSearchParams } from '@/types';

interface SearchVisitorsProps {
  onSearch: (params: VisitorSearchParams) => void;
  staffMembers: Array<{ id: string; name: string }>;
}

export const SearchVisitors: React.FC<SearchVisitorsProps> = ({ onSearch, staffMembers }) => {
  const [searchParams, setSearchParams] = useState<VisitorSearchParams>({
    visitorName: '',
    dateFrom: '',
    dateTo: '',
    hostStaffId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove empty values
    const filteredParams = Object.entries(searchParams).reduce(
      (acc, [key, value]) => {
        if (value) acc[key as keyof VisitorSearchParams] = value;
        return acc;
      },
      {} as VisitorSearchParams
    );
    onSearch(filteredParams);
  };

  const handleReset = () => {
    setSearchParams({
      visitorName: '',
      dateFrom: '',
      dateTo: '',
      hostStaffId: '',
    });
    onSearch({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Visitors</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Visitor Name"
            name="visitorName"
            value={searchParams.visitorName}
            onChange={handleChange}
            placeholder="Search by name"
          />

          <Select
            label="Host Staff"
            name="hostStaffId"
            value={searchParams.hostStaffId}
            onChange={handleChange}
            options={[
              { value: '', label: 'All Staff' },
              ...staffMembers.map((staff) => ({
                value: staff.id,
                label: staff.name,
              })),
            ]}
          />

          <Input
            label="Date From"
            name="dateFrom"
            type="date"
            value={searchParams.dateFrom}
            onChange={handleChange}
          />

          <Input
            label="Date To"
            name="dateTo"
            type="date"
            value={searchParams.dateTo}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-3">
          <Button type="submit" className="flex items-center">
            <Search size={16} className="mr-2" />
            Search
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
