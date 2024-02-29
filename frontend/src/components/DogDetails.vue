<template>
    <div class="container mx-auto py-8">
      <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Detalles de los Perros</h2>
      <div v-for="dog in dogs" :key="dog.id" class="flex items-center mb-8">
        <div class="flex-shrink-0 mr-4">
          <img :src="`http://127.0.0.1:8000/storage/${dog.image}`" alt="Perro" class="w-24 h-24 object-cover rounded">
        </div>
        <div>
          <h3 class="text-xl font-semibold">{{ dog.breed }}</h3>
          <p class="text-gray-700">Tamaño: {{ dog.size }}</p>
          <p class="text-gray-700">Color: {{ dog.color }}</p>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const dogs = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/dogs');
      
      if (!response.ok) {
        throw new Error('No se pudieron obtener los perros' + response.statusText);
      }
    
      dogs.value = await response.json();
    } catch (error) {
      console.error('Error al obtener los perros:', error);
    }
  });
  </script>
  