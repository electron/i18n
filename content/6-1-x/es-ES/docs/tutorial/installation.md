# Instalación

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron -save-dev
```

Por favor, echa un vistazo a [Electron versioning doc](./electron-versioning.md) para información de como manejar version de Electron en tus apps.

## Instalación Global

Puedes también instalar el comando `electron` globalmente en tu `$PATH`:

```sh
npm install electron -g
```

## Personalización

Si quieres cambiar la arquitectura que será descargada (e.g, `ia32` en una máquina `x64`), puedes usar el flag `--arch` con npm install o configurar la variable de entorno `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Además de cambiar la arquitectura, también se puede especificar la plataforma (e.g., `win32`, `linux`, etc.) utilizando el flag `--platform`:

```shell
npm install --platform=win32 electron
```

## Proxies

Si necesitas usar un porxy HTTP puedes [configurar estas variables de entorno](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Espejos y cachés personalizados
Durante la instalación, el módulo `electron` llamara a [`electron-download`](https://github.com/electron-userland/electron-download) para descargar binarios precompilados de Electron para tu plataforma. Lo hará poniéndose en contacto con la página de descarga de versiones de GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, donde `$VERSION` es la versión exacta de Electron).

Si no puede acceder a GitHub o necesita proporcionar una compilación personalizada, puede hacerlo proporcionando un espejo o un directorio de caché existente.

#### Espejo
Puede usar variables de entorno para anular la URL base, la ruta en la cual buscar binarios de Electron y el nombre del archivo binario. El url utilizado por `electron-download` se compone de la siguiente manera:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Por ejemplo, para usar el espejo de China:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Caché
Alternativamente, puede anular la memoria caché local. `electron-download` almacenará en caché los archivos binarios descargados en un directorio local para no sobrecargar la red. Puede usar esa carpeta de caché para proporcionar compilaciones personalizadas de Electron o para evitar hacer contacto con la red en absoluto.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

En entornos que han estado usando versiones anteriores de Electron, también podrás encontrar la caché en `~/.electron`.

También se puede anular la ubicación de almacenamiento en caché local al proporcionar una variable de entorno `ELECTRON_CACHE`.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Omitir la descarga del archivo binario
Cuando instale el paquete `electron` NPM, automáticamente descarga el archivo binario electron.

Esto puede ser innecesario, por ejemplo en un entorno CI, cuando se prueba otro componente.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. Por ejemplo.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Problemas

Cuando ejecutamos `npm install electron`, ocasionalmente algunos usuarios encuentran errores en la instalación.

En casi todos los casos, estos errores son resultados de problemas en la red y no de problemas con el paquete npm de `electron`. Errores como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` y `ETIMEDOUT` son indicadores de dichos problemas de red. La mejor solución es tratar de cambiar las redes, o esperar un poco e instalar de nuevo.

También puede intentar descargar Electron directamente de [electron/electron/releases](https://github.com/electron/electron/releases) si la ruta de instalación `npm` está fallando.

Si la instalación falla con un error `EACCESS` puede que se necesite los [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Si el error de arriba persiste, puede ser que la marca [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) necesite sea establecido a true:

```sh
sudo npm install electron --unsafe-perm=true
```

En redes lentas, puede ser aconsejable utilizar la marca `--verbose` de manera que se muestre el progreso de la descarga:

```sh
npm install --verbose electron
```

Si necesita forzar que se vuelvan a descargar el recurso y el archivo SHASUM, fije la variable de entorno `force_no_cache` a `true`.
