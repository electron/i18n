---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Команда Electron рада сообщить, что первый стабильный релиз Electron 3 теперь доступен из [электроники. rg](https://electronjs.org/) и через `npm установить electron@latest`! Это jam-packed с обновлениями, исправлениями и новыми функциями, и мы не можем ждать, чтобы увидеть, что вы строите с ними. Ниже приведены подробные сведения об этом релизе, и мы приветствуем ваш отзыв при изучении.

---

## Выпуск процесса

Когда мы начали разработку `v3.0.`, мы стремились более эмпирически определить критерии для стабильного выпуска, формализовав прогресс обратной связи для прогрессивных бета-версий. `v3.0.` был бы невозможен без [нашей программы обратной связи приложения](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) , партнеров кто проводил раннее тестирование и обратную связь в течение бета-цикла. Благодаря Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code, и другим участникам программы за их работу. Если вы хотите участвовать в будущих бета-версиях, напишите нам на [info@electronjs.org](mailto:info@electronjs.org).

## Изменения / Новые возможности

Основные переходы нескольких важных частей сети Electron, включая Chrome `v66.0.3359.181`, Node `v10.2.0`, и V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] feat: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] feat: `win.moveTop()` для перемещения окна z-order вверх
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: TextField и Button API
* [[#13068](https://github.com/electron/electron/pull/13068)] feat: netLog API для динамического управления журналом
* [[#13539](https://github.com/electron/electron/pull/13539)] активировать: включить `webview` в рендерере песочницы
* [[#14118](https://github.com/electron/electron/pull/14118)] функция: `fs.readSync` теперь работает с массивными файлами
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: узел `fs` оболочки чтобы сделать `fs.realpathSync.native` и `fs.realpath.native` доступно

## Делать изменения API

* [[#12362](https://github.com/electron/electron/pull/12362)] функция: обновления для управления пунктом меню
* [[#13050](https://github.com/electron/electron/pull/13050)] рефакторинг: удалены документированные устаревшие API
  * Смотрите [документацию](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) для получения более подробной информации
* [[#12477](https://github.com/electron/electron/pull/12477)] рефакторинг: удалены `did-get-response-details` и `события did-get-redirect-request`
* [[#12655](https://github.com/electron/electron/pull/12655)] Функция: по умолчанию отключение навигации при перетаскивании/падении
* [[#12993](https://github.com/electron/electron/pull/12993)] feat: Node `v4.x` или более требуется использовать электрон `` npm модуль
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] рефакторинг: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] функция: больше не используйте JSON для отправки результата `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: по умолчанию игнорировать аргументы командной строки после URL
* [[#12004](https://github.com/electron/electron/pull/12004)] рефакторинг: переименуйте `api::Window` в `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] Функция: визуальный масштаб теперь выключен по умолчанию
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: переименуйте app-command `media-play_pause` в `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] возможность: поддержка уведомлений
* [[#12496](https://github.com/electron/electron/pull/12496)] функция: `tray.setIgnoreDoubleClickEvents(игнорировать)` чтобы игнорировать события в трее двойного нажатия.
* [[#12281](https://github.com/electron/electron/pull/12281)] feat: мышь вперед функциональность macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] Автор: экран блокировки / разблокировка событий

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] функция: добавлено преобразование DIP в/из координат экрана

**Nota Bene:** Переключение на более старую версию Electron после запуска этой версии потребует от вас очистки каталога пользовательских данных, чтобы избежать сбоя старых версий. Вы можете получить каталог пользовательских данных, запустив `console.log(app.getPath("userData"))` или просмотрите [документацию](https://electronjs.org/docs/api/app#appgetpathname) для получения более подробной информации.

## Исправления ошибок

* [[#13397](https://github.com/electron/electron/pull/13397)] исправлен: проблема с `fs.statSyncNoException` броска исключений
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] исправлено: сбой при загрузке сайта с помощью jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] исправить: сбой в `сети:ClientSocketHandle` деструктор
* [[#14453](https://github.com/electron/electron/pull/14453)] исправление: уведомить об изменении фокуса сразу же, а не на следующем тике

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] Исправлена: проблема, позволяющая выбрать пакеты в `<input file="type">` открыть диалоговое окно открытия файла
* [[#12404](https://github.com/electron/electron/pull/12404)] Исправлено: проблема блокирования основного процесса при использовании асинхронного диалога
* [[#12043](https://github.com/electron/electron/pull/12043)] исправлено: обратное контекстное меню
* [[#12527](https://github.com/electron/electron/pull/12527)] исправлен: утечка событий при повторном использовании сенсорной панели
* [[#12352](https://github.com/electron/electron/pull/12352)] исправлено: ошибка заголовка в трее
* [[#12327](https://github.com/electron/electron/pull/12327)] исправлено: неперетаскиваемые регионы
* [[#12809](https://github.com/electron/electron/pull/12809)] исправлено: для предотвращения обновления меню при открытии
* [[#13162](https://github.com/electron/electron/pull/13162)] исправление: границы значков в трее не допускают отрицательных значений
* [[#13085](https://github.com/electron/electron/pull/13085)] исправление: заголовок трея не инвертирует при выделении
* [[#12196](https://github.com/electron/electron/pull/12196)] исправлено: Mac сборка, когда `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] устранение: дополнительные проблемы в бесоконных окнах с вибрацией
* [[#13326](https://github.com/electron/electron/pull/13326)] исправить: после вызова `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] исправлен: неправильное использование приватных API в MAS сборке
* [[#13517](https://github.com/electron/electron/pull/13517)] исправлено: `tray.setContextMenu` сбой
* [[#14205](https://github.com/electron/electron/pull/14205)] Исправлен: нажатие экрана в диалоге закрывает его, даже если установлен `defaultId`

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] исправлено: `BrowserWindow.focus()` для неэкранированных окон

## Другие примечания

* PDF Viewer в настоящее время не работает, но работает и будет работать снова
* `TextField` и `кнопка` API экспериментальные и поэтому по умолчанию выключены
  * Они могут быть включены с помощью флага сборки `enable_view_api`

# Что дальше

Команда Electron продолжает работать над определением наших процессов для более быстрого и гладкого улучшения, поскольку мы стремимся поддерживать паритет с командами развития Chromium, Узел и V8.
