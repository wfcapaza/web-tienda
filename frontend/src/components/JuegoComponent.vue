<template>
    <div class="col-md-12">
        <h4>Listado de Juegos</h4>
        <p>* Puedes filtrar por nombre o por rango de precio</p>
    </div>
    <div class="row mb-4">
        <div class="col-md-2">
            <label class="form-label">Filtro de busqueda</label>
            <select v-model="opcionSeleccionada" class="form-control">
                <option value="1">Por nombre</option>
                <option value="2">Por rango de precio</option>
            </select>
        </div>
        <div class="col-md-4" v-if="opcionSeleccionada == 1">
            <label class="form-label">Ingrese nombre</label>
            <input v-model="filtroNombre" class="form-control" placeholder="Filtro por nombre"/>
        </div>
        <div class="col-md-2" v-if="opcionSeleccionada == 2">
            <label class="form-label">Precio min.</label>
            <input v-model="filtroPrecioMin" type="number" class="form-control" placeholder="Min."/>
        </div>
        <div class="col-md-2" v-if="opcionSeleccionada == 2">
            <label class="form-label">Precio máx.</label>
            <input v-model="filtroPrecioMax" type="number" class="form-control" placeholder="Máx."/>
        </div>
        <div class="col-md-2 contenedorBoton">
            <button class="btn btn-primary" @click="obtenerJuegosPorFiltro"><span class="material-icons align-middle">filter_alt</span>&nbsp;Buscar por filtro</button>
        </div>
        <div class="col-md-2 contenedorBoton">
            <button class="btn btn-primary" @click="obtenerJuegos"><span class="material-icons align-middle">filter_alt_off</span>&nbsp;Quitar filtro</button>
        </div>
        <div class="col-md-2 contenedorBoton d-flex flex-row-reverse">
            <button class="btn btn-success" @click="mostrarModal(0)"><span class="material-icons align-middle">add</span>&nbsp;Agregar juego</button>
        </div>
    </div>    
    <!-- <div class="col-md-12 mt-3">
    <table class="table table-hover">
<thead>
    <tr>
        <th></th>
        <th>Nombre</th>
        <th>Género</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th></th>
    </tr>
</thead>
<tbody>
    <tr v-for="juego in listaJuegos">
        <td><img :src="juego.urlImagen" alt="Imagen" height="150px"></td>
        <td>{{ juego.nombre }}</td>
        <td>{{ juego.genero }}</td>
        <td>{{ juego.precio }}</td>
        <td>{{ juego.cantidad }}</td>
        <td class="text-center">
            <button type="button" class="btn btn-success"><span class="material-icons align-middle">edit</span>&nbsp;Editar</button>
            &nbsp;
            <button type="button" class="btn btn-danger"><span class="material-icons align-middle">delete</span>&nbsp;Eliminar</button>
        </td>
    </tr>
</tbody>
    </table>
</div> -->
    <div class="row">
        <div class="col-md-3 mt-3" v-for="juego in listaJuegos">
            <div class="card">
            <img :src="juego.urlImagen" class="card-img-top" alt="imagen">
            <div class="card-body">
                <h5 class="card-title">{{ juego.nombre }}</h5>
                <p class="card-text">{{ juego.descripcion }}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Precio:</strong> S/. {{ juego.precio }} | <strong>Cantidad:</strong> {{ juego.cantidad }}</li>
                <li class="list-group-item"><strong>Género:</strong> {{ juego.genero }}</li>
            </ul>
            <div class="card-body d-flex justify-content-evenly">
                <button type="button" class="btn btn-success" @click="mostrarModal(1, juego)"><span class="material-icons align-middle">edit</span>&nbsp;Editar</button>
                <button type="button" class="btn btn-danger"><span class="material-icons align-middle">delete</span>&nbsp;Eliminar</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="crearEditarModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ tituloModal }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="col-form-label">Nombre</label>
                        <input class="form-control" v-model="juego.nombre" placeholder="Ingrese nombre"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">Género</label>
                        <input class="form-control" v-model="juego.genero" placeholder="Ingrese género"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="col-form-label">Precio</label>
                        <input class="form-control" v-model="juego.precio" type="number" placeholder="Ingrese precio"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">Cantidad</label>
                        <input class="form-control" v-model="juego.cantidad" type="number" placeholder="Ingrese cantidad"/>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-form-label">URL Imagen</label>
                    <input class="form-control" v-model="juego.urlImagen" placeholder="Ingrese url imagen"/>
                </div>
                <div class="mb-3">
                    <label class="col-form-label">Descripción</label>
                    <textarea class="form-control" v-model="juego.descripcion" rows="5" placeholder="Ingrese descripción"></textarea>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"><span class="material-icons align-middle">save</span>&nbsp;Guardar</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><span class="material-icons align-middle">cancel</span>&nbsp;Cerrar</button>            
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const backendServer = "http://127.0.0.1:3000";
let listaJuegos = ref([]);
let opcionSeleccionada = ref(1);
let juego = ref({});
let filtroNombre = "";
let filtroPrecioMin = 0;
let filtroPrecioMax = 200;
let tituloModal = ref("Nuevo Juego");

const obtenerJuegosPorFiltro = () => {
    let endPoint = backendServer + "/juego";

    if(opcionSeleccionada.value == 1){
        endPoint += `/nombre?nombre=${filtroNombre}`;
    }
    else{
        endPoint += `/precio?min=${filtroPrecioMin}&max=${filtroPrecioMax}`;
    }

    axios.get(endPoint)
        .then(res => {
            console.log(res.data)
            if (res.data.resultado){
                toast.success("Se filtró exitosamente");
                listaJuegos.value = res.data.data;
            }
        })
        .catch(error => {
            toast.error(error.response.data?.mensaje);
        });
}

//accion 0=nuevo, 1=editar
const mostrarModal = (accion, objeto = {}) => {    
    let modalJuego = new bootstrap.Modal(document.getElementById('crearEditarModal'), { keyboard: false });
    
    if(accion == 1){
        juego.value = objeto;
        tituloModal.value = "Editar Juego";
    }
    else{
        juego.value = {};
        tituloModal.value = "Nuevo Juego";
    }
        
    modalJuego.show();
}

//accion 0=nuevo, 1=editar
const crearEditarJuego = (accion) => {
    
}

const obtenerJuegos = () => {
    axios.get(backendServer + "/juego")
        .then(res => {
            if(res.data.resultado)
                listaJuegos.value = res.data.data;            
        })
        .catch(error => {
            console.log(error);
        });
};

obtenerJuegos();

</script>

<style scoped>
img{
    border-radius: 25px;
    height: 300px;
    width: auto;
}
.card{
    border-radius: 25px;
}
.card-text{
    max-height: 150px;
    overflow-y: auto;
}
.contenedorBoton{
    display: flex;
    flex-direction: row;
    align-items: end;
}
</style>