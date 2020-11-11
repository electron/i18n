# Securitate, capacități native și responsabilitatea ta

Ca dezvoltatori web, ne bucurăm, de obicei, de o plasă puternică de securitate a browserului - riscurile asociate cu codul pe care îl scriem sunt relativ mici. Site-urilor noastre li se acordă puteri limitate într-o cutie de nisip, și avem încredere că utilizatorii noștri se bucură de un navigator construit de o echipă mare de ingineri care este capabilă să răspundă rapid la amenințări de securitate nou descoperite.

Când lucrezi cu Electron, este important să înțelegi că Electron nu este un browser web. Îți permite să construiești aplicații desktop bogate cu tehnologii web familiare, dar codul tău are o putere mult mai mare. JavaScript poate accesa sistemul de fișiere, scoica utilizatorului și multe altele. Acest lucru vă permite să construiți aplicații native de înaltă calitate, dar dimensiunea inerentă a riscurilor de securitate cu competențele suplimentare acordate codului dvs.

Având în vedere acest lucru, fii conștient de faptul că afișarea de conținut arbitrar din surse nesigure reprezintă un risc major de securitate pe care Electron nu este destinat să îl gestioneze. De fapt, cele mai populare aplicații Electron (Atom, Slack, Visual Studio Code, etc) afișează în principal conținutul local (sau de încredere, securizarea conținutului de la distanță fără integrarea modulului ) – în cazul în care aplicația dvs. execută codul dintr-o sursă online, este responsabilitatea ta de a te asigura că codul nu este răuvoitor.

## Raportarea problemelor de securitate

Pentru informații despre cum să se dezvăluie în mod corespunzător o vulnerabilitate Electron, a se vedea [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Probleme de securitate Chromium și actualizări

Electron ţine la curent cu versiunile alternative de Chromium. Pentru mai multe informații, a se vedea postarea de pe blogul [Electron Release Cadence](https://electronjs.org/blog/12-week-cadence).

## Securitatea este responsabilitatea tuturor

Este important să rețineți că securitatea aplicației tale Electron este rezultatul securității globale a fundației Cadrului (*Chromium*, *Node. s*), Electron în sine, toate dependențele NPM și codul tău. Ca atare, este responsabilitatea dumneavoastră să urmați câteva dintre cele mai bune practici importante:

* **Păstrează-ți aplicația la zi cu cea mai recentă versiune de framework Electron.** Când lansați produsul, livrați și un pachet compus din Electron, Bibliotecă partajată de Chromium și Node.js. Vulnerabilitățile care afectează aceste componente pot afecta securitatea aplicației dvs. Prin actualizarea Electron la ultima versiune , asigurați-vă că vulnerabilitățile critice (cum ar fi *nodeIntegration bypases*) sunt deja modificate și nu pot fi exploatate în aplicația dvs. Pentru mai multe informații, a se vedea „[Utilizați versiunea curentă a Electron](#17-use-a-current-version-of-electron)”.

* **Evaluează-ți dependențele.** În timp ce NPM oferă jumătate de milion de pachete reutilizabile, este responsabilitatea ta să alegi bibliotecile 3rd-party de încredere. Dacă folosiți librării învechite afectate de vulnerabilități cunoscute sau dacă vă bazați pe un cod prost întreținut, securitatea aplicației dumneavoastră ar putea fi în pericol.

* **Folosirea practicilor de codificare securizată** Prima linie de apărare pentru aplicația ta este propriul tău cod. Vulnerabilități web comune, cum ar fi Scripting Cross-Site (XSS), are un impact mai mare asupra securității aplicațiilor Electron și, prin urmare, este foarte recomandat să se adopte cele mai bune practici de dezvoltare a software-ului și să se efectueze teste de securitate.

## Izolare pentru conținut neacreditat

Există o problemă de securitate ori de câte ori primiți cod dintr-o sursă neacreditată (de ex. un server de la distanță) și executați-l local. De exemplu, considerați că un site la distanță este afișat în interiorul unei [`BrowserWindow`](../api/browser-window.md). Dacă un atacator reușește cumva să schimbe conținutul menționat (fie atacând sursa direct, sau stând între aplicația dvs. și destinația propriu-zisă), ei vor putea executa codul nativ pe mașina utilizatorului.

> :warning: În nici un caz nu ar trebui să încarci şi să executi codul de la distanţă cu Integrarea Node.js activată. În schimb, folosiți doar fișiere locale (împachetate împreună cu aplicația dvs.) pentru a executa codul Node.js. Pentru a afișa conținut de la distanță, folosește tag-ul [`<webview>`](../api/webview-tag.md) sau [`BrowserView`](../api/browser-view.md), asigură-te că să dezactivezi `nodeIntegration` și să activezi contextIzolarea ``.

## Avertismente de securitate Electron

De la Electron 2.0, dezvoltatorii vor vedea avertismentele și recomandările imprimate pentru consola de dezvoltator. Ele apar doar când numele binarului este Electron, indicând că un dezvoltator se uită la consolă.

Puteți dezactiva forțat sau forțat aceste avertismente setând `ELECTRON_ENABLE_SECURITY_WARNINGS` sau `ELECTRON_DISABLE_SECURITY_WARNINGS` pe fie `. nv` sau obiectul ``.

## Verificare: Recomandări de securitate

Ar trebui cel puțin să urmați acești pași pentru a îmbunătăți securitatea aplicației:

1. [Încărcați doar conținut securizat](#1-only-load-secure-content)
2. [Dezactivează integrarea Node.js în toate redările care afișează conținut de la distanță](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Activează izolarea contextului în toate redările care afișează conținut de la distanță](#3-enable-context-isolation-for-remote-content)
4. [Utilizaţi `ses.setPermissionRequestHandler()` în toate sesiunile care încarcă conținut de la distanță](#4-handle-session-permission-requests-from-remote-content)
5. [Nu dezactiva `webSecurity`](#5-do-not-disable-websecurity)
6. [Definește `Content-Security-Policy`](#6-define-a-content-security-policy) și folosește reguli restrictive (ex: `script-src 'self'`)
7. [Nu seta `allowRunningInsecureContent` la `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Nu activați funcțiile experimentale](#8-do-not-enable-experimental-features)
9. [Nu utiliza `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Nu utilizaţi `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verifică opțiunile și parame-urile](#11-verify-webview-options-before-creation)
12. [Dezactivează sau limitează navigarea](#12-disable-or-limit-navigation)
13. [Dezactivează sau limitează crearea de ferestre noi](#13-disable-or-limit-creation-of-new-windows)
14. [Nu utiliza `openExtern` cu conținut neacreditat](#14-do-not-use-openexternal-with-untrusted-content)
15. [Dezactivează modulul `la distanță`](#15-disable-the-remote-module)
16. [Filtrează modulul `la distanță`](#16-filter-the-remote-module)
17. [Folosește o versiune curentă de Electron](#17-use-a-current-version-of-electron)

Pentru a automatiza detectarea configurațiilor greșite și a modelelor nesigure, este posibil să utilizezi [electronegativitate](https://github.com/doyensec/electronegativity). Pentru detalii suplimentare despre posibile deficiențe și erori de implementare atunci când dezvoltă aplicații folosind Electron, vă rugăm să consultați acest [ghid pentru dezvoltatori și auditori](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Încărcare doar conținut securizat

Orice resurse care nu sunt incluse în aplicația dvs. ar trebui încărcate folosind un protocol securizat ca `HTTPS`. Cu alte cuvinte, nu utilizați protocoale nesigure ca `HTTP`. În mod similar, recomandăm utilizarea `WSS` peste `WS`, `FTPS` peste `FTP`și așa mai departe.

### De ce?

`HTTPS` are trei beneficii principale:

1) Se autentifică serverul de la distanță, asigurându-se că aplicația se conectează la gazda corectă în loc de un impersonator. 2) Asigură integritatea datelor, afirmând că datele nu au fost modificate în timp ce se află în tranzit între aplicația dvs. și gazdă. 3) Criptează traficul între utilizatorul tău și gazda de destinație, face mai dificil să spioneze informațiile trimise între aplicația ta și gazda.

### Cum?

```js
//
eronat browserWindow.loadURL('http://example.com')

// Bune
Window.loadURL('https://example.com')
```

```html<!-- Incorect --><script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css"><!-- Bun --><script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Nu activa integrarea Node.js pentru conţinutul Remote

_Această recomandare este comportamentul implicit în Electron de la 5.0.0._

Este extrem de important să nu activați modulul. s integrare în orice redare ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), sau [`<webview>`](../api/webview-tag.md)) care încarcă conținutul de la distanță. Obiectivul este de a limita puterile acordate conținutului de la distanță, astfel făcându-l dramatic de dificil pentru un atacator să facă rău utilizatorilor tăi în cazul în care aceștia vor câștiga abilitatea de a executa JavaScript pe site-ul tău.

Dupa aceasta, poti acorda permisiuni suplimentare pentru anumite gazde. De exemplu, dacă deschideți o fereastră BrowserFereastră îndreptată la `https://exemplu. om/`, puteți da acelui site abilitățile de care are nevoie, dar nu mai mult.

### De ce?

Un atac de scriere pe site (XSS) este mai periculos dacă un atacator poate sări din procesul de redare și executa cod pe computerul utilizatorului. Atacurile de scriere pe teren sunt destul de comune - și în timp ce o problemă, puterea lor este de obicei limitată la a trimite mesaje cu site-ul pe care sunt executate. Dezactivarea integrării Node.js ajută la prevenirea escaladării XSS într-un aşa numita "Execuţie Cod la distanţă" (RCE).

### Cum?

```js
//
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- Incorect --><webview nodeIntegration src="page.html"></webview><!-- Bun --><webview src="page.html"></webview>
```

Când dezactivați integrarea Node.js, încă puteți expune API-uri la site-ul dumneavoastră care consumă module sau caracteristici Node.js. Preîncărcare script-uri continuă să aibă acces la `necesită` și alt modul. caracteristici s, care permit dezvoltatorilor să expună un API personalizat la conținut încărcat de la distanță.

În următorul exemplu de script de preîncărcare, site-ul mai târziu încărcat va avea acces la o `metodă window.readConfig()` , dar fără caracteristici Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Activează izolarea contextului pentru conținutul la distanță

Izolarea contextului este o caracteristică Electron care permite dezvoltatorilor să execute codul în scripturi preîncărcate și în API-uri Electron într-un context JavaScript dedicat. În practică, asta înseamnă că obiecte globale precum `Array.prototype. ush` or `JSON.parse` nu poate fi modificat de scripturile care rulează în procesul de redare.

Electron folosește aceeași tehnologie ca [Scripturile de conținut din Chromium](https://developer.chrome.com/extensions/content_scripts#execution-environment) pentru a activa acest comportament.

Chiar și atunci când folosești `nodeIntegrare: fals` pentru a impune o izolare puternică și pentru a preveni utilizarea primitivelor Node, `contexte de izolare` trebuie, de asemenea, utilizate.

### De ce & Cum?

Pentru mai multe informații despre ce este `context Isolation` și cum să îl activezi, vă rugăm să consultați [Izolarea contextului](context-isolation.md) a documentului.

## 4) Gestionați solicitările de permisiuni pentru sesiune de la conținutul la distanță

Este posibil să fi văzut cereri de permisiune în timp ce utilizați Chrome: Acestea apar ori de câte ori site-ul încearcă să folosească o caracteristică pe care utilizatorul trebuie să o aprobe manual ( ca notificări).

API este bazat pe [Permisiunile Chromium API](https://developer.chrome.com/extensions/permissions) și implementează aceleași tipuri de permisiuni.

### De ce?

În mod implicit, Electron va aproba automat toate cererile de permisiuni, cu excepția cazului în care dezvoltatorul a configurat manual un handler personalizat. Deși implicit solid, dezvoltatorii conștienți de securitate ar putea dori să presupună exact contrariul.

### Cum?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  . etPermissionRequestHandler(webContents. permise, callback) => {
    const url = webContents. etURL()

    dacă (permisiune == 'notificări') {
      // Aprobă solicitarea de permisiuni
      callback(true)
    }

    // Verifică URL-ul
    dacă (! rl tartsWith('https://exemplu. om/')) {
      // refuză solicitarea de permisiuni
      callback(false)
    }
})
```

## 5) Nu dezactiva WebSecurity

_Recomandarea este cea implicită a Electron_

Este posibil să fi ghicit deja că dezactivarea proprietății `webSecurity` pe un proces de redare ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), sau [`<webview>`](../api/webview-tag.md)) dezactivează funcționalități cruciale de securitate.

Nu dezactiva `webSecurity` în aplicațiile de producție.

### De ce?

Dezactivarea `webSecurity` va dezactiva politica de aceeași origine și va seta `allowRunningInsecureContent` proprietatea la `true`. Cu alte cuvinte, permite executarea unui cod nesigur din diferite domenii.

### Cum?

```js
//
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Bun
const mainFdow = Nou BrowserWindow()
```

```html<!-- Incorect --><webview disablewebsecurity src="page.html"></webview><!-- Bun --><webview src="page.html"></webview>
```

## 6) Definiți o politică de securitate a conținutului

O Politică de Securitate a Conținutului (CSP) este un nivel suplimentar de protecție împotriva atacurilor de scriere încrucișată și a atacurilor de injectare a datelor. Vă recomandăm să fie activate de orice site web pe care îl încărcați în Electron.

### De ce?

CSP permite serverului să folosească conținut pentru a restricționa și controla resursele Electron se poate încărca pentru acea pagină web. `https://example.com` ar trebui să aibă permisiunea de a încărca scripturi din originile definite de tine în timp ce scripturi de la `https://evil. ttacker.com` nu ar trebui să poată rula. Definirea unui CSP este un mod ușor de a îmbunătăți securitatea aplicației.

Următorul CSP va permite Electron să execute scripturi de pe site-ul curent și de pe `apis.example.com`.

```plaintext
//
Politică de securitate-conţinut: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Antet HTTP CSP

Electron respectă [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) care poate fi setat folosind handlerul Electron [`webRequest.onHeadersPrimit`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) :

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersReceived((detalii, callback) => {
  callback({
    responseHeaders: {
      . .details.responseHeaders,
      'Content-Securitate': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

Mecanismul de livrare preferat al CSP este un antet HTTP, totuși nu este posibil să se folosească această metodă la încărcarea unei resurse folosind protocolul `fișier://`. Acesta poate fi util în unele cazuri, cum ar fi utilizarea protocolului `file://` , pentru a seta o politică pe o pagină direct în markup folosind o etichetă `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Nu seta `allowRunningInsecureContent` la `true`

_Recomandarea este cea implicită a Electron_

În mod implicit, Electron nu va permite site-urilor încărcate peste `HTTPS` să încarce și să execute scripturi, CSS, sau plugin-uri din surse nesigure (`HTTP`). Setarea proprietății `allowRunningInsecureContent` pentru a `adevărat` dezactivează acea protecție.

Încărcarea HTML inițial al unui website prin `HTTPS` și încercarea de a încărca resursele ulterioare prin `HTTP` este cunoscută și ca "conținut mixt".

### De ce?

Încărcarea conținutului peste `HTTPS` asigură autenticitatea și integritatea resurselor încărcate în timp ce criptează traficul în sine. Vezi secțiunea pe [care afișează doar conținut securizat](#1-only-load-secure-content) pentru mai multe detalii.

### Cum?

```js
//
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Bun
const mainFdow = noua BrowserWindow({})
```

## 8) Nu activați funcțiile experimentale

_Recomandarea este cea implicită a Electron_

Utilizatorii avansați de Electron pot activa funcțiile experimentale de Chromium folosind proprietatea `experimentalFeatures`.

### De ce?

Caracteristicile experimentale sunt, aşa cum sugerează numele, experimentale şi nu au fost activate pentru toţi utilizatorii de Chromium. În plus, impactul lor asupra Electron în ansamblu nu a fost probabil testat.

Există cazuri de utilizare legitimată, dar dacă nu știți ce faceți, ar trebui să nu activați această proprietate.

### Cum?

```js
//
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Bun
const mainFdow = noua BrowserWindow({})
```

## 9) Nu utiliza `activeBlinkFeatures`

_Recomandarea este cea implicită a Electron_

Clipirea este numele motorului de redare din spatele Chromium. Ca și în cazul `experimentalCaracteristici`, proprietatea `activeBlinkFeatures` permite dezvoltatorilor să activeze caracteristici care au fost dezactivate în mod implicit.

### De ce?

În general, există motive foarte bune dacă o caracteristică nu a fost activată în mod implicit. Există cazuri de utilizare legitimă pentru a permite anumite caracteristici. Ca dezvoltator, ar trebui să știi exact de ce trebuie să activezi o caracteristică, care sunt ramificațiile și care este impactul asupra securității aplicației tale. În nicio circumstanță nu ar trebui să activați caracteristicile speculative.

### Cum?

```js
//
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Bun
const mainFdow = Nou BrowserWindow()
```

## 10) Nu utiliza `allowpopups`

_Recomandarea este cea implicită a Electron_

Dacă folosești [`<webview>`](../api/webview-tag.md), este posibil să aveți nevoie de paginile și scripturile încărcate în tag-ul `<webview>` pentru a deschide ferestre noi. Atributul `allowpopups` le permite să creeze o nouă [`BrowserWindows`](../api/browser-window.md) folosind metoda `window.open()`. `<webview>` de etichete nu au permisiunea de a crea ferestre noi .

### De ce?

Dacă nu aveți nevoie de ferestre popups, nu permiteți crearea nou [`BrowserWindows`](../api/browser-window.md) în mod implicit. Acest lucru respectă principiul de acces minim necesar: Nu lăsa un site web să creeze popups noi decât dacă ştii că are nevoie de această caracteristică.

### Cum?

```html<!-- Incorect --><webview allowpopups src="page.html"></webview><!-- Bun --><webview src="page.html"></webview>
```

## 11) Verifică opțiunile WebView înainte de creare

Un WebView creat într-un proces de redare care nu are integrare Node.js activată nu va putea activa integrarea propriu-zisă. Cu toate acestea, o vedere WebView va crea întotdeauna un proces independent de redare cu propriile sale `webPreferences`.

Este o idee bună să controlezi crearea de noi [`<webview>`](../api/webview-tag.md) tag-uri din procesul principal și să verifici dacă preferințele lor web nu dezactivează funcțiile de securitate.

### De ce?

De la `<webview>` în DOM, pot fi create de un script care rulează pe site-ul chiar dacă Node. s integrarea este dezactivată în caz contrar.

Electron permite dezvoltatorilor să dezactiveze diverse caracteristici de securitate care controlează un proces de redare. În cele mai multe cazuri, dezvoltatorii nu trebuie să dezactiveze nici una dintre aceste caracteristici - și, prin urmare, nu ar trebui să permiteți configurații diferite pentru tag-uri nou create [`<webview>`](../api/webview-tag.md).

### Cum?

Înainte de atașarea unei etichete [`<webview>`](../api/webview-tag.md) , Electron va lansa evenimentul `teste-attach-webview` pe hosting `webcontent`. Utilizați evenimentul pentru a preveni crearea `webViews` cu posibile opțiuni nesigure.

```js
app.on('web-contents-created', (eveniment, conținuturi) => {
  conținut. n ('will-attach-webview', (eveniment, webPreferences, params) => {
    // Strip script-uri de preîncărcare dacă neutilizate sau verificarea locației lor este legitimă
    șterge webPreferences. reîncărcare
    ștergere webPreferences. reîncărcare URL

    // Dezactivează integrarea Node.js
    webPreferences. odeIntegration = false

    // Verificați URL-ul fiind încărcat
    dacă (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Din nou, această listă minimizează riscul, nu o elimină. Dacă obiectivul este de a afișa un website, un browser va fi o opțiune mai sigură.

## 12) Dezactivare sau limitare navigare

Dacă aplicația ta nu are nevoie să navigheze sau trebuie doar să navigheze la pagini cunoscute, este o idee bună să limitezi navigarea în mod direct la acel scop cunoscut, dezactivând orice alt tip de navigaţie.

### De ce?

Navigarea este un vector comun de atac. Dacă un atacator poate convinge aplicația să navigheze departe de pagina curentă, poate forța aplicația dvs. să deschidă site-uri web pe internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

Un model de atac comun este că atacatorul convinge utilizatorii aplicației tale să interacționeze cu aplicația astfel încât să navigheze la una dintre paginile ale atacatorului. Acest lucru se face de obicei prin link-uri, plugin-uri sau alte conținuturi generate de utilizatori.

### Cum?

Dacă aplicația dvs. nu are nevoie de navigare, puteți apela `event.preventDefault()` într-un handler [`will-navigate`](../api/web-contents.md#event-will-navigate). Dacă știi la ce pagini este posibil ca aplicația ta să navigheze, bifați URL-ul în managerul de evenimente și lăsați navigarea să apară dacă se potrivește cu URL-urile pe care le așteptați.

Îți recomandăm să folosești analizorul Nodului pentru URL-uri. Comparațiile cu șirurile simple pot uneori să fie păcăliți - un test `startsWith('https://example.com')` ar permite `https://example.com.attacker.com` prin intermediul .

```js
const URL = require('url').URL

app.on('web-contents-created', (eveniment, conținuturi) => {
  conținut. n('will-navigate', (event, navigationUrl) => {
    const parsedUrl = URL nou (navigationUrl)

    dacă (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Dezactivați sau limitați crearea de ferestre noi

Dacă ai un set cunoscut de ferestre, este o idee bună să limitezi crearea ferestre suplimentare în aplicația ta.

### De ce?

Ca și navigarea, crearea unui nou `conținut web` este un vector comun de atac . Atacatorii încearcă să convingă aplicația să creeze noi ferestre, cadre, sau alte procese de redare cu mai multe privilegii decât înainte; sau cu paginile deschise pe care nu le-au putut deschide înainte.

Dacă nu ai nevoie să creezi ferestre în plus față de cele pe care știi că vei avea nevoie să le creezi, dezactivând creația te cumpără puțin în plus securitate gratuit. Acesta este de obicei cazul aplicațiilor care deschid unul `BrowserWindow` și nu trebuie să deschidă un număr arbitrar de ferestre adiționale la timpul de execuție.

### Cum?

[`webContents`](../api/web-contents.md) will delegate to its [window open handler](../api/web-contents.md#contentssetwindowopenhandler-handler) before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Nu utilizați `deschideți extern` cu conținut lipsit de încredere

[`openExtern`](../api/shell.md#shellopenexternalurl-options) de la Shell permite deschiderea unui anumit protocol URI cu utilitățile native ale desktop-ului. În macOS, de exemplu, această funcţie este similară cu `deschideți` comanda terminal utility și va deschide aplicația specifică bazată pe URI și tip fișier.

### De ce?

Utilizarea incorectă a [`openExtern`](../api/shell.md#shellopenexternalurl-options) poate fi folosită pentru a compromite gazda utilizatorului. Când openExtern este folosit cu conținut neîncrezător, poate fi leveraged pentru a executa comenzi arbitrare.

### Cum?

```js
// Proasta
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Bune
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Dezactivează modulul `la distanță`

Modulul `la distanță` oferă o modalitate pentru ca dispozitivul de redare să acceseze API-uri în mod normal doar în procesul principal. Folosind-o pe un renderer poate invoca metode ale unui obiect principal de proces fără a trimite în mod explicit mesaje interprocesare. Dacă aplicația desktop nu rulează conținutul neacreditat, acesta poate fi un mod util de a avea acces la procesele dvs. de redare și de a lucra cu module care sunt disponibile numai pentru procesul principal, cum ar fi module legate de GUI-uri (dialoguri, meniuri etc.).

Cu toate acestea, dacă aplicația ta poate rula conținut neîncrezător și chiar dacă [sandbox](../api/sandbox-option.md) procesele de redare corespunzătoare, `modulul de la distanță` facilitează codul răuvoitor să scape de cutia de nisip și să aibă acces la resursele sistemului prin privilegiile superioare ale procesului principal. Prin urmare, ar trebui să fie dezactivat în astfel de circumstanțe.

### De ce?

`remote` utilizează un canal IPC intern pentru a comunica cu procesul principal. Atacurile "poluare prototipuri" pot oferi acces de cod rău intenționat la canalul intern IPC, care poate fi folosit apoi pentru a scăpa de sandbox prin imitarea `mesajelor de la distanță` IPC și obținerea accesului la modulele de proces principal rulând cu privilegii mai mari.

În plus, este posibil ca scripturile preîncărcate să scurgă din greșeală module către un dispozitiv sandboxed renderer. Scurgând `la distanță` cod răuvoitor cu o multitudine de module de proces principal cu care să efectuați un atac.

Dezactivarea modulului `remote` elimină aceşti vectori de atac. Facilitarea izolării contextului previne de asemenea atacurile "poluare prototipuri" de la la succes.

### Cum?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

```js
// Bune
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview enableremotemodule="true" src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

> **Note:** The default value of `enableRemoteModule` is `false` starting from Electron 10. For prior versions, you need to explicitly disable the `remote` module by the means above.

## 16) Filtrează modulul `la distanță`

Dacă nu poți dezactiva modulul `la distanță` , ar trebui să filtrezi globalele, Node, și module Electron (așa-zis încorporate) accesibile prin `distanță` pe care aplicația ta nu le necesită. Acest lucru poate fi realizat prin blocarea anumitor module în întregime și prin înlocuirea altora cu proxy-uri care expun doar funcționalitatea de care are nevoie aplicația ta.

### De ce?

Datorită privilegiilor de acces la sistem ale procesului principal, funcționalitatea furnizată de modulele de proces principale poate fi periculoasă în mâinile unui cod periculos care rulează într-un proces de redare compromis. Limitând setul de module accesibile la minimul de care are nevoie aplicația ta și filtrarea celorlalte, reduceți setul de instrumente pe care codul răuvoitor le poate utiliza pentru a ataca sistemul.

Țineți cont că cea mai sigură opțiune este [dezactivarea completă a modulului la distanță](#15-disable-the-remote-module). Dacă alegeți mai degrabă să filtreze accesul decât să dezactivați complet modulul, Trebuie să fiți foarte atent pentru a vă asigura că nicio escaladare a privilegiului nu este posibilă prin modulele pe care le permiteți în trecut filtrul.

### Cum?

```js
const readlyFsProxy = require(/* ... */// expune doar funcționalitatea de citire a fișierului

const Modules = un nou set(['crypto'])
const modulele proxied=noi Map(['fs', readOnlyFsProxy])
const allowedElectronModule = new Set(['shell'])
const allowedGlobals = new Set()

app. n('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules. et(moduleName)
  }
  dacă (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app. n('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    . reventDefault()
  }
})

app.on('remote-get-global', (eveniment, conținut web, globalName) => {
  if (!allowedGlobals. as(globalName)) {
    event.preventDefault()
  }
})

app. n('remote-get-current-window', (event, webContents) => {
  . reventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Utilizați o versiune curentă a Electron

Ar trebui să depuneți eforturi pentru a utiliza cea mai recentă versiune disponibilă de Electron. Ori de câte ori o nouă versiune majoră este lansată, ar trebui să încercați să actualizați aplicația cât mai repede posibil.

### De ce?

O aplicație construită cu o versiune mai veche de Electron, Chromium și Node. s este o țintă mai ușoară decât o aplicație care folosește versiuni mai recente ale acestor componente. În general, problemele de securitate şi exploziile pentru versiunile mai vechi de Chromium şi Node.js sunt disponibile pe scară mai largă.

Atât cromul cât şi Node.js sunt lucruri impresionante de inginerie construită de mii de dezvoltatori talentaţi. Dată fiind popularitatea lor, securitatea lor este testată și analizată cu atenție de cercetători cu competențe egale în domeniul securității. Mulţi dintre acei cercetători [dezvăluie vulnerabilităţi în mod responsabil](https://en.wikipedia.org/wiki/Responsible_disclosure), ceea ce înseamnă în general că cercetătorii vor oferi Chromium şi Node. s ceva timp pentru a rezolva problemele înainte de publicarea lor. Aplicația dvs. va fi mai sigură dacă rulează o versiune recentă de Electron (și astfel, Chromium și Node. s) pentru ale căror potențiale probleme de securitate nu sunt atât de bine cunoscute.
