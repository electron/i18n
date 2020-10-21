---
title: Arreglo de vulnerabilidad WebPreferencias
author: ckerr
date: '22-08-2018'
---

Se ha descubierto una vulnerabilidad de ejecución de un código remoto la cual afecta aplicaciones con la capacidad de abrir ventanas anidadas hijas en versiones de Electron (3.0.0-beta.6, 2.0.7, 1.8.7, and 1.7.15). La vulnerabilidad ha sido asignada al identificador CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Plataformas Afectadas

Esto te afecta si:

1. Has incrustado _cualquier_ contenido de usuario remoto, incluso en una sandbox
2. Aceptas inputs de usuario con cualquier vulnerabilidad XSS

_Detalles_

Esto te afecta si cualquier código de usuario se ejecuta dentro de `iframe` / si puede crear un `iframe`. Dada la posibilidad de una vulnerabilidad XSS, se puede asumir que la mayoría de aplicaciones son vulnerables a este caso.

Esto te afecta si abres cualquiera de tus ventanas con las opciones `nativeWindowOpen: true` o `sandbox: true`.  A pesar de que esta vulnerabilidad también requiere que exista una vulnerabilidad XSS en tu aplicación, deberías aplicar una de las mitigaciones de abajo si utilizas alguna de estas opciones.

## Modificación

Hemos publicado nuevas versiones de Electron las cuales incluyen correcciones para esta vulnerabilidad: [`3.0.0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2.0.8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), and [`1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Le pedimos a todos los desarrolladores de Electron a que actualicen sus aplicaciones a la más reciente versión estable ahora mismo.

Si por alguna razón no puedes actualizar la versión de Electron, puedes proteger tu aplicación mediante `event.preventDefault()` en el evento `new-window` para `webContents`. Si no utilizas `window.open` o ninguna ventana hija en absoluto, entonces esta también es una mitigación válida para tu aplicación.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Si dependes de la capacidad de tus ventanas hijas para crear ventanas de nietos, entonces una tercera estrategia de mitigación requiere utilizar el siguiente código en tu ventana de nivel superior:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents.on('new-window', (event, url, frameName, disposition, options) => {
      if (!options.webPreferences) {
        options.webPreferences = {}
      }
      Object.assign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options.webContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow.webContents)
```

Este código forzará manualmente las ventanas de nivel superior (`webPreferences`) sean aplicadas a todas las ventanas hijas de manera infinitamente profunda.

## Más información

Esta vulnerabilidad fue encontrada y reportada responsablemente al proyecto Electron por [Matt Austin](https://twitter.com/mattaustin) de [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Para obtener más información sobre las mejores prácticas para mantener sus aplicaciones Electron seguras, consulte nuestro [tutorial de seguridad](https://electronjs.org/docs/tutorial/security).

Si desea reportar una vulnerabilidad en Electron, envíe un correo electrónico a security@electronjs.org.
