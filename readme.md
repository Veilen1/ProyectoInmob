# Proyecto Inmobiliario

Este proyecto es una aplicación web para la gestión de propiedades inmobiliarias. La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar propiedades. Está construida utilizando una arquitectura de frontend y backend separada con stack MERN.

## Datos a tener en cuenta
- Se realizaron pruebas de ejecucion de api en la nube por medio de las instancias en EC2 de Amazon Web Services con sus respectivas configuracion de puertos, Nginx, ejecucion permanente con pm2, usando duckdns.org para obtener un DNS gratuito para solicitar un certificado HTTPS mediante Certbot.
- Este proyecto se desarrolló como un ejercicio de aprendizaje, y se utilizo la inteligencia artificial especificamente para identificar y corregir errores, asi como para acelerar la resolución de problemas técnicos.

## Objetivos del Proyecto
- Demostrar mis habilidades técnicas en el desarrollo web utilizando el stack MERN.
- Practicar y demostrar la implementación de una arquitectura de frontend y backend separada.
- Explorar la implementación de una API en la nube con AWS, incluyendo configuración de puertos y seguridad HTTPS.
- Aplicar buenas prácticas de desarrollo como el uso de Nginx y PM2 para una ejecución confiable.

## Características
- Registro e inicio de sesión de usuarios con seguridad mediante JWT.
- Gestión de propiedades inmobiliarias: crear, leer, actualizar y eliminar propiedades.
- Diseño responsivo utilizando Tailwind CSS.
- API protegida con HTTPS.
- Configuración optimizada para despliegue en la nube.

## Tecnologías y Frameworks Utilizados

### Frontend:
- React
- React Router
- Axios
- Vite.js
- Tailwind CSS

### Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs (encriptador de contraseñas)
- Nginx
- Certbot


## Estructura del Proyecto
- **Frontend**: `/frontend`
- **Backend**: `/backend`

## Instalación y Ejecución

### Requisitos Previos
Asegúrate de tener instalados los siguientes programas en tu sistema:
- [Node.js]
- [npm] o [yarn]
- [MongoDB]

### Instalación
1. **Clona el repositorio:**
   cd rutaOrigen
   git clone https://github.com/tu-usuario/nombre-del-repositorio.git
   cd nombre-del-repositorio
2. **Instalar las dependencias pertinentes del frontend:**
    cd frontend
    npm install
    cd ..
3. **Instalar las dependencias pertinentes del backend:**
    cd frontend
    npm install
    cd ..

### Ejecución 
1. **Crear un archivo .env en el directorio /backend con lo siguiente:**
    MONGO_URI=tu_url_de_mongodb
    JWT_SECRET=tu_secreto_jwt
    PORT=3000 o el puerto a utilizar
2. **Iniciar el servidor backend**
    cd backend
    npm start
3. **Iniciar el servidor frontend**
    cd frontend
    npm start
4. **Verificar que todo ande correctamente**
    Acceder a http://localhost:3000 en tu navegador de preferencia.

### Aclaracion: Se deben ejecutar las dos instacias (front y back) en terminales distintas para no cortar la ejecucion del otro.
