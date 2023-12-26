<template>
    <div class="col-md-12">
        <h4>Listado de Usuarios</h4>
    </div>
    <div class="col-md-12 mt-3">
    <table class="table table-hover">
<thead>
    <tr>
        <th>Imagen</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cantidad</th>
    </tr>
</thead>
<tbody>
    <tr v-for="juego in listaJuegos">
        <td>{{ juego.urlImagen }}</td>
        <td>{{ juego.nombre }}</td>
        <td>{{ juego.precio }}</td>
        <td>{{ juego.cantidad }}</td>
    </tr>
</tbody>
    </table>
</div>
</template>

<script setup>
const listaJuegos = [
    { nombre: "Nohay", precio: 45, cantidad: 80, urlImagen: "" },
    { nombre: "Nohay", precio: 12, cantidad: 80, urlImagen: "" }
]
</script>

<style scoped>
</style>