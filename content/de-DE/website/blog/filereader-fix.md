---
title: Chrom FileReader Sicherheitslücke beheben
author: marshallofsound
date: '2019-03-07'
---

In Chrome wurde eine Verwundbarkeit mit hoher Schwere entdeckt, die alle auf Chromium basierende Software einschließlich Electron betrifft.

Diese Verwundbarkeit wurde `CVE-2019-5786` zugewiesen.  Mehr dazu erfahren Sie im [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Bitte beachten Sie, dass Chrome Berichte über diese Verwundbarkeit in der Wildnis hat, so dass es dringend empfohlen wird, Electron ASAP zu aktualisieren.

---

## Bereich

Dies betrifft jede Electron-Anwendung, die Fremd- oder nicht vertrauenswürdige JavaScript ausführen kann.

## Abmilderung

Betroffene Apps sollten auf eine gepatchte Version von Electron aktualisieren.

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für diese Verwundbarkeit enthalten:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Die letzte Beta von Electron 5 wurde Chromium 73 nachverfolgt und ist daher bereits geflickt:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Weitere Informationen

Diese Verwundbarkeit wurde von Clement Lecigne von Googles Threat Analysis Group entdeckt und dem Chrome-Team gemeldet.  Der Chrome Blog Beitrag kann [hier gefunden werden](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Um mehr über Best Practices für die Sicherheit Ihrer Electron-Apps zu erfahren, lesen Sie unsere [-Sicherheitshinweise](https://electronjs.org/docs/tutorial/security).

Wenn Sie eine Verwundbarkeit in Electron melden möchten, schicken Sie eine E-Mail an security@electronjs.org.
