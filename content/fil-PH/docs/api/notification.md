# Ang paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Proseso:[Pangunahi](../glossary.md#main-process)

## Ginagamit sa mga proseso ng tagasalin

Kung gusto mong ipakita ang mga Paunawa mula sa proseso ng tagasalin kailangan mong gamitin ang [HTML5 Notification API](../tutorial/notifications.md)

## Klase: Paunawa

> Lumikha ng mga paunawa sa OS ng desktop

Proseso:[Pangunahi](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

Ito ay lumilikha ng isang bagong `Notification` na may sinaunang mga katangian na itinakda sa pamamagitan ng `options`.

### Mga istatikong pamamaraan

Ang klase ng `Notification` ay may mga sumusunod na mga istatikong pamamaraan:

#### `Notification.isSupported()`

Nagbabalik sa `Boolean` - Kung hindi man ang mga paunawa ng desktop ay sinusuportahan sa kasalukuyang sistema

### Ang `new Notification([options])` ay *Experimental*

* `pagpipilian` Bagay 
  * `title` String - A title for the notification, which will be shown at the top of the notification window when it is shown.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `body` String - The body text of the notification, which will be displayed below the title or subtitle.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Mga Instance na Kaganapan

Ang mga bagay na nilikha na may `new Notification` ay naglalabas ng mga sumusunod na mga event:

**Tandaan:** Ang ilang mga kaganapan ay magagamit lamang sa partikular na mga operating system at na may label na.

#### Kaganapan: 'ipakita'

Ibinabalik ang:

* `event` na Kaganapan

Ay lalabas kapag ang paunawa ay ipinakita sa mga gumagamit, tandaan na ito ay ititira ng maraming beses bilang isang paunawa na maaaring ipakita ng maraming beses sa pamamagitan ng pamamaraan ng `show()`.

#### Event: 'click'

Ibinabalik ang:

* `event` na Pangyayari

Ay lalabas kapag ang paunawa ay na-klik na ng gumagamit.

#### Event: 'close'

Ibinabalik ang:

* `kaganapan` kaganapan

Ay lalabas kapag ang paunawa ay isinara sa pamamagitan ng manu-manong pakikialam mula sa mga gumagamit.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### Event: 'sumagot' sa *macOS*

Ibinabalik ang:

* `kaganapan` Kaganapan
* `reply` String - The string the user entered into the inline reply field.

Ay lalabas kapag ang gumagamit ay na-klik ang pindutan ng "Reply" sa paunawa na may `hasReeply: true`.

#### Event: 'aksyon' sa *macOS*

Ibinabalik ang:

* `event` Event
* `index` Number - The index of the action that was activated.

### Mga pamamaraan ng pagkakataon

Ang mga bagay na ginawa na may `new Notification` ay may mga sumusunod na pamamaraan ng instansya:

#### `ang notification.show()`

Ay agad na nagpapakita ng paunawa sa mga gumagamit, mangyaring tandaan na ito ay nangangahulugan na hindi katulad ng implementasyon ng HTML5 Notification, nagbibigay halimbawa lamang sa isang `new Notification` ay hindi agad ito ipinakita sa mga gumagamit, dapat mo munang tawagin ang pamamaraan na ito bago ang OS ay ipakita ito.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### Patugtugin ang mga tunog

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.