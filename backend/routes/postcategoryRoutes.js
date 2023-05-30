import express from 'express'
const router = express.Router()
import {
  getPostCategories,
  getPostCategoryById,
  deletePostCategory,
  createPostCategory,
  updatePostCategory
} from '../controllers/postcategoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPostCategories).post(protect, admin, createPostCategory)
router
  .route('/:id')
  .get(getPostCategoryById)
  .delete(protect, admin, deletePostCategory)
  .put(protect, admin, updatePostCategory)

export default router
