import initDB from '../db/db.js';

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const db = await initDB();
    const bookings = await db.all(`
      SELECT b.*, u.name as user_name, u.email as user_email,
             s.seat_number, s.seat_type,
             sh.showtime, t.name as theater_name, m.tmdb_id
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN seats s ON b.seat_id = s.id
      JOIN shows sh ON b.show_id = sh.id
      JOIN theaters t ON sh.theater_id = t.id
      JOIN movies m ON sh.movie_id = m.id
      ORDER BY b.booked_at DESC
    `);
    
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bookings by user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await initDB();
    
    const bookings = await db.all(`
      SELECT b.*, s.seat_number, s.seat_type,
             sh.showtime, t.name as theater_name, m.tmdb_id
      FROM bookings b
      JOIN seats s ON b.seat_id = s.id
      JOIN shows sh ON b.show_id = sh.id
      JOIN theaters t ON sh.theater_id = t.id
      JOIN movies m ON sh.movie_id = m.id
      WHERE b.user_id = ?
      ORDER BY b.booked_at DESC
    `, [userId]);
    
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { user_id, show_id, seat_id } = req.body;
    const db = await initDB();
    
    // Check if seat is already booked for this show
    const existingBooking = await db.get(
      'SELECT * FROM bookings WHERE show_id = ? AND seat_id = ?',
      [show_id, seat_id]
    );
    
    if (existingBooking) {
      return res.status(400).json({ error: 'Seat is already booked for this show' });
    }
    
    const result = await db.run(
      'INSERT INTO bookings (user_id, show_id, seat_id) VALUES (?, ?, ?)',
      [user_id, show_id, seat_id]
    );
    
    res.status(201).json({ 
      message: 'Booking created successfully',
      bookingId: result.lastID 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const db = await initDB();
    
    const result = await db.run(
      'DELETE FROM bookings WHERE id = ?',
      [bookingId]
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
