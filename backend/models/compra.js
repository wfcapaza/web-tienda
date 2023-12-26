const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
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
    correoUsuario: String,
    fecha: { type: Date, default: Date.now }
});

const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;