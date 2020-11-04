---
title: Electron 6.0.0
author:
  - софіангі
  - ckerr
  - codebytere
date: '2019-07-30'
---

Команда Electron з радістю повідомляє про реліз Electron 6.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити з нашого [релізів веб-сайт](https://electronjs.org/releases/stable). Реліз упакований разом з оновленнями, виправленнями та новими функціями. Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

---

## Що нового

Сьогодні перший для проекту Electron. Це перший раз, коли ми зробили стабільний випуск Electron **в той же день** , що і відповідна [Chrome стабільна версія](https://www.chromestatus.com/features/schedule)! 🎉

Значна частина функціональності Electron надається основними компонентами Chromium, Node.js та V8. Electron оновлює ці проекти, щоб забезпечити наших користувачів новими функціями JavaScript, покращення продуктивності та виправлення безпеки. Кожен з цих пакетів має великий бак для Electron 6:

- Chromium `76.0.3809.88`
  - [Нью-74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Нова в 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Нова в 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Вузол 12.4.0 допис у блозі](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [Допис у блозі 7.6](https://v8.dev/blog/v8-release-76)

Цей реліз також включає покращення до API Electron. [Нотатки до випуску](https://github.com/electron/electron/releases/tag/v6.0.0) мають більш повний список, але ось виділені:

### Promisification

Розробка Electron 6.0 продовжує модернізацію [ініціатива](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) з 5.0 для покращення [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) підтримки.

Ці функції тепер повертають Проміси і досі підтримують старіше вторгнення на основі зворотного виклику:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Тепер ці функції мають дві форми, синхронний і перспективний асинхронний:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Ці функції тепер повертаються:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Довідка Electron (Renderer).app`, `Довідка Electron (GPU).app` та `Helper (Plugin).app`

Для того, щоб увімкнути [збільшений час виконання](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc)який обмежує такі речі, як контролює оперативну пам'ять і завантажує код, підписаний іншою командою ID, підписання спеціального коду необхідні для надання даних Helper.

Щоб зберегти ці права, видимі для процесних типів, що їх вимагають, Chromium [додав](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) три нові варіанти допоміжних додатків: один для рендерів (`Electron Helper (Рендерер). pp`), один для процесу GPU (`Electron Helper (GPU). pp`) і один для плагінів (`Helper (Plugin).app`).

Продовжується використання `electron-osx-sign` для розробки своєї програми Electron не повинно вносити жодних змін до своєї логіки. Якщо ви розробляєте ваш додаток за допомогою власних сценаріїв, ви повинні забезпечити , щоб три нові допоміжні програми були правильно розроблені.

Щоб правильно упакувати вашу заявку за допомогою цих нових помічників ви повинні використовувати `electron-packager@14.0.4` або вище.  Якщо ви використовуєте `electron-builder` вам слід слідувати [цій проблемі](https://github.com/electron-userland/electron-builder/issues/4104) щоб відстежувати підтримку цих нових помічників.

## Важливі Зміни

 * Цей реліз починається закладання groundwork для майбутнього, необхідно, щоб нативні модулі Node, завантажені в процес рендерингу, були або [N-API](https://nodejs.org/api/n-api.html) або [контекст Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Причини цієї зміни є швидшою продуктивністю, посилення безпеки та зменшення навантаження на обслуговування пристрою. Прочитайте повну інформацію про наявну шкалу часу в [цій задачі](https://github.com/electron/electron/issues/18397). Очікується, що ця зміна буде завершена в Electron v11.

 * `net.IncomingMessage` заголовки [трохи змінено](https://github.com/electron/electron/pull/17517#issue-263752903) на тісніше збіг [Node. стилі s behavior](https://nodejs.org/api/http.html#http_message_headers), особливо зі значенням `set-cookie` і як обробляються дублікати. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` now returns void and is an asynchronous call. [#17121](https://github.com/electron/electron/pull/17121)

 * Тепер застосунки мають явно встановити шлях до журналу, викликавши нову функцію `app.setAppLogPath()` до використання `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Кінець підтримки 3.x.y

За нашою [політикою підтримки](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y досяг кінця життя. Розробники та додатки заохочують оновитися до новішої версії Electron.

## Програма зворотнього зв’язку

Ми продовжуємо використовувати нашу [Програма зворотного зв’язку](https://electronjs.org/blog/app-feedback-program) для тестування. Проекти, які беруть участь у цій програмі перевіряють бета-версію Electron у своїх додатках; і взамін, нові помилки, які вони виявили, пріоритетні для стабільної релізи. Якщо ви хочете взяти участь або дізнатися більше, [дізнайтеся про наш блог повідомлення про програму](https://electronjs.org/blog/app-feedback-program).

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. Значення [орієнтовний графік 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) відображає ключові дати в життєвому циклі Electron 7. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
