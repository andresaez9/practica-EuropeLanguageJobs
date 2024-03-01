<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDogStore } from 'stores/dogStore';

  const dogStore = useDogStore();
  const route = useRoute();

  const isEqualRoute = ref(false);

  watch(() => route.path, (newPath) => {
    isEqualRoute.value = newPath !== route.path;
  });
</script>

<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Subir Foto y Detalles del Perro</h2>

    <input type="file" @change="dogStore.handleFileUpload" class="mb-8 block mx-auto">

    <form @submit.prevent="dogStore.submitForm()" class="max-w-xl mx-auto">
      <div class="mb-6">
        <label for="breed" class="block text-lg font-medium text-gray-700">Raza:</label>
        <input v-model="dogStore.dogsDetails.breed" type="text" id="breed" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <div class="mb-6">
        <label for="size" class="block text-lg font-medium text-gray-700">Tamaño:</label>
        <input v-model="dogStore.dogsDetails.size" type="text" id="size" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <div class="mb-6">
        <label for="color" class="block text-lg font-medium text-gray-700">Color:</label>
        <input v-model="dogStore.dogsDetails.color" type="text" id="color" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md text-lg block mx-auto">
        Guardar Detalles
      </button>
    </form>
    <div v-if="dogStore.errorMessage && isEqualRoute.value" class="text-red-600 text-center mt-4">{{ dogStore.errorMessage }}</div>
    <div v-if="dogStore.checkMessage && isEqualRoute.value" class="text-green-600 text-center mt-4">{{ dogStore.checkMessage }}</div>
    <router-link to="/all" v-if="dogStore.checkMessage && isEqualRoute.value" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md text-lg block mx-auto w-60 mt-8">Ver Todos los Perros</router-link>
  </div>
  <router-link to="/" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-14 rounded-md text-lg block mx-auto w-60">Volver al inicio</router-link>
</template>
  