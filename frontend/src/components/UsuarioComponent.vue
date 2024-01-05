<template>
    <div class="col-md-12">
        <h4>Lista de Usuarios</h4>
    </div>
    <div class="col-md-12 d-flex justify-content-end">
        <button class="btn btn-success" @click="mostrarModal(0)">
            <span class="material-icons align-middle">add</span>&nbsp;Agregar Usuario
        </button>
    </div>
    <div class="col-md-12 mt-3">
        <table class="table table-hover table-responsive">
            <thead>
                <th>Nombre</th>
                <th>Correo</th>
                <th class="text-center">Edad</th>
                <th class="text-center">Pais</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="usuario in listaUsuarios">
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.correo }}</td>
                    <td class="text-center">{{ usuario.edad }}</td>
                    <td class="text-center">{{ usuario.pais }}</td>
                    <td>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success ms-2" @click="mostrarModal(1, usuario)">
                                <span class="material-icons align-middle">edit</span>&nbsp;Editar
                            </button>
                            <button type="button" class="btn btn-danger ms-2" @click="eliminarUsuario(usuario._id)">
                                <span class="material-icons align-middle">delete</span>&nbsp;Eliminar
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
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
                        <input class="form-control" v-model="usuario.nombre" placeholder="Ingrese nombre"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">Correo Electronico</label>
                        <input class="form-control" v-model="usuario.correo" placeholder="Ingrese correo"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="col-form-label">Contraseña</label>
                        <input class="form-control" v-model="usuario.contrasenha" type="password" placeholder="Ingrese precio"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">Edad</label>
                        <input class="form-control" v-model="usuario.edad" type="number" placeholder="Ingrese edad"/>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="col-form-label">País</label>
                    <input class="form-control" v-model="usuario.pais" placeholder="Ingrese país"/>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="crearEditarUsuario(usuario)"><span class="material-icons align-middle">save</span>&nbsp;Guardar</button>
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
    const config_request = {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
    let listaUsuarios = ref([]);
    let usuario = ref({});
    let tituloModal = ref("Nuevo Usuario");
    let modalUsuario = {};
    let accionRealizar = 0;

    const mostrarModal = (accion, objeto = {}) => {
        modalUsuario = new bootstrap.Modal(document.getElementById('crearEditarModal'), { keyboard: false });
    
        if(accion == 1){
            usuario.value = objeto;
            accionRealizar = 1;
            tituloModal.value = "Editar Usuario";
        }
        else{
            usuario.value = {};
            accionRealizar = 0;
            tituloModal.value = "Nuevo Usuario";
        }
            
        modalUsuario.show();
    }

   //accion 0=nuevo, 1=editar
    const crearEditarUsuario = (objeto) => {
        
        if(accionRealizar == 0){
            axios.post(backendServer + "/usuario", objeto, { config_request })
            .then(res => {
                if(res.data.resultado){
                    obtenerUsuarios();
                    toast.success("Se guardó exitosamente");
                    modalUsuario.hide();
                }                            
            })
            .catch(error => {
                toast.error(error.response.data?.mensaje);
            });
        }else{
            axios.patch(`${backendServer}/usuario/${objeto._id}`, objeto, { config_request })
            .then(res => {
                if(res.data.resultado){
                    obtenerUsuarios();
                    toast.success("Se actualizó exitosamente");
                    modalUsuario.hide();
                }                        
            })
            .catch(error => {
                toast.error(error.response.data?.mensaje);
            });
        }
    }

    const eliminarUsuario = (id) => {

        Swal.fire({
            title: "¿Estás seguro de eliminar al usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${backendServer}/usuario/${id}`, {}, { config_request })
                    .then(res => {
                        if (res.data.resultado) {
                            obtenerUsuarios();
                            toast.success("Se eliminó correctamente");
                        }
                    })
                    .catch(error => {
                        toast.error(error.response.data?.mensaje);
                    });
            }
        });

    }

    const obtenerUsuarios = () => {
        axios.get(backendServer + "/usuario")
            .then(res => {
                if (res.data.resultado)
                listaUsuarios.value = res.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };

    obtenerUsuarios();

</script>
<style scoped>
</style>