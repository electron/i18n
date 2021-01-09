---
title: 'Proiectul săptămânii: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Săptămâna aceasta ne-am întâlnit cu [Aprile Elcich](https://twitter.com/aprileelcich) şi [Paolo Fragomeni](https://twitter.com/0x00A) pentru a vorbi despre Voltra, un player de muzică Electron.

---

## Ce este Voltra?

[Voltra](https://voltra.co/) este un player muzical pentru persoanele care doresc să dețină muzica lor. Este de asemenea un magazin unde poți descoperi și cumpăra muzică nouă pe baza a ceea ce deții deja. Este o platformă încrucișată fără publicitate pentru desktop și mobil. De asemenea, nu te spionează.

[![Vulnerabilitate](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Cine este Voltra?

Oricine ascultă muzica.

## Ce te-a motivat să creezi Voltra?

Radioul a avut întotdeauna o mare parte din ascultători. Se mută de pe unde și pe Internet. Acum poți închiria muzică la cerere — este o revigorare radio! Multe produse și servicii noi au apărut din această cauză. dar transmisiunea prin radio lasă pe altcineva în controlul muzicii tale și al modului în care o simți.

Am vrut un produs concentrat în întregime pe muzica pe care o deții tu. Ceva care a făcut ușor de descoperit și de cumpărat muzică nouă direct de la artiști sau etichete.

## Există o versiune gratuită?

Player-ul desktop este complet gratuit. [Vânzarea muzicii este de asemenea gratuită!](https://voltra.co/artists) Nu suntem sprijiniți de publicitate.

Deoarece aplicația este gratuită, o putem deschide mai târziu cu sursă deschisă. În acest moment nu avem lăţimea de bandă pentru a gestiona asta. Avem, de asemenea, idei foarte specifice pentru caracteristici şi direcţia în care vrem să mergem lucrurile. Avem o comunitate beta activă și luăm feedback-ul nostru pentru inimă.

## Cum faci bani?

Avem caracteristici premium!

[Arhiva noastră de Voltra Audio](https://voltra.co/premium/) este un serviciu de rezervă cloud conceput special pentru muzică. Nu comprimăm sau distribuim blocuri de date. Colecția ta de muzică este salvată fizic pentru tine.

Pentru artiști și etichete, [abonamentul nostru Pro](https://voltra.co/artists/pro) oferă instrumente care să îi ajute să ajungă la publicul mai relevant, cum ar fi analitele și paginile web ale artistului profesionist.

## Ce face Voltra diferit?

Proiectarea și uzabilitatea sunt incredibil de importante pentru noi. Vrem să oferim ascultătorilor o experiență de ascultare fără distracție! Există câteva playere muzicale şi magazine interesante. Dar multe dintre ele sunt mai avansate și mai greu de folosit decât își dau seama creatorii. Vrem să facem Voltra accesibilă cât mai multor persoane.

De asemenea, nu luăm o tăietură de la artist sau de la etichetă. Acesta este un diferențiator cheie pentru noi. Este foarte important pentru că reduce bariera pentru artişti de a-şi pune muzica pe piaţă.

## Ce sunt nişte decizii de design & tehnice pe care le-aţi făcut?

În timp ce proiectam Voltra, am luat în considerare convenţii UI din aplicaţii native şi web, ne-am gândit foarte mult la ceea ce puteam elimina. Avem un grup beta privat activ care ne-a oferit feedback critic în ultimele luni.

Am descoperit că arta albumului şi fotografia sunt foarte importante pentru oameni. Mulţi jucători sunt doar liste de dosare. Unul dintre lucrurile interesante despre deţinerea de albume fizice este arta albumului, și am vrut să punem accentul pe acest lucru în aplicația Voltra desktop.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Ne-am asigurat, de asemenea, să nu ne dezlegăm de dosarele oamenilor. Folosim vizionarea fișierelor pentru a putea pune fișierele tale oriunde dorești și nu le redenumim și nici nu le mutăm pentru tine. Avem o bază de date integrată pentru a urmări starea directoarelor urmărite astfel încât să putem urmări ce este nou, chiar și atunci când procesul nu funcționează.

## Care sunt unele provocări cu care te-ai confruntat în timp ce construiești Voltra?

Petrecem mult timp concentrându-ne pe performanţă. Am început cu cadre dar am trecut la Javascript cu vanilie. În experiența noastră, abstracțiile generalizate pe care le oferă depășesc sancțiunile și ceremonia de performanță pe care le introduc.

În acest moment ne ocupăm de colecţii foarte mari. Colecţii mari înseamnă probabil zeci de mii de imagini! Nod de prezentare. Modulul sistemului de fişiere disponibil direct din procesul de randare a făcut ca este foarte uşor să se încarce şi să se descarce multe imagini foarte repede pe baza evenimentelor DOM.

În general *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* şi *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* au fost instrumente super importante pentru efectuarea de procesări în timp ce se păstrează interfața reactivă. Mai exact, distribuirea sarcinilor legate de procesor în procese separate ajută cu adevărat la menţinerea interfeţei utilizatorului. De exemplu, am mutat contextul audio efectiv într-un proces separat, comunicând cu el peste [IPC](https://electronjs.org/docs/glossary/#ipc) pentru a evita eventualele întreruperi ale unei UI aglomerate.

## De ce ai ales să construiești Voltra pe Electron?

Căsuța de nisip a browser-ului este prea restricționată pentru aplicația noastră. Dar noi de asemenea dezvoltăm un player web. Deci este o imensă victorie că putem împărți aproape 100% din cod între cele două implementări.

Am început prin a construi o aplicație nativă cu Swift. Principala problemă pe care am găsit-o a fost că reinventăm multe lucruri. Internetul are cel mai mare ecosistem open source din lume. Aşa că am trecut destul de repede la Electron.

De asemenea, și cel mai important, cu Electron te dezvolți o dată și ar trebui doar să funcționeze pe toate platformele majore. Nu este garantat, dar costul codificării native pentru fiecare platformă este cu siguranță mai mare decât orice alte costuri pe care le introduce electronul.

## Care sunt lucrurile tale preferate despre Electron?

**GTD!**: a avea stack în rețea Node.js, iar stratul de prezentare a Chromiumului ambalat împreună este o rețetă pentru a face lucrurile.

**Competență**: Este doar stiva web, deci întreaga noastră echipă este implicată efectiv în construirea produsului.

**Comunitate**: Există o comunitate foarte organizată care știe cum să comunice foarte bine! Ne simțim destul de minunați să ne dezvoltăm cu astfel de sprijin.

## În ce domenii ar putea fi îmbunătățit Electron?

Am dori să vedem că Electron aprobă un singur ambalaj. Ambalatorul este la fel de important pentru Electron ca managerul de pachete pentru Node. Există mai multe pachete de pachete în zona utilizatorului, fiecare cu caracteristici interesante, dar fiecare cu bug-uri. Consensul comunității ar contribui la direcționarea energiei consumate de contribuitori.

## Ce urmează?

În prezent dezvoltăm o aplicație mobilă și lucrăm cu artiștii și etichetele pentru a-și adăuga muzica în magazinul Voltra. Salut! Dacă ești un artist sau o etichetă, [înregistrează-te acum](https://admin.voltra.co/signup)! Plănuim să deschidem magazinul atunci când atingem obiectivul de 10 milioane de trasee.

