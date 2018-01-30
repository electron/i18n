# ang dialog

> Ipinapakita ang mga dialog ng sarilihang sistema para sa pagbubukas at pagse-seyb ng mga file, pag-aalerto, atbp.

Proseso: [Main](../glossary.md#main-process)

Isang halimbawa ng pagpapakita ng isang dialog sa pagpili ng maraming mga file at mga direktoryo:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

Ang Dialog ay binuksan mula sa pangunahing thread ng Electron. Kung gusto mong gamitin ang dialog mula sa renderer na proseso, tandaang i-access ito gamit ang remote:

```javascript
const {dialog} = kailangan('electron').remote
console.log(dialog)
```

## Mga Pamamaraan

Ang `dialog` na modyul ay mayroong sumusunod na mga pamamaraan:

### `dialog.showOpenDialog([browserWindow, ]mga opsyon[, callback])`

* `browserWindow` Ang BrowserWindow (opsyonal)
* `options` Object 
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal)
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa kompirmasyong pipindutian, na kapag naiwang walang laman, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `properties` String[] (opsyonal) - Naglalaman ng kung aling mga katangian ng dialog ang dapat na gagamitin. Ang mga sumusunod na halaga ay suportado: 
    * `openFile` - Nagpapahintulot na mapili ang mga file.
    * `openDirectory` - Nagpapahintulot na mapili ang mga direktoryo.
    * `multiSelections` - Nagpapahintulot na mapili ang mga ang maraming mga path.
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` - Pinapahintulutan ang paggawa ng bagong mga direktoryo mula sa dialog. *macOS*
    * `promptToCreate` - Nagsesenyas sa paglikha kung walang path ng file na pumasok sa dialog. Hindi nito aktwal na nilikha ang file sa path pero pinapayagan ang mga hindi nakikitang mga path na maibalik na dapat nilikha ng aplikasyon. *Windows*
    * `noResolveAliases` - pinapahinto ang awtomatikong alyas (symlink) na resolusyon ng path. Ang piniling mga alyas ay babalik sa alyas na path sa halip na sa target na path. *macOS*
    * `treatPackageAsDirectory` - tinatrato ang mga pakete, katulad ng `.app` na mga folder bilang isang direktoryo kaysa isang file. *macOS*
  * `message` String (opsyonal) *macOS* - mensaheng nagpapakita ng mga kahong pang-input sa itaas.
* `callback` Function (opsyonal) 
  * `filePaths` String[] - Isang hanay ng mga path ng file na pinili ng gumagamit

Ibinabalik ang `String[]`, isang hanay ng mga path ng file na napili ng gumagamit, kung ang callback ay ibinigay, ibinabalik nito ang `undefined`.

Ang `browserWindow` na argumento ay nagbibigay-daan sa dialog na ilakip ang kanyang sarili sa isang parent na window na ginagawa itong modal.

Ang mga `filter` ay nagtitiyak ng mga hanay ng mga uri ng file na maipapakita o mapipili kung nais mong limitahan ang gumagamit sa isang tiyak na uri. Halimbawa:

```javascript
{
  filters: [
    {name: 'Mga Imahe', extensions: ['jpg', 'png', 'gif']},
    {name: 'Mga Pelikula', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Karaniwang Uri ng File', extensions: ['as']},
    {name: 'Lahat ng mga file', extensions: ['*']}
  ]
}
```

Ang mga `ekstensyon` na hanay ay dapat na naglalaman ng mga ekstensyon na walang mga wildcard o mga tuldok (halimbawa, maganda ang `'png'` pero ang `'.png'` at `'*.png'` ay hindi maganda). Upang ipakita ang lahat ng mga file, gamitin ang `'*'` na wildcard (wala nang ibang wildcard ang sinusuportahan).

Kapag naipasa ang isang `callback`, ang API na tawag ay magiging asynchronous at ang resulta ay mapapasa sa `callback(filenames)`

**Tandaan:** Sa Windows at Linux, ang isang bukas na dialog ay hindi pwedeng sabay na tagapili ng file at tagapili ng direktoryo, upang kapag i-set mo ang `properties` sa `['openFile', 'openDirectory']` sa mga platapormang ito, ang isang tagapili ng direktoryo ay maipapakita.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` Ang BrowserWindow (opsyonal)
* `options` Object 
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal) - isang ganap na path ng direktoryo, ganap na path ng file, o ang pangalan ng file na gagamitin pag naka-default.
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa kompirmasyong pipindutian, na kapag naiwang walang laman, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `message` String (opsyonal) *macOS* - mensaheng ipinapakita sa ibabaw ng mga tekstong field.
  * `nameFieldLabel` String (opsyonal) *macOS* - karaniwang lebel para sa mga tekstong ipinapakita sa harapan ng filename na tekstong field.
  * `showsTagField` Boolean (opsyonal) *macOS* - Nagpapakita sa mga tag na input box, nagde-default sa `true`.
* `callback` Function (opsyonal) 
  * `filename` String

Returns `String`, the path of the file chosen by the user, if a callback is provided it returns `undefined`.

Ang `browserWindow` na argumento ay nagbibigay-daan sa dialog na ilakip ang kanyang sarili sa isang parent na window na ginagawa itong modal.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` Ang BrowserWindow (opsyonal)
* `mga pagpipilian` Bagay 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `` will be used as the return value or callback response. This option is ignored on Windows.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Default is `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
* `tumawag muli` Function (opsyonal) 
  * `response` Number - The index of the button that was clicked
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Ang `browserWindow` na argumento ay nagbibigay-daan sa dialog na ilakip ang kanyang sarili sa isang parent na window na ginagawa itong modal.

If a `callback` is passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box
* `content` String - The text content to display in the error box

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` Ang BrowserWindow (opsyonal)
* `mga pagpipilian` Bagay 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Function

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a `BrowserWindow` reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.