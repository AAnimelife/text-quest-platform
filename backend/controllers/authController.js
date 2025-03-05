const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username }); 
        if (existingEmail || existingUsername) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: '1h',
        // });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Register error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Пароль не верный!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login error', error: error.message });
    }
}

module.exports = { register, login };