# Notification (Оповещения)

> Создание уведомлений на рабочем столе ОС

Процесс: [Главный](../glossary.md#main-process)

## Использование в Рендерер-процессе

Если вы хотите отобразить уведомления в Рендерер-процессе, вы должны использовать [HTML5 Notification API](../tutorial/notifications.md)

## Class: Notification / Уведомление

> Создание уведомлений на рабочем столе ОС

Процесс: [Главный](../glossary.md#main-process)

`Notification` является [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Так создается новый экземпляр `BrowserWindow` с собственными свойствами, установленными в `options`.

### Статические методы

Класс `Notification` имеет следующие статические методы:

#### `Notification.isSupported()`

Возвращает `Boolean` - Поддерживаются ли уведомления рабочего стола в текущей системе

### `new Notification([options])` _Экспериментально_

* `options` Object (optional)
  * `title` String - Заголовок для уведомления, который будет отображаться в верхней части окна уведомления, когда он будет показан.
  * `subtitle` String (опционально) _macOS_ - Подзаголовок для уведомления, который будет отображаться под заголовком.
  * `body` String - Текст уведомления, который будет отображаться под заголовком или подзаголовком.
  * `silent` Boolean (опционально) - Использовать ли звук уведомления ОС при отображении уведомления.
  * `icon` (String | [NativeImage](native-image.md)) (опционально) - Значок для отображения в уведомлении.
  * `hasReply` Boolean (опционально) _macOS_ - Нужно ли добавлять встроенный ответ к уведомлению.
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * `replyPlaceholder` String (опционально) _macOS_ - Заполнитель для записи в поле ввода встроенного ответа.
  * `sound` String (опционально) _macOS_ - Имя звукового файла, воспроизводимого при отображении уведомления.
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (опционально) _macOS_ - Действия для добавления к уведомлению. Пожалуйста, прочитайте доступные действия и ограничения в документации `NotificationAction`.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

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

#### Событие: 'reply' _macOS_

Возвращает:

* `event` Event
* `reply` String - Строка, введенная пользователем в поле ответа в строке ответа.

Возникает при нажатии пользователем кнопки "Ответить" в уведомлении с `hasReply: true`.

#### Событие: 'action' _macOS_

Возвращает:

* `event` Event
* `index` Number - Индекс действия, которое было активировано.

### Методы экземпляра

Объекты, созданные с помощью `New Notification`, имеют следующие методы экземпляра:

#### `notification.show()`

Сразу же показывает уведомление пользователю, обратите внимание, что это означает, в отличие от реализации HTML5 Notification, создание экземпляра `new Notification` не сразу показывает его пользователю, вам нужно вызвать этот метод, прежде чем ОС покажет его.

Если уведомление было показано ранее, этот метод отклонит ранее показанное уведомление и создаст новое с идентичными свойствами.

#### `notification.close()`

Отклоняет уведомление.

### Instance Properties

#### `notification.title`

Свойство `String`, представляющее заголовок уведомления.

#### `notification.subtitle`

Свойство `String`, представляющее подзаголовок уведомления.

#### `notification.body`

Свойство `String`, представляющее тело уведомления.

#### `notification.replyPlaceholder`

Свойство `String`, представляющее заполнитель ответа уведомления.

#### `notification.sound`

Свойство `String`, представляющее звук уведомления.

#### `notification.closeButtonText`

Свойство `String`, представляющее текст кнопки закрытия уведомления.

#### `notification.silent`

Свойство `Boolean`, представляющее, является ли уведомление беззвучным.

#### `notification.hasReply`

Свойство `Boolean`, представляющее, есть ли в уведомлении действие для ответа.

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) свойство, представляющее действия уведомления.

### Воспроизведение звуков

В macOS вы можете указать название звука, который вы хотели бы воспроизвести, когда отображается уведомление. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Убедитесь, что звуковой файл скопирован в папку пакета приложений (например, `YourApp.app/Contents/Resources`), или в одно из следующих мест:

* `~/Library/Sounds (~/Библиотека/Звуки)`
* `/Library/Sounds (/Библиотека/Звуки)`
* `/Network/Library/Sounds (/Сеть/Библиотека/Звуки)`
* `/System/Library/Sounds (/Система/Библиотека/Звуки)`

Смотрите документацию [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) для получения дополнительной информации.
