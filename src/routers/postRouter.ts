import express from 'express';
import {
  getPostById,
  createPost,
  editPost,
  deletePost,
  getAllPosts,
} from '../controllers/postController';

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:postId').get(getPostById).patch(editPost).delete(deletePost);

export default router;
