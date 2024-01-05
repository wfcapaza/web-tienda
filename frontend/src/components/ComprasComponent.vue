<template>
    <div class="col-md-12">
        <h4>Historial de Compras</h4>
    </div>
    <div class="row" v-if="Boolean(historial)">
        <div class="col-md-12 mt-3">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th class="text-center">Total de Juegos</th>
                        <th>Fecha</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="compra in historial">
                        <td>{{ compra._id }}</td>
                        <td class="text-center">{{ compra.juegos.length }}</td>
                        <td>{{ compra.fecha }}</td>
                        <td>{{ "S/. " + compra.total }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-center"><strong>Total General</strong> </td>
                        <td><strong>{{ "S/. " + total }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row" v-else>
        <div class="alert alert-info">
            <p>No tiene historial de compras.</p>
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
let historial = ref(null);
let correoUsuario = sessionStorage.getItem("correo");
let total = ref(0);

const obtenerCompras = () => {
    axios.get(`${backendServer}/compra/correo?correoUsuario=${correoUsuario}`)
        .then(res => {
            console.log(res);
            if(res.data.resultado){
                if(res.data.data.length > 0){
                    historial.value = res.data.data; 
                    total.value = historial.value.reduce((acumulador, objeto) => acumulador + objeto.total, 0);
                }
                    
            }
                           
        })
        .catch(error => {
            console.log(error);
        });
};

obtenerCompras();

</script>

<style scoped>
</style>