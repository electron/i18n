---
title: Arreglo de vulnerabilidad de BrowserView window.open()
author: ckerr
date: '03-02-2019'
---

Se ha descubierto una vulnerabilidad de código que permitía que Node volviera a activar en las ventanas hijas.

---

Abriendo un BrowserView con `sandbox: true` o `nativeWindowOpen: true` y `nodeIntegration: false` resulta en un webContents donde `ventana. Se puede llamar a pen` y la ventana secundaria recién abierta tendrá `nodeIntegration` activada. Esta vulnerabilidad afecta a todas las versiones soportadas de Electron.

## Modificación

Hemos publicado nuevas versiones de Electron que incluyen correcciones para esta vulnerabilidad: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4)y [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Animamos a todos los desarrolladores de Electron a actualizar sus aplicaciones a la última versión estable inmediatamente.

Si por alguna razón no puede actualizar su versión de Electron puede mitigar este problema deshabilitando todo el contenido web hijo:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Más información

Esta vulnerabilidad fue encontrada e informada responsablemente al proyecto Electron por [PalmerAL](https://github.com/PalmerAL).

Para aprender más sobre las buenas prácticas para mantener tus aplicaciones Electron seguras, ve nuestro [tutorial de seguridad][].

Si desea reportar una vulnerabilidad en Electron, envíe un correo electrónico a security@electronjs.org.

[tutorial de seguridad]: https://electronjs.org/docs/tutorial/security
