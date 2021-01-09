---
title: 'Proiectul săptămânii: WordPress Desktop'
author:
  - mkaz
  - Johngoley
  - zeke
date: '2017-02-28'
---

Săptămâna aceasta am ajuns cu oameni la [Automattic](https://automattic.com/) pentru vorbi despre [WordPress Desktop](https://apps.wordpress.com/desktop/), un client desktop open-source pentru gestionarea conţinutului WordPress.

---

[![Aplicatii WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Toată lumea ştie despre WordPress, dar ce este WordPress Desktop?

[WordPress. om aplicația pentru desktop](https://apps.wordpress.com/desktop/) oferă o experiență perfectă între platforme care îți permite să te concentrezi pe conținutul tău și să proiectezi fără file de browser pentru a te distrage de la browser — sau să îți păstrezi site-urile marginalizate dar accesibile. În combinație cu aplicația noastră de suport pentru browser și mobil, îți poți construi site-ul oriunde, indiferent de modul în care te ajută să îți faci treaba.

## De ce să construiţi o aplicaţie Desktop pentru administrarea site-urilor WordPress? Nu poate fi totul bazat pe web?

De fapt folosește exact aceeași tehnologie pe care o obții când vizitezi [WordPress.com](https://wordpress.com) în browser-ul tău. Cu toate acestea, totul este găzduit local, deci are timpi de încărcare minimi. Cu avantajul unor caracteristici native cum ar fi a fi in doc, notificari etc., chiar te poti concentra pe site-urile WordPress si blogging.

## De ce ai ales să construiești WordPress Desktop pe Electron?

La sfârșitul anului 2015 am reconstruit o mare parte din WordPress.com sub forma [Calypso](https://github.com/automattic/wp-calypso), o aplicație JavaScript modernă open-source folosind React. Am început să ne uităm la Electron și cu niște schimbări la Calypso au reușit să-l facă să alerge local. A fost o experienţă convingătoare şi am crezut că există foarte multă valoare în dezvoltarea în continuare.

Am avut mai multe echipe care lucrau la Calypso. Ar fi fost nevoie de mai multă muncă pentru a face un client complet de interfață GUI multi-platformă, care să se potrivească cu acesta folosind tehnologiile tradiționale de desktop. După utilizarea Electron, o echipă mică de 2-4 dintre noi a reușit să impulsioneze eforturile celeilalte echipe și să construiască aplicația Desktop în câteva luni.

## Care sunt unele provocări cu care v-ați confruntat în timp ce construiți WordPress Desktop?

Am primit o versiune inițială a aplicației foarte rapid, dar reglarea sa se comporte optim ca o aplicație desktop a durat mult mai mult timp. O mare provocare pentru aplicație este că de fapt rulați o copie a Calypso pe propria mașină - este doar o interfață API condusă de API. Au fost implicate multă muncă de punte în asta, iar schimbările au fost readuse la Calypso însuşi.

În plus, a fost cheltuit mult efort de ambalare a aplicației pentru diferite platforme - oferim Windows, macOS și versiunile Linux - și există suficiente diferențe pentru a face acest truc.

La momentul în care Electron era relativ nou şi am continuat să ne confruntăm cu probleme care erau în curând rezolvate (uneori în aceeaşi zi!)

## În ce domenii ar trebui îmbunătățit Electron?

Electron oferă deja cea mai mare parte din ceea ce avem nevoie pentru aplicația Desktop și progresează rapid de când am început să o folosim. Acestea fiind spuse, există unele domenii considerate drept banale într-o aplicație desktop, cum ar fi verificarea ortografică și găsirea/înlocuirea, care sunt mai greu de reprodus cu Electron as-is.

Ne-ar plăcea de asemenea să vedem că unele dintre noile tehnologii Chrome se filtrează şi în Electron. Suntem deosebit de dornici să experimentăm cu WebVR.

## Care sunt lucrurile tale preferate despre Electron?

Principalul motiv pentru care am ales Electron, şi e cea mai mare putere, este comunitatea foarte activă şi deschisă. Automattic a crezut dintotdeauna în open source. Este unul dintre principiile noastre de bază, iar proiectul Electron și comunitatea urmează multe dintre convingerile fundamentale de a fi foarte deschis și pozitiv.

## Ce urmează în WordPress Desktop?

Cel mai bun lucru la modelul nostru este că aplicația Desktop beneficiază de orice nouă caracteristică Calypso - există îmbunătățiri constante. Sperăm să putem adăuga caracteristici suplimentare în aplicație, cum ar fi suport offline, care ar duce cu adevărat aplicația în teritoriul autohton, și notificări de sistem mai bune.

## Există echipe la Automattic care lucrează la alte aplicații Electron?

Da, după eforturile noastre de pe aplicația Desktop echipa Simplenote a decis să folosească Electron pentru a construi aplicații desktop pentru Windows și Linux (un client nativ Mac există deja). Aplicația [Simplenote Electron](https://github.com/Automattic/simplenote-electron) este, de asemenea, open source și disponibilă pe Gî.

De asemenea, avem o viitoare integrare Raspberry Pi care folosește Electron.

Dacă vreuna dintre acestea pare interesantă, atunci ar trebui [să auzim de la tine](https://automattic.com/work-with-us/)!

## Orice sfaturi Electron care ar putea fi utile altor dezvoltatori?

Procesul de livrare a software-ului desktop semnat este relativ nou pentru noi, în special pentru Windows. am scris un articol pentru [Cod Semnând o aplicație Windows](https://mkaz.blog/code/code-signing-a-windows-application/) care include procesul și câteva dintre obstacolele pe care le-am întâmpinat pentru a face acest lucru corect.

