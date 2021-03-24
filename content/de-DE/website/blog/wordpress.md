---
title: 'Projekt der Woche: WordPress Desktop'
author:
  - mkaz
  - johngodley
  - zeke
date: '2017-02-28'
---

Diese Woche haben wir bei [Automattic](https://automattic.com/) mit Leuten aufgeholt, um über [WordPress Desktop](https://apps.wordpress.com/desktop/)zu sprechen ein Open-Source-Desktop-Client zur Verwaltung von WordPress-Inhalten.

---

[![WordPress-Apps](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Jeder kennt WordPress, aber was ist WordPress Desktop?

Das [WordPress. om Desktop App](https://apps.wordpress.com/desktop/) bietet eine nahtlose plattformübergreifende Erfahrung, die es Ihnen ermöglicht, sich auf Ihre Inhalte und Ihr Design zu konzentrieren, ohne Browser-Registerkarten, die Sie ablenken – oder Ihre Seiten beiseite zu lassen, aber zugänglich zu halten. In Kombination mit unserem Browser-Support und unserer mobilen App können Sie Ihre Website überall bauen, auf welche Weise Sie Ihre Arbeit erledigen können.

## Warum eine Desktop-App zur Verwaltung von WordPress-Sites erstellen? Könnte nicht alles web-basiert sein?

Es verwendet eigentlich genau die gleiche Technologie, die Sie erhalten, wenn Sie [WordPress.com](https://wordpress.com) in Ihrem Browser besuchen. Jedoch ist es alles lokal gehostet, so dass es minimale Ladezeiten hat. Mit dem Vorteil der nativen Funktionen, wie Sie in Ihrem Dock, Benachrichtigungen, etc., können Sie wirklich konzentrieren sich auf Ihre WordPress-Seiten und Blogging.

## Warum haben Sie beschlossen, WordPress Desktop auf Elektronik?

Ende 2015 haben wir einen Großteil von WordPress.com in Form von [Calypso](https://github.com/automattic/wp-calypso)umgebaut, einer modernen Open-Source-JavaScript-App mit React. Wir haben mit Electron begonnen und mit einigen Änderungen an Calypso konnten wir es lokal zum Laufen bringen. Es war eine überzeugende Erfahrung und wir dachten, dass es sehr viel wert sei, sie weiterzuentwickeln.

Wir hatten mehrere Teams, die an Calypso gearbeitet haben. Um einen vollständigen Multiplattform-GUI-Client zu erstellen, der dies mit herkömmlichen Desktop-Technologien entsprach, hätte es mehr Arbeit gekostet. Mit Electron ein kleines Team von 2-4 von uns war in der Lage, die Bemühungen des anderen Teams in ein paar Monaten zu nutzen und die Desktop-App zu entwickeln.

## Was sind einige Herausforderungen, denen Sie beim Erstellen von WordPress Desktop gegenüberstehen?

Wir haben eine erste Version der App sehr schnell laufen lassen aber die Abstimmung um sich optimal als Desktop-App zu verhalten, brauchte viel mehr Zeit. Eine große Herausforderung für die App ist, dass Sie eine Kopie von Calypso auf Ihrem eigenen Rechner laufen lassen - es ist eine rein API gesteuerte Benutzeroberfläche. Daran waren viele Überbrückungsarbeiten beteiligt, und die Änderungen wurden an Calypso selbst zurückgeführt.

Zusätzlich wurde viel Aufwand aufgewendet, um die App für verschiedene Plattformen zu paketieren - wir stellen Windows zur Verfügung, macOS, und Linux-Versionen - und es gibt genügend Unterschiede, um das zu machen.

Zu der Zeit war Electron relativ neu und wir haben immer wieder Probleme entdeckt, die in Kürze behoben wurden (manchmal noch am selben Tag!)

## In welchen Bereichen sollte Electron verbessert werden?

Electron stellt bereits das meiste von dem zur Verfügung, was wir für die Desktop-App benötigen, und es ist schnell vorangekommen, seit wir begonnen haben, sie zu verwenden. Allerdings gibt es einige Bereiche, die in einer Desktop-App als selbstverständlich angesehen werden, B. Rechtschreibprüfung und finden/ersetzen, die mit Electron unverändert schwerer zu replizieren sind.

Wir würden auch gerne sehen, wie einige der neueren Chrome-Technologien auch in Electron gefiltert werden. Wir sind besonders daran interessiert, mit WebVR zu experimentieren.

## Was sind Ihre Lieblings-Dinge über Elektronik?

Der Hauptgrund für die Wahl von Electron und seiner größten Stärke ist die sehr aktive und offene Gemeinschaft. Automattic hat immer an Open Source geglaubt. Es ist einer unserer Kernprinzipien und das Electron-Projekt und die Community folgen vielen Grundüberzeugungen, sehr offen und positiv zu sein.

## Was kommt als nächstes in WordPress Desktop?

Das Gute an unserem Modell ist, dass die Desktop-App von jeder neuen Calypso-Funktion profitiert - es gibt ständige Verbesserungen. Wir hoffen, dass wir der App zusätzliche Funktionen wie den Offline-Support hinzufügen können , die die App wirklich in das Heimatgebiet führen würde, und bessere Systembenachrichtigungen.

## Gibt es Teams bei Automattic die an anderen Electron-Apps arbeiten?

Ja, nach unseren Bemühungen um die Desktop-App, das Simplenote-Team beschloss, Electron zu verwenden, um Desktop-Apps für Windows und Linux zu erstellen (ein nativer Mac-Client existiert bereits). Die [Simplenote Electron App](https://github.com/Automattic/simplenote-electron) ist auch Open Source und auf Github verfügbar.

Wir haben auch eine kommende Raspberry Pi Integration, die Electron verwendet.

Wenn eines davon interessant klingt, dann würden wir [gerne von dir hören](https://automattic.com/work-with-us/) hören!

## Irgendwelche Electron-Tipps, die für andere Entwickler nützlich sein könnten?

Der Prozess des Versands signierter Desktop-Software ist für uns relativ neu, vor allem für Windows. haben wir einen Artikel für [Code geschrieben, der eine Windows-App](https://mkaz.blog/code/code-signing-a-windows-application/) signiert, der den Prozess und einige der Hürden enthält, die wir durchlaufen haben, um es richtig zu machen.

