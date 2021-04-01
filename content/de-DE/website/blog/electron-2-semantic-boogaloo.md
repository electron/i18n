---
title: 'Elektron 2.0 und darüber hinaus - Semantische Versionierung'
author: Grundwasser
date: '2017-12-06'
---

Eine neue Hauptversion von Electron ist in Arbeit und damit einige Änderungen an unserer Versionierungsstrategie. Ab Version 2.0.0 wird Electron die Semantic Versionierung strikt einhalten.

---

Diese Änderung bedeutet, dass Sie den Hauptversions-Bump öfter sehen und es wird in der Regel ein großes Update auf Chromium. Patch-Versionen werden auch stabiler sein, da sie nun nur noch Bugfixes ohne neue Features enthalten.

**Größere Versionsanhebungen**

* Chromium-Versionsupdates
* Node.js Hauptversion Updates
* Electron bricht API-Änderungen

**Erhöhte Versionsnummer**

* Node.js kleinere Version Updates
* Electron nicht aufbrechende API-Änderungen

**Patch-Version erhöht**

* Node.js Patch Version Updates
* fix-relevante Chrom-Patches
* Electron Fehlerkorrekturen

Da die Semberbereiche von Electronic nun bedeutsamer sein werden, empfehlen wir Electron mit der Standardflagge `--save-dev` zu installieren was deine Version mit `^`präfix und sicher auf dem neuesten Stand hält mit kleinen und Patch Updates:

```sh
npm install --save-dev electron
```

Für Entwickler, die nur an Fehlerbehebungen interessiert sind, sollten Sie das Tilde Semver Präfix z.B. `~2 verwenden. .0`, die niemals neue Funktionen einführen wird, behebt nur die Stabilität.

Weitere Details finden Sie unter [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
