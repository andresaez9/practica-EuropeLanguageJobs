<template>
    <div class="container mx-auto py-8">
        <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Subir Foto y Detalles del Perro</h2>
  
        <input type="file" @change="handleFileUpload" class="mb-8 block mx-auto">
  
        <form @submit.prevent="submitForm" class="max-w-xl mx-auto">
            <div class="mb-6">
                <label for="breed" class="block text-lg font-medium text-gray-700">Raza:</label>
                <input v-model="dogDetails.breed" type="text" id="breed" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
            </div>
            <div class="mb-6">
                <label for="size" class="block text-lg font-medium text-gray-700">Tamaño:</label>
                <input v-model="dogDetails.size" type="text" id="size" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
            </div>
            <div class="mb-6">
                <label for="color" class="block text-lg font-medium text-gray-700">Color:</label>
                <input v-model="dogDetails.color" type="text" id="color" required class="mt-1 p-4 border border-gray-300 rounded-md w-full text-lg">
            </div>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md text-lg block mx-auto">
                Guardar Detalles
            </button>
        </form>
        <router-link to="/details" class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-md text-lg block mx-auto">Ver todos los perros</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dogDetails = ref({
    breed: '',
    size: '',
    color: '',
    image: null
  });
  
  function handleFileUpload(event) {
    dogDetails.value.image = event.target.files[0];
  }
  
  async function submitForm() {
    try {
      const formData = new FormData();
      formData.append('breed', dogDetails.value.breed);
      formData.append('size', dogDetails.value.size);
      formData.append('color', dogDetails.value.color);
      formData.append('image', dogDetails.value.image);
  
      const response = await fetch('http://127.0.0.1:8000/api/dogs', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        formReset();
        console.log('Respuesta del backend:', data);
      } else {
        console.error('Error en la petición al backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición al backend:', error);
    }
  }
</script>
  