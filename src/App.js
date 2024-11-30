import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import Login from "./pages/Login";
import { AppBar, Toolbar, Typography, Button, IconButton, Snackbar, Alert } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Private Route Component to protect the routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if user is authenticated
  return isAuthenticated ? element : <Navigate to="/login" />;  // Redirect to login if not authenticated
};

const App = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authToken from localStorage
    setSnackbar({
      open: true,
      message: 'Logged out successfully!',
      severity: 'success',
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RBAC Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/roles">
            Roles
          </Button>

          {/* Logout Icon positioned at the top-right corner */}
          <IconButton
            onClick={handleLogout}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "20px" }}>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protecting / and /roles routes */}
          <Route path="/" element={<PrivateRoute element={<UsersPage />} />} />
          <Route path="/roles" element={<PrivateRoute element={<RolesPage />} />} />
        </Routes>
      </div>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
