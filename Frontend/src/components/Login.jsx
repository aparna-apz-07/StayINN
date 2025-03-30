

import React, { useState } from "react";
import { TextField, Button, Typography, Tabs, Tab, Box, Paper, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle tab change (Switch between User, Hotel, and Admin login)
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setMessage(""); // Clear messages when switching tabs
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let endpoint;
      let payload;

      if (tabIndex === 0) {
        // User Login
        endpoint = "http://localhost:4000/user/login";
        payload = { UEmail: formData.email, UPassword: formData.password };
      } else if (tabIndex === 1) {
        // Hotel Owner Login
        endpoint = "http://localhost:4000/hotel/login";
        payload = { HotelEmail: formData.email, Password: formData.password };
      } else {
        // Admin Login (Use separate admin endpoint if needed)
        if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
          localStorage.setItem("user", JSON.stringify({ role: "admin" }));
          navigate("/AdminDashboard"); //  Redirect Admin
          return;
        } else {
          setMessage("Invalid Admin Credentials.");
          return;
        }
      }

      // Make API Call
      const response = await axios.post(endpoint, payload);
      
      if (response.status === 200) {
        const userData = response.data.user || response.data.hotelUser;
        localStorage.setItem("user", JSON.stringify(userData)); // Save session

        // Redirect based on role
        if (tabIndex === 0) {
          navigate("/hoteldash"); //  Redirect User
        } else {
          navigate("/hotelowner"); //  Redirect Hotel Owner
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <Paper elevation={3} sx={{ width: 400, padding: 4, borderRadius: 5, boxShadow: 3, backgroundColor: "white", textAlign: "center" }}>
          <Typography variant="h5">
            {tabIndex === 0 ? "User Login" : tabIndex === 1 ? "Hotel Owner Login" : "Admin Login"}
          </Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="User" />
            <Tab label="Hotel Owner" />
            <Tab label="Admin" /> {/*  Added Admin Tab */}
          </Tabs>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {tabIndex === 0 ? "Login as User" : tabIndex === 1 ? "Login as Hotel Owner" : "Login as Admin"}
            </Button>
          </form>
          {message && <Typography variant="body2" sx={{ color: "red", mt: 2 }}>{message}</Typography>}
          {tabIndex !== 2 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/sign">Sign Up</Link>
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

