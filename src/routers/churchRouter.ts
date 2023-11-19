import express from 'express';
import {
  getChurchById,
  createChurch,
  editChurch,
  deleteChurch,
  getAllChurches,
} from '../controllers/churchController';

const router = express.Router();

router.route('/').get(getAllChurches).post(createChurch);
router
  .route('/:churchId')
  .get(getChurchById)
  .patch(editChurch)
  .delete(deleteChurch);

export default router;
