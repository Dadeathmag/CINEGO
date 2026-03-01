# 🎬 CineGo Database Seeder

A comprehensive database management script for the CineGo movie booking system. This seeder provides powerful tools to clear, populate, and manage your database with realistic sample data.

## 🚀 Quick Start

### **Reset Database (Recommended)**
```bash
cd backend
npm run seed:reset
```

This will:
- ✅ Clear all existing data
- ✅ Populate with fresh sample data
- ✅ Create realistic movie data with full details
- ✅ Generate proper seat layouts
- ✅ Create sample users, theaters, and shows

## 📋 Available Commands

### **NPM Scripts (Recommended)**
```bash
# Reset database with fresh data
npm run seed:reset

# Clear database only (no data)
npm run seed:clear

# Add sample data to existing database
npm run seed

# Show database statistics
npm run seed:stats
```

### **Direct Node Commands**
```bash
# Clear and seed database
node databaseSeeder.js clear-and-seed

# Clear database only
node databaseSeeder.js clear

# Add sample data only
node databaseSeeder.js seed

# Show database statistics
node databaseSeeder.js stats

# Show help
node databaseSeeder.js help
```

## 🎬 Sample Data Includes

### **👥 Users (4 accounts)**
- **John Doe** (john@example.com / password123) - Regular user
- **Jane Smith** (jane@example.com / password123) - Regular user  
- **Cinema Manager** (manager@cinema.com / manager123) - Theater manager
- **Admin User** (admin@cinego.com / admin123) - Theater manager

### **🎬 Movies (8 films with full TMDB details)**
- **Fight Club** (1999) - 8.4/10
- **Forrest Gump** (1994) - 8.5/10
- **Pulp Fiction** (1994) - 8.5/10
- **The Dark Knight** (2008) - 8.5/10
- **The Godfather** (1972) - 8.7/10
- **Schindler's List** (1993) - 8.6/10
- **12 Angry Men** (1957) - 8.5/10
- **Parasite** (2019) - 8.5/10

### **🏢 Theaters (4 venues)**
- **CineMax Downtown** (10 rows × 15 seats = 150 seats)
- **Movie Palace** (8 rows × 12 seats = 96 seats)
- **Grand Cinema** (12 rows × 18 seats = 216 seats)
- **Art House Theater** (6 rows × 10 seats = 60 seats)

### **🎭 Shows (96 total)**
- Multiple showtimes for each movie in each theater
- Shows scheduled for next 3 days at 2 PM, 5 PM, 8 PM
- Proper seat numbering (A01, A02, B01, B02, etc.)

### **💺 Seats (522 total)**
- Properly numbered seats for each theater
- A01-A15, B01-B15, C01-C15 format
- Ready for booking system

## 🔧 Advanced Usage

### **Programmatic Usage**
```javascript
import { clearDatabase, seedDatabase, clearAndSeed, showDatabaseStats } from './databaseSeeder.js';

// Clear all data
await clearDatabase();

// Add sample data
await seedDatabase();

// Clear and seed in one operation
await clearAndSeed();

// Show database statistics
await showDatabaseStats();
```

### **Custom Seeding**
You can modify the sample data by editing the constants in `databaseSeeder.js`:

```javascript
// Add more movies
const SAMPLE_MOVIES = [
  // ... existing movies
  {
    tmdb_id: 12345,
    title: 'Your Custom Movie',
    overview: 'Movie description...',
    release_date: '2023-01-01',
    poster_path: '/poster.jpg',
    vote_average: 7.5
  }
];

// Add more users
const SAMPLE_USERS = [
  // ... existing users
  { 
    name: 'Custom User', 
    email: 'custom@example.com', 
    password: 'password123', 
    role: 'user' 
  }
];
```

## 📊 Database Statistics

After seeding, your database will contain:
- **4 Users** (2 regular users, 2 theater managers)
- **4 Theaters** (different sizes and configurations)
- **8 Movies** (with full TMDB details)
- **96 Shows** (multiple showtimes per movie)
- **522 Seats** (properly numbered and organized)
- **0 Bookings** (clean slate for testing)

## 🎯 When to Use

### **Use `npm run seed:reset` when:**
- Starting fresh development
- Database is corrupted or has issues
- You want clean data with proper movie details
- Testing the application from scratch
- Movie details are not showing properly

### **Use `npm run seed:clear` when:**
- You want to start completely fresh
- You want to remove all data but keep structure
- You're preparing for a clean deployment

### **Use `npm run seed` when:**
- You have an empty database and want sample data
- You want to add test data without clearing existing data
- You're setting up a development environment

## 🚨 Important Notes

### **⚠️ Data Loss Warning**
- **These commands will delete ALL existing data**
- **Always backup important data before running**
- **Make sure the server is stopped before running**

### **🔧 Prerequisites**
- Node.js installed
- Database file exists (`backend/db/app.db`)
- All dependencies installed (`npm install`)

### **🔄 After Seeding**
1. **Start the server:** `npm start`
2. **Open the frontend** and test the application
3. **Login with sample credentials** to test different user roles
4. **Create bookings** and test the full workflow

## 🎬 Testing the Application

After running the seeder:

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open the frontend:**
   - Go to `http://localhost:8080/movies.html`
   - You should see real movie titles and posters

3. **Test user roles:**
   - **Regular User:** john@example.com / password123
   - **Theater Manager:** manager@cinema.com / manager123

4. **Test features:**
   - Browse movies with real titles and posters
   - Create shows as theater manager
   - Make bookings as regular user
   - View booking history

## 🐛 Troubleshooting

### **Common Issues:**

1. **"Cannot find module" error:**
   ```bash
   cd backend
   npm install
   ```

2. **Database locked error:**
   - Make sure the server is stopped
   - Wait a few seconds and try again

3. **Permission errors:**
   - Run as administrator (Windows)
   - Check file permissions (Linux/Mac)

4. **Empty database after seeding:**
   - Check console output for errors
   - Verify database file exists
   - Try running `npm run seed:stats` to check

### **Getting Help:**
- Check the console output for detailed error messages
- Verify all dependencies are installed
- Ensure the database file is not corrupted
- Try clearing and reseeding: `npm run seed:reset`

## ✨ Benefits

- **Real Movie Data:** Movies show actual titles, posters, and details
- **Proper Seat Numbering:** A01, A02, B01, B02 format
- **Complete Sample Data:** Everything needed to test the application
- **Easy Management:** Simple commands to reset or clear data
- **No More "Movie 18":** Real movie names throughout the app
- **Ready for Production:** Clean, realistic data for testing

---

**🎉 Happy Seeding! Your CineGo database is ready for action!**
