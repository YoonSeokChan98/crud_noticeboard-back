import express from 'express';
import { signup, login, getUser } from '../controller/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get-user', getUser);


export default router;
