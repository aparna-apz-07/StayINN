

const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  HName: { type: String, required: true },
  HAddress: { type: String, required: true },
  RPrice: { type: Number, required: true },
  RImage: { type: String, required: true },
  HDesc: { type: String, required: true },
  HotelEmail: { type: String, required: true } 
});

module.exports = mongoose.model("HotelDesc", RoomSchema);


