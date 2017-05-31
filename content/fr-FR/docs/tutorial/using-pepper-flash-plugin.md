# Utilisation du plugin Pepper Flash

Électron prend en charge le plugin Flash de poivre. Pour utiliser le plugin Flash de poivre en électronique, vous devez spécifier manuellement l’emplacement du plugin Flash de poivre et puis l’activer dans votre application.

## Préparer une copie du Plugin Flash

Sur macOS et Linux, on trouvera les détails du plugin Flash de poivre en accédant à ` chrome://plugins` dans le navigateur de Chrome. Son emplacement et sa version sont utiles pour le support de Flash de poivre de l’électron. Vous pouvez également le copier vers un autre emplacement.

## Ajoutez le commutateur électronique

Vous pouvez directement ajouter `--ppapi-flash-path` et `--ppapi-flash-version` à la ligne de commande électronique ou en utilisant la méthode `app.commandLine.appendSwitch` avant l’événement ready app. Aussi, activer option `plugins` de `BrowserWindow`.

Par exemple :

```javascript
const {app, BrowserWindow} = chemin const require('electron') = require('path') / / chemin flash précisez, en supposant que c’est placé dans le même répertoire avec main.js.
pluginName laissez commutateur (process.platform) {cas « win32 » : pluginName = « pepflashplayer.dll » pause case « darwin » : pluginName = « PepperFlashPlayer.plugin » pause case « linux » : pluginName = « libpepflashplayer.so » pause} app.commandLine.appendSwitch (« ppapi-flash-chemin », path.join (__dirname, pluginName)) / / facultatif : spécifier version flash, par exemple, v17.0.0.169 app.commandLine.appendSwitch ('ppapi-flash-version', '17.0.0.169') app.on ("prêt", () => {laisser gagner = new BrowserWindow ({largeur : 800, hauteur : 600, webPreferences : {
      plugins: true
    }}) win.loadURL ('file://${__dirname}/index.html') / / quelque chose})
```

Vous pouvez également essayer de charger le plugin Flash de poivre large système au lieu d’expédition les plugins vous-même, son chemin d’accès peut être reçu en appelant`app.getPath ('pepperFlashSystemPlugin')`.

## Activez le Plugin Flash dans une balise `<webview>`

Ajouter `plugins` attribut à la balise `<webview>`.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## Dépannage

Vous pouvez vérifier si le poivre Flash plugin a été chargé en inspectant les`navigator.plugins` dans la console de devtools (bien que vous ne peut pas savoir si le plugin est correcte).

L’architecture de plugin Flash poivre doit correspondre à l’une de l’électron. Sous Windows, une erreur courante est d’utiliser la version 32 bits de plugin Flash avec la version 64 bits d’électron.

Sous Windows, le chemin d’accès passé à `--ppapi-flash-path` doit utiliser `` comme délimiteur de chemin d’accès, à l’aide de chemins d’accès POSIX-style ne fonctionnera pas.

Pour certaines opérations, telles que le streaming média en utilisant le protocole RTMP, il est nécessaire d’accorder des autorisations aux fichiers `.swf` des joueurs plus larges. Une façon d’y parvenir, est d’utiliser le flash-[nw-trust](https://github.com/szwacz/nw-flash-trust).