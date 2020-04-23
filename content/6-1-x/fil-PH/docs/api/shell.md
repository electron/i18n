# "Shell"

> Ayusin ang mga payl at "URLs" gamit ang kanilang "default" o ang pagpapanatili nito sa dating "applications".

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang modyul ng `shell` ng mga gamit nito na kaugnay sa pinagsama-samang "desktop".

Isang halimbawa ay ang pagbukas ng URL sa dating nitong "browser" ng gumagamit:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Mga Paraan

Ang modyul ng `shell` ay ang mga sumusunod na paraan:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` String

Pagbabalik sa `Boolean` - Kung ang aytem ay matagumpay na nagbukas.

Buksan ang binigay na payl sa dati nitong aspeto ng "desktop".

### `shell.openExternalSync(url[, mga pagpipilian])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

**Deprecated**

### `shell.openExternal(url[, mga pagpipilian])`

* `url` String - Max 2081 characters on windows.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Pagbabalik sa `Boolean` - Kung ang aytem matagumpay na nabura.

Burahin ang binigay na payl at bumalik sa posisyon nito bilang "boolean" para sa pagpapagana.

### `shell.beep()`

Laruin ang tunog na "beep".

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - Ang paglikha ng bagong "shortcut", pagpapalit ng lumang impormasyon o datos sa bago o tinatawag na "overwriting", kung kinakailangan.
  * `update` - Ang pagsasaayos ng mga katangian ayon sa pinakabagong aspeto nito ay mangyayari lamang sa umiiral na "shortcut".
  * `replace` - Ang pagpatong sa "shortcut" ay maaaring mabigo kung ito ay hindi umiiral.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Pagbabalik sa `Boolean` - kung ang pagpapaikli ay matagumpay na nalikha.

Lumikha o pagsasaayos ng pagpapaikili ng "link" ayon sa pinakabagong aspeto nito sa `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

Pagbalik sa [`ShortcutDetails`](structures/shortcut-details.md)

Paglulutas ng "shortcut link" sa `shortcutPath`.

Ang eksepsiyon ay mababaliwala kapag may maling nangyari.
