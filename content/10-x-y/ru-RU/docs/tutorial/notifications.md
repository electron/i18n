# Уведомления (Window, Linux, macOS)

Все три операционные системы предоставляют возможность для приложения отправлять уведомления пользователю. Electron позволяет разработчикам удобно отправлять уведомления с помощью [HTML5 Notification API](https://notifications.spec.whatwg.org/), используя встроенный API уведомлений текущей операционной системы для отображения его.

**Примечание:** Поскольку это HTML5 API, то он доступен только в процессе рендеринга. Если вы хотите отправлять уведомления из основного процесса, пожалуйста используйте модуль [Notification](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Хотя код и Ux схожий между операционными системами, все же есть небольшие различия.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Это может быть перекрыто во время разработки, поэтому добавляя `node_modules\electron\dist\electron.exe` в меню Пуск. Перейдите в файл Проводника, щелкните правой кнопкой мыши и выберите пункт «Запустить меню». После этого вам нужно добавить строку `app.setAppUserModelId(process.execPath)` в ваш основной процесс, чтобы увидеть уведомления.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Обратите внимание, однако, что его не нужно прикреплять к стартовому экрану.
* В Windows 7 уведомления работают с пользовательской реализацией, которая наглядно напоминает родной для более новых систем.

Electron пытается автоматизировать работу вокруг ID модели приложения. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Кроме того, в Windows 8 максимальная длина тела уведомления составляет 250 символов, в команде Windows рекомендуется хранить уведомления от до 200 символов. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Попытка отправить гигантские количества текста на API (тысячи символов) может привести к нестабильности.

### Advanced Notifications

Позже версии Windows позволяют получать расширенные уведомления с пользовательскими шаблонами, изображениями и другими гибкими элементами. Для отправки этих уведомлений (от основного процесса или процесса визуализации), используйте модуль пользовательского доступа [Электрон-уведомления](https://github.com/felixrieseberg/electron-windows-notifications), который использует родные дополнения для отправки `ToastNotification` и `TileNotification` объектов.

Во время уведомлений, включая кнопки работы с `электронными окнами-уведомлениями`, Обработка ответов требует использования [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), что помогает с регистрацией необходимых компонентов COM и вызовом приложению Electron, используя введенные данные пользователя.

### Тихие часы / Режим презентации

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Это позволит вам заранее определить, будет ли Windows выбрасывать уведомление без уведомления.

## macOS

Уведомления находятся прямо в macOS, но вы должны знать [рекомендации пользовательского интерфейса Apple относительно уведомлений](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Обратите внимание, что размер уведомлений ограничен 256 байтами и будет сокращен , если вы превысите этот лимит.

### Advanced Notifications

Поздние версии macOS позволяют получать уведомления с полем ввода, позволяя пользователю быстро ответить на уведомление. Чтобы отправлять уведомления с полем ввода, используйте модуль пользовательского пространства [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Не беспокоить/состояние сеанса

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Это позволит Вам заранее определить отображаются ли уведомления или нет.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
