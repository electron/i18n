# Ventanas sin bordes

> Abrir una ventana sin barras de herramientas, bordes u otro "chrome" gráfico.

Una ventana sin bordes es una ventana que no tiene [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), ni las partes de la ventana, como barra de herramientas, que no forman parte de la página web. Estas son las opciones en la clase [`BrowserWindow`](browser-window.md).

## Crear una ventana sin bordes

Para crear una ventana sin marco, necesitas establecer `frame` a `false` en las `options` de [BrowserWindow](browser-window.md):

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### Alternativas en macOS

En macOS 10.9 Mavericks y más reciente, hay una manera alternativa de especificar una ventana sin chromes. En lugar de establecer `frame` a `false`, el cual deshabilita tanto los controles de la ventana como la barra de títulos, puedes ocultar la barra de tareas y ampliar el contenido hasta el tamaño completo de la ventana, aún así se mantienen los controles de la ventana ("traffic lights") para las acciones estándares de la ventana. Puede hacerse especificando la opción `titleBarStyle`:

#### `hidden`

Es una barra de título oculta y una ventana de contenido de tamaño completo. Sin embargo, la barra de título mantiene los controles estándares de la ventana (“traffic lights”) en la parte superior izquierda.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

Es una barra de título oculta con un aspecto alternativo donde los botones de traffic light están ligeramente mas insertados desde el borde de la ventana.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

Utiliza un dibujo personalizado de los botones cerrar, miniaturizar y pantalla completa que se muestran cuando se pasa por encima de la parte superior izquierda de la ventana. Estos botones personalizados evitan problemas con los eventos del ratón que ocurren con los botones estándares de la barra de tareas de la ventana. Esta opción solo es aplicable para ventanas sin marco.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Ventana transparente

Al configurar la opción `transparent` a `true`, se puede hacer transparente la ventana sin bordes:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### Limitaciones

* No se puede hacer clic a través del área transparente. Vamos a introducir una API para configurar la forma de la ventana para solucionar esto. Consulte [our issue](https://github.com/electron/electron/issues/1335) para mas detalles.
* Las ventanas transparentes no son redimensionables. Configurar `resizable` a `true` puede hacer que una ventana transparente deje de funcionar en algunas plataformas.
* El filtro `blur` solo aplica a la página web, por lo que no hay manera de aplicar el efecto blur al contenido debajo de la ventana (por ejemplo, otras aplicaciones abiertas en el sistema del usuario).
* En los sistemas operativos Windows, las ventanas transparentes no funcionarán cuando DWM está deshabilitado.
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Ventana Click-through

Para crear una ventana click-through, por ejemplo hacer que la ventana ignore todos los eventos del ratón, puedes llamar la API [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore):

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Reenviando

Ignorar los mensajes de movimiento del ratón hace la página agena al movimiento del ratón, lo que significa que los eventos no se emitirán. En los sistemas operativos Windows se puede usar un parámetro opcional para reenviar los mensajes de movimiento del ratón a la página web, permitiendo que eventos como `mouseleave` se emitan:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

Esto hace que la página web sea "click-through" cuando se situa el ratón sobre `el`, y vuelva a su estado normal cuando se abandona.

## Región desplazable

Por defecto, una ventana sin bordes no se puede desplazar. La aplicación necesita especificar `-webkit-app-region: drag` en CSS para indicarle a Electron cuales regiones son desplazables (como la barra de títulos estándar del sistema operativo). Las aplicaciones también pueden usar `-webkit-app-region: no-drag` para excluir el área no desplazable de las regiones desplazables. Tenga en cuenta que solo las formas rectangulares son soportadas.

Nota: `-webkit-app-region: drag` es conocida por tener problemas mientras las herramientas del desarrollador están abiertas. Para mas información ver este [GitHub issue](https://github.com/electron/electron/issues/3647) incluida una solución.

Para hacer que toda la ventana sea desplazable, puedes agregar `-webkit-app-region: drag` como el estilo de `body`:

```html
<body style="-webkit-app-region: drag">
</body>
```

Y tenga en cuenta que si se hace toda la ventana desplazable, se debe marcar los botones como no desplazable, de lo contrario sería imposible para los usuarios hacer clic sobre ellos:

```css
button {
  -webkit-app-region: no-drag;
}
```

Si se configura una barra de título personalizada como desplazable, también es necesario hacer que todos los botones de la barra de título sean no desplazables.

## Selección de texto

El comportamiento del desplazamiento puede tener conflictos con el texto seleccionado en una ventana sin bordes. Por ejemplo, cuando se arrastra la barra de título, accidentalmente se podría seleccionar el texto sobre la barra de título. Para evitar esto, es necesario deshabilitar la selección de texto dentro de un área desplazable como:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menú de contexto

En algunas plataformas, el área desplazable puede ser considerada como un borde que no forma parte del cliente, de esta manera cuando se haga clic sobre él, aparecerá un menú del sistema. Para que el menú de contexto se comporte correctamente en todas las plataformas, nunca debe usarse un menú de contexto personalizado en áreas desplazables.