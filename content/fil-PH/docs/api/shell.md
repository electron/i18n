# "Shell"

> Ayusin ang mga payl at "URLs" gamit ang kanilang "default" o ang pagpapanatili nito sa dating "applications".

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) 

Ang modyul ng `shell` ng mga gamit nito na kaugnay sa pinagsama-samang "desktop".

Isang halimbawa ay ang pagbukas ng URL sa dating nitong "browser" ng gumagamit:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Mga Paraan

Ang modyul ng `shell` ay ang mga sumusunod na paraan:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Pagbalik sa `Boolean` - Kung ang aytem ay matagumpay na naipakita

Ipakita ang binigay na payl sa "file manager". Kung maaari, piliin ang payl.

### `shell.openItem(fullPath)`

* `fullPath` String

Pagbalik sa `Boolean` - Kung ang aytem ay matagumpay na nagbukas.

Buksan ang binigay na payl sa dati nitong aspeto ng "desktop".

### `shell.openExternal(url[, options, callback])`

* `url` String
* `mga pagpipilian` Mga bagay (opsyonal) *macOS* 
  * `activate` Boolean - `true` para maipadala ang nakabukas na "application" sa importante nitong posisyon. Ang "default" ay `true`.
* `tumawag muli` "Function" (opsyunal) - Kung ang tiyak na "function" ay gagana nang hindi sabay-sabay. *macOS* 
  * `error` Error

Pagbalik sa `Boolean` - Kapag ang "application" ay maaaring buksan sa "URL". Kung ang muling pagtawag ang tinukoy, parati itong babalik sa "true".

Buksan ang binigay na panlabas na sistematikong panuntunan ng "desktop" sa karaniwan o dati na nitong ayos. (Halimbawa, mailto: "URLs" sa gumagamit ng ahente na nagpapadala ng mensahe ayon sa dati na nitong ayos o tinatawag na "default").

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Pagbalik sa `Boolean` - Kung ang aytem matagumpay na nabura

Burahin ang binigay na payl at bumalik sa posisyon nito bilang "boolean" para sa pagpapagana.

### `shell.beep()`

Laruin ang tunog na "beep".

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (opsyunal) - Pagtatakda nito sa dati o karaniwan nitong ayos o "default" ay `paglikha`, na maaaring isa sa mga sumusunod: 
  * `create` - Ang paglikha ng bagong pagpapa-ikli, pagpapalit ng lumang impormasyon o datos sa bago o tinatawag na "overwriting", kung kinakailangan.
  * `update` - Ang pagsasaayos ng mga katangian ayon sa pinakabagong aspeto nito na mangyayari lamang sa umiiral na pagpapaikli.
  * `replace` - Ang pagpatong sa pagpapaikli ay maaaring mabigo kung ito ay hindi umiiral.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.