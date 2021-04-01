---
title: Ejemplos simples Electron
author: zeke
date: '19-01-2017'
---

Recientemente hemos alojado un hackathon de Electron en el HQ de GitHub para miembros de [Hackbright Academy](https://hackbrightacademy.com), una escuela de codificación para mujeres fundada en San Francisco. Para ayudar a los asistentes a comenzar sus proyectos, nuestro propio [Kevin Sawicki](https://github.com/kevinsawicki) creó algunas aplicaciones Electron de ejemplo.

---

Si eres nuevo en el desarrollo de Electron o aún no lo has probado, estas aplicaciones de ejemplo son un buen lugar para empezar. Son pequeños, fáciles de leer, y el código está muy comentado para explicar cómo funciona todo.

Para empezar, clona este repositorio:

```sh
git clone https://github.com/electron/simple-samples
```

Para ejecutar cualquiera de las aplicaciones de abajo, cambia al directorio de la aplicación, instala dependencias y luego inicia:

```sh
monitor de actividad cd
npm install
npm start
```

## Seguidor de la actividad

Muestra un gráfico doughnut del sistema de CPU, usuario y tiempo de actividad inactivo.

[![Captura de pantalla](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hash

Muestra los valores hash del texto introducido usando diferentes algoritmos.

[![captura de pantalla](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Espejo

Reproduce un video de la cámara de la computadora a un tamaño maximizado como mirar a un espejo. Incluye un efecto opcional de filtro arco lluvia que utiliza animaciones CSS.

## Precios

Muestra el precio actual del petróleo, el oro y la plata utilizando la API de Finanzas.

[![captura de pantalla](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Carga una URL pasada en la línea de comandos en una ventana.

## Otros recursos

Esperamos que estas aplicaciones te ayuden a empezar a usar Electron. Aquí hay un puñado de otros recursos para aprender más:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Un calilerplate mínimo de aplicación Electron.
- [Electron API Demos](https://github.com/electron/electron-api-demos): Una aplicación interactiva que demuestra las características principales de la API de Electron
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Toda la documentación de Electron juntos en una sola página de búsqueda.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Otra colección de aplicaciones de ejemplo para Electron, compiladas por el mantenedor Electron [Haojian Wu](https://github.com/hokein).
- [increíble electrón](https://github.com/sindresorhus/awesome-electron) - Un repositorio de GitHub que recoge los tutoriales más recientes y grandes relacionados con Electron, libros, vídeos, etc.