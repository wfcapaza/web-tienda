<template>
    <div class="col-md-12">
        <h4>Listado del Carrito</h4>
    </div>
    <div class="row" v-if="Boolean(carrito)">
        <div class="col-md-10 mt-3">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="juego in carrito.juegos">
                        <td>
                            <img :src="juego.urlImagenJuego"/>
                        </td>
                        <td>{{ juego.nombreJuego }}</td>
                        <td>{{ juego.precio }}</td>
                        <td>{{ juego.cantidad }}</td>
                        <td>{{ juego.precio * juego.cantidad }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-2 mt-3">

                <label class="col-md-12"><strong>Total:</strong></label>
                <div class="col-md-12">
                    <h2>{{ "S/. " + carrito.total }}</h2>
                </div>
                <div class="col-md-12 mt-3">
                    <button @click="completarCompra(carrito)" class="btn btn-success form-control">Completar Compra</button>
                </div>
                <div class="col-md-12 mt-3">
                    <button @click="limpiarCarrito(carrito)" class="btn btn-danger form-control">Limpiar Carrito</button>
                </div>
                
        </div>
    </div>
    <div class="row" v-else>
        <div class="alert alert-info">
            <p>No tiene productos seleccionados para su carrito.</p>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2';

const backendServer = "http://127.0.0.1:3000";
let config_request = {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
let carrito = ref(null);
let correoUsuario = sessionStorage.getItem("correo");

const obtenerCarrito = () => {
    axios.get(`${backendServer}/carrito/correo?correoUsuario=${correoUsuario}`)
        .then(res => {
            if(res.data.resultado){
                if(res.data.data.length > 0)
                    carrito.value = res.data.data[0]; 
            }
                           
        })
        .catch(error => {
            console.log(error);
        });
};

const limpiarCarrito = (objeto) => {

    Swal.fire({
        title: "¿Estás seguro de eliminar todo lo seleccionado en el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${backendServer}/carrito/${objeto._id}`, {}, { config_request })
                .then(res => {
                    if (res.data.resultado) {
                        toast.success("Se eliminó exitosamente");
                        carrito.value = null;
                        obtenerCarrito();
                    }
                })
                .catch(error => {
                    toast.error(error.response.data?.mensaje);
                });
        }
    });

}

const completarCompra = (objeto) => {
    Swal.fire({
        title: "¿Estás seguro de completar la compra?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.post(`${backendServer}/compra/completada`, { carritoId: objeto._id }, { config_request })
                .then(res => {
                    if (res.data.resultado) {
                        toast.success("Gracias por su compra!!!");
                        carrito.value = null;
                    }
                })
                .catch(error => {
                    toast.error(error.response.data?.mensaje);
                });
        }
    });
}

obtenerCarrito();

</script>

<style scoped>
td img{
    height: 100px;
    width: auto;
}
</style>