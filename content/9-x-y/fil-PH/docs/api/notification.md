# Ang paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Proseso:[Pangunahi](../glossary.md#main-process)

## Ginagamit sa mga proseso ng tagasalin

Kung gusto mong ipakita ang mga Paunawa mula sa proseso ng tagasalin kailangan mong gamitin ang [HTML5 Notification API](../tutorial/notifications.md)

## Klase: Paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Proseso:[Pangunahi](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Ito ay lumilikha ng isang bagong `Notification` na may sinaunang mga katangian na itinakda sa pamamagitan ng `options`.

### Mga istatikong pamamaraan

Ang klase ng `Notification` ay may mga sumusunod na mga istatikong pamamaraan:

#### `Notification.isSupported()`

Nagbabalik sa `Boolean` - Kung hindi man ang mga paunawa ng desktop ay sinusuportahan sa kasalukuyang sistema

### Ang `new Notification([options])` ay _Experimental_

* `options` Object (optional)
  * Ang `title` String - Ang isang pamagat sa mga paunawa, kung saan ay ipinakita sa ibabaw ng window ng paunawa kung saan ito ipinakita.
  * `subtitle` String (optional) _macOS_ - A subtitle for the notification, which will be displayed below the title.
  * Ang `body` String - Ang kabuuang teksto ng mga paunawa, kung saan ay makikita sa ilalim ng pamagat o pangalawang pamagat.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) _macOS_ - Whether or not to add an inline reply option to the notification.
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * `replyPlaceholder` String (optional) _macOS_ - The placeholder to write in the inline reply input field.
  * `sound` String (optional) _macOS_ - The name of the sound file to play when the notification is shown.
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) _macOS_ - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Mga Instance na Kaganapan

Ang mga bagay na nilikha na may `new Notification` ay naglalabas ng mga sumusunod na mga event:

**Tandaan:** Ang ilang mga kaganapan ay magagamit lamang sa partikular na mga operating system at na may label na.

#### Event: 'ipakita'

Ibinabalik ang:

* `event` na Kaganapan

Ay lalabas kapag ang paunawa ay ipinakita sa mga gumagamit, tandaan na ito ay ititira ng maraming beses bilang isang paunawa na maaaring ipakita ng maraming beses sa pamamagitan ng pamamaraan ng `show()`.

#### Event: 'klik'

Ibinabalik ang:

* `event` na Pangyayari

Ay lalabas kapag ang paunawa ay na-klik na ng gumagamit.

#### Event: 'isara'

Ibinabalik ang:

* `kaganapan` kaganapan

Ay lalabas kapag ang paunawa ay isinara sa pamamagitan ng manu-manong pakikialam mula sa mga gumagamit.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### Event: 'sumagot' sa _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* `reply` String - Ang string na ipinasok ng gumagamit sa field ng nasa linyang pagtugon.

Ay lalabas kapag ang gumagamit ay na-klik ang pindutan ng "Reply" sa paunawa na may `hasReeply: true`.

#### Event: 'aksyon' sa _macOS_

Ibinabalik ang:

* `kaganapan` Kaganapan
* Ang `index` Number - Ang indise ng mga aksyon na na-aktibeyt na.

### Mga pamamaraan ng pagkakataon

Ang mga bagay na ginawa na may `new Notification` ay may mga sumusunod na pamamaraan ng instansya:

#### `ang notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### Mga Katangian ng Instance

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

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Patugtugin ang mga tunog

Sa macOS, maaari mong tukuyin ang pangalan ng mga tunog na gusto mong patunugin kapag ang paunawa ay ipinakita. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Maging sigurado na ang file ng tunog ay nakoya na sa ilalim ng bundle ng app (hal, `YourApp.app/Contents/Resources`), o isa sa mga sumusunod na lokasyon:

* `-/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Tingnan ang docs ng [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) para sa karagdagang impormasyon.
