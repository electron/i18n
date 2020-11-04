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

```js
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

```js
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

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. Это может быть перекрыто во время разработки, поэтому добавление `node_modules\electron\dist\electron.exe` в меню запуска тоже делает трюк. Перейдите в файл Проводника, щелкните правой кнопкой мыши и выберите пункт «Запустить меню». После этого вам нужно добавить строку `app.setAppUserModelId(process.execPath)` в ваш основной процесс, чтобы увидеть уведомления.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
* On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

#### Advanced Notifications

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Quiet Hours / Presentation Mode

Чтобы определить, разрешено ли вам отправлять уведомление, используйте пользовательский модуль [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Это позволит вам заранее определить, будет ли Windows выбрасывать уведомления без звука.

### macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

#### Advanced Notifications

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

### Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.
