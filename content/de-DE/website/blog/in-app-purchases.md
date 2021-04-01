---
title: "Neu bei Electron 2: In-App-Käufe"
author: zeke
date: '2018-04-04'
---
  
The new Electron 2.0 release line is [packed](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) with new features and fixes. Eines der Highlights dieser neuen Hauptversion ist ein neues [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) für Apple's [Mac App Store](https://support.apple.com/en-us/HT202023).

---

In-App-Käufe ermöglichen den Kauf von Inhalten oder Abonnements direkt innerhalb von Apps. Dies gibt Entwicklern eine einfache Möglichkeit, das [freemium Geschäftsmodell zu übernehmen](https://developer.apple.com/app-store/freemium-business-model/), Benutzer zahlen nichts für den Download einer App und erhalten optional In-App-Käufe für Premium-Funktionen, zusätzliche Inhalte oder Abonnements.

Die neue API wurde von der Community Community hinzugefügt [Adrien Fery](https://github.com/AdrienFery) um In-App-Käufe in [Amanote](https://amanote.com/)zu aktivieren eine Notiz-Nehmen Electron-App für Vorträge und Konferenzen. Amanote kann kostenlos heruntergeladen werden und erlaubt klare und strukturierte Notizen zu PDFs hinzuzufügen, mit Funktionen wie mathematische Formeln, Zeichnungen, Audio Aufzeichnung und mehr.

Da Adrien der Mac-Version von Amanote Unterstützung für In-App-Käufe hinzugefügt hat, hat er eine Umsatzsteigerung von **40% festgestellt**!

## Erste Schritte

Die neue [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API ist bereits in der neuesten Electron Beta gelandet:

```sh
npm i -D electron@beta
```

Die Dokumentation für die API kann [auf GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md)gefunden werden und Adrien waren so freundlich, ein Tutorial über die Verwendung der API zu schreiben. To get started adding in-app purchases to your app, [see the tutorial](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Weitere [Verbesserungen an der API](https://github.com/electron/electron/pull/12464) sind in Arbeit und werden bald in einer kommenden Electron Beta-Version landen.

## Windows könnte als nächstes sein

Als nächstes hofft Adrien einen neuen Umsatzkanal für Amanote zu eröffnen, indem er Unterstützung für Microsoft-In-App-Käufe in Electron hinzufügt. Bleib auf dem Laufenden für Entwicklungen!