import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

const RoleDataTable = ({ roles, onEditRole, onDeleteRole }) => {
  const columns = [
    { field: 'roleName', headerName: 'Role Name', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'permissions', headerName: 'Permissions', width: 300, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="primary" onClick={() => onEditRole(params.row)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDeleteRole(params.row.id)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '80%', margin: 'auto', marginTop: '50px' }}>
      <DataGrid
        rows={roles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id} // Ensure unique IDs for rows
      />
    </div>
  );
};

export default RoleDataTable;
