# Уведомления (Window, Linux, macOS)

## Обзор

Все три операционные системы предоставляют приложениям средства для отправки уведомлений пользователю. Метод отображения уведомлений отличается от метода для процессов Main и Renderer.

Для процесса Renderer Electron удобно позволяет разработчикам отправлять уведомлений с помощью [API уведомлений HTML5](https://notifications.spec.whatwg.org/), , используя встроенный API уведомлений операционной системы для отображения.

Для отображения уведомлений в главном процессе, необходимо использовать модуль [Уведомления](../api/notification.md).

## Пример

### Показывать уведомления в процессе рендерера

Предположим, что у вас есть работающее приложение Electron из [Быстрое начальное руководство](quick-start.md), добавьте следующую строку к индексу `. tml` файл перед закрытием `</body>` тег:

```html
<script src="renderer.js"></script>
```

и добавьте файл `renderer.js`:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')

```

После запуска приложения Electron вы должны увидеть уведомление:

![Уведомление в процессе рендерера](../images/notification-renderer.png)

Если вы откроете консоль и нажмите на уведомление, вы увидите сообщение , которое было сгенерировано после запуска `onclick` события:

![Onclick сообщение для уведомления](../images/message-notification-renderer.png)

### Показывать уведомления в главном процессе

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), обновите файл `main.js` следующими строками:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

После запуска приложения Electron вы должны увидеть уведомление:

![Уведомление в главном процессе](../images/notification-main.png)

## Дополнительная информация

Хотя код и Ux схожий между операционными системами, все же есть небольшие различия.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Это может быть перекрыто во время разработки, поэтому добавление `node_modules\electron\dist\electron.exe` в меню запуска тоже делает трюк. Перейдите в файл Проводника, щелкните правой кнопкой мыши и выберите пункт «Запустить меню». После этого вам нужно добавить строку `app.setAppUserModelId(process.execPath)` в ваш основной процесс, чтобы увидеть уведомления.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Обратите внимание, однако, что его не нужно прикреплять к стартовому экрану.
* В Windows 7 уведомления работают с пользовательской реализацией, которая наглядно напоминает родной для более новых систем.

Electron пытается автоматизировать работу вокруг ID модели приложения. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Кроме того, в Windows 8 максимальная длина тела уведомления составляет 250 символов, в команде Windows рекомендуется хранить уведомления от до 200 символов. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Попытка отправить гигантские количества текста на API (тысячи символов) может привести к нестабильности.

#### Advanced Notifications

Позже версии Windows позволяют получать расширенные уведомления с пользовательскими шаблонами, изображениями и другими гибкими элементами. Для отправки этих уведомлений (от основного процесса или процесса визуализации), используйте модуль пользовательского доступа [Электрон-уведомления](https://github.com/felixrieseberg/electron-windows-notifications), который использует родные дополнения для отправки `ToastNotification` и `TileNotification` объектов.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Тихие часы / Режим презентации

Чтобы определить, разрешено ли вам отправлять уведомление, используйте пользовательский модуль [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Это позволит вам заранее определить, будет ли Windows выбрасывать уведомления без звука.

### macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications][apple-notification-guidelines].

Обратите внимание, что размер уведомлений ограничен 256 байтами и будет сокращен , если вы превысите этот лимит.

#### Advanced Notifications

Поздние версии macOS позволяют получать уведомления с полем ввода, позволяя пользователю быстро ответить на уведомление. In order to send notifications with an input field, use the userland module [node-mac-notifier][node-mac-notifier].

#### Не беспокоить/состояние сеанса

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state][electron-notification-state].

Это позволит Вам заранее определить отображаются ли уведомления или нет.

### Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
