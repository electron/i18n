# Electron FAQ

## Proč mám potíže s instalací Electronu?

Při spuštění `npm instaluje elektroron`, někteří uživatelé občas zaznamenají chyby instalace.

Téměř ve všech případech jsou tyto chyby výsledkem síťových problémů a ne skutečných problémů s balíčkem `elektronron` npm. Chyby jako `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`a `ETIMEDOUT` jsou náznakem takových problémů sítě . Nejlepším rozlišením je vyzkoušet přepínání sítí, nebo počkejte trochu a zkuste nainstalovat znovu.

Můžete se také pokusit stáhnout Electron přímo z [electron/electron/releasases](https://github.com/electron/electron/releases) při instalaci přes `npm` selhává.

## Kdy bude Electron upgradovat na nejnovější Chrome?

Verze Chrome Electronu je obvykle vyčerpána během jednoho nebo dvou týdnů po a nová stabilní verze Chrome bude zveřejněna. Tento odhad není zaručen a závisí na objemu práce spojené s modernizací.

Používá se pouze stabilní kanál Chrome. Pokud je důležitá oprava v kanálu beta nebo dev , budeme ji zpětně portovat.

Více informací naleznete v [bezpečnostním úvodu](tutorial/security.md).

## Kdy bude Electron upgradovat na nejnovější Node.js?

Když bude vydána nová verze Node.js, obvykle počkáme asi měsíc před aktualizací této verze v Electronu. Takže se můžeme vyhnout tomu, abychom se dopouštěli chyb zavedených do nových verzí Node.js, což se děje velmi často.

Nové funkce Node. s je obvykle přinášen aktualizací V8, protože Electron je pomocí V8 dodávaného prohlížečem Chrome, lesklá nová funkce JavaScriptu nového uzlu. s verze je obvykle již v Electronu.

## Jak sdílet data na webových stránkách?

Pro sdílení dat mezi webovými stránkami (procesy pro renderování) je nejjednodušším způsobem použít HTML5 API, která jsou již k dispozici v prohlížečích. Dobrými kandidáty jsou [úložiště API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)a [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Alternativně můžete použít primární IPC, které poskytuje Electron. pro sdílení údajů mezi hlavními procesy a procesy vykreslování, můžete použít moduly [`ipcMain`](api/ipc-main.md) a [`ipcRenderer`](api/ipc-renderer.md). Chcete-li komunikovat přímo mezi webovými stránkami, můžete od sebe poslat [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) , případně prostřednictvím hlavního procesu pomocí [`ipcRenderer. ostMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Následná komunikace přes porty zpráv je přímá a neomezuje se prostřednictvím hlavního procesu.

## Můj panel aplikace zmizel po několika minutách.

K tomu dochází, když proměnná, která se používá k ukládání do lišty, získá sbírku odpadků.

Pokud narazíte na tento problém, následující články mohou být užitečné:

* [Správa paměti](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Proměnný rozsah](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Pokud chcete rychlou opravu, můžete vytvořit proměnné globálně změnou svého kódu:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then() => {
  const tray = nová Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

k tomu:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = nová Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Nemohu použít jQuery/RequireJS/Meteor/AngularJS v Electronu.

Kvůli uzlu. s integrace Electronu, existují další symboly vložené do DOM jako `modul`, `export`, `vyžaduje`. To způsobuje problémy pro některé knihovny, protože chtějí vložit symboly se stejnými jmény.

Chcete-li to vyřešit, můžete vypnout integraci uzlu v Electronu:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Ale pokud chcete zachovat schopnost používat uzel. s a Electron API, musíte přejmenovat symboly na stránce před zahrnutím jiných knihoven:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `vyžaduje ('electron').xxx` není definován.

Při používání vestavěného Electronu se může vyskytnout chyba jako je:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Nezjištěný TypeError: Nelze číst vlastnost 'setZoomLevel' nedefinovaná
```

Je velmi pravděpodobné, že používáte modul ve špatném procesu. Například `elektron.Aplikace` může být použita pouze v hlavním procesu, zatímco `elektron.webFrame` je k dispozici pouze v procesu vykreslování.

## Písmo vypadá rozmazaně, co je to a co mohu dělat?

Pokud je deaktivováno [podpixelové antaliasování](http://alienryderflex.com/sub_pixel/) , pak mohou fonty na LCD obrazovkách vypadat černě. Ukázka:

![ukázka vykreslování subpixelů](images/subpixel-rendering-screenshot.gif)

Podpixelové antaliasování vyžaduje neprůhledné pozadí vrstvy obsahující font glyfs. (Další informace viz [tento úkol](https://github.com/electron/electron/issues/6344#issuecomment-420371918)).

Pro dosažení tohoto cíle nastavte pozadí v konstruktoru pro [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

Efekt je viditelný pouze na (nějaké?) LCD obrazovce. I když nevidíte rozdíl, někteří z vašich uživatelů mohou. Je nejlepší vždy nastavit pozadí tímto způsobem, pokud nemáte důvody tak neučinit.

Všimněte si, že právě nastavení pozadí v CSS nemá požadovaný efekt.
