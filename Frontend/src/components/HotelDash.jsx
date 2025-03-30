

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HotelDash.css"; // Import external CSS

const HotelDash = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  const handleBookNow = (room) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first.");
      return;
    }

    navigate("/booking", {
      state: {
        userId: user._id,
        hotelId: room.HotelEmail,  // adjust if you have actual hotel ID
        roomId: room._id,
        userName: user.UName,
        userEmail: user.UEmail,
        userPhone: user.UPhone
      }
    });
  };

  return (
    <div className="hotel-dashboard">
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: "white", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)" }}>
          Available Hotel Rooms
        </Typography>
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Paper className="room-card">
                <img src={room.RImage} alt={room.HName} className="room-image" />
                <Typography variant="h6" sx={{ mt: 1 }}>{room.HName}</Typography>
                <Typography variant="body2" className="room-info"> {room.HAddress}</Typography>
                <Typography variant="body2" className="room-info"> ₹{room.RPrice} per night</Typography>
                <Typography variant="body2" className="room-desc"> {room.HDesc}</Typography>
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: "100%" }}
                  onClick={() => handleBookNow(room)}
                >
                  Book Now
                </Button> */}
                <Button 
                variant="contained" 
                color="primary" sx={{ mt: 2, width: "100%" }} 
                onClick={() => { 
                  const user = JSON.parse(localStorage.getItem("user"));
                   if (!user) { alert("Please login first."); return;

                    } navigate("/booking", {
                       state: { roomId: room._id, 
                        hotelId: room.HotelEmail,
                        userId: user._id, 
                        userName: user.UName, 
                        userEmail: user.UEmail, 
                        userPhone: user.UPhone }, }); }}
>
Book Now </Button>


              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HotelDash;
