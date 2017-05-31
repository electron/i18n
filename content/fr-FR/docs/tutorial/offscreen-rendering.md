# Rendu Offscreen

Rendu hors de l’écran vous permet d’obtenir le contenu d’une fenêtre de navigateur dans un fichier bitmap, donc il peut être restitué n’importe où, par exemple une texture dans une scène 3D. Le rendu hors écran en électrons utilise une approche similaire que le projet Embedded Framework</a> de Chromium.</p> 

Deux modes de rendu peuvent être utilisés et que la zone sale est passée dans le cas de</code> « paint »` pour être plus efficace. Le rendu peut être arrêté, poursuivi et la cadence peut être définie. La cadence d’images spécifiée est une valeur de limite supérieure, quand il n’y a rien qui se passe sur une page Web, aucuns cadres ne sont générés. La fréquence maximale est de 60, car il n’y a aucun avantage, juste des pertes de performance supérieure à celle.</p>

<p><strong>Note:</strong> une fenêtre hors de l’écran est toujours créée comme un Window</a> de <a href="../api/frameless-window.md">Frameless.</p>

<h2>Deux modes de rendu</h2>

<h3>Accélérés par le GPU</h3>

<p>Accélérés par le GPU rendu signifie que le GPU est utilisé pour la composition. À cause de cela l’armature doit être copié à partir du GPU qui exige plus de performance, ce mode est donc tout à fait un peu plus lent que l’autre. L’avantage de ce mode que WebGL et animations CSS 3D sont prises en charge.</p>

<h3>Périphérique de sortie de logiciels</h3>

<p>Ce mode utilise un périphérique de sortie du logiciel de rendu dans le processeur, donc la génération de l’image est beaucoup plus rapide, donc ce mode est préférable à la GPU accéléré un.</p>

<p>Pour activer ce mode, l’accélération GPU doit être désactivé en appelant le<a href="../api/app.md#appdisablehardwareacceleration"><code>app.disableHardwareAcceleration ()`</a> API.

## Son utilisation

```javascript
const {app, BrowserWindow} = require('electron') app.disableHardwareAcceleration() laisser gagner app.once ("prêt", () => {gagner = new BrowserWindow ({webPreferences : {
      offscreen: true
    }}) win.loadURL ('http://github.com') win.webContents.on (« peinture », (image sale, événement,) = > {/ / updateBitmap (sale, image.getBitmap())}) win.webContents.setFrameRate(30)})
```