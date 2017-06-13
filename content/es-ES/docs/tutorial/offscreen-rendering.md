# Representación fuera de la pantalla

Representación fuera de la pantalla le permite obtener el contenido de una ventana del navegador en un mapa de bits, por lo que se puede representar en cualquier lugar, por ejemplo en una textura en una escena 3D. El procesamiento fuera de la pantalla en electrónica utiliza un enfoque similar que el proyecto de Framework</a> integrado de Chromium.</p> 

Pueden utilizarse dos modos de representación y sólo la zona sucia se pasa en el caso de</code> de 'pintar'` para ser más eficientes. La prestación puede ser detenida, continuó y se puede establecer la velocidad de fotogramas. La velocidad de fotogramas especificada es un valor límite superior, cuando no hay nada pasando en una página web, no se generan Marcos. La velocidad de fotogramas máxima es 60, porque encima de no existe ningún beneficio, sólo pérdida de rendimiento.</p>

<p><strong>Note:</strong> una ventana fuera de la pantalla siempre se crea como un Window</a> de <a href="../api/frameless-window.md">Frameless.</p>

<h2>Dos modos de representación</h2>

<h3>Acelerada de la GPU</h3>

<p>GPU acelerada representación significa que la GPU se utiliza para la composición. Debido a que el marco tiene que copiarse de la GPU que exige más rendimiento, por lo tanto, este modo es un poco más lento que el otro. La ventaja de este modo que se soportan WebGL y 3D animaciones CSS.</p>

<h3>Dispositivo de salida de software</h3>

<p>Este modo utiliza un dispositivo de salida de software para procesamiento en la CPU, por lo que la generación de marco es mucho más rápida, por lo tanto este modo es preferido sobre la GPU acelerada uno.</p>

<p>Para activar este modo de aceleración de la GPU tiene que desactivar llamando al<a href="../api/app.md#appdisablehardwareacceleration"><code>app.disableHardwareAcceleration ()`</a> API.

## Uso

```javascript
const {app, BrowserWindow} = require('electron') app.disableHardwareAcceleration() que ganar app.once ('listo', () => {ganar = new BrowserWindow ({webPreferences: {
      offscreen: true
    }}) win.loadURL ('http://github.com') win.webContents.on ('pintura', (evento, sucio, la imagen) = > {/ / updateBitmap (sucio, image.getBitmap())}) win.webContents.setFrameRate(30)})
```