## Class: Dock

> Control your app in the macOS dock

Proseso:[Pangunahi](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Mga Halimbawa ng Sistematikong Paraan

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Kapag ang `critical` ay lumipas, ang icon ng dock ay tatalon hanggang alinman sa mga aplikasyon ay naging aktibo o ang kahilingan ay kinansela.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Kanselahin ang pagtalon ng `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Pinatatalon ang mga istak ng Download kung ang filePath ay nasa loob ng folder ng mga Download.

#### `dock.setBadge(text)` _macOS_

* `text` String

Ise-set ang string upang maipakita sa badging area ng dock.

#### `dock.getBadge()` _macOS_

Nagbabalik ang `String` - Ang string ng badge ng dock.

#### `dock.hide()` _macOS_

Itinatago ang icon ng dock.

#### `dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

#### `dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` [NativeImage](native-image.md) (String)

I-set ang `image` na may kaugnayan sa dock icon na ito.
