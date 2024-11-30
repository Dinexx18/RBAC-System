import React from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const RolesPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Roles Management</h1>
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Create Role
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Save Role
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default RolesPage;
