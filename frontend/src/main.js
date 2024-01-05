import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
import LoginComponent from '../src/components/LoginComponent.vue'
import CommonLayout from '../src/components/CommonLayout.vue'
import JuegoComponent from '../src/components/JuegoComponent.vue'
import ProveedorComponent from '../src/components/ProveedorComponent.vue'
import CarritoComponent from '../src/components/CarritoComponent.vue'
import UsuarioComponent from '../src/components/UsuarioComponent.vue'
import ComprasComponent from '../src/components/ComprasComponent.vue'

const routes = [
    { path: "/", redirect: "/login"},
    { path: "/login", component: LoginComponent },
    {
        path: '/', component: CommonLayout,
        children: [
            { path: "juegos", component: JuegoComponent },
            { path: "proveedores", component: ProveedorComponent },
            { path: "usuarios", component: UsuarioComponent },
            { path: "carrito", component: CarritoComponent },
            { path: "compras", component: ComprasComponent }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router)

app.mount("#app");
//createApp(App).mount('#app')
