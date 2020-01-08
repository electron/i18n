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

Cuando estás usando Goma, puedes correr `ninja` con un valor sustancialmente alto de `j` que normalmente sería soportado por tu máquina.  Por favor, no configures un valor mayor que **300**, monitoreamos el sistema de goma y los usuarios encontraron estar abusandolo con una irrazonable concurrencia que será desactivada.

```bash
ninja -C out/Testing electron -j 200
```

## Monitoreando Goma

Si accedes a [http://localhost:8088](http://localhost:8088) en tu máquina local, puedes monitorear los trabajos de compilación como ellos fluyen a través del sistema de Goma.

## Acceso

Por seguridad y razones de costo, el acceso a Electron Goma está actualmente restringido para los mantenedores de Electron.  Si quieres acceder, por favor dirigase a `#access-requests` en Slack y pregunte a `@goma-squad` por el acceso.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.
