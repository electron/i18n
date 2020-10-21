---
title: SQLite kwetsbaarheid Fix
author: ckerr
date: '2018-12-18'
---

Een externe code uitvoering kwetsbaarheid, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," is ontdekt van invloed op software gebaseerd op SQLite of Chromium, inclusief alle versies van Electron.

---

## Bereik

Elektroon-applicaties met behulp van Web SQL hebben invloed.


## Mitigatie

Getroffen apps moeten stoppen met het gebruik van Web SQL of bijwerken naar een gepatenteerde versie van Electron.

We hebben nieuwe versies van Electron gepubliceerd, die oplossingen voor deze kwetsbaarheid bevatten:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Daar zijn geen berichten van in het wild opgesteld; er wordt echter aangedrongen op verzachting van de betreffende aanvragen.

## Verdere informatie

Deze kwetsbaarheid is ontdekt door het Tencent Blade team, die [een blogpost heeft gepubliceerd die gaat over de kwetsbaarheid](https://blade.tencent.com/magellan/index_en.html).

Om meer te weten te komen over beste praktijken om je Electron apps veilig te houden, bekijk onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Als u een kwetsbaarheid in Electron wilt melden, e-mail security@electronjs.org.
