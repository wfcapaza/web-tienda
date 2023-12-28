<template>
  <div class="contenedroGeneral">
  <div class="container" >
    <div class="row pt-5">
      <div class="d-flex justify-content-center">
      <img src="../assets/user.png"/>
    </div>
    </div>

    <div class="row pt-4 d-flex justify-content-center">
      <div id="login">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Iniciar Sesión</button>
        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Registrarse</button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <div class="col-md-12 mt-3">
          <input class="form-control" v-model="usuarioLogin.correo" placeholder="Ingrese correo electronico"/>
        </div>
        <div class="col-md-12 mt-3">
          <input class="form-control" type="password" v-model="usuarioLogin.contrasenha" placeholder="Ingrese contraseña"/>
        </div>
        <div class="col-md-12 mt-3 text-center">
          <button class="btn btn-primary" @click="iniciarSesion(usuarioLogin)">Iniciar Sesión</button>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <div class="col-md-12 mt-3">
          <input class="form-control" type="text" v-model="nuevoUsuario.nombre" placeholder="Ingrese nombre"/>
        </div>
        <div class="col-md-12 mt-3">
          <input class="form-control" type="text" v-model="nuevoUsuario.correo" placeholder="Ingrese correo electronico"/>
        </div>
        <div class="col-md-12 mt-3">
          <input class="form-control" type="password" v-model="nuevoUsuario.contrasenha" placeholder="Ingrese contraseña"/>
        </div>
        <div class="col-md-12 mt-3">
          <input class="form-control" type="number" v-model="nuevoUsuario.edad" placeholder="Ingrese edad"/>
        </div>
        <div class="col-md-12 mt-3">
          <input class="form-control" type="text" v-model="nuevoUsuario.pais" placeholder="Ingrese país"/>
        </div>
        <div class="col-md-12 mt-3 text-center">
          <button class="btn btn-primary" @click="registrarse(nuevoUsuario)">Registrarse</button>
        </div>
      </div>
    </div>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const backendServer = "http://127.0.0.1:3000";
let config_request = {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'};
let nuevoUsuario = ref({});
let usuarioLogin = {};
//let router = this.$router;

const registrarse = (objeto) => {
  axios.post(backendServer + "/usuario", objeto, { config_request })
    .then(res => {
      if (res.data.resultado) {
        nuevoUsuario.value = {};
        toast.success("Se guardó exitosamente");
      }
    })
    .catch(error => {
      toast.error(error.response.data?.mensaje);
    });
}

 const iniciarSesion = function(objeto) {

  
  axios.post(backendServer + "/usuario/login", objeto, { config_request })
    .then(res => {
      if (res.data.resultado) {        
        sessionStorage.setItem("correo", objeto.correo)
        usuarioLogin = {};
        router.push("/juegos")
      }
      else {
        toast.error("Su usuario o contraseña es incorrecto.");
      }      
    })
    .catch(error => {
      toast.error(error.response.data?.mensaje);
    });
 }
</script>

<style scoped>
.contenedroGeneral{
  background-color: #5d58d7;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
img {
  height: 200px;
  width: auto;
}
#login{
  max-width: 600px;
  background-color: #bcc5f3; 
  border-radius: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
