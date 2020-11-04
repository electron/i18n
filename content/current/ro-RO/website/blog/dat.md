---
title: 'Proiectul săptămânii: dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Proiectul recomandat din această săptămână este [Dat](https://datproject.org/), un [grant](https://changelog.com/rfc/6), open source, un instrument descentralizat pentru distribuirea seturilor de date. Dat este construit și întreținut de o [echipă geodistribuită](https://datproject.org/team), dintre care mulți au ajutat să scrie acest post.

---

[![O captură de ecran a vizualizării principale a datelor-desktop, afișând câteva rânduri de date partajate
](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Întâi ce este Dat?

Am vrut să aducem cele mai bune părţi ale partenerilor şi sistemelor distribuite în schimbul de date. Am început cu schimbul de date ştiinţifice şi apoi am început să ne ocupăm de instituţii de cercetare, guvern, servicii publice şi echipe cu sursă deschisă.

O altă modalitate de a te gândi este o sincronizare și de a încărca aplicații precum Dropbox sau BitTorrent Sync, cu excepția faptului că este [open source](https://github.com/datproject). Scopul nostru este să fim o sursă puternică, deschisă, un program non-profit de schimb de date pentru date mari, mici, medii, mici şi mari loturi.

Pentru a utiliza unealta `dat` CLI, tot ce trebuie să tastezi este:

```sh
dat share path/to/my/folder
```

Și dat va crea un link pe care îl poți folosi pentru a trimite către altcineva -- fără servere centrale sau terțe părți nu au acces la datele tale. Spre deosebire de BitTorrent, este de asemenea imposibil să mirosim cine partajează ceea ce ([vezi ciorna de hârtie decat pentru mai multe detalii](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Acum ştim ce e dus. Cum se potrivește Desktop-ul?

[Dat Desktop](https://github.com/datproject/dat-desktop) este o modalitate de a face acest lucru accesibil persoanelor care nu pot sau nu doresc să folosească linia de comandă. Puteți găzdui mai multe date pe aparatul dvs. și să serviți datele prin rețeaua dvs.

## Poți împărți niște cazuri de folosire interesante?

### DataRefuge + proiect Svalbard

Lucrăm la un lucru cu numele de cod [Project Svalbard](https://github.com/datproject/svalbard) care este legat de [DataRefuge](http://www.ppehlab.org/datarefuge), un grup care să sprijine datele guvernamentale privind clima care riscă să dispară. Svalbard este numit după Svalbard Global Seed Vault din Arctica care are o bibliotecă subterană de rezervă de ADN de plante. Versiunea noastră este o colecţie mare controlată de seturi de date ştiinţifice publice. Odată ce știm și putem avea încredere în metadate, putem construi alte proiecte interesante, cum ar fi [o rețea de stocare de date distribuită pentru voluntari](https://github.com/datproject/datasilo/).

### Coaliția de date civice din California

[CACivicData](http://www.californiacivicdata.org/) este o arhivă open-source care servește descărcări zilnice de la CAL-ACCESS, baza de date California care urmărește banii în politică. Ei fac [versiuni zilnice](http://calaccess.californiacivicdata.org/downloads/0), ceea ce înseamnă să găzduiască o mulțime de date duplicate în fișierele lor zip. Lucrăm la găzduirea datelor lor ca un depozit Dat care va reduce cantitatea de complicații și lățime de bandă necesară pentru a face referire la o anumită versiune sau pentru a actualiza la o versiune mai nouă.

## Actualizări Electron

Acesta nu este încă concret, dar credem că un caz de utilizare distractivă ar pune o aplicație Electron compilată într-un repozitoriu dat, apoi folosind un client decolorat în Electron pentru a trage ultimele delte ale aplicaţiei binare construite, pentru a economisi la descărcare timpul de descărcare, dar și pentru a reduce costul lățimii de bandă pentru server.

## Cine ar trebui să folosească Dat Desktop?

Oricine dorește să partajeze și să actualizeze date printr-o rețea p2p. Cercetători de date, hackeri de date deschise, cercetători, dezvoltatori. Suntem super receptivi la feedback dacă cineva are un caz grozav de care nu ne-am gândit încă. Poți să renunți la [Gitter Chat](https://gitter.im/datproject/discussions) și să ne întrebi orice!

## Ce urmează să fie dat și dus Desktop?

Editarea conturilor de utilizator și a metadatelor. Lucrăm la o aplicație web de înregistrare proactivă pentru a fi implementată la [proiectul de date. rg](https://datproject.org/) care va fi practic un 'NPM pentru seturile de date', exceptând avertismentul pe care îl vom lua va fi doar un director cu metadate, iar datele pot fi localizate oriunde online (spre deosebire de NPM sau GitHub, unde toate datele sunt găzduite central, pentru că codul sursă este suficient de mic îl puteţi integra pe toate într-un singur sistem). Deoarece multe seturi de date sunt imense, avem nevoie de un registru federal (similar cu modul în care funcționează trackerii BitTorrent). Vrem să facem ușor pentru oameni să găsească sau să publice seturi de date cu registrul de la un Desktop, pentru a face procesul de schimb de date fără fricțiuni.

O altă caracteristică este folderele multi-scriitor/colaborative. Avem planuri mari de a face fluxuri de lucru colaborative, poate cu ramuri, similare cu git, cu excepția celor proiectate în jurul colaborării cu setul de date. Dar încă lucrăm la stabilitatea generală şi la standardizarea protocoalelor noastre chiar acum!

## De ce ai ales să construiești un Desktop pe Electron?

(e) este construită cu ajutorul Node.js, astfel încât a fost o potrivire naturală pentru integrarea noastră. Dincolo de asta, utilizatorii noștri folosesc o varietate de mașinării din moment ce oamenii de știință, cercetătorii şi oficialii guvernamentali ar putea fi forţaţi să folosească anumite structuri pentru instituţiile lor -- acest lucru înseamnă că trebuie să fim capabili să vizăm Windows şi Linux, precum şi Mac. Desktop ne oferă acest lucru destul de uşor.

## Care sunt unele provocări cu care te confrunți în timp ce construiești Desktop?

Exprimarea a ceea ce doresc oamenii. Am început cu seturi de date tabelare, dar ne-am dat seama că a fost un pic complicat să rezolvăm şi că majoritatea oamenilor nu folosesc baze de date. La jumătatea proiectului, am reproiectat totul, de la zero la a folosi un sistem de fişiere şi nu am privit înapoi.

De asemenea, ne-am confruntat cu unele probleme generale legate de infrastructura Electron, inclusiv:

- Telemetrie - cum să captezi statistici de utilizare anonimă
- Actualizări - Este oarecum fragmentat și magic să setezi actualizări automate
- Lansări - semnare XCode, versiuni de construcție pe Travis, construirea de clădiri beta, toate au fost provocări.

Folosim de asemenea Browserify şi unele transforme de Browserify pe codul 'front-end' în soft Desktop (ceea ce este oarecum ciudat, pentru că încă ne lovim chiar dacă avem nativ `necesită` -- dar pentru că vrem Transformele). Pentru a ajuta mai bine la gestionarea CSS am trecut de la Sass la utilizarea [sheetify](https://github.com/stackcss/sheetify). Ne-a ajutat foarte mult să modulăm CSS și a facilitat mutarea interfeței noastre către o arhitectură orientată către componente, cu dependențe comune. De exemplu, [culorile de date](https://github.com/Kriesse/dat-colors) conțin toate culorile noastre și este partajat între toate proiectele noastre.

Întotdeauna am fost un mare fan al standardelor şi abstractizărilor minime. Întreaga noastră interfață este construită folosind noduri DOM obișnuite cu doar câteva biblioteci ajutătoare. Am început să mutăm unele dintre aceste componente în [elemente de bază](https://base.choo.io), o bibliotecă cu componente reutilizabile de nivel inferior. Ca și în cazul majorității tehnologiei noastre, continuăm să repetăm asta până când o rezolvăm corect, dar ca o echipă avem sentimentul că ne îndreptăm în direcția cea bună.

## În ce domenii ar trebui îmbunătățit Electron?

Credem că cel mai mare punct dureros sunt modulele native. Trebuie să reconstruiești modulele pentru Electron cu npm adaugă complexitate fluxului de lucru. Echipa noastră a dezvoltat un modul numit [`prebuild`](http://npmjs.org/prebuild) care se ocupă de binare pre-construite, care a funcționat bine pentru Node, dar fluxurile de lucru Electron necesită încă un pas personalizat după instalare, de obicei `npm run rebuild`. Era enervant. Pentru a aborda această problemă am trecut recent la o strategie în care am grupat toate versiunile binare compilate ale tuturor platformelor în interiorul portalului npm. Asta înseamnă că tarballs devin mai mari (deși acest lucru poate fi optimizat cu `. o` fișiere - biblioteci partajate), această abordare evită să fie nevoie de a rula scripturi post-instalare și evită reconstruirea modelului `npm run` în totalitate. Înseamnă că `npm install` face ceea ce e corect pentru Electron pentru prima dată.

## Care sunt lucrurile tale preferate despre Electron?

API-urile par destul de bine gândite, sunt relativ stabile, şi face o treabă destul de bună în a ţine la curent cu versiunile din amonte Node, nu prea putem cere!

## Orice sfaturi Electron care ar putea fi utile altor dezvoltatori?

Dacă folosești module native, dă [prebuild](https://www.npmjs.com/package/prebuild) o poză!

## Care este cel mai bun mod de a urmări evoluţiile?

Urmăriți [@dat_project](https://twitter.com/dat_project) pe Twitter, sau abonați-vă la [newsletter](https://tinyletter.com/datdata).

