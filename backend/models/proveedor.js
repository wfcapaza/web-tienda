const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
    razonSocial: { type: String, required: [true, "Rezón social es requerida"] },
    ruc: { type: String, required: [true, "RUC es requerido"] },
    lugar: { type: String, required: [true, "Lugar es requerido"] },
    pais: { type: String, required: [true, "País es requerido"] }
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

module.exports = Proveedor;