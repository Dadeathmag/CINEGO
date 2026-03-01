import express from 'express';
import { getAllMovies, getMovieById, addMovie, getMovieShows, deleteMovie } from '../controllers/controllers.movies.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', addMovie);
router.delete('/:id', deleteMovie);
router.get('/:movieId/shows', getMovieShows);

export default router;
