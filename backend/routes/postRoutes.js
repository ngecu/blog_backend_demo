import express from 'express'
const router = express.Router()
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostByCategory,
  getMyPosts
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(createPost)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect, admin, deletePost)
  .put(updatePost)

  router
  .route('/myposts')
  .get(protect,getMyPosts)

  
router.route('/category/:id').get(getPostByCategory)

export default router
