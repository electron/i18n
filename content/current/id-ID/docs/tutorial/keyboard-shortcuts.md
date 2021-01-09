# Keyboard Shortcuts

## Sekilas

This feature allows you to configure local and global keyboard shortcuts for your Electron application.

## Contoh

### Local Shortcuts

Local keyboard shortcuts are triggered only when the application is focused. To configure a local keyboard shortcut, you need to specify an [`accelerator`] property when creating a [MenuItem](../api/menu-item.md) within the [Menu](../api/menu.md) module.

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> NOTE: In the code above, you can see that the accelerator differs based on the user's operating system. For MacOS, it is `Alt+Cmd+I`, whereas for Linux and Windows, it is `Alt+Shift+I`.

After launching the Electron application, you should see the application menu along with the local shortcut you just defined:

![Menu with a local shortcut](../images/local-shortcut.png)

If you click `Help` or press the defined accelerator and then open the terminal that you ran your Electron application from, you will see the message that was generated after triggering the `click` event: "Electron rocks!".

### Jalan pintas global

To configure a global keyboard shortcut, you need to use the [globalShortcut](../api/global-shortcut.md) module to detect keyboard events even when the application does not have keyboard focus.

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

> NOTE: In the code above, the `CommandOrControl` combination uses `Command` on macOS and `Control` on Windows/Linux.

After launching the Electron application, if you press the defined key combination then open the terminal that you ran your Electron application from, you will see that Electron loves global shortcuts!

### Jalan pintas dalam BrowserWindow

#### Using web APIs

If you want to handle keyboard shortcuts within a [BrowserWindow](../api/browser-window.md), you can listen for the `keyup` and `keydown` [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) inside the renderer process using the [addEventListener() API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` indicates that the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

#### Intercepting events in the main process

The` sebelum-input- acara </ 0>  acara 
dipancarkan sebelum pengiriman <code> keydown </ 1> dan <code> keyup </ 1> peristiwa di halaman. Ini bisa digunakan untuk menangkap dan menangani shortcut custom yang tidak terlihat pada menu.</p>

<h5 spaces-before="0">Contoh</h5>

<p spaces-before="0">Starting with a working application from the
<a href="quick-start.md">Quick Start Guide</a>, update the <code>main.js` file with the following lines:</p> 



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```


After launching the Electron application, if you open the terminal that you ran your Electron application from and press `Ctrl+I` key combination, you will see that this key combination was successfully intercepted.



#### Using third-party libraries

If you don't want to do manual shortcut parsing, there are libraries that do advanced key detection, such as [mousetrap](https://github.com/ccampbell/mousetrap). Below are examples of usage of the `mousetrap` running in the Renderer process:



```js
Mousetrap.bind ('4', () = > {console.log('4')}) Mousetrap.bind ('? ', () = > {console.log ('menunjukkan cara pintas!')}) Mousetrap.bind ('Escudo', () = > {console.log('escape')}, 'keyup') / / kombinasi Mousetrap.bind ('perintah + pergeseran + k', () = > {console.log ('perintah pergeseran k')}) / / peta beberapa kombinasi ke callback sama Mousetrap.bind (['perintah + k', ' ctrl + k'], ()) = > {console.log ('perintah k atau control k') / / kembali palsu untuk mencegah perilaku default dan acara berhenti dari menggelegak kembali palsu}) / / gmail gaya urutan Mousetrap.bind ('g saya ', () = > {console.log ('pergi ke inbox')}) Mousetrap.bind ('* ', () = > {konsol .log ('Pilih Semua')}) / / kode konami!
Mousetrap.bind ('sampai sampai down turun kiri kanan kiri kanan b masukkan ', () = > {console.log ('kode konami')})
```
