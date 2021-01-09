# Сповіщення (Windows, Linux, macOS)

## Огляд

Всі три операційні системи забезпечують додатки для відправки повідомлень користувачеві. Техніка відображення сповіщень відрізняється в для процесів Головної та Рендерера.

Для процесу рендерингу, Electron зручно дозволяє розробникам надсилати сповіщення з [HTML5 Нотифікацій API](https://notifications.spec.whatwg.org/), використовується в даний час запущена вбудований API сповіщень операційної системи , щоб відобразити його.

Щоб показувати сповіщення у Головному процесі, вам потрібно використати модуль [Повідомлень](../api/notification.md).

## Приклад

### Показувати сповіщення в процесі рендерингу

Припускаючи, що ви працюєте програму Electron з [короткого посібника Start](quick-start.md)додати наступну рядок до індексу `. файл tml` перед закриттям `</body>` тег:

```html
<script src="renderer.js"></script>
```

і додайте файл `renderer.js`:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick => {
  console.log('Сповіщення натиснуто')

```

Після запуску додатку Electron, ви повинні побачити сповіщення:

![Сповіщення в процесі рендерингу](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Натисніть на повідомлення для панелі сповіщень](../images/message-notification-renderer.png)

### Показувати сповіщення в головному процесі

Починаючи з робочого додатку [Короткий посібник](quick-start.md), оновіть `main.js` файл з наступними рядками:

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

Після запуску додатку Electron, ви повинні побачити сповіщення:

![Сповіщення в головному процесі](../images/notification-main.png)

## Додаткова інформація

У той час як досвід використання коду та користувача між операційними системами схожі, існують тонкі відмінності.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Це може бути прокладено під час розвитку, тому додавання `node_modules\electron\dist\electron.exe` до вашого стартового меню також робить фокус . Перейдіть до файлу в Explorer, клацніть правою кнопкою миші та "Закріпити", щоб запустити меню". Потім вам потрібно буде додати рядок `app.setAppUserModelId(process.execPath)` до головного процесу, щоб побачити сповіщення.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Зверніть увагу на , однак, що це не потрібно прикріпити до екрана Початку.
* На Windows 7 сповіщення працюють за допомогою користувальницької реалізації, яка візуально нагадує вбудовану в новіші системи.

Спроби Electron автоматизувати роботу навколо ID моделі додатка. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Крім того, Electron виявить, що Squirrel був використаний і автоматично викличе `app.setAppUserId()` з правильним значенням. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Спроба відправити гігантські кількість тексту в API (тисячі символів) може призвести до нестабільності.

#### Розширені сповіщення

Пізніші версії Windows дозволяють додавати додаткові повідомлення з користувацькими шаблонами зображеннями та іншими гнучкими елементами. Щоб надіслати ці сповіщення (з сенсу головного процесу або процесу рендерингу), використовуйте модуль користувача [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) який використовує власні додатки вузла для відправлення `ToastNotification` та `TileNotification`.

Під час надсилання сповіщень, включаючи кнопки, працюють з `electron-windows-notification`, Обробка відповідей вимагає використання [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) який допомагає з реєстрацією необхідних COM компонентів і викликаючи ваш додаток Electron з введеними даними користувача.

#### Режим тихих годин / презентації

Щоб визначити, чи дозволено вам надсилати повідомлення, використовуйте користувацький модуль [стан електрики](https://github.com/felixrieseberg/electron-notification-state).

Це дозволить вам точно визначити час очікування, без звукового сигналу або ні вікна.

### macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications][apple-notification-guidelines].

Зверніть увагу, що повідомлення в розмірі до 256 байт будуть скорочені , якщо ви перевищите цю межу.

#### Розширені сповіщення

У пізніших версіях macOS дозволяються для сповіщення з введеним полем, що дозволяє користувачеві швидко відповідати на повідомлення. In order to send notifications with an input field, use the userland module [node-mac-notifier][node-mac-notifier].

#### Не турбувати / стан сесії

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state][electron-notification-state].

Це дозволить вам виявити заздалегідь, буде показано сповіщення чи ні.

### Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
