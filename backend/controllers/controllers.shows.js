import initDB from '../db/db.js';

// Get all shows
export const getAllShows = async (req, res) => {
  try {
    const db = await initDB();
    const shows = await db.all(`
      SELECT s.*, m.tmdb_id, t.name as theater_name
      FROM shows s
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      ORDER BY s.showtime ASC
    `);
    
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get show by ID
export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();
    
    const show = await db.get(`
      SELECT s.*, m.tmdb_id, t.name as theater_name, t.total_rows, t.seats_per_row
      FROM shows s
      JOIN movies m ON s.movie_id = m.id
      JOIN theaters t ON s.theater_id = t.id
      WHERE s.id = ?
    `, [id]);
    
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new show
export const addShow = async (req, res) => {
  try {
    const { movie_id, theater_id, showtime } = req.body;
    const db = await initDB();
    
    const result = await db.run(
      'INSERT INTO shows (movie_id, theater_id, showtime) VALUES (?, ?, ?)',
      [movie_id, theater_id, showtime]
    );
    
    res.status(201).json({ 
      message: 'Show added successfully',
      showId: result.lastID 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get available seats for a show
export const getAvailableSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const db = await initDB();
    
    const availableSeats = await db.all(`
      SELECT s.*, 
             CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END as is_booked
      FROM seats s
      JOIN theaters t ON s.theater_id = t.id
      JOIN shows sh ON sh.theater_id = t.id
      LEFT JOIN bookings b ON s.id = b.seat_id AND b.show_id = ?
      WHERE sh.id = ?
      ORDER BY s.seat_number ASC
    `, [showId, showId]);
    
    res.json(availableSeats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
