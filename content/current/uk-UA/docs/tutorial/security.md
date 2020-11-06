# Безпека, індивідуальні можливості та ваша відповідальність

Як веб-розробники, зазвичай ми насолоджуємося потужною мережею безпеки браузера - ризики, пов'язані з кодом, який ми пишемо, відносно малий. Наші веб-сайти надаються обмежені повноваження в пісочниці, ми віримо, що наші користувачі насолоджуються браузером , збудованим великою командою інженерів, яка здатна швидко реагувати на нещодавно виявлені загрози безпеці.

Коли ми працюємо з Electron, важливо зрозуміти, що Electron не веб-браузер. Це дозволяє вам будувати застосунки, багаті в функціональності за допомогою знайомих веб-технологій, але ваш код має значно більшу потужність. JavaScript має доступ до файлової системи, показ користувача та багато іншого. Це дозволяє вам створити високоякісні нативні програми, але властива шкала ризиків безпеки з додатковими повноваженнями, наданими вашому коду.

З цим у думці, Пам'ятайте, що відображення довільного вмісту з ненадійних джерел створює серйозний ризик безпеки, який Electron не призначений для керування. Насправді, найбільш популярні програми Electron (Atom, Slack, Visual Studio Code, тощо) відобразити насамперед локальний вміст (або довірений, безпечний віддалений вміст без інтеграції вузла ) - якщо ваш додаток виконує код з онлайн джерела, відповідальність гарантувати, що код не є зловмисним.

## Повідомити про Проблему Безпеки

Для отримання відомостей про те, як правильно роз'єднати вразливість Electron, див. [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Проблеми з Безпекою Chromium та Вдосконалення

Electron продовжує оновлюватись з черговими релізами Chromium. Для отримання додаткової інформації див. [журнал Electron Release Cadence Post](https://electronjs.org/blog/12-week-cadence).

## Безпека - це відповідальність кожного

Важливо пам"ятати, що безпека вашого додатку на Electron є результатом загальної безпеки фреймворку (*Chromium*, *Вузл. s*), саме Electron - усі NPM залежності та ваш код. As such, it is your responsibility to follow a few important best practices:

* **Підтримуйте ваш додаток в актуальному стані з останнім випуском фреймворку Electron.** При випущенні Вашого продукту, ви також відправляєте пакет, який складається з Electron, Chromium спільної бібліотеки та Node.js. Вразливості, що впливають на ці компоненти можуть вплинути на безпеку вашої програми. При оновленні Electron до останньої версії , ви гарантуєте, що критичні вразливості (такі як *ypation nodeIntegration basses*) вже пропатчено і його неможливо використати в вашому додатку. Для отримання додаткової інформації див.[Використайте поточну версію Electron](#17-use-a-current-version-of-electron)".

* **Оцініть ваші залежності.** Хоча NPM надає півмільйона знову придатних пакунків, це ваша відповідальність за вибір надійних сторонніх бібліотек. Якщо ви використовуєте застарілі бібліотеки, які постраждали від відомих вразливостей або створені на застарілому коді, вашу програму може ризикувати.

* **Застосовуйте заходи щодо захисту вашої програми** . Перший рядок захисту для - це ваш власний код. Загальні веб-вразливості, такі як Cross-Site Scripting (XSS), Який більший вплив безпеки на Electron застосунків, отже наполегливо рекомендується прийняти безпечний розвиток програмного забезпечення та виконати тестування з безпекою.

## Ізоляція для недовіреного вмісту

Проблема безпеки існує тоді, коли ви отримуєте код з ненадійного джерела (наприклад, віддалений сервер) і виконуєте його локально. Як приклад, розглянемо віддалений веб-сайт, який буде відображатися всередині стандартного [`BrowserWindow`](../api/browser-window.md). Якщо атакуючий якимось чином вдається змінити казаний вміст (або нападаючи на джерело безпосередньо, або сидячи між вашим додатком і точним призначенням), вони зможуть виконувати вихідний код на машині користувача.

> :warning: не може бути вам потрібно завантажити та виконати віддалений код з увімкненою інтеграцією Node.js. Натомість використовуйте лише локальні файли (упаковані разом з вашим додатком) для запуску коду Node.js. Щоб відображати віддалений вміст, використовувати тег [`<webview>`](../api/webview-tag.md) або [`BrowserView`](../api/browser-view.md), переконайтеся, що для відключення `підключення вузлів` та увімкнення `контекстної ізоляції`.

## Попередження про Безпеку Electron

З Electron 2.0 зараз розробники бачитимуть попередження та рекомендації, які надруковані для консолі розробників. Вони відображаються, лише коли ім'я бінарного використовується Electron, , в якому вказує на те, що розробник зараз дивиться на консоль.

Ви можете примусово ввімкнути або примусово вимкнути ці попередження, встановивши `ОКЛАВІТРН_ENABLE_SECURITY_WARNINGS` або `ОСТРЕН_DISABLE_SECURITY_WARNINGY` на або `процес. nv` або вікно `` об'єкт.

## Контрольний список: Рекомендації Безпеки

Вам необхідно хоча б виконати наступні кроки для поліпшення безпеки вашого застосунку:

1. [Завантажити безпечний вміст](#1-only-load-secure-content)
2. [Вимкнути інтеграцію Node.js у всіх рендерах, що відображають віддалений вміст](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Увімкнути ізоляцію контексту у всіх рендерах, що відображають віддалений вміст](#3-enable-context-isolation-for-remote-content)
4. [Використовувати `ses.setPermissionRequestHandler()` у всіх сеансах, які завантажують віддалений вміст](#4-handle-session-permission-requests-from-remote-content)
5. [Не вимикати `веб-безпека`](#5-do-not-disable-websecurity)
6. [Визначити `безпеку вмісту`](#6-define-a-content-security-policy) та використовувати обмежувальні правила (наприклад `script-src 'self'`)
7. [Не встановлювати `allowRunningInsecureContent` на `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Не вмикати експериментальні функції](#8-do-not-enable-experimental-features)
9. [Не використовувати `дозволити BlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Не використовувати `спливаючі вікна`](#10-do-not-use-allowpopups)
11. [`<webview>`: Перевірити параметри і параметри](#11-verify-webview-options-before-creation)
12. [Вимкнути або обмежити навігацію](#12-disable-or-limit-navigation)
13. [Вимкнути або обмежити створення нових вікон](#13-disable-or-limit-creation-of-new-windows)
14. [Не використовувати `openExternal` з ненадійним вмістом](#14-do-not-use-openexternal-with-untrusted-content)
15. [Вимкнути `віддалений модуль`](#15-disable-the-remote-module)
16. [Фільтр `віддаленого` модуля](#16-filter-the-remote-module)
17. [Використовуйте поточну версію Electron](#17-use-a-current-version-of-electron)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). Для додаткові деталі про потенційні недоліки та помилки реалізації під час розробки програм з використанням Electron, будь ласка, перегляньте цей [посібник для розробників і аудиторів](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Завантажити безпечний вміст

Будь-які ресурси, не включені до вашої програми, повинні бути завантажені на безпечний протокол `HTTPS`. Іншими словами, не використовуйте незахищені протоколи як `HTTP`. Аналогічним чином ми рекомендуємо використовувати `WSS` над `WS`, `FTPS` над `FTP`і так далі.

### Чому?

`HTTPS` має три основні переваги:

1) Автентифікує віддалений сервер, забезпечуючи ваш додаток підключенням до правильного хосту замість оператора. 2) Це гарантує цілісність даних, стверджуючи, що дані не були змінені в транзиті між вашою програмою і хостом. 3) Він шифрує трафік між вашим користувачем і цільовим хостом, це ускладнює пошук інформації, що відправлена між вашим додатком і хостом.

### Як?

```js
// Помилково
browserWindow.loadURL('http://example.com')

// Хороше
browserWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Не увімкніть інтеграцію з Node.js для віддаленого вмісту

_Ця рекомендація є поведінкою за замовчуванням для Electron з 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

Після цього ви зможете надати додаткові дозволи для конкретних хостів. Наприклад, якщо Ви відкриваєте веб-вікно, вказане в поле `https://приклад. om/`, ви можете дати цей сайт саме ті можливості, які йому потрібні, але не більше.

### Чому?

Атака крос-site-scripting (XSS) більш небезпечна, якщо зловмисник може перейти з процесу рендерингу та виконати код на комп"ютері користувача. Напади з міжсайтовими скриптами досить поширені - і поки проблема не зникне, їх влада зазвичай обмежується возз'єднанням із веб-сайтом, який вони виконують. Вимкнення інтеграції Node.js допомагає запобігти розширюванню XSS в так звану атаку "Виконання віддаленого коду" (RCE)

### Як?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Добре
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- Неправильне --><webview nodeIntegration src="page.html"></webview><!-- Добре --><webview src="page.html"></webview>
```

При відключенні інтеграції з Node.js, ви можете викрити наявність API на вашому веб-сайті, який споживають модулі і функції з Node.js. Передзавантаження скриптів продовжити доступ до до `вимагати` та іншого вузла. s функцій, що дозволяють розробникам показувати користувальницьке API для віддаленого завантаженого вмісту.

У наведеному нижче прикладі сценарію попереднього завантаження, пізніше завантажений сайт матиме доступ до до вікна `readConfig()` метод, але без функцій Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  повернув дані

```

## 3) Включити ізоляцію контексту для віддаленого вмісту

Політична ізоляція - це функція Electron, яка дозволяє розробникам запускати код в скриптах preloadts і в API Electron в спеціальному контексті JavaScript. У практиці це означає, що глобальні об'єкти, такі як `Array.prototype. ush` or `JSON.parse` не може бути змінений скриптами, які виконуються в процесі рендерингу.

Electron використовує таку ж технологію, що і [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) , щоб увімкнути цю поведінку.

Навіть коли ви використовуєте `nodeIntegration: false` для примусової ізоляції та запобігти використанню простих вузлів, `контекстну ізоляцію` також слід використовувати.

### Чому & Як?

Для отримання додаткової інформації про те, що `contextIsolation` є і як увімкнути це, будь ласка, подивіться наш присвячений [Документ](context-isolation.md) контекстної ізоляції.

## 4) Обробляти запити на сесію із віддаленого вмісту

Ви могли бачити запити дозволів при використанні Chrome: Вони спливають кожного разу, коли веб-сайт намагається використовувати функцію, яку користувач повинен вручну затвердити ( , як сповіщення).

API засновано на [API дозволів Chromium](https://developer.chrome.com/extensions/permissions) і реалізує ті ж типи дозволів.

### Чому?

За замовчуванням, Electron автоматично затвердить запити на всі дозволи, якщо розробник не налаштовував вручну індивідуальний обробник. У той час як при дефолті розробники з безпекою можуть взяти на себе зовсім протилежне.

### Як?

```js
const { session } = require('electron')

сесія
  .fromPartition('some-секція')
  . etPermissionRequestHandler(((webContents, дозвол, callback) => {
    const url = webContent. etURL()

    якщо (permission === 'notifications') {
      // Підтверджує запит дозволів
      callback(true)
    }

    // Перевірити URL
    якщо (! од. tartsWith('https://приклад. om/')) {
      // Забороняє запит дозволу
      return callback(false)
    }
})
```

## 5) Не відключати WebSecurity

_Рекомендація - Electron's за замовчуванням_

Можливо, ви вже здогадалися, що відключення властивості `webSecurity` в процесі рендерингу ([`BrowserWindow`](../api/browser-window.md) [`BrowserView`](../api/browser-view.md), або [`<webview>`](../api/webview-tag.md)) вимикає критичні функції безпеки.

Не вимикати `webSecurity` у виробничих програмах.

### Чому?

Вимкнення `webSecurity` вимкне політику того ж походження і поставить `allowRunningInsecureContent` властивість `true`. Іншими словами, це дозволяє виконання незахищеного коду з різних доменів.

### Як?

```js
// Помилковий
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Добрий
const mainWindow = new BrowserWindow()
```

```html<!-- Неправильне --><webview disablewebsecurity src="page.html"></webview><!-- Добре --><webview src="page.html"></webview>
```

## 6) Визначити політику захисту вмісту

Політика безпеки вмісту (CSP) є додатковим явищем захисту від крос-скриптів атак і атак введення даних. Рекомендуємо увімкнути будь-який веб-сайт, який ви завантажуєте всередині Electron.

### Чому?

CSP дозволяє серверу, який обслуговує вміст для обмеження і контролю ресурсів Electron може завантажувати для даної веб-сторінки. `https://example.com` необхідно дозволити завантажувати скрипти з визначених вами витоків під час скриптів `https://evil. ttacker.com` не слід дозволяти запускати. Визначити CSP це простий спосіб підвищити безпеку вашого застосунку.

Такий CSP дозволить Electron виконувати скрипти з поточного веб-сайту та з `apis.example.com`.

```plaintext
// Помилковий
Content-Security-Policy: '*'

// Хороший
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP заголовок

Electron поважає [`Content-Security-Policy` HTTP-заголовок](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) , який може бути встановлений за допомогою Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersReceived(деталь, зворотний виклик) => {
  зворотний виклик ({
    відповідь: {
      . .details.responseHeaders,
      'Content-Security-Policy': ['<unk> src \'none\'']

  })
})
```

### CSP Meta Tag

Рекомендований механізм доставки CSP — HTTP заголовок, Однак використання цього методу при завантаженні ресурсу використовуючи `протокол <code>file://`. Це може корисно в деяких випадках, таких як використання `протоколу ://` , щоб встановити політику на сторінці безпосередньо в розмітці, використовуючи тег `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Не встановлювати `allowRunningInsecureContent` на `true`

_Рекомендація - Electron's за замовчуванням_

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Встановлення властивості `allowRunningInsecureContent` на `true` вимикає цей захист.

Завантаження початкового HTML веб-сайту через `HTTPS` і спроба завантажити наступні ресурси через `HTTP` також відоме як "змішаний вміст".

### Чому?

Завантаження вмісту через `HTTPS` забезпечує достовірність і цілісність завантажених ресурсів під час шифрування самого потоку. Перегляньте розділ [для відображення тільки захищеного вмісту](#1-only-load-secure-content) для додаткової інформації.

### Як?

```js
// Помилковий
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Добрий
const mainWindow = new BrowserWindow({})
```

## 8) Не вмикати експериментальні можливості

_Рекомендація - Electron's за замовчуванням_

Розширені користувачі Electron можуть ввімкнути експериментальні функції Chromium за допомогою `експериментальних особливостей` властивостей.

### Чому?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Крім того, їх вплив на Electron в цілому , швидше за все, не було перевірено.

Існують юридичні випадки використання, але якщо ви не знаєте, що робите, то вам не слід вмикати цю властивість.

### Як?

```js
// Помилковий
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Добрий
const mainWindow = new BrowserWindow({})
```

## 9) Не використовувати `enableBlinkFeatures`

_Рекомендація - Electron's за замовчуванням_

Blink є назвою системи візуалізації за Chromium. Як і `експериментальні функції`, властивість `enableBlinkFeatures` дозволяє розробникам увімкнути функції, які були відключені за замовчуванням.

### Чому?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Умовні заходи щодо використання для використання певних функцій існують. Як розробник, ви повинні знати чому вам необхідно увімкнути функцію, наслідування , і те, як воно впливає на безпеку вашого додатку. За жодних обставин ви не повинні ввімкнути особливості спекулятивно.

### Як?

```js
// Помилковий
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Добрий
const mainWindow = new BrowserWindow()
```

## 10) Не використовувати `спливаючі вікна`

_Рекомендація - Electron's за замовчуванням_

Якщо ви використовуєте [`<webview>`](../api/webview-tag.md), може знадобитися вам завантаження сторінок і скриптів у вашому `<webview>` щоб відкрити нові вікна. `allowpopups` атрибут дозволяє їм створювати нові [`BrowserWindows`](../api/browser-window.md) використовуючи `window.open()` метод. `<webview>` тегів в іншому випадку не дозволяється створювати нові вікна.

### Чому?

Якщо Ви не потребуєте вирив, то Вам краще не дозволяти створювати нове [`BrowserWindows`](../api/browser-window.md) за замовчуванням. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Як?

```html<!-- Неправильне --><webview allowpopups src="page.html"></webview><!-- Добре --><webview src="page.html"></webview>
```

## 11) Перевірити параметри WebView перед створенням

Створений WebView в процесі рендерингу, що не має ввімкнутої інтеграції з Node.js , його неможливо включити інтеграцію. Однак WebView завжди створюватиме незалежний процес рендер зі своїми `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### Чому?

З `<webview>` жити в DOM , вони можуть бути створені скриптом, що працює на вашому веб-сайті, навіть якщо Нод. інтеграція s в іншому випадку вимкнуто.

Electron дозволяє розробникам вимкнути різні функції безпеки, які контролюють процес рендеру. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### Як?

До прив’язки позначки [`<webview>`](../api/webview-tag.md) Electron запустить `ніяких вкладень webview` події на хостингу ``. Використовуйте подію, щоб не допустити створення `webViews` можливою незахищеними опціями.

```js
app.on('web-contents-created', (event, contents) => {
  вмісту. n('will-attach-webview', (event, веб-Налаштування, params) => {
    // Закрити скрипти передзавантаження якщо невикористане або перевірити їх розташування законний
    видалити webPreferences. перезавантажити
    видалити веб-налаштування. reloadURL

    // Вимкнути інтеграцію Node.js
    веб-Налаштування. odeIntegration = false

    // Перевір URL, який завантажується
    , якщо (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Знову ж таки, цей список просто мінімізує ризик, він не видаляє його. Якщо Ваша мета буде відображати сайт, браузер буде більш безпечним варіантом.

## 12) Вимкнути або обмежити навігацію

Якщо ваш додаток не має потреби орієнтуватися або тільки для навігації на відомі сторінки, гранична ідея обмежити навігацію прямою до того відомого масштабу, відхиливши будь-які інші види навігації.

### Чому?

Навігація — це загальний вектор атаки. Якщо зловмисник зможе переконати вашу програму відійти від поточної сторінки, можливо вони можуть примусити ваш додаток відкрити веб-сайти в Інтернеті. Навіть якщо ваш `webContents` налаштований на більш безпечний (наприклад `nodeIntegration` вимкнено або `contextIsolation` увімкнено), у отриманні вашого додатку, щоб відкрити випадковий веб-сайт, що допоможе значно спростити використання додатку вашого додатку.

Звичний шаблон нападу полягає в тому, що зловмисник переконує користувачів програми взаємодіяти з додатком таким чином, щоб він переміщався на одну з сторінок зловмисника сторінок. Зазвичай це робиться за допомогою посилань, плагінів або інших створених користувачем контенту.

### Як?

Якщо ваш додаток не має потреби в навігації, ви можете викликати `event.preventDefault()` в [`буде переміщено`](../api/web-contents.md#event-will-navigate) обробника. Якщо ви знаєте, до яких сторінок може переміститися ваш додаток перевірте URL-адресу в обробнику подій і дозвольте навігацію відбутися, якщо вона відповідає URL-адресі, яку ви очікуєте.

Ми рекомендуємо використовувати аналізатор вузла для посилань. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) =>
  вмісту. n('will-navigate', (event, navigationUrl) =>
    const parsedUrl = new URL(navigationUrl)

    якщо (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Вимкнути чи обмежити створення нових вікон

Якщо ви вже знаєте, що вікна відомі — це гарна ідея, щоб обмежити створення додаткових вікон у вашому додатку.

### Чому?

Так само як навігація, створення нового `webContents` є загальною атакою вектор. Атакуючі намагаються переконати ваш застосунок у створенні нових вікон, кадрів та інших процесів рендерингу з більшими привілеями, ніж вони мали раніше; або з сторінками відкрилися, що раніше вони не могли відкривати.

Якщо у вас немає необхідності створювати вікна на додаток до тих, які ви знаєте, ви бажаєте створити, відключення створення купує вам трохи додатково безпеку без витрат. Це зазвичай стосується програм, які відкривають один `BrowserWindow` і не потрібно відкривати довільну кількість додаткових вікон під час роботи.

### Як?

[`webContents`](../api/web-contents.md) викине [`new-Window`](../api/web-contents.md#event-new-window) подія перед створенням нових вікон. Ця подія буде продана, серед інших параметрів, посилання `на` було запропоновано відкрити вікно і параметри, використані для створення його. Рекомендуємо використовувати подію для ретельного створення вікон, обмежуючи її лише тим, що вам потрібно.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  вмісту. n('new-window', async (event, navigationUrl) => {
    // В даному прикладі ми будемо запитувати операційну систему
    // щоб відкрити URL-адресу цієї події у браузері за замовчуванням.
    event.preventDefault()

    очікує shell.openExternal(navigationUrl)
  })
})
```

## 14) Не використовуйте `openзовнішній` з ненадійним контентом

Шел [`openЗовнішній`](../api/shell.md#shellopenexternalurl-options) дозволяє відкрити даний протокол URI на нативних утилітах комп'ютера. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### Чому?

Неправильне використання [`openExternal`](../api/shell.md#shellopenexternalurl-options) може бути запозичене для компромісу власнику користувача. Якщо openExternal використовується з недовіреним вмістом, то для виконання довільних команд можна використовувати .

### Як?

```js
// Помилковий
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Хороший
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Вимкнути `віддалений` модуль

Модуль `дистанційний` надає спосіб рендеру до доступу лише до API. Використовуючи його, рендер може викликати методи головного процесного об'єкта, не явно надсилаючи міжпроцесні повідомлення. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

Проте, якщо ваш застосунок може працювати з ненадійним змістом і навіть якщо ви [пісочниця](../api/sandbox-option.md) ваші процеси відповідно до ваших рендерингу, модуль `віддаленого` дозволяє уникнути шкідливого коду пісочниці та отримати доступ до системних ресурсів через вищі привілеї головного процесу. Тому його слід вимкнути при таких умовах.

### Чому?

`віддалений` використовує внутрішній канал IPC для спілкування з основним процесом. "забруднення прототипу" атаки можуть надати шкідливий доступ до внутрішнього каналу IPC, який потім може бути використаний для виходу з пісочниці шляхом встановлення `віддаленого` IPC повідомлення та отримання доступу до основних модулів, що працюють з більшими привілеями.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Вимкнення `віддаленого` модуля усуває ці атакуючі вектори. Увімкнення контекстної ізоляції також запобігає атакам "забруднення прототипу" від успіху.

### Як?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

```js
// Добрий
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview enableremotemodule="true" src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

> **Note:** The default value of `enableRemoteModule` is `false` starting from Electron 10. For prior versions, you need to explicitly disable the `remote` module by the means above.

## 16) Фільтр `віддаленого` модуля

Якщо ви не можете відключити модуль `пульт` , ви повинні відфільтрувати глобали, Нод, та модулі Electron (так звані вбудовані) доступні через `віддалений` , який ваш додаток не потрібен. Це може бути зроблено шляхом блокування певних модулів повністю та заміни інших на проксі, котрі піддають лише функціонал, які потребують ваш додаток.

### Чому?

Через права доступу до системи головного процесу, Функція , надана основними модулями процесу може бути небезпечною в руках зловмисного коду, що запускається в скомпрометованому процесі рендеру. Обмежуючи набір доступних модулів до мінімального, необхідний додаток та фільтрацію інших модулів, ви зменшили набір інструментів, які шкідливий код , можуть використовувати для нападу на систему.

Зверніть увагу, що найбезпечніший варіант - [повністю вимкнути віддалений модуль](#15-disable-the-remote-module). Якщо ви виберете доступ до фільтрації замість повного вимкнення модуля, ви повинні бути дуже обережними, щоб не підвищити привілеї можливо через модулі, які ви продали повз фільтр.

### Як?

```js
const readOnlyFsProxy = обов'язковий(/* ... */) // викриває тільки функціональність читання файлів

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

. n('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules. et(moduleName)
  }
  , якщо (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

додаток. n('remote-get-builtin', (event, webContents, moduleName) => {
  , if (!allowedElectronModules.has(moduleName)) {
    event. reventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowGlobals. as(globalName)) {
    event.preventDefault()
  }
})

додатку. n('remote-get-current-window', (event, webContents) => {
  подія. reventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Використовувати поточну версію Electron

Ви повинні прагнути завжди використовувати останню доступну версію Electron. Щоразу, коли випускається нова основна версія, ви повинні намагатися оновити додаток якомога швидше.

### Чому?

Програма, побудована з старішою версією Electron, Chromium та Node. s є простішою ціллю ніж програма, яка використовує більше останніх версій цих компонентів. Загалом кажучи, проблеми безпеки та використання для більш старих версій Chromium і Node.js є більш широко доступними.

Як Chromium, так і Node.js - це вражаючі художники конструювання, побудовані тисячами талановитих розробників. Беручи до уваги їх популярність, їхня безпека ретельно перевіряється і проаналізується не менш кваліфікованими дослідниками безпеки. Багато з тих дослідників [відповідально розкривають вразливості](https://en.wikipedia.org/wiki/Responsible_disclosure), це означає, що дослідники отримають Chromium і Node. проводить деякий час щоб виправити проблеми перед їх публікацією. Ваш додаток буде більш безпечним, якщо працює недавня версія Electron (і таким чином, Chromium and Node. ) для , які потенційні проблеми безпеки не так широко відомі.
