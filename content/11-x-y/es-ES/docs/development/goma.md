# Goma

> Goma es un servicio de compilador distribuido para proyectos open-source tales como Chromium and Android.

Electron tiene un despliegue de un Goma Backend personalizado que hacemos disponible para todos los Maintainers de Electron.  Ve la sección de [Acceso](#access) abajo para los detalles de autenticación.  También hay un `cache-only` Goma endpoint que se usará por defecto si tu no tienes credenciales.  Las solicitudes al cache-only Goma no afectarán a nuestro clúster, pero leerá de nuestra caché y debería resultar en tiempos de compilación significativamente más rápidos.

## Enabling Goma

Actualmente la única forma de usar Goma es usar nuestro [Build Tools](https://github.com/electron/build-tools). Goma configuración es automáticamente incluida cuando instalas `build-tools`.

Si eres un mantenedor y tienes acceso a nuestro cluster, por favor asegúrate de correr `e init` con `--goma=cluster` para configurar `build-tools` para utilizar Goma cluster.  Si tienes una configuración existente, puedes establecer `"goma": "cluster"` en tu archivo de configuración.

## Construyendo con Goma

Cuando estás usando Goma, puedes correr `ninja` con un valor sustancialmente alto de `j` que normalmente sería soportado por tu máquina.

Por favor no establezca un valor mayor a **200** en Windows o Linux y **50** en macOS. Supervisamos el uso del sistema Goma, y los usuarios que abusan de él con concurrencia irrazonable serán desactivados.

```bash
ninja -C out/Testing electron -j 200
```

Si está usando ` build-tools `, los valores apropiados de ` -j ` se usarán automáticamente.

## Monitoreando Goma

Si accedes a [http://localhost:8088](http://localhost:8088) en tu máquina local, puedes monitorear los trabajos de compilación como ellos fluyen a través del sistema de Goma.

## Acceso

Por razones de seguridad y costos, el acceso al cluster Goma de Electron actualmente está restringido a los Mantenedores de Electron.  Si quieres acceder, por favor dirigase a `#access-requests` en Slack y pregunte a `@goma-squad` por el acceso.  Por favor ten en cuenta que siendo un mantenedor no se concede *automáticamente* el acceso, y éste es determinado en caso por caso.

## Tiempo de actividad / Soporte

Hemos automatizado el monitoreo de nuestro clúster Goma y caché en https://status.notgoma.com

No proporcionamos soporte para el uso de Goma cualquier propuesta planteada pidiendo ayuda / teniendo problemas _probablemente_ se cerrarán sin mucha razón, no tenemos la capacidad para manejar ese tipo de soporte.
