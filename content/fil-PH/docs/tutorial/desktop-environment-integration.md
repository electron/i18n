# Ang Pag-iintegrate ng Desktop Environment

Ang iba't-ibang mga operating system ay nagbibigay ng iba't-ibang mga katangian para sa pag-iintegrate ng mga aplikasyong pang-desktop sa mga desktop environment. Halimbawa, sa Windows, ang mga aplikasyon ay pwedeng maglagay ng mga shortcut sa JumpList ng task bar, at sa Mac, ang mga aplikasyon ay nakakapaglagay ng karaniwang menu sa dock menu.

Ang gabay na ito ay nagpapaliwanag kung paano i-integrate ang iyong aplikasyon sa mga desktop environment na iyon gamit ang mga Electron API.

## Mga Paalala

Tingnan ang [Mga Paalala](notifications.md)

## Mga Kagagamit lang na Dokumento (Windows & macOS)

Ang Windows at macOS ay nagbibigay ng madaling access sa listahan ng mga kagagamit lang na mga dokumento na binuksan gamit ang aplikasyon sa pamamagitan ng JumpList o dock menu.

**JumpList:**

![Kagagamit lang na mga file sa JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Dock Menu ng Aplikasyon:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Pwede mong gamitin sa pagdagdag ng file sa kagagamit lang na mga dokumento ang [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) na API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

At pwede mong gamitin ang [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API upang linisin ang listahan ng kagagamit lang na mga dokumento:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Mga Tala ng Windows

Upang magamit ang katangiang ito sa Windows, kailangang ang aplikasyon mo ay nakarehistro bilang tagahawak ng uri ng file ng dokumento, kung hindi ang file ay hindi makikita sa JumpList kahit na nadagdag mo na ito. Makikita mo lahat tungkol sa pagrehistro ng iyong aplikasyon sa [Application Registration](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Kung ini-click ng isang tagagamit ang isang file mula sa JumpList, ang isang instance ng iyang aplikasyon ay masisimulan gamit ang isang path ng file na idinadagdag bilang argumento ng command line.

### Mga Tala ng macOS

Kung ang isang file ay hinihingi mula sa menu ng kagagamit lamang na mga dokumento, ang `open-file` na pangyayari ng module ng `app` ay mailalabas para dito.

## Karaniwang Dock Menu (macOS)

Nagbibigay daan ang mga macOS na tagabuo sa pagtukoy sa karaniwang menu para sa dock, na madalas na naglalaman ng mga shortcut para sa karaniwang ginagamit na katangian ng iyong aplikasyon:

**Ang Dock Menu ng Terminal.app:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Upang i-set ang iyong karaniwang dock menu, pwede mong gamitin ang `app.dock.setMenu` na API, na magagamit lamang sa macOS:

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)
```

## Mga Gawain ng Tagagamit (Windows)

Sa Windows, pwede mong tukuyin ang mga karaniwang aksyon sa kategoryang `Tasks` ng JumpList, ayon sa sinabi ng MSDN:

> Ang mga aplikasyon ay naglalarawan sa mga gawain depende sa mga katangian ng programa at ng pangunahing mga bagay na gagawin ng mga tagagamit sa kanila. Ang mga gawain ay dapat walang konteksto, sa ganyan, hindi na kailangan ng aplikasyon na nakatakbo para lang gumana sila. Sila dapat ay ang pinakakaraniwang gawaing pang-istatistika na ginagawa ng normal na tagagamit sa isang aplikasyon, tulad ng paglikha ng isang mensahe sa email o pagbukas ng kalendaryo sa mail program, paggawa ng bagong dokumento sa isang word processor, maglunsad ng aplikasyon sa isang pamamaraan, o paglunsad ng isa sa kanyang mga subcommand. Hindi dapat ginugulo ng isang aplikasyon ang menu ng makabagong mga katangian na hindi kinakailangan ng karaniwang tagagamit o isang beses lang na mga aksyon tulad ng pagrerehistro. Wag gamitin ang mga gawain para sa pagtataguyod ng mga aytem katulad ng mga upgrade o natatanging mga alok.
> 
> Inirerekomenda na ang dapat nakatigil lang ang listahan ng mga gawain. Dapat hindi ito nagbabago ano man ang estado ng aplikasyon. Pwede mang baguhin ang listahan sa dinamikong paraan, dapat isaalang-alang na pwedeng makalilito ito sa mga tagagamit na hindi inaasahan ang pagbabago sa parte ng listahan ng destinasyon.

**Mga Gawain ng Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

Hindi tulad ng dock menu sa macOS na isang tunay na menu, ang mga gawain ng tagagamit sa Windows ay parang mga shortcut ng aplikasyon na kung ang tagagamit ay nagclick sa isang gawain, ang program na may sumusunod na argumento ay pagaganahin.

Upang itakda ang ang mga gawain ng tagagamit para sa iyong aplikasyon, pwede mong gamitin ang [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) na API:

```javascript
const {app} = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

Upang linisin ang listahan ng mga gawain, tawagin lang ang `app.setUserTasks` gamit ang array na walang laman:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

Ang mga gawain ng tagagamit ay magpapakita parin kahit na nakasara na ang iyong aplikasyon, kaya ang icon at path ng program na itinakda para sa isang gawain ay nanatili pa hanggang i-uninstall na ang aplikasyon.

## Mga Thumbnail Toolbar

Sa Windows, maaari kang magdagdag ng isang thumbnail toolbar na may partikular na mga pipindutin sa isang taskbar na layout ng isang window ng aplikasyon. Binibigyang-daan nito ang mga tagagamit na ma-access ang isang partikular na utos ng window habang walang ibinabalik o pinapaganang window.

Mula sa MSDN, inihahayag ito:

> Ang toolbar ay isa lamang karaniwang control ng istandard na toolbar. Mayroon itong hindi lalagpas sa pitong pipindutin. Ang bawat ID ng pipindutin, imahe, tooltip, at estado ay inilarawan sa isang balangkas, na ipinapasa sa taskbar. Ang aplikasyon ay nakapagpakita, nagpapagana, nagpapatigil, o nagtatago ng mga pipindutin mula sa thumbnail toolbar na itinutugon ng kanyang kasalukuyang estado.
> 
> Halimbawa, ang Windows Media Player ay possibleng magbibigay ng istandard na kontrol sa paglilipat ng media, katulad ng play, pause, mute at stop.

**Ang Thumbnail Toolbar ng Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Pwede mong gamiting ang [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) para itakda ang thumbnail toolbar sa iyong aplikasyon:

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Upang alisin ang thumbnail toolbar na pipindutin, tawagin lang ang `BrowserWindow.setThumbarButtons` gamit ang blankong array:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Mga Shortcut sa Unity Launcher (Linux)

Sa Unity, pwede kang magdagdag ng mga entry sa kanyang launcher sa pamamagitan ng pagbabago sa `.desktop` na file, tingnan ang [Pagdagdag ng mga Shortcut sa isang Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Ang mga Launcher shortcut ng Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Ang Progress Bar sa Taskbar (Windows, macOS, Unity)

Sa Windows, may isang pipindutin na pwedeng magagamit upang ipakita ang progress bar. Binibigyang daan nito ang isang window na makakapagbigay ng impormasyon sa katayuan sa isang tagagamit nang hindi na kailangang palitan ang window nito.

Sa macOs, ang progress bar ay maipapakita bilang isang bahagi ng dock icon.

Ang Unity DE ay mayroon ding kaparehas na katangian na nagpapahintulot nito na itukoy ang progress bar sa launcher.

**Progress bar sa taskbar na pipindutin:**

![Progress bar ng Taskbar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Upang itakda ang progress bar para sa isang Window, pwedeng gamitin ang [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) na API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Mga Icon Overlay sa Taskbar (Windows)

Sa Windows, ang isang taskbar na pipindutin ay pwedeng gumamit ng maliit na overlay upang ipakita ang katayuan ng isang aplikasyon, ayon sa sinabi ng MSDN:

> Ang mga icon overlay ay nagsisilbi bilang kontestwal na paalala ng katayuan, at para tanggalin ang pangangailangan sa naiibang icon na pang-estado ng lugar ng paalala upang mailahad ang impormasyon sa gumagamit. Halimbawa, ang isang bagong estado ng mail sa Microsoft Outlook, na kasalukuyang ipinapakita sa lugar ng paalala, ay pwede nang ilagay sa pamamagitan ng isang overlay sa pipindutin sa taskbar. Gaya ng dati, kailangan magdesisyon ka na habang nagbubuo ka pa sa kung anong pamamaraan ang nababagay sa iyong aplikasyon. Ang mga overlay icon ay para sa paghahatid ng mahalaga at matagal nang katayuan o mga paalala, katulad ng estado ng network, estado ng messenger, o bagong mail. Ang tagagamit ay hindi dapat pinapakitaan ng pabago-bagong mga overlay o animation.

**Ang Overlay sa taskbar na pipindutin:**

![Ang Overlay sa Taskbar na pipindutin](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Upang itakda ang overlay icon para sa isang window, pwede mong gamitin ang [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) na API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame ( Sa Windows)

Sa Windows, pwede mong i-highlight ang taskbar na pipindutin upang makuha ang atensyon ng gumagamit. Katulad ito sa bouncing sa dock icon sa macOS. Mula sa isang pangsangguniang dokumentasyon sa MSDN:

> Karaniwang ipinalalabas ang isang window upang ipaalam sa gumagamit na ang window ay nangangailangan ng atensyon pero hindi pa ito nakapansin sa keyboard.

Upang ilabas ang BrowserWindow na pipindutin sa taskbar, pwede mong gamitin ang [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) na API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Wag kalimutang tawagin ang `flashFrame` na pamamaraan kasama ang `false` upang itigil ang flash. Sa halimbawa sa taas, itinatawag ito kung ang window ay naging pokus na, pero baka kailangan mong gumamit ng isang timeout o iba pang pangyayari para itigil ito.

## Nirerepresentang File ng Window (macOS)

Sa macOS, ang isang window ay pwedeng magtakda ng nirerepresentang file, upang ang icon nito ay lalabas sa title bar, at kung ang mga gumagamit ay nag Command-Click o Control-Click sa titulo, ang isang path popup ay lalabas.

Pwede mo ring itakda ang binagong katayuan ng isang window upang ang file icon ay makapagpakita na ang dokumento sa window nito ay nabago na.

**Narepresentang menu ng file popup:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

Upang itakda ang narepresentang file ng window, pwede mong gamitin ang [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) at [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) na mga API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Paghila ng mga file palabas sa window

Para sa ilang uri ng mga app na nagkokontrol sa mga file, mahalagang makakahila ka ng mga file mula sa Electron papunta sa ibang mga app. Upang mailunsad ang katangiang ito sa iyong app, kailangan mong tawagin ang `webContents.startDrag(item)` na API sa `ondragstart` na pangyayari.

Sa web na pahina:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Sa pangunahing proseso:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```