import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const AddEditUserDialog = ({ open, onClose, onSubmit, editUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        status: true,
      });
    }
  }, [editUser]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.role) tempErrors.role = 'Role is required';
    if (formData.status === null) tempErrors.status = 'Status is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    // Clear the form by resetting to the initial state
    setFormData({
      name: '',
      email: '',
      role: '',
      status: true,
    });
    setErrors({}); // Clear errors as well
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="dense"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.role}
        >
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.status}
        >
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status ? 'Active' : 'Inactive'}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value === 'Active',
              })
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="default">
          Clear
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditUserDialog;
