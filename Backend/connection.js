var mongoose = require('mongoose');
mongoose
.connect("mongodb+srv://aparna:aparna@cluster0.9yrqg.mongodb.net/HotelBooking?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{console.log("Db connected!!")})
.catch((err)=>{console.log(err)});
