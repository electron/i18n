# Ang Pag-iintegrate ng Desktop Environment

Ang iba't-ibang mga operating system ay nagbibigay ng iba't-ibang mga katangian para sa pag-iintegrate ng mga aplikasyong pang-desktop sa mga desktop environment. Halimbawa, sa Windows, ang mga aplikasyon ay pwedeng maglagay ng mga shortcut sa JumpList ng task bar, at sa Mac, ang mga aplikasyon ay nakakapaglagay ng karaniwang menu sa dock menu.

Ang gabay na ito ay nagpapaliwanag kung paano i-integrate ang iyong aplikasyon sa mga desktop environment na iyon gamit ang mga Electron API.

## Mga Paalala

Tingnan ang [Mga Paalala](notifications.md)

## Mga Kagagamit lang na Dokumento (Windows & macOS)

Ang Windows at macOS ay nagbibigay ng madaling access sa listahan ng mga kagagamit lang na mga dokumento na binuksan gamit ang aplikasyon sa pamamagitan ng JumpList o dock menu.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

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

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**Progress bar in taskbar button:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

To set the progress bar for a Window, you can use the [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icon Overlays in Taskbar (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Represented File of Window (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

In web page:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

In the main process:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```