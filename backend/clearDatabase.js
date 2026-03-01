import initDB from './db/db.js';
import { generateSeatsForTheater } from './db/initSeats.js';

async function clearDatabase() {
  const db = await initDB();

  try {
    console.log('🗑️  Clearing all database data...');
    
    // Clear all data in correct order (respecting foreign key constraints)
    await db.run('DELETE FROM bookings');
    console.log('✅ Cleared bookings');
    
    await db.run('DELETE FROM seats');
    console.log('✅ Cleared seats');
    
    await db.run('DELETE FROM shows');
    console.log('✅ Cleared shows');
    
    await db.run('DELETE FROM movies');
    console.log('✅ Cleared movies');
    
    await db.run('DELETE FROM theaters');
    console.log('✅ Cleared theaters');
    
    await db.run('DELETE FROM users');
    console.log('✅ Cleared users');
    
    console.log('🎉 Database cleared successfully!');
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await db.close();
  }
}

async function regenerateSampleData() {
  const db = await initDB();

  try {
    console.log('🔄 Regenerating sample data...');
    
    // Add sample users
    const users = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user' },
      { name: 'Cinema Manager', email: 'manager@cinema.com', password: 'manager123', role: 'theater' }
    ];

    console.log('👥 Adding users...');
    for (const user of users) {
      await db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
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

    console.log('🏢 Adding theaters...');
    const theaterIds = [];
    for (const theater of theaters) {
      const result = await db.run(
        'INSERT INTO theaters (name, total_rows, seats_per_row, owner_id) VALUES (?, ?, ?, ?)',
        [theater.name, theater.total_rows, theater.seats_per_row, theater.owner_id]
      );
      
      theaterIds.push(result.lastID);
      // Generate seats for the theater
      await generateSeatsForTheater(db, result.lastID, theater.total_rows, theater.seats_per_row);
    }

    // Add sample movies with full details
    const movies = [
      { 
        tmdb_id: 550, 
        title: 'Fight Club', 
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
        release_date: '1999-10-15',
        poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        vote_average: 8.4,
        added_by: johnUser.id 
      },
      { 
        tmdb_id: 13, 
        title: 'Forrest Gump', 
        overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events.',
        release_date: '1994-06-23',
        poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
        vote_average: 8.5,
        added_by: johnUser.id 
      },
      { 
        tmdb_id: 680, 
        title: 'Pulp Fiction', 
        overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        release_date: '1994-09-10',
        poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        vote_average: 8.5,
        added_by: johnUser.id 
      },
      { 
        tmdb_id: 155, 
        title: 'The Dark Knight', 
        overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.',
        release_date: '2008-07-16',
        poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        vote_average: 8.5,
        added_by: johnUser.id 
      },
      { 
        tmdb_id: 238, 
        title: 'The Godfather', 
        overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        release_date: '1972-03-14',
        poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        vote_average: 8.7,
        added_by: johnUser.id 
      }
    ];

    console.log('🎬 Adding movies with full details...');
    const movieIds = [];
    for (const movie of movies) {
      const result = await db.run(
        'INSERT INTO movies (tmdb_id, title, overview, release_date, poster_path, vote_average, added_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [movie.tmdb_id, movie.title, movie.overview, movie.release_date, movie.poster_path, movie.vote_average, movie.added_by]
      );
      movieIds.push(result.lastID);
    }

    // Add sample shows
    console.log('🎭 Adding shows...');
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
            'INSERT INTO shows (movie_id, theater_id, showtime) VALUES (?, ?, ?)',
            [movieIds[i], theaterIds[j], showTime.toISOString()]
          );
        }
      }
    }

    console.log('🎉 Sample data regeneration completed successfully!');
    console.log(`✅ Added ${users.length} users, ${theaters.length} theaters, ${movies.length} movies, and multiple shows`);

  } catch (error) {
    console.error('❌ Error regenerating data:', error);
  } finally {
    await db.close();
  }
}

async function clearAndRegenerate() {
  console.log('🚀 Starting database reset...');
  await clearDatabase();
  await regenerateSampleData();
  console.log('✨ Database reset completed!');
}

// Export functions for use
export { clearDatabase, regenerateSampleData, clearAndRegenerate };

// If run directly, clear and regenerate
if (import.meta.url === `file://${process.argv[1]}`) {
  clearAndRegenerate();
}
