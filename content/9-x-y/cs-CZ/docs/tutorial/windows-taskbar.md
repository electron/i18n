# Panel úkolů Windows

Electron má API pro konfiguraci ikony aplikace v panelu úkolů Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList

Windows umožňuje aplikacím definovat vlastní kontextové menu, které se zobrazí když uživatelé klepnou pravým tlačítkem myši na ikonu aplikace v panelu úloh. Toto kontextové menu se nazývá `JumpList`. V `Úkolách` kategorie JumpList, specifikujete vlastní akce podle MSDN:

> Aplikace definují úkoly založené jak na funkcích programu, tak na klíčových věcech, které má uživatel s nimi dělat. Úkoly by měly být bez kontextu, v , že aplikace nemusí být spuštěna, aby fungovala. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. aplikace by neměla zatěžovat menu s pokročilými funkcemi, které standardní uživatelé nebudou potřebovat nebo jednorázové akce, jako je registrace. Nepoužívejte úkoly pro propagační předměty, jako jsou vylepšení nebo speciální nabídky.
> 
> Důrazně se doporučuje, aby byl seznam úkolů statický. Měla by zůstat stejná bez ohledu na stav nebo stav žádosti. I když je možné seznam dynamicky změnit, měli byste zvážit, že by to mohlo zmást uživatele, který neočekává změnu části cílového seznamu .

__Úkoly aplikace Internet Explorer:__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

Na rozdíl od dokového menu v macOS což je skutečné menu, úkoly uživatelů v systému Windows fungují jako zástupce aplikací, když uživatel klikne na úlohu, program bude spuštěn s zadanými argumenty.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: proces. xecPath,
    argumenty: '--new-window',
    iconPath: process. xecPath,
    ikonový index: 0,
    název: 'New Window',
    popis: 'Vytvořit nové okno'
  }
])
```

Chcete-li vymazat váš seznam úkolů, zavolejte `app.setUserTasks` s prázdným polem:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Uživatelské úkoly se budou zobrazovat i po uzavření aplikace, takže ikona a cesta programu by měla existovat, dokud nebude aplikace odinstalována.


## Thumbnail Toolbars

V systému Windows můžete přidat náhledovou lištu se zadanými tlačítky v hlavním panelu rozvržení okna. Umožňuje uživatelům přístup k příkazu bez obnovení nebo aktivace okna.

Z MSDN je ilustrativní:

> Tento panel nástrojů je známým běžným ovládáním standardního panelu nástrojů. Má maximálně sedm tlačítek. ID každého tlačítka, obrázek, popisek nástrojů a stav jsou definovány ve struktuře, která je poté předána do panelu úkolů. Aplikace může zobrazit, povolit, zakázat nebo skrýt tlačítka na náhledové liště podle potřeby podle aktuálního stavu .
> 
> Windows Media Player může například nabízet standardní mediální dopravní prvky , jako je přehrávání, pozastavení, ztlumit a zastavit.

__Panel nástrojů náhledu Windows Media Player:__

![hráč](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

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

Chcete-li vyčistit miniatury tlačítek, stačí zavolat `BrowserWindow.setThumbarButtons` s prázdným polem:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Ikona překrytí v hlavním panelu

V systému Windows může tlačítko na hlavní liště použít malý překryv pro zobrazení aplikace podle seznamu z MSDN:

> Překrytí ikony slouží jako kontextové oznámení o stavu a jsou určeny k popření potřeby samostatné ikony stavu oznamovací oblasti sdělit tyto informace uživateli. Například nový stav e-mailu ve společnosti Microsoft Outlook, který se v současné době zobrazuje v oblasti oznámení, nyní lze indikovat pomocí překrytí na tlačítku hlavního panelu. Opět musíte během svého vývojového cyklu rozhodnout, která metoda je nejlepší pro vaši aplikaci. Ikony potahů jsou určeny k poskytování důležitého, dlouhodobého stavu nebo oznámení, jako je stav sítě, stav messenger nebo nový e-mail. Uživatel by neměl být prezentován s neustále se měnícími potahy nebo animacemi.

__Překrytí na tlačítku hlavního panelu:__

![Překrytí tlačítkem na hlavní liště](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Popis pro potahy')
```


## Blesk

V systému Windows můžete zvýraznit tlačítko na hlavní liště pro pozornost uživatele. To se podobá odsunutí ikony doku na macOS. Z referenční dokumentace MSDN

> Obvykle je okno nainstalováno tak, aby uživatel informoval, že okno vyžaduje pozornost, ale že v současné době nemá zaměření na klávesnici.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Nezapomeňte zavolat metodu `flashFrame` s `falešnou` , abyste vypnuli flash. V výše uvedeném příkladu se volá, když se okno zaostří, ale můžete použít časový limit nebo jinou událost k jeho vypnutí.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
