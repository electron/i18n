# Actualizando Chrome

Esto es un resumen de los pasos necesarios para actualizar Chormium en Electron.

- Actualice libcc a una versión nueva de Chromium
- Haga compatible el código Electron con el nuevo libcc
- Actualice las dependencias de Electron (crashpad, NodeJS, etc.) si es necesario
- Haga estructuras internas de libcc y electron
- Actualice los documentos de Electron si fuese necesario

## Actualice `libcc` a una versión nueva de Chromium

1. Obtenga el código e inicie el proyecto: 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. Actualice la instantánea de Chromium 
  - Elija el número de versión de [OmahaProxy](https://omahaproxy.appspot.com/) y una actualización de `VERSION` archivada con él 
    - Esto puede hacerse manualmente visitando OmahaProxy en un buscador, o automáticamente:
    - Una línea de la última versión estable para mac: `curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - Una línea para la última versión win64 beta `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - ejecuta `$ ./script/update` 
    - Haga un te -- esto puede correr por 30m o más.
    - Probablemente falle aplicando parches.
3. Arregle los archivos `*.patch` en el `patches/` y carpetas `patches-mas/`.
4. (Opcional) `script/update` aplica parches, pero si se necesitan varios intentos puede correr manualmente el mismo escrito que `actualización` llamados: `$ ./script/apply-patches` 
  - Hay un segundo script, `script/patch.py` que puede ser útil. Lea `./script/patch.py -h` para más información.
5. Corra la estructura cuando todos los parches puedan ser aplicados sin errores 
  - `$ ./script/build`
  - Si algunos parches no son compatibles con el código de Chromium, arregle los errores de compilación.
6. Cuando la estructura tenga éxito, cree un `dist` para Electron 
  - `$ ./script/create-dist --no_zip` 
    - Creará una carpeta `dist/principal` en el repositorio libcc de raíz.
7. (Opcional) Actualice el contenido de los scripts i hay algún error resultando de los archivos que fueron removidos o renombrados. Archivos (`--no_zip` prevents script from create `dist`. No los necesita.)

## Código de actualización de Electron

1. Obtenga el código: 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. Si tiene una estructura libcc en su máquina en su própio repositorio, dígale Electron que la use: 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. Si no ha estructurado todavía su libcc pero se supone que esta sea actualizada a un nuevo Chromium, use los recursos habituales `$ ./script/bootstrap.py -v`
  
  - Asegurese que el submódulo de libcc (`vendor/libchromiumcontent`) apunte a la revisión correcta

4. Configure `CLANG_REVISION` en `script/update-clang.sh` para coincidir con la versión que Chromium está usando.
  
  - Localice en `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Verifique Chromium si no lo ha hecho todavía:
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (Reemplace el lugar de `{VERSION}` en la url arriba a la versión de Chromium que usa libcc)
6. Estructure Electron. 
  - Trate de estructurar una versión sin errores primero: `$ ./script/build.py -c D`
  - Necesitará correr pruebas
7. Arregle errores de compilación y de enlazamiento
8. Asegúrese que la estructura liberada puede ser construida también 
  - `$ ./script/build.py -c R`
  - A menudo el lanzamiento del constructo tiene diferentes errores de enlazamiento que usted necesitará arreglar.
  - Algunos errores de compilación y enlazamiento son causados por archivos de objetos o fuentes faltantes en la libcc `dist`
9. Actualice `./script/create-dist` en el repositorio de libcc, recree `dist`, y corra con los recursos que tiene el script de Electron de nuevo.

### Consejos para arreglar errores en compilación

- Corrija errores de configuración de la estructura primero
- Corrija errores fatales primero, como archivos faltantes y errores relacionados con banderas o definiciones del compilador
- Intente identificar errores complejos lo más rápido posible. 
  - Pida ayuda si no está seguro cómo arreglarlos
- Deshabilite las herramientas de Electro, corrija la estructura, luego habilitelas una por una
- Añada más banderas de la estructura para deshabilitar características en el tiempo de la construcción.

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

Siga todas los pasos anteriores para corregir el código Electron en todas las plataformas soportadas.

## Actualización de Crashpad

Si hay algún error de compilaciones relacionados con el Crashpad, probablemente signifique que necesita una actualizar la horquilla a una revisión más reciente. Vea [Actualizando el Crashpad](upgrading-crashpad.md) para instrucciones de cómo hacer eso.

## Actualizando NodeJS

Actualizar `vendor/node` al lanzamiento del nodo que corresponda a la versión v8 usada en el nuevo lanzamiento de Chromium. Vea la versión v8 en el nodo

Vea [Actualizando nodo](upgrading-node.md) para instrucciones de cómo hacer eso.

## Verifique el soporte a ffmpeg

Electron es entregado con una versión de `ffmpeg` que incluye el codecs del propietario por defecto. Una versión sin este codecs es estructurada y distribuida con cada lanzamiento. Cada actualización de Chrome debe verificar que cambia de esta versión todavía está soportado.

Usted puede verificar apoyo del Electron a `ffmpeg` múltiples se construye por la carga de la página siguiente. Debe trabajar con la librería por defecto `ffmpeg` distribuida con electron y no trabajar con la librería `ffmpeg` estructurada sin el codecs del propietario.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({ target }) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## Enlaces útiles

- [Calendario de lanzamientos de Chrome](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Seguidor de problemas de Chromium](https://bugs.chromium.org/p/chromium)