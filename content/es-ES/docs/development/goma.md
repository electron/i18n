# Goma

> Goma es un servicio de compilador distribuido para proyectos open-source tales como Chromium and Android.

Electron tiene un despliegue de un Goma Backend personalizado que hacemos disponible para todos los Maintainers de Electron.  Ve la sección de [Acceso](#access) abajo para los detalles de autenticación.  There is also a `cache-only` Goma endpoint that will be used by default if you do not have credentials.  Requests to the cache-only Goma will not hit our cluster, but will read from our cache and should result in significantly faster build times.

## Enabling Goma

Currently the only supported way to use Goma is to use our [Build Tools](https://github.com/electron/build-tools). Goma configuration is automatically included when you set up `build-tools`.

If you are a maintainer and have access to our cluster, please ensure that you run `e init` with `--goma=cluster` in order to configure `build-tools` to use the Goma cluster.  If you have an existing config, you can just set `"goma": "cluster"` in your config file.

## Construyendo con Goma

Cuando estás usando Goma, puedes correr `ninja` con un valor sustancialmente alto de `j` que normalmente sería soportado por tu máquina.

Please do not set a value higher than **200** on Windows or Linux and **50** on macOS. We monitor Goma system usage, and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

If you're using `build-tools`, appropriate `-j` values will automatically be used for you.

## Monitoreando Goma

Si accedes a [http://localhost:8088](http://localhost:8088) en tu máquina local, puedes monitorear los trabajos de compilación como ellos fluyen a través del sistema de Goma.

## Acceso

For security and cost reasons, access to Electron's Goma cluster is currently restricted to Electron Maintainers.  Si quieres acceder, por favor dirigase a `#access-requests` en Slack y pregunte a `@goma-squad` por el acceso.  Por favor ten en cuenta que siendo un mantenedor no se concede *automáticamente* el acceso, y éste es determinado en caso por caso.

## Uptime / Support

We have automated monitoring of our Goma cluster and cache at https://status.notgoma.com

We do not provide support for usage of Goma and any issues raised asking for help / having issues will _probably_ be closed without much reason, we do not have the capacity to handle that kind of support.
