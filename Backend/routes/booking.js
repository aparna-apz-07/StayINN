const express = require("express"); 
const router = express.Router(); 
const Booking = require("../Model/Booking");


router.post("/", async (req, res) => { 
    try { const booking = new Booking(req.body); 
        await booking.save(); 
        res.status(201).json({ message: "Booking created", booking }); 
    } catch (error) {
         console.error("Booking error:", error.message); 
        res.status(500).json({ message: "Error saving booking", error: error.message });
     } });

//  Get all bookings for a specific hotel owner by hotelId 
router.get("/hotel/:hotelId", async (req, res) => {
     try { const bookings = await Booking.find({ hotelId: req.params.hotelId }); 
     res.status(200).json(bookings); 
    } catch (error) {
         res.status(500).json({ message: "Error fetching bookings", error: error.message }); 
        } });

// Confirm a booking (status = confirmed)
 router.put("/confirm/:id", async (req, res) => { 
    try { const updatedBooking = await Booking.findByIdAndUpdate( req.params.id, { status: "confirmed" }, { new: true } ); 
    res.status(200).json({ message: "Booking confirmed", booking: updatedBooking });
 } catch (error) {
     res.status(500).json({ message: "Error confirming booking", error: error.message }); 
    } });

// Cancel a booking (status = cancelled) 
router.put("/cancel/:id", async (req, res) => {
     try { const updatedBooking = await Booking.findByIdAndUpdate( req.params.id, { status: "cancelled" }, { new: true } );
      res.status(200).json({ message: "Booking cancelled", booking: updatedBooking }); 
    } catch (error) { 
        res.status(500).json({ message: "Error cancelling booking", error: error.message }); 
    } });

module.exports = router;