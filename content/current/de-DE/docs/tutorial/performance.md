# Leistung

Entwickler fragen häufig nach Strategien zur Optimierung der Performance von Electron-Anwendungen. Software-Ingenieure, Verbraucher und Framework-Entwickler sind sich nicht immer auf eine einzige Definition dessen, was "Performance" bedeutet. Dieses -Dokument umreißt einige der bevorzugten Wege der Electron-Betreuer um die Menge an Arbeitsspeicher, CPU, zu reduzieren und Plattenressourcen, die verwendet werden, während sichergestellt wird, dass Ihre App auf Benutzereingaben reagiert und die Operationen so schnell wie möglich abschließt . Darüber hinaus möchten wir, dass alle Leistungsstrategien einen hohen -Standard für die Sicherheit Ihrer App aufrechterhalten.

Weisheit und Informationen darüber, wie performante Websites mit JavaScript erstellt werden können, gelten in der Regel auch für Electron-Apps. Bis zu einem gewissen Grad diskutieren Ressourcen , wie man leistungsfähige Knoten baut. s Anwendungen gelten auch, aber seien Sie vorsichtig zu verstehen, dass der Begriff "Performance" verschiedene Dinge für einen Knoten bedeutet. s backend als für eine Anwendung, die auf einem Client läuft.

Diese Liste wird Ihnen zur Verfügung gestellt – und ist ähnlich wie unsere [Sicherheits-Checkliste](./security.md) – nicht erschöpfend. Es ist wahrscheinlich möglich, eine langsame Electron-App zu erstellen, die allen unten beschriebenen Schritten folgt. Electron ist eine leistungsstarke Entwicklungsplattform, die es Ihnen, dem Entwickler, ermöglicht, mehr oder weniger zu tun, was Sie wollen. All diese Freiheit bedeutet, dass Leistung größtenteils Ihre Verantwortung ist.

## Messe, Messung, Messung

Die folgende Liste enthält eine Reihe von Schritten, die relativ einfach und einfach zu implementieren sind. Um jedoch die leistungsfähigste Version Ihrer App zu erstellen, müssen Sie über eine Reihe von Schritten hinausgehen. Stattdessen müssen Sie den gesamten Code Ihrer App sorgfältig durch Profiling und messen. Wo liegen die Engpässe? Wenn der Benutzer auf einen Button klickt, welche Operationen nehmen die Last der Zeit in Anspruch? Während die App einfach nur Sammeln ist, welche Objekte belegen den größten Speicher?

Immer wieder haben wir gesehen, dass die erfolgreichste Strategie, eine leistungsstarke Electron-App zu bauen, darin besteht, den laufenden Code zu profilieren finden Sie das rohstoffhungrige Stück davon, und um es zu optimieren. Die Wiederholung dieses scheinbar mühsamen Prozesses immer und immer wieder wird die Leistung Ihrer App drastisch erhöhen. Experience from working with major apps like Visual Studio Code or Slack has shown that this practice is by far the most reliable strategy to improve performance.

Um mehr darüber zu erfahren, wie Sie den Code Ihrer App profitieren, machen Sie sich mit den Chrome-Entwickler-Tools vertraut. Für eine erweiterte Analyse, die mehrere Prozesse auf einmal untersucht, sollten Sie das [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) Werkzeug verwenden.

### Empfohlenes Lesen

 * [Beginnen Sie mit der Analyse der Laufzeitleistung](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [Vortrag: "Visual Studio Code - Die erste Sekunde"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## Checklist

Wahrscheinlich könnte Ihre App etwas schlanker, schneller und im Allgemeinen weniger ressourcenhungrig sein, wenn Sie diese Schritte versuchen.

1. [Leichtsinnig mit Modulen](#1-carelessly-including-modules)
2. [Code wird zu früh geladen und ausgeführt](#2-loading-and-running-code-too-soon)
3. [Den Hauptprozess blockieren](#3-blocking-the-main-process)
4. [Den Renderer-Prozess blockieren](#4-blocking-the-renderer-process)
5. [Unnötige Polyfills](#5-unnecessary-polyfills)
6. [Unnötige oder blockierte Netzwerkanfragen](#6-unnecessary-or-blocking-network-requests)
7. [Code bündeln](#7-bundle-your-code)

## 1) Leichtsinnig mit Modulen

Bevor Sie ein Node.js-Modul zu Ihrer Anwendung hinzufügen, prüfen Sie dieses Modul. How many dependencies does that module include? Welche Art von Ressourcen benötigt , um einfach in einer `require()` Anweisung aufgerufen zu werden? Sie könnten finden, dass das Modul mit den meisten Downloads in der NPM-Paketregistry oder den meisten Sternen auf GitHub nicht das schlankste oder kleinste verfügbare Modul ist.

### Warum?

Die Argumentation hinter dieser Empfehlung wird am besten mit einem Beispiel aus der realen Welt illustriert. In den frühen Tagen von Electron war die zuverlässige Erkennung der Netzwerkverbindung ein Problem resultiert viele Apps für ein Modul, das eine einfache `isOnline()` Methode enthüllt.

Dieses Modul erkannte deine Netzwerkverbindung, indem es versuchte, eine Anzahl bekannter Endpunkte zu erreichen. For the list of those endpoints, it depended on a different module, which also contained a list of well-known ports. Diese -Abhängigkeit selbst verlässt sich auf ein Modul mit Informationen über Ports, welche in Form einer JSON-Datei mit mehr als 100.000 Zeilen Inhalt kam. Wann immer das Modul geladen wurde (normalerweise in einer `require('module')` Anweisung), es würde alle seine Abhängigkeiten laden und schließlich diese JSON Datei lesen und parsen. Das Parsen von Tausenden von JSON ist ein sehr kostspieliger Betrieb. Auf einer langsamen Maschine kann es ganze Sekunden dauern.

In vielen Server-Kontexten ist die Startzeit praktisch irrelevant. Ein Knoten. s Server , der Informationen über alle Ports benötigt, ist wahrscheinlich "performant" wenn er alle benötigten Informationen in den Speicher lädt, wenn der Server bei den Vorteil schneller bootet, Anfragen zu bedienen. Das in diesem Beispiel diskutierte Modul ist kein "schlechtes" Modul. Elektron-Apps sollten jedoch nicht geladen, parsen und in Speicherinformationen speichern, die sie eigentlich nicht benötigen.

Kurz gesagt, ein scheinbar hervorragendes Modul, das primär für Node.js-Server geschrieben wurde, könnte für die Leistung deiner App schlechte Nachrichten sein. In diesem speziellen Beispiel war die richtige Lösung, überhaupt kein Modul zu verwenden und stattdessen Verbindungsüberprüfungen verwenden, die in späteren Chromium-Versionen enthalten sind.

### Wie?

Wenn Sie ein Modul in Betracht ziehen, empfehlen wir, dass Sie es prüfen:

1. die Größe der Abhängigkeiten beinhaltet 2) die Ressourcen, die zum Laden benötigt werden (`require()`)
3. die Ressourcen, die benötigt werden, um die Aktion auszuführen, die Sie interessieren

Die Erzeugung eines CPU-Profils und eines Heap-Speicherprofils für das Laden eines Moduls kann mit einem einzigen Befehl auf der Befehlszeile durchgeführt werden. Im folgenden Beispiel sehen wir das beliebte Modul `Request` an.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Das Ausführen dieses Befehls resultiert in einer `.cpuprofile` Datei und einer `.heappro-Datei` Datei in dem Verzeichnis, in dem Sie es ausgeführt haben. Both files can be analyzed using the Chrome Developer Tools, using the `Performance` and `Memory` tabs respectively.

![Performance-cpu-prof](../images/performance-cpu-prof.png)

![Performance-Heap-Prof](../images/performance-heap-prof.png)

In diesem Beispiel haben wir auf dem Computer des Autors gesehen, dass das Laden der `-Anfrage` fast eine halbe Sekunde gedauert hat, wobei `Knotenabruf` drastisch weniger Arbeitsspeicher benötigt hat und weniger als 50ms.

## 2) Code wird zu früh geladen und ausgeführt

Wenn Sie teure Einrichtungsvorgänge haben, sollten Sie diese aufschieben. Prüfen Sie alle Arbeiten, die direkt nach dem Start der Anwendung ausgeführt werden. Anstatt sofort von allen Operationen abzufeuern, erwägen Sie, sie in einer Sequenz weiter zu erschrecken, die eng mit der Reise des Benutzers übereinstimmt.

In der traditionellen Node.js-Entwicklung sind wir daran gewöhnt, alle `require()` Anweisungen an die Spitze zu setzen. Wenn Sie derzeit Ihre Electron-Anwendung mit der gleichen Strategie _und_ schreiben, verwenden Sie annehmbare Module, die Sie nicht sofort benötigen die gleiche Strategie anwenden und das Laden auf eine mehr passende Zeit verschieben.

### Warum?

Das Laden von Modulen ist eine überraschend teure Bedienung, besonders unter Windows. Wenn Ihre App startet, sollte es nicht dazu führen, dass Benutzer auf Operationen warten, die derzeit nicht notwendig sind.

This might seem obvious, but many applications tend to do a large amount of work immediately after the app has launched - like checking for updates, downloading content used in a later flow, or performing heavy disk I/O operations.

Betrachten wir Visual Studio Code als Beispiel. Wenn Sie eine Datei öffnen, wird die Datei sofort ohne jegliche Code-Hervorhebung angezeigt, priorisiert Ihre Fähigkeit, mit dem Text zu interagieren. Sobald es diese Arbeit erledigt hat, wird es zur Hervorhebung von Code weitergehen.

### Wie?

Betrachten wir ein Beispiel und nehmen wir an, dass Ihre Anwendung Dateien im fiktiven Format `.foo` analysiert. Um dies zu tun, stützt es sich auf das genauso fiktive `foo-parser` Modul. In der traditionellen Node.js-Entwicklung kannst du Code schreiben, der die Abhängigkeiten eifrig lädt:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    . iles = fs.readdirSync('. )
  }

  getParsedFiles () {
    gibt fooParser.parse(this zurück. iles)
  }
}

const parser = new Parser()

module.exports = { parser }
```

Im obigen Beispiel erledigen wir eine Menge Arbeit, die ausgeführt wird, sobald die Datei geladen wurde. Müssen wir sofort analysierte Dateien bekommen? Could we do this work a little later, when `getParsedFiles()` is actually called?

```js
// "fs" wird wahrscheinlich bereits geladen, so dass der `require()` Aufruf billig ist
const fs = require('fs')

class Parser {
  async getFiles () {
    // Berühren Sie die Festplatte, sobald `getFiles` aufgerufen wird, nicht früher.
    // Stellen Sie außerdem sicher, dass wir andere Operationen nicht durch Verwendung von
    // der asynchronen Version blockieren.
    this.files = this.files || warten fs.readdir('.')

    geben dies zurück. iles
  }

  async getParsedFiles () {
    // Unser fiktiver Foo-Parser ist ein großes und kostspieliges Modul zum laden, also
    // Verschieben Sie diese Arbeit, bis wir tatsächlich Dateien parsen müssen.
    // Da `require()` mit einem Modul-Cache ausgestattet ist, der `require()` Aufruf
    // wird nur einmal teuer sein - nachfolgende Aufrufe von `getParsedFiles()`
    // werden schneller sein.
    const fooParser = require('foo-parser')
    const files = warten this.getFiles()

    return fooParser. arse(files)
  }
}

// Dieser Vorgang ist jetzt viel billiger als in unserem vorherigen Beispiel
const parser = new Parser()

Modul. xports = { parser }
```

Kurz gesagt, Ressourcen "just in time" zuweisen, anstatt sie alle beim Start Ihrer App zuzuweisen.

## 3) Blockieren des Hauptprozesses

Der elektronische Hauptprozess (manchmal "Browser-Prozess") ist speziell: Es ist der übergeordnete Prozess für alle anderen Prozesse Ihrer App und der primäre Prozess mit dem das Betriebssystem interagiert. Es verarbeitet Fenster, Interaktionen und die Kommunikation zwischen verschiedenen Komponenten innerhalb Ihrer App. Es beherbergt auch den UI Thread.

Unter keinen Umständen sollten Sie diesen Prozess und den UI-Thread mit langanhaltenden Operationen blockieren. Das Blockieren des UI-Threads bedeutet, dass Ihre gesamte App einfriert, bis der Hauptprozess bereit ist, die Verarbeitung fortzusetzen.

### Warum?

Der Hauptprozess und sein UI-Thread sind im Wesentlichen der Kontrollturm für große Operationen innerhalb deiner App. Wenn das Betriebssystem Ihrer App einen Mausklick mitteilt, wird es den Hauptprozess durchlaufen, bevor es Ihr Fenster erreicht. Wenn Ihr Fenster eine blutglatte Animation wiedergibt, es muss sich mit über den GPU-Prozess unterhalten – einmal mehr durch den Hauptprozess.

Elektron und Chromium achten darauf, schwere Festplattenein- und CPU-gebundene Operationen auf neue Threads zu setzen, um den UI-Thread nicht zu blockieren. Sie sollten das Gleiche tun.

### Wie?

Electron's powerful multi-process architecture stands ready to assist you with your long-running tasks, but also includes a small number of performance traps.

1) Für lange CPU-schwere Aufgaben verwenden Sie [Arbeiterthreads](https://nodejs.org/api/worker_threads.html), überlegen Sie, sie in das BrowserFenster zu verschieben, oder (als letzter Ausgang) einen dedizierten Prozess zu erzeugen.

2) Vermeiden Sie die Verwendung der synchronen IPC und des `Remote-Moduls` so weit wie möglich. Es gibt zwar legitime Anwendungsfälle, aber es ist viel zu einfach, unwissentlich den UI-Thread mit Hilfe des `entfernten` Moduls zu blockieren.

3) Vermeiden Sie die Blockierung von I/O-Operationen im Hauptprozess. Kurzum, wann immer Kernknoten. s Module (wie `fs` oder `child_process`) bieten eine synchrone oder eine asynchrone Version an Sie sollten die asynchrone und nicht-blockierende Variante bevorzugen.


## 4) Blockieren des Renderer-Prozesses

Da Electron mit einer aktuellen Chrome-Version ausgeliefert wird, Sie können die neuesten und großartigsten Funktionen der Web-Plattform nutzen, um schwere Operationen so zu verschieben oder abzuschalten, dass Ihre App reibungslos und flexibel bleibt.

### Warum?

Ihre App hat wahrscheinlich eine Menge JavaScript im Renderer-Prozess. Der Trick ist es, die Operationen so schnell wie möglich auszuführen, ohne Ressourcen zu nehmen, die benötigt werden, um das Scrollen reibungslos zu halten, auf Benutzereingabe oder Animationen bei 60fps reagieren.

Orchestrating the flow of operations in your renderer's code is particularly useful if users complain about your app sometimes "stuttering".

### Wie?

Generell gelten alle Ratschläge für die Erstellung leistungsfähiger Web-Apps für moderne -Browser auch für die Renderer von Electronic. Die beiden primären Werkzeuge, die Ihnen zur Verfügung stehen, sind derzeit `requestIdleCallback()` für kleine Operationen und `Webworkers` für lang laufende Operationen.

*`requestIdleCallback()`* allows developers to queue up a function to be executed as soon as the process is entering an idle period. Es ermöglicht Ihnen, mit niedriger Priorität oder Hintergrundarbeit durchzuführen, ohne die Benutzererfahrung zu beeinträchtigen. Für weitere Informationen, wie Sie es verwenden können, lesen Sie [die Dokumentation auf MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Webworkers* sind ein leistungsfähiges Werkzeug, um Code auf einem separaten Thread auszuführen. Es gibt einige Vorbehalte zu beachten – konsultieren Sie die elektronische [Multithreading-Dokumentation](./multithreading.md) und die [MDN-Dokumentation für Webworkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). Sie sind eine ideale Lösung für jede Operation, die eine hohe CPU-Leistung für einen längeren Zeitraum von erfordert.


## 5) Unnötige Polyfelle

One of Electron's great benefits is that you know exactly which engine will parse your JavaScript, HTML, and CSS. Wenn Sie Code neu verwenden, der für das Web im Großen und Ganzen geschrieben wurde, stellen Sie sicher, dass nicht die Polyfüllfunktionen in Electron enthalten sind.

### Warum?

Beim Erstellen einer Webanwendung für das heutige Internet diktieren die ältesten Umgebungen welche Funktionen Sie verwenden können und dürfen. Auch wenn Electron leistungsfähige CSS-Filter und -Animationen unterstützt, könnte ein älterer Browser dies nicht tun. Wo Sie WebGL verwenden könnten, haben Ihre Entwickler möglicherweise eine ressourcenhungrigere Lösung gewählt, um ältere Telefone zu unterstützen.

Wenn es um JavaScript geht, Sie können Toolkit-Bibliotheken wie jQuery für DOM-Selektoren oder Polyfills wie die `Regenerator-Laufzeit` hinzugefügt haben, um `async/warten` zu können.

Es ist selten, dass ein JavaScript-basiertes Polyfill schneller ist als die gleichwertige native Funktion in Electron. Verzögern Sie Ihre Electron-App nicht, indem Sie Ihre -Version der Standard-Web-Plattform-Funktionen versenden.

### Wie?

Operieren unter der Annahme, dass Polyfillments in aktuellen Versionen von Electron nicht notwendig sind. Wenn du Zweifel hast, überprüfe [Caniuse. om](https://caniuse.com/) und überprüfen, ob die [Version von Chromium, die in Ihrer Electron Version](../api/process.md#processversionschrome-readonly) verwendet wird, die von Ihnen gewünschte Funktion unterstützt.

Außerdem sollten Sie die von Ihnen verwendeten Bibliotheken sorgfältig prüfen. Sind sie wirklich notwendig? `jQuery`, zum Beispiel war so ein Erfolg, dass viele seiner Funktionen nun Teil des [Standard JavaScript-Feature-Sets verfügbar](http://youmightnotneedjquery.com/) sind.

Wenn Sie einen Transpiler/Compiler wie TypeScript verwenden, überprüfen Sie die Konfiguration und stellen Sie sicher, dass Sie die aktuellste ECMAScript-Version auswählen, die von Electron unterstützt wird.


## 6) Unnötige oder Sperrung von Netzwerkanfragen

Vermeiden Sie das Abrufen von selten wechselnden Ressourcen aus dem Internet, wenn diese einfach mit Ihrer Anwendung gebündelt werden könnten.

### Warum?

Viele Benutzer von Electron beginnen mit einer komplett web-basierten App, die zu einer Desktop-Anwendung wird. Als Webentwickler sind wir es gewohnt, Ressourcen aus einer Vielzahl von Content Delivery-Netzwerken zu laden. Jetzt, da Sie eine korrekte Desktop-Anwendung versenden versuchen Sie "das Kabel zu schneiden", wenn möglich und vermeiden Sie, dass Ihre Benutzer auf nie veränderte Ressourcen warten lassen und leicht in Ihre App aufgenommen werden können.

Ein typisches Beispiel sind Google Fonts. Viele Entwickler nutzen die beeindruckende Sammlung von Google kostenloser Schriftarten, die mit einem Netzwerk für Inhaltslieferungen verbunden ist. Der Pitch ist einfach: Fügen Sie ein paar Zeilen CSS ein und Google kümmert sich um den Rest.

Beim Erstellen einer Electron-App werden Ihre Benutzer besser bedient, wenn Sie die Schriftarten herunterladen und in das Paket Ihrer App einbinden.

### Wie?

In einer idealen Welt bräuchte deine Anwendung nicht das Netzwerk um mit zu arbeiten. Um dorthin zu gelangen, müssen Sie verstehen, welche Ressourcen Ihre App lädt \- und wie groß diese Ressourcen sind.

Dazu öffnen Sie die Entwicklerwerkzeuge. Navigieren Sie zum `Netzwerk` Tab und wählen Sie die `Deaktiviere Cache` Option. Lade dann deinen Renderer neu. Es sei denn, Ihre App verbietet solche Nachladungen, Sie können normalerweise ein Nachladen auslösen, indem Sie `Cmd + R` oder `Strg + R` mit den Entwicklerwerkzeugen im Fokus drücken.

Die Tools werden nun alle Netzwerkanfragen sorgfältig aufzeichnen. In einem ersten Durchgang holt eine Bestandsaufnahme aller heruntergeladenen Ressourcen, wobei zuerst die größeren Dateien im Mittelpunkt stehen. Gibt es Bilder, Schriftarten oder Mediendateien, die sich nicht ändern und in Ihrem Bundle enthalten? Wenn ja, schließen Sie sie ein.

Aktiviere `Network Throttling` als nächsten Schritt. Finden Sie das Dropdown-Menü, das `Online` liest und wählen Sie eine langsamere Geschwindigkeit wie `Schneller 3G`. Lade deinen Renderer neu und überprüfe, ob es Ressourcen gibt, auf die deine App unnötig wartet. In vielen Fällen wird eine App darauf warten, dass eine Netzwerkanfrage abgeschlossen wird, obwohl sie nicht die betroffene Ressource benötigt.

As a tip, loading resources from the Internet that you might want to change without shipping an application update is a powerful strategy. Für erweiterte Kontrolle darüber, wie Ressourcen geladen werden, sollten Sie in [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) investieren.

## 7) Bundle deinen Code

Wie bereits in "[erwähnt, wird Code zu früh geladen und ausgeführt](#2-loading-and-running-code-too-soon)", aufgerufen `require()` ist eine kostspielige Operation. Wenn du das kannst, bündele den Code deiner Anwendung in einer einzigen Datei.

### Warum?

Moderne JavaScript-Entwicklung umfasst in der Regel viele Dateien und Module. Während ist es perfekt für die Entwicklung mit Electron, wir empfehlen Ihnen dringend, Ihren ganzen Code in einer einzigen Datei zu bündeln, um sicherzustellen, dass der im Aufruf enthaltene Overhead `require()` nur einmal bezahlt wird, wenn Ihre Anwendung geladen wird.

### Wie?

Es gibt eine Vielzahl von JavaScript-Paketen und wir wissen es besser, als die Gemeinschaft zu ärgern, indem wir ein Werkzeug über ein anderes empfehlen. Wir empfehlen Ihnen jedoch ein Bundler zu verwenden, das in der Lage ist, die einzigartige Umgebung von Electronic zu behandeln, die beide Knoten behandeln muss. s und Browser-Umgebungen.

Zum Schreiben dieses Artikels sind [Webpack](https://webpack.js.org/), [Paket](https://parceljs.org/)und [rollup.js](https://rollupjs.org/) beliebt.
