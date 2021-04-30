# Ventanas sin bordes

> Abrir una ventana sin barras de herramientas, bordes u otro "chrome" gráfico.

Una ventana sin bordes es una ventana que no tiene [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), ni las partes de la ventana, como barra de herramientas, que no forman parte de la página web. Estas son las opciones en la clase [`BrowserWindow`](browser-window.md).

## Crear una ventana sin bordes

Para crear una ventana sin marco, necesitas establecer `frame` a `false` en las `options` de [BrowserWindow](browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Alternativas en macOS

Hay una forma alternativa par especificar un ventana sin bordes (chromeless). En lugar de establecer `frame` a `false` lo que deshabilita ambos la barra de título y los controles de la ventana, usted puede querer tener la barra de título oculta y su contenido se extienda al tamaño completo de la ventana, aún conserva los controles de la ventana ("semáforos") para las acciones estándar de la ventana. Puede hacerse especificando la opción `titleBarStyle`:

#### `hidden`

Es una barra de título oculta y una ventana de contenido de tamaño completo. Sin embargo, la barra de título mantiene los controles estándares de la ventana (“traffic lights”) en la parte superior izquierda.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

Es una barra de título oculta con un aspecto alternativo donde los botones de traffic light están ligeramente mas insertados desde el borde de la ventana.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Usa botones personalizados de cierre y miniaturiza que se muestran cuando se activa en la parte superior izquierda de la ventana. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's macOS window masks. Estos botones personalizados evitaran problemas con los eventos de ratón que ocurren con los botones de la barra de herramientas estándar. Esta opción sólo es aplicable para ventanas sin marco.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Ventana transparente

Al configurar la opción `transparent` a `true`, se puede hacer transparente la ventana sin bordes:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Limitaciones

* No se puede hacer clic a través del área transparente. Vamos a introducir una API para configurar la forma de la ventana para solucionar esto. Consulte [our issue](https://github.com/electron/electron/issues/1335) para mas detalles.
* Las ventanas transparentes no son redimencionables. Establecer `resizable` a `true` puede hacer que una ventana transparente deje de funcionar en algunas plataformas.
* El filtro `blur` solo aplica a la página web, por lo que no hay manera de aplicar el efecto blur al contenido debajo de la ventana (por ejemplo, otras aplicaciones abiertas en el sistema del usuario).
* La ventana no será transparente cuando DevTools este abierta.
* On Windows operating systems,
  * transparent windows will not work when DWM is disabled.
  * transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on [this pull request](https://github.com/electron/electron/pull/28207).
* En Linux, los usuarios tienen que poner `--enable-transparent-visuals --disable-gpu` en la línea de comandos para deshabilitar el GPU y permitir ARGB para hacer transparente la ventana, esto es causado por un bug ascendente donde [el canal alfa no funciona en algunos controladores NVidia](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) en Linux.
* En Mac, la sombra nativa no se mostrará en una ventana transparente.

## Ventana Click-through

Para crear una ventana click-through, por ejemplo hacer que la ventana ignore todos los eventos del ratón, puedes llamar la API [win.setIgnoreMouseEvents(ignore)][ignore-mouse-events]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Reenviando

Ignorar los mensajes de movimiento del ratón hace la página agena al movimiento del ratón, lo que significa que los eventos no se emitirán. En los sistemas operativos Windows se puede usar un parámetro opcional para reenviar los mensajes de movimiento del ratón a la página web, permitiendo que eventos como `mouseleave` se emitan:

```javascript
const { ipcRenderer } = require('electron')
const el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
})

// Main process
const { ipcMain } = require('electron')
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
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

Si sólo está configurando una barra de títulos personalizada como arrastrable, también necesita hacer todos los botones en la barra de título no arrastrable.

## Selección de texto

En una ventana sin marco el comportamiento de arrastrar puede causar conflicto con la selección de texto. Por ejemplo, cuando se arrastra la barra de título, accidentalmente se podría seleccionar el texto sobre la barra de título. Para evitar esto, es necesario deshabilitar la selección de texto dentro de un área desplazable como:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menú de contexto

En algunas plataformas, el área desplazable puede ser considerada como un borde que no forma parte del cliente, de esta manera cuando se haga clic sobre él, aparecerá un menú del sistema. Para que el menú de contexto se comporte correctamente en todas las plataformas, nunca debe usarse un menú de contexto personalizado en áreas desplazables.

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
