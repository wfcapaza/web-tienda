<template>
    <div class="col-md-12">
        <h4>Lista de Proveedores</h4>
    </div>
    <div class="col-md-12 d-flex justify-content-end">
        <button class="btn btn-success" @click="mostrarModal(0)">
            <span class="material-icons align-middle">add</span>&nbsp;Agregar Proveedor
        </button>
    </div>
    <div class="col-md-12 mt-3">
        <table class="table table-hover table-responsive">
            <thead>
                <th>Razón Social</th>
                <th>RUC</th>
                <th>Lugar</th>
                <th class="text-center">Pais</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="proveedor in listaProveedores">
                    <td>{{ proveedor.razonSocial }}</td>
                    <td>{{ proveedor.ruc }}</td>
                    <td>{{ proveedor.lugar }}</td>
                    <td class="text-center">{{ proveedor.pais }}</td>
                    <td>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success ms-2" @click="mostrarModal(1, proveedor)">
                                <span class="material-icons align-middle">edit</span>&nbsp;Editar
                            </button>
                            <button type="button" class="btn btn-danger ms-2" @click="eliminarProveedor(proveedor._id)">
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
                        <label class="col-form-label">Razón Social</label>
                        <input class="form-control" v-model="proveedor.razonSocial" placeholder="Ingrese rezón social"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">R.U.C</label>
                        <input class="form-control" v-model="proveedor.ruc" placeholder="Ingrese R.U.C"/>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="col-form-label">Lugar</label>
                        <input class="form-control" v-model="proveedor.lugar" placeholder="Ingrese lugar"/>
                    </div>
                    <div class="col-md-6">
                        <label class="col-form-label">País</label>
                        <input class="form-control" v-model="proveedor.pais" placeholder="Ingrese país"/>
                    </div>
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="crearEditarProveedor(proveedor)"><span class="material-icons align-middle">save</span>&nbsp;Guardar</button>
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
    const config_request = {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'};
    let listaProveedores = ref([]);    
    let proveedor = ref({});
    let tituloModal = ref("Nuevo Proveedor");
    let modalProveedor = {};
    let accionRealizar = 0;

    const mostrarModal = (accion, objeto = {}) => {
        modalProveedor = new bootstrap.Modal(document.getElementById('crearEditarModal'), { keyboard: false });
    
        if(accion == 1){
            proveedor.value = objeto;
            accionRealizar = 1;
            tituloModal.value = "Editar Proveedor";
        }
        else{
            proveedor.value = {};
            accionRealizar = 0;
            tituloModal.value = "Nuevo Proveedor";
        }
            
        modalProveedor.show();
    }

   //accion 0=nuevo, 1=editar
    const crearEditarProveedor = (objeto) => {
        
        if(accionRealizar == 0){
            axios.post(backendServer + "/proveedor", objeto, { config_request })
            .then(res => {
                if(res.data.resultado){
                    obtenerProveedores();
                    toast.success("Se guardó exitosamente");
                    modalProveedor.hide();
                }                            
            })
            .catch(error => {
                toast.error(error.response.data?.mensaje);
            });
        }else{
            axios.patch(`${backendServer}/proveedor/${objeto._id}`, objeto, { config_request })
            .then(res => {
                if(res.data.resultado){
                    obtenerProveedores();
                    toast.success("Se actualizó exitosamente");
                    modalProveedor.hide();
                }                        
            })
            .catch(error => {
                toast.error(error.response.data?.mensaje);
            });
        }
    }

    const eliminarProveedor = (id) => {

        Swal.fire({
            title: "¿Estás seguro de eliminar al proveedor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${backendServer}/proveedor/${id}`, {}, { config_request })
                    .then(res => {
                        if (res.data.resultado) {
                            obtenerProveedores();
                            toast.success("Se eliminó correctamente");
                        }
                    })
                    .catch(error => {
                        toast.error(error.response.data?.mensaje);
                    });
            }
        });

    }

    const obtenerProveedores = () => {
        axios.get(backendServer + "/proveedor")
            .then(res => {
                if (res.data.resultado)
                listaProveedores.value = res.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };

    obtenerProveedores();

</script>
<style scoped>
</style>