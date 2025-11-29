import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from '@/components/common';
import { VisitorFormData, User } from '@/types';
import { userService } from '@/services/userService';
import toast from 'react-hot-toast';

interface VisitorFormProps {
  initialData?: Partial<VisitorFormData>;
  onSubmit: (data: VisitorFormData) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

export const VisitorForm: React.FC<VisitorFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<VisitorFormData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    company: initialData?.company || '',
    purpose: initialData?.purpose || '',
    hostStaffId: initialData?.hostStaffId || '',
    hostStaffName: initialData?.hostStaffName || '',
    idType: initialData?.idType || '',
    idNumber: initialData?.idNumber || '',
    vehicleNumber: initialData?.vehicleNumber || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [staffMembers, setStaffMembers] = useState<User[]>([]);

  useEffect(() => {
    loadStaffMembers();
  }, []);

  const loadStaffMembers = async () => {
    try {
      const users = await userService.getUsers();
      setStaffMembers(users);
    } catch (error) {
      toast.error('Failed to load staff members');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // If hostStaffId changes, update hostStaffName
    if (name === 'hostStaffId') {
      const staff = staffMembers.find((s) => s.id === value);
      setFormData((prev) => ({
        ...prev,
        hostStaffId: value,
        hostStaffName: staff?.fullName || '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose of visit is required';
    }

    if (!formData.hostStaffId) {
      newErrors.hostStaffId = 'Host staff is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Doe"
          required
        />

        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="+1234567890"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john@example.com"
        />

        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name"
        />

        <Select
          label="ID Type"
          name="idType"
          value={formData.idType}
          onChange={handleChange}
          options={[
            { value: '', label: 'Select ID Type' },
            { value: 'passport', label: 'Passport' },
            { value: 'driver-license', label: "Driver's License" },
            { value: 'national-id', label: 'National ID' },
            { value: 'other', label: 'Other' },
          ]}
        />

        <Input
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="ID number"
        />

        <Input
          label="Vehicle Number"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="ABC-1234"
        />

        <Select
          label="Host Staff"
          name="hostStaffId"
          value={formData.hostStaffId}
          onChange={handleChange}
          error={errors.hostStaffId}
          options={[
            { value: '', label: 'Select Host Staff' },
            ...staffMembers.map((staff) => ({
              value: staff.id,
              label: staff.fullName,
            })),
          ]}
          required
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purpose of Visit <span className="text-red-500">*</span>
        </label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={(e) => handleChange(e as any)}
          className="input-field min-h-[100px]"
          placeholder="Describe the purpose of visit"
          required
        />
        {errors.purpose && (
          <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? 'Update' : 'Create'} Visitor
        </Button>
      </div>
    </form>
  );
};
