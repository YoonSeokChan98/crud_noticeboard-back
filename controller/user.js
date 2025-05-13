import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

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

// 회원가입
export const signup = async (req, res) => {
  try {
    const { userName, userId, userPassword } = req.body;

    const findUserQuery = `SELECT * FROM users WHERE userId = ?`;
    const findUser = await sequelize.query(findUserQuery, {
      type: QueryTypes.SELECT,
      replacements: [userId],
    });

    if (findUser.length > 0) {
      return res.json({ result: false, message: '이미 존재하는 회원입니다.' });
    } else {
      const passwordEncryption = await bcrypt.hash(userPassword, 10);

      const createUserQuery = `INSERT INTO users (userName, userId, userPassword, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
      const now = new Date();
      const newUserName = userName ? userName : `USER-${crypto.randomBytes(6).toString('hex')}`;
      const createUser = await sequelize.query(createUserQuery, {
        type: QueryTypes.INSERT,
        replacements: [newUserName, userId, passwordEncryption, now, now],
      });

      res.json({ result: true, data: createUser, message: '회원가입 성공' });
    }
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 로그인
export const login = async (req, res) => {
  try {
    const { userId, userPassword } = req.body;
    const findUserQuery = `SELECT * FROM users WHERE userId = ?`;
    const findUser = await sequelize.query(findUserQuery, {
      type: QueryTypes.SELECT,
      replacements: [userId],
    });
    console.log("🚀 ~ login ~ findUser:", findUser)
    if (findUser.length > 0) {
      const decryptionPassword =  await bcrypt.compare(userPassword, findUser.password);
    }
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
