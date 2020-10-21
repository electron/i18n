---
title: 'Proiectul săptămânii: mai bun navigator'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Săptămâna aceasta am prins cu [Paul Frazee](http://pfrazee.github.io/), creator of [Beaker Browser](https://beakerbrowser.com/). Mai frumos este un browser de web experimental peer-to-peer, care folosește protocolul Dat pentru a găzdui site-uri de pe dispozitivele utilizatorilor .

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Ce este mai Beaker și de ce l-ați creat?

Beaker este un browser participativ. Este un browser pentru hackeri indii.

Web-ul este o sursă închisă. Dacă vrei să influențezi modul în care funcționează rețelele sociale, trebuie să lucrezi pe Facebook sau Twitter. Pentru căutare, Google. Controlul se află mai degrabă în mâinile companiilor decât în mâinile utilizatorilor.

Cu Beaker, avem un nou protocol web: [Arhiva de Transport Descentralizată](https://datprotocol.com). "Data" creează site-uri la cerere, gratuit, şi apoi le împarte de pe dispozitiv. Nu sunt servere necesare. Aceasta este inovaţia noastră.

![Protocoale de scăldat](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Când vizitaţi un site de pornire în Beaker, descărcaţi fişierele. Site-ul este al tău, pentru totdeauna. Îl poți salva, modifica și distribui gratuit noua ta versiune. Totul este open-source.

Despre asta e vorba: facem un browser pentru site-uri open-source. Vrem să fie un set de instrumente pentru hacking-ul social.

## Cine ar trebui să folosească Beaker?

Hackeri. Modatori. Tipuri creative. Oamenilor cărora le place să tinere.

## Cum creez un nou proiect care folosește Dat?

Avem [o unealtă de linie de comandă numită bkr](https://github.com/beakerbrowser/bkr) care seamănă cu git + npm. Aici este creearea unui site:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Salut, lume!" > index.html
$ bkr publish
```

Și iată cum se forjează un site:

```bash
$ bkr fork dat://0ff7d4c7644d0aaa19914247dc5dbf502d6a02ea89a5145e7b178db57504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "fork nu are considerație pentru indexul precedent. tml!" > index.html
$ bkr publicare
```

Aceste site-uri sunt apoi găzduite din browser-ul tău. Este un pic ca BitTorrent; partajezi siturile într-o plasă P2P.

Dacă vrei o GUI, avem câteva unelte de bază încorporate în browser, dar împingem acele unelte în userland. Toate vor fi aplicaţii modabile de utilizator.

## De ce ai ales să construiești mai mult cu Electron?

A fost evident pentru acest proiect. Dacă eu însumi am forjat Chrome, aş scrie C++ chiar acum! Nimeni nu vrea să facă asta. Cunosc stack-ul web şi pot lucra rapid cu el. Este un fără creier.

Adevărul este că nu sunt sigur că am putut face asta fără Electron. Este un software grozav.

## Care sunt unele provocări cu care te-ai confruntat în timp ce construiești Beaker?

Jumătate din ea trece la unelte şi îmi dau seama cât de mult pot scăpa.

Crearea browserului în sine a fost destul de ușoară. Electron este practic un set de instrumente pentru a face browsere. ...Cu excepția filelor de browser; asta m-a dus pentru totdeauna la bun sfârșit. În cele din urmă m-am desprins și am învățat cum să fac SVG. Se uită mult mai bine, dar a fost nevoie de 3 sau 4 iteraţii înainte de a fi corect.

## În ce domenii ar trebui îmbunătățit Electron?

Ar fi minunat dacă aș putea andoca diavolii în interiorul unui view web.

## Ce urmează în Beaker?

Nume DNS securizate pentru site-urile cu rezerve. Un sistem URL configurabil din punct de vedere social, numit ["schemă aplicații".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Mai multe API-uri.

## Pentru oamenii care ar putea fi interesați să contribuie la proiect, în ce domenii are nevoie Beaker de ajutor?

Avem multe probleme deschise. Nu-ți fie teamă să mă păstrezi. #beakerbrowser pe freenode. Păstrăm o pagină [pentru contributori](https://beakerbrowser.com/docs/team.html) și te vom adăuga la ea. Şi dacă vizitezi Austin, îţi voi cumpăra o bere.

## Orice sfaturi Electron care ar putea fi utile altor dezvoltatori?

1. Folosește uneltele de construcții care sunt acolo. Nu vrei să te lupți cu propriile soluții, ai încredere în mine. Folosește electro-constructor. Folosiţi o repungere de tip boilerplate.
2. Dacă ai nevoie să deschizi o problemă în repozitoriul Electron, mergi la kilometri în plus pentru a-l face ușor de reproducut. Vei primi un răspuns mult mai rapid, iar echipa îl va aprecia. Și mai bine, încearcă să repari singur. Este de fapt destul de interesant să vezi interiorul.
3. Citește cel puțin o dată prin toate ghidurile și documentele avansate.
4. Nu construi un browser, este o piaţă saturată.

