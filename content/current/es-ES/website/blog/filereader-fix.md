---
title: Arreglo de vulnerabilidad de archivos de cromo
author: mariscallofsound
date: '07-03-2019'
---

Se ha descubierto una vulnerabilidad de alta gravedad en Chrome que afecta a todo el software basado en Chromium, incluyendo Electron.

Esta vulnerabilidad ha sido asignada `CVE-2019-5786`.  Puedes leer más al respecto en la [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Tenga en cuenta que Chrome tiene informes de que esta vulnerabilidad está siendo usada en el salvaje, por lo que se recomienda encarecidamente que actualice Electron ASAP.

---

## Alcance

Esto afecta a cualquier aplicación de Electron que pueda ejecutar JavaScript de terceros o no de confianza.

## Modificación

Las aplicaciones afectadas deben actualizarse a una versión parcheada de Electron.

Hemos publicado nuevas versiones de Electron que incluyen correcciones para esta vulnerabilidad:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

La última beta de Electron 5 fue el seguimiento de Chromium 73 y por lo tanto ya está parcheado:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Más información

Esta vulnerabilidad la descubrió Clement Lecigne del Grupo de Análisis de Amenazas de Google e informó al equipo de Chrome.  La entrada del blog de Chrome se puede encontrar [aquí](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Para obtener más información sobre las mejores prácticas para mantener sus aplicaciones Electron seguras, consulte nuestro [tutorial de seguridad](https://electronjs.org/docs/tutorial/security).

Si desea reportar una vulnerabilidad en Electron, envíe un correo electrónico a security@electronjs.org.
