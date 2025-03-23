
import React, { useState } from "react";
import { TextField, Button, Typography, Tabs, Tab, Box, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    businessAddress: "",
    businessRegistration: "",
  });
  const [message, setMessage] = useState("");

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setMessage(""); // Clear messages when switching tabs
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const endpoint = tabIndex === 0 ? "http://localhost:4000/user/signup" : "http://localhost:4000/hotel/signup";
      const payload =
        tabIndex === 0
          ? { UName: formData.fullName, UEmail: formData.email, UPhone: formData.phone, UPassword: formData.password }
          : {
              BName: formData.businessName,
              BAddress: formData.businessAddress,
              BRegister: formData.businessRegistration,
              OwnerName: formData.fullName,
              HotelEmail: formData.email,
              Phone: formData.phone,
              Password: formData.password,
            };

      const response = await axios.post(endpoint, payload);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <Paper elevation={3} sx={{ width: 400, padding: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "white", textAlign: "center" }}>
          <Typography variant="h5">
            {tabIndex === 0 ? "User Signup" : "Hotel Owner Signup"}
          </Typography>
          <br />
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="User" />
            <Tab label="Hotel Owner" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            {tabIndex === 1 && (
              <>
                <TextField label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Business Registration Number" name="businessRegistration" value={formData.businessRegistration} onChange={handleChange} fullWidth margin="normal" required />
              </>
            )}
            <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Password" name="password" value={formData.password} type="password" onChange={handleChange} fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {tabIndex === 0 ? "Sign Up as User" : "Sign Up as Hotel Owner"}
            </Button>
          </form>
          {message && <Typography variant="body2" sx={{ color: "red", mt: 2 }}>{message}</Typography>}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
