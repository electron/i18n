# Bară de activități Windows

Electron are API-uri pentru a configura pictograma aplicației în bara de activități Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpListă

Windows permite aplicațiilor să definească un meniu de context personalizat care apare atunci când utilizatorii dau click dreapta pe pictograma aplicației în bara de activitate. Acea meniu de context se numește `JumpList`. Specificați acțiuni personalizate în categoria `Sarcini` din JumpList, așa cum sunt citate de MSDN:

> Aplicațiile definesc sarcinile în funcție de caracteristicile programului și de cheia lucruri pe care un utilizator le poate face cu ele. Sarcinile ar trebui să fie fără context, în că aplicația nu trebuie să ruleze pentru ca ei să funcționeze. Ei ar trebui, de asemenea, să fie cele mai comune acțiuni din punct de vedere statistic pe care un utilizator normal le-ar realiza într-o aplicație, cum ar fi compune un mesaj de e-mail sau deschide calendarul într-un program de e-mail, creează un document nou într-un procesor de cuvinte lansează o aplicație într-un anumit mod, sau lansează una dintre sub-comenzile sale. O aplicație nu ar trebui să ascundă meniul cu caracteristici avansate pe care utilizatorii standard nu vor avea nevoie sau acțiuni o singură dată, cum ar fi înregistrarea. Nu folosi sarcini pentru elemente promoționale cum ar fi upgrade-uri sau oferte speciale.
> 
> Se recomandă cu tărie ca lista de sarcini să fie statică. Ar trebui să rămână la fel indiferent de starea sau starea aplicației. Deşi este posibil să variezi lista în mod dinamic, ar trebui să considerați că acest lucru ar putea să confunde utilizatorul care nu se așteaptă ca acea parte din lista de destinații să se modifice modifice.

__Sarcini ale Internet Explorer:__

![NR](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

Spre deosebire de meniul de andocare din macOS care este un meniu real, sarcinile utilizatorului în Windows funcţionează ca nişte comenzi rapide ale aplicaţiei astfel încât atunci când utilizatorul apasă o sarcină, un program va fi executat cu argumentele specificate.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: proces. xecPath,
    arguments: '--new-window',
    iconPath: process. xecPath,
    iconIndex: 0,
    titl: 'Fereastră nouă',
    Descriere: 'Creează o fereastră nouă'
  }
])
```

Pentru a curăța lista de sarcini, apelați `app.setUserTasks` cu un array gol:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Sarcinile utilizatorilor vor fi afișate în continuare chiar și după închiderea aplicației tale, așa că pictograma și calea programului specificată pentru o sarcină ar trebui să existe până când aplicația ta este dezinstalată.


## Thumbnail Toolbars

Pe Windows puteţi adăuga o bară de instrumente miniatură cu butoanele specificate într-o bară de activităţi a unei ferestre a aplicaţiei. Acesta oferă utilizatorilor o modalitate de a accesa o anumită fereastră fără a restaura sau a activa fereastra.

De la MSDN, este ilustrat:

> Această bară de instrumente este controlul comun standard al barei de instrumente. Are maxim şapte butoane. ID-ul fiecărui buton, imaginea, setarea și starea sunt definite într-o structură, care este apoi transmisă la bara de taskar. Aplicația poate afișa, activa, dezactiva, sau ascunde butoanele din bara de instrumente miniatură după cum este necesar starea sa curentă.
> 
> De exemplu, Windows Media Player poate oferi comenzi standard de transport media cum ar fi joacă, pauză, sunet şi oprire.

__Bara de miniaturi a Windows Media Player:__

![jucător](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

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

Pentru a curăța butoanele din bara de unelte miniatură, doar apelează `BrowserWindow.setThumbarButton` cu un array gol:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Suprapuneri pictograme în bara de activități

Pe Windows un buton din bara de activități poate folosi o mică suprapunere pentru a afișa starea aplicației așa cum este citat de MSDN:

> Suprapunerile pictogramelor servesc ca o notificare contextuală a stării și sunt destinate să nege necesitatea unei pictograme separate de stare a zonei de notificare pentru a comunica acea informație utilizatorului. De exemplu, noua adresă de mail în Microsoft Outlook, afișată în prezent în zona de notificare, acum poate fi indicat printr-o suprapunere pe bara de sarcini. Din nou, trebuie să decideți în timpul ciclului de dezvoltare care metodă este cea mai bună pentru aplicația ta. Pictogramele suprapuse sunt destinate să furnizeze o stare importantă, de lungă durată sau notificări, cum ar fi starea rețelei, starea mesagerului sau mesaje noi. Utilizatorul nu ar trebui să fie prezentat cu suprapuneri sau animații care se schimbă constant.

__Suprapunere pe butonul bară de activitate:__

![Suprapunere pe butonul din bara de activități](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Descriere pentru overlay')
```


## Cadru Flash

Pe Windows poți evidenția butonul bară de activități pentru a atrage atenția utilizatorului. Acest lucru este similar cu înregistrarea pictogramei de andocare pe macOS. Din documentația de referință MSDN:

> De obicei, o fereastră este instalată pentru a informa utilizatorul că fereastra necesită atenție, dar că nu are în prezent focalizarea tastaturii.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Nu uitați să apelați metoda `flashFrame` cu `false` pentru a opri intermitența. În exemplul de mai sus, este apelată când fereastra vine în focalizare, dar ai putea folosi o pauză sau un alt eveniment pentru a o dezactiva.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
