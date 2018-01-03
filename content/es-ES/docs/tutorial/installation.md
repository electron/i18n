# Instalación

> Tips para instalar Electron

Para instalar binarios de Electron incorporados, usar [`npm`](https://docs.npmjs.com/). El método preferido es instalar Electron como una dependencia de desarrollo en tu aplicación:

```sh
npm install electron -save-dev
```

Ver la [documentación de control de versiones de Electron](electron-versioning.md) para ver información acerca de como manejar versiones de Electron en tus aplicaciones.

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

Además de cambiar la arquitectura, puedes también especificar la plataforma (e.g., `win32`, `linux`, etc.) usando el flag `--platform`:

```shell
npm install --platform=win32 electron
```

## Proxies

Si necesitas usar un porxy HTTP puedes [configurar estas variables de entorno](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Problemas

Cuando ejecutamos `npm install electron`, algunos usuarios ocasionalmente encuentran errores de instalación.

En la mayoría de los casos, estos errores son el resultado de problemas con la red y no problemas con el paquete de npm de `electron`. Errores como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` y `ETIMEDOUT` son indicadores de dichos problemas de red. La mejor solución es intentar cambiar de red o esperar un poco e intentar instalar nuevamente.

También puede intentar descargar Electron directamente desde [electron/electron/releases](https://github.com/electron/electron/releases) si la instalación vía `npm` falla.

Si la instalación falla con un error `EACCESS` puede que necesites [arreglar tus permisos de npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Si el error de arriba persiste, puede ser que el flag [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) necesite ser igualado a true:

```sh
sudo npm install electron --unsafe-perm=true
```

En redes más lentas, puede ser aconsejable utilizar el flag `--verbose` de manera que se muestre el progreso de descarga:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.