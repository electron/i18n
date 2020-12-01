# macOS Dock

## Descripción general

Electron tiene APIs para configurar el icono de la aplicación en el Dock de macOS. Existe una API solo macOS para crear un menú de acoplamiento personalizado, pero Electron también utiliza el ícono del acoplador de aplicaciones como punto de entrada para características multiplataforma como [documentos recientes](./recent-documents.md) y [progreso de aplicación](./progress-bar.md).

La base de acoplamiento personalizada se utiliza habitualmente para añadir accesos directos a las tareas para las que el usuario no desea abrir toda la ventana de la aplicación.

__Menú Dock de Terminal.app:__

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Para configurar tu menú de acoplamiento personalizado, necesitas usar la [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, que sólo está disponible en macOS.

## Ejemplo

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), actualice el archivo `main.js` con las siguientes líneas:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'Nueva ventana',
    click () { consola. og('Nueva ventana') }
  }, {
    label: 'Nueva ventana con Ajustes', submenú
    [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Después de lanzar la aplicación Electron haga clic derecho en el icono de la aplicación. Debería ver el menú personalizado que acaba de definir:

![menú de acoplamiento macOS](../images/macos-dock-menu.png)
