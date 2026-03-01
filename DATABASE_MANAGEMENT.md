# Database Management Commands

## 🗑️ Clear Database Functions

I've created comprehensive database management functions to help you manage your CineGo database.

### 📁 Files Created:
- `backend/clearDatabase.js` - Main database management functions
- `backend/resetDatabase.js` - Simple script to reset everything
- Updated `package.json` with npm scripts

### 🚀 Available Commands:

#### **1. Reset Database (Recommended)**
```bash
cd backend
npm run reset-db
```
**What it does:**
- ✅ Clears all existing data
- ✅ Regenerates fresh sample data with proper movie details
- ✅ Creates users, theaters, movies, shows, and seats
- ✅ Movies now have real titles, posters, and details

#### **2. Clear Database Only**
```bash
cd backend
npm run clear-db
```
**What it does:**
- ✅ Clears all data but doesn't add sample data
- ✅ Leaves you with empty database

#### **3. Add Sample Data Only**
```bash
cd backend
npm run add-sample
```
**What it does:**
- ✅ Adds sample data to existing database
- ✅ Won't clear existing data

### 🎬 Sample Data Includes:

**Users:**
- John Doe (john@example.com) - Regular user
- Jane Smith (jane@example.com) - Regular user  
- Cinema Manager (manager@cinema.com) - Theater manager

**Movies (with full TMDB details):**
- Fight Club (1999) - 8.4/10
- Forrest Gump (1994) - 8.5/10
- Pulp Fiction (1994) - 8.5/10
- The Dark Knight (2008) - 8.5/10
- The Godfather (1972) - 8.7/10

**Theaters:**
- CineMax Downtown (10 rows × 15 seats)
- Movie Palace (8 rows × 12 seats)
- Grand Cinema (12 rows × 18 seats)

**Shows:**
- Multiple showtimes for each movie in each theater
- Shows scheduled for next 3 days at 2 PM, 5 PM, 8 PM

### 🔧 Manual Database Functions:

You can also use the functions directly in your code:

```javascript
import { clearDatabase, regenerateSampleData, clearAndRegenerate } from './clearDatabase.js';

// Clear all data
await clearDatabase();

// Add sample data
await regenerateSampleData();

// Clear and regenerate (recommended)
await clearAndRegenerate();
```

### 🎯 When to Use:

**Use `npm run reset-db` when:**
- Movie details are not showing properly
- You want fresh data with proper movie information
- Database is corrupted or has issues
- You want to start over with clean data

**Use `npm run clear-db` when:**
- You want to start completely fresh
- You want to remove all data but keep structure

**Use `npm run add-sample` when:**
- You have an empty database and want sample data
- You want to add test data without clearing existing data

### ✨ Benefits:

- **Real Movie Data**: Movies now show actual titles, posters, and details
- **Proper Seat Numbering**: A01, A02, B01, B02 format
- **Complete Sample Data**: Everything needed to test the application
- **Easy Management**: Simple commands to reset or clear data
- **No More "Movie 18"**: Real movie names throughout the app

### 🚨 Important Notes:

- **Backup First**: These commands will delete all existing data
- **Stop Server**: Make sure the backend server is stopped before running
- **Fresh Start**: After reset, you'll need to restart the server
- **Login Credentials**: Use the sample user credentials to test

### 🎬 Test the Fix:

1. **Reset the database:**
   ```bash
   cd backend
   npm run reset-db
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Test the application:**
   - Go to `http://localhost:8080/movies.html`
   - You should see real movie titles and posters
   - Login as theater manager to see proper movie names in dropdowns

The movie details issue should now be completely resolved! 🎉
