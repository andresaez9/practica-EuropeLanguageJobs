<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Detalles de los Perros</h2>
      <div v-for="dog in dogs" :key="dog.id" class="mb-6">
        <div class="font-semibold mb-2">{{ dog.breed }}</div>
        <div class="text-gray-600 mb-2">Tamaño: {{ dog.size }}</div>
        <div class="text-gray-600 mb-2">Color: {{ dog.color }}</div>
        <img :src="dog.image" alt="Perro" class="w-48 h-48 object-cover rounded">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const dogs = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/dogs');
      if (response.ok) {
        dogs.value = await response.json();
      } else {
        console.error('Error al obtener los perros:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los perros:', error);
    }
  });
  </script>
  