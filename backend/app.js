const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const usuariosRouter = require('./routes/usuario');
const juegosRouter = require('./routes/juego');
const proveedoresRouter = require('./routes/proveedor');
const carritosRouter = require('./routes/carrito');
const comprasRouter = require('./routes/compra');

const app = express();
app.use(express.json());

app.use(cors());

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

//EndPoints
app.use("/usuario", usuariosRouter);
app.use("/juego", juegosRouter);
app.use("/proveedor", proveedoresRouter);
app.use("/carrito", carritosRouter);
app.use("/compra", comprasRouter);

const start = async () => {
    try {
      await mongoose.connect(
        "mongodb://127.0.0.1:27017/TiendaJuegos"
      );
      app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

start();
