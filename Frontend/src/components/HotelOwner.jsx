import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import "./HotelOwner.css";

const HotelOwner = () => {
  const [rooms, setRooms] = useState([]);  // Stores rooms for this hotel
  const [hotelEmail, setHotelEmail] = useState(""); // Stores logged-in hotel email
  const [searchTerm, setSearchTerm] = useState(""); // Search bar filter
  const [open, setOpen] = useState(false); // Controls form visibility
  const [editingRoom, setEditingRoom] = useState(null); // Track which room is being edited
  const [formData, setFormData] = useState({
    HName: "",
    HAddress: "",
    RPrice: "",
    RImage: "",
    HDesc: ""
  });

  // Fetch logged-in hotel owner's details
  useEffect(() => {
    const owner = JSON.parse(localStorage.getItem("user"));
    if (owner && owner.HotelEmail) {
      setHotelEmail(owner.HotelEmail);
      fetchRooms(owner.HotelEmail);
    }
  }, []);

  //  Fetch rooms by HotelEmail
  const fetchRooms = async (email) => {
    try {
      const res = await axios.get(`http://localhost:4000/room/byemail/${email}`);
      console.log("Rooms fetched:", res.data); // Debugging line
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err.message);
    }
  };

  //  Handle form open (for Add/Edit)
  const handleOpen = (room = null) => {
    if (room) {
      setEditingRoom(room._id);
      setFormData(room);
    } else {
      setEditingRoom(null);
      setFormData({ HName: "", HAddress: "", RPrice: "", RImage: "", HDesc: "" });
    }
    setOpen(true);
  };

  //  Handle form close
  const handleClose = () => {
    setOpen(false);
    setEditingRoom(null);
  };

  //  Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Add or Update Room
  const handleSubmit = async () => {
    try {
      if (editingRoom) {
        await axios.put(`http://localhost:4000/room/update/${editingRoom}`, formData);
      } else {
        await axios.post("http://localhost:4000/room/add", { ...formData, HotelEmail: hotelEmail });
      }
      fetchRooms(hotelEmail);
      handleClose();
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
  };

  //  Delete Room
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/room/delete/${id}`);
      fetchRooms(hotelEmail);
    } catch (err) {
      console.error("Error deleting room:", err.message);
    }
  };

  //  Filter rooms dynamically
  const filteredRooms = rooms.filter(
    (room) =>
      room.HName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.RPrice.toString().includes(searchTerm)
  );

  return (
    <Box className="hotel-owner-container">
      {/* 🔹 Title */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          letterSpacing: "1px",
          textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
          mb: 3,
          textAlign: "center",
          color: "white"
        }}
      >
        Rooms Managed by You
      </Typography>

      {/* 🔹 Search Bar & Add Room */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          label="Search by Hotel Name or Price..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            width: "75%",
            padding: "5px"
          }}
        />
        <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ ml: 2 }}>
          + ADD ROOM
        </Button>
      </Box>

      {/* 🔹 Grid View of Rooms */}
      <Grid container spacing={3}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Paper className="room-card" sx={{ padding: 2, textAlign: "center", backgroundColor: "#f8f8f8" }}>
              <Typography variant="h6">{room.HName}</Typography>
              <Typography variant="body2">{room.HAddress}</Typography>
              <Typography variant="body2">Price: ₹{room.RPrice}</Typography>
              <Typography variant="body2">{room.HDesc}</Typography>
              <img
                src={room.RImage}
                alt="Room"
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px", marginTop: "10px" }}
              />
              <Box mt={2}>
                <Button variant="outlined" color="primary" onClick={() => handleOpen(room)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(room._id)}>
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 🔹 Add/Edit Room Form */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
        <DialogContent>
          <TextField label="Hotel Name" name="HName" fullWidth value={formData.HName} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField label="Hotel Address" name="HAddress" fullWidth value={formData.HAddress} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField label="Room Price" name="RPrice" type="number" fullWidth value={formData.RPrice} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField label="Image URL" name="RImage" fullWidth value={formData.RImage} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField label="Room Description" name="HDesc" fullWidth value={formData.HDesc} onChange={handleChange} required sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingRoom ? "Update Room" : "Add Room"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelOwner;
