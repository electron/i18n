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

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Espejos y cachés personalizados
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Lo hará poniéndose en contacto con la página de descarga de versiones de GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, donde `$VERSION` es la versión exacta de Electron).

Si no puede acceder a GitHub o necesita proporcionar una compilación personalizada, puede hacerlo proporcionando un espejo o un directorio de caché existente.

#### Espejo
Puede usar variables de entorno para anular la URL base, la ruta en la cual buscar binarios de Electron y el nombre del archivo binario. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Caché
Alternativamente, puede anular la memoria caché local. `@electron-get` almacenará en caché los archivos binarios descargados en un directorio local para no sobrecargar tu red. Puede usar esa carpeta de caché para proporcionar compilaciones personalizadas de Electron o para evitar hacer contacto con la red en absoluto.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

En entornos que han estado usando versiones anteriores de Electron, también podrás encontrar la caché en `~/.electron`.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Omitir la descarga del archivo binario
Cuando instale el paquete `electron` NPM, automáticamente descarga el archivo binario electron.

Esto puede ser innecesario, por ejemplo en un entorno CI, cuando se prueba otro componente.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
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
