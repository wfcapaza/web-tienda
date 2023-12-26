const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    juegos: [
        {
            juego: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Juego'
            },
            cantidad: Number
        }
    ],
    total: Number,
    correoUsuario: { type: String, required: [true, "Correo es requerido"] }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;