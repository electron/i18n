# Desarrollo Chromium

> Una colección de recursos para aprender sobre Chromium y rastrear su desarrollo

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) en Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev) en Twitter
- [@googlechrome](https://twitter.com/googlechrome) en Twitter
- [Blog](https://blog.chromium.org)
- [Búsqueda de Código](https://cs.chromium.org/)
- [Código Fuente](https://cs.chromium.org/chromium/src/)
- [Calendario de Desarrollo e Información de Lanzamiento](https://www.chromium.org/developers/calendar)
- [Grupos de Discusión](http://www.chromium.org/developers/discussion-groups)

Ver también [Desarrollo V8](v8-development.md)

# Desarrollo de Chromium con Electron

Es posible depurar Chromium con Electron pasando `--build_debug_libcc` al script bootstrap:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

Esto descargará y creará libchromiumcontent localmente, de forma similar a `-build_release_libcc`, pero creará una biblioteca compartida compilada de libchromiumcontent y no eliminará ningún símbolo, lo que lo hace ideal para la depuración.

Cuando se compila de esta manera, puede realizar cambios en los archivos en `vendor/libchromiumcontent/src` y reconstruirlos rápidamente con:

```sh
$ ./script/build.py -c D --libcc
```

Al desarrollar en Linux con gdb, se recomienda agregar un índice gdb para acelerar la carga de símbolos. Esto no necesita ejecutarse en cada compilación, pero se recomienda hacerlo al menos una vez para indexar la mayoría de las bibliotecas compartidas:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

La creación de libchromiumcontent requiere una máquina poderosa y lleva mucho tiempo (aunque la reconstrucción incremental del componente de la biblioteca compartida es rápida). Con una CPU Ryzen 1700 de 8 núcleos / 16 hilos con frecuencia de 3 ghz, SSD rápido y 32 GB de RAM, debería llevar unos 40 minutos. No se recomienda construir con menos de 16 GB de RAM.

## Caché de git de Chromium

`depot_tools` tiene una opción no documentada que permite al desarrollador establecer un caché global para todos los objetos git de Chromium + dependencias. Esta opción usa `git clone --shared` para ahorrar ancho de banda y espacio en múltiples clones de los mismos repositorios.

En electron/libchromiumcontent, esta opción se expone a través de la variable de entorno `LIBCHROMIUMCONTENT_GIT_CACHE`. Si tiene la intención de tener varios árboles de construcción con libchromiumcontent en la misma máquina (para trabajar en diferentes ramas, por ejemplo), se recomienda configurar la variable para acelerar la descarga de la fuente de Chromium. Por ejemplo:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

Si el script de arranque se interrumpe mientras se usa la memoria caché de git, se bloqueará la caché. Para eliminar el bloqueo, elimine los archivos que terminan en `.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

Es posible compartir este directorio con otras máquinas exportándolo como SMB share en Linux, pero solo un proceso/máquina puede usar la memoria caché a la vez. Los bloqueos creados por el script git-cache intentarán evitar esto, pero puede que no funcione perfectamente en una red.

En Windows, SMBv2 tiene un caché de directorio que causará problemas con el script del git cache, por lo que es necesario desactivarlo configurando la clave de registro

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

para mayor información: https://stackoverflow.com/a/9935126