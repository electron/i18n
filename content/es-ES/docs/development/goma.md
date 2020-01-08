# Goma

> Goma es un servicio de compilador distribuido para proyectos open-source tales como Chromium and Android.

Electron tiene un despliegue de un Goma Backend personalizado que hacemos disponible para todos los Maintainers de Electron.  Ve la sección de [Acceso](#access) abajo para los detalles de autenticación.

## Enabling Goma

Actualmente, Electron Goma soporta tanto Windows como Linux, podemos añadir soporte para macOS en el mismo punto en el futuro.  Si estás en una plataforma soportada puedes activar Goma importando el archivo de configuración `goma.gn` cuando usas `gn`.

```bash
gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") import(\"//electron/build/args/goma.gn\")"
```

Deberías asegurarte que no tengas configurado `cc_wrapper`, esto significa que no puedes usar `sccache` o alguna tecnología similar.

Antes que puedas usar goma para construir en Electron, necesitas autenticarte en el servicio de Goma.  Solamente necesitas hacer esto una vez por máquina.

```bash
cd electron/external_binaries/goma
goma_auth.py login
```

Una vez autenticado, necesitas asegurar que el daemon goma esté corriendo en tu máquina.

```bash
cd electron/external_binaries/goma
goma_ctl.py ensure_start
```

## Construyendo con Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.  Please do not set a value higher than **300**, we monitor the goma system and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

## Monitoring Goma

If you access [http://localhost:8088](http://localhost:8088) on your local machine you can monitor compile jobs as they flow through the goma system.

## Access

For security and cost reasons access to Electron Goma is currently restricted to Electron Maintainers.  If you want access please head to `#access-requests` in Slack and ping `@goma-squad` to ask for access.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.
