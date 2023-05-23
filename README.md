# EJECUCIÓN

## Base
* Abrir XAMPP y hacer click en "Start" en las filas de Apache y MySQL.
* Abrir el administrador haciendo click en "Admin" en la fila de MySQL.
* Seleccionar la base.

## Backend
* Abrir el proyecto en VSCode.
* Para ejecutar el Backend, en la terminal entramos a backend/apiGestor.
* En el package.json que esta dentro de apiGestor, en el objeto "scripts" cambiamos "start" que dice "node ./bin/www" por "nodemon ./bin/www". Luego de esto, escribimos en la terminal "npm start".

## Frontend
* Para ejecutar el Frontend, en la terminal entramos a frontend/src y luego escribimos "npm start".
* Para conectar nuestra baje de datos creamos a la altura de app.js el archivo .env y configuramos nuestras claves de la siguente manera
DB_USER = root
(el campo password se encuentra en database/config y es por defecto null)
DB_NAME = gestorpsi

---

## BUILD

1) En el cliente haces npm run build, lo cual crea una carpeta "build" (o lo actualiza si ya habias creado la carpeta).
2) Desde fuera de VSCode, copia los archivos de esa carpeta y llevalos a la carpeta server/public y pegalos ahi.
3) De esta manera al inicializar el server, te va a mostrar las cosas de react.
4) Siempre que hayas agregado cosas hay que hacer estos pasos.

---

## DEPLOY A HEROKU

1) .gitignore a nivel raíz de la carpeta server para no enviar /node_modules y cualquier otro archivo confidencial.
2) Te logueas desde el CLI de Heroku con el siguiente comando: heroku login
3) Creas el proyecto con: heroku create nombre-del-proyecto
4) Hacer un repositorio nuevo en git (init/add/commit)
5) Busca tu proyecto recién creado en Heroku, entra y busca la sección de "Create a new Git repository". La linea que nos importa en este punto es la que seguro dice algo parecido a "heroku git:remote -a nombre-del-proyecto y usala
6) Luego de creado, pusheamos los cambios con: git push heroku master
7) El CLI debería decirte la URL de tu proyecto.

## ACTUALIZAR DEPLOY

1) Build de la app: "npm run build" del frontend
2) Copiar los archivos creados por el build en client/build
3) Borrar los archivos de server/public
4) Pegar los archivos copiados en server/public
5) Dentro de server, hacer add y commit de los cambios a git
6) Al hacer el push del commit, Heroku de manera automática debería tomar los cambios.
