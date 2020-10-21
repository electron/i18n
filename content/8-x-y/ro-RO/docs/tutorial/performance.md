# Performanță

Developers frequently ask about strategies to optimize the performance of Electron applications. Inginerii de software, consumatorii și dezvoltatorii de programe nu sunt întotdeauna de acord cu o singură definiție a ceea ce înseamnă „performanță”. This document outlines some of the Electron maintainers' favorite ways to reduce the amount of memory, CPU, and disk resources being used while ensuring that your app is responsive to user input and completes operations as quickly as possible. În plus, dorim ca toate strategiile de performanță să mențină un standard înalt pentru securitatea aplicației tale.

Înțelepciune și informații despre cum să construiești website-uri performante cu JavaScript se aplică în general și pentru aplicațiile Electron. Într-o anumită măsură, resursele discută despre cum să construiești nodul performant. s Aplicațiile se aplică, de asemenea, dar fiți atent să înțelegeți că termenul "performanță" înseamnă lucruri diferite pentru un nod. s backend decât pentru o aplicație care rulează pe un client.

This list is provided for your convenience – and is, much like our [security checklist][security] – not meant to exhaustive. Probabil că este posibil să construiești o aplicație Electron lentă care urmează toți pașii menționați mai jos. Electron este o platformă puternică de dezvoltare care vă permite dezvoltatorului, să faceți mai multe sau mai puțin orice doriți. Tot ce înseamnă acea libertate înseamnă că performanța este în mare măsură responsabilitatea ta.

## Măsurare, măsurare, măsurare

Lista de mai jos conține o serie de pași care sunt destul de simpli și ușor de implementat. Cu toate acestea, construirea celei mai performante versiuni a aplicației tale va necesita ca tu să mergi mai departe de un număr de pași. În schimb, va trebui să examinezi cu atenție tot codul care rulează în aplicația ta prin crearea de profiluri și măsurarea. Unde sunt blocajele? Când utilizatorul apasă pe un buton, ce operațiuni iau greul timpului? În timp ce aplicația pur și simplu farmează, care obiecte acceptă cea mai mare memorie?

De nenumărate ori, am văzut că strategia cea mai de succes pentru construirea unei aplicații Electron performante este să profileze codul rulant, găsește cea mai piesă din ea înfometată de resurse și o optimizează. Repetarea acestui proces aparent greoi din nou și din nou va crește dramatic performanța aplicației . Experiența de a lucra cu aplicații majore precum Visual Studio Code sau Slack a arătat că această practică este de departe cea mai fiabilă strategie pentru a îmbunătăți performanța.

Pentru a afla mai multe despre cum să profilezi codul aplicației tale, familiarizează-te cu instrumentele de dezvoltare Chrome. Pentru o analiză avansată care se uită la mai multe procese simultan, considerați instrumentul [Chrome Tracing].

### Lectură recomandată

 * [Începeți cu analiza performanțelor Runtime][chrome-devtools-tutorial]
 * [Vorbire: "Codul Studio vizual - Prima Secundă"][vscode-first-second]

## Checklist

Șansa este că aplicația ta ar putea fi un pic mai suplă, mai rapidă și, în general, mai puțin resurse lipsite de resurse dacă încerci acești pași.

1. [Include cu atenție modulele](#1-carelessly-including-modules)
2. [Se încarcă și se execută codul prea curând](#2-loading-and-running-code-too-soon)
3. [Blocarea procesului principal](#3-blocking-the-main-process)
4. [Blocarea procesului de redare](#4-blocking-the-renderer-process)
5. [Poliolizi inutili](#5-unnecessary-polyfills)
6. [Solicitări de rețea inutile sau blocate](#6-unnecessary-or-blocking-network-requests)
7. [Pachează codul tău](#7-bundle-your-code)

## 1) Includerea cu atenție a modulelor

Înainte de a adăuga un modul Node.js în aplicația ta, examinați modulul menționat. How many dependencies does that module include? Ce fel de resurse are nevoie pentru a fi apelate într-o declarație `necesară()`? S-ar putea să găsiți că modulul cu cele mai multe descărcări de pe registrul de pachete NPM sau cele mai stele de pe GitHub nu este de fapt cel mai indulgent sau mai mic disponibil.

### De ce?

Raționamentul din spatele acestei recomandări este ilustrat cel mai bine cu un exemplu din lumea reală . În primele zile ale Electron, detectarea de încredere a conexiunii a fost o problemă, a rezultat că multe aplicații folosesc un modul care a expus o metodă simplă `isOnline()`.

Acel modul a detectat conectivitatea la rețea încercând să ajungă la un număr de criterii bine cunoscute. Pentru lista acestor criterii de final, depindea de un modul diferit, care conţinea, de asemenea, o listă de porturi binecunoscute. Această dependenţă se bazează pe un modul care conţine informaţii despre porturi, care a venit sub forma unui fișier JSON cu mai mult de 100.000 de linii de conținut. Ori de cate ori modulul a fost incarcat (de obicei intr-o instructiune `('module')` declaratie), ar încărca toate dependențele sale și în cele din urmă ar citi și analiza acest fișier JSON . Parcarea a mii de linii de JSON este o operaţiune foarte scumpă. Pe o mașinărie lentă poate dura întregi secunde de timp.

În multe contexte de servere, timpul de pornire este practic irelevant. Un modul. s server care necesită informații despre toate porturile este probabil de fapt "mai performant" dacă încarcă toate informațiile necesare în memorie ori de câte ori serverul pornește la beneficiul deservirii cererilor mai repede. Modulul discutat în acest exemplu nu este un modul "rău". Cu toate acestea, aplicațiile Electron nu ar trebui să încarce, să parseze și să stocheze în memorie informații de care nu are nevoie.

Pe scurt, un modul aparent excelent scris în principal pentru serverele Node.js care rulează Linux ar putea fi o veste proastă pentru performanţa aplicaţiei dvs. In acest exemplu particular solutia corecta a fost sa se foloseasca niciun modul, și pentru a utiliza verificările de conectivitate incluse în versiunile ulterioare de Chromium.

### Cum?

Cand analizezi un modul, iti recomandam sa verifici:

1. dimensiunea dependențelor incluse la 2) resursele necesare pentru a încărca (`Necesar()`
3. resursele necesare pentru a efectua acțiunea de care sunteți interesați

Generarea unui profil CPU și a unui profil de memorie heap pentru încărcarea unui modul poate fi făcută cu o singură comandă pe linia de comandă. În exemplul de mai jos, ne uităm la modulul popular `cererea`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Executând rezultatele acestei comenzi într-un fişier `.cpuprofile` şi un fişier `.heapprofile` în directorul în care l-aţi executat. Ambele fișiere pot fi analizate folosind uneltele Chrome Developer Tools, folosind filele `Performanță` și `Memorie` .

![performance-cpu-prof][]

![performance-heap-prof][]

În acest exemplu, pe mașina autorului, am văzut că încărcarea cererii `` a luat aproape o jumătate de secundă, `în timp ce <code> node-fetch` a luat mult mai puțină memorie și mai puțin de 50 ms.

## 2) Se încarcă și se execută prea curând

Dacă aveți operații scumpe de instalare, luați în considerare amânarea acestora. Inspectează toate lucrările care se execută imediat după începerea aplicației. În loc să trageți de pe toate operațiile imediat, luați în considerare să le treziți într-o secvență mai mare aliniat cu călătoria utilizatorului.

În dezvoltarea tradițională a Node.js, suntem obișnuiți să punem toate declarațiile noastre `require()` în partea de sus. If you're currently writing your Electron application using the same strategy _and_ are using sizable modules that you do not immediately need, apply the same strategy and defer loading to a more opportune time.

### De ce?

Încărcarea modulelor este o operaţie surprinzător de scumpă, în special pe Windows. Când aplicația pornește, ea nu ar trebui să facă utilizatorii să aștepte operațiuni care nu sunt în prezent necesare.

Acest lucru ar putea părea evident, dar multe aplicații tind să facă o mulțime de să lucreze imediat după lansarea aplicației - cum ar fi verificarea actualizărilor, descărcarea conținutului folosit într-un flux ulterior sau efectuarea de operațiuni cu disc I/O .

Să considerăm codul Visual Studio ca pe un exemplu. Când deschideți un fișier, va afișa fișierul imediat fără evidențierea codului, prioritizând abilitatea ta de a interacționa cu textul. Odată ce a făcut treaba, va trece la evidențierea codului.

### Cum?

Să luăm în considerare un exemplu și să presupunem că aplicația ta analizează fișierele în formatul fictiv `.foo`. Pentru a face acest lucru, se bazează pe modulul la fel de fictiv `foo-parser`. În dezvoltarea tradițională a Node.js, este posibil să scrieți un cod care să încarce dependențele:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

În exemplul de mai sus, facem o mulțime de muncă care se execută imediat ce este încărcat fișierul. Trebuie să obținem imediat fișierele analizate? Am putea să facem acest lucru puțin mai târziu, când `getParsedFiles()` este de fapt apelat?

```js
// "fs" este posibil să se încarce deja; așa că apelul `require()` este ieftin
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk imediat ce `getFiles` este apelat, nu mai devreme.
    // De asemenea, asigură-te că nu blocăm alte operații folosind
    // versiunea asincronă.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Deoarece `require()` vine cu un modul cache, apelul `require()`
    // va fi scump o singură dată - apelurile ulterioare ale lui `getParsedFiles()`
    // vor fi mai rapide.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// This operation is now a lot cheaper than in our previous example
const parser = new Parser()

module.exports = { parser }
```

Pe scurt, alocă resurse "doar în timp" în loc să le aloci pe toate atunci când aplicația ta pornește.

## 3) Blocarea procesului principal

Procesul principal al Electron (uneori numit "proces browser") este special. Este procesul părinte pentru toate celelalte procese ale aplicației tale și procesul principal cu care interacționează sistemul de operare. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

În nici un caz nu ar trebui să blocați acest proces și firul UI cu operații de lungă durată. Blocarea temei UI înseamnă că întreaga aplicație va îngheța până când procesul principal este gata de procesare.

### De ce?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Dacă fereastra dvs. redă o animație fluturată netedă, va trebui să vorbească cu procesul GPU despre asta – încă o dată trecând prin procesul principal.

Electron şi Chromium sunt atenţi să pună operaţii de tip I/O şi CPU cu discuri grele pe noi teme de discuţie, pentru a evita blocarea firului de interfaţă. Ar trebui să faceți același lucru.

### Cum?

Arhitectura puternică multi-proces a Electron este gata să te ajute cu sarcinile tale lungi dar include și un număr mic de capcane de performanță.

1) For long running CPU-heavy tasks, make use of [worker threads][worker-threads], consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Evitați utilizarea IPC sincron și a modulului `la distanță` cât mai mult posibil. While there are legitimate use cases, it is far too easy to unknowingly block the UI thread using the `remote` module.

3) Evitați să utilizați operațiunile I/O în procesul principal. Pe scurt, de fiecare dată când nodul de nucleu. s module (ca `fs` sau `child_process`) oferă o versiune sincron sau asincron, ar trebui să preferați varianta asincron și non-blocare .


## 4) Blocarea procesului de redare

De vreme ce Electron navighează cu o versiune curentă a Chrome, puteți folosi cele mai recente și cele mai bune caracteristici pe care Platforma Web le oferă pentru defrișarea sau offload grel într-un mod care vă menține aplicația la un nivel ușor și reactiv.

### De ce?

Aplicația ta probabil are o mulțime de JavaScript pentru a rula în procesul de redare. Traseul este să execute operații cât mai repede posibil fără a lua resursele necesare pentru a continua derularea fără rute, răspunde la datele introduse de utilizator, sau animații la 60 fps.

Orchestrarea fluxului de operațiuni din codul dispozitivului de redare este utilă în special dacă utilizatorii se plâng de aplicația ta uneori "stuttering".

### Cum?

În general, toate sfaturile pentru construirea de aplicații web performante pentru browserele moderne se aplică și dispozitivelor de redare ale Electron. Cele două instrumente principale pe care le aveți la dispoziție sunt în prezent `requestIdleCallback()` pentru operațiuni mici și `Web Work` pentru operațiuni de lungă durată.

*`requestIdleCallback()`* permite dezvoltatorilor să stea la coadă o funcție pentru a fi executată imediat ce procesul intră în perioada de inactivitate. Vă permite să efectuați o activitate cu prioritate scăzută sau de fundal fără a avea impact asupra experienței utilizatorului. For more information about how to use it, [check out its documentation on MDN][request-idle-callback].

*Web Works* sunt o unealtă puternică pentru a rula codul pe o temă separată. There are some caveats to consider – consult Electron's [multithreading documentation][multithreading] and the [MDN documentation for Web Workers][web-workers]. Sunt o soluție ideală pentru orice operațiune care necesită multă putere CPU pentru o perioadă lungă de timp.


## 5) Polifilări inutile.

Unul dintre cele mai bune beneficii ale Electron este acela că știi exact care motor va analiza JavaScript, HTML și CSS. Dacă refolosiți codul care a fost scris pentru web în general, asigurați-vă că nu poliliniți funcțiile incluse în Electron.

### De ce?

La construirea unei aplicații web pentru internetul de azi, cele mai vechi medii dictează ce caracteristici poți și ce nu poți folosi. Chiar dacă Electron suportă filtre și animații CSS performante, este posibil ca un browser mai vechi să nu funcționeze. Unde ai putea folosi WebGL, este posibil ca dezvoltatorii tăi să fi ales o soluție mai lipsită de resurse pentru a sprijini telefoanele mai vechi.

Când vine vorba de JavaScript, este posibil să fi inclus biblioteci cu unelte cum ar fi jQuery for DOM selectors or polyfills like `regenerator-runtime` to support `async/await`.

Este rar ca un polyfill bazat pe JavaScript să fie mai rapid decât caracteristica nativă echivalentă din Electron. Nu încetini aplicația ta Electron expediind propria ta versiune de platformă web standard.

### Cum?

Funcționează în ipoteza că poliliniile versiunii curente a Electron nu sunt necesare. If you have doubts, check \[caniuse.com\]\[https://caniuse.com/\] and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

În plus, examinați cu atenție bibliotecile pe care le folosiți. Sunt ele cu adevărat necesare? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available][jquery-need].

Dacă utilizați un transpiler/compilator ca TypeScript, examinați configurația sa și asigurați-vă că vizați ultima versiune ECMAScript suportată de Electron.


## 6) Solicitări de rețea inutile sau blocate

Evitați preluarea de resurse de pe internet rareori schimbându-le dacă acestea pot fi însoțite de aplicația dvs.

### De ce?

Mulți utilizatori de Electron încep cu o aplicație bazată exclusiv pe web pe care ei o transformă într-o aplicație pentru desktop. Ca dezvoltatori web, suntem obișnuiți să încărcăm resurse dintr-o varietate de rețele de livrare a conținutului. Acum că expediezi o aplicație desktop adecvată, încearcă să "tai cordonul" acolo unde este posibil
 - și evitați să lăsați utilizatorii să aștepte resurse care nu se schimbă niciodată și care ar putea fi incluse cu ușurință în aplicația dvs.

Un exemplu tipic este Google Fonts. Mulți dezvoltatori folosesc colecția impresionantă de fonturi gratuite de la Google, care vine cu o rețea de livrare de conținut . Muntul este simplu: Include câteva linii de CSS și Google va avea grijă de restul.

Când construiești o aplicație Electron, utilizatorii tăi sunt mai bine deserviți dacă descarci fonturile și le incluzi în pachetul aplicației tale.

### Cum?

Într-o lume ideală, aplicația ta nu ar avea nevoie de rețea pentru a funcționa pe deloc. Pentru a ajunge acolo, trebuie să înțelegeți ce resurse se descarcă aplicația ta \- și cât de mari sunt aceste resurse.

În acest scop, deschideţi instrumentele de dezvoltare. Navigați la `Rețea` și verificați opțiunea de `Dezactivare`. Apoi, reîncărcați dispozitivul de redare. Dacă aplicația ta nu interzice astfel de reîncărcări, de obicei puteţi declanşa o reîncărcare prin accesarea `Cmd + R` sau `Ctrl + R` cu focusul uneltelor de dezvoltare.

Instrumentele vor înregistra acum cu meticulozitate toate cererile de rețea. Într-o primă etapă, face un bilanț al tuturor resurselor descărcate, concentrându-se mai întâi pe fișierele mai mari . Sunt vreuna dintre ele imagini, fonturi sau fișiere media care nu se schimbă și ar putea fi inclusă în pachet? În caz afirmativ, includeţi-le.

Ca un pas următor, activați `Adaptarea rețelei`. Găsiți meniul derulant care citește momentan `Online` și selectați o viteză mai lentă, cum ar fi `Rapid 3G`. Reîncărcați dispozitivul de redare și verificați dacă există resurse pentru care aplicația dvs. așteaptă în mod inutil. În multe cazuri, o aplicație va aștepta o cerere de rețea pentru a termina în ciuda faptului că nu are nevoie de resursa implicată.

Ca pont, încărcarea resurselor de pe internet pe care ai putea dori să le schimbi fără expediere, o actualizare a aplicației este o strategie puternică. For advanced control over how resources are being loaded, consider investing in [Service Workers][service-workers].

## 7) Grupează-ți codul

Așa cum s-a subliniat deja în "[Codul de încărcare și funcționare prea curând](#2-loading-and-running-code-too-soon)", apelând `require()` este o operațiune costisitoare. Dacă puteți face acest lucru, grupați codul aplicației într-un singur fișier.

### De ce?

Dezvoltarea modernă JavaScript implică, de obicei, mai multe fișiere și module. În timp ce este perfect în regulă pentru dezvoltarea cu Electron, Vă recomandăm să grupați tot codul într-un singur fișier pentru a vă asigura că cheltuielile de regie incluse în apelarea `obligatoriu()` sunt plătite o singură dată când aplicația se încarcă.

### Cum?

Există numeroase pachete JavaScript și știm mai bine decât să mânizăm comunitatea recomandând un instrument în defavoarea alteia. Cu toate acestea, vă recomandăm să utilizaţi un pachet care este capabil să gestioneze mediul unic al Electron, care trebuie să se ocupe de ambele noduri. s și browsere.

As of writing this article, the popular choices include [Webpack][webpack], [Parcel][parcel], and [rollup.js][rollup].

[security]: ./security.md
[performance-cpu-prof]: ../images/performance-cpu-prof.png
[performance-heap-prof]: ../images/performance-heap-prof.png
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
