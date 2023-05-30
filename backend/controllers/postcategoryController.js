import asyncHandler from 'express-async-handler'
import PostCategory from '../models/postCategoryModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getPostCategories = asyncHandler(async (req, res) => {
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

  const count = await PostCategory.countDocuments({ ...keyword })
  const postcategories = await PostCategory.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ postcategories, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getPostCategoryById = asyncHandler(async (req, res) => {
  const postcategory = await PostCategory.findById(req.params.id)

  if (postcategory) {
    res.json(postcategory)
  } else {
    res.status(404)
    throw new Error('Post Category not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deletePostCategory = asyncHandler(async (req, res) => {
  const postcategory = await PostCategory.findById(req.params.id)

  if (postcategory) {
    await postcategory.remove()
    res.json({ message: 'Post Category removed' })
  } else {
    res.status(404)
    throw new Error('Post Category not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createPostCategory = asyncHandler(async (req, res) => {

  const {POST_CATEGORY_CATEGORY_id,category_id} = req.body.POST_CATEGORY_CATEGORY_category_details

  const postcategory = new PostCategory({POST_CATEGORY_CATEGORY_id,category_id})

  const createdPostCategory = await postcategory.save()
  res.status(201).json(createdPostCategory)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePostCategory = asyncHandler(async (req, res) => {
  const {
    POST_CATEGORY_CATEGORY_id,category_id
  } = req.body

  const postcategory = await PostCategory.findById(req.params.id)

  if (postcategory) {
    postcategory.POST_CATEGORY_CATEGORY_id = POST_CATEGORY_CATEGORY_id
    postcategory.category_id = category_id

    const updatedPostCategory = await postcategory.save()
    res.json(updatedPostCategory)
  } else {
    res.status(404)
    throw new Error('Post Category not found')
  }
})



export {
  getPostCategories,
  getPostCategoryById,
  deletePostCategory,
  createPostCategory,
  updatePostCategory
}
