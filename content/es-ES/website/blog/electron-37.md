---
title: Novedades en Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` recientemente [liberó](https://github.com/electron/electron/releases) e incluyó una actualización importante de Chrome 47 a Chrome 49 y también varias API de núcleo nuevas. Esta última versión trae todas las nuevas características que se envían en [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) y [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Esto incluye propiedades personalizadas CSS, incrementadas [ES6](http://www.ecma-international.org/ecma-262/6.0/) de soporte, `mejoras de KeyboardEvent` , `Promesa` mejoras, y muchas otras nuevas características ahora disponibles en su aplicación Electron.

---

## Novedades

### CSS Custom Properties

Si has usado lenguajes preprocesados como Sass y Less, probablemente estés familiarizado con *variables*, que le permiten definir valores reutilizables para cosas como esquemas de color y diseños. Las variables ayudan a mantener tus hojas de estilo DRY y más mantenibles.

Las propiedades personalizadas CSS son similares a las variables preprocesadas en que son reutilizables, pero también tienen una calidad única que los hace aún más poderosos y flexibles: **pueden ser manipulados con JavaScript**. Esta sutil pero potente característica permite cambios dinámicos a las interfaces visuales mientras se beneficia de [la aceleración de hardware](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions)de CSS, y duplicación de código reducida entre el código del frontend y las hojas de estilos.

Para obtener más información sobre las propiedades personalizadas de CSS, consulte el [artículo MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) y la [demo de Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Variables CSS en acción

Veamos un ejemplo de variable simple que puede modificarse sobre la marcha en tu app.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

El valor de la variable puede ser recuperado y cambiado directamente en JavaScript:

```js
// Obtener el valor de la variable ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Establecer el valor de la variable a 'narange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Los valores de las variables también pueden editarse desde la sección **Estilos** de las herramientas de desarrollo para comentarios y ajustes rápidos:

![Propiedades CSS en pestaña Estilos](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` Propiedad

Chrome 48 agregó la nueva propiedad de `código` disponible en los eventos `KeyboardEvent` que serán la tecla física presionada independientemente de la disposición del teclado del sistema operativo.

Esto debería hacer que la implementación de atajos de teclado personalizados en su aplicación Electron sea más precisa y consistente entre máquinas y configuraciones.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} fue presionado.`)
})
```

Mira [este ejemplo](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) para verlo en acción.

### Eventos de rechazo de promesas

Chrome 49 agregó dos nuevos eventos de `ventana` que le permiten ser notificado cuando una [Promise rechazada](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) no se gestiona.

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('Una promesa rechazada no fue manejada', event.promise, event.reason)
})

ventana. ddEventListener('rejectionhandled', function (event) {
  console.log('Una promesa rechazada fue manejada', event.promise, event.reason)
})
```

Mira [este ejemplo](https://googlechrome.github.io/samples/promise-rejection-events/index.html) para verlo en acción.

### Actualizaciones ES2015 en V8

La versión de V8 ahora en Electron incorpora [91% de ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Aquí tienes algunas adiciones interesantes que puedes usar fuera de la caja—sin banderas ni precompiladores:

#### Parámetros por defecto

```js
function multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### Asignación de desestructuración

Chrome 49 agregó [asignación de desestructuración](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) para facilitar la asignación de variables y parámetros de función.

Esto hace que Electron necesite más limpio y compacto para asignar ahora:

##### El proceso del navegador requiere

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Requiere Proceso de Renderer

```js
const {dialog, Tray} = require('electron').remoto
```

##### Otros ejemplos

```js
// Destructurando un arreglo y omitiendo el segundo elemento
const [primero, , last] = findAll()

// Destructurando parámetros de función
function whois({displayName: displayName, fullName: {firstName: name}}){
  consola. og(`${displayName} es ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      apellido: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destructurando un objeto
let {name, avatar} = getUser()
```

## Nuevas API de Electron

Algunas de las nuevas APIs de Electron están debajo, puede ver cada nueva API en las notas de lanzamiento para [lanzamientos de Electron](https://github.com/electron/electron/releases).

#### `mostrar` y `ocultar` eventos en `Navegador Ventana`

Estos eventos se emiten cuando se muestra u oculta la ventana.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window. n('mostrar', function () { console.log('Ventana se mostró') })
window.on('oculto', function () { console.log('Ventana estaba oculta') })
```

#### `plataforma cambiada` en `aplicación` para `OS X`

Este evento se emite cuando el tema [Modo Oscuro](https://discussions.apple.com/thread/6661740) del sistema está activado.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme changed. ¿En modo oscuro? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` para `OS X`

Este método devuelve `verdadero` si el sistema está en modo oscuro, y `falso` de lo contrario.

#### `scroll-touch-begin` y `scroll-touch-end` eventos a BrowserWindow `OS X`

Estos eventos se emiten cuando la fase del evento de la rueda de desplazamiento ha comenzado o ha terminado.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Toque de desplazamiento iniciado') })
window.on('scroll-touch-end', function () { console.log('Toque de desplazamiento terminado') })
```

