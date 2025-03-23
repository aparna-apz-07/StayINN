import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid
} from "@mui/material";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const hotelOwner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (hotelOwner?.HotelEmail && hotelOwner?._id) {
      fetchBookings(hotelOwner._id); // assuming _id is hotelId
    }
  }, []);

  const fetchBookings = async (hotelId) => {
    try {
      const res = await axios.get(`http://localhost:4000/booking/hotel/${hotelId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:4000/booking/${action}/${id}`);
      fetchBookings(hotelOwner._id);
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Booking Requests</Typography>
      <Grid container spacing={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} key={booking._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{booking.userName}</Typography>
              <Typography>Email: {booking.userEmail}</Typography>
              <Typography>Phone: {booking.userPhone}</Typography>
              <Typography>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
              <Typography>Status: {booking.status}</Typography>
              {booking.status === "pending" && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={() => handleAction(booking._id, "confirm")}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleAction(booking._id, "cancel")}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingList;