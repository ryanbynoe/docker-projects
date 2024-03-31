const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.json());

const DestinationSchema = new mongoose.Schema({
  name: String,
  country: String,
});
const Destination = mongoose.model('Destination', DestinationSchema);

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/travelBucketList', { useNewUrlParser: true });

// API Endpoints
app.get('/api/destinations', async (req, res) => {
  const destinations = await Destination.find();
  res.json(destinations);
});

app.post('/api/destinations', async (req, res) => {
  const newDestination = new Destination(req.body);
  await newDestination.save();
  res.status(201).json(newDestination);
});

app.delete('/api/destinations/:id', async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
