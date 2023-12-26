const mongoose = require("mongoose");

const juegoSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "Nombre es requerido"] },
    precio: { type: Number, required: [true, "Precio es requerido"] },
    cantidad: { type: Number, required: [true, "Cantidad es requerido"] },
    urlImagen: { type: String, required: [true, "Url imagen es requerido"] },
    genero: { type: String, required: [true, "Genero es requerido"] },
    descripcion: { type: String }  
});

const Juego = mongoose.model("Juego", juegoSchema);

module.exports = Juego;