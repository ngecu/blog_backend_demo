import asyncHandler from 'express-async-handler'
import Comment from '../models/commentModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Comment.countDocuments({ ...keyword })
  const comments = await Comment.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ comments, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (comment) {
    res.json(comment)
  } else {
    res.status(404)
    throw new Error('Comment not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (comment) {
    await comment.remove()
    res.json({ message: 'Comment removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createComment = asyncHandler(async (req, res) => {

  const {content,author_id,post_id} = req.body.comment_details

  const comment = new Comment({content,author_id,post_id})

  const createdComment = await comment.save()
  res.status(201).json(createdComment)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateComment = asyncHandler(async (req, res) => {
  const {
    name
  } = req.body.comment_details

  const comment = await Comment.findById(req.params.id)

  if (comment) {
    comment.content = content
    comment.author_id = author_id
    comment.post_id = post_id
    


    const updatedComment = await comment.save()
    res.json(updatedComment)
  } else {
    res.status(404)
    throw new Error('Comment not found')
  }
})



export {
  getComments,
  getCommentById,
  deleteComment,
  createComment,
  updateComment
}
