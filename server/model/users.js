const mongoose = require("mongoose");


// Define the Customer schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z ]+$/,  // Ensure only alphabetical characters
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z ]+$/,  // Ensure only alphabetical characters
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\d{10}$/,  // Ensure 10 digits for phone number
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    match: /^\S+@\S+\.\S+$/,  // Ensure valid email format
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: { 
    type: String 
  },
  qrCodeUrl:{
    type:String
  },
}, { timestamps: true });


// Create and export the Customer model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;