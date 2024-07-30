import express from 'express'
import dotenv from "dotenv";
import connectDB from './db.js';
import User from './userModel.js';
import { getDistance } from 'geolib';

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());


// API Endpoint
app.get('/users', async (req, res) => {
    const { lat, lon } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
  
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
  
    try {
      // Find users within 10 km radius
      const users = await User.find();
      if(!users || users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
      //Calculate distance between the query coordinates and each user's coordinates
      const nearUsers = users
  .map(user => {
    const distance = getDistance(
      { latitude, longitude },
      { latitude: user.latitude, longitude: user.longitude }
    );
    return { user, distance: distance / 1000 };
  })
  .filter(user => user.distance <= 10) // lets filter users within 10 km
  .sort((a, b) => a.distance - b.distance); // lets sort users by distance

const count = nearUsers.length;
const paginatedUsers = nearUsers.slice((page - 1) * limit, page * limit); // lets paginate users

res.status(200).json({
  users: paginatedUsers,
  count,
  page,
  limit,
  totalPages: Math.ceil(count / limit)
});
} catch (err) {
    res.status(500).json({ error: err.message });
 }
  });

//create User
app.post('/users', async (req, res) => {
    const { name, latitude, longitude } = req.body;
  
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ error: 'Name, latitude and longitude are required' });
    }
  
    try {
      const user = await User.create({ name, latitude, longitude });
      res.status(201).json({message: "User created successfully", user});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})