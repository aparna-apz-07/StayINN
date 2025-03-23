// const mongoose = require('mongoose');

// const RoomSchema = new mongoose.Schema({
//     HName: { type: String, required: true,unique: true},  // Hotel Name
//     HAddress: { type: String, required: true },  // Hotel Address
//     RPrice:{type: Number, required: true},  // Room Price
//     RImage:{type : String, required: true},  // Room Image
//     HDesc: { type: String, required: true}, // Hotel Description
//     HotelEmail: { type: String, required: true } // link to hotel owner
// })

// const HotelDesc = mongoose.model('HotelDesc', RoomSchema);

// module.exports = HotelDesc;

const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  HName: { type: String, required: true },
  HAddress: { type: String, required: true },
  RPrice: { type: Number, required: true },
  RImage: { type: String, required: true },
  HDesc: { type: String, required: true },
  HotelEmail: { type: String, required: true }  // ✅ this must exist
});

module.exports = mongoose.model("HotelDesc", RoomSchema);


