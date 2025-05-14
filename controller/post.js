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
    const {userId} = req.body;
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
