# Расширение DevTools

Electron поддерживает [Chrome DevTools][devtools-extension], которые использоваться для расширения возможностей разработчиков Chrome для отладки веб-платформ.

## Загрузка расширения DevTools с помощью инструментария

Самый простой способ загрузить расширение DevTools — использовать сторонние инструменты для автоматизации для вас. [-devtools-установщик][electron-devtools-installer] является популярным NPM, который делает именно это.

## Ручная загрузка расширения DevTools

Если вы не хотите использовать подход к инструменту, вы также можете сделать все необходимые операции вручную. Чтобы загрузить расширение в Electron, вам нужно загрузить его через Chrome, найти его путь файловой системы, а затем загрузить его в свой [Session][session] , позвонив в и`ses.loadExtension`API.

В качестве примера [инструментов для][react-devtools] React:

1. Установите расширение в Google Chrome.
1. Перейдите ` chrome: // extensions </ 0> и найдите его идентификатор расширения, который является хешем строка как <code> fmkadmapgofadopljbjfkapdkoienihi </ 0>.</p></li>
<li><p spaces-before="0">Узнайте местоположение файловой системы, используемой Chrome для хранения расширений:</p>

<ul>
<li>в Windows it is <code>%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;</li>
   * в Linux это может быть:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * в macOS это `~/Library/Application Support/Google/Chrome/Default/Extensions`.</ul></li>
1 Передайте местоположение расширения в [`ses.loadExtension`][load-extension] API. Для React Developer Tools `v4.9.0`, это выглядит как:

   ```javascript
    const { app, session } - требуют ('электрон')
    const путь - требуют ('путь')
    const os - требуют ('os')

    // на macOS
    const reactDevToolsPath - path.join (
      os.homedir),)
      '/Библиотека/Поддержка приложений/Google/Chrome/Default/Extensions/fmkadmapgodopljbjfkapkoienihi/4.9.0'0'
    )

    app.whenReady().,then (async () -> -
      ждут session.defaultSession.loadExtension (reactDevToolsPath)
    )
   ```
</ol>

**Замечания:**

* `loadExtension` возвращает обещание с [расширением][extension-structure], содержит метаданные о удлинии, которое было загружено. Это обещание должно (например, с выражением `await` ) перед загрузкой страницы. В противном расширение не будет гарантировано для загрузки.
* `loadExtension` не может быть вызвано до `ready` события модуля `app` , и не может быть вызвано в память (нестойкие) сессии.
* `loadExtension` должны быть вызваны на каждой загрузке вашего приложения, если вы хотите, расширение будет загружено.

### Удаление расширения DevTools

Вы можете передать идентификатор расширения в API [`ses.removeExtension`][remove-extension] чтобы удалить из сеанса. Загруженные расширения не сохраняются между запусками приложений.

## Поддержка расширения DevTools

Electron поддерживает только [набор `chrome.*` API][supported-extension-apis], расширения с использованием неподдерживаемых `chrome.*` API под капотом могут не работать.

Следующие расширения Devtools были протестированы для работы в Electron:

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

Во-первых, пожалуйста, убедитесь, что расширение по-прежнему поддерживается с последней версией Google Chrome. Мы не можем оказывать дополнительную поддержку неподдерживаемых расширений.

Если расширение работает на Chrome, но не на Electron, файл ошибка в [electron вопрос трекер][issue-tracker] и описать, какая часть расширения не работает, как ожидалось.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
