# I-display ang native dialogs upang mabuksan ang naka save na files, alerting, at iba pa.

> Ipinapakita ang mga dialog ng sarilihang sistema para sa pagbubukas at pagse-seyb ng mga file, pag-aalerto, atbp.

Proseso:[Pangunahi](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Mga Paraan

Ang `dialog` na modyul ay mayroong sumusunod na mga pamamaraan:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal)
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa, kapag napabayaang bakante, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Nagpapahintulot na mapili ang mga file.
    * `openDirectory` - Nagpapahintulot na mapili ang mga direktoryo.
    * `multiSelections` - Nagpapahintulot na mapili ang mga ang maraming mga path.
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Hindi nito aktwal na nilikha ang file sa path pero pinapayagan ang mga hindi nakikitang mga path na maibalik na dapat nilikha ng aplikasyon.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Halimbawa:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Ang mga `ekstensyon` na hanay ay dapat na naglalaman ng mga ekstensyon na walang mga wildcard o mga tuldok (halimbawa, maganda ang `'png'` pero ang `'.png'` at `'*.png'` ay hindi maganda). Upang ipakita ang lahat ng mga file, gamitin ang `'*'` na wildcard (wala nang ibang wildcard ang sinusuportahan).

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal)
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa, kapag napabayaang bakante, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Nagpapahintulot na mapili ang mga file.
    * `openDirectory` - Nagpapahintulot na mapili ang mga direktoryo.
    * `multiSelections` - Nagpapahintulot na mapili ang mga ang maraming mga path.
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Hindi nito aktwal na nilikha ang file sa path pero pinapayagan ang mga hindi nakikitang mga path na maibalik na dapat nilikha ng aplikasyon.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated. (For return values, see [table here](#bookmarks-array).)

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Halimbawa:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Ang mga `ekstensyon` na hanay ay dapat na naglalaman ng mga ekstensyon na walang mga wildcard o mga tuldok (halimbawa, maganda ang `'png'` pero ang `'.png'` at `'*.png'` ay hindi maganda). Upang ipakita ang lahat ng mga file, gamitin ang `'*'` na wildcard (wala nang ibang wildcard ang sinusuportahan).

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal) - isang ganap na path ng direktoryo, ganap na path ng file, o ang pangalan ng file na gagamitin pag naka-default.
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa, kapag napabayaang bakante, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

Ang `filters` ay nagtitiyak sa hanay ng mga uri ng file na maaaring maipakita, tingnan ang `dialog.showOpenDialog` bilang isang halimbawa.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal) - isang ganap na path ng direktoryo, ganap na path ng file, o ang pangalan ng file na gagamitin pag naka-default.
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa, kapag napabayaang bakante, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `canceled` Boolean - whether or not the dialog was canceled.
  * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present. (For return values, see [table here](#bookmarks-array).)

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

Ang `filters` ay nagtitiyak sa hanay ng mga uri ng file na maaaring maipakita, tingnan ang `dialog.showOpenDialog` bilang isang halimbawa.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `type` String (opsyonal) - Pwedeng `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. Sa Windows, ang `"question"` ay nagpapakita ng icon na pareho sa `"info"`, maliban kung nag-set ka ng icon gamit ang opsyong `"icon"`. Sa macOS, ang `"warning"` at `"error"` ay nagpapakita ng kaparehong babalang icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opsyonal) - index ng pipindutin sa hanay ng mga pipindutin na mapipili nang naka-default kapag ang mensaheng kahon ay bumubukas.
  * `title` String (opsyonal) - titulo ng kahon ng mensahe, ang ilang mga plataporma ay hindi ipinapakita ito.
  * `message` String - nilalaman ng kahon ng mensahe.
  * `detail` String (opsyonal) - Karagdagang impormasyon ukol sa mensahe.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal)
  * `cancelId` Integer (opsyonal) - Ang index ng pipindutin na gagamitin sa pagkakansela ng dialog, gamit ang `Esc` na key. Sa default, nakatalaga ito sa unang pipindutin na may "cancel"o "no" bilang lebel. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opsyonal) - Sa Windows, susubukang alamin ng Electron kung alin sa `buttons` ang karaniwang mga pipindutin (katulad ng "Cancel" o "Yes"), at ipinapakita ang iba bilang mga command link sa dialog. Pinapakita nito ang dialog sa istilo ng modernong mga Windows app. Kung ayaw mo ng ganitong galaw, pwede mong i-set ang `noLink` sa `true`.
  * `normalizeAccessKeys` Boolean (opsyonal) - ini-normalize ang mga key na pang-keyboard access sa mga plataporma. Ang default ay `false`. Ang pagpapagana nito ay pumapalit at ginagamit sa mga lebel ng mga pipindutin para sa paglalagay ng keyboard shortcut access key at ang mga lebel ay isasalin upang maayos silang gagana sa bawat plataporma, at ang mga karakter ay tinanggal sa macOS, isinalin sa `_` sa Linux at hindi pinakialaman sa Windows. Halimbawa, ang isang lebel ng pipindutin na `Vie&w` ay isasalin sa `Vie_w` sa Linux at `View` sa macOS at pwedeng piliin sa pamamagitan ng `Alt-W` sa Windows at Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal. If `browserWindow` is not shown dialog will not be attached to it. In such case It will be displayed as independed window.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `type` String (opsyonal) - Pwedeng `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. Sa Windows, ang `"question"` ay nagpapakita ng icon na pareho sa `"info"`, maliban kung nag-set ka ng icon gamit ang opsyong `"icon"`. Sa macOS, ang `"warning"` at `"error"` ay nagpapakita ng kaparehong babalang icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opsyonal) - index ng pipindutin sa hanay ng mga pipindutin na mapipili nang naka-default kapag ang mensaheng kahon ay bumubukas.
  * `title` String (opsyonal) - titulo ng kahon ng mensahe, ang ilang mga plataporma ay hindi ipinapakita ito.
  * `message` String - nilalaman ng kahon ng mensahe.
  * `detail` String (opsyonal) - Karagdagang impormasyon ukol sa mensahe.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (opsyonal)
  * `cancelId` Integer (opsyonal) - Ang index ng pipindutin na gagamitin sa pagkakansela ng dialog, gamit ang `Esc` na key. Sa default, nakatalaga ito sa unang pipindutin na may "cancel"o "no" bilang lebel. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opsyonal) - Sa Windows, susubukang alamin ng Electron kung alin sa `buttons` ang karaniwang mga pipindutin (katulad ng "Cancel" o "Yes"), at ipinapakita ang iba bilang mga command link sa dialog. Pinapakita nito ang dialog sa istilo ng modernong mga Windows app. Kung ayaw mo ng ganitong galaw, pwede mong i-set ang `noLink` sa `true`.
  * `normalizeAccessKeys` Boolean (opsyonal) - ini-normalize ang mga key na pang-keyboard access sa mga plataporma. Ang default ay `false`. Ang pagpapagana nito ay pumapalit at ginagamit sa mga lebel ng mga pipindutin para sa paglalagay ng keyboard shortcut access key at ang mga lebel ay isasalin upang maayos silang gagana sa bawat plataporma, at ang mga karakter ay tinanggal sa macOS, isinalin sa `_` sa Linux at hindi pinakialaman sa Windows. Halimbawa, ang isang lebel ng pipindutin na `Vie&w` ay isasalin sa `Vie_w` sa Linux at `View` sa macOS at pwedeng piliin sa pamamagitan ng `Alt-W` sa Windows at Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box, it will block the process until the message box is closed.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

### `dialog.showErrorBox(titulo, nilalaman)`

* `title` String - ang titulo na ipapakita sa kahon ng mali.
* `content` String - Ang tekstong nilalaman na ipapakita sa kahon ng mali.

Ipinapakita ang isang modal na dialog na nagpapakita ng isang mensahe ng kamalian.

Ang API na ito ay maaaring ligtas kung tawagin bago ang `ready` na event na inilalabas ng `app` na modyul, ito ay kadalasang ginagamit sa pag-uulat ng mga kamalian sa unang antas ng pagsisimula. Kapag tinawag bago ang app `ready` na event sa Linux, ang mensahe ay ilalabas sa stderr, at walang GUI na dialog ang magpapakita.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - Ang sertipiko ng pagtiwala/pag-import.
  * `message` String - Ang mensaheng ipapakita sa tagagamit.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

Sa macOS, ipinapakita nito ang isang modal na dialog na nagpapakita ng isang mensahe at impormasyon sa sertipiko, at nagbibigay sa gumagamit ng pagpipiliang magtiwala at mag-import ng certificate. Kapag magbibigay ka ng `browserWindow` na argumento, ang dialog ay malalakip sa parent na window, na ginagawa itong modal.

Sa Windows, mas limitado ang mga pagpipilian, dahil sa mga Win32 na API na ginamit:

* Ang `message` na argumento ay hindi ginagamit, dahil ang OS nito ay nagbibigay ng sarili nitong kompirmasyong dialog.
* Ang `browserWindow` na argumento ay pinabayaan dahil hindi posible ang paglikha ng kompirmasyong dialog modal na ito.

## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |

## Mga Sheet

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Maaari mong tawagin ang `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` upang baguhin ang offset mula sa window frame kung saan nakalakip ang mga sheet.
