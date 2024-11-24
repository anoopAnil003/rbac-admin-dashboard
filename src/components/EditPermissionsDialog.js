import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { AVAILABLE_PERMISSIONS } from './constants/permissions';

const EditPermissionsDialog = ({ open, onClose, role, onSave }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setPermissions(role.permissions || []);
    }
  }, [role]);

  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    onSave(role.id, permissions);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Permissions for {role?.roleName}</DialogTitle>
      <DialogContent>
        {AVAILABLE_PERMISSIONS.map((permission) => (
          <FormControlLabel
            key={permission}
            control={
              <Checkbox
                checked={permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
            }
            label={permission}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPermissionsDialog;
