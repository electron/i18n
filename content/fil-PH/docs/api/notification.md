# Ang paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Ang proseso: [Main](../glossary.md#main-process)

## Ginagamit sa mga proseso ng tagasalin

Kung gusto mong ipakita ang mga Paunawa mula sa proseso ng tagasalin kailangan mong gamitin ang [HTML5 Notification API](../tutorial/notifications.md)

## Klase: Paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Ang proseso: [Main](../glossary.md#main-process)

Ang `Notification` ay isang [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

Ito ay lumilikha ng isang bagong `Notification` na may sinaunang mga katangian na itinakda sa pamamagitan ng `options`.

### Mga istatikong pamamaraan

Ang klase ng `Notification` ay may mga sumusunod na mga istatikong pamamaraan:

#### `Notification.isSupported()`

Nagbabalik sa `Boolean` - Kung hindi man ang mga paunawa ng desktop ay sinusuportahan sa kasalukuyang sistema

### Ang `new Notification([options])` ay *Experimental*

* `mga pagpipilian` Bagay 
  * Ang `title` String - Ang isang pamagat sa mga paunawa, kung saan ay ipinakita sa ibabaw ng window ng paunawa kung saan ito ipinakita
  * Ang `subtitle` String - (opsyonal) Ang pangalawang pamagat para sa paunawa, kung saan ay makikita sa ilalim ng pamagat. *macOS*
  * Ang `body` String - Ang kabuuang teksto ng mga paunawa, kung saan ay makikita sa ilalim ng pamagat o pangalawang pamagat
  * Ang `silent` Boolean - (opsyonal) Kung hindi man ay maglalabas ng isang paunawang ingay kapag ipinapakita ang paunawa
  * Ang `icon` [NativeImage](native-image.md) - (opsyonal) Ang isang icon na ginagamit sa mga paunawa
  * Ang `hasReply` Boolean - (opsyonal) Kung hindi man ay magdagdag ng isang opsyon ng nasa linyang pagtugon sa mga paunawa. *macOS*
  * Ang `replyPlaceholder` String - (opsyonal) Ang placeholder para sumulat sa input field ng nasa linyang pagtugon. *macOS*
  * Ang `sound` String - (opsyonal) Ang pangalan ng file ng tunog ay tutunog kapag ang paunawa ay ipinakita. *macOS*
  * Ang `actions` [NotificationAction[]](structures/notification-action.md) - (opsyonal) Ang mga aksyon na idadagdag sa mga paunawa. Pakiusap basahin ang magagamit na mga aksyon at mga limitasyon sa mga dokumentasyon ng `NotificationAction` sa *macOS*

### Halimbawa ng mga event

Ang mga bagay na nilikha na may `new Notification` ay naglalabas ng mga sumusunod na mga event:

**Note:** Ang ilang mga event ay magagamit lamang sapartikular na mga operating system at ay tinatakan tulad nito.

#### Event: 'show'

Magbabalik ng:

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

Magbabalik ng:

* `event` Event

Emitted when the notification is clicked by the user.

#### Event: 'close'

Magbabalik ng:

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guarunteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' *macOS*

Magbabalik ng:

* `event` Event
* `reply` String - The string the user entered into the inline reply field

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

Magbabalik ng:

* `event` Event
* `index` Number - The index of the action that was activated

### Mga pamamaraan ng pagkakataon

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, simply instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.