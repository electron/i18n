# често задавани въпроси за Electron

## Защо наблюдавам проблеми при инсталацията на Electron?

Получихме информация, че при опит за инсталация с помощта на командата `npm install electron`, често се наблюдават серия от грешки в конзолата.

В голяма част от случаите, тези грешки са резултат от проблеми в мрежовата инфраструктура на потребителите и нямат отношение към кода на `electron` пакетите. Ако наблюдавате грешки съдържащи кодовете : `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` както и `ETIMEDOUT` са индикатор за мрежови проблеми. 5256783105227699

Можете също така да опитате да изтеглите Електрон директно от [electron/electron/releases](https://github.com/electron/electron/releases) в случай че инсталацията с `npm` се провали.

## Кога да очакваме актуализация на продукта към последна версия на Chrome?

Обикновено можете да очаквате актуализация в рамките на до две седмици след официалното пускане на стабилна версия на Chrome. Имайте предвид, че в зависимост от количеството работа свързано с актуализацията на версията, са възможни забавяния.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

За повече информация моля вижте [въвеждане в сигурността](tutorial/security.md).

## Кога да очакваме актуализация на продукта към последна версия на Node.js?

Когато нова версия на Node.js бъде пусната, ние обикновено изчакваме около месец преди да я използваме в Електрон. Така че можем да избегнем бъгове, въведени в новите версии на Node.js, което се случва много често.

Нови функции от Node.js обикновено са принесени при обновяване на V8, тъй като Електрон използва V8, доставен от браузър Chrome, най-новите JavaScript функции от последната версия на Node.js обикновено са вече в Електрон.

## Какъв е механизъма за предаване на данни между отделните страници на приложението?

За споделяне на данни между уеб страници (рендериращи процеси) най-простият начин е да използвате HTML5 APIs, които вече са достъпни в браузъри. Добри кандидати са [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) и [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Или можете да използвате IPC система, която е специфична за Електрон, за съхраняване на обекти в основния процес като глобални променливи, а след това да имате достъп до тях от рендерирането чрез свойството `remote` на модул `electron`:

```javascript
// В процеса main.
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

Ако ви се случи такъв проблем, следващата статия може да ви бъде от помощ:

* [Управление на паметта](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Обхват на променливите](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Ако търсите бързо решение, може да направите променливите глобални, като промените своят код от това:

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

на това:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Каква е причината да не мога да ползвам библиотеки като jQuery/RequereJS/Meteor/AngularJS?

За правилната работа на Electron е необходима интеграция с платформата Node.js, която добавя специфични ключови думи към DOM дървото. Някой от тези ключови думи са `module`, `exports`, `require`. Това предизвиква проблеми за някои библиотеки тъй като те искат да вкарат ключови думи със същите имена.

За да решите този проблем, изключете интеграцията на node в Електрон:

```javascript
// В процеса main.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Но ако желаете да продължите да използвате Node.js и API на Електрон, то трябва да преименувате ключовите думи преди да добавите други библиотеки:

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

## Грешка от типа `require('electron').xxx` is undefined.

При използване на Електрон с вграден модул можете да срещнете грешка като този:

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

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. На пример, `electron.app` може да бъде използван само от главния процес, докато `electron.webFrame` е достъпен само от рендериращия процес.
