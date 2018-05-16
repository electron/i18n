# I-display ang native dialogs upang mabuksan ang naka save na files, alerting, at iba pa.

> Ipinapakita ang mga dialog ng sarilihang sistema para sa pagbubukas at pagse-seyb ng mga file, pag-aalerto, atbp.

Proseso: [Main](../glossary.md#main-process)

Isang halimbawa ng pagpapakita ng isang dialog sa pagpili ng maraming mga file at mga direktoryo:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

Ang Dialog ay binuksan mula sa pangunahing thread ng Electron. Kung gusto mong gamitin ang dialog mula sa renderer na proseso, tandaang i-access ito gamit ang remote:

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## Mga Pamamaraan

Ang `dialog` na modyul ay mayroong sumusunod na mga pamamaraan:

### `dialog.showOpenDialog([browserWindow, ]mga opsyon[, callback])`

* `browserWindow` BrowserWindow (optional)
* `mga pagpipilian` Bagay 
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal)
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa, kapag napabayaang bakante, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `properties` String[] (opsyonal) - Naglalaman ng kung aling mga katangian ng dialog ang dapat na gagamitin. Ang mga sumusunod na halaga ay suportado: 
    * `openFile` - Nagpapahintulot na mapili ang mga file.
    * `openDirectory` - Nagpapahintulot na mapili ang mga direktoryo.
    * `multiSelections` - Nagpapahintulot na mapili ang mga ang maraming mga path.
    * `showHiddenFiles` - Ipakita ang mga nakatagong file sa dialog.
    * `createDirectory` - Allow creating new directories from dialog. *macOS*
    * `promptToCreate` - Prompt for creation if the file path entered in the dialog does not exist. Hindi nito aktwal na nilikha ang file sa path pero pinapayagan ang mga hindi nakikitang mga path na maibalik na dapat nilikha ng aplikasyon. *Windows*
    * `noResolveAliases` - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path. *macOS*
    * `treatPackageAsDirectory` - Treat packages, such as `.app` folders, as a directory instead of a file. *macOS*
  * `message` String (opsyonal) *macOS* - mensaheng nagpapakita ng mga kahong pang-input sa itaas.
* `callback` Function (opsyonal) 
  * `filePaths` String[] - Isang hanay ng mga path ng file na pinili ng gumagamit

Ibinabalik ang `String[]`, isang hanay ng mga path ng file na napili ng gumagamit, kung ang callback ay ibinigay, ibinabalik nito ang `undefined`.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

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

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`

**Tandaan:** Sa Windows at Linux, ang isang bukas na dialog ay hindi pwedeng sabay na tagapili ng file at tagapili ng direktoryo, upang kapag i-set mo ang `properties` sa `['openFile', 'openDirectory']` sa mga platapormang ito, ang isang tagapili ng direktoryo ay maipapakita.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (optional)
* `options` Bagay 
  * `title` String (opsyonal)
  * `defaultPath` String (opsyonal) - isang ganap na path ng direktoryo, ganap na path ng file, o ang pangalan ng file na gagamitin pag naka-default.
  * `buttonLabel` String (opsyonal) - Karaniwang lebel para sa kompirmasyong pipindutian, na kapag naiwang walang laman, ang default na lebel ang gagamitin.
  * `filters` [FileFilter[]](structures/file-filter.md) (opsyonal)
  * `message` String (opsyonal) *macOS* - mensaheng ipinapakita sa ibabaw ng mga tekstong field.
  * `nameFieldLabel` String (opsyonal) *macOS* - karaniwang lebel para sa mga tekstong ipinapakita sa harapan ng filename na tekstong field.
  * `showsTagField` Boolean (opsyonal) *macOS* - Nagpapakita sa mga tag na input box, nagde-default sa `true`.
* `callback` Function (opsyonal) 
  * `filename` String

Ibinabalik ang `String`, ang path ng file na pinili ng gumagamit, kung ang isang callback ay ibinigay, ibinabalik nito ang `undefined`.

Ang `browserWindow` na argumento ay nagbibigay-daan sa dialog na ilakip ang kanyang sarili sa isang parent na window na ginagawa itong modal.

Ang `filters` ay nagtitiyak sa hanay ng mga uri ng file na maaaring maipakita, tingnan ang `dialog.showOpenDialog` bilang isang halimbawa.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (optional)
* `options` Bagay 
  * `type` String (opsyonal) - Pwedeng `"none"`, `"info"`, `"error"`, `"question"` o `"warning"`. Sa Windows, ang `"question"` ay nagpapakita ng icon na pareho sa `"info"`, maliban kung nag-set ka ng icon gamit ang opsyong `"icon"`. Sa macOS, ang `"warning"` at `"error"` ay nagpapakita ng kaparehong babalang icon.
  * `buttons` String[] (opsyonal) - isang hanay ng mga teksto para sa mga pipindutin. Sa Windows, ang isang blankong hanay ay magreresulta sa isang pipindutin na may lebel na "OK".
  * `defaultId` Integer (opsyonal) - index ng pipindutin sa hanay ng mga pipindutin na mapipili nang naka-default kapag ang mensaheng kahon ay bumubukas.
  * `title` String (opsyonal) - titulo ng kahon ng mensahe, ang ilang mga plataporma ay hindi ipinapakita ito.
  * `message` String - nilalaman ng kahon ng mensahe.
  * `detail` String (opsyonal) - Karagdagang impormasyon ukol sa mensahe.
  * `checkboxLabel` String (opsyonal) - Kapag ibinigay, ang mensaheng kahon ay maglalakip ng isang checkbox na may lebel. Ang estado ng checkbox ay pwede tingnan lamang kapag gumagamit ng `callback`.
  * `checkboxChecked` Boolean (optional) - paunang naka-check na estado ng checkbox. `false` ito sa default.
  * `icon` [NativeImage](native-image.md) (opsyonal)
  * `cancelId` Integer (opsyonal) - Ang index ng pipindutin na gagamitin sa pagkakansela ng dialog, gamit ang `Esc` na key. Sa default, nakatalaga ito sa unang pipindutin na may "cancel"o "no" bilang lebel. Kung ang mayroong mga ganyang pipinduting may lebel at ang opsyon na ito ay hindi na-set, ang `` ay gagamitin bilang pabalik na halaga o sagot sa callback. Ang opsyon na ito ay napapabayaan sa Windows.
  * `noLink` Boolean (opsyonal) - Sa Windows, susubukang alamin ng Electron kung alin sa `buttons` ang karaniwang mga pipindutin (katulad ng "Cancel" o "Yes"), at ipinapakita ang iba bilang mga command link sa dialog. Pinapakita nito ang dialog sa istilo ng modernong mga Windows app. Kung ayaw mo ng ganitong galaw, pwede mong i-set ang `noLink` sa `true`.
  * `normalizeAccessKeys` Boolean (opsyonal) - ini-normalize ang mga key na pang-keyboard access sa mga plataporma. Ang default ay `false`. Ang pagpapagana nito ay pumapalit at ginagamit sa mga lebel ng mga pipindutin para sa paglalagay ng keyboard shortcut access key at ang mga lebel ay isasalin upang maayos silang gagana sa bawat plataporma, at ang mga karakter ay tinanggal sa macOS, isinalin sa `_` sa Linux at hindi pinakialaman sa Windows. Halimbawa, ang isang lebel ng pipindutin na `Vie&w` ay isasalin sa `Vie_w` sa Linux at `View` sa macOS at pwedeng piliin sa pamamagitan ng `Alt-W` sa Windows at Linux.
* `callback` Function (opsyonal) 
  * `response` Number - The index of the button that was clicked
  * `checkboxChecked` Boolean - ang binagong estado ng checkbox kapang ang `checkboxLabel` at na-set. Kung hindi, ito ay `false`.

Ibinabalik ang `Integer`, ang index ng napindot na pipindutin, kung ang isang callback ay naibigay, undefined ang ibinabalik nito.

Nagpapakita ng isang mensaheng kahon, inaantala nito ang proseso hanggang nasara na ang mensaheng kahon. Ibinabalik nito ang index ng napindot na pipindutin.

Ang `browserWindow` na argumento ay pinahihintulutan ang dialog na ilakip ang kanyang sarili sa isang parent window, na ginagawa itong modal.

Kung ang isang `callback` ay naipasa, hindi pipigilan ng dialog ang proseso. Ang API na tawag ay magiging asynchronous at ang resulta ay ipapasa gamit ang `callback(response)`.

### `dialog.showErrorBox(titulo, nilalaman)`

* `title` String - The title to display in the error box
* `content` String - The text content to display in the error box

Ipinapakita ang isang modal na dialog na nagpapakita ng isang mensahe ng kamalian.

Ang API na ito ay maaaring ligtas kung tawagin bago ang `ready` na event na inilalabas ng `app` na modyul, ito ay kadalasang ginagamit sa pag-uulat ng mga kamalian sa unang antas ng pagsisimula. Kapag tinawag bago ang app `ready` na event sa Linux, ang mensahe ay ilalabas sa stderr, at walang GUI na dialog ang magpapakita.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` BrowserWindow (optional)
* `options` Bagay 
  * `certificate` [Certificate](structures/certificate.md) - Ang sertipiko ng pagtiwala/pag-import.
  * `message` String - Ang mensaheng ipapakita sa tagagamit.
* `callback` na Function

Sa macOS, ipinapakita nito ang isang modal na dialog na nagpapakita ng isang mensahe at impormasyon sa sertipiko, at nagbibigay sa gumagamit ng pagpipiliang magtiwala at mag-import ng certificate. Kapag magbibigay ka ng `browserWindow` na argumento, ang dialog ay malalakip sa parent na window, na ginagawa itong modal.

Sa Windows, mas limitado ang mga pagpipilian, dahil sa mga Win32 na API na ginamit:

* Ang `message` na argumento ay hindi ginagamit, dahil ang OS nito ay nagbibigay ng sarili nitong kompirmasyong dialog.
* Ang `browserWindow` na argumento ay pinabayaan dahil hindi posible ang paglikha ng kompirmasyong dialog modal na ito.

## Mga Sheet

On macOS, dialogs are presented as sheets attached to a window if you provide a `BrowserWindow` reference in the `browserWindow` parameter, or modals if no window is provided.

Maaari mong tawagin ang `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` upang baguhin ang offset mula sa window frame kung saan nakalakip ang mga sheet.