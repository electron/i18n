---
title: 'Projekt der Woche: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

Diese Woche haben wir [@feross](https://github.com/feross) und [@dcposch](https://github.com/dcposch) aufgeholt, um über WebTorrent zu reden der webbasierte Torrent-Client, der Benutzer miteinander verbindet, um ein verteiltes, dezentralisiertes Browser-zu-Browser-Netzwerk zu bilden.

---

## Was ist WebTorrent?

[WebTorrent](https://webtorrent.io) ist der erste Torrent-Client, der im Browser funktioniert. Es ist komplett in JavaScript geschrieben und kann WebRTC für Peer-to-Peer-Transporte verwenden. Kein Browser-Plugin, Erweiterung oder Installation erforderlich.

Mit offenen Webstandards verbindet WebTorrent Website-Benutzer zu einem verteilten, dezentralisierten Browser-zu-Browser-Netzwerk für eine effiziente Dateiübertragung.

Sie können hier eine Demo von WebTorrent in Aktion sehen: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="webtorrent-Homepage" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Warum ist das cool?

Stellen Sie sich eine Video-Website wie YouTube, aber wo Besucher helfen, die Inhalte der Website. Je mehr Menschen eine WebTorrent-Website verwenden, desto schneller und widerstandsfähiger wird sie.

Die Kommunikation zwischen Browser und Browser macht den Mittelstand aus und lässt Menschen zu ihren eigenen Bedingungen kommunizieren. Kein Client/Server mehr – nur ein Netzwerk von Partnern, alle gleich. WebTorrent ist der erste Schritt auf dem Weg zur Re-Dezentralisierung des Web.

## Wo kommt Electron ins Bild?

Vor etwa einem Jahr haben wir beschlossen, [WebTorrent Desktop](https://webtorrent.io/desktop/), eine Version von WebTorrent zu bauen, die als Desktop-App läuft.

[![WebTorrent Desktop Player-Fenster](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Wir haben WebTorrent-Desktop aus drei Gründen erstellt:

1. Wir wollten eine saubere, leichte, werbefreie Open Source Torrent-App
2. Wir wollten eine Torrent-App mit guter Streaming-Unterstützung
3. Wir brauchen einen "Hybrid-Client", der die BitTorrent- und WebTorrent-Netzwerke verbindet

## Wenn wir bereits Torrents in meinem Web-Browser herunterladen können, warum eine Desktop-App?

Zunächst ein bisschen Hintergrund auf das Design von WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="webtorrent-Desktop-Logo" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

In den frühen Tagen benutzte BitTorrent TCP als Transportprotokoll. Später kam uTP zu vielversprechenden Verbesserungen und zusätzlichen Vorteilen gegenüber TCP. Jeder Mainstream Torrent-Client schließlich adoptiert uTP, und heute können Sie BitTorrent über jedes Protokoll. Das WebRTC-Protokoll ist der nächste logische Schritt. Es bringt das Versprechen der Interoperabilität mit Webbrowsern – ein riesiges P2P-Netzwerk bestehend aus allen Desktop-BitTorrent-Clients und Millionen von Web-Browsern.

„Web-Peers“ (Torrent-Peers, die in einem Web-Browser laufen) macht das BitTorrent-Netzwerk stärker, indem Millionen von neuen Partnern hinzugefügt werden, und die Verbreitung von BitTorrent auf Dutzende neuer Anwendungsfälle. WebTorrent verfolgt die BitTorrent-Spezifikation so genau wie möglich, um es bestehenden BitTorrent-Clients zu erleichtern, Unterstützung für WebTorrent hinzuzufügen.

Einige Torrent-Apps wie [Vuze](https://www.vuze.com/) unterstützen bereits Webteilnehmer, aber wir wollten nicht warten, bis der Rest Unterstützung hinzufügt. **Also im Grunde war WebTorrent Desktop unser Weg, die Annahme des WebTorrent-Protokolls zu beschleunigen.** Indem du eine tolle Torrent-App erstellst, die die Leute wirklich benutzen möchten wir erhöhen die Anzahl der Peers im Netz, dass Torrents mit Web-Peers (i. . Benutzer auf Webseiten).

## Was sind einige interessante Anwendungsfälle für Torrents jenseits dessen, was die Menschen bereits wissen, dass sie tun können?

Einer der aufregendsten Anwendungen für WebTorrent ist die Peer-Assisted Lieferung. Non-Profit-Projekte wie [Wikipedia](https://www.wikipedia.org/) und das [Internet Archiv](https://archive.org/) könnten Bandbreite und Hosting-Kosten reduzieren, indem die Besucher einspringen lassen. Beliebte Inhalte können von Browser zu Browser schnell und kostengünstig bedient werden. Selten aufgerufene Inhalte können zuverlässig über HTTP vom Ursprungsserver ausgeliefert werden.

Das Internet Archiv hat seine Torrent-Dateien bereits aktualisiert, so dass sie hervorragend mit WebTorrent arbeiten. Also, wenn Sie den Inhalt des Internet Archivs auf Ihrer Website einbetten möchten Sie können es auf eine Weise tun, die die Hosting-Kosten für das Archiv reduziert, damit sie mehr Geld für die eigentliche Archivierung des Web!

Es gibt auch spannende Anwendungsfälle, von CDNs bis zur App-Lieferung über P2P.

## Was sind einige Ihrer Lieblings-Projekte, die WebTorrent verwenden?

![gaia App Screenshot](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Die coolste Sache, die mit WebTorrent gebaut wurde, Hände runter, ist wahrscheinlich [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Es ist eine strahlende 3D interaktive Simulation der Milchstraße. Die Daten werden von einem Torrent geladen, direkt in Ihrem Browser. Es ist beeindruckend, durch unser Sternensystem zu fliegen und zu erkennen, wie wenig wir Menschen mit der Weite unseres Universums vergleichen.

Du kannst nachlesen, wie dies gemacht wurde, in [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), ein Blog-Beitrag, wo der Autor, Charlie Hoey, erklärt, wie er die Sternkarte mit WebGL und WebTorrent gebaut hat.

<a href="https://brave.com/">
  <img alt="mutiges Logo" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Wir sind auch große Fans von [Brave](https://brave.com/). Brave ist ein Browser, der Werbung und Tracker automatisch blockiert, um das Web schneller und sicherer zu machen. Brave kürzlich hinzugefügter Torrent-Support, sodass Sie [traditionelle Torrents ohne eine separate App ansehen können](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Diese Funktion wird von WebTorrent betrieben.

So wie die meisten Browser PDF-Dateien rendern können, kann Brave Magnetlinks und Torrent-Dateien rendern. Sie sind nur eine andere Art von Inhalt, die der Browser nativ unterstützt.

Einer der Mitbegründer von Brave ist Brendan Eich, der Schöpfer von JavaScript, die Sprache, in der wir WebTorrent geschrieben haben, so dass wir denken, es ist ziemlich cool, dass Brave beschlossen, WebTorrent zu integrieren.

## Warum haben Sie beschlossen, WebTorrent Desktop auf Electronic zu erstellen?

<a href="https://webtorrent.io/desktop/">
  <img alt="WebTorrent-Desktop-Hauptfenster" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Es gibt eine Meme, die Electron-Apps "geblockt" werden, da sie das gesamte Chrome-Inhaltsmodul in jeder App enthalten. In einigen Fällen ist dies teilweise der Fall (ein Electron-App-Installer ist normalerweise ~40MB, wobei ein OS-spezifischer App-Installer normalerweise ~20MB beträgt).

Allerdings, im Fall von WebTorrent Desktop, verwenden wir fast alle Electron Funktionen, und viele Dutzende von Chrome Funktionen im Laufe des normalen Betriebs. Wenn wir diese Funktionen von Grund auf für jede Plattform implementieren wollten, es hätte Monate oder Jahre länger gedauert, unsere App zu bauen, sonst hätten wir nur für eine einzige Plattform freigegeben.

Nur um eine Idee zu erhalten, verwenden wir die [Dock-Integration von Electronic](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (um Download-Fortschritt anzuzeigen), [Menüleisten-Integration](https://electronjs.org/docs/api/menu) (im Hintergrund ausführen) [Protokoll-Handler-Registrierung](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (um Magnet-Links zu öffnen), [Stromsparblocker](https://electronjs.org/docs/api/power-save-blocker/) (um den Ruhezustand während der Videowiedergabe zu vermeiden) und [Automatischer Updater](https://electronjs.org/docs/api/auto-updater). Was die Chrome-Funktionen betrifft, so verwenden wir mehr: das `<video>` Tag (um viele verschiedene Video-Formate abzuspielen), das `<track>` Tag (für Untertitel unterstützen), drag-and-drop Unterstützung und WebRTC (was nicht trivial ist in einer nativen App zu verwenden).

Nicht zu nennen: Unsere Torrent-Engine ist in JavaScript geschrieben und geht davon aus, dass es viele Node APIs gibt, aber besonders `require('net')` und `require('dgram')` für TCP und UDP Socket Unterstützung.

Im Grunde ist Electron genau das, was wir brauchten, und wir hatten die exakten Funktionen, die wir brauchten, um eine solide, polierte App in Rekordzeit zu versenden.

## Was sind Ihre Lieblings-Dinge über Elektronik?

Die WebTorrent-Bibliothek ist seit zwei Jahren als Open-Source-Projekt in Entwicklung. **Wir haben WebTorrent-Desktop in vier Wochen erstellt.** Electron ist der Hauptgrund, dass wir unsere App so schnell bauen und verschicken konnten.

Genau wie der Knoten. s machte Server-Programmierung für eine Generation von jQuery-basierten Frontend-Programmierern zugänglich, Electron macht die native App-Entwicklung für jeden zugänglich, der mit Web oder Knoten vertraut ist. s Entwicklung. Elektron ist extrem ermächtigend.

## Teilen Sie die Website und den Desktop-Client-Code mit?

Ja, das [`webtorrent` npm Paket](https://npmjs.com/package/webtorrent) funktioniert in Node.js, im Browser und in Electron. Der gleiche Code kann in allen Umgebungen laufen – das ist die Schönheit von JavaScript. Es ist heute universelle Laufzeit. Java-Applets versprachen "Schreibe einmal, Run Anywhere" Apps, aber diese Vision wurde aus einer Reihe von Gründen nie wirklich realisiert. Elektron, mehr als jede andere Plattform, wird tatsächlich ziemlich nah an diesem Ideal.

## Was sind einige Herausforderungen, denen du beim Aufbau von WebTorrent gegenüberstehst?

In den frühen Versionen der App haben wir uns bemüht, die Benutzeroberfläche performant zu machen. Wir setzen die Torrent-Engine in den gleichen Renderer-Prozess, der das Hauptfenster der App zieht, was vorhersehbar ist führte zu Langsamkeit zu jeder Zeit gab es eine intensive CPU-Aktivität von der Torrent-Engine (wie die Überprüfung der Torrent-Stücke von Gegenstellen).

Wir haben dies behoben, indem wir die Torrent-Engine auf einen zweiten, unsichtbaren Renderer-Prozess verschieben, mit dem wir über [IPC](https://electronjs.org/docs/api/ipc-main/) kommunizieren. Auf diese Weise, wenn dieser Prozess kurz eine Menge CPU verwendet, wird der UI-Thread nicht beeinträchtigt. Butterweiches Scrollen und Animationen sind so zufriedenstellend.

Hinweis: Wir mussten die Torrent-Engine in einen Renderer-Prozess statt eines "Haupt"-Prozesses setzen weil wir Zugang zu WebRTC benötigen (was nur im Renderer verfügbar ist.)

## In welchen Bereichen sollte Electron verbessert werden?

Eine Sache, die wir gerne sehen würden, ist eine bessere Dokumentation darüber, wie produktionsbereite Apps gebaut und verschickt werden können, vor allem um heikle Themen wie Code-Signierung und Auto-Updating. Wir mussten über bewährte Praktiken lernen, indem wir uns in den Quellcode begeben und uns bei Twitter umschauen!

## Ist der WebTorrent-Desktop fertig? Wenn nicht, was kommt als Nächstes?

Wir denken, die aktuelle Version von WebTorrent Desktop ist hervorragend, aber es gibt immer Raum für Verbesserungen. Wir arbeiten derzeit an der Verbesserung der Unterstützung für Polish, Performance, Untertitelunterstützung und Video-Codec.

Wenn Sie daran interessiert sind, sich am Projekt zu beteiligen, schauen Sie sich [unsere GitHub-Seite](https://github.com/feross/webtorrent-desktop) an!

## Etwas Electron Entwicklungstipps, die für andere Entwickler nützlich sein könnten?

[Feross](http://feross.org/), einer der Mitwirkenden des WebTorrent-Desktops, Vor kurzem hielt ein Vortrag *"Real world Electron: Building Cross-Plattform Desktop Apps mit JavaScript"* auf NodeConf Argentinien, die nützliche Tipps für die Freigabe einer polierten Electron App enthält. Der Vortrag ist besonders nützlich, wenn Sie sich in der Phase befinden, in der Sie eine grundlegende Arbeits-App haben und Sie versuchen, sie auf die nächste Stufe von Polnisch und Professionalität zu bringen.

[Hier ansehen](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Folien hier](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), another WebTorrent contributor, wrote [a checklist of things you can do](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) to make your app feel polished and native. Es enthält Code-Beispiele und umfasst Dinge wie die Integration von MacOS-Dock-Systemen, Ziehen und Ablegen, Desktop-Benachrichtigungen, und stellt sicher, dass Ihre App schnell geladen wird.

