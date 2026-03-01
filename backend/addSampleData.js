import initDB from './db/db.js';
import { generateSeatsForTheater } from './db/initSeats.js';

async function addSampleData() {
  const db = await initDB();

  try {
    // Add sample users
    const users = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user' },
      { name: 'Cinema Manager', email: 'manager@cinema.com', password: 'manager123', role: 'theater' }
    ];

    console.log('Adding users...');
    for (const user of users) {
      await db.run(
        'INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, user.password, user.role]
      );
    }

    // Get user IDs
    const johnUser = await db.get('SELECT id FROM users WHERE email = ?', ['john@example.com']);
    const managerUser = await db.get('SELECT id FROM users WHERE email = ?', ['manager@cinema.com']);

    // Add sample theaters
    const theaters = [
      { name: 'CineMax Downtown', total_rows: 10, seats_per_row: 15, owner_id: managerUser.id },
      { name: 'Movie Palace', total_rows: 8, seats_per_row: 12, owner_id: managerUser.id },
      { name: 'Grand Cinema', total_rows: 12, seats_per_row: 18, owner_id: managerUser.id }
    ];

    console.log('Adding theaters...');
    const theaterIds = [];
    for (const theater of theaters) {
      const result = await db.run(
        'INSERT OR IGNORE INTO theaters (name, total_rows, seats_per_row, owner_id) VALUES (?, ?, ?, ?)',
        [theater.name, theater.total_rows, theater.seats_per_row, theater.owner_id]
      );
      
      if (result.lastID) {
        theaterIds.push(result.lastID);
        // Generate seats for the theater
        await generateSeatsForTheater(db, result.lastID, theater.total_rows, theater.seats_per_row);
      }
    }

    // Add sample movies
    const movies = [
      { tmdb_id: 550, added_by: johnUser.id }, // Fight Club
      { tmdb_id: 13, added_by: johnUser.id },  // Forrest Gump
      { tmdb_id: 680, added_by: johnUser.id }, // Pulp Fiction
      { tmdb_id: 155, added_by: johnUser.id }, // The Dark Knight
      { tmdb_id: 238, added_by: johnUser.id }  // The Godfather
    ];

    console.log('Adding movies...');
    const movieIds = [];
    for (const movie of movies) {
      const result = await db.run(
        'INSERT OR IGNORE INTO movies (tmdb_id, added_by) VALUES (?, ?)',
        [movie.tmdb_id, movie.added_by]
      );
      if (result.lastID) {
        movieIds.push(result.lastID);
      }
    }

    // Add sample shows
    console.log('Adding shows...');
    const showTimes = [
      new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    ];

    for (let i = 0; i < movieIds.length; i++) {
      for (let j = 0; j < theaterIds.length; j++) {
        for (let k = 0; k < showTimes.length; k++) {
          const showTime = new Date(showTimes[k]);
          showTime.setHours(14 + k * 3, 0, 0, 0); // 2 PM, 5 PM, 8 PM
          
          await db.run(
            'INSERT OR IGNORE INTO shows (movie_id, theater_id, showtime) VALUES (?, ?, ?)',
            [movieIds[i], theaterIds[j], showTime.toISOString()]
          );
        }
      }
    }

    console.log('Sample data added successfully!');
    console.log(`Added ${users.length} users, ${theaters.length} theaters, ${movies.length} movies, and multiple shows`);

  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    await db.close();
  }
}

// Run the script
addSampleData();
