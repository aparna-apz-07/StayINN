
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "HotelDesc", required: true },
  bookingDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  userName: String,
  userEmail: String,
  userPhone: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
