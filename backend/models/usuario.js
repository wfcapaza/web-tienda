const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "Nombre es requerido"] },
    correo: { type: String, required: [true, "Correo es requerido"] },
    contrasenha: { type: String, required: [true, "Contraseña es requerido"] },
    edad: Number,
    pais: String
});

usuarioSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.contrasenha, salt);
        this.contrasenha = hashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;