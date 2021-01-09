---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Acesta este primul post dintr-o serie care explică internalii Electron. Această postare prezintă modul în care bucla de evenimente Node este integrată cu Chromium în Electron.

---

Au existat multe încercări de a utiliza Node pentru programarea GUI, ca [node-gui](https://github.com/zcbenz/node-gui) pentru legarea GTK+ și [node-qt](https://github.com/arturadib/node-qt) pentru legarea QT. Dar niciunul dintre ele nu lucrează în producție deoarece seturile de instrumente GUI au propriile lor bucle de mesaj, în timp ce Node folosește libuv pentru propria sa buclă de evenimente, iar firul principal poate rula doar o buclă în acelaşi timp. So the common trick to run GUI message loop in Node is to pump the message loop in a timer with very small interval, which makes GUI interface response slow and occupies lots of CPU resources.

În timpul dezvoltării Electron am întâmpinat aceeași problemă, deşi într-un mod inversat: a trebuit să integrăm bucla de evenimente Node în bucla de mesaje a lui Chromium .

## Procesul principal și procesul de transformare

Înainte de a intra în detaliile integrării buclei de mesaje, voi explica mai întâi arhitectura în mai multe procese a Chromium.

În Electron există două tipuri de procese: procesul principal și procesul de redare (acesta este de fapt extrem de simplificat, pentru o vizualizare completă, vă rugăm să consultaţi [Architectura multi-proces](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Procesul principal este responsabil pentru GUI funcționează ca și cum ar crea ferestre, în timp ce procesul de redare se ocupă doar cu rulând și redând pagini web.

Electron permite utilizarea JavaScript pentru a controla atât procesul principal cât și procesul de redare, ceea ce înseamnă că trebuie să integrăm Node în ambele procese.

## Înlocuirea buclei de mesaje Chromium cu libuv

Prima mea încercare a fost reimplementarea buclei de mesaje Chromium cu libuv.

A fost ușor pentru procesul de redare, deoarece bucla de mesaje a ascultat doar descriptori și cronometre de fișiere, și am avut nevoie doar de mine pentru a implementa interfața cu libuv.

Cu toate acestea, procesul principal a fost mult mai dificil. Fiecare platformă are propriul tip de bucle de mesaje GUI. macOS Chromium folosește `NSRunLoop`, în timp ce Linux folosește glib. Am încercat o mulțime de hackuri pentru a extrage descriptorii de fișier de bază din buclele native de mesaje GUI, şi apoi le-am dat să libuv pentru iteraţie, dar încă am întâlnit cazuri foarte frumoase care nu au funcţionat.

În cele din urmă am adăugat un cronometru pentru a sonda bucla mică de mesaje GUI. Ca rezultat procesul a luat o utilizare constantă a procesorului, iar anumite operațiuni au întârzieri mari.

## Buclă de evenimente nod de sondare a opiniei publice într-o temă separată

Pe măsură ce libuv s-a maturizat, a fost apoi posibilă o altă abordare.

Conceptul de backend fd a fost introdus în libuv, care este un descriptor de fișiere (sau de mână) care libuv sondaje pentru bucla sa de eveniment. Așadar, prin sondarea backend-ului fd este posibil să fie notificat atunci când există un nou eveniment în libuv.

Așa că în Electron am creat un fir separat pentru a sonda fendul backend, iar din moment ce utilizam apelurile de sistem pentru sondaje în loc de API-uri libuv, a fost cu fir sigur. Şi de fiecare dată când a avut loc un nou eveniment în bucla de evenimente de libuv, un mesaj va fi postat în bucla de mesaje a Chromium, iar evenimentele libuv ar fi apoi procesate în firul principal.

În acest fel am evitat patarea Chromium şi Node, şi acelaşi cod a fost folosit în atât procesele principale, cât şi cele de redare.

## Codul

Poți găsi implemarea integrării buclei de mesaje în `fișiere node_bindings` sub [`electron/atom/common/`](https://github.com/electron/electron/tree/master/atom/common). Acesta poate fi refolosit cu ușurință pentru proiectele care doresc să integreze Node.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*
