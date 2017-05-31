# Actualizar lista de cromo

Este documento pretende servir como un resumen de qué medidas son necesarias en cada cromo actualización en electrónica.

Estas son cosas que hacer además de actualizar el código electrónico de cambios API cromo/nodo.

- Compruebe que la nueva versión de Chrome está disponible desde https://github.com/zcbenz/chromium-source-tarball/releases
- Actualizar el archivo `VERSION` en la raíz del repositorio `electron/libchromiumcontent`
- Actualizar el `CLANG_REVISION` en `script/actualización-clang.sh` para que coincida con la versión cromo es en `libchromiumcontent/src/tools/clang/scripts/update.py`
- Actualizar `vendor/node` a la versión nodo que corresponde a la versión v8 se utiliza en la nueva versión del cromo. Ver las versiones v8 en nodo en https://nodejs.org/en/download/releases para más detalles
- Actualizar `vendor/crashpad` para cualquier accidente cambios reportero
- Actualización `vendor/depot_tools` para cualquier construcción herramientas cambios necesarios
- Actualizar el `libchromiumcontent` SHA-1 para descargar en `script/lib/config.py`
- Abrir una solicitud de extracción en `electron/libchromiumcontent` con los cambios
- Abrir una solicitud de extracción de `electrónica/brightray` con los cambios 
  - Esto debe incluir el mejoramiento del submódulo de `vendor/libchromiumcontent`
- Abrir una solicitud de extracción de `electrónica/electrónica` con los cambios 
  - Esto debe incluir la actualización de los submódulos en `vendor/` según sea necesario
- Verificar compilaciones de depuración tuvo éxito en: 
  - MacOS
  - Windows de 32 bits
  - Ventana de 64-bit
  - Linux de 32 bits
  - Linux de 64 bits
  - BRAZO de Linux
- Verificar estructuras de liberación tuvo éxito en: 
  - MacOS
  - Windows de 32 bits
  - Ventana de 64-bit
  - Linux de 32 bits
  - Linux de 64 bits
  - BRAZO de Linux
- Verificar pruebas pasan: 
  - MacOS
  - Windows de 32 bits
  - Ventana de 64-bit
  - Linux de 32 bits
  - Linux de 64 bits
  - BRAZO de Linux

## Verificar ffmpeg soporte

Electrón se envía con una versión de `ffmpeg` que incluye codecs propietarios por defecto. Una versión sin estos codecs está construida y distribuida con cada lanzamiento así. Cada actualización de Chrome debe comprobar si cambio esta versión todavía.

Usted puede verificar apoyo del electrón a `ffmpeg` múltiples se construye por la carga de la página siguiente. Se debe trabajar con la biblioteca de `ffmpeg` por defecto distribuida con electrones y no funciona con la librería `ffmpeg` sin codecs propietarios.

```html
¡<! DOCTYPE html><html> <head> <meta charset="utf-8"> <title>Proprietary Codec Check</title> </head> <body> <p>Checking si electrón utiliza codecs propietarios cargando video de http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p> <p id="outcome"></p> <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video> <script> const video = document.querySelector('video')
      video.addEventListener ('error', ({target}) = > {si (target.error.code == target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {document.querySelector('#outcome').textContent = 'no usa codecs propietarios, fuente de vídeo emitida no admite el evento de error.'
        } else {document.querySelector('#outcome').textContent = ' error inesperado: ${target.error.code}'}}) video.addEventListener ('jugar', () = > {document.querySelector('#outcome').textContent = 'Utilizando codecs propietarios, video comenzó a jugar.'
     </html> de </body> de </script>})
```

## Enlaces

- [Fecha de lanzamiento de Chrome](https://www.chromium.org/developers/calendar)