import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Container } from "@mui/material";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchHotels();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/user/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/hotel/delete/${id}`);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom color="white">
        Admin Dashboard
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5">Users</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.UName}</TableCell>
                <TableCell>{user.UEmail}</TableCell>
                <TableCell>{user.UPhone}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => deleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">Hotels</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell>{hotel.BName}</TableCell>
                <TableCell>{hotel.OwnerName}</TableCell>
                <TableCell>{hotel.HotelEmail}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => deleteHotel(hotel._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
