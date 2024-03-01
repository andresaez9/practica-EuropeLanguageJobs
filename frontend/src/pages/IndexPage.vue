<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4 text-blue-600">Bienvenido a nuestra web de perros</h1>
    <p class="text-lg text-gray-800 mb-8">Aquí puedes agregar y ver todos los perros disponibles</p>
    <div class="space-x-4">
      <router-link to="/add" class="px-6 py-3 bg-green-500 text-white font-semibold rounded-md transition duration-300 hover:bg-green-600">Agregar Perro</router-link>
      <router-link to="/all" class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-600">Ver Todos los Perros</router-link>
    </div>
  </div>
</template>
