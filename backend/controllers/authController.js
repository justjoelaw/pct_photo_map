import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const generateAccessToken = (foundUser) => {
  return jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        isAdmin: foundUser.isAdmin,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  );
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const accessToken = generateAccessToken(foundUser);

  const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  if (!cookies?.jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const foundUser = await User.findOne({ username: decoded.username }).exec();

      if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const accessToken = generateAccessToken(foundUser);

      res.json({ accessToken });
    })
  );
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.json({ message: 'Cookie cleared' });
});

export { login, refresh, logout };
