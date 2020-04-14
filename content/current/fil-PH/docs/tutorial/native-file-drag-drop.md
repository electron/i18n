# Katutubong File Drag& Drop

Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Dragging files into web content is common and supported by many websites. Electron additionally supports dragging files and content out from web content into the operating system's world.

To implement this feature in your app, you need to call `webContents.startDrag(item)` API in response to the `ondragstart` event.

In your renderer process, handle the `ondragstart` event and forward the information to your main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

```javascript
const {ipcMain} = kailangan (' elektron ') ipcMain. on (' ondragstart ', (kaganapan, mga pelikula. = & gt; {event. nagpadala. startDrag ({file: mga pelikula, icon: '/Path/to/icon.png '})})
```
