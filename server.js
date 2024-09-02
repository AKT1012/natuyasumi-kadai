// server.js

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDBに接続
mongoose.connect('mongodb://localhost:27017/5ch-chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// JWTトークンの生成
const generateToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: '30d',
    });
};

// ユーザー登録ルート
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'そのユーザー名は既に使用されています' });
    }

    const user = await User.create({
        username,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: '無効なユーザー情報です' });
    }
});

// ログインルート
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'ユーザー名またはパスワードが間違っています' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
