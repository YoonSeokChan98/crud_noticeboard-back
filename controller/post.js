import { QueryTypes } from 'sequelize';

import db from '../model/index.js';
const { sequelize } = db;

/**
  export const a = async (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
 */

// 게시글 작성
export const createPost = async (req, res) => {
  try {
    const { userId, postTitle, postContent } = req.body;
    const createPostQuery = `INSERT INTO posts (userId, postTitle, postContent, postStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
    const now = new Date();
    const postStatus = 'active';
    const createPost = await sequelize.query(createPostQuery, {
      type: QueryTypes.INSERT,
      replacements: [userId, postTitle, postContent, postStatus, now, now],
    });
    const newPost = createPost[0];
    res.json({ result: true, data: newPost, message: '새로운 게시글이 성공적으로 등록되었습니다.' });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 게시글 전체 조회
export const getAllPost = async (req, res) => {
  try {
    const getAllPostQuery = `SELECT * FROM posts`;
    const getAllPost = await sequelize.query(getAllPostQuery, {
      type: QueryTypes.SELECT,
    });
    if (!getAllPost[0]) {
      res.json({ result: false, message: '등록된 게시글이 없습니다.' });
    }
    res.json({ result: true, data: getAllPost });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 게시글 1개 조회
export const getOnePost = async (req, res) => {
  try {
    const { id } = req.body;
    const getOnePostQuery = ``;
    const 
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
