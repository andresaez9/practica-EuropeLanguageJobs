# practica-EuropeLanguageJobs

## Instalación del Proyecto

### Servidor
#### Requisitos Previos
PHP instalado en tu sistema. Puedes descargarlo desde [php.net](https://www.php.net/).
Composer, el administrador de dependencias de PHP. Puedes descargarlo desde [getcomposer.org](https://getcomposer.org/).
1. Clonar el Repositorio
   ```git clone <url_del_repositorio>```

2. Instalar Dependencias de Composer
   ```
    cd backend
    composer install
    ```
3. Configurar el Archivo .env:
    Copia el archivo .env.example y cámbiale el nombre a .env. Este archivo contiene la configuración de tu aplicación, como la conexión a la base de datos y las credenciales de seguridad.
    ```cp .env.example .env```

4. Iniciar Servidor
   ```php artisan serve```

### Cliente
#### Requisitos Previos
Asegúrate de tener Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/en).
1. Desde la raiz del repositorio clonado anteriormente usamos estos comandos. Con npm install instalamos las dependencias del proyecto.
   ```
   cd frontend
   npm install
   ```
2. Iniciar Cliente
   ```npm run dev```

#### IMPORTANTE!!
Tanto backend como frontend deben estar levantados/corriendo para que el proyecto funcione.

### Funcionalidades y Páginas
