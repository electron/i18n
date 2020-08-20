# MacOS Dock

Electron tiene APIs para configurar el icono de la aplicación en el Dock de macOS. Un sistema sólo de macOS La API existe para crear un menú de acoplamiento personalizado, pero Electron también utiliza el icono de la aplicación para implementar funciones multiplataforma. como [documentos recientes][recent-documents] y [progreso de la aplicación ][progress-bar].

La base de acoplamiento personalizada se utiliza habitualmente para añadir accesos directos a las tareas para las que el usuario no desea abrir toda la ventana de la aplicación.

__Menú Dock de Terminal.app:__

![Menu Dock][3]

Para configurar su menú de base personalizada, puede utilizar la API `app.dock.setMenu`, que sólo está disponible en macOS:

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app.dock.setMenu(dockMenu)
```

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
