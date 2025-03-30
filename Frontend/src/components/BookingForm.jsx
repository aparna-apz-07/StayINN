

import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import "./BookingForm.css";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve roomId and hotelId from navigation state
  const { roomId, hotelId } = location.state || {};

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    userId: user._id || "",
    hotelId: hotelId || "",
    roomId: roomId || "",
    bookingDate: "",
    userName: user.UName || "",
    userEmail: user.UEmail || "",
    userPhone: user.UPhone || "",
  });

  const [message, setMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await axios.post("http://localhost:4000/booking", formData);
      const res = await axios.post("http://localhost:4000/api/booking", formData);
      alert("Booking successful!");
      console.log(" Booking created:", res.data);
      navigate("/hoteldash");
    } catch (error) {
      console.error(" Booking error:", error.response?.data || error.message);
      setMessage("Booking failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={5}
        p={4}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Book a Room
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Hotel ID"
            name="hotelId"
            value={formData.hotelId}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Room ID"
            name="roomId"
            value={formData.roomId}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="userPhone"
            value={formData.userPhone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Book Now
          </Button>
        </form>
        {message && (
          <Typography color="error" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default BookingForm;

