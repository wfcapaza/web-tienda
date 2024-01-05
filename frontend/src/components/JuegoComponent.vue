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
        <div class="col-md-4 contenedorBoton">
            <button class="btn btn-primary" @click="obtenerJuegosPorFiltro"><span class="material-icons align-middle">filter_alt</span>&nbsp;Añadir filtro</button>&nbsp;&nbsp;
            <button class="btn btn-primary" @click="obtenerJuegos"><span class="material-icons align-middle">filter_alt_off</span>&nbsp;Quitar filtro</button>
        </div>
        <div class="col-md-2 contenedorBoton d-flex flex-row-reverse">
            <button class="btn btn-success" @click="mostrarModal(0)"><span class="material-icons align-middle">add</span>&nbsp;Agregar juego</button>
        </div>
    </div>    
    <div class="row">
        <div class="col-md-3 mt-3" v-for="juego in listaJuegos">
            <div class="card">
            <img :src="juego.urlImagen" class="card-img-top" alt="imagen">
            <div class="card-body">
                <h5 class="card-title">{{ juego.nombre }}</h5>
                <p class="card-text">{{ juego.descripcion }}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <span><strong>Precio:</strong> S/. {{ juego.precio }} </span>
                        <span>&nbsp; | &nbsp;</span>
                        <span><strong>Cantidad:</strong> {{ juego.cantidad }} </span>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <div class="col-md-6">
                            <span><strong>Género:</strong> {{ juego.genero }}</span>
                        </div>
                        <div class="col-md-6 d-flex flex-row-reverse">
                            <button type="button" title="Agregar Carrito" class="btn btn-warning" @click="openModalCarrito(juego)">
                                <span class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </li>
             </ul>
            <div class="card-body d-flex justify-content-evenly">
                <button type="button" class="btn btn-success" @click="mostrarModal(1, juego)"><span class="material-icons align-middle">edit</span>&nbsp;Editar</button>
                <button type="button" class="btn btn-danger" @click="eliminarJuego(juego._id)"><span class="material-icons align-middle">delete</span>&nbsp;Eliminar</button>
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
            <button type="button" class="btn btn-primary" @click="crearEditarJuego(juego)"><span class="material-icons align-middle">save</span>&nbsp;Guardar</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><span class="material-icons align-middle">cancel</span>&nbsp;Cerrar</button>            
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="agregarCarritoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Carrito</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="col-form-label">Nombre</label>
                        <input class="form-control" v-model="carrito.nombre" readonly/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">Cantidad</label>
                        <input class="form-control" type="number" v-model="carrito.cantidad" placeholder="Ingrese cantidad"/>
                    </div>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="agregarCarrito(carrito)"><span class="material-icons align-middle">save</span>&nbsp;Guardar</button>
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
import Swal from 'sweetalert2';


const backendServer = "http://127.0.0.1:3000";
let listaJuegos = ref([]);
let opcionSeleccionada = ref(1);
let juego = ref({});
let filtroNombre = "";
let filtroPrecioMin = 0;
let filtroPrecioMax = 200;
let tituloModal = ref("Nuevo Juego");
let modalJuego = {};
let modalCarrito = {};
let accionRealizar = 0;
let config_request = {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
let carrito = ref({});


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
    modalJuego = new bootstrap.Modal(document.getElementById('crearEditarModal'), { keyboard: false });
    
    if(accion == 1){
        juego.value = objeto;
        accionRealizar = 1;
        tituloModal.value = "Editar Juego";
    }
    else{
        juego.value = {};
        accionRealizar = 0;
        tituloModal.value = "Nuevo Juego";
    }
        
    modalJuego.show();
}

//accion 0=nuevo, 1=editar
const crearEditarJuego = (objeto) => {
    
    if(accionRealizar == 0){
        axios.post(backendServer + "/juego", objeto, { config_request })
        .then(res => {
            if(res.data.resultado){
                obtenerJuegos();
                toast.success("Se guardó exitosamente");
                modalJuego.hide();
            }                            
        })
        .catch(error => {
            toast.error(error.response.data?.mensaje);
        });
    }else{
        axios.patch(`${backendServer}/juego/${objeto._id}`, objeto, { config_request })
        .then(res => {
            if(res.data.resultado){
                obtenerJuegos();
                toast.success("Se actualizó exitosamente");
                modalJuego.hide();
            }                        
        })
        .catch(error => {
            toast.error(error.response.data?.mensaje);
        });
    }
}

const eliminarJuego = (id) => {

    Swal.fire({
        title: "¿Estás seguro de eliminar el juego?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${backendServer}/juego/${id}`, {}, { config_request })
                .then(res => {
                    if (res.data.resultado) {
                        obtenerJuegos();
                        toast.success("Se eliminó correctamente");
                    }
                })
                .catch(error => {
                    toast.error(error.response.data?.mensaje);
                });
        }
    });
    
}

const openModalCarrito = (juego) => {
    modalCarrito = new bootstrap.Modal(document.getElementById('agregarCarritoModal'), { keyboard: false });
    carrito.value.juegoId = juego._id;
    carrito.value.nombre = juego.nombre;
    carrito.value.cantidad = 1;
    carrito.value.correoUsuario = sessionStorage.getItem("correo");
    modalCarrito.show();
}

const agregarCarrito = (objeto) => {
    axios.post(backendServer + "/carrito/agregar", objeto, { config_request })
        .then(res => {
            if(res.data.resultado){
                toast.success("Se agregó al carrito exitosamente");
                modalCarrito.hide();
            }                            
        })
        .catch(error => {
            toast.error(error.response.data?.mensaje);
        });
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