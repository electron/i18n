---
title: 'Proiectul săptămânii: WebTorrent'
author:
  - ferosi
  - zeke
date: '2017-03-14'
---

Săptămâna aceasta ne-am prins cu [@feross](https://github.com/feross) şi [@dcposch](https://github.com/dcposch) pentru a vorbi despre WebTorrent, clientul de torrent bazat pe web care conectează utilizatorii împreună pentru a forma o rețea distribuită, descentralizată de browser-la-browser.

---

## Ce este WebTorrent?

[WebTorrent](https://webtorrent.io) este primul client de torrent care funcționează în browser. Este scris complet în JavaScript şi poate folosi WebRTC pentru transportul peer-to-peer. Nu este necesar niciun plugin, extensie sau instalare pentru browser.

Folosind standardele web deschise, WebTorrent conectează utilizatorii site-ului web împreună pentru a forma o reţea distribuită de browser-la-browser pentru transferul eficient de fişiere.

Puteţi vedea o demonstraţie a WebTorrent în acţiune aici: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="pagina web webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## De ce este răcoros?

Imaginați-vă un site video ca YouTube, dar unde vizitatorii ajută să găzduiască conținutul site-ului. Cu cât mai mulţi oameni care folosesc un site web alimentat de WebTorrent, cu atât devine mai rapid şi mai rezistent.

Comunicarea Browser-la-browser taie intermediarul și permite oamenilor să comunice în termeni proprii. Fără client/server – doar o rețea de parteneri, toți egali. WebTorrent este primul pas în drumul către re-descentralizarea web-ului.

## Unde intră Electron în imagine?

Acum aproximativ un an, am decis să construim [WebTorrent Desktop](https://webtorrent.io/desktop/), o versiune de WebTorrent care rulează ca o aplicație desktop.

[![Fereastra player-ului WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Am creat WebTorrent Desktop pentru trei motive:

1. Am vrut o aplicație de torrent curată, ușoară, fără reclame, cu sursă deschisă
2. Am dorit o aplicație de torrent cu suport de streaming
3. Avem nevoie de un "client hibrid" care să conecteze rețelele BitTorrent și WebTorrent

## Dacă putem deja descărca torrente în browser-ul meu web, de ce o aplicație desktop?

În primul rând, un pic de fundal despre design-ul WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logo desktop webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

La început, BitTorrent a folosit TCP ca protocol de transport. Ulterior, uTP a promis o performanţă mai bună şi avantaje suplimentare faţă de TCP. Fiecare client tradițional de torrent a adoptat în cele din urmă uTP, și astăzi puteți folosi oricare dintre protocoalele BitTorrent. Protocolul WebRTC este următorul pas logic. Aceasta aduce promisiunea de interoperabilitate cu browserele web – o rețea P2P gigantică alcătuită din toți clienții BitTorrent pentru desktop și milioane de browsere web.

„Parteneri web” (parteneri de torrente care rulează într-un browser web) fac rețeaua BitTorrent mai puternică prin adăugarea de milioane de parteneri noi, şi răspândirea BitTorrent la zeci de cazuri noi de utilizare. WebTorrent respectă specificația BitTorrent cât mai aproape posibil, pentru a ușura adăugarea suportului pentru WebTorrent de către clienții deja existenți.

Unele aplicații de torrent, cum ar fi [Vuze](https://www.vuze.com/) suportă deja parteneri web, dar nu am vrut să așteptăm pentru restul pentru a adăuga suport. **Prin urmare, WebTorrent Desktop a fost modul nostru de a accelera adoptarea protocolului WebTorrent.** Făcând o aplicație minunată de torrente pe care oamenii chiar doresc să o folosească, mărim numărul de parteneri din rețea care pot partaja torente cu parteneri web (i. . utilizatori pe site-uri).

## Ce folosesc unele cazuri interesante pentru torrente dincolo de ceea ce oamenii știu deja că pot face?

Una dintre cele mai interesante utilizări ale WebTorrent este livrarea asistată de parteneri. Proiectele non-profit precum [Wikipedia](https://www.wikipedia.org/) şi [Arhiva Internet](https://archive.org/) ar putea reduce lăţimea de bandă şi costurile de găzduire permiţând vizitatorilor să se cipească. Conținutul popular poate fi servit browser-ului, rapid și ieftin. Conținutul accesat rar poate fi servit fiabil deasupra HTTP de pe serverul de origine.

Arhiva Internet şi-a actualizat deja fişierele de torrent, astfel încât să funcţioneze bine cu WebTorrent. Așa că dacă vrei să încorporezi conținut arhivă pe internet, o poți face într-un mod care reduce costurile de găzduire pentru Arhivă, permiţându-le să dedice mai mulţi bani pentru arhivarea reală a internetului!

Există, de asemenea, cazuri interesante de utilizare a afacerilor, de la CDN-uri la livrarea prin P2P.

## Care sunt unele dintre proiectele tale preferate care folosesc WebTorrent?

![Captură ecran pentru aplicația gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Cel mai grozav lucru construit cu WebTorrent, este probabil [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Este o simulare interactivă tridimensională a Calii Lactee. Datele se încarcă dintr-un torent, direct în browser-ul tău. E o inspiraţie pentru a zbura prin sistemul nostru stele şi a ne da seama cât de puţin suntem noi oamenii în comparaţie cu vastitatea universului nostru.

Poți citi despre cum a fost făcut acest lucru în [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), un articol de blog unde autoarea, Charlie Hoey, explică cum a construit harta stelară cu WebGL şi WebTorrent.

<a href="https://brave.com/">
  <img alt="Siglă curajoasă" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Suntem, de asemenea, imense fani ai [Brave](https://brave.com/). Brave este un browser care blochează automat reclamele și trackerele pentru a face internetul mai rapid și mai sigur. Brave added recent torrent, so you can [view traditional torrents without use a separate app](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Această caracteristică este alimentată de WebTorrent.

Așa că, exact cum majoritatea browserelor pot reda fișiere PDF, Brave poate reda link-uri magnet și fișiere de torrent. Sunt doar un alt tip de conținut pe care navigatorul îl sprijină nativ.

Unul dintre cofondatorii sistemului Brave este de fapt Brendan Eich, creatorul JavaScript, limbajul în care am scris WebTorrent, deci credem că este destul de interesant că Brave a ales să integreze WebTorrent.

## De ce ai ales să construiești WebTorrent Desktop pe Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Fereastra principală WebTorrent Desktop" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Există un meme că aplicațiile Electron sunt "umflate" deoarece ele includ întregul modul de conținut Chrome în fiecare aplicație. În unele cazuri, acest lucru este parțial adevărat (o aplicație Electron de instalare este de obicei ~40MB, unde o aplicație de instalare specifică OSCE este de obicei ~20MB).

Cu toate acestea, în cazul WebTorrent Desktop, folosim aproape fiecare caracteristică Electron şi multe zeci de caracteristici Chrome în timpul funcţionării normale. Dacă am vrut să implementăm aceste caracteristici de la zero pentru fiecare platformă, construirea aplicației ar fi durat mai mult de luni sau mai mult sau am fi putut să o lansăm doar pentru o singură platformă.

Doar pentru a obţine o idee, folosim [integrarea dock a Electron](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (pentru a arăta progresul de descărcare), [integrarea barei de meniu](https://electronjs.org/docs/api/menu) (pentru a rula în fundal), [înregistrarea gestionarului de protocol](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (pentru a deschide linkuri magnetice), [blocantul de economisire a energiei](https://electronjs.org/docs/api/power-save-blocker/) (pentru a preveni somnul în timpul redării video) și [actualizare automată](https://electronjs.org/docs/api/auto-updater). Cât despre caracteristicile Chrome, folosim plus: eticheta `<video>` (pentru a reda multe formate video diferite), tag-ul `<track>` (pentru suportul subtitrărilor închise), drag-and-drop-support şi WebRTC (care nu este banal de utilizat într-o aplicaţie nativă).

Fără a mai menționa: motorul nostru de torrente este scris în JavaScript și presupune existența multor API-uri Node, dar în special `Necesar ('net')` și `require('dgram')` pentru suport de socket TCP și UDP.

De fapt, Electron este exact ceea ce aveam nevoie și aveam setul exact de caracteristici de care aveam nevoie pentru a livra o aplicație solidă, șlefuită în timp record.

## Care sunt lucrurile tale preferate despre Electron?

Biblioteca WebTorrent este în dezvoltare ca proiect open source de doi ani. **Am făcut WebTorrent Desktop în patru săptămâni.** Electron este principalul motiv pentru care am putut să construim și să expediem aplicația noastră atât de repede.

La fel ca nodul. s a făcut programarea serverelor accesibilă unei generații de jQuery-using front-end programmers, Electron face dezvoltarea aplicațiilor native accesibilă tuturor celor familiarizați cu Web sau Node. s dezvoltare. Electron este extrem de responsabilizat.

## Codul de partajare al website-ului și al Desktop-ului?

Da, pachetul de [`webtorrent` npm](https://npmjs.com/package/webtorrent) funcționează în Node.js, în browser și în Electron. Același cod poate rula în toate mediile – aceasta este frumusețea JavaScript. Este timpul universal de astăzi. Java Applets a promis aplicatii "Scrie odată, Rulează oriunde", dar acea viziune nu s-a materializat niciodată din mai multe motive. Electron, mai mult decât orice altă platformă, de fapt este destul de aproape de acel ideal.

## Care sunt unele provocări cu care te-ai confruntat în timp ce construiești WebTorrent?

În primele versiuni ale aplicației, ne-am străduit să facem interfața interactivă. Am pus motorul de torrente în același proces de redare care desenează fereastra aplicației principale care, predictibil, a dus la lentoare oricând a existat o activitate intensă a procesorului din partea motorului de torrente (cum ar fi verificarea pieselor de torrent primite de la colegi).

Am reparat acest lucru mutând motorul torentului într-o secundă, proces de redare invizibil cu care comunicăm peste [IPC](https://electronjs.org/docs/api/ipc-main/). În acest fel, dacă acest proces foloseşte pe scurt o mulţime de procesoare, firul UI nu va fi afectat. Derularea şi animaţiile cu buton şi neted sunt atât de satisfăcătoare.

Notă: a trebuit să punem motorul torentului într-un proces de redare, în locul unui proces "principal", pentru că avem nevoie de acces la WebRTC (care este disponibil doar în dispozitivul de redare.)

## În ce domenii ar trebui îmbunătățit Electron?

Un lucru pe care ne-ar plăcea să îl vedem este o documentație mai bună despre cum să construim și să expediem aplicații pregătite pentru producție. în special în jurul subiectelor complicate, cum ar fi semnarea de cod și actualizarea automată. A trebuit să învățăm despre cele mai bune practici săpând în codul sursă și întrebând pe Twitter!

## WebTorrent Desktop este făcut? Dacă nu, ce urmează?

Credem că versiunea actuală a WebTorrent Desktop este excelentă, dar există întotdeauna loc de mai bine. Momentan, lucrăm la îmbunătățirea curbei, performanței, suportului subtitrărilor și suportului codecului video.

If you're interested in getting involved in the project, check out [our GitHub page](https://github.com/feross/webtorrent-desktop)!

## Orice sfaturi de dezvoltare Electron care ar putea fi utile pentru alți dezvoltatori?

[Feross](http://feross.org/), unul dintre contribuitorii WebTorrent Desktop, a ținut recent un discurs *"Electron real în lume: Construirea de aplicații desktop pentru platforme comune cu JavaScript"* la NodeConf Argentina, care conține sfaturi utile pentru lansarea unei aplicații Electron poled. Discursul este folositor mai ales dacă te afli la stadiul în care ai o aplicație de bază funcțională și încerci să ajungi la următorul nivel de lustruș și profesionalism.

[Urmărește aici](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Slides aici](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), un alt contributor WebTorrent, a scris [o listă cu lucrurile pe care le poți face](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) pentru ca aplicația ta să se simtă șlefuită și nativă. Vine cu exemple de coduri și acoperă lucruri precum integrarea macOS dock, drag-and-drop, notificări desktop și asigurându-te că aplicația se încarcă rapid.

