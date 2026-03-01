import initDB from '../db/db.js';
import { generateSeatsForTheater } from '../db/initSeats.js';

// Get all theaters
export const getAllTheaters = async (req, res) => {
  try {
    const db = await initDB();
    const theaters = await db.all(`
      SELECT t.*, u.name as owner_name
      FROM theaters t
      JOIN users u ON t.owner_id = u.id
      ORDER BY t.name ASC
    `);
    
    res.json(theaters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get theater by ID
export const getTheaterById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();
    const theater = await db.get(`
      SELECT t.*, u.name as owner_name
      FROM theaters t
      JOIN users u ON t.owner_id = u.id
      WHERE t.id = ?
    `, [id]);
    
    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }
    
    res.json(theater);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new theater
export const addTheater = async (req, res) => {
  try {
    const { name, total_rows, seats_per_row, owner_id } = req.body;
    const db = await initDB();
    
    const result = await db.run(
      'INSERT INTO theaters (name, total_rows, seats_per_row, owner_id) VALUES (?, ?, ?, ?)',
      [name, total_rows, seats_per_row, owner_id]
    );
    
    // Generate seats for the theater
    await generateSeatsForTheater(db, result.lastID, total_rows, seats_per_row);
    
    res.status(201).json({ 
      message: 'Theater added successfully',
      theaterId: result.lastID 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get seats for a theater
export const getTheaterSeats = async (req, res) => {
  try {
    const { theaterId } = req.params;
    const db = await initDB();
    
    const seats = await db.all(`
      SELECT * FROM seats 
      WHERE theater_id = ?
      ORDER BY seat_number ASC
    `, [theaterId]);
    
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
