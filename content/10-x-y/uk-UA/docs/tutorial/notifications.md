# Сповіщення (Windows, Linux, macOS)

Всі три операційні системи забезпечують додаткам можливість надсилати сповіщення користувачеві. Electron зручно дозволяє розробникам надсилати сповіщення з [HTML5 нотифікацій API](https://notifications.spec.whatwg.org/), використовуючи в даний час запущений вбудований API сповіщень операційної системи.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Якщо ви хочете відобразити сповіщення в головному процесі, перевірте модуль [Повідомлень](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick => {
  console.log('Сповіщення натиснуто')

```

У той час як досвід використання коду та користувача між операційними системами схожі, існують тонкі відмінності.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Це може бути перекриття під час розробки, тому додайте `node_modules\electron\dist\electron.exe` у ваше Меню також робить фокус. Перейдіть до файлу в Explorer, клацніть правою кнопкою миші та "Закріпити", щоб запустити меню". Потім вам потрібно буде додати рядок `app.setAppUserModelId(process.execPath)` до головного процесу, щоб побачити сповіщення.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Зверніть увагу на , однак, що це не потрібно прикріпити до екрана Початку.
* На Windows 7 сповіщення працюють за допомогою користувальницької реалізації, яка візуально нагадує вбудовану в новіші системи.

Спроби Electron автоматизувати роботу навколо ID моделі додатка. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Крім того, Electron виявить, що Squirrel був використаний і автоматично викличе `app.setAppUserId()` з правильним значенням. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Спроба відправити гігантські кількість тексту в API (тисячі символів) може призвести до нестабільності.

### Розширені сповіщення

Пізніші версії Windows дозволяють додавати додаткові повідомлення з користувацькими шаблонами зображеннями та іншими гнучкими елементами. Щоб надіслати ці сповіщення (з сенсу головного процесу або процесу рендерингу), використовуйте модуль користувача [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) який використовує власні додатки вузла для відправлення `ToastNotification` та `TileNotification`.

Під час надсилання сповіщень, включаючи кнопки, працюють з `electron-windows-notification`, повідомлення щодо обробки відповідей потребують використання [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications)який допомагає реєструвати необхідні COM компоненти та викликати ваш додаток Electron з вказаними даними користувача.

### Режим тихих годин / презентації

Щоб визначити, чи дозволено вам надсилати повідомлення, скористайтеся клієнтським модулем [станом електрики](https://github.com/felixrieseberg/electron-notification-state).

Це дозволяє визначення часу незалежно від того, будуть без звукового викидання це сповіщення.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Зверніть увагу, що повідомлення в розмірі до 256 байт будуть скорочені , якщо ви перевищите цю межу.

### Розширені сповіщення

У пізніших версіях macOS дозволяються для сповіщення з введеним полем, що дозволяє користувачеві швидко відповідати на повідомлення. Для того, щоб надсилати сповіщення вхідним полем, скористайтеся модулем користувача [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Не турбувати / стан сесії

Щоб визначити, чи дозволено вам надсилати повідомлення, скористайтеся клієнтським модулем [станом електрики](https://github.com/felixrieseberg/electron-notification-state).

Це дозволить вам виявити заздалегідь, буде показано сповіщення чи ні.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
