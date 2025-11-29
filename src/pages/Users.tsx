import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button, Modal, Table, Badge } from '@/components/common';
import { UserForm } from '@/components/users/UserForm';
import { useUserStore } from '@/stores/userStore';
import { User, CreateUserData, UpdateUserData } from '@/types';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Users: React.FC = () => {
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUserStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      await fetchUsers();
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleCreateUser = async (data: CreateUserData | UpdateUserData) => {
    try {
      await createUser(data as CreateUserData);
      toast.success('User created successfully');
      setIsCreateModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create user');
      throw error;
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (data: CreateUserData | UpdateUserData) => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.id, data as UpdateUserData);
      toast.success('User updated successfully');
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user');
      throw error;
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      try {
        await deleteUser(user.id);
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge variant="danger">Admin</Badge>;
      case 'Security Officer':
        return <Badge variant="info">Security Officer</Badge>;
      case 'Receptionist':
        return <Badge variant="success">Receptionist</Badge>;
      default:
        return <Badge variant="default">{role}</Badge>;
    }
  };

  const columns = [
    {
      key: 'fullName',
      header: 'Name',
      render: (user: User) => (
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => getRoleBadge(user.role),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditUser(user);
            }}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Edit User"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(user);
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Delete User"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header
        title="Staff Management"
        subtitle="Manage system users and their roles"
        action={
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center">
            <UserPlus size={18} className="mr-2" />
            New User
          </Button>
        }
      />

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : (
          <Table data={users} columns={columns} emptyMessage="No users found" />
        )}
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
        size="md"
      >
        <UserForm onSubmit={handleCreateUser} onCancel={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Edit User"
        size="md"
      >
        {selectedUser && (
          <UserForm
            initialData={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            isEdit
          />
        )}
      </Modal>
    </div>
  );
};
