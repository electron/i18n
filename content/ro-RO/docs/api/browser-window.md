# BrowserWindow - FereastraBrowser-ului

> Creează și controlează ferestrele browser-ului.

Proces-ul: [Main](../glossary.md#main-process) - Principal</0>

```javascript
// În procesul principal-main.
const (constanta) { BrowserWindow } = require- cere ('electron')

// Sau utilizează `remote`-la distanță din procesul renderer.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow ( { width: 800, height: 600 })
win.on('closed', () => {
win = null
})

//Încărcarea URL la distanță
win.loadURL('https://github.com')

// Sau încărcarea unui fișier HTML local
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Fereastra Frameless-fără cadru

Pentru a crea o fereastră fără chrome, sau o fereastră transparentă pentru o formă arbitrară poți folosi [Frameless Window](frameless-window.md) API.

## Afișarea ferestrei cu grație

La încărcarea directă în fereastra unei pagini, utilizatorii pot să vadă pagina încărcându-se pas cu pas, ceea ce semnifică că nu este o bună experiență-app pentru un nativ a. Pentru a face ca fereastra să fie afișată fără flash, există două soluții pentru diferite situații.

## Folosirea evenimentului `ready-to-show`

În momentul încărcarii paginii, evenimentul `ready-to-show` va fi emis când procesul prestatorului a prestat pagina pentru prima dată, dacă fereastra nu a fost arătată deja. Aratând fereastra după eveniment nu avea nici nu efect visual-flash:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ show: false })
win.once('ready-to-show',() => {
win.show()
})
```

Acest eveniment este de obicei emis după evenimentul `did-finish-load`, dar pentru paginile cu multe resurse la distanță, poate fi emis înainte de evenimentul `did-finish-load`.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

## Setarea `backgroundColor` - culorii fondului

Pentru o app- aplicație mai complexă, evenimentul `ready-to-show` poate fi emis prea târziu, ceea ce duce la funcționarea lentă a aplicației. În acest caz, este recomendabil să se arate fereastra imediat, și să se folosească `backgroundColor`-culoarea de fond apropiată fondului aplicației tale:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

I-a aminte că, chiar și pentru aplicațiile care folosesc evenimentul ` ready-to-show`, este recomendabil să setezi`backgroundColor` ca să faci ca aplicația să aibă o tentă mai mult nativă.

## Ferestrele-windows Părinte și copil

Folosind opțiunea `parent`, poți să creezi ferestre copii:

```javascript
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Fereastra `child` va fi arată mereu în partea de sus a ferestrei `top`.

## Ferestrele modale

O fereastră modală este o fereastră copil care dezactivează fereastra părinte cu scopul de a creea o fereastră modală, care trebuie setată la opțiunile `parent` și `modal`:

```javascript
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

## Visibilitatea paginii

[Page Visibility API - Visibilitatea Paginii API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) funcționează după cum urmează:

* În toate platformele, statutul visibil verifică dacă fereastra este ascunsă/minimizată sau nu.
* Adițional, în macOS, starea de vizibilitate urmărește statutul de ocluzie al ferestrei. Dacă fereastra este ocluzionată(i.e. acoperită complet) de altă fereastră, statul vizibilității va fi `hidden-ascuns`. În alte platforme, statutul vizibilității va fi `hidden-ascuns` doar când fereastra este minimizată sau explicit ascunsă cu `win.hide()`.
* Dacă `BrowserWindow` este creată cu `show: false`, statutul vizibilității inițial va fi `visible-vizibil` chiar dacă fereastra actuală este ascunsă.
* Dacă`bacgroundThrottling` este dezactivat, statutul vizibiliății va rămâne`visible-vizibil` chiar dacă fereastra este minimizată, ocluzată, sau ascunsă.

Este recomendabil să pauzezi operațiile scumpe când statutul vizibilității este`hidden-ascuns` pentru a minimiza consumul puterii.

## Platform notices- Notificările Platformei

* În macOS ferestrele modale vor fi displayed-afișate ca și foi la fereastra părinte.
* În macOS fereastra copil își va menține poziția relativă a ferestrei părinte atunci când fereastra părinte se mișcă, în timp ce în Windows sau Linux fereastra copil nu se mișcă.
* În Linux modelul ferestrei modale va fi schimbat în `dialog`.
* În Linux multe din mediile desktop-ului nu suportă o fereastră modală ascunsă.

## Clasa: BrowserWindow

> Creează și controlează ferestrele browser-ului.

Proces-ul: [Main](../glossary.md#main-process) - Principal</0>

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Crează un nou `BrowserWindow<code> cu propietăți native setate de către <0>options-opțiuni`.

### `new BrowserWindow([options])`

* `opțiuni` Object -Obiect (opțional) 
  * `width-lățime`Integer(opțional) - Lățimea ferestrei în pixeli. Modul implicit este ` 800`.
  * `lungime` Integer (opțional) - Lungimea ferestrei în pixeli. Modul implicit este `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize-utilizareaConținutuluiMărimii` Boolean ( opțional) - `lățimea` și `height-lungimea` vor fi folosite ca size-mărimi ale paginii web, ceea ce semnifică că size-marimea actuală a ferestrei va include mărimea cadrului ferestrei și va fi usor mai largă. Modul implicit este `false-fals`.
  * `center-centru` Boolean (opțional) - Arată fereastra în mijlocul ecranului.
  * `minWidth` Integer (opțional) - Lățimea minimă a ferestrei. Modul implicit este `0`.
  * `minHeight` Integer (opțional) - Lungimea minimă a ferestrei. Modul implicit este `0`.
  * `maxWidth` Integer (opțional) - Lățimea maximă a ferestrei. Modul implicit nu are limite.
  * `maxHeight` Integer (opțional) - Lungimea maximă a ferestrei. Modul implicit nu are limite.
  * `resizable` Boolean (opțional) - Fereastra poate fi ajustată. Modul implicit este`true-adevărat`.
  * `movable` Boolean(opțional) - Fereastra poate fi mutată. Nu este implementată în Linux. Modul implicit este `true-adevărat`.
  * `minimizable` Boolean (opțional) - Minimizarea ferestrei. Nu este implementată în Linux. Modul implicit este ` true-adevărat`.
  * `maximizable` Boolean(opțional) - Maximizarea ferestrei. Nu este implementată în Linux. Modul implicit este ` true-adevărat`.
  * `closable` Boolean(opțional) - Închiderea ferestrei. Nu este implementată în Linux. Modul implicit este `true-adevărat`.
  * `focusable` Boolean (opțional) - Focusarea ferestrei. Modul implicit este `true-adevărat`. În setările ferestrei `focusable: false`, implică setarea `skipTaskbar: true`. În setările Linux `focusable: false` face ca fereastra să nu mai interacționeze cu wm, așa că fereastra va ramane mereu în partea de sus a tuturor spațiilor de muncă.
  * `alwaysOnTop` Boolean (opțional) - Fereastra stă în partea de sus a tuturor ferestrelor. Modul implicit este `false-fals`.
  * `fullscreen` Boolean(opțional) - Apariția ferestrei în ecran complet. Când este explicit setat la ` false-fals` butonul de ecran complet va fi ascuns sau dezactivat în macOS. Modul implicit este `false-fals`.
  * `fullscreenable` Boolean(opțional) - Punerea ferestrei în ecran complet. În macOS, butonul de maximizare/zoom ar trebui comutat la modul full screen-ecran complet sau maximizarea ferestrei. Modul implicit este `true-adevărat`.
  * `simpleFullscreen` Boolean ( opțional) - Utilizează ecranul complet pre-Lion în macOS. Modul implicit este `false-fals`.
  * `skipTaskbar` Boolean (opțional) - Apariția ferestrei în bara de activități. Modul implicit este `false-fals`.
  * `kiosk` Boolean (opțional) - Modul kiosk. Modul implicit este `false-fals`.
  * `title` String (opțional) - Titlul ferestrei în modul implicit. Modul implicit este `"Electron"`. Dacă eticheta HTML`<title>` este definită în fișierul HTML încărcat de `loadURL()`, această propietate va fi ignorată.
  * `icon` ([NativeImage](native-image.md) | String) (opțional) - Icoana ferestrei. În Windows este recomandabil a se folosi icoanele `ICO` pentru a avea cele mai bune efecte visuale, pe care le poți lăsa nedefinite în așa fel în cât icoana executabilă va fi folosită.
  * `show` Boolean(opțional) - Fereastra este aratată când este creată. Modul implicit este `true-adevărat`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created. In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`. Setting this to `false` will cause the `ready-to-show` event to not fire. Modul implicit este `true-adevărat`.
  * `frame` Boolean (opțional) - Specifică `false-fals` pentru a crea [Frameless Window](frameless-window.md). Modul implicit este `true-adevărat`.
  * `parent-părinte` BrowserWindow (opțional) - Specifică fereastra părinte. modul implicit este `null`.
  * `modal` Boolean (opțional) - O fereastră modală. Aceasta funcționează doar când fereastra este o fereastră copil. Modul implicit este `false-fals`.
  * `acceptFirstMouse` Boolean (opțional) - Dacă web-ul acceptă un singur eveniment de mouse în partea de jos care în același timp activează fereastra. Modul implicit este `false-fals`.
  * `disableAutoHideCursor` Boolean (opțional) - La scriere cursorul este ascuns. Modul implicit este`false-fals`.
  * `autoHideMenuBar` Boolean(opțional) - Ascunde bara meniului până când tasta`Alt` este apasată. Modul implicit este `false-fals`.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Modul implicit este `false-fals`.
  * <backgroundColor</code> String (opțional) - Culoarea de fond a ferestrei ca valoare hexadecimală, ca ` #66CD00` sau ` #FFF` sau ` #80FFFFFF` ( alpha în #AARRGGBB formatul este suportat dacă `transparent` este setat la `true-adevărat`). Modul implicit este `#FFF` (alb).
  * `hasShadow-are umbră` Boolean (opțional) - Daca fereastra ar trebui să aibă umbră. Aceasta este implementată doar în macOS. Modul implicit este ` true-adevărat`.
  * `opacity-opacitate` Number - Număr (opțional) - Setează opacitatea inițială a ferestrei între 0.0 ( transparent în întregime) și 1.0 (opac în totalitate). Acesta este implementat doar în Windows și macOS.
  * `darkTheme-tema închisă` Boolean (opțional) - Forțează utilizarea temei închise pentru fereastră, funcționează doar în câteva dintre mediile desktop-ului ale GTK +3. Modul implicit este ` false-fals`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Modul implicit este `false-fals`. On Windows, does not work unless the window is frameless.
  * `type-tip` String (opțional) - Tip-ul ferestrei, modul implicit este fereastra normală. Vezi mai multe despre asta în partea de jos.
  * `titleBarStyle - Stil titlu` String(opțional) - Stilul bării titlu al ferestrei. Modul implicit este `modul implicit`. Valorile posibile sunt: 
    * `default-modul implicit` - Bara titlului în standard-ul opac gri al Mac.
    * `hidden-ascuns` - Rezultă într-o bară de titlu ascunsă și într-o fereastră de conținut de dimensiuni complete, dar totuși bara titlului deține controlul standard al ferestrei ("traffic lights") în partea stângă din partea de sus.
    * `hiddenInset` - Rezultă într-o bară de titlu ascunsă cu o nouă alternativă de a privi unde butoanele traffic light - traficul luminilor, sunt ușor mai insetate de marginea ferestrei.
    * `customButtonsOnHover` Boolean (opțional) - Deschide personalizarea și minimizează butoanele în fereastra fară cadru macOS. Aceste butoane nu pot fi arătate doar dacă este planat în stânga de sus a ferestrei. Aceste butoane customizate previn evenimentele malițioase cu mouse-ul care se produc cu butoanele din bara de ustensile ale ferestrei standard. **Note:** Aceasta opțiune este de moment experimentală.
  * `fullscreenWindowTitle` Boolean (opțional) - Arată titlul în bara de titlu în modul full screen - ecran complet în macOS pentru toate opțiunile `titleBarStyle`. Modul implicit este `false-fals`.
  * `thickFrame` Boolean (opțional) - Utilizează stilul `WS_THICKFRAME` pentru ferestrele fără cadru în Windows, care adaugă cadru standard al ferestrei. Setat la ` false-fals` va îndeparta umbra ferestrei și animațiile ferestrei. Modul implicit este `true-adevărat`.
  * `vibrancy` String (opțional) - Adaugă ferestrei un tip de efect vibrant, doar în macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (opțional) - Controlează comportamentul în macOS când opțiunea- făcând clic pe butonul verde stoplight din bara de instrumente sau făcând clic în meniu pe articolul Window > Zoom. Dacă `true-adevărat`, fereastra va crește la lățimea preferată a paginii web când este marită, `false- fals` cauzează mărirea lățimii a ecranului. Acesta de asemenea afectează direct comportamentul când apelăm la `maximize() - maximizează`. Modul implicit este `false-fals`.
  * `tabbingIdentifier` String (opțional) - Numele grupului de file, permite deschiderea ferestrei ca o filă nativă în macOs 10.12+. Ferestrele cu aceași identificatori de file vor fi grupate împreună. Aceasta de asemenea adaugă un nou buton nativ de file în bara de file a ferestrei și permite ` app -aplicației` și ferestrei să primească evenimentul `new-window-for-tab`.
  * `webPreferences - Preferințele web` Object-Obiect (optional) - Setări ale caracteristicilor paginii web. 
    * `devTools` Boolean (opțional) - Dacă este deschis la DevTools. Dacă este setat la `false`, nu poate folosi pentru a deschide Dev Tools `BrowserWindow.webContents.openDevTools()`. Modul implicit este `true-adevărat`.
    * `nodeIntegration` Boolean (opțional) - Dacă integrarea nodului este activată. Modul implicit este ` false-fals`.
    * `nodeIntegrationInWorker` Boolean (opțional) - Dacă integrarea nodului este activată în web-ul muncitorilor. Modul implicit este `false-fals`. Mai multe despre acestea se pot regăsi în [Multithreading](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (opțional) - Opțiune experimentală pentru a activa suportul Node.js în sub-cadre ca și iframes și ferestre copil. Toate preîncărcarile tale se vor încărca pentru toate iframe-urile, poți utiliza`process.isMainFrame` pentru a determina dacă esti în cadrul principal sau nu.
    * `preload-preîncărcare` String (opțional) - Specifică un scenariu care va fi încărcat înaintea altor scenarii ce aleargă deja în pagină. Acest scenariu va avea mereu acces la nodul API, chiar dacă integrarea nodului este pornită sau nu. Valoarea ar trebui să fie calea absolută a fișierului pentru scenariu. Când integrarea nodurilor este oprită, preîncărcarea scenariului poate reintroduce un simbol global Nod înapoi în scopul global. Vezi exemplul [ aici](process.md#event-loaded).
    * `sandbox` Boolean (opțional) - Dacă set- setează, acest lucru va face ca sandbox-cutie de nisip să redea asociarea cu fereastra, facând-o compatibilă cu Chromium OS-nivel sandbox și dezabilitând motorul Node.js. Acesta nu este la fel ca opțiunea `nodeIntegration` iar API-urile disponibile la preîncărcarea scenariului este limitată. Citește mai multe despre opțiune [aici](sandbox-option.md). **Notă:** Această curentă opțiune e experimentală și poate fi modificată sau eliminată în viitoarele realizări Electron.
    * `enableRemoteModule` Boolean (opțional)- Activarea modului [` remote-de la distanță`](remote.md). Modul implicit este `true-adevărat`.
    * `session` [Session-Sesiune](session.md#class-session)(opțional) - Setează sesiunea utilizată de pagină. În loc să trimiți direct obiectul Session-Sesiune, poți alege să folosești în loc opțiunea `partition`, care acceptă o partiție a șirului. Atunci când sunt obținute`session-sesiune<code> și <code>partition-partiție`, <0>session</code> va fi cel preferat. Modul implicit este modul implicit al sesiunii.
    * `partition` String(opțional)- Setează sesiunea utilizată de pagină în conformitate cu partiția șirului sesiunii. Dacă `partition` începe cu `persist:`, pagina va utiliza o sesiune persistentă valabilă tuturor paginilor din interiorul aplicației cu aceași`partitio-partiție`. Dacă nu există prefixul `persist:`, pagina va folosi o sesiune în-memorie. Asignând aceași`partition-partiție`, pagini multiple pot arăta aceași sesiune. Modul implicit este modul implicit al sesiunii.
    * `affinity` String(opțional) - Când este specificată, paginile cu aceeași`affinity-afinitate` vor rula în același proces de redare. Notează că odată reutilizat procesul de redare, anumite opțiuni `webPreferences-PreferințeWeb` vor fi afișate între paginile web chiar dacă ai specificat valori diferite pentru fiecare, inclusiv dar fară limită la `preload`, `sandbox` și `nodeIntegration`. Așa că este preferabil să utilizezi aceleași `webPreferences-PreferințeWeb` pentru toate paginile cu aceași `affinity-afinitate`. *Această propietate este experimentală*
    * `zoomFactor` Number-Număr (opțional) - Modul implicit al factorului de mărire a paginii`3.0` reprezintă `300%`. Modul implicit este`1.0`.
    * `javascript` Boolean (opțional)- Activează suportul JavaScript. Modul implicit este `true-adevărat`.
    * `webSecurity` Boolean (opțional)- Când este `false-fals`, va dezactiva politica cu aceași origine ( de obicei website-urile folosite drept test de către oameni), și setează `allowRunningInsecureContent` la `true-adevărat` dacă această opțiune nu a fost deja setată de către utilizator. Modul implicit este `true-adevărat`.
    * `allowRunningInsecureContent` Boolean (opțional) - Admite o pagină https să acționeze JavaScript, CSS sau plugin-uri din URL http. Modul implicit este `false-fals`.
    * `images-imagini` Boolean(opțional) - Activează suportul imaginilor. Modul implicit este `true-adevărat`.
    * `textAreaAreResizable` Boolean(opțional) - Face ca elementele TextArea să își poată modifica mărimea. Modul implicit este`true-adevărat`.
    * `webgl` Boolean(opțional)- Activează suportul Webgl. Modul implicit este`true-adevărat`.
    * `plugins` Boolean(opțional) - Activarea plugin-urilor. Modul implicit este `false-fals`.
    * `experimentalFeatures`Boolean(opțional)- Activează caracteristicile experimentale ale Chromium. Modul implicit este `false-fals`.
    * `scrollBounce` Boolean (opțional)- Activează efectul de defilare(bandă de cauciuc) în macOs. Modul implicit este`false-fals`.
    * `enableBlinkFeatures` String(opțional)- O listă a caracteristicilor șirului separate prin `,` la fel activarea `CSSVariables, KeyboardEventKey`. Întreaga listă a caracteristicilor șirurilor poate fi regasită în fișierele[RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `enableBlinkFeatures` String(opțional)- O listă a caracteristicilor șirurilor separate prin `,` la fel dezactivarea `CSSVariables, KeyboardEventKey`. Întreaga listă suportată a caracteristicilor șirurilor se poate găsi în fișierul [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70).
    * `modul implicit al fontului este FontFamily` Obiect (opțional) - Setează modul implicit al fontului la fontul -FontFamily. 
      * `standard` String (opțional)- Modul implicit la `Times New Roman`.
      * `serif` String(opțional)- Modul implicit setat la `Times New Roman`.
      * `sansSerif` String (opțional) - Modul implicit la `Arial`.
      * `monospace` String (opțional) - Modul implicit la `Courier New`.
      * `cursive` String (opțional)- Modul implicit la `Script`.
      * `fantasy` String (opțional)- Modul implicit la `Impact`.
    * `defaultFontSize` Integer (opțional) - Modul implicit la `16`.
    * `defaultMonospaceFontSize` Integer (opțional) -Modul implicit la `13`.
    * `minimumFontSize` Integer (opțional) - Modul implicit `0`.
    * `defaultEncoding` String (opțional) - Modul implicit la `ISO-8859-1`.
    * `backgroundThrottling` Boolean (opțional)- Indiferent dacă accelerați animațiile și cronometrele când pagina devine fundal. Aceasta de asemenea afectează [Page Visibility API](#page-visibility). Modul implicit este `true-adevărat`.
    * `offscreen` Boolean (opțional) - Dacă se activează interpretarea offscreen-oprirea ecranului pentru fereastra browser-ului. Modul implicit este`false-fals`. Pentru mai multe detalii vezi [offscreen rendering tutorial](../tutorial/offscreen-rendering.md).
    * `contextIsolation` Boolean (opțional) - Dacă se deschid API-urile Electronilor și script-urile specificate ale `preload` într-un context JavaScript separat. Modurile implicite sunt `false-fals`. În contextul în care script-ul `preload` încă este activ poate avea acces total la globalele `document` și `window-fereastră`, dar va folosi propiul set de construcții JavaScript (`Array`, `Object`, `JSON`, etc.) și vor fi izolate de orice schimbare adusă la mediul global al paginii încărcate. API-ul Electronului va fi valabil doar în script-ul `preload` și nu al paginii încărcate. Această opțiune trebuie utilizată atunci când încărcarea conținutului la distanță potențial necredibil pentru a asigura conținutul încărcat nu poate altera scriptul ` preload-preîncărcare ` și orice API-uri Electron utilizate. Această opțiune folosește aceași tehnică utilizată de [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). Poți accesa acest context în instrumentele dev selectând intrarea 'Electron Isolated Context' din caseta combo din partea de sus a barei Consolei.
    * `nativeWindowOpen` Boolean (opțional)- Folosirea nativei `window.open()`. Modul implicit este`false-fals`. Fereastra copil va avea mereu integrarea nodului dezactivată doar dacă `nodeIntegrationInSubFrames` este adevărată. **Note-Notă:** Această opțiune este în momentul actual în fază experimentală.
    * `webviewTag` Boolean (opțional) - Activarea [`<webview>` tag](webview-tag.md). Modul implicit este`false-fals`. **Note-Notă:** Script-ul `preload` configurat pentru `<webview>` nu va avea integrarea nodului activată când este executată așa că ar trebui să asiguri controlul la distanță/conținuturile noncredibile, nu sunt în stare să creeze o etichetă `<webview>` cu un script malicios `preload-preîncărcare`. Poți folosi evenimentul `will-attach-webview` în [webContents](web-contents.md) pentru a îndepărta script-ul `preload` și a valida ori altera setările inițiale ale `<webview>`.
    * `additionalArguments` String[] (optional) - O listă de șiruri care vor fi adăugate la `process.argv` în procesul de redare a acestei aplicații. Utilizat pentru a transmite mici bitsi de date în jos către preîncărcarea script-urilor în procesul de redare.
    * `safeDialogs` Boolean (opțional) - Dacă activați stilul browserului protecție dialogică consecutivă. Modul implicit este `false-fals`.
    * `safeDialogsMessage` String (opțional) - Mesajul afișat caâd consecutive protecții dialog sunt expuse. Dacă nu este definit modul implicit va fi folosit, atenție că actualul mesaj implicit este în Engleză și nu este localizat.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

* On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* On macOS, possible types are `desktop`, `textured`. 
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### Instance Events

Objects created with `new BrowserWindow` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Event: 'page-title-updated'

Returns:

* `event` Event
* `title` String
* `explicitSet` Boolean

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing. `explicitSet` is false when title is synthesized from file URL.

#### Event: 'close'

Returns:

* `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. For example:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false // equivalent to `return false` but not recommended
}
```

***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron.*

#### Event: 'closed'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Event: 'session-end' *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

#### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

#### Event: 'blur'

Emitted when the window loses focus.

#### Event: 'focus'

Emitted when the window gains focus.

#### Event: 'show'

Emitted when the window is shown.

#### Event: 'hide'

Emitted when the window is hidden.

#### Event: 'ready-to-show'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false. This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Event: 'maximize'

Emitted when window is maximized.

#### Event: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Event: 'minimize'

Emitted when the window is minimized.

#### Event: 'restore'

Emitted when the window is restored from a minimized state.

#### Event: 'will-resize' *macOS* *Windows*

Returns:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Event: 'resize'

Emitted after the window has been resized.

#### Event: 'will-move' *Windows*

Returns:

* `event` Event
* `newBounds` [`Rectangle`](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Event: 'move'

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is an alias of `moved`.

#### Event: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Event: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Event: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Event: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Event: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'always-on-top-changed'

Returns:

* `event` Event
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' *Windows* *Linux*

Returns:

* `event` Event
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Event: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' *macOS*

Returns:

* `event` Event
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'rotate-gesture' *macOS*

Returns:

* `event` Event
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Event: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Metode Statice

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

Remove a Chrome extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

Remove a DevTools extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### Propietățile inițiale

Objects created with `new BrowserWindow` have the following properties:

```javascript
const { BrowserWindow } = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` *Readonly*

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id` *Readonly*

A `Integer` property representing the unique ID of the window.

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.minimizable`

A `Boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.maximizable`

A `Boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.fullScreenable`

A `Boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `Boolean` property that determines whether the window can be manually resized by user.

#### `win.closable`

A `Boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.movable`

A `Boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.excludedFromShownWindowsMenu` *macOS*

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Metode de Instanță

Objects created with `new BrowserWindow` have the following instance methods:

**Note:** Some methods are only available on specific operating systems and are labeled as such.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

#### `win.hide()`

Hides the window.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Modul implicit este `#FFF` (alb).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (optional) *macOS*

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Sets whether the window can be manually resized by user.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* *Windows* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url, ["optiuni"-options])`

* `url` String
* `opțiuni` Object -Obiect (opțional) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `opțiuni` Object -Obiect (opțional) 
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` *Linux* *Windows*

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `opțiuni` Object -Obiect (opțional) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` *Windows* *Linux* *Experimental*

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Obiect 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `click` Function
  * `tooltip` String (optional) - The text of the button's tooltip.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

* `enabled` - The button is active and available to the user.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `opțiuni` Obiect 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Changes window icon.

#### `win.setWindowButtonVisibility(visible)` *macOS*

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

**[Dezaprobată](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `opțiuni` Object -Obiect (opțional) 
  * `visibleOnFullScreen` Boolean (optional) *macOS* - Sets whether the window should be visible above fullscreen windows

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `opțiuni` Object -Obiect (opțional) 
  * `forward` Boolean (optional) *macOS* *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *macOS* *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md) | null - Attach browserView to win. If there is some other browserViews was attached they will be removed from this window.

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an BrowserView what is attached. Returns `null` if none is attached. Throw error if multiple BrowserViews is attached.

#### `win.addBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` *Experimental*

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.