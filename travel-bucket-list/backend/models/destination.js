const mongoose = require('mongoose');

// Define the schema for a destination
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make the name a required field
  },
  country: {
    type: String,
    required: true, // Make the country a required field
  },
  description: {
    type: String,
    required: false, // Description is optional
  },
  visitPriority: {
    type: Number,
    required: false, // Visit priority is optional
    min: 1, // Minimum priority value
    max: 5, // Maximum priority value
  }
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

// Create a model using the schema
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
