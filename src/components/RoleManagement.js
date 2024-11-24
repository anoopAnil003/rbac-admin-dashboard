import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import RoleDataTable from './RoleDataTable';
import AddEditRoleDialog from './AddEditRoleDialog';

const RoleManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editRole, setEditRole] = useState(null); // Track the role being edited
  const [roles, setRoles] = useState([
    { id: 1, roleName: 'Admin', permissions: 'Read, Write, Delete' },
    { id: 2, roleName: 'User', permissions: 'Read' },
  ]);

  // Open dialog for adding a new role
  const handleAddRole = () => {
    setEditRole(null); // No role to edit
    setOpenDialog(true);
  };

  // Open dialog for editing an existing role
  const handleEditRole = (role) => {
    setEditRole(role); // Set role to edit
    setOpenDialog(true);
  };

  // Save role after adding or editing
  const handleSaveRole = (newRole) => {
    if (editRole) {
      // Update the existing role
      setRoles(roles.map(role => (role.id === editRole.id ? { ...newRole, id: editRole.id } : role)));
    } else {
      // Add a new role
      const newRoleWithId = { ...newRole, id: roles.length + 1 }; // Generate a new unique ID
      setRoles([...roles, newRoleWithId]);
    }
    setOpenDialog(false); // Close the dialog
  };

  // Delete a role
  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles); // Update roles state
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddRole}>
        Add Role
      </Button>

      <AddEditRoleDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        role={editRole}
        onSave={handleSaveRole}
      />

      <RoleDataTable
        roles={roles}
        onEditRole={handleEditRole}
        onDeleteRole={handleDeleteRole} // Pass delete function to the table
      />
    </Box>
  );
};

export default RoleManagementPage;
