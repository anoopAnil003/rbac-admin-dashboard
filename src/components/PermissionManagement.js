import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditPermissionsDialog from './EditPermissionsDialog';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Simulate fetching roles from a server
    const mockRoles = [
      { id: 1, roleName: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
      { id: 2, roleName: 'User', permissions: ['Read'] },
    ];
    setRoles(mockRoles);
  }, []);

  const handleOpenDialog = (role) => {
    setSelectedRole(role);
    setOpenDialog(true);
  };

  const handleSavePermissions = (roleId, updatedPermissions) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, permissions: updatedPermissions } : role
      )
    );
  };

  const columns = [
    { field: 'roleName', headerName: 'Role Name', flex: 1 },
    {
      field: 'permissions',
      headerName: 'Permissions',
      flex: 2,
      renderCell: (params) => params.value.join(', '),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenDialog(params.row)}
        >
          Edit Permissions
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '80%', margin: 'auto', marginTop: '50px' }}>
      <h2>Manage Permissions</h2>
      <DataGrid rows={roles} columns={columns} disableSelectionOnClick />

      <EditPermissionsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        role={selectedRole}
        onSave={handleSavePermissions}
      />
    </div>
  );
};

export default RoleManagementPage;
