---
title: 'Projekt der Woche: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '2017-01-31'
---

Die Electron-Community wächst schnell, und die Leute erstellen mächtige neue Apps und Tools mit erstaunlicher Geschwindigkeit. Um diese kreative Dynamik zu feiern und die Community über einige dieser neuen Projekte auf dem Laufenden zu halten haben wir uns entschieden, eine wöchentliche Blog-Serie mit bemerkenswerten Projekten im Zusammenhang mit Electron zu starten.

---

Dieser Beitrag ist der erste in der Serie und Features [Kap](https://getkap.co/), eine Open-Source-Bildschirmaufzeichnungs-App, erstellt von [Wulkano](https://wulkano.com/), einem geoverteilten Team aus freiberuflichen Designern und Entwicklern.

[![Kap Screencast](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Was ist Kap?

[Kap ist ein Open-Source-Bildschirmrecorder](https://getkap.co) speziell für Designer und Entwickler entwickelt, um ihre Arbeit einfach zu erfassen. Die Leute nutzen es um animierte Prototypen zu teilen, Fehler zu dokumentieren, dumme GIFs zu erstellen und alles dazwischen.

We have seen people of all age and backgrounds use it in educational settings, screencasts, tutorials... die Liste geht weiter. Sogar um Produktionsanlagen zu schaffen! Wir sind völlig weggesprengt von der gut empfangenen kleinen Seite Projekt.

## Warum haben Sie es gebaut?

Das ist eine sehr gute Frage, es ist nicht so, als gäbe es einen Mangel an Bildschirmrekordern draußen! Die Alternativen waren für uns entweder zu komplex, zu teuer oder zu begrenzt. Nichts fühlte sich *gerade richtig* für unsere alltäglichen Bedürfnisse. Wir denken auch, dass es großartig ist, wenn die Werkzeuge, die wir für unsere Arbeit verwenden, Open Source sind, so dass jeder helfen kann, sie zu formen. [Baukap war am Ende genauso viel über das, was wir nicht getan haben](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Es ist alles im Detail, eine Anhäufung von kleinen Verbesserungen, die die Umrisse eines Werkzeugs, das wir verwenden wollten.

Allerdings, und vielleicht am wichtigsten, Kap ist zu einem Ort geworden, an dem wir unsere Sorgen vor der Tür lassen und einfach Spaß haben etwas für uns und Leute wie uns zu bauen. Es ist so wichtig, eine Umgebung zu schaffen, in der man sich gerade einklopfen kann, neue Dünnschichten ausprobieren und das Handwerk genießen kann. Keine Anforderungen, kein Druck, keine Erwartungen. Sollen Designer und Entwickler das Projekt unterstützen? Warum, ja. Ja, sie sollten es tun.

## Warum haben Sie sich entschieden, Kap auf Electronic zu bauen?

Es gab eine Reihe von Gründen:

* Web-Technologie
* Die meisten Teams sind Webentwickler
* Wir sind in JavaScript investiert
* Es öffnet mehr Menschen die Tür für ihren Beitrag
* Electron selbst ist Open-Source
* Die Leistung und leicht zu wartende Modularität von `node_modules`
* Plattformübergreifende Möglichkeiten

Wir denken, dass die Zukunft der Apps im Browser liegt, aber wir sind noch nicht ganz so weit. Electron ist ein wichtiger Schritt auf dem Weg in diese Zukunft. Es macht nicht nur die Apps selbst zugänglicher, sondern auch den Code, mit dem sie erstellt wurden. Ein interessanter Gedanke ist eine Zukunft, in der das Betriebssystem ein Browser ist und die Tabs im Wesentlichen Electron-Apps sind.

Darüber hinaus sind wir vor allem Web-Entwickler, wir sind große Fans der isomorphischen Natur von JavaScript, in dem Sie JS auf dem Client, dem Server und jetzt dem Desktop ausführen können. Mit Web-Technologie (HTML, CSS und JS) sind viele Dinge viel einfacher als die Einheimischen: Schnelleres Prototyping, weniger Code, Flexbox > Auto-Layout (macOS/iOS).

## Was sind einige Herausforderungen, denen du beim Bau von Kaps begegnet?

Die Nutzung der Ressourcen von Electron zur Aufzeichnung des Bildschirms war die größte Herausforderung. Sie waren einfach nicht leistungsfähig genug, um unsere Anforderungen zu erfüllen und würden das Projekt in unseren Augen zu einem Misserfolg machen. Obwohl Electron selbst keinen Fehler macht, gibt es immer noch eine Lücke zwischen nativer Entwicklung und dem Erstellen von Desktop-Apps mit Web Tech.

Wir haben viel Zeit damit verbracht, die schlechte Leistung der `getUserMedia` API zu umgehen, ein Problem mit Chromium. Eines unserer Hauptziele, als wir uns anschickten, Kap zu machen, war es, die gesamte App mit Web Tech zu bauen. Nachdem wir alles versucht haben, damit es funktioniert (die Mindestanforderung ist 30 FPS auf einem Retina-Bildschirm) wir mussten schließlich eine andere Lösung finden.

## Ich sehe einige Swift-Code im Repo. Worum geht es?

Da wir gezwungen sind, nach Alternativen zu `getUserMedia`zu suchen, haben wir begonnen mit `ffmpeg` zu experimentieren. Abgesehen davon, dass es eines der besten Werkzeuge für die Audio- und Videokonvertierung ist, verfügt es über die Funktionalität der Bildschirmaufnahme in fast jedem Betriebssystem, und wir konnten knackige Videos aufnehmen, die unsere Mindestanforderung von 30 FPS auf einem Retina-Bildschirm erfüllen. Problem? Die Leistung war ":weary:", die CPU-Auslastung ging haywire. Wir sind also wieder zur Zeichnung übergegangen, haben unsere Optionen diskutiert und festgestellt, dass wir einen Kompromiss schließen müssen. Dies führte zu [Aperture](https://github.com/wulkano/aperture), unserer eigenen Bildschirmaufnahme-Bibliothek für macOS, die in Swift geschrieben wurde.

## In welchen Bereichen sollte Electron verbessert werden?

Wir alle wissen, dass Electron-Apps etwas für die Verwendung von RAM haben können, aber auch das ist wirklich eine Chromium-Sache. Es ist ein Teil dessen, wie es funktioniert und es hängt wirklich davon ab, was du ausführst, zum Beispiel Kap und Hyper verwenden in der Regel weniger als 100MB Arbeitsspeicher.

Einer der größten Verbesserungsbereiche, die wir sehen, ist die Nutzlast, insbesondere wie Electron Chromium verteilt. Eine Idee wäre, einen gemeinsamen Electron-Kern zu haben und App-Installer zu überprüfen, ob er bereits auf dem System vorhanden ist.

Die Erstellung plattformübergreifender Electron-Apps könnte ein besseres Erlebnis sein. Zurzeit gibt es zu viele Inkonsistenzen, plattformspezifische APIs und fehlende Funktionen zwischen Plattformen, wodurch Ihre Codebase mit Wenn-sonst-Anweisungen übersät wird. Zum Beispiel wird die Lebendigkeit nur auf macOS unterstützt, der Auto-Updater funktioniert anders unter macOS und Windows und wird nicht einmal unter Linux unterstützt. Transparenz ist ein Hit oder Vermissen unter Linux, in der Regel fehlt.

Es sollte auch einfacher sein, native System-APIs zu nennen. Electron hat ein sehr gutes Set von APIs, aber manchmal brauchen Sie Funktionalität, die es nicht bietet. Ein natives Node.js Addon zu erstellen ist eine Option, aber es ist schmerzhaft, mit ihm zu arbeiten. Im Idealfall würde Electron mit einer guten [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API verschicken, wie [`Schnellanruf`](https://github.com/cmake-js/fastcall). Dies hätte es uns ermöglicht, stattdessen den Swift-Teil in JavaScript zu schreiben.

## Was sind Ihre Lieblings-Dinge über Elektronik?

Unsere Lieblings-Sache ist leicht die Tatsache, dass jeder mit Wissen über die Schaffung für das Web kann erstellen und dazu beitragen, Multi-Plattform-native Erfahrungen. Ganz zu schweigen von der Leichtigkeit und der Freude an der Entwicklung, der ausgezeichneten Dokumentation und dem blühenden Ökosystem.

Aus Frontend-Perspektive fühlte sich Kap nicht anders als das Erstellen einer einfachen Website mit Browser-APIs. Electron macht eine wirklich großartige Aufgabe, die Entwicklung von Apps ähnlich (grundsätzlich identisch) wie die Web-Entwicklung zu gestalten. So einfach in der Tat, dass es keinen Bedarf für Frameworks oder ähnliches gab, um uns zu helfen, nur saubere und modulare JS und CSS.

Wir sind auch große Fans des Team-Aufbaus, ihrer Hingabe und Unterstützung und der aktiven und freundlichen Gemeinschaft, die sie pflegen. Hugs an alle!

## Was kommt als nächstes in Kap?

Der nächste Schritt für uns ist, die App in Vorbereitung auf unsere 2.0 zu überprüfen. milestone, der zusätzlich zur Unterstützung von Plugins ein React React Rewrite beinhaltet, was es Entwicklern ermöglicht, die Funktionalität von Kap! Wir laden alle ein, dem Projekt zu folgen und an unserem [GitHub Repository](https://github.com/wulkano/kap) mitzuwirken. Wir hören und möchten so viele von Ihnen wie möglich hören [Lassen Sie uns wissen, wie wir Kap zum bestmöglichen Werkzeug machen können, das es für Sie sein kann](https://wulkano.typeform.com/to/BIvJKz)!

## Was ist Wulkano?

[Wulkano](https://wulkano.com) ist ein Designstudio und digitales Kollektiv, ein Team von Ferntechnikern, die gerne an Client-Gigs und unseren eigenen Projekten mitarbeiten. Wir sind eine verteilte, aber enge Strickgruppe von Menschen aus verschiedenen Orten und Hintergründen, die Wissen, Ideen, Erfahrungen, Erfahrungen austauschen aber am wichtigsten, dumm GIFs und Memes, in unserem virtuellen Büro (die zufällig die Electron basiert Slack!).

## Irgendwelche Electron-Tipps, die für andere Entwickler nützlich sein könnten?

Nutzen Sie die Vorteile und beteiligen Sie sich an der fantastischen [Community](https://discuss.atom.io/c/electron), besuchen Sie [Tolles Electron](https://github.com/sindresorhus/awesome-electron), Schauen Sie sich [Beispiele](https://github.com/electron/electron-api-demos) an und nutzen Sie die großartige [Dokumentation](https://electronjs.org/docs/)!

