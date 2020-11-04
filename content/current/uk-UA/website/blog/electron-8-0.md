---
title: Electron 8.0.0
author:
  - jkleinsc
  - софіангі
date: '2020-02-04'
---

Electron 8.0.0 було випущено! Вона включає оновлення до Chromium `80`, V8 `8.0`і Node.js `12.13.0`. Ми додали вбудовану перевірку пошти Chrome, і багато іншого!

---

Команда Electron з радістю повідомляє про реліз Electron 8.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити з нашого [релізів веб-сайт](https://electronjs.org/releases/stable). Реліз упакований разом з оновленнями, виправленнями та новими функціями. Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

## Важливі зміни

### Зміни стека
* Chromium `80.3987.86`
    * [Нове в Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Нове в Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Допис у блозі 12.13.0](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [Допис у блозі V8 7.9](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 блог](https://v8.dev/blog/v8-release-80)

### Підсвітка функцій
* Реалізоване використання вбудованої функції перевірки орфографії. Дивіться подробиці [#20692](https://github.com/electron/electron/pull/20692) та [#21266](https://github.com/electron/electron/pull/21266).
* Спілкування IPC тепер використовує структурований Клон для IPC. Це швидше, більш функціональне і менш дивовижне ніж існуюча логіка, і спричиняє підвищення продуктивності 2x для великих буферів і складних об'єктів. Затримка для малих повідомлень не суттєво впливає. Детальніше в [#20214](https://github.com/electron/electron/pull/20214).

Дивіться примітки до випуску [8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) для повного списку нових функцій і змін.

## Важливі Зміни

* Показувати назву модуля в області попередження про контекстний модуль. [#21952](https://github.com/electron/electron/pull/21952)
    * Це продовження роботи для майбутньої необхідності, тому що вбудовані модулі вузлів, завантажені в процес рендеринга, будуть або [N-API](https://nodejs.org/api/n-api.html) або [контексті Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Повна інформація і запропонована лінія часу детальна в [це питання](https://github.com/electron/electron/issues/18397).
* Значення надіслані по IPC тепер серіалізовані зі структурованим Клонуванням Алгоритмом.  [#20214](https://github.com/electron/electron/pull/20214)
* Offscreen рендеринг в даний час вимкнений через відсутність супроводжуючого процесу для роботи над цією функцією.  Збій під час оновлення Chromium і згодом був відключений. [#20772](https://github.com/electron/electron/issues/20772)

Більше інформації про ці та майбутні зміни можна знайти на сторінці [Заплановані порушення](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Зміни API
* `додаток` змінити API:
    * Додано `app.getApplicationNameForProtocol(url)`. [#2039](https://github.com/electron/electron/pull/20399)
    * Додано `app.showAboutPanel()` і `app.setAboutPanelOptions(options)` підтримка на Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` Зміни API:
    * Оновлено документи до того, що опцій BrowserWindow `має тінь` доступно на всіх платформах [#20038](https://github.com/electron/electron/pull/20038)
    * Додано `параметр trafficLightPosition` для можливості браузера браузера для визначення місцезнаходження для кнопок світлофора. [#21781](https://github.com/electron/electron/pull/21781)
    * Додано `доступний заголовок` опція перегляду вікна браузера для встановлення доступного вікна [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` тепер може повернути null [#19983](https://github.com/electron/electron/pull/19983)
    * Додано `BrowserWindow.getMediaSourceId()` та `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Додано підтримку для `will-move` події на macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Документований раніше недокументований `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `діалог` зміни API:
    * Додано властивість `dontAddToRecent` у `dialog.showOpenDialog` і `діалоговому вікні. howOpenDialogSync` для запобігання додаванню документів до останніх документів на Windows у відкритих діалогових вікнах. [#19669](https://github.com/electron/electron/pull/19669)
    * Додано налаштування властивості до `dialog.showSaveDialog` і `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Сповіщення` змінити API:
    * Додано параметр `тайм-аут` щоб дозволити користувачам Linux/Windows встановити тайм-аут в сповіщенні. [#20153](https://github.com/electron/electron/pull/20153)
    * Додано `невідкладну опцію`  для встановлення терміновості в повідомленнях Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `сеанс` змін API:
    * Оновлено документацію `session.setProxy(config)` та `session.setCertificateVerifyProc(proc)` до опису опцій. [#19604](https://github.com/electron/electron/pull/19604)
    * Додано `session.downloadURL(url)` для дозволу запуску завантажень без BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Додано підтримку гінтів ресурсів HTTP preconnect через `session.preconnect(options)` та `прив’яжіть` подію. [#18671](http://github.com/electron/electron/pull/18671)
    * Додано `session.addWordToSpellCheckerDictionary` щоб дозволити користувацькі слова в словнику [#21297](http://github.com/electron/electron/pull/21297)
* Додано параметр `shell.moveItemToTrash(fullPath[, deleteOnFail])` в macOS вказати, що відбувається при невдачі moveItemToTrash . [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` зміни API:
    * Оновлено `systemPreferences.getColor(color)` документацію для macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Додано `екран` тип медіа на `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Додано `nativeTheme.themeSource` щоб дозволити програмам перевизначати вибір теми ОС. [#19960](https://github.com/electron/electron/pull/19960)
* Зміни API в TouchBar :
    * Додано `доступність Мітки` властивості на `TouchBarBarButton` і `TouchBarBarLabel` для покращення TouchBarButton/TouchBarLabel доступності. [#20454](https://github.com/electron/electron/pull/20454)
    * Оновлено документацію пов'язані з TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `Штриг` змін API:
    * Додано нові параметри до `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` та `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Додано tray.removeBalloon(), який видаляє вже відображений сповіщення про повітряну кульку. [#19547](https://github.com/electron/electron/pull/19547)
    * Додано tray.focus(), що спрямовує увагу на область сповіщень на панелі завдань. функція: додавання tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` змінити API:
    * Додано `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` щоб розкрити executeJavaScriptInIsolatedWorld на webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Додано методи для захоплення прихованих веб-контентів. [#21679](https://github.com/electron/electron/pull/21679)
    * Додано опції `webContents.print([options], [callback])` для активації налаштувань заголовків і футерів сторінки. [#19688](https://github.com/electron/electron/pull/19688)
    * Додано можливість перевірити певних спільних працівників через `webContents.getAllSharedWorkers()` та `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Додано підтримку опцій `fitToPageУвімкнути` та `scaleFactor` у варіантах WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Оновлено `webview.printToPDF` документацію для позначення типу повернення тепер Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Застарілий API
Тепер наступні API застарілі:
* Нефункціональний параметр `visibleOnFullScreen` в `BrowserWindow.setVisibleOnAllWorkspaces` до видалення в наступній основній версії випуску. [#21732](https://github.com/electron/electron/pull/21732)
* Припинено використовувати `альтернативний контрольний текст` на `systemPreferences.getColor(color)` для macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Не вдалося повернути `setLayoutZoomLevelLimits` на `webContents`, `webFrame`, та `<webview> Тег` тому що Chromium видалив цю можливість. [#21296](https://github.com/electron/electron/pull/21296)
* Значення за замовчуванням `false` для `app.allowRendererProcessReuse` є застарілим. [#21287](https://github.com/electron/electron/pull/21287)
* Не вдалося повернути `<webview>.getWebContents()` , так як це залежить від віддаленого модуля. [#20726](https://github.com/electron/electron/pull/20726)

## Кінець підтримки 5.x.y

Electron 5.x.y досяг завершення підтримки за політику [підтримки](https://electronjs.org/docs/tutorial/support#supported-versions). Розробники та додатки заохочують оновитися до новішої версії Electron.

## Програма зворотнього зв’язку

Ми продовжуємо використовувати нашу [Програма зворотного зв’язку](https://electronjs.org/blog/app-feedback-program) для тестування. Проекти, які беруть участь у цій програмі перевіряють бета-версію Electron у своїх додатках; і взамін, нові помилки, які вони виявили, пріоритетні для стабільної релізи. Якщо ви хочете взяти участь або дізнатися більше, [дізнайтеся про наш блог повідомлення про програму](https://electronjs.org/blog/app-feedback-program).

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. Плановий графік [на 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) відображає ключові дати в життєвому циклі Electron 9. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Застаріле `віддалений` модуль (починаючи з Electron 9)
Завдяки серйозним зобов'язанням щодо безпеки, ми починаємо створювати плани для застарілої [`віддаленого` модуля](https://www.electronjs.org/docs/api/remote) , починаючи з Electron 9. Ви можете прочитати й ознайомитися з [цією проблемою](https://github.com/electron/electron/issues/21408) , що детально оформила наші причини для цього, і включити запропоновану часову шкалу для розгортання.
