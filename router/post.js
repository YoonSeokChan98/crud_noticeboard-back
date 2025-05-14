import express from 'express';
import { createPost, getAllPost } from "../controller/post.js";

const router = express.Router();

router.post('/createPost', createPost);
router.get('/getAllPost', getAllPost);


export default router;
