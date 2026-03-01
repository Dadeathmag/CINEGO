import express from 'express';

const router = express.Router();

router.use(async (req, res) => {
    // Everything after /api/tmdb
    const endpoint = req.path.substring(1); 
    // removes leading "/"

    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'TMDB API key not configured on server' });
    }

    const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);
    url.searchParams.append('api_key', apiKey);

    for (const [key, value] of Object.entries(req.query)) {
        if (key !== 'api_key') {
            url.searchParams.append(key, value);
        }
    }

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('TMDB Proxy Error:', error);
        res.status(500).json({ error: 'Failed to fetch from TMDB' });
    }
});

export default router;