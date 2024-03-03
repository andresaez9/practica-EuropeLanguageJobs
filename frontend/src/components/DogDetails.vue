<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Detalles de los Perros</h2>
    <router-link to="/" class="block w-60 mx-auto mb-8">
      <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg w-full">
        Volver al inicio
      </button>
    </router-link>

    <div v-for="dog in displayedDogs" :key="dog.id" class="border border-gray-300 rounded-lg p-6 mb-8 flex items-center">
      <div class="flex-shrink-0 mr-6">
        <img :src="`http://127.0.0.1:8000/storage/${dog.image}`" alt="Perro" class="w-24 h-24 object-cover rounded">
      </div>
      <div>
        <h3 class="text-xl font-semibold">{{ dog.breed }}</h3>
        <p class="text-gray-700 mt-2"><span class="font-semibold">Tamaño:</span> {{ dog.size }}</p>
        <p class="text-gray-700"><span class="font-semibold">Color:</span> {{ dog.color }}</p>
        <button @click="handleDelete(dog.id)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-2">
          Borrar
        </button>
        <!--<button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2 ml-2">
          <router-link :to="`/edit/${dog.id}`">Editar</router-link>
        </button>-->
      </div>
    </div>

    <div class="flex justify-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2">
        Anterior
      </button>
      <button @click="nextPage" :disabled="isLastPage" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useDogStore } from 'stores/dogStore';

  const dogs = ref([]);
  const currentPage = ref(1);
  const dogsPerPage = 4;
  const dogStore = useDogStore();

  onMounted(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/dogs');

      if (!response.ok) {
        throw new Error('No se pudieron obtener los perros' + response.statusText);
      }

      dogs.value = await response.json();
    } catch (error) {
      throw new Error('Error al obtener los perros:', error);
    }
  });

  const handleDelete = async (id) => {
    dogStore.deleteDog(id);            
    dogs.value = dogs.value.filter(dog => dog.id !== id);
  }

  const displayedDogs = computed(() => {
    const startIndex = (currentPage.value - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    return dogs.value.slice(startIndex, endIndex);
  });

  const isLastPage = computed(() => {
    return currentPage.value * dogsPerPage >= dogs.value.length;
  });

  const nextPage = () => {
    if (!isLastPage.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
</script>
