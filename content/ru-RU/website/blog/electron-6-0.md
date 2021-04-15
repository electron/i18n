---
title: Electron 6.0.0
author:
  - вежливость
  - ckerr
  - codebytere
date: '2019-07-30'
---

Команда Electron рада сообщить о выпуске новой версии Electron 6.0.0! Вы можете установить его с помощью npm `npm install electron@latest` или загрузить его с нашего сайта [релизов](https://electronjs.org/releases/stable). Релиз упакован с обновлениями, исправлениями и новыми возможностями. Мы не можем ждать, чтобы увидеть, что вы строили с ними! Продолжайте читать подробности об этом релизе, пожалуйста, поделитесь любым отзывом!

---

## Что нового

Сегодня мы впервые отмечаем проект Electron: впервые мы сделали стабильную версию Electron **в тот же день** соответствующим [стабильным релизом Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Большая часть функциональности Electron обеспечивается основными компонентами Chromium, Node.js и V8. Electron поддерживает эти проекты, чтобы предоставить нашим пользователям новые возможности, улучшения производительности и исправления безопасности. Каждый из этих пакетов имеет основную версию в Electron 6:

- Хромий `76.0.3809.88`
  - [Новое в 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Новое в 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Новое в 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Запись в блоге узла 12.4.0](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [V8 7.6 пост в блоге](https://v8.dev/blog/v8-release-76)

В этот выпуск также включены улучшения в API Electron. [Примечание к выпуску](https://github.com/electron/electron/releases/tag/v6.0.0) содержит более полный список, но вот основные моменты:

### Promisification / Промисификация

Electron 6.0 продолжит модернизацию [](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) в 5.0 для улучшения поддержки [Обещайте](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Теперь эти функции возвращают Promises и все еще поддерживают вызовы на основе обратного вызова:
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

Теперь эти функции имеют две формы: синхронный и асинхронный:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`диалог.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Теперь эти функции возвращают Promises:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` и `Electron Helper (Plugin).app`

Для того чтобы включить [закалённое время](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), которая ограничивает такие вещи, как записью-исполняемая память и загружает код, подписанный другой командой ID, специальный код, подписывающий права должны быть предоставлены Helper.

сохранить эти права в рамках тех типов процесса, которые их требуют, Chromium [добавил](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) новых вариантов приложения Helper: один для renderers (`Electron Helper (Renderer). pp`), один для процесса GPU (`Electron Helper (GPU). pp`) и один для плагинов (`Electron Helper (Plugin).app`).

Находясь с помощью `electron-osx-sign` для совместного проектирования приложения Electron не нужно вносить никаких изменений в свою логику сборки. If you're codesigning your app with custom scripts, you should ensure that the three new Helper applications are correctly codesigned.

Для корректной упаковки вашего приложения с этими новыми помощниками вам необходимо использовать `electron-packager@14.0.4` или выше.  Если вы используете `электродвигатель` , то следуйте за [этой проблемой](https://github.com/electron-userland/electron-builder/issues/4104) для отслеживания поддержки этих новых помощников.

## Критические изменения

 * В этом релизе начинается раскладка фундамента для будущих требований, которые встроенные модули узла в процесс рендерера должны быть либо [N-API](https://nodejs.org/api/n-api.html) либо [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Причинами этих изменений являются ускоренная производительность, более надежная безопасность и снижение нагрузки на обслуживание. Читайте полную информацию, включая предлагаемые сроки [этой задачи](https://github.com/electron/electron/issues/18397). Ожидается, что это изменение будет завершено в Electron v11.

 * `net.IncomingMessage` заголовки [немного изменили](https://github.com/electron/electron/pull/17517#issue-263752903) на более подходящий узел. [узел. поведение s](https://nodejs.org/api/http.html#http_message_headers), особенно со значением `set-cookie` и как обрабатываются дубликаты заголовков. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` теперь возвращает недействительный и асинхронный вызов. [#17121](https://github.com/electron/electron/pull/17121)

 * Теперь приложения должны явно установить путь к журналу, вызвав новую функцию `app.setAppLogPath()` перед использованием `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Конец поддержки 3.x.y

За нашу [политику поддержки](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y достигла конца жизни. Разработчикам и приложениям рекомендуется обновиться до новой версии Electron.

## Программа отзывов

Мы продолжаем использовать нашу [программу обратной связи с приложением](https://electronjs.org/blog/app-feedback-program) для тестирования. Проекты, участвующие в этой программе, тестируют бета-версии Electron на своих приложениях; и в свою очередь, новые ошибки, которые они обнаруживают, имеют приоритетное значение для стабильного выпуска. Если вы хотите принять участие или узнать больше, [смотрите наш пост о программе](https://electronjs.org/blog/app-feedback-program).

## Что дальше

В краткосрочном плане вы можете ожидать, что команда продолжит фокусироваться на поддержании разработки основных компонентов, составляющих Electron, включая Chromium, Node и V8. Хотя мы осторожны не давать обещания о датах выпуска, наш план выпускает новые версии Electron с новыми версиями этих компонентов примерно ежеквартально. [предварительное расписание 7.0.0](https://electronjs.org/docs/tutorial/electron-timelines) отображает ключевые даты жизненного цикла Electron 7. Также, [смотрите наш документ по версии](https://electronjs.org/docs/tutorial/electron-versioning) для получения более подробной информации о версиях в Electron.

Информацию о запланированных изменениях в предстоящих версиях Electron, [см. в разделе «Планируемые изменения »](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
