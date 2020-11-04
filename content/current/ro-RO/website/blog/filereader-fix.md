---
title: Fix de vulnerabilitate Chromium FileReader
author: marshallofsunet
date: '2019-03-07'
---

O vulnerabilitate de grad înalt de severitate a fost descoperită în Chrome, care afectează toate programele bazate pe crom, inclusiv Electron.

Această vulnerabilitate a fost atribuită `CVE-2019-5786`.  Poți citi mai multe despre asta în [Postul de blog Chrome](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Vă rugăm să reţineţi că Chrome are rapoarte despre această vulnerabilitate folosită în sălbăticie astfel încât este recomandat să faceţi upgrade la Electron ASAP.

---

## Domeniu

Acest lucru afectează orice aplicație Electron care poate rula terțe părți sau JavaScript neacreditat.

## Atenuare

Aplicațiile afectate ar trebui să facă upgrade la o versiune modificată de Electron.

Am publicat noi versiuni de Electron care includ remedii pentru această vulnerabilitate:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Cea mai recentă versiune beta a Electron 5 a urmărit Chromium 73 şi, prin urmare, este deja patrată:
  * [5,0,0-beta5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Informații suplimentare

Această vulnerabilitate a fost descoperită de Clement Lecigne de la Google Threat Analysis Group și a raportat echipei Chrome.  Postarea pe blog Chrome poate fi găsită [aici](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați tutorialul nostru de securitate [](https://electronjs.org/docs/tutorial/security).

Dacă doriți să raportați o vulnerabilitate în Electron, trimiteți un e-mail security@electronjs.org.
