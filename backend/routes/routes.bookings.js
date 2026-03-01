import express from 'express';
import { getAllBookings, getUserBookings, createBooking, cancelBooking } from '../controllers/controllers.bookings.js';

const router = express.Router();

router.get('/', getAllBookings);
router.get('/user/:userId', getUserBookings);
router.post('/', createBooking);
router.delete('/:bookingId', cancelBooking);

export default router;
