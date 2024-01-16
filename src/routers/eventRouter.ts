import express from 'express';
import {
  getEventById,
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  addAttendant,
} from '../controllers/eventController';

const router = express.Router();

router.route('/').get(getAllEvents).post(createEvent);
router
  .route('/:eventId')
  .get(getEventById)
  .patch(editEvent)
  .delete(deleteEvent);
router.route('/:eventId/addAttendant').patch(addAttendant);

export default router;
