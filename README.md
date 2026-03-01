# CineGo - DBMS Group Project (Movie Booking Website)

A movie booking website built with HTML, Node.js, and SQLite3. 
**Note:** This is an academic group project for a Database Management Systems (DBMS) course. The primary focus is on database design, querying, and backend integration.

## Features

- **User Authentication**: Login and registration system *(Note: Authentication is simplified for demonstration purposes and does not use production-level security like JWTs or secure password hashing)*.
- **Movie Management**: Browse available movies
- **Theater Management**: Multiple theaters with different seating configurations
- **Show Management**: Multiple show times for each movie
- **Seat Selection**: Interactive seat selection with real-time availability
- **Booking System**: Complete booking flow with confirmation

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Custom CSS with modern design

## DBMS Project Focus
As a database management project, the core achievements of this application lie in:
- **Entity-Relationship Design**: Managing complex relationships between Users, Theaters, Movies, Shows, and Bookings.
- **Seat Generation Algorithm**: Dynamically managing bulk data insertion for theater seating configurations.
- **Concurrency & Booking State**: Handling reservations to prevent double-booking of seats.

## Project Structure

```
cinego/
├── backend/
│   ├── controllers/
│   │   ├── controllers.auth.js      # Authentication controllers
│   │   ├── controllers.movies.js    # Movie management
│   │   ├── controllers.theaters.js  # Theater management
│   │   ├── controllers.shows.js      # Show management
│   │   └── controllers.bookings.js  # Booking management
│   ├── routes/
│   │   ├── routes.auth.js           # Authentication routes
│   │   ├── routes.movies.js         # Movie routes
│   │   ├── routes.theaters.js       # Theater routes
│   │   ├── routes.shows.js          # Show routes
│   │   └── routes.bookings.js       # Booking routes
│   ├── db/
│   │   ├── db.js                    # Database initialization
│   │   ├── initSeats.js             # Seat generation utility
│   │   └── dbschema.txt             # Database schema
│   ├── server.js                    # Main server file
│   ├── addSampleData.js             # Sample data script
│   └── package.json                 # Dependencies
└── frontend/
    ├── login-register.html          # Login/Register page
    ├── movies.html                  # Movie listing page
    └── booking.html                 # Seat selection and booking
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Open `frontend/config.js` and ensure `CONFIG.BACKEND_URL` points to your running backend (default is `http://localhost:3000`).
2. Serve the `frontend` directory using a local web server (e.g., `python -m http.server 8080`).
3. Open `http://localhost:8080/login-register.html` in your web browser.
4. Start by creating an account or logging in. After login, you'll be redirected to `movies.html`.

### Database Setup

The database will be automatically created when you first run the server. To add sample data:

```bash
cd backend
node addSampleData.js
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Add new movie
- `GET /api/movies/:movieId/shows` - Get shows for a movie

### Theaters
- `GET /api/theaters` - Get all theaters
- `GET /api/theaters/:id` - Get theater by ID
- `POST /api/theaters` - Add new theater
- `GET /api/theaters/:theaterId/seats` - Get seats for a theater

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get show by ID
- `POST /api/shows` - Add new show
- `GET /api/shows/:showId/seats` - Get available seats for a show

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:bookingId` - Cancel booking

## Usage

1. **Registration/Login**: Start by creating an account or logging in
2. **Browse Movies**: View available movies on the movies page
3. **Select Show**: Choose a theater and show time
4. **Select Seats**: Pick your preferred seats from the interactive seat map
5. **Confirm Booking**: Review your selection and confirm the booking

## Sample Data

The application includes sample data with:
- 3 users (2 regular users, 1 theater manager)
- 3 theaters with different seating configurations
- 5 popular movies
- Multiple show times across different theaters
- Pre-generated seats for each theater

## Features in Detail

### Seat Selection
- Real-time seat availability
- Visual indicators for available, selected, and booked seats
- Interactive seat map with row and seat numbers
- Booking summary with total cost

### User Roles
- **User**: Can browse movies and make bookings
- **Theater**: Can manage theaters and shows (admin functionality)

### Responsive Design
- Mobile-friendly interface
- Modern UI with smooth animations
- Intuitive user experience

## Development

To extend the application:

1. **Add new features**: Create new controllers and routes
2. **Modify database**: Update the schema in `db.js`
3. **Enhance UI**: Modify the HTML/CSS files
4. **Implement Real Authentication**: Replace the current mock/simplified authentication with a secure implementation (e.g., JWT tokens, bcrypt for password hashing) if adapting for a real-world scenario.

## License

This project is open source and available under the MIT License.
