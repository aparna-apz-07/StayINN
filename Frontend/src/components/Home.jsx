import React from "react";
import { Container, Typography, Button, Grid, Paper, TextField, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css"; // Import external CSS

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Typography variant="h3" className="hero-title">
            Find Your Perfect Stay
          </Typography>
          <Typography variant="h6" className="hero-subtitle">
            Book from the best hotels at the best prices!
          </Typography>

          {/* Search Bar */}
          <Box className="search-bar">
            <TextField
              label="Search Hotels..."
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "white",  // White background
                borderRadius: 2,
                input: { fontSize: "18px", color: "#000" }, // Black text for better readability
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#aaa" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" }
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ p: 2, minWidth: "60px", backgroundColor: "#fff", color: "#1976d2", "&:hover": { backgroundColor: "#ddd" } }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </div>

      {/* Featured Hotels Section */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
          Featured Hotels
        </Typography>
        <Grid container spacing={3}>
          {/* Example Hotels */}
          {[
            { name: "Luxury Inn", img: "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" },
            { name: "Grand Stay", img: "https://i.insider.com/598336c3b9cd6c1e008b45aa?width=700" },
            { name: "City Comfort", img: "https://luxurylifestyleawards.com/wp-content/uploads/2024/04/sofitel-legend-casco-viejo-exterior-2-SOFITELPANAMA0622-de99233d24d84acdb93cb6b7c1af3292.jpg" }
          ].map((hotel, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper className="hotel-card">
                <img src={hotel.img} alt={hotel.name} className="hotel-image" />
                <Typography variant="h6" sx={{ mt: 1 }}>{hotel.name}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  View Rooms
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
