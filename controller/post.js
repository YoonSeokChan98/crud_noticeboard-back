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
    const { userSocialId, postTitle, postContent } = req.body;
    const createPostQuery = `INSERT INTO posts (userSocialId, postTitle, postContent, postStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
    const now = new Date();
    const postStatus = 'active';
    const createPost = await sequelize.query(createPostQuery, {
      type: QueryTypes.INSERT,
      replacements: [userSocialId, postTitle, postContent, postStatus, now, now],
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
    const getAllPostQuery = `SELECT * FROM posts WHERE postStatus = 'active' ORDER BY createdAt DESC`;
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
    const { id } = req.query;
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

// 게시글 수정
export const updatePost = async (req, res) => {
  try {
    const { id, postTitle, postContent } = req.body;
    const updatePostQuery = `UPDATE posts SET postTitle = ?, postContent = ? WHERE id = ?`;
    const updatePost = await sequelize.query(updatePostQuery, {
      type: QueryTypes.UPDATE,
      replacements: [postTitle, postContent, id],
    });
    console.log('🚀 ~ updatePost ~ updatePost:', updatePost);
    res.json({ result: true, message: '게시글 수정에 성공했습니다.' });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 게시글 삭제
export const deletePost = async (req, res) => {
  try {
    const { id, postStatus } = req.body;
    const deletePostQuery = `UPDATE posts SET postStatus = ? WHERE id = ?`;
    const deletePost = await sequelize.query(deletePostQuery, {
      type: QueryTypes.UPDATE,
      replacements: [postStatus, id],
    });
    console.log('🚀 ~ deletePost ~ deletePost:', deletePost);

    res.json({ result: true, message: '게시글 삭제에 성공했습니다.' });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
