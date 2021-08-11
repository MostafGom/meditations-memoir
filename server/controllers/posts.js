import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'


export const getPosts = async (req, res) => {
  const { page } = req.query
  try {
    const LIMIT = 12
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await PostMessage.countDocuments({})

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    })

  } catch (error) {

    res.status(404).json(error.message)
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query

  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

    res.json({ data: posts })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



export const getPostsProfile = async (req, res) => {
  const { creator } = req.params

  try {
    const profilePosts = await PostMessage.find({ creator: creator })
    res.json(profilePosts)

  } catch (error) {
    console.log(error);
  }
}


export const getPost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostMessage.findById(id)
    res.status(200).json(post)
  } catch (error) {
    console.log(error);
  }
}

export const createPost = async (req, res) => {
  const post = req.body

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString()
  })

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json(error.message)

  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with this Id')
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

    res.json(updatedPost)

  } catch (error) {
    res.status(409).json(error)

  }
}


export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this Id')
    await PostMessage.findByIdAndRemove(id)

    res.json("Post deleted successfully")

  } catch (error) {
    res.status(409).json(error)

  }
}

export const likePost = async (req, res) => {
  const { id } = req.params


  if (!req.userId) { return res.json({ message: "Unauthoried" }) }


  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this Id')
  try {
    const post = await PostMessage.findById(id)

    const index = await post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id,
      post, { new: true })

    res.status(200).json(updatePost)

  } catch (error) {
    res.status(409).json(error)

  }
}