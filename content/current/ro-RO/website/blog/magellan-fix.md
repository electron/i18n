---
title: Fix SQLite Vulnerabilitate
author: ckerr
date: '2018-12-18'
---

O vulnerabilitate la execuție a codului la distanță, "[Magellan](https://blade.tencent.com/magellan/index_en.html)", a fost descoperită afectând software-ul bazat pe SQLite sau Chromiu, inclusiv toate versiunile de Electron.

---

## Domeniu

Aplicațiile Electron folosind Web SQL sunt afectate.


## Atenuare

Aplicațiile afectate ar trebui să oprească utilizarea Web SQL sau să facă upgrade la o versiune modificată de Electron.

Am publicat noi versiuni de Electron care includ remedii pentru această vulnerabilitate:
  * [4,0,0-beta11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Nu există rapoarte în această privinţă în sălbăticie; cu toate acestea, aplicaţiile afectate sunt îndemnate să atenueze.

## Informații suplimentare

Această vulnerabilitate a fost descoperită de echipa Tencent Blade, care a publicat [un post de blog care discută despre vulnerabilitate](https://blade.tencent.com/magellan/index_en.html).

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați tutorialul nostru de securitate [](https://electronjs.org/docs/tutorial/security).

Dacă doriți să raportați o vulnerabilitate în Electron, trimiteți un e-mail security@electronjs.org.
