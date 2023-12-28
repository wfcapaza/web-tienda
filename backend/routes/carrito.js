const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');
const Juego = require('../models/juego');

router.get("/correo", async(req, res) => {
    try{
        const correoUsuario = req.query.correoUsuario;
        const juegos = await Carrito.find({ correoUsuario });

        res.status(200).json({ resultado: true, data: juegos})
    }
    catch(error){
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const { juegoId, cantidad, correoUsuario } = req.body;

        const juego = await Juego.findById(juegoId);

        if (!juego) {
            return res.status(404).json({ resultado: false, mensaje: 'Juego no existe.' });
        }

        let carrito = await Carrito.findOne({ correoUsuario: correoUsuario});

        if (!carrito) {
            carrito = new Carrito({
                juegos: [],
                correoUsuario: correoUsuario,
                total: 0
            });
        }

        const juegoEnCarrito = carrito.juegos.find(item => item.juego.equals(juego._id));

        if (juegoEnCarrito) {
            juegoEnCarrito.cantidad += cantidad;
        }
        else {
            carrito.juegos.push({
                juego: juego,
                nombreJuego: juego.nombre,
                precio: juego.precio,
                urlImagenJuego: juego.urlImagen,
                cantidad
            });
        }

        carrito.total += juego.precio * cantidad;

        await carrito.save();

        res.status(200).json({ resultado: true, mensaje: "Juego agregado al carrito." });

    } catch (error) {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const carrito = await Carrito.findByIdAndDelete(req.params.id);

        if(!carrito){
            return res.status(400).json({ resultado: false, mensaje: 'Carrito no existe.' });
        }

        res.status(200).json({ resultado: true, mensaje: 'Carrito eliminado correctamente.' });
    }
    catch(error){
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

module.exports = router;