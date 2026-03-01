# TMDB API Setup Guide

This guide will help you set up The Movie Database (TMDB) API integration for the CineGo movie booking website.

## Step 1: Get Your TMDB API Key

1. **Visit TMDB Website**: Go to [https://www.themoviedb.org](https://www.themoviedb.org)

2. **Create Account**: Sign up for a free account if you don't have one

3. **Request API Key**:
   - Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Click "Request an API Key"
   - Select "Developer" as the type
   - Fill out the application form:
     - Application Name: "CineGo Movie Booking"
     - Application Summary: "A movie booking website for theaters"
     - Application URL: "http://localhost:8080" (or your domain)
   - Accept the terms and submit

4. **Get Your API Key**: Once approved, you'll receive your API key (v3 auth)

## Step 2: Configure the API Key

1. **Create Environment File**: In your `backend` directory, create a new file named `.env` (you can copy the provided `.env.example`).

2. **Add your API Key**: Open `.env` and add your TMDB key like this:
   ```env
   TMDB_API_KEY=your_actual_api_key_here
   ```

*Note: The frontend no longer needs the API key because all traffic is securely proxied through the Node.js backend (`/api/tmdb/*`).*

## Step 3: Test the Integration

1. **Start the servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   python -m http.server 8080
   ```

2. **Test the functionality**:
   - Go to `http://localhost:8080/login-register.html`
   - Register as a theater manager (role: "theater")
   - Login and access the theater dashboard
   - Try adding a movie using the TMDB search

## Features Available with TMDB Integration

### For Theater Managers:
- **Search Movies**: Search the TMDB database for movies
- **Add Movies**: Add movies to your theater's catalog
- **Movie Details**: View detailed movie information including:
  - Movie posters
  - Release dates
  - Ratings
  - Plot summaries
  - Cast and crew information

### API Endpoints Used:
- **Search Movies**: `/search/movie` - Search for movies by title
- **Movie Details**: `/movie/{movie_id}` - Get detailed movie information
- **Movie Images**: `/movie/{movie_id}/images` - Get movie posters and backdrops

## Troubleshooting

### Common Issues:

1. **"Error searching movies. Please check your API key"**
   - Verify your API key is correctly set in `backend/.env`
   - Make sure you've restarted the backend server after adding the key

2. **CORS Errors**
   - The TMDB API supports CORS, so this shouldn't be an issue
   - If you encounter CORS errors, make sure you're accessing the frontend through `http://localhost:8080`

3. **Rate Limiting**
   - TMDB has rate limits (40 requests per 10 seconds)
   - If you hit the limit, wait a few seconds before trying again

4. **No Results Found**
   - Try different search terms
   - Check if the movie exists in TMDB database
   - Some movies might not have posters or complete information

### API Key Security:

**Important**: Your `.env` file is automatically ignored by Git (via `.gitignore`). Never drag-and-drop the `.env` file into GitHub manually.

Because this project uses a True Backend Proxy, your API key never reaches the frontend `.js` files and cannot be stolen by users inspecting the website.

## Example Usage

Once configured, theater managers can:

1. **Search for Movies**:
   - Type movie title in the search box
   - Browse through results with posters and details
   - Select a movie to add to the database

2. **Manage Movie Catalog**:
   - View all movies in the database
   - Delete movies (if no shows are scheduled)
   - Search and filter movies

3. **Schedule Shows**:
   - Select movies from the catalog
   - Choose theaters and show times
   - Create show schedules

## Additional TMDB Features (Future Enhancements)

The TMDB API offers many more features that could be integrated:

- **Popular Movies**: Get trending and popular movies
- **Movie Genres**: Filter movies by genre
- **Cast Information**: Display cast and crew details
- **Movie Trailers**: Embed movie trailers
- **Similar Movies**: Recommend similar movies
- **Movie Reviews**: Display user reviews and ratings

## Support

- **TMDB API Documentation**: [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
- **TMDB Support**: [https://www.themoviedb.org/talk](https://www.themoviedb.org/talk)
- **CineGo Issues**: Check the project repository for issues and solutions
