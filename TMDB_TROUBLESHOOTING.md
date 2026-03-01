# TMDB API Troubleshooting Guide

## Quick Diagnosis

### 1. Test the TMDB Test Page
1. Go to `http://localhost:8080/tmdb-test.html`
2. Click "Test Direct API Call" - this should work
3. Click "Test Movie Search" - this tests the helper functions
4. Check browser console (F12) for any errors

### 2. Check Browser Console
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try searching for movies in the theater dashboard
4. Look for any error messages

## Common Issues & Solutions

### Issue 1: "TMDB API key not configured on server"
**Symptoms**: Error message from the backend saying API key is missing.
**Solution**: 
1. Open the `backend/` folder.
2. Ensure you have created a `.env` file (copy from `.env.example`).
3. Add your key: `TMDB_API_KEY=your_actual_api_key_here`
4. **Important**: Restart your Node.js backend server (`npm start`) so it reads the new `.env` file!

### Issue 2: CORS Errors
**Symptoms**: Console shows CORS policy errors
**Solution**: 
1. Make sure you're accessing via `http://localhost:8080` (not file://)
2. Start the frontend server: `python -m http.server 8080`
3. Don't open HTML files directly in browser

### Issue 3: Network Errors
**Symptoms**: "Network error" or "Failed to fetch"
**Solution**:
1. Check internet connection
2. Verify TMDB API is working: https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=test
3. Check if firewall is blocking requests

### Issue 4: API Key Invalid
**Symptoms**: 401 Unauthorized errors
**Solution**:
1. Verify API key is correct
2. Check if API key is active in TMDB account
3. Regenerate API key if needed

### Issue 5: Rate Limiting
**Symptoms**: 429 Too Many Requests
**Solution**:
1. Wait a few minutes before trying again
2. TMDB has rate limits (40 requests per 10 seconds)

## Step-by-Step Debugging

### Step 1: Verify Server is Running
1. Ensure your backend Node server is running on `http://localhost:3000`.
2. Ensure your frontend server is running on `http://localhost:8080`.

### Step 2: Check Configuration
1. Open `backend/.env`
2. Verify `TMDB_API_KEY` is set correctly.
3. If you just added it, ensure you restarted the backend server.

### Step 3: Test in Browser
1. Go to `http://localhost:8080/tmdb-test.html`
2. Open browser console (F12)
3. Click "Test Direct API Call"
4. Check console for any errors; look for backend error Responses.

### Step 4: Test Helper Functions
1. In the test page, click "Test Movie Search"
2. Check if movies are displayed
3. Look for any error messages

## API Key Setup

### Getting TMDB API Key:
1. Go to https://www.themoviedb.org
2. Create account or login
3. Go to https://www.themoviedb.org/settings/api
4. Click "Request an API Key"
5. Select "Developer"
6. Fill out application details:
   - Application Name: "CineGo Movie Booking"
   - Application Summary: "A movie booking website"
   - Application URL: "http://localhost:8080"
7. Accept terms and submit
8. Copy the API key (v3 auth)

### Updating API Key:
1. Open `backend/.env`
2. Add line: `TMDB_API_KEY=your_actual_api_key_here`
3. Save file
4. **Restart the backend server**
5. Refresh browser

## Testing Commands

### Test Proxy Setup (Browser Console):
```javascript
fetch('http://localhost:3000/api/tmdb/search/movie?query=avengers')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Expected Behavior

### Working Correctly:
- TMDB test page shows "✅ Configuration loaded successfully"
- Direct API test shows "✅ Direct API call successful"
- Movie search displays movie results with posters
- Theater dashboard movie search works

### Not Working:
- Error messages in console
- "No movies found" when searching
- Network errors
- CORS errors

## Still Having Issues?

1. **Check the test page**: `http://localhost:8080/tmdb-test.html`
2. **Check browser console**: Look for specific error messages
3. **Verify API key**: Test it directly with curl
4. **Check network**: Make sure you can access external APIs
5. **Try different browser**: Sometimes browser extensions cause issues

## Contact Support

If you're still having issues:
1. Check the browser console for specific error messages
2. Try the TMDB test page
3. Verify your API key is working with curl
4. Make sure you're accessing via localhost:8080, not file://
