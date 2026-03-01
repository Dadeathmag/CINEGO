import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import initDB from './db/db.js';


import authRoutes from './routes/routes.auth.js';
import movieRoutes from './routes/routes.movies.js';
import theaterRoutes from './routes/routes.theaters.js';
import showRoutes from './routes/routes.shows.js';
import bookingRoutes from './routes/routes.bookings.js';
import apiProxyRoutes from './routes/routes.apiproxy.js';



const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tmdb', apiProxyRoutes);

app.get('/', (req, res) => {
  res.send('CineGo Movie Booking API');
});

initDB().then(async () => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});