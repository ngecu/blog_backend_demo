import asyncHandler from 'express-async-handler'
import Tag from '../models/tagModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getTags = asyncHandler(async (req, res) => {
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

  const count = await Tag.countDocuments({ ...keyword })
  const tags = await Tag.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ tags, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id)

  if (tag) {
    res.json(tag)
  } else {
    res.status(404)
    throw new Error('Tag not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id)

  if (tag) {
    await tag.remove()
    res.json({ message: 'Tag removed' })
  } else {
    res.status(404)
    throw new Error('Tag not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createTag = asyncHandler(async (req, res) => {

  const {name,color,description} = req.body.tag_details

  const tag = new Tag({name,color,description})

  const createdTag = await tag.save()
  res.status(201).json(createdTag)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateTag = asyncHandler(async (req, res) => {
  const {
    name,color,description
  } = req.body.tag_details

  const tag = await Tag.findById(req.params.id)

  if (tag) {
    tag.name = name
    tag.color = color
    tag.description = description
    


    const updatedTag = await tag.save()
    res.json(updatedTag)
  } else {
    res.status(404)
    throw new Error('Tag not found')
  }
})



export {
  getTags,
  getTagById,
  deleteTag,
  createTag,
  updateTag
}
