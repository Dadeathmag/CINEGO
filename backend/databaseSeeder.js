import initDB from './db/db.js';
import { generateSeatsForTheater } from './db/initSeats.js';

/**
 * 🗑️ DATABASE CLEAR & SEED SCRIPT
 * 
 * This script provides comprehensive database management for CineGo:
 * - Clear all existing data
 * - Seed with fresh sample data
 * - Create realistic movie data with full details
 * - Generate proper seat layouts
 * - Create sample users, theaters, and shows
 */

// 🎬 Sample Movies with Full TMDB Details
const SAMPLE_MOVIES = [
  {
    tmdb_id: 550,
    title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    release_date: '1999-10-15',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    vote_average: 8.4
  },
  {
    tmdb_id: 13,
    title: 'Forrest Gump',
    overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events.',
    release_date: '1994-06-23',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    vote_average: 8.5
  },
  {
    tmdb_id: 680,
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    release_date: '1994-09-10',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    vote_average: 8.5
  },
  {
    tmdb_id: 155,
    title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.',
    release_date: '2008-07-16',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    vote_average: 8.5
  },
  {
    tmdb_id: 238,
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    release_date: '1972-03-14',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    vote_average: 8.7
  },
  {
    tmdb_id: 424,
    title: 'Schindler\'s List',
    overview: 'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory.',
    release_date: '1993-11-30',
    poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    vote_average: 8.6
  },
  {
    tmdb_id: 389,
    title: '12 Angry Men',
    overview: 'The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father.',
    release_date: '1957-04-10',
    poster_path: '/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    vote_average: 8.5
  },
  {
    tmdb_id: 496243,
    title: 'Parasite',
    overview: 'All unemployed, Ki-taek and his family take peculiar interest in the wealthy Park family, leading them to infiltrate the household by posing as unrelated, highly qualified individuals.',
    release_date: '2019-05-30',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    vote_average: 8.5
  }
];

// 👥 Sample Users
const SAMPLE_USERS = [
  { 
    name: 'John Doe', 
    email: 'john@example.com', 
    password: 'password123', 
    role: 'user' 
  },
  { 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    password: 'password123', 
    role: 'user' 
  },
  { 
    name: 'Cinema Manager', 
    email: 'manager@cinema.com', 
    password: 'manager123', 
    role: 'theater' 
  },
  { 
    name: 'Admin User', 
    email: 'admin@cinego.com', 
    password: 'admin123', 
    role: 'theater' 
  }
];

// 🏢 Sample Theaters
const SAMPLE_THEATERS = [
  { 
    name: 'CineMax Downtown', 
    total_rows: 10, 
    seats_per_row: 15, 
    description: 'Premium downtown cinema with state-of-the-art sound and projection'
  },
  { 
    name: 'Movie Palace', 
    total_rows: 8, 
    seats_per_row: 12, 
    description: 'Classic cinema experience with comfortable seating'
  },
  { 
    name: 'Grand Cinema', 
    total_rows: 12, 
    seats_per_row: 18, 
    description: 'Large format theater with IMAX-style experience'
  },
  { 
    name: 'Art House Theater', 
    total_rows: 6, 
    seats_per_row: 10, 
    description: 'Intimate setting for independent and art films'
  }
];

/**
 * 🗑️ Clear all data from the database
 */
async function clearDatabase() {
  const db = await initDB();

  try {
    console.log('🗑️  Clearing all database data...');
    console.log('⚠️  This will delete ALL existing data!');
    
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
    throw error;
  } finally {
    await db.close();
  }
}

/**
 * 🌱 Seed database with fresh sample data
 */
async function seedDatabase() {
  const db = await initDB();

  try {
    console.log('🌱 Seeding database with fresh data...');
    
    // Add sample users
    console.log('👥 Adding users...');
    const userIds = [];
    for (const user of SAMPLE_USERS) {
      const result = await db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, user.password, user.role]
      );
      userIds.push(result.lastID);
    }

    // Get manager user for theaters
    const managerUser = await db.get('SELECT id FROM users WHERE email = ?', ['manager@cinema.com']);
    const adminUser = await db.get('SELECT id FROM users WHERE email = ?', ['admin@cinego.com']);

    // Add sample theaters
    console.log('🏢 Adding theaters...');
    const theaterIds = [];
    for (const theater of SAMPLE_THEATERS) {
      const result = await db.run(
        'INSERT INTO theaters (name, total_rows, seats_per_row, owner_id) VALUES (?, ?, ?, ?)',
        [theater.name, theater.total_rows, theater.seats_per_row, managerUser.id]
      );
      
      theaterIds.push(result.lastID);
      // Generate seats for the theater
      await generateSeatsForTheater(db, result.lastID, theater.total_rows, theater.seats_per_row);
      console.log(`  ✅ ${theater.name} (${theater.total_rows} rows × ${theater.seats_per_row} seats)`);
    }

    // Add sample movies with full details
    console.log('🎬 Adding movies with full details...');
    const movieIds = [];
    for (const movie of SAMPLE_MOVIES) {
      const result = await db.run(
        'INSERT INTO movies (tmdb_id, title, overview, release_date, poster_path, vote_average, added_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [movie.tmdb_id, movie.title, movie.overview, movie.release_date, movie.poster_path, movie.vote_average, adminUser.id]
      );
      movieIds.push(result.lastID);
      console.log(`  ✅ ${movie.title} (${movie.release_date.substring(0, 4)}) - ${movie.vote_average}/10`);
    }

    // Add sample shows
    console.log('🎭 Adding shows...');
    const showTimes = [
      new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    ];

    let showCount = 0;
    for (let i = 0; i < movieIds.length; i++) {
      for (let j = 0; j < theaterIds.length; j++) {
        for (let k = 0; k < showTimes.length; k++) {
          const showTime = new Date(showTimes[k]);
          showTime.setHours(14 + k * 3, 0, 0, 0); // 2 PM, 5 PM, 8 PM
          
          await db.run(
            'INSERT INTO shows (movie_id, theater_id, showtime) VALUES (?, ?, ?)',
            [movieIds[i], theaterIds[j], showTime.toISOString()]
          );
          showCount++;
        }
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`  👥 Users: ${SAMPLE_USERS.length}`);
    console.log(`  🏢 Theaters: ${SAMPLE_THEATERS.length}`);
    console.log(`  🎬 Movies: ${SAMPLE_MOVIES.length}`);
    console.log(`  🎭 Shows: ${showCount}`);
    console.log(`  💺 Total Seats: ${SAMPLE_THEATERS.reduce((sum, t) => sum + (t.total_rows * t.seats_per_row), 0)}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await db.close();
  }
}

/**
 * 🔄 Clear and seed database in one operation
 */
async function clearAndSeed() {
  console.log('🚀 Starting database reset and seed...');
  console.log('⚠️  This will delete ALL existing data and replace it with fresh sample data!');
  
  try {
    await clearDatabase();
    await seedDatabase();
    console.log('✨ Database reset and seeding completed successfully!');
    console.log('');
    console.log('🎬 Ready to test! You can now:');
    console.log('  1. Start the server: npm start');
    console.log('  2. Open the frontend and login with:');
    console.log('     - john@example.com / password123 (regular user)');
    console.log('     - manager@cinema.com / manager123 (theater manager)');
    console.log('  3. Browse movies, create shows, and make bookings!');
  } catch (error) {
    console.error('❌ Error during database reset:', error);
    process.exit(1);
  }
}

/**
 * 📊 Show database statistics
 */
async function showDatabaseStats() {
  const db = await initDB();

  try {
    console.log('📊 Database Statistics:');
    console.log('======================');
    
    const users = await db.get('SELECT COUNT(*) as count FROM users');
    const theaters = await db.get('SELECT COUNT(*) as count FROM theaters');
    const movies = await db.get('SELECT COUNT(*) as count FROM movies');
    const shows = await db.get('SELECT COUNT(*) as count FROM shows');
    const seats = await db.get('SELECT COUNT(*) as count FROM seats');
    const bookings = await db.get('SELECT COUNT(*) as count FROM bookings');

    console.log(`👥 Users: ${users.count}`);
    console.log(`🏢 Theaters: ${theaters.count}`);
    console.log(`🎬 Movies: ${movies.count}`);
    console.log(`🎭 Shows: ${shows.count}`);
    console.log(`💺 Seats: ${seats.count}`);
    console.log(`🎫 Bookings: ${bookings.count}`);

  } catch (error) {
    console.error('❌ Error getting database stats:', error);
  } finally {
    await db.close();
  }
}

/**
 * 🎯 Main execution function
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'clear-and-seed';

  console.log('🎬 CineGo Database Seeder');
  console.log('========================');
  console.log('');

  switch (command) {
    case 'clear':
      await clearDatabase();
      break;
      
    case 'seed':
      await seedDatabase();
      break;
      
    case 'clear-and-seed':
    case 'reset':
      await clearAndSeed();
      break;
      
    case 'stats':
      await showDatabaseStats();
      break;
      
    case 'help':
      console.log('Available commands:');
      console.log('  clear           - Clear all data from database');
      console.log('  seed            - Add sample data to existing database');
      console.log('  clear-and-seed  - Clear and seed database (default)');
      console.log('  reset           - Same as clear-and-seed');
      console.log('  stats           - Show database statistics');
      console.log('  help            - Show this help message');
      break;
      
    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('Run "node databaseSeeder.js help" for available commands');
      process.exit(1);
  }
}

// Export functions for use in other scripts
export { clearDatabase, seedDatabase, clearAndSeed, showDatabaseStats };

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
