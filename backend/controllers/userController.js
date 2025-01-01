const User = require('../models/userModel');

class UserController {
    constructor() {
        this.User = User;
    }

    async registerUser(req, res) {
        const { username, password, email } = req.body;
        try {
            const newUser = new this.User({ username, password, email });
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
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    }
}

module.exports = UserController;