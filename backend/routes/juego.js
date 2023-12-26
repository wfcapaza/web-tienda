const express = require('express');
const router = express.Router();
const Juego = require('../models/juego');

router.get("/", async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.status(200).json({ resultado: true, data: juegos });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.get('/nombre', async (req, res) => {
    try {
        const nombreJuego = req.query.nombre;

        if (!nombreJuego) {
            return res.status(400).json({ mensaje: 'El nombre del juego es requerido.' });
        }

        const juegos = await Juego.find({ nombre: { $regex: new RegExp(nombreJuego, 'i') } });

        res.status(200).json({ resultado: true, data: juegos });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

router.get('/precio', async (req, res) => {
    try {
        const precioMin = parseFloat(req.query.min);
        const precioMax = parseFloat(req.query.max);

        if (isNaN(precioMin) || isNaN(precioMax)) {
            return res.status(400).json({ mensaje: 'Los precios deben ser números válidos.' });
        }

        const juegos = await Juego.find({ precio: { $gte: precioMin, $lte: precioMax } });

        res.status(200).json({ resultado: true, data: juegos });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);

        if(!juego){
            res.status(404).json({ resultado: false, mensaje: "Juego no encontrado" });
        }

        res.status(200).json({ resultado: true, data: juego });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.get('/nombre', async (req, res) => {
    try {
        const nombreJuego = req.query.nombre;

        if (!nombreJuego) {
            return res.status(400).json({ error: 'El nombre del juego es requerido.' });
        }

        const juegos = await Juego.find({ nombre: { $regex: new RegExp(nombreJuego, 'i') } });

        res.status(200).json({ resultado: true, data: juegos });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoJuego = new Juego(req.body);

        const juegoExistente = await Juego.findOne({ nombre: nuevoJuego.nombre });

        if (juegoExistente) {
            return res.status(400).json({ resultado: false, mensaje: 'El juego ya existe.' });
        }

        await nuevoJuego.save();

        res.status(201).json({ resultado: true, message: 'Juego creado exitosamente.' });
    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const juego = await Juego.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if (!juego) {
            return res.status(400).json({ resultado: false, mensaje: 'Juego no existe.' });
        }

        res.status(200).json({ resultado: true, message: 'Juego actualizado correctamente.' });

    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const juego = await Juego.findByIdAndDelete(req.params.id);

        if(!juego){
            return res.status(400).json({ resultado: false, mensaje: 'Juego no existe.' });
        }

        res.status(200).json({ resultado: true, message: 'Juego eliminado correctamente.' });
    }
    catch(error){
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});


module.exports = router;