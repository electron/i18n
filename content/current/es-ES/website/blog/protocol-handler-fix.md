---
title: Arreglo de vulnerabilidad de Manejo de Protocolo
author: zeke
date: '22-01-2018'
---

Se ha descubierto una vulnerabilidad de ejecución de código remoto que afecta a aplicaciones Electron que utilizan controladores de protocolo personalizados. Esta vulnerabilidad se ha asignado al identificador CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Plataformas Afectadas

Las aplicaciones Electron diseñadas para ejecutarse en Windows que se registran a sí mismas como el manejador predeterminado de para un protocolo, como `myapp://`, son vulnerables.

Tales aplicaciones pueden verse afectadas, independientemente de cómo se registre el protocolo, p.ej. usando código nativo, el registro de Windows o la API de Electron [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows).

macOS y Linux **no son vulnerables** a este problema.

## Modificación

Hemos publicado nuevas versiones de Electron que incluyen correcciones para esta vulnerabilidad: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), y [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Instamos a todos los desarrolladores de Electron a actualizar sus aplicaciones a la última versión estable inmediatamente.

Si por alguna razón no puede actualizar su versión de Electron puedes añadir `--` como último argumento al llamar a [aplicación. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), que evita que Chromium analice más opciones. El doble guión `--` significa el final de las opciones de comandos, después del cual solo se aceptan parámetros posicionales.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Vea la [app.setAsDefaultProtocolent API](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) para más detalles.

Para obtener más información sobre las mejores prácticas para mantener sus aplicaciones Electron seguras, vea nuestro [tutorial de seguridad](https://electronjs.org/docs/tutorial/security).

Si desea reportar una vulnerabilidad en Electron, envíe un correo electrónico a security@electronjs.org.
