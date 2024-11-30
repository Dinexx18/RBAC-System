import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  MenuItem,  // Add this line
} from "@mui/material";

const UsersPage = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions] = useState(["Read", "Write", "Delete", "Execute"]); // Sample permissions
  const [roleForm, setRoleForm] = useState({ name: "", permissions: [] });
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "" });
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setRoles(storedRoles);
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("users", JSON.stringify(users));
  }, [roles, users]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Role Management
  const handleAddRole = () => {
    if (roleForm.name && roleForm.permissions.length > 0) {
      setRoles([...roles, { id: roles.length + 1, ...roleForm }]);
      setSnackbar({
        open: true,
        message: `Role ${roleForm.name} added successfully!`,
        severity: "success",
      });
      setOpenRoleDialog(false);
      setRoleForm({ name: "", permissions: [] });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all fields and select at least one permission.",
        severity: "error",
      });
    }
  };

  const handleEditRole = (role) => {
    setRoleForm({
      name: role.name,
      permissions: role.permissions,
    });
    setOpenRoleDialog(true);
  };

  const handleSaveRole = () => {
    if (roleForm.name && roleForm.permissions.length > 0) {
      const updatedRoles = roles.map((role) =>
        role.id === roleForm.id
          ? { ...role, name: roleForm.name, permissions: roleForm.permissions }
          : role
      );
      setRoles(updatedRoles);
      setSnackbar({
        open: true,
        message: `Role ${roleForm.name} updated successfully!`,
        severity: "success",
      });
      setOpenRoleDialog(false);
      setRoleForm({ name: "", permissions: [] });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all fields and select at least one permission.",
        severity: "error",
      });
    }
  };

  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
    setSnackbar({
      open: true,
      message: "Role deleted successfully.",
      severity: "error",
    });
  };

  const handlePermissionChange = (permission) => {
    setRoleForm((prevForm) => {
      const permissions = prevForm.permissions.includes(permission)
        ? prevForm.permissions.filter((perm) => perm !== permission)
        : [...prevForm.permissions, permission];
      return { ...prevForm, permissions };
    });
  };

  // User Management
  const handleAddUser = () => {
    if (userForm.name && userForm.email && userForm.role) {
      setUsers([...users, { id: users.length + 1, ...userForm }]);
      setSnackbar({
        open: true,
        message: `User ${userForm.name} added successfully!`,
        severity: "success",
      });
      setOpenUserDialog(false);
      setUserForm({ name: "", email: "", role: "" });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "error",
      });
    }
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSnackbar({
      open: true,
      message: "User deleted successfully.",
      severity: "error",
    });
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("roles");
    localStorage.removeItem("users");
    setSnackbar({
      open: true,
      message: "Logged out successfully.",
      severity: "success",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>RBAC System - User & Role Management</h1>

      {/* Button to add role */}
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: "20px",
          float: "right", // Align button to the right
        }}
        onClick={() => setOpenRoleDialog(true)}
      >
        Add Role
      </Button>

      {/* Button to add user */}
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginBottom: "20px",
          float: "right", // Align button to the right
          marginRight: "10px",
        }}
        onClick={() => setOpenUserDialog(true)}
      >
        Add User
      </Button>

      {/* Logout Button */}
      <Button
        variant="outlined"
        color="default"
        style={{
          float: "right", // Align logout button to the right
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      {/* Role Management Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditRole(role)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Management Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Role Dialog */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)}>
        <DialogTitle>{roleForm.id ? "Edit Role" : "Add New Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={roleForm.name}
            onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
          />
          <div>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={roleForm.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)}>Cancel</Button>
          <Button
            onClick={roleForm.id ? handleSaveRole : handleAddRole}
            variant="contained"
            color="primary"
          >
            {roleForm.id ? "Save Changes" : "Add Role"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            fullWidth
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            value={userForm.role}
            onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
