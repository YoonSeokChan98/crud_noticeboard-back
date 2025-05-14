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
    res.json({ result: true, data: getAllPost, message: '게시글 전체 조회에 성공했습니다.' });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 게시글 1개 조회
export const getOnePost = async (req, res) => {
  try {
    const { id } = req.body;
    const getOnePostQuery = `SELECT * FROM posts WHERE id = ?`;
    const getOnePost = await sequelize.query(getOnePostQuery, {
      type: QueryTypes.SELECT,
      replacements: [id],
    });
    const findPost = getOnePost[0];
    if (!findPost) {
      res.json({ result: false, message: '존재하지 않는 게시글입니다.' });
    }

    res.json({ result: true, data: findPost, message: `index: ${id}의 게시글을 가져왔습니다.` });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 게시글 수정 및 삭제
export const updatePost = async (req, res) => {
  try {
    const { id, userId, postTitle, postContent, postStatus } = req.body;
    const updatePostQuery = `UPDATE posts SET postTitle = ?, postContent = ?, postStatus = ? WHERE id = ?`;
    const updatePost = await sequelize.query(updatePostQuery, {
      type: QueryTypes.UPDATE,
      replacements: [postTitle, postContent, postStatus, id],
    });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
