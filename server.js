const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // Array to store user locations

app.post('/send-alert', (req, res) => {
  const { latitude, longitude } = req.body; // Get user's location from request
  // Logic to find users within 2km radius
  const alertedUsers = users.filter(user => {
    const distance = calculateDistance(latitude, longitude, user.latitude, user.longitude);
    return distance <= 2; // 2km radius
  });
  
  // Notify alerted users (e.g., via push notifications)
  console.log('Alert sent to users:', alertedUsers);
  res.send('Alert sent to users within 2km');
});

// Function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula to calculate distance
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
