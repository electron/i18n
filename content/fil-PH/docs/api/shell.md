# shell

> Ayusin ang mga payl at "URLs" gamit ang kanilang "default" o ang pagpapanatili nito sa dating "applications".

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) 

Ang modyul ng `shell` ng mga gamit nito na kaugnay sa pinagsama-samang "desktop".

Isang halimbawa ay ang pagbukas ng URL sa dating nitong "browser" ng gumagamit:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Pamamaraan

Ang modyul ng `shell` ay ang mga sumusunod na paraan:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Pagbabalik sa `Boolean` - Kung ang aytem ay matagumpay na naipakita

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` String

Pagbabalik sa `Boolean` - Kung ang aytem ay matagumpay na nagbukas.

Buksan ang binigay na payl sa dati nitong aspeto ng "desktop".

### `shell.openExternal(url[, options, callback])`

* `url` String
* `mga pagpipilian` Mga bagay (opsyonal) *macOS* 
  * `activate` Boolean - `true` para maipadala ang nakabukas na "application" sa importante nitong posisyon. Ang "default" ay `true`.
* `tumawag muli` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash

Move the given file to trash and returns a boolean status for the operation.

### `shell.beep()`

Play the beep sound.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following: 
  * `create` - Creates a new shortcut, overwriting if necessary.
  * `update` - Updates specified properties only on an existing shortcut.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.