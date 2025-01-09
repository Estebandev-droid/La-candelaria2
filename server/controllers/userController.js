const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
    constructor() {
        this.User = User;
    }

    async registerUser(req, res) {
        const { username, password, email } = req.body;
        try {
            const existingUser = await this.User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new this.User({ username, password: hashedPassword, email });
            await newUser.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
    }

    async getMe(req, res) {
        try {
            const user = await this.User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    }
}

module.exports = UserController;