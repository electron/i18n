# Расширение DevTools

Electron supports the [Chrome DevTools Extension][devtools-extension], which can be used to extend the ability of devtools for debugging popular web frameworks.

## Как загрузить расширение DevTools

В этом документе описывается процесс ручной загрузки расширения. Вы также можете попробовать [Электрон-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), сторонний инструмент, загружающий расширения прямо из Chrome WebStore.

Чтобы загрузить расширение в Electron, необходимо скачать его в браузере Chrome, найдите путь к файловой системе, а затем загрузите его, вызвав `BrowserWindow. ddDevToolsExtension(расширение)` API.

Using the [React Developer Tools][react-devtools] as example:

1. Установите его в браузере Chrome.
1. Перейдите ` chrome: // extensions </ 0> и найдите его идентификатор расширения, который является хешем строка как <code> fmkadmapgofadopljbjfkapdkoienihi </ 0>.</p></li>
<li><p spaces-before="0">Местоположение в файловой системе, используемое Chrome для хранения расширений:</p>

<ul>
<li>в Windows it is <code>%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;</li>
   * в Linux это может быть:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * в macOS это `~/Library/Application Support/Google/Chrome/Default/Extensions`.</ul></li>
1 Передайте расположение расширения `BrowserWindow.addDevToolsExtension` API, для React Developer Tools, это что-то вроде этого:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')

   ```
</ol>

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

Расширение будет запомнено, поэтому вам нужно вызвать этот API только один раз за расширение . Если вы пытаетесь добавить расширение, которое уже было загружено, этот метод не будет возвращен и вместо этого записывает предупреждение в консоль.

### Как удалить расширение DevTools

Вы можете передать имя расширения `BrowserWindow.removeDevToolsExtension` API для его удаления. Имя расширения возвращается `BrowserWindow. ddDevToolsExtension` и вы можете получить имена всех установленных расширений DevTools с помощью `BrowserWindow.getDevToolsExtensions` API.

## Поддерживаемые расширения DevTools

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Инструменты React разработчика](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Верхний отладчик](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Отладчик](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Церебральный отладчик](https://cerebraljs.com/docs/introduction/devtools.html)
* [Расширение Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Инструменты разработчика MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Что делать, если расширение DevTools не работает?

Прежде всего, убедитесь, что расширение все еще поддерживается, некоторые расширения могут не работать даже в последних версиях браузера Chrome, и мы ничего не можем с этим сделать.

Затем сообщите об ошибке в списке проблем Electron, и опишите, какая часть расширения не работает как ожидалось.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
