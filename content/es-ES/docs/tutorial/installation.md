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

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Problemas

Cuando ejecutamos `npm install electron`, algunos usuarios ocasionalmente encuentran errores.

En la mayoría de los casos, estos errores son el resultado de problemas con la red y no problemas con el paquete npm de `electron`. Errores como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` y `ETIMEDOUT` son indicadores de dichos problemas de red. La mejor solución es intentar cambiar de red o esperar un poco e intentar instalar nuevamente.

También puede intentar descargar Electron directamente desde [electron/electron/releases](https://github.com/electron/electron/releases) si la instalación vía `npm` falla.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.