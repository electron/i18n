---
title: Întreruperea suportului pentru Linux de 32-bit
author: felixrieseberg
date: '2019-03-04'
---

Echipa Electron va întrerupe sprijinul pentru 32-bit Linux (ia32 / i386) începând cu Electron v4.0. Ultima versiune de Electron care suportă instalații de Linux bazate pe 32 biți este Electron v3.1, care va primi asistență până când Electron v6 va fi eliberat. Suportul pentru Linux bazat pe 64 de biți și `armv7l` va continua neschimbat.

---

## Ce anume nu mai suportă Electron?

Este posibil să fi văzut descrierea "64-bit" și "32-bit" ca stickere pe calculator sau ca opțiuni pentru descărcarea software-ului. Termenul este utilizat pentru a descrie o arhitectură specifică a calculatorului. Majoritatea calculatoarelor făcute în anii 1990 şi la începutul anilor 2000 au fost realizate cu procesoare bazate pe arhitectura de 32 biţi, în timp ce majoritatea calculatoarelor făcute mai târziu se bazau pe arhitectura mai nouă şi mai puternică de 64 de biţi. Nintendo 64 (cumpărați? PlayStation 2 a fost primul dispozitiv pentru consumatori disponibil pe scară largă cu noua arhitectură, calculatoarele vândute după 2010 conțineau aproape exclusiv procesoare pe 64 de biți. Drept urmare, suportul a scăzut: Google a încetat să mai elibereze Chrome pentru Linux de 32 biți în martie 2016, Canonical a încetat să mai furnizeze imagini desktop de 32 de biți în 2017 și a renunțat la suportul pentru 32 de biți împreună cu Ubuntu 18.10. Arch Linux, sistem elementar de operare şi alte distribuiri importante de Linux au scăzut deja sprijinul pentru arhitectura procesorului învechit.

Până acum, Electron a oferit și sprijinit construcții care rulează pe arhitectura mai veche de 32 biți. Începând cu versiunea v4.0, echipa Electron nu va mai putea oferi binare sau suport pentru Linux de 32 de biți.

Electron a fost dintotdeauna un proiect cu sursă deschisă și continuăm să sprijinim și să încurajăm dezvoltatorii interesați să construiască Electron pentru arhitecturi exotice.

## Ce înseamnă asta pentru dezvoltatori?

Dacă nu furnizați în prezent distribuții de 32 de biți ale aplicației pentru Linux, nu este necesară nicio acțiune.

Proiecte care transportă aplicații Linux Electron 32-bit va trebui să decidă cum să continue. 32-bit Linux va fi suportat pe Electron 3 [până](https://electronjs.org/docs/tutorial/support#supported-versions) la eliberarea Electron 6, care dă ceva timp pentru a lua decizii și planuri.

## Ce înseamnă acest lucru pentru utilizatori?

Dacă sunteți un utilizator Linux și nu sunteți sigur dacă rulați sau nu un sistem bazat pe 64 de biți, este posibil să alergați pe o arhitectură de 64 de biți. Pentru a te asigura, poți rula `lscpu` sau `uname -m` comenzi în terminalul tău. Fie se va tipări arhitectura ta curentă.

Dacă utilizaţi Linux pe un procesor de 32 de biţi, probabil că aţi întâlnit deja dificultăţi în găsirea unui software lansat recent pentru sistemul dumneavoastră de operare. Echipa Electron se alătură altor membri proeminenți din comunitatea Linux recomandând să faceți upgrade la o arhitectură de 64 de biți.
