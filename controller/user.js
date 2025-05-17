import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { QueryTypes } from 'sequelize';
import db from '../model/index.js';
const { sequelize } = db;

dotenv.config();

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
    const { userName, userSocialId, userPassword } = req.body;

    const findUserQuery = `SELECT * FROM users WHERE userSocialId = ?`;
    const findUser = await sequelize.query(findUserQuery, {
      type: QueryTypes.SELECT,
      replacements: [userSocialId],
    });

    const user = findUser[0];
    if (user) {
      return res.json({ result: false, message: '이미 존재하는 회원입니다.' });
    } else {
      const passwordEncryption = await bcrypt.hash(userPassword, 10);

      const createUserQuery = `INSERT INTO users (userName, userSocialId, userPassword, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
      const now = new Date();
      const newUserName = userName ? userName : `USER-${crypto.randomBytes(6).toString('hex')}`;
      const createUser = await sequelize.query(createUserQuery, {
        type: QueryTypes.INSERT,
        replacements: [newUserName, userSocialId, passwordEncryption, now, now],
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
    const { userSocialId, userPassword } = req.body;
    const findUserQuery = `SELECT * FROM users WHERE userSocialId = ? AND userStatus = 'active'`;
    const findUser = await sequelize.query(findUserQuery, {
      type: QueryTypes.SELECT,
      replacements: [userSocialId],
    });
    const user = findUser[0];
    if (user) {
      const decryptionPassword = await bcrypt.compare(userPassword, user.userPassword);
      if (decryptionPassword) {
        const jwtToken = {
          id: user.id,
          name: user.userName,
        };
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const token = jwt.sign({ jwtToken }, JWT_ACCESS_SECRET, { expiresIn: '1d' });
        const data = { user, token };
        res.json({ result: true, data, message: '로그인 & 토큰발급 성공' });
      } else {
        res.json({ result: false, message: '비밀번호가 틀립니다.' });
      }
    } else {
      res.json({ result: false, message: '가입된 회원이 아니거나 탈퇴한 회원입니다.' });
    }
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};

// 유저 조회
export const getUser = async (req, res) => {
  try {
    const { userSocialId } = req.query;
    const findUserQuery = `SELECT * FROM users WHERE userSocialId = ? AND userStatus = 'active'`;
    const findUser = await sequelize.query(findUserQuery, {
      type: QueryTypes.SELECT,
      replacements: [userSocialId],
    });

    const userName = findUser[0].userName;
    const userPid = findUser[0].id;
    const userId = findUser[0].userSocialId;
    const userData = { userPid, userName, userId };

    if (userData) {
      res.json({ result: true, data: userData });
    } else {
      res.json({ result: false, message: '가입된 회원이 아니거나 탈퇴한 회원입니다.' });
    }
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
};
