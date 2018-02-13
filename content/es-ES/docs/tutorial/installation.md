# Instalación

> Tips para instalar Electron

Para instalar binarios de Electron incorporados, usar [`npm`](https://docs.npmjs.com/). El método preferido es instalar Electron como una dependencia de desarrollo en tu aplicación:

```sh
npm install electron -save-dev
```

Consulte [Electron versioning doc](electron-versioning.md) para información sobre cómo manejar las versiones Electron en las aplicaciones.

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

Durante la instalación, el módulo `electron` será llamado a [`electron-download`](https://github.com/electron-userland/electron-download) para descargar los archivos binarios precreados de Electron para la plataforma. Lo hará poniéndose en contacto con la página de descarga de versiones de GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, donde `$VERSION` es la versión exacta de Electron).

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

El caché contiene el archivo zip oficial de la versión, así como una suma de comprobación almacenada como un archivo de texto. Un caché típico podría verse así:

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

## Problemas

Cuando ejecutamos `npm install electron`, ocasionalmente algunos usuarios encuentran errores en la instalación.

En casi todos los casos, estos errores son resultados de problemas en la red y no en problemas con el paquete nom de `electron`. Errores como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` y `ETIMEDOUT` son indicadores de dichos problemas de red. La mejor resolución es tratar cambianiando de red, o esperar un poco y volver a instalar.

También puede intentar descargar Electron directamente de [electron/electron/releases](https://github.com/electron/electron/releases) si la ruta de instalación `npm` está fallando.

Si la instalación falla con un error `EACCESS` puede que se necesite los [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Si el error de arriba persiste, puede ser que el flag [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) necesite ser igualado a true:

```sh
sudo npm install electron --unsafe-perm=true
```

En redes más lentas, puede ser aconsejable utilizar el flag `--verbose` de manera que se muestre el progreso de descarga:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.