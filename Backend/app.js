
// const express = require("express");
// require("./connection"); // Connect to MongoDB
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const UserModel = require("./Model/User");
// const HotelModel = require("./Model/Hotel");
// const HotelDesc = require("./Model/HotelDesc");
// const Booking = require("./Model/Booking");


// const router = express.Router();
// const app = express();
// app.use(cors());
// app.use(express.json());
// const PORT = 4000;
// // Route imports
// const bookingRoutes = require("./routes/booking");
// app.use("/booking", bookingRoutes);






// // User Signup
// app.post("/user/signup", async (req, res) => {
//   try {
//     const { UName, UEmail, UPhone, UPassword } = req.body;
//     if (await UserModel.findOne({ UEmail })) {
//       return res.status(400).json({ message: "User already exists!" });
//     }
//     const hashedPassword = await bcrypt.hash(UPassword, 10);
//     const newUser = new UserModel({ UName, UEmail, UPhone, UPassword: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // User Login
// app.post("/user/login", async (req, res) => {
//   try {
//     const { UEmail, UPassword } = req.body;
//     const user = await UserModel.findOne({ UEmail });
//     if (!user) return res.status(400).json({ message: "User not found!" });
//     if (!(await bcrypt.compare(UPassword, user.UPassword))) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }
//     res.json({ message: "Login successful!", user });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // Get all users
// app.get("/user/list", async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-UPassword");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users!", error: error.message });
//   }
// });

// // Hotel Signup
// app.post("/hotel/signup", async (req, res) => {
//   try {
//     const { BName, BAddress, BRegister, OwnerName, HotelEmail, Phone, Password } = req.body;
//     if (await HotelModel.findOne({ HotelEmail })) {
//       return res.status(400).json({ message: "Hotel already registered!" });
//     }
//     const hashedPassword = await bcrypt.hash(Password, 10);
//     const newHotel = new HotelModel({ BName, BAddress, BRegister, OwnerName, HotelEmail, Phone, Password: hashedPassword });
//     await newHotel.save();
//     res.status(201).json({ message: "Hotel registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // Hotel Login
// app.post("/hotel/login", async (req, res) => {
//   try {
//     const { HotelEmail, Password } = req.body;
//     const hotelUser = await HotelModel.findOne({ HotelEmail });
//     if (!hotelUser) return res.status(400).json({ message: "Hotel not found!" });
//     if (!(await bcrypt.compare(Password, hotelUser.Password))) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }
//     res.json({ message: "Login successful!", hotelUser });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // Get all hotels
// app.get("/hotel/list", async (req, res) => {
//   try {
//     const hotels = await HotelModel.find().select("-Password");
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels!", error: error.message });
//   }
// });

// // Delete hotel
// app.delete("/hotel/delete/:id", async (req, res) => {
//   try {
//     const deleted = await HotelModel.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Hotel not found" });
//     res.status(200).json({ message: "Hotel deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete error", error: error.message });
//   }
// });

// // Update hotel
// app.put("/hotel/update/:id", async (req, res) => {
//   try {
//     const hotel = await HotelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.status(200).json({ message: "Hotel updated", hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Update error", error: error.message });
//   }
// });

// // Get hotel by ID
// app.get("/hotel/:id", async (req, res) => {
//   try {
//     const hotel = await HotelModel.findById(req.params.id).select("-Password");
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotel", error: error.message });
//   }
// });

// // Add new room
// app.post("/room/add", async (req, res) => {
//   try {
//     const newRoom = new HotelDesc(req.body);
//     await newRoom.save();
//     res.status(201).json({ message: "Room added successfully!", room: newRoom });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding room!", error: error.message });
//   }
// });

// // Get all rooms
// app.get("/rooms", async (req, res) => {
//   try {
//     const rooms = await HotelDesc.find();
//     res.status(200).json(rooms);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching rooms!", error: error.message });
//   }
// });

// // Get rooms by HotelEmail
// app.get("/room/byemail/:email", async (req, res) => {
//   try {
//     const email = req.params.email; 
//     console.log("Fetching rooms for:", email); // ✅ Debugging log

//     const rooms = await HotelDesc.find({ HotelEmail: email });

//     if (rooms.length === 0) {
//       return res.status(404).json({ message: "No rooms found for this hotel!" });
//     }

//     res.status(200).json(rooms);
//   } catch (error) {
//     console.error("Error fetching rooms:", error);
//     res.status(500).json({ message: "Error fetching rooms!", error: error.message });
//   }
// });



// // Update room by ID
// app.put("/room/update/:id", async (req, res) => {
//   try {
//     const updatedRoom = await HotelDesc.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedRoom) return res.status(404).json({ message: "Room not found!" });
//     res.status(200).json({ message: "Room updated successfully!", room: updatedRoom });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating room!", error: error.message });
//   }
// });

// // Delete room by ID
// app.delete("/room/delete/:id", async (req, res) => {
//   try {
//     const deletedRoom = await HotelDesc.findByIdAndDelete(req.params.id);
//     if (!deletedRoom) return res.status(404).json({ message: "Room not found!" });
//     res.status(200).json({ message: "Room deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting room!", error: error.message });
//   }
// });
// app.post("/admin/create", async (req, res) => {
//   try {
//     const { UName, UEmail, UPhone, UPassword } = req.body;

//     // Check if admin already exists
//     if (await UserModel.findOne({ UEmail })) {
//       return res.status(400).json({ message: "Admin already exists!" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(UPassword, 10);

//     const newAdmin = new UserModel({
//       UName,
//       UEmail,
//       UPhone,
//       UPassword: hashedPassword,
//       userType: "admin", // ✅ Mark as admin
//       isAdmin: true
//     });

//     await newAdmin.save();
//     res.status(201).json({ message: "Admin created successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // ✅ ADMIN LOGIN
// app.post("/admin/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists & is admin
//     const admin = await UserModel.findOne({ UEmail: email, isAdmin: true });
//     if (!admin) return res.status(400).json({ message: "Admin not found!" });

//     // Check password
//     if (!(await bcrypt.compare(password, admin.UPassword))) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     res.json({ message: "Admin login successful!", admin });
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred!", error: error.message });
//   }
// });

// // ✅ FETCH ALL USERS (Admin Only)
// app.get("/admin/users", async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-UPassword");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users!", error: error.message });
//   }
// });

// // ✅ FETCH ALL HOTEL OWNERS (Admin Only)
// app.get("/admin/hotels", async (req, res) => {
//   try {
//     const hotels = await HotelModel.find().select("-Password");
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels!", error: error.message });
//   }
// });

// // ✅ UPDATE USER (Admin)
// app.put("/admin/user/update/:id", async (req, res) => {
//   try {
//     const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedUser) return res.status(404).json({ message: "User not found!" });
//     res.status(200).json({ message: "User updated successfully!", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user!", error: error.message });
//   }
// });

// // ✅ DELETE USER (Admin)
// app.delete("/admin/user/delete/:id", async (req, res) => {
//   try {
//     const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: "User not found!" });
//     res.status(200).json({ message: "User deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting user!", error: error.message });
//   }
// });

// // ✅ UPDATE HOTEL (Admin)
// app.put("/admin/hotel/update/:id", async (req, res) => {
//   try {
//     const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedHotel) return res.status(404).json({ message: "Hotel not found!" });
//     res.status(200).json({ message: "Hotel updated successfully!", hotel: updatedHotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating hotel!", error: error.message });
//   }
// });

// // ✅ DELETE HOTEL (Admin)
// app.delete("/admin/hotel/delete/:id", async (req, res) => {
//   try {
//     const deletedHotel = await HotelModel.findByIdAndDelete(req.params.id);
//     if (!deletedHotel) return res.status(404).json({ message: "Hotel not found!" });
//     res.status(200).json({ message: "Hotel deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting hotel!", error: error.message });
//   }
// });


// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
require("./connection"); // MongoDB connection
const cors = require("cors");
const bcrypt = require("bcryptjs");

const UserModel = require("./Model/User");
const HotelModel = require("./Model/Hotel");
const HotelDesc = require("./Model/HotelDesc");
const Booking = require("./Model/Booking");

const bookingRoutes = require("./routes/booking");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Booking Routes
app.use("/booking", bookingRoutes);

// -------------------- USER ROUTES --------------------

// User Signup
app.post("/user/signup", async (req, res) => {
  try {
    const { UName, UEmail, UPhone, UPassword } = req.body;
    if (await UserModel.findOne({ UEmail })) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(UPassword, 10);
    const newUser = new UserModel({ UName, UEmail, UPhone, UPassword: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
});

// User Login
app.post("/user/login", async (req, res) => {
  try {
    const { UEmail, UPassword } = req.body;
    const user = await UserModel.findOne({ UEmail });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const valid = await bcrypt.compare(UPassword, user.UPassword);
    if (!valid) return res.status(400).json({ message: "Invalid credentials!" });

    res.json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// Get all users
app.get("/user/list", async (req, res) => {
  try {
    const users = await UserModel.find().select("-UPassword");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users!", error: error.message });
  }
});

// -------------------- HOTEL ROUTES --------------------

// Hotel Signup
app.post("/hotel/signup", async (req, res) => {
  try {
    const { BName, BAddress, BRegister, OwnerName, HotelEmail, Phone, Password } = req.body;
    if (await HotelModel.findOne({ HotelEmail })) {
      return res.status(400).json({ message: "Hotel already registered!" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newHotel = new HotelModel({ BName, BAddress, BRegister, OwnerName, HotelEmail, Phone, Password: hashedPassword });
    await newHotel.save();
    res.status(201).json({ message: "Hotel registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
});

// Hotel Login
app.post("/hotel/login", async (req, res) => {
  try {
    const { HotelEmail, Password } = req.body;
    const hotelUser = await HotelModel.findOne({ HotelEmail });
    if (!hotelUser) return res.status(400).json({ message: "Hotel not found!" });

    const valid = await bcrypt.compare(Password, hotelUser.Password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials!" });

    res.json({ message: "Login successful!", hotelUser });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// Get all hotels
app.get("/hotel/list", async (req, res) => {
  try {
    const hotels = await HotelModel.find().select("-Password");
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels!", error: error.message });
  }
});

// -------------------- ROOM ROUTES --------------------

// Add Room
app.post("/room/add", async (req, res) => {
  try {
    const newRoom = new HotelDesc(req.body);
    await newRoom.save();
    res.status(201).json({ message: "Room added", room: newRoom });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
});

// Get All Rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await HotelDesc.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

// Get Rooms by Hotel Email
app.get("/room/byemail/:email", async (req, res) => {
  try {
    const rooms = await HotelDesc.find({ HotelEmail: req.params.email });
    if (!rooms.length) return res.status(404).json({ message: "No rooms found" });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

// Update Room
app.put("/room/update/:id", async (req, res) => {
  try {
    const room = await HotelDesc.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room updated", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error: error.message });
  }
});

// Delete Room
app.delete("/room/delete/:id", async (req, res) => {
  try {
    const deletedRoom = await HotelDesc.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Room not found!" });
    res.status(200).json({ message: "Room deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room!", error: error.message });
  }
});

// -------------------- ADMIN ROUTES --------------------

// Create Admin
app.post("/admin/create", async (req, res) => {
  try {
    const { UName, UEmail, UPhone, UPassword } = req.body;
    if (await UserModel.findOne({ UEmail })) {
      return res.status(400).json({ message: "Admin already exists!" });
    }
    const hashedPassword = await bcrypt.hash(UPassword, 10);
    const newAdmin = new UserModel({ UName, UEmail, UPhone, UPassword: hashedPassword, userType: "admin", isAdmin: true });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
});

// Admin Login
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserModel.findOne({ UEmail: email, isAdmin: true });
    if (!admin) return res.status(400).json({ message: "Admin not found!" });
    const valid = await bcrypt.compare(password, admin.UPassword);
    if (!valid) return res.status(400).json({ message: "Invalid credentials!" });
    res.json({ message: "Admin login successful!", admin });
  } catch (error) {
    res.status(500).json({ message: "Admin login failed", error: error.message });
  }
});

// Admin - Get Users
app.get("/admin/users", async (req, res) => {
  try {
    const users = await UserModel.find().select("-UPassword");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Admin - Get Hotels
app.get("/admin/hotels", async (req, res) => {
  try {
    const hotels = await HotelModel.find().select("-Password");
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
});

// Admin - Update User
app.put("/admin/user/update/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user!", error: error.message });
  }
});

// Admin - Delete User
app.delete("/admin/user/delete/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user!", error: error.message });
  }
});

// Admin - Update Hotel
app.put("/admin/hotel/update/:id", async (req, res) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) return res.status(404).json({ message: "Hotel not found!" });
    res.status(200).json({ message: "Hotel updated!", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Error updating hotel!", error: error.message });
  }
});

// Admin - Delete Hotel
app.delete("/admin/hotel/delete/:id", async (req, res) => {
  try {
    const deletedHotel = await HotelModel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: "Hotel not found!" });
    res.status(200).json({ message: "Hotel deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel!", error: error.message });
  }
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost: ${PORT}`);
});
