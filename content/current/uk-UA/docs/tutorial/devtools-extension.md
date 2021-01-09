# Розширення DevTools

Electron підтримує [розширення Chrome DevTools](https://developer.chrome.com/extensions/devtools), яке можна використовувати для розширення можливостей для налагодження популярних веб-фреймворків.

## Як завантажити Chrome DevTools

Цей документ окреслює процес завантаження розширення вручну. Ви також можете спробувати [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), сторонній інструмент, який завантажує розширення безпосередньо з веб-магазину Chrome.

Щоб завантажити розширення в Electron, потрібно завантажити його в браузері Chrome, знайти шлях до нього та завантажити його, викликавши API `BrowserWindow.addDevToolsExtension(розширення)`.

Використовуючи [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) як приклад:

1. Встановіть це в веб-переглядач Chrome.
1. Перейдіть до `chrome://extensions`, і знайдіть його ID розширень, який є хешем рядком, як `fmkadmapgofadopljbjfkapdkoienihi`.
1. Розташування файлової системи Chrome, що використовується для зберігання розширень:
   * на Windows це `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * для Linux може бути:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * на macOS це `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Передайте розташування розширення на `BrowserWindow.addDevToolsExtension` API, для інструментів розробника React - це щось на зразок:

   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

Розширення запам’ятається, щоб ви викликали це API один раз в розширення. Якщо ви намагаєтеся додати розширення, яке вже завантажено, цей метод не повернеться і замість цього журналу попередження до консолі.

### Як видалити розширення DevTools

Ви можете передати назву розширення в `BrowserWindow.removeDevToolsExtension` API, щоб видалити його. Ім'я розширення повернуте `BrowserWindow. ddDevToolsExtension` і ви можете отримати імена всіх встановлених Розширення DevTools з допомогою `BrowserWindow.getDevToolsExtensions` API.

## Розширення, що підтримуються розробниками

Electron підтримує тільки обмежений набір `chrome.*` API, а отже деякі розширення використовують непідтримувану `chrome.` API для розширення chrome може не працювати. Наступні інструменти розширень перевіряються і гарантують роботу в Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Інструменти розробника React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Налагоджувач Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery налагоджувач](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Керіброльний зневаджувач](https://cerebraljs.com/docs/introduction/devtools.html)
* [Розширення Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Інструменти розробника MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Що мені слід зробити, якщо розширення DevTools не працює?

Перш за все, переконайтеся, що розширення все ще технічно, деякі розширення не можуть навіть працювати в останніх версіях браузера Chrome, і ми не можемо зробити що-небудь.

Далі надішліть файл до списку проблем Electron, та опишіть яку частину розширення працює неправильно.
