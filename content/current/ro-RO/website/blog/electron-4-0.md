---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Echipa Electron este încântată să anunțe că versiunea stabilă a Electron 4 este acum disponibilă! Îl puteți instala din [electronjs.org](https://electronjs.org/) sau din npm prin `npm instalați electron@latest`. Versiunea este împachetată cu upgrade-uri, reparații și funcții noi, și nu putem aștepta să vedem ce construiți cu ele. Citiți mai multe pentru detalii despre această lansare și vă rugăm să împărtășiți feedback-ul pe care îl aveți în timp ce explorați!

---

## Ce este nou?

O mare parte din funcţionalitatea Electron este furnizată de Chromium, Node.js, şi V8, componentele centrale care alcătuiesc Electron. Astfel, un obiectiv cheie al echipei Electron este de a ține pasul cu modificările aduse acestor proiecte cât mai mult posibil, oferă dezvoltatorilor care construiesc aplicații Electron acces la noi funcții web și JavaScript. În acest scop, Electron 4 prezintă variante majore de umflături pentru fiecare din aceste componente; Electron v4.0.0 include Chromium `69. .3497.106`, Node `10.11.0`, şi V8 `6.9.427.24`.

În plus, Electron 4 include modificări la API-uri specifice Electron. Puteți găsi un rezumat al modificărilor majore din Electron 4 de mai jos; pentru lista completă de modificări, verifică [Electron v4. .0 note de lansare](https://github.com/electron/electron/releases/tag/v4.0.0).

### Dezactivarea modulului `la distanță`

Acum ai posibilitatea de a dezactiva modulul `la distanță` din motive de securitate. Modulul poate fi dezactivat pentru `BrowserWindow`s și pentru `webview` etichete:

```javascript
// BrowserWindow
nou BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Vezi documentația [BrowserWindow](https://electronjs.org/docs/api/browser-window) și [`<webview>` Eticheta](https://electronjs.org/docs/api/webview-tag) pentru mai multe informații.

### Filtrare `remote.require()` / `remote.getGlobal()` Solicitări

Această caracteristică este utilă dacă nu doriţi să dezactivaţi complet modulul `remote` din procesul de redare sau `vizualizare web` dar doriţi un control suplimentar asupra modulelor care pot fi necesare prin `telecomandă. ecvideul`.

Cand un modul este necesar prin `telecomanda. asigură-te` într-un proces de redare, `eveniment cu nevoie de la distanță` este ridicat pe [`aplicația` modulul](https://electronjs.org/docs/api/app). Puteți apela `event.preventDefault()` pe eveniment (primul argument) pentru a preveni încărcarea modulului. [`Instanța` WebContent](https://electronjs.org/docs/api/web-contents) în care a apărut solicitarea este pasată ca al doilea argument, iar numele modulului este trecut ca al treilea argument. Același eveniment este emis și pe exemplul `WebContent` , dar în acest caz singurele argumente sunt evenimentul şi numele modulului. În ambele cazuri, puteți returna o valoare personalizată prin setarea valorii `event.returnValue`.

```javascript
// Control `remote.require` din toate WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Control `remote.require` dintr-o instanţă specifică Webcontent.
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

Într-un mod similar, când `remote.getGlobal(name)` este numit, se ridică un `eveniment de la distanță-get-global`. Acesta funcționează în același mod ca și evenimentul `de la distanța necesară` : apelează `preventDefault()` pentru a preveni returnarea globală și setează `evenimentul. eturnValue` pentru a returna o valoare personalizată.

```javascript
// Control `remote.getGlobal` din toate WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Control `remote.getGlobal` dintr-o instanţă specifică Webcontent,
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Pentru mai multe informații, a se vedea următoarea documentație:

* [`telecomandă.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebConținut`](https://electronjs.org/docs/api/web-contents)

### Acces JavaScript la Panoul Despre

Pe macOS, acum poți apela aplicația `howAboutPanel()` pentru a afișa programatic panoul About ca și cum ai da click pe elementul de meniu creat prin `{role: 'about'}`. Vezi documentația [`showAboutPanel`](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) pentru mai multe informații

### Controlarea `WebConținutul` Context de fundal

`WebContent` instanțe au acum o metodă `setBackgroundTrottling(permis)` pentru a activa sau dezactiva încetinirea cronometrelor și animațiilor atunci când pagina este în fundal.

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundTrottling(enableBackgroundTrottling)
```

See [the `setBackgroundThrottling` documentation](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) for more information.

## Ruperea modificărilor

### Suport pentru macOS 10.9

Chromium nu mai acceptă macOS 10.9 (OS X Mavericks), și, în consecință, [Electron 4.0 și mai mult nu suportă nici](https://github.com/electron/electron/pull/15357).

### Blocare singură instanță

Înainte, pentru a face aplicația ta o aplicație unică în instanță (asigurându-te că doar o singură instanță a aplicației tale rulează în orice moment), ai putea folosi aplicația `. metoda akeSingleInstance()`. Începând cu Electron 4.0, trebuie să utilizaţi `app.requestSingleInstanceLock()` în schimb. Valoarea de returnare a acestei metode indică dacă această instanță a aplicației dvs. a obținut cu succes blocarea. În cazul în care nu s-a putut obține blocarea, puteți presupune că o altă instanță a aplicației dumneavoastră rulează deja cu blocarea și ieșiți imediat.

Pentru un exemplu de utilizare `requestSingleInstanceLock()` şi informaţii despre comportament nuanced pe diferite platforme, [a se vedea documentația pentru `aplicație. equestSingleInstanceLock()` și metodele aferente](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) și [al doilea eveniment ``](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Când se construiesc module native pentru ferestre, variabila `win_delay_load_hook` în `binding.gyp` a modulului trebuie să fie adevărată (care este implicit). Dacă acest cârlig nu este prezent, atunci modulul nativ nu va mai fi încărcat pe Windows, cu un mesaj de eroare ca `Nu s-a gasit modulul`. [Vezi ghidul modulului nativ](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) pentru mai multe informaţii.

## Dezaprobată

Următoarele schimbări de rupere sunt planificate pentru Electron 5.0, fiind astfel descurajate în Electron 4.0.

### Integrare Node.js dezactivată pentru `nativeWindowOpen`-ed Windows

Începând cu Electron 5.0, ferestrele copil deschise cu opţiunea `nativeWindowOpen` vor avea întotdeauna integrarea Node.js dezactivată.

### `WebPreferences` Valori implicite

La crearea unui nou `BrowserWindow` cu setul de opțiuni `webPreferences` următoarea opțiune `de tip webPreferences` este învechită în favoarea noilor valori implicite enumerate mai jos:

<div class="table table-ruled table-full-width">

<unk> Proprietate <unk> Implicit Depreced m2 Noul Implicit <unk>
<unk> -------------------------------------<unk>
<unk> `contextIsolation` <unk> `false` <unk> `true` <unk>
<unk> `nodeIntegration` <unk> `true` <unk> `false` <unk>
<unk> `webviewTag` `, valoarea `nodeIntegration` dacă este setată, altfel `adevărat` <unk> `false` <unk>

</div>

Rețineți: în prezent există [o eroare cunoscută (#9736)](https://github.com/electron/electron/issues/9736) care împiedică tag-ul `webview` să funcționeze dacă `contextIsolarea` este activată. Fiți atenți la problema GitHub pentru informații actualizate!

Aflați mai multe despre izolarea contextului, integrarea Node și `webview` în [documentul de securitate Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 va utiliza în continuare implicitele curente, dar dacă nu pasezi o valoare explicită pentru ele, vei vedea un avertisment de descurajare. Pentru a pregăti aplicația ta pentru Electron 5.0, folosește valori explicite pentru aceste opțiuni. [Vezi `BrowserWindow` documente](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) pentru detalii despre fiecare dintre aceste opțiuni.

### `webContents.findInPage(text, [opțiuni])`

Opțiunile `medialCapitalAsWordStart` și `wordStart` au fost învechite pentru că au fost eliminate în amonte.

## Program de FeedBack a Aplicațiilor

Programul de feedback al aplicației [](https://electronjs.org/blog/app-feedback-program) a fost creat în timpul dezvoltării Electron 3. a reușit, așa că am continuat-o și în timpul dezvoltării lui 4.0. Am dori să îi mulțumim masiv lui Atlassian, Discord, MS Teams, OpenFin, Slack, Simfonie, WhatsApp și ceilalți membri ai programului pentru implicarea lor în timpul celor 4. ciclu beta. Pentru a afla mai multe despre Programul de Feedback al Aplicațiilor și pentru a participa la viitoarele betase, [vedeți postarea noastră pe blog despre program](https://electronjs.org/blog/app-feedback-program).

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. [Vedeți documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru mai multe informații detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
