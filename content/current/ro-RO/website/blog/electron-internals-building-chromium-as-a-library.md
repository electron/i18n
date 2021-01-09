---
title: 'Electron Internals: Construirea cromului ca o bibliotecă'
author: zcbenz
date: '2017-03-03'
---

Electron este bazat pe Chromium Google open-source, un proiect care nu este neapărat proiectat pentru a fi folosit de alte proiecte. Această postare prezintă modul în care Chromium este construit ca o bibliotecă pentru utilizarea Electron și cum sistemul de construcție a evoluat de-a lungul anilor.

---

## Folosind CEF

Chromium Embedded Framework (CEF) este un proiect care transformă Chromium în bibliotecă şi oferă API stabile bazate pe codul Chromium. Foarte versiunile timpurii ale editorului Atom și NW.js au folosit CEF.

Pentru a menţine un API stabil, CEF ascunde toate detaliile Chromium şi înfăşoară API-urile lui Chromium cu propria sa interfaţă. Aşa că atunci când trebuia să accesăm API-uri Chromium subiacente, cum ar fi integrarea Node.js în paginile web, avantajele ale CEF au devenit blocante.

Deci în final, atât Electron cât şi NW.js au trecut la folosirea API-ului Chromium direct.

## Construirea ca parte din Crom

Chiar dacă Chromium nu sprijină în mod oficial proiectele din afară, codebaza este modulară şi este uşor să construieşti un browser minim bazat pe Chromium. Modulul de bază care furnizează interfața browser-ului se numește Modulul de conținut.

Pentru a dezvolta un proiect cu modulul de conținut, cea mai ușoară cale este să construiești proiectul ca parte a Chromium. Acest lucru poate fi realizat mai întâi prin verificarea codului sursă Chromium, şi apoi prin adăugarea proiectului la fişierul `DEPS` al Chromium.

NW.js și versiunile timpurii de Electron folosesc acest mod pentru construire.

Partea negativă este, Chromium este un codebază foarte mare şi necesită maşini foarte puternice pentru construcţie. Pentru laptop-uri normale, care pot dura mai mult de 5 ore. Deci acest lucru are un impact major asupra numărului de dezvoltatori care pot contribui la proiectul și, de asemenea, face dezvoltarea mai lentă.

## Construind Chromium ca o singură bibliotecă comună

Ca utilizator al modulului de conținut, Electron nu trebuie să modifice codul Chromium în cele mai multe cazuri, astfel încât un mod evident de a îmbunătăţi clădirea Electron este să construieşti Chromium ca o bibliotecă comună, și apoi conectați cu ea în Electron. În acest mod dezvoltatorii nu mai trebuie să construiască toate de pe Chromium atunci când contribuie la Electron.

Proiectul [libchromiumcontent](https://github.com/electron/libchromiumcontent) a fost creat de [@aroben](https://github.com/aroben) în acest scop. Acesta construiește Conținutul Modulul Chromium ca o bibliotecă partajată, apoi oferă antetele Chromiumului și binarele preconstruite pentru descărcare. Codul versiunii iniţiale a libchromiumcontent poate fi găsit [în acest link](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Proiectul [strălucitor](https://github.com/electron/brightray) a fost de asemenea născut ca parte a libchromiumcontent, care oferă un strat subţire în jurul modulului de conţinut.

Folosind libchromiumcontent și brightray împreună, dezvoltatorii pot construi rapid un browser fără a intra în detaliile construirii Chromium. Și elimină cerința unei rețele rapide și a unei mașini puternice pentru construirea proiectului.

În afară de Electron, au fost construite și alte proiecte bazate pe Chromium în acest mod, cum ar fi browser-ul [Întunecat](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrare simboluri exportate

Pe Windows există o limitare a numărului de simboluri pe care le poate exporta o bibliotecă partajată. Deoarece codebaza Chromium a crescut, numărul de simboluri exportate în libchromiumcontent a depăşit rapid limitarea.

Soluţia a fost să filtreze simbolurile innecesare la generarea fişierului DLL. A lucrat cu [furnizând un `. ef` fișier către link-ul](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), şi apoi folosind un script pentru [judecaţi dacă simbolurile sub un spaţiu de nume ar trebui exportate](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Luând această abordare, Chromium a continuat să adauge noi simboluri exportate, libchromiumcontent poate genera în continuare fișiere librării partajate prin decaparea mai multor simboluri .

## Componenta construită

Înainte de a vorbi despre următorii paşi făcuţi în libchromiumcontent, este important să introduci mai întâi conceptul de componentă construită în Chromium.

Ca un proiect uriaş, pasul de legătură durează foarte mult în Chromium atunci când se construieşte. În mod normal când un dezvoltator face o mică schimbare, poate dura 10 minute pentru a vedea rezultatul final. Pentru a rezolva acest lucru, Chromium a introdus componenta construită, care construieşte fiecare modul în Chromium ca şi biblioteci partajate separate, astfel încât timpul petrecut în pasul final de legătură să devină neobservabil.

## Livrare binare brute

Cu cromul care continuă să crească, au fost atât de multe simboluri exportate în Chromium încât chiar şi simbolurile modulului de conţinut şi ale setului Webkit au fost mai mult decât limita . A fost imposibil să se genereze o bibliotecă comună utilizabilă doar simboluri decongelate.

În final, a trebuit să [livrăm binarele brut al Chromium](https://github.com/electron/libchromiumcontent/pull/98) în loc de generând o singură bibliotecă comună.

La fel ca mai devreme, există două moduri de construcţie în Chromium. Ca urmare a expedierii de binari neprelucrați, trebuie să livrăm două distribuții diferite de binare în libchromiumcontent. Unul se numește `static_library` construit, care include toate bibliotecile statice ale fiecărui modul generate de construirea normală a Chromium. Cealaltă este `shared_library`, care include toate bibliotecile partajate ale fiecărui modul generate de componenta construită.

În Electron, versiunea de Debug este conectată cu versiunea `shared_library` a libchromiumcontent, pentru că este mic să descarci și durează puțin atunci când se leagă executabilul final. Iar versiunea de lansare a Electron este legată de versiunea `static_library` a libchromiumcontent, astfel încât compilatorul să poată genera simboluri complete care sunt importante pentru depanare, iar linkerul poate optimiza mult mai bine deoarece știe care obiect sunt fișierele necesare și care nu.

Pentru dezvoltarea normală, dezvoltatorii trebuie doar să construiască versiunea Debug, care nu necesită o rețea bună sau o mașină puternică. Deși versiunea de lansare necesită hardware mult mai bun pentru a construi, poate genera binare optimizate.

## Actualizarea `gn`

Fiind unul dintre cele mai mari proiecte din lume, cele mai normale sisteme nu sunt potrivite pentru construirea Chromium, iar echipa de Chromium dezvoltă propriile lor unelte .

Versiunile anterioare de Chromium foloseau `gyp` ca un sistem de construcţii, dar suferă din cauza încetinirii, şi fişierul de configurare devine greu de înţeles pentru proiectele complexe . După ani de dezvoltare, Chromium a trecut la `gn` ca sistem de construcții, care este mult mai rapid și are o arhitectură clară.

Una dintre îmbunătățirile aduse de `gn` este de a introduce `source_set`, care reprezintă un grup de fișiere de obiecte. În `gyp`, fiecare modul a fost reprezentat fie de `static_library` fie `shared_library`, și pentru construirea normală a Chromium, fiecare modul a generat o bibliotecă statică și au fost conectate împreună în executabilul final. Folosind `gn`, fiecare modul acum generează doar o grămadă de fișiere obiecte, și executabilul final doar conectează toate fișierele obiectului, astfel încât fișierele bibliotecii statice intermediare să nu mai fie generate.

Cu toate acestea, această îmbunătăţire a făcut mari probleme la libchromiumcontent, pentru că fişierele cu bibliotecă statică intermediară au fost de fapt necesare din cauza libchromiumcontent.

Prima încercare de a rezolva aceasta a fost de a [patch `gn` pentru a genera fișiere librăriei statice](https://github.com/electron/libchromiumcontent/pull/239), care a rezolvat problema, dar nu a fost nici pe departe o soluție decentă .

A doua încercare a fost făcută de [@alespergl](https://github.com/alespergl) pentru a [produce biblioteci statice personalizate din lista fișierelor obiectului](https://github.com/electron/libchromiumcontent/pull/249). A folosit un truc pentru a rula mai întâi o construcție fictivă pentru a colecta o listă de fișiere de obiect generate, și apoi să construiești bibliotecile statice hrănind `gn` cu lista. A făcut doar schimbări minime în codul sursă al Chromium, şi a păstrat încă arhitectura clădirii Electron.

## Summary

După cum vedeți, în comparație cu construirea Electron ca parte din Chromium, construirea Crom ca o bibliotecă face eforturi mai mari și necesită întreținere continuă. Cu toate acestea, cel din urmă elimină cerinţa hardware-ului puternic pentru a construi Electron, permițând astfel unei game mult mai largi de dezvoltatori să construiască și să contribuie la Electron. Efortul merită în totalitate.

