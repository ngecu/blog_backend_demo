import express from 'express'
const router = express.Router()
import {
  getComments,
  getCommentById,
  deleteComment,
  createComment,
  updateComment
} from '../controllers/commentController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getComments).post(protect, admin, createComment)
router
  .route('/:id')
  .get(getCommentById)
  .delete(protect, admin, deleteComment)
  .put(protect, admin, updateComment)

export default router
