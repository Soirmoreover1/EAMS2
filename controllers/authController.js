const { User }= require('../models/User');
const { sendResetPasswordEmail } = require('../services/mailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.status(204).end();
};

const forgetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = uuidv4();
    await User.update({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }, { where: { id: user.id } });
    await sendResetPasswordEmail(user, token);
    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*
const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid reset link' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null }, { where: { id: user.id } });
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
module.exports = {
  signup,
  login,
  logout,
  /*forgetPassword,
  resetPassword,*/
};