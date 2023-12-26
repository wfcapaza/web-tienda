const express = require('express');
const router = express.Router();
const Proveedor = require('../models/proveedor');

router.get("/", async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        return res.status(200).json({ resultado: true, data: proveedores });
    } catch (error) {
        return res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);

        if(!proveedor){
            return res.status(404).json({ resultado: false, mensaje: "Proveedor no encontrado" });
        }

        return res.status(200).json({ resultado: true, data: proveedor });
    } catch (error) {
        return res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);

        const proveedorExistente = await Proveedor.findOne({ ruc: nuevoProveedor.ruc });

        if (proveedorExistente) {
            return res.status(400).json({ resultado: false, mensaje: 'El proveedor ya existe.' });
        }

        await nuevoProveedor.save();

        return res.status(201).json({ resultado: true, message: 'Proveedor creado exitosamente.' });
    } catch (error) {
        return res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if (!proveedor) {
            return res.status(400).json({ resultado: false, mensaje: 'Proveedor no existe.' });
        }

        return res.status(200).json({ resultado: true, message: 'Proveedor actualizado correctamente.' });

    } catch (error) {
        return res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);

        if(!proveedor){
            return res.status(400).json({ resultado: false, mensaje: 'Proveedor no existe.' });
        }

        return res.status(200).json({ resultado: true, message: 'Proveedor eliminado correctamente.' });
    }
    catch(error){
        return res.status(500).json({ resultado: false, mensaje: error.message });
    }
});

module.exports = router;