import initDB from '../db/db.js';

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const db = await initDB();
    const movies = await db.all(`
      SELECT m.*, 
             COUNT(DISTINCT s.id) as show_count,
             COUNT(DISTINCT t.id) as theater_count
      FROM movies m
      LEFT JOIN shows s ON m.id = s.movie_id
      LEFT JOIN theaters t ON s.theater_id = t.id
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `);
    
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();
    const movie = await db.get('SELECT * FROM movies WHERE id = ?', [id]);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new movie
export const addMovie = async (req, res) => {
  try {
    const { tmdb_id, title, overview, release_date, poster_path, vote_average, added_by } = req.body;
    const db = await initDB();
    
    // Check if movie already exists
    const existingMovie = await db.get('SELECT * FROM movies WHERE tmdb_id = ?', [tmdb_id]);
    
    if (existingMovie) {
      return res.status(409).json({ 
        error: 'Movie already exists in database',
        movieId: existingMovie.id,
        message: 'This movie is already in the database'
      });
    }
    
    const result = await db.run(
      'INSERT INTO movies (tmdb_id, title, overview, release_date, poster_path, vote_average, added_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tmdb_id, title, overview, release_date, poster_path, vote_average, added_by]
    );
    
    res.status(201).json({ 
      message: 'Movie added successfully',
      movieId: result.lastID 
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ 
        error: 'Movie already exists in database',
        message: 'This movie is already in the database'
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Get shows for a specific movie
export const getMovieShows = async (req, res) => {
  try {
    const { movieId } = req.params;
    const db = await initDB();
    
    const shows = await db.all(`
      SELECT s.*, t.name as theater_name, t.total_rows, t.seats_per_row
      FROM shows s
      JOIN theaters t ON s.theater_id = t.id
      WHERE s.movie_id = ?
      ORDER BY s.showtime ASC
    `, [movieId]);
    
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();
    
    // Check if movie has any shows
    const shows = await db.get('SELECT COUNT(*) as count FROM shows WHERE movie_id = ?', [id]);
    if (shows.count > 0) {
      return res.status(400).json({ error: 'Cannot delete movie with existing shows' });
    }
    
    const result = await db.run('DELETE FROM movies WHERE id = ?', [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
