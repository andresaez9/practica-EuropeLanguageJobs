import { defineStore } from "pinia";

const url = 'http://127.0.0.1:8000/api/dogs';
const onlyLetters = /^[a-zA-Z]+$/;

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

            if (!this.dogsDetails.breed.match(onlyLetters) ||
                !this.dogsDetails.size.match(onlyLetters) ||
                !this.dogsDetails.color.match(onlyLetters)
              ) {
              this.errorMessage = 'Los valores solo pueden contener letras';
              this.checkMessage = '';
              return;
            }

            const formData = new FormData();
            formData.append('breed', this.dogsDetails.breed);
            formData.append('size', this.dogsDetails.size);
            formData.append('color', this.dogsDetails.color);
            formData.append('image', this.dogsDetails.image);
    
            const response = await fetch(url, {
              method: 'POST',
              body: formData
            });
    
            if (!response.ok) {
              this.errorMessage = 'Error al subir la foto o detalles del perro, inténtelo de nuevo.';
              this.checkMessage = '';
              return;
            }
            
            const data = await response.json();
            this.checkMessage = 'Foto y detalles del perro subidos correctamente';
            this.errorMessage = '';
    
            this.clearForm();
    
            console.log('Respuesta del backend:', data);
          } catch (error) {
            console.error('Error en la petición al backend:', error);
          }
        },

        async deleteDog (dogId) {
          try {
            const response = await fetch(`${url}/${dogId}`, {
              method: 'DELETE'
            });
      
            if (!response.ok) {
              throw new Error('No se pudo eliminar el perro' + response.statusText);
            }
          } catch (error) {
            throw new Error('Error al eliminar el perro:', error);
          }
        },

        /*async updateDog(dogId) {
          try {
              const formData = new FormData();
              formData.append('breed', this.dogsDetails.breed);
              formData.append('size', this.dogsDetails.size);
              formData.append('color', this.dogsDetails.color);
              formData.append('image', this.dogsDetails.image);
      
              const updateResponse = await fetch(`${url}/${dogId}`, {
                  method: 'PUT',
                  body: formData
              });
      
              if (!updateResponse.ok) {
                this.errorMessage = 'Error al actualizar la foto o detalles del perro, inténtelo de nuevo.';
                this.checkMessage = '';
                return;
              }
              
              const data = await updateResponse.json();
              this.checkMessage = 'Foto y detalles del perro actualizados correctamente';
              this.errorMessage = '';
      
              this.clearForm();
      
              console.log('Respuesta del backend:', data);
          } catch (error) {
              throw new Error('Error al actualizar el perro: ' + error);
          }
        },

        async getDogDetails(dogId) {
          try {
            const response = await fetch(`${url}/${dogId}`);
            if (!response.ok) {
              throw new Error('No se pudo obtener los detalles del perro: ' + response.statusText);
            }
    
            const dogData = await response.json();

            this.dogsDetails.image = dogData.image;
            this.dogsDetails.breed = dogData.breed;
            this.dogsDetails.size = dogData.size;
            this.dogsDetails.color = dogData.color;
            console.log('Detalles del perro:', this.dogsDetails);
          } catch (error) {
            throw new Error('Error al obtener los detalles del perro:', error);
          }
        },*/
    
        clearMessages() {
          this.errorMessage = '';
          this.checkMessage = '';
        },

        clearForm() {
          this.dogsDetails.breed = '';
          this.dogsDetails.size = '';
          this.dogsDetails.color = '';
          this.dogsDetails.image = null;
        }
    }
});