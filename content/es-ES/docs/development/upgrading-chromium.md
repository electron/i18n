# Actualizando Chomium

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
  - ejecute `$ ./script/update` 
    - Haga un te -- esto puede correr por 30m o más.
    - Probablemente falle aplicando parches.
3. Arregle los archivos `*.patch` en el `patches/` y carpetas `patches-mas/`.
4. (Opcional) `script/actualización` aplica parches, pero si se necesitan varios intentos puede correr manualmente el mismo escrito que `actualización` llamados: `$ ./script/apply-patches` 
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
9. Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### Tips for fixing compilation errors

- Fix build config errors first
- Fix fatal errors first, like missing files and errors related to compiler flags or defines
- Try to identify complex errors as soon as possible. 
  - Ask for help if you're not sure how to fix them
- Disable all Electron features, fix the build, then enable them one by one
- Add more build flags to disable features in build-time.

When a Debug build of Electron succeeds, run the tests: `$ ./script/test.py` Fix the failing tests.

Follow all the steps above to fix Electron code on all supported platforms.

## Updating Crashpad

If there are any compilation errors related to the Crashpad, it probably means you need to update the fork to a newer revision. See [Upgrading Crashpad](upgrading-crashpad.md) for instructions on how to do that.

## Updating NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](upgrading-node.md) for instructions on this.

## Verify ffmpeg support

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

Usted puede verificar apoyo del Electron a `ffmpeg` múltiples se construye por la carga de la página siguiente. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

```html
¡<! DOCTYPE html><html> <head> <meta charset="utf-8"> <title>Proprietary Codec Check</title> </head> <body> <p>Checking si Electron utiliza codecs propietarios cargando video de http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p> <p id="outcome"></p> <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video> <script> const video = document.querySelector('video')
      video.addEventListener ('error', ({target}) = > {si (target.error.code == target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {document.querySelector('#outcome').textContent = 'no usa codecs propietarios, fuente de vídeo emitida no admite el evento de error.'
        } else {document.querySelector('#outcome').textContent = ' error inesperado: ${target.error.code}'}}) video.addEventListener ('jugar', () = > {document.querySelector('#outcome').textContent = 'Utilizando codecs propietarios, video comenzó a jugar.'
     </html> de </body> de </script>})
```

## Useful links

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)