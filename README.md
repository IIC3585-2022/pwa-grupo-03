# Tarea 4 - Grupo 03

PWA de una aplicación web parra simular mandar mensajes en un mismo grupo.

Para aprender sobre PWA, se utilizo el tutorial de Firebase: [PWA con Firebase](https://firebase.google.com/codelabs/firebase-web#0)

Y la documentacion de Firebase que trata del mismo [aqui](https://firebase.google.com/docs/web/pwa).

# Tabla de contenidos
0. [Configuracion](#configuracion)
1. [Deploy](#deploy)
2. [Dependencias](#dependencias)

# 0. Configuracion<a id="configuracion"></a>

Para correr este proyecto, necesitarás agregar las siguientes variables dentro de src/firebase-config.js:

`API_KEY`: Es la clave de acceso a la API de Google.
`AUTH_DOMAIN`: Es el nombre del dominio de autenticación de Firebase.
`PROJECT_ID`: Es el nombre del proyecto de Firebase.
`STORAGE_BUCKET`: Es el nombre del bucket de almacenamiento de Firebase.
`MESSAGING_SENDER_ID`: Es el ID del remitente de mensajes de Firebase.
`APP_ID`: Es el ID de la aplicación de Firebase.

# 1. Deploy<a id="deploy"></a>

Primero deberas crear un proyecto de Firebase y luego obtener las credenciales (deben ser las que salen en Configuracion) de este las cuales seran necesarias para correr este proyecto.

Una vez hecho esto debemos establecer las reglas del proyecto con los comandos de Firebase:

`firebase deploy --only firestore`

`firebase deploy --only storage`

Luego deberas correr este proyecto con el comando:

Localmente: `npm run firebase-serve`
Hosted: `firebase deploy --except functions`



# 2. Dependencias<a id="dependencias"></a>

En el siguiente listado mostramos las dependencias que se requieren para correr la aplicación:

 * [npm](https://www.npmjs.com/)
 * [webpack](https://webpack.js.org/)
 * [firebase](https://firebase.google.com/)