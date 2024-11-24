import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';

const AddEditRoleDialog = ({ open, onClose, role, onSave }) => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  useEffect(() => {
    if (role) {
      setRoleName(role.roleName);
      const permissionsArray = role.permissions.split(', ');
      setPermissions({
        read: permissionsArray.includes('Read'),
        write: permissionsArray.includes('Write'),
        delete: permissionsArray.includes('Delete'),
      });
    } else {
      // Clear the form if adding a new role
      setRoleName('');
      setPermissions({ read: false, write: false, delete: false });
    }
  }, [role]);

  const handleSave = () => {
    const selectedPermissions = Object.keys(permissions)
      .filter((key) => permissions[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(', ');

    const newRole = { roleName, permissions: selectedPermissions };
    onSave(newRole); // Pass the role data to the parent
  };

  const handleClear = () => {
    setRoleName('');
    setPermissions({ read: false, write: false, delete: false });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{role ? 'Edit Role' : 'Add Role'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={permissions.read} onChange={(e) => setPermissions({ ...permissions, read: e.target.checked })} />}
          label="Read"
        />
        <FormControlLabel
          control={<Checkbox checked={permissions.write} onChange={(e) => setPermissions({ ...permissions, write: e.target.checked })} />}
          label="Write"
        />
        <FormControlLabel
          control={<Checkbox checked={permissions.delete} onChange={(e) => setPermissions({ ...permissions, delete: e.target.checked })} />}
          label="Delete"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="secondary">
          Clear
        </Button>
        <Button onClick={handleSave} color="primary">
          {role ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditRoleDialog;
