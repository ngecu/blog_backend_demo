import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .populate('category')
    .sort({ createdAt: -1 }) // Sort by upload date in descending order
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category')

  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

const getPostByCategory = asyncHandler(async (req, res) => {
  const posts = await Post.find({category:req.params.id})

  if (posts) {
    res.json(posts)
  } else {
    res.status(404)
    throw new Error('Posts not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {

  console.log("body is ",req.body)
  const {title,content,image,tags,category,user} = req.body

  const post = new Post({title,content,image,tags,category,user})

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const {
    title,content,author_id,tags
  } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    product.title = title
    product.content = content
    product.author_id = author_id
    product.tags = tags


    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})


const getMyPosts = asyncHandler(async (req, res) => {
  console.log("user od os ",req.user._id )
  const posts = await Post.find({ user: req.user._id })
  res.json(posts)
})



export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostByCategory,
  getMyPosts
}
