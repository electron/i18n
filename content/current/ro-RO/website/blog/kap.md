---
title: 'Proiectul săptămânii: Kap'
author:
  - skllcrn
  - sinafină
  - zeke
date: '2017-01-31'
---

Comunitatea Electron crește rapid și oamenii creează noi aplicații și unelte într-un ritm uluitor. Pentru a sărbători acest impuls creativ și a informa comunitatea cu privire la unele dintre aceste noi proiecte, Am decis să lansăm o serie săptămânală de bloguri cu proiecte remarcabile legate de Electron.

---

Această postare este prima din serie, şi funcţionează [Kap](https://getkap.co/), o aplicație de înregistrare pe ecran open-source construită de [Wulkano](https://wulkano.com/), o echipă de designeri și dezvoltatori independenți.

[![Captură ecran Kap](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Ce este Kap?

[Kap este un înregistrator de ecran open-source](https://getkap.co) construit în principal pentru designeri și dezvoltatori pentru a capta cu ușurință munca lor. Oamenii o folosesc pentru a partaja prototipuri, erori de documentare, pentru a crea GIF-uri prostești și totul între.

Am văzut oameni de toate vârstele și fundalurile folosindu-le în medii educaționale, screencasturi, tutoriale... lista continuă. Chiar și pentru a crea active de producție! Suntem complet aruncați în aer de cât de bine a primit micul nostru proiect lateral.

## De ce l-ai construit?

Asta e o întrebare foarte bună, nu e ca și cum ar fi o lipsă de înregistratori de ecran acolo! Am considerat că alternativele sunt fie prea complexe, prea scumpe, fie prea limitate. Nimic nu simte *corect* pentru nevoile noastre de zi cu zi. Credem, de asemenea, că este minunat când instrumentele pe care le folosim pentru a face munca noastră sunt open-source, astfel încât toată lumea poate ajuta la modelarea lor. [Construcția Kap a ajuns să fie la fel de mult despre ceea ce nu am făcut](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Totul este în detalii, o acumulare de mici îmbunătățiri care au devenit schița unui instrument pe care am vrut să-l folosim.

Totuşi, şi poate cel mai important, Kap a devenit un loc în care să ne lăsăm grijile la ușă și să ne distrăm construind ceva pentru noi și pentru oameni ca noi. Este atât de important să creezi un mediu în care să te jefuieşti, să încerci noi raţiuni şi să te bucuri de meşteşugul. Fără cerinţe, fără presiune, fără aşteptări. Ar trebui designerii și dezvoltatorii să facă parte din proiect? De ce, da. Da, ar trebui.

## De ce ai ales să construiești Kap pe Electron?

Au existat mai multe motive:

* Tehnologie web
* Majoritatea echipei sunt dezvoltatori web
* Suntem investiți în JavaScript
* Acesta deschide ușa pentru ca mai mulți oameni să contribuie
* Electron însuși este open-source
* Puterea și modularitatea ușor de întreținut a `node_module`
* Posibilități de platforme comune

Credem că viitorul aplicațiilor se află în browser, dar încă nu am ajuns acolo. Electron este un pas important în drumul spre acel viitor. Nu numai că face aplicațiile mai accesibile, dar și codul cu care sunt construite. Un gând interesant este să ne imaginăm un viitor în care sistemul de operare este un browser, iar filele sunt în esență aplicații Electron.

În plus, fiind în principal dezvoltatori web, suntem mari fani ai naturii izomorfice a JavaScript, în asta poți rula JS pe client, server și acum pe desktop. Cu tehnologie web (HTML, CSS și JS), multe lucruri sunt mult mai simple decât native: prototip mai rapid, mai puțin cod, flexbox > auto-layout (macOS/iOS).

## Care sunt unele provocări cu care te confrunţi în timp ce construieşti Kap?

Utilizând resursele disponibile de Electron pentru a înregistra ecranul a fost cea mai mare provocare. Pur și simplu nu erau suficient de performante pentru a îndeplini cerințele noastre și ar face ca proiectul să fie un eșec în ochii noștri. Deși nu este vina lui Electron în sine, există încă un decalaj între dezvoltarea nativă și construirea de aplicații desktop cu web tech.

Am petrecut mult timp încercând să lucrăm în jurul performanțelor slabe ale API-ului `getUserMedia` , o problemă originară din Chromium. Unul dintre obiectivele noastre principale când ne-am propus să facem Kap a fost să construim întreaga aplicație cu web tech. După ce am încercat tot ce am putut pentru a-l face să funcţioneze (cerinţa minimă este 30 FPS pe un ecran Retina), în cele din urmă a trebuit să găsim o altă soluție.

## Văd niște cod Swift în repo. Despre ce este vorba?

Fiind forțați să caute alternative la `getUserMedia`, am început să experimentăm cu `ffmpeg`. Pe lângă faptul că este unul dintre cele mai bune instrumente pentru conversia audio și video, acesta are funcționalitatea de a înregistra ecranul în aproape orice sistem de operare, și am reușit să înregistrăm videoclipul crispy îndeplinind cerința minimă de 30 FPS pe un ecran Retina. Problemă? Performanţa a fost ":weary:", utilizarea procesorului a început să fie haywire. Aşa că ne-am întors la comitetul de elaborare, am discutat opţiunile noastre şi ne-am dat seama că trebuie să facem un compromis. Asta a dus la [Aperture](https://github.com/wulkano/aperture), propria noastră bibliotecă de înregistrare pe ecran pentru macOS scrisă în Swift.

## În ce domenii ar trebui îmbunătățit Electron?

Știm cu toții că aplicațiile Electron pot avea un lucru pentru folosirea RAM, dar din nou, asta e o chestie de Chromium. Este o parte din modul în care funcționează și depinde cu adevărat de ceea ce faceți, De exemplu, Kap și Hyper utilizează, de obicei, mai puțin de 100 MB de memorie.

Unul dintre cele mai mari domenii de îmbunătăţire pe care le vedem este încărcătura, în special modul în care Electron distribuie Chromium. O idee ar fi să avem un nucleu Electron partajat și să facem aplicațiile de instalare să verifice dacă este deja prezent în sistem.

Crearea de aplicații Electron pe mai multe platforme ar putea fi o experiență mai bună. În acest moment există prea multe inconsecvenţe, API-uri specifice platformei şi caracteristici lipsă între platforme, făcând codebaza încărcată cu declaraţii. De exemplu, vibrația este suportată doar pe macOS, actualizarea automată funcționează diferit pe macOS și Windows, și nici măcar nu este suportată pe Linux. Transparenţa este o lovitură sau o ratează pe Linux, de obicei ratează.

De asemenea, ar trebui să fie mai ușor să se numească API ale sistemului autohton. Electron vine cu un set foarte bun de API-uri, dar uneori ai nevoie de funcționalitate pe care nu o oferă. Crearea unui addon nativ Node.js este o opțiune, dar este dureros să lucrezi. Ideal, Electron ar livra cu un bun [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API, ca [`apel rapid`](https://github.com/cmake-js/fastcall). Acest lucru ne-ar fi permis să scriem partea SWIFT în JavaScript.

## Care sunt lucrurile tale preferate despre Electron?

Chestia noastră preferată este faptul că oricine știe să creeze pentru web poate construi și contribui la experiențele native pe mai multe platforme. Ca să nu mai vorbim de uşurinţa şi bucuria de a dezvolta documentaţia excelentă şi ecosistemul înfloritor.

Dintr-o perspectivă de față, construirea Kap nu a făcut altceva decât să construiască un site simplu folosind API-uri de browser. Electron face o treabă foarte bună în a face dezvoltarea aplicațiilor similare (în mod identic) cu dezvoltarea web. De fapt atât de simplu încât nu a fost nevoie de cadre sau similare pentru a ne ajuta, doar JS și CSS curate și modulare.

Suntem, de asemenea, imense fani ai construcției echipei, ai dedicării și sprijinului lor, precum și ai comunității active și prietenoase pe care o susțin. Ține cu tine toți!

## Ce urmează în Kap?

Următorul pas pentru noi este să revizuim aplicația în pregătirea pentru programul nostru 2.0. piatra de hotar, care include o rescriere React în plus față de suport pentru plugin-uri, permițând dezvoltatorilor să extindă funcționalitatea Kap! Invităm pe toată lumea să urmeze proiectul și să contribuie la [GitHub](https://github.com/wulkano/kap). Ascultăm şi vrem să auzim de la cât mai mulţi dintre voi posibil, [Spune-ne cum putem face Kap cel mai bun instrument posibil pentru tine](https://wulkano.typeform.com/to/BIvJKz)!

## Ce este Wulkano?

[Wulkano](https://wulkano.com) este un studio de design și un colectiv digital, o echipă de tehnologi de la distanţă care iubesc să lucreze împreună la ambele cadouri ale clienţilor şi la propriile noastre proiecte. Suntem un grup distribuit dar strâns legat de oameni din locuri și medii diferite, împărtășind cunoștințe, idei, experiențe, dar, cel mai important, GIF-uri și meme proaste, în biroul nostru virtual (care se întâmplă să fie slăbirea Electronului!).

## Orice sfaturi Electron care ar putea fi utile altor dezvoltatori?

Profitați de comunitatea [fantastică](https://discuss.atom.io/c/electron), vedeți [Electron Awesome](https://github.com/sindresorhus/awesome-electron), uită-te la [exemple](https://github.com/electron/electron-api-demos) şi foloseşti cele mai bune [documente](https://electronjs.org/docs/)!

