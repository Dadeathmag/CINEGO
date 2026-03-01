import express from 'express';
import { getAllShows, getShowById, addShow, getAvailableSeats } from '../controllers/controllers.shows.js';

const router = express.Router();

router.get('/', getAllShows);
router.get('/:id', getShowById);
router.post('/', addShow);
router.get('/:showId/seats', getAvailableSeats);

export default router;
