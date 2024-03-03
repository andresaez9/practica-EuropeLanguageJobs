<script setup>
  import { onMounted } from 'vue';
  import { useDogStore } from 'stores/dogStore';
  import { onBeforeRouteLeave, useRoute } from 'vue-router';

  const dogStore = useDogStore();
  const route = useRoute();

  onMounted(() => {
    if (route.params.id) {
      dogStore.getDogDetails(route.params.id);
    }
  });

  const handleSubmitForm = () => {
    if (route.params.id) {
      dogStore.updateDog(route.params.id);
    } else {
      dogStore.submitForm();
    }
  }

  onBeforeRouteLeave((to, from, next) => {
    dogStore.clearMessages();
    dogStore.clearForm();
    next();
  });
</script>

<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Subir Foto y Detalles del Perro</h2>

    <input type="file" @change="dogStore.handleFileUpload" class="mb-8 block mx-auto">

    <form @submit.prevent="handleSubmitForm()" class="max-w-xl mx-auto">
      <div class="mb-6">
        <label for="breed" class="block text-lg font-medium text-gray-700">Raza:</label>
        <input v-model="dogStore.dogsDetails.breed" type="text" id="breed" class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <div class="mb-6">
        <label for="size" class="block text-lg font-medium text-gray-700">Tamaño:</label>
        <input v-model="dogStore.dogsDetails.size" type="text" id="size" class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <div class="mb-6">
        <label for="color" class="block text-lg font-medium text-gray-700">Color:</label>
        <input v-model="dogStore.dogsDetails.color" type="text" id="color" class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
      </div>
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md text-lg block mx-auto">
        Guardar Detalles
      </button>
    </form>
    <div v-if="dogStore.errorMessage" class="text-red-600 text-center mt-4">{{ dogStore.getErrorMessage }}</div>
    <div v-if="dogStore.checkMessage" class="text-green-600 text-center mt-4">{{ dogStore.getCheckMessage }}</div>
  </div>
  <router-link to="/" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-14 rounded-md text-lg block mx-auto w-60">Volver al inicio</router-link>
</template>
  