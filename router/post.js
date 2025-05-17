import express from 'express';
import { createPost, getAllPost, getOnePost, updatePost,deletePost } from "../controller/post.js";

const router = express.Router();

router.post('/create_post', createPost);
router.get('/get_all_post', getAllPost);
router.get('/get_one_post', getOnePost);
router.patch('/update_post', updatePost);
router.patch('/delete_post', deletePost);


export default router;
