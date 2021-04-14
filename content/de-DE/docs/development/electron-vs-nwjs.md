# Technische Unterschiede zwischen Electron und NW.js

Wie [NW.js][nwjs]bietet Electron eine Plattform zum Schreiben von Desktop-Anwendungen mit Web- -Technologien. Beide Plattformen ermöglichen es Entwicklern, HTML, JavaScript und Node.js zu verwenden. Oberflächlich betrachtet scheinen sie sich sehr ähnlich zu sein.

Es gibt jedoch grundlegende Unterschiede zwischen den beiden Projekten, die Electron zu einem völlig separaten Produkt von NW.js machen.

## 1) Anmeldung

In NW.js kann der Haupteinstiegspunkt einer Anwendung eine HTML-Webseite sein. In diesem Fall öffnet NW.js den angegebenen Einstiegspunkt in einem Browserfenster.

In Electron ist der Einstiegspunkt immer ein JavaScript-Skript. Anstatt eine URL direkt bereitzustellen, erstellen Sie manuell ein Browserfenster und laden eine HTML-Datei mit der API. Sie müssen auch Fensterereignisse anhören, um zu entscheiden, wann die Anwendung beendet werden soll.

Electron funktioniert eher wie die Node.js Laufzeit. Die APIs von Electron sind niedriger, so dass Sie es anstelle von [PhantomJS](https://phantomjs.org/)für Browsertests verwenden können.

## 2) Knotenintegration

In NW.js erfordert die Node-Integration in Webseiten das Patchen von Chromium, während wir in Electron einen anderen Weg gewählt haben, um die `libuv` Schleife mit der Nachrichtenschleife jeder Plattform zu integrieren, um das Hacken von Chromium zu vermeiden. Im [`node_bindings`][node-bindings] Code erfahren Sie, wie dies geschehen ist.

## 3) JavaScript-Kontexte

Wenn Sie ein erfahrener NW.js Benutzer sind, sollten Sie mit dem Konzept des Knotenkontexts und Webkontexts vertraut sein. Diese Konzepte wurden erfunden, weil NW.js umgesetzt wurde.

Durch die Verwendung der [Multikontext-](https://github.com/nodejs/node-v0.x-archive/commit/756b622) -Funktion von Node führt Electron keinen neuen JavaScript-Kontext in Web- -Seiten ein.

Hinweis: NW.js unterstützt optional Multi-Kontext seit 0.13.

## 4) Legacy-Support

NW.js bietet weiterhin eine "Legacy-Version", die Windows XP unterstützt. Es werden keine Sicherheitsupdates empfangen.

Angesichts der Tatsache, dass Hardwarehersteller, Microsoft, Chromium und Node.js nicht einmal kritische Sicherheitsupdates für dieses System veröffentlicht , müssen wir Sie warnen, , dass die Verwendung von Windows XP völlig unsicher und völlig unverantwortlich ist.

Wir verstehen jedoch, dass Anforderungen außerhalb unserer wildesten Vorstellungskraft existieren können, wenn Sie also nach etwas wie Electron suchen, das unter Windows XP läuft, die NW.js Legacy-Version könnte die richtige für Sie sein.

## 5) Eigenschaften

Es gibt zahlreiche Unterschiede in der Anzahl der unterstützten Features. Electron hat eine größere Community , mehr Produktions-Apps verwendet und eine große Menge an Benutzerland-Modulen [, die auf npm][electron-modules]verfügbar sind.

Als Beispiel hat Electron integrierte Unterstützung für automatische Updates und unzählige Tools, die die Erstellung von Installateuren erleichtern. Als Beispiel für NW.js unterstützt NW.js mehr `Chrome.*` APIs für die Entwicklung von Chrome Apps.

Natürlich glauben wir, dass Electron die bessere Plattform für polierte Produktionsanwendungen ist, die mit Web-Technologien (wie Visual Studio Code, Slack oder Facebook Messenger) erstellt wurden. Wir wollen jedoch fair zu unserer Web-Technologie Freunden sein. Wenn Sie Feature-Anforderungen haben, die Electron nicht erfüllt, möchten Sie vielleicht, dass NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
