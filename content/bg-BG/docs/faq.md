# Често задавани въпроси за Електрон

## Защо наблюдавам проблеми при инсталацията на Electron?

Получихме информация, че при опит за инсталация с помощта на командата `npm install electron`, често се наблюдават серия от грешки в конзолата.

В голяма част от случаите, тези грешки са резултат от проблеми в мрежовата инфраструктура на потребителите и нямат отношение към кода на `electron` пакетите. Ако наблюдавате грешки съдържащи кодовете : `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` както и `ETIMEDOUT` са индикатор за мрежови проблеми. Най-добрият подход за решаването на тези трудности е свързан със смяната на мрежата, чрез която дистрибутирате пакетите или да изчакате неопределен период от време и да повторите опита си за инсталация.

Можете също така да опитате да изтеглите Електрон директно от [electron/electron/releases](https://github.com/electron/electron/releases) в случай че инсталацията с `npm` се провали.

## Кога да очакваме актуализация на продукта към последна версия на Chrome?

Обикновено можете да очаквате актуализация в рамките на до две седмици след официалното пускане на стабилна версия на Chrome. Имайте предвид, че в зависимост от количеството работа свързано с актуализацията на версията, са възможни забавяния.

Само стабилната линия на Chrome е използвана. Ако важна поправка е в линиите beta или dev, ние ще го свържем.

За повече информация моля вижте [въвеждане в сигурността](tutorial/security.md).

## Кога да очакваме актуализация на продукта към последна версия на Node.js?

Когато нова версия на Node.js бъде пусната, ние обикновено изчакваме около месец преди да я използваме в Електрон. Така че можем да избегнем бъгове, въведени в новите версии на Node.js, което се случва много често.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## Какъв е механизъма за предаване на данни между отделните страници на приложението?

To share data between web pages (the renderer processes) the simplest way is to use HTML5 APIs which are already available in browsers. Good candidates are [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Каква е причината да не мога да ползвам библиотеки като jQuery/RequereJS/Meteor/AngularJS?

За правилната работа на Electron е необходима интеграция с платформата Node.js, която добавя специфични ключови думи към DOM дървото. Някой от тези ключови думи са `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.