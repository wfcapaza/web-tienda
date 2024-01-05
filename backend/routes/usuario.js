const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({ resultado: true, data: usuarios });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            res.status(404).json({ resultado: false, mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ resultado: true, data: usuario });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);

        const usuarioExistente = await Usuario.findOne({ correo: nuevoUsuario.correo });

        if (usuarioExistente) {
            return res.status(400).json({ resultado: false, mensaje: 'El correo ya está en uso.' });
        }

        await nuevoUsuario.save();

        res.status(201).json({ resultado: true, message: 'Usuario creado exitosamente.' });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, contrasenha} = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({ resultado: false, mensaje: 'Usuario o contraseña incorrecto.' });
        }

        const contrasenhaValida = await bcrypt.compare(contrasenha, usuario.contrasenha);

        if(!contrasenhaValida){
            return res.status(401).json({ resultado: false, mensaje: 'Usuario o contraseña incorrecto.' });
        }

        res.status(200).json({ resultado: true, message: 'Inicio de sesión exitoso.' });

    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {

        const datosUsuarioAnteriores = await Usuario.findById(req.params.id);

        if (Boolean(req.body.contrasenha) && req.body.contrasenha !== datosUsuarioAnteriores.contrasenha) {
            const saltRounds = 10;
            req.body.contrasenha = await bcrypt.hash(req.body.contrasenha, saltRounds);
        }

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if (!usuario) {
            return res.status(400).json({ resultado: false, mensaje: 'Usuario no existe.' });
        }

        res.status(200).json({ resultado: true, message: 'Usuario actualizado correctamente.' });

    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if(!usuario){
            return res.status(400).json({ resultado: false, mensaje: 'Usuario no existe.' });
        }

        res.status(200).json({ resultado: true, message: 'Usuario eliminado correctamente.' });
    }
    catch(error){
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

module.exports = router;