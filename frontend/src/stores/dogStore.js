import { defineStore } from "pinia";

export const useDogStore = defineStore('dogStore', {
    state: () => ({
        dogsDetails: {
            breed: "",
            size: "",
            color: "",
            image: null,
        },

        errorMessage: "",
        checkMessage: ""
    }),

    getters: {
        getDogsDetails() {
            return this.dogsDetails;
        },

        getErrorMessage() {
            return this.errorMessage;
        },

        getCheckMessage() {
            return this.checkMessage;
        }
    },

    actions: {
        handleFileUpload(event) {
            this.dogsDetails.image = event.target.files[0];
        },

        async submitForm() {
          try {
            const formData = new FormData();
            formData.append('breed', this.dogsDetails.breed);
            formData.append('size', this.dogsDetails.size);
            formData.append('color', this.dogsDetails.color);
            formData.append('image', this.dogsDetails.image);
    
            const response = await fetch('http://127.0.0.1:8000/api/dogs', {
              method: 'POST',
              body: formData
            });
    
            if (!response.ok) {
              this.errorMessage = 'Error al subir la foto o detalles del perro, hay valores repetidos';
              return;
            }
    
            const data = await response.json();
            this.checkMessage = 'Foto y detalles del perro subidos correctamente';
    
            this.dogsDetails.breed = '';
            this.dogsDetails.size = '';
            this.dogsDetails.color = '';
            this.dogsDetails.image = null;
    
            console.log('Respuesta del backend:', data);
          } catch (error) {
            console.error('Error en la petición al backend:', error);
          }
        }
    }
});