// Global Application Configuration
const CONFIG = {
  //BACKEND_URL: 'http://localhost:3000'
  BACKEND_URL: 'https://cinego-7eun.onrender.com'
  
};

// TMDB API Configuration
// Traffic is proxied through the backend so the TMDB key is never sent to the browser.
const TMDB_CONFIG = {
  // Point to our own Node.js backend proxy
  BASE_URL: `${CONFIG.BACKEND_URL}/api/tmdb`,
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',

  // API endpoints (relative to our proxy)
  endpoints: {
    search: '/search/movie',
    movie: '/movie',
    popular: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    topRated: '/movie/top_rated'
  }
};

// Helper function to get full image URL (Images don't require API keys, direct to TMDB is fine)
function getImageUrl(path, size = 'w200') {
  if (!path) return '/images/no-poster.jpg';
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to make TMDB API requests
async function makeTMDBRequest(endpoint, params = {}) {
  // Strip opening slash if present so it appends nicely to BASE_URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const url = new URL(`${TMDB_CONFIG.BASE_URL}/${cleanEndpoint}`);

  // Add additional parameters (NO API KEY NEEDED!)
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  console.log('TMDB Proxy Request:', url.toString());

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB Proxy Error Response:', errorText);
      throw new Error(`TMDB Proxy error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('TMDB request failed:', error);
    throw error;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, TMDB_CONFIG, getImageUrl, makeTMDBRequest };
}

