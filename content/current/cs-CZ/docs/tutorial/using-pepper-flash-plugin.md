# Používání Pepper Flash Pluginu

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Příprava a kopírování Flash Pluginu

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://version` in the Chrome browser. Its location and version are useful for Electron's Pepper Flash support. Můžete ho také zkopírovat do jiného umístění.

## Přidání Přepínače Electron

Můžete také zkusit načíst systém, který obsahuje Pepper Flash plugin místo hledání pluginu samotného, jeho cesta může být zadána callingem: app.getPath`pepperFlashSystemPlugin<code>. Pluginy lze také přidat z příkazového Electronu příkazem <code>--ppapi-flash-path<0>a<0>--ppapi-flash-version<0> nebo příkazem <0>app.commandLine.appendSwitch<0>zadaným v okně prohlížeče před událostí připtavenou pro aplikaci. Přidat<code>pluginy<code>můžete také <0>z<0>okna prohlížeče<0>.</p>

<p spaces-before="0">Například:</p>

<pre><code class="javascript">const { app, BrowserWindow } = require('electron')
const path = require('path')

// Zadejte flash path, za předpokladu, že je umístěna ve stejném adresáři jako main.js.
et pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

//Chcete specifikovat flash verzi označenou jako v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')
`</pre>

Můžete také zkusit načíst systémový doplněk Pepper Flash namísto odeslání pluginu samotného, jeho cesta může být zadána voláním `app.getPath('pepperFlashSystemPlugin')`.

## Jak povolit flash plugin v <webview>Tag Přidejte atribut pluginu do <webview>tag. Webview src="https://www.adobe.com/software/flash/about/" pluginy></webview> Můžete zkontrolovat, zda Pepper Flash plugin byl načten kontrolou navigator.plugins v konzoli devtools (i když nemůžete vědět, jestli plugin cesta je správná). Architektura Pepper Flash plugin musí odpovídat Electronu. V systému Windows je běžnou chybou použití 32bit verze pluginu Flash proti 64bit verzi Electronu. V systému Windows cesta předaná --ppapi-flash-path musí používána '' jako oddělovač cesty, pomocí cest ve stylu POSIX nebude funkční. Pro některé operace, jako je například streamování médií pomocí RTMP, je nutné udělit širší oprávnění  souborům .swf hráčů. Jedním ze způsobů, jak toho dosáhnout, je použít nw-flash-trust.

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Odstranění problémů

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

Ve Windowsu k určení path`--ppapi-flash-path`musí být použit znak`\` jako oddělovač, ale jeho použití v POSIX-style nebude funkční.

Pro některé operace používané streamovacími médii RTMP je nezbytné přehrávačům udělit větší oprávnění v přístupu k souborům`.swf` files. Jednou z cest, jak toho lze dosáhnout je použít[nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
