import axios from "axios";

const API_BASE = "http://localhost:3000";

// Users API
export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const addUser = (user) => axios.post(`${API_BASE}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_BASE}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);

// Roles API
export const fetchRoles = () => axios.get(`${API_BASE}/roles`);
export const addRole = (role) => axios.post(`${API_BASE}/roles`, role);
export const updateRole = (id, role) => axios.put(`${API_BASE}/roles/${id}`, role);
export const deleteRole = (id) => axios.delete(`${API_BASE}/roles/${id}`);
