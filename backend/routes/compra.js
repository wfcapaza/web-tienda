const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');
const Juego = require('../models/juego');
const Compra = require('../models/compra');

router.get("/correo", async(req, res) => {
    try{
        const correoUsuario = req.query.correoUsuario;
        const compras = await Compra.find({ correoUsuario });

        res.status(200).json({ resultado: true, data: compras})
    }
    catch(error){
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.post('/completada', async (req, res) =>{
    try{
        const { carritoId } = req.body;
        const carrito = await Carrito.findById(carritoId);

        if (!carrito) {
            return res.status(404).json({ resultado: false, mensaje: 'Carrito no encontrado' });
        }

        for (const item of carrito.juegos) {
            const juego = await Juego.findById(item.juego);
      
            if (!juego || juego.cantidad < item.cantidad) {
              return res.status(400).json({ resultado: false, mensaje: `No hay cantidad suficiente del juego ${juego.nombre}` });
            }
        }

        const nuevaCompra = new Compra({
            juegos: carrito.juegos,
            total: carrito.total,
            correoUsuario: carrito.correoUsuario
        });

        await nuevaCompra.save();

        for (const item of carrito.juegos) {
            const juego = await Juego.findById(item.juego);

            if (juego) {
                juego.cantidad -= item.cantidad;
                await juego.save();
            }
        }

        await Carrito.findByIdAndDelete( carritoId );

        res.status(200).json({ resultado: true, mensaje: 'Compra completada con éxito'});
    }
    catch(error)
    {
        res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

module.exports = router;