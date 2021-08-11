import express from 'express'
import { getPosts, createPost, getPost, updatePost, deletePost, likePost, getPostsBySearch, getPostsProfile } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/profile/:creator', auth, getPostsProfile)
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router