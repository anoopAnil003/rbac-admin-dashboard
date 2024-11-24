import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import AddEditUserDialog from './AddEditUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false },
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState('');

  // Add or Edit User
  const handleAddEditUser = (user) => {
    let updatedUsers;
    if (user.id) {
      // Edit User
      updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    } else {
      // Add User
      const newUser = { ...user, id: users.length + 1 }; // Generate unique ID
      updatedUsers = [...users, newUser];
    }
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsDialogOpen(false);
    setSearch(''); // Clear search after updating
  };

  // Delete User
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Handle Search
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value) ||
          user.role.toLowerCase().includes(value)
      )
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center', },
    { field: 'email', headerName: 'Email', width: 250, align: 'center', headerAlign: 'center', },
    { field: 'role', headerName: 'Role', width: 200, align: 'center', headerAlign: 'center', },
    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.row.status ? 'Active' : 'Inactive'}
          color={params.row.status ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
              setEditUser(params.row);
              setIsDialogOpen(true);
            }}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (

    <div style={{ height: 400, width: '100%', margin: 'auto', marginTop: '50px' }}>
      <h2>User User Management</h2>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditUser(null);
            setIsDialogOpen(true);
          }}
        >
          Add User
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
      </Box>
      <DataGrid
        rows={filteredUsers}
        columns={columns.slice(0, 6)}

        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{ backgroundColor: '#fff' }}
      />
      <AddEditUserDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddEditUser}
        editUser={editUser}
      />
    </div>
  );
};

export default UserManagement;
