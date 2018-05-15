# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar-windows), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Ang mga aplikasyon ay naglalarawan sa mga gawain depende sa mga katangian ng programa at ng pangunahing mga bagay na gagawin ng mga tagagamit sa kanila. Ang mga gawain ay dapat walang konteksto, sa ganyan, hindi na kailangan ng aplikasyon na nakatakbo para lang gumana sila. Sila dapat ay ang pinakakaraniwang gawaing pang-istatistika na ginagawa ng normal na tagagamit sa isang aplikasyon, tulad ng paglikha ng isang mensahe sa email o pagbukas ng kalendaryo sa mail program, paggawa ng bagong dokumento sa isang word processor, maglunsad ng aplikasyon sa isang pamamaraan, o paglunsad ng isa sa kanyang mga subcommand. Hindi dapat ginugulo ng isang aplikasyon ang menu ng makabagong mga katangian na hindi kinakailangan ng karaniwang tagagamit o isang beses lang na mga aksyon tulad ng pagrerehistro. Wag gamitin ang mga gawain para sa pagtataguyod ng mga aytem katulad ng mga upgrade o natatanging mga alok.
> 
> Inirerekomenda na ang dapat nakatigil lang ang listahan ng mga gawain. Dapat hindi ito nagbabago ano man ang estado ng aplikasyon. Pwede mang baguhin ang listahan sa dinamikong paraan, dapat isaalang-alang na pwedeng makalilito ito sa mga tagagamit na hindi inaasahan ang pagbabago sa parte ng listahan ng destinasyon.

**Mga Gawain ng Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

Hindi tulad ng dock menu sa macOS na isang tunay na menu, ang mga gawain ng tagagamit sa Windows ay parang mga shortcut ng aplikasyon na kung ang tagagamit ay nagclick sa isang gawain, ang program na may sumusunod na argumento ay pagaganahin.

Upang itakda ang ang mga gawain ng tagagamit para sa iyong aplikasyon, pwede mong gamitin ang [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) na API:

```javascript
const { app } = require('electron')
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

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Ang mga gawain ng tagagamit ay magpapakita parin kahit na nakasara na ang iyong aplikasyon, kaya ang icon at path ng program na itinakda para sa isang gawain ay nanatili pa hanggang i-uninstall na ang aplikasyon.

## Mga Thumbnail Toolbar

Sa Windows, maaari kang magdagdag ng isang thumbnail toolbar na may partikular na mga pipindutin sa isang taskbar na layout ng isang window ng aplikasyon. Binibigyang-daan nito ang mga tagagamit na ma-access ang isang partikular na utos ng window habang walang ibinabalik o pinapaganang window.

Mula sa MSDN, inihahayag ito:

> This toolbar is the familiar standard toolbar common control. Mayroon itong hindi lalagpas sa pitong pipindutin. Ang bawat ID ng pipindutin, imahe, tooltip, at estado ay inilarawan sa isang balangkas, na ipinapasa sa taskbar. Ang aplikasyon ay nakapagpakita, nagpapagana, nagpapatigil, o nagtatago ng mga pipindutin mula sa thumbnail toolbar na itinutugon ng kanyang kasalukuyang estado.
> 
> Halimbawa, ang Windows Media Player ay possibleng magbibigay ng istandard na kontrol sa paglilipat ng media, katulad ng play, pause, mute at stop.

**Ang Thumbnail Toolbar ng Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Pwede mong gamiting ang [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) para itakda ang thumbnail toolbar sa iyong aplikasyon:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Upang alisin ang thumbnail toolbar na pipindutin, tawagin lang ang `BrowserWindow.setThumbarButtons` gamit ang blankong array:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

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

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Karaniwang ipinalalabas ang isang window upang ipaalam sa gumagamit na ang window ay nangangailangan ng atensyon pero hindi pa ito nakapansin sa keyboard.

Upang ilabas ang BrowserWindow na pipindutin sa taskbar, pwede mong gamitin ang [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) na API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Wag kalimutang tawagin ang `flashFrame` na pamamaraan kasama ang `false` upang itigil ang flash. Sa halimbawa sa taas, itinatawag ito kung ang window ay naging pokus na, pero baka kailangan mong gumamit ng isang timeout o iba pang pangyayari para itigil ito.