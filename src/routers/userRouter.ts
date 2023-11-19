import express from 'express';
import {
  getUserById,
  getUsersByChurch,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:churchId/members').get(getUsersByChurch).post(createUser);
router.route('/:userId').get(getUserById).patch(editUser).delete(deleteUser);

export default router;
