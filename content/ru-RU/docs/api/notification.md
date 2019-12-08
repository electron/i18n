# Notification (Оповещения)

> Создание уведомлений на рабочем столе ОС

Process: [Main](../glossary.md#main-process)

## Использование процесса отрисовки

Если вы хотите отобразить уведомления в процессе отрисовки, вы должны использовать [HTML5 Notification API](../tutorial/notifications.md)

## Class: Notification / Уведомление

> Создание уведомлений на рабочем столе ОС

Process: [Main](../glossary.md#main-process)

`Notification` является [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Так создается новый экземпляр `BrowserWindow` с собственными свойствами, установленными в `options`.

### Статические методы

Класс `Notification` имеет следующие статические методы:

#### `Notification.isSupported()`

Возвращает `Boolean` - Поддерживаются ли уведомления рабочего стола в текущей системе

### `new Notification([options])` *Экспериментально*

* `options` Object (опционально) 
  * `title` String - Заголовок для уведомления, который будет отображаться в верхней части окна уведомления, когда он будет показан.
  * `subtitle` String (опционально) *macOS* - Подзаголовок для уведомления, который будет отображаться под заголовком.
  * `body` String - Текст уведомления, который будет отображаться под заголовком или подзаголовком.
  * `silent` Boolean (опционально) - Использовать ли звук уведомления ОС при отображении уведомления.
  * `icon` (String | [NativeImage](native-image.md)) (опционально) - Значок для отображения в уведомлении.
  * `hasReply` Boolean (опционально) *macOS* - Нужно ли добавлять встроенный ответ к уведомлению.
  * `replyPlaceholder` String (опционально) *macOS* - Заполнитель для записи в поле ввода встроенного ответа.
  * `sound` String (опционально) *macOS* - Имя звукового файла, воспроизводимого при отображении уведомления.
  * `actions` [NotificationAction[]](structures/notification-action.md) (опционально) *macOS* - Действия для добавления к уведомлению. Пожалуйста, прочитайте доступные действия и ограничения в документации `NotificationAction`.
  * `closeButtonText` String (опционально) *macOS* - Пользовательское название для кнопки закрытия оповещения. Пустая строка приведет к использованию локализованного текста по умолчанию.

### События экземпляра

Объекты созданные с помощью `new Notification` имеют следующие события:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

#### Событие: 'show'

Возвращает:

* `event` Event

Возникает, когда уведомление отображается пользователю, обратите внимание, что оно может быть вызвано несколько раз, поскольку уведомление может быть показано несколько раз с помощью метода `show()`.

#### Событие: 'click'

Возвращает:

* `event` Event

Возникает при нажатии на уведомление пользователя.

#### Событие: 'close'

Возвращает:

* `event` Event

Возникает при закрытии уведомления вручную пользователем.

Не гарантируется, что это событие будет отправлено во всех случаях, когда уведомление закрыто.

#### Событие: 'reply' *macOS*

Возвращает:

* `event` Event
* `reply` String - Строка, введенная пользователем в поле ответа в строке ответа.

Возникает при нажатии пользователем кнопки "Ответить" в уведомлении с `hasReply: true`.

#### Событие: 'action' *macOS*

Возвращает:

* `event` Event
* `index` Number - The index of the action that was activated.

### Методы экземпляра

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### Instance Properties

#### `notification.title`

A `String` property representing the title of the notification.

#### `notification.subtitle`

A `String` property representing the subtitle of the notification.

#### `notification.body`

A `String` property representing the body of the notification.

#### `notification.replyPlaceholder`

A `String` property representing the reply placeholder of the notification.

#### `notification.sound`

A `String` property representing the sound of the notification.

#### `notification.closeButtonText`

A `String` property representing the close button text of the notification.

#### `notification.silent`

A `Boolean` property representing whether the notification is silent.

#### `notification.hasReply`

A `Boolean` property representing whether the notification has a reply action.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.