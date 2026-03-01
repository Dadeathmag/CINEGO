import express from 'express';
import { getAllTheaters, getTheaterById, addTheater, getTheaterSeats } from '../controllers/controllers.theaters.js';

const router = express.Router();

router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.post('/', addTheater);
router.get('/:theaterId/seats', getTheaterSeats);

export default router;
