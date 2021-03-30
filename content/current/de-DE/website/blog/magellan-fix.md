---
title: SQLite-Schwachstelle beheben
author: ckerr
date: '2018-12-18'
---

Eine Verwundbarkeit, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," wurde entdeckt, die Software basierend auf SQLite oder Chromium, einschließlich aller Versionen von Electron, beeinflusst.

---

## Bereich

Elektronische Anwendungen, die Web SQL verwenden, sind betroffen.


## Abmilderung

Betroffene Apps sollten Web SQL nicht mehr verwenden oder auf eine gepatchte Version von Electron aktualisieren.

Wir haben neue Versionen von Electron veröffentlicht, die Korrekturen für diese Verwundbarkeit enthalten:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Darüber gibt es keine Meldungen in freier Wildbahn; betroffene Anwendungen werden jedoch aufgefordert, Abmilderung zu fordern.

## Weitere Informationen

Diese Verwundbarkeit wurde vom Tencent Blade Team entdeckt, das [einen Blogbeitrag veröffentlicht hat, der die Verwundbarkeit](https://blade.tencent.com/magellan/index_en.html) diskutiert.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Wenn Sie eine Verwundbarkeit in Electron melden möchten, schicken Sie eine E-Mail an security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
