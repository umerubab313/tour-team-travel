// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());




// Routes
app.use('/api/auth', require('./routes/auth'));  // Add the auth routes
app.use('/api/listings', require('./routes/listings'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/spots', require('./routes/spots'));
app.use('/api/guides', require('./routes/guides'));

app.use('/api/bookings/hotels', require('./routes/hotelBookings'));
app.use('/api/bookings/guides', require('./routes/guideBookings'));
app.use('/api/bookings/restaurants', require('./routes/restaurantBookings'));

app.use('/api/reviews/hotels', require('./routes/hotelReviews'));
app.use('/api/reviews/guides', require('./routes/guideReviews'));
app.use('/api/reviews/restaurants', require('./routes/restaurantReviews'));

//admin
app.use('/api/admin', require('./routes/adminAuth'))
app.use('/api/admin', require('./routes/adminAdd'));
app.use('/api/admin', require('./routes/adminAnalytics'));
app.use('/api/admin/bookings', require('./routes/adminBookings'));


// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB connected'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));