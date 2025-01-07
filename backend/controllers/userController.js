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
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new this.User({ username, password: hashedPassword, email });
            await newUser.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error });
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
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    }
}

module.exports = UserController;