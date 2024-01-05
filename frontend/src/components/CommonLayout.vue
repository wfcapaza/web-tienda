<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/juegos">Tienda WCA</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" >
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/juegos"><span class="material-icons">games</span>&nbsp;Juegos</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/proveedores"><span class="material-icons">local_shipping</span>&nbsp;Proveedores</RouterLink>
            </li>            
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/usuarios"><span class="material-icons">people</span>&nbsp;Usuarios</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/carrito"><span class="material-icons">shopping_cart</span>&nbsp;Carrito</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/compras"><span class="material-icons">history</span>&nbsp;Historial de Compras</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex align-center" aria-current="page" to="/"><span class="material-icons">logout</span>Cerrar Sesión</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
        <RouterView></RouterView>
    </div>
    
</template>
<script setup>

</script>
<style scoped>
</style>
