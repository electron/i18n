---
title: Electron 1.0
author: jörn
date: '2016-05-11'
---

In den letzten zwei Jahren hat Electron Entwicklern dabei geholfen, plattformübergreifende Desktop-Apps mit HTML, CSS und JavaScript zu erstellen. Jetzt freuen wir uns, einen großen Meilenstein für unser Framework und für die Community zu teilen, die es geschaffen hat. The release of Electron 1.0 is now available from [electronjs.org][electronjs.org].

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 stellt einen wichtigen Meilenstein in der API-Stabilität und -Laufzeit dar. Diese -Version ermöglicht es Ihnen, Apps zu erstellen, die sich unter Windows, Mac und Linux wirklich nativ fühlen. Das Erstellen von Electron-Apps ist einfacher denn je mit neuen Dokumenten, neuen Werkzeugen und einer neuen App, die Sie durch die Electron-API führt.

If you're ready to build your very first Electron app, here's a [quick start guide][quick-start] to help you get started.

Wir freuen uns zu sehen, was Sie als nächstes mit Electron bauen.

## Elektronenpfad

We released Electron when we launched [Atom][atom] a little over two years ago. Electron, damals bekannt als Atom Shell, war der Rahmen, auf dem wir Atom gebaut hatten. Damals Atom war die treibende Kraft hinter den Funktionen und Funktionalitäten , die Electron bereitstellte, als wir die erste Atom-Freigabe herausbrachten.

Now driving Electron is a growing community of developers and companies building everything from [email][nylas], [chat][slack], and [Git apps][gitkraken] to [SQL analytics tools][wagon], [torrent clients][webtorrent], and [robots][jibo].

In den letzten zwei Jahren haben wir gesehen, dass sowohl Unternehmen als auch Open-Source-Projekte Electron als Grundlage für ihre Apps wählen. Gerade im vergangenen Jahr wurde Electron mehr als 1,2 Millionen Mal heruntergeladen. [Take a tour][apps] of some of the amazing Electron apps and add your own if it isn't already there.

![Electron-Downloads](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Electron API Demos

Zusammen mit dem 1. freisetzen, wir veröffentlichen eine neue App, um dir zu helfen, die Electron-APIs zu erkunden und mehr darüber zu erfahren, wie du deine Electron-App einheimisch machen kannst. The [Electron API Demos][electron-api-demos] app contains code snippets to help you get your app started and tips on effectively using the Electron APIs.

[![Electron API Demos](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)][electron-api-demos]

## Devtron

Wir haben auch eine neue Erweiterung hinzugefügt, die Ihnen hilft, Ihre Electron Apps zu debuggen. [Devtron][devtron] is an open-source extension to the [Chrome Developer Tools][devtools] designed to help you inspect, debug, and troubleshoot your Electron app.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)][devtron]

### Eigenschaften

  * **Erfordert einen Graph** an, der Ihnen hilft, die internen und externen Bibliotheksabhängigkeiten sowohl in den Haupt- als auch in den Renderer-Prozessen zu visualisieren
  * **IPC-Monitor** der die gesendeten und empfangenen Nachrichten zwischen den Prozessen Ihrer App verfolgt und anzeigt
  * **Ereignisinspektor** der Ihnen die Ereignisse und Zuhörer anzeigt, die in Ihrer App auf den Kern-Electron-APIs wie dem Fenster registriert sind app, und Prozesse
  * **App-Linter** der Ihre Apps auf häufige Fehler prüft und Funktionalität fehlt

## Spectron

Finally, we're releasing a new version of [Spectron][spectron], the integration testing framework for Electron apps.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)][spectron]

Spektrum. 3. verfügt über umfassende Unterstützung für die gesamte Electron-API, mit der Sie schneller Tests schreiben können, die das Verhalten Ihrer Anwendung in verschiedenen Szenarien und Umgebungen verifizieren. Spectron is based on [ChromeDriver][chromedriver] and [WebDriverIO][webdriver] so it also has full APIs for page navigation, user input, and JavaScript execution.

## Community

Electron 1.0 ist das Ergebnis einer Gemeinschaftsarbeit von hunderten Entwicklern. Außerhalb des Kern-Frameworks wurden Hunderte von Bibliotheken und Werkzeugen freigegeben, um das Erstellen, Paketieren und Bereitstellen von Electron-Apps zu vereinfachen.

There is now a new [community][community] page that lists many of the awesome Electron tools, apps, libraries, and frameworks being developed. You can also check out the [Electron][electron-org] and [Electron Userland][electron-userland] organizations to see some of these fantastic projects.

Neu bei Elektronik? Sehen Sie sich das Intro Video Electron 1.0 an:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>
[apps]: https://electronjs.org/apps
[atom]: https://atom.io
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver
[community]: https://electronjs.org/community
[devtools]: https://developer.chrome.com/devtools
[devtron]: https://electronjs.org/devtron
[devtron]: https://electronjs.org/devtron
[electronjs.org]: https://electronjs.org
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-org]: https://github.com/electron
[electron-userland]: https://github.com/electron-userland
[gitkraken]: https://www.gitkraken.com
[jibo]: https://www.jibo.com
[nylas]: https://nylas.com
[quick-start]: https://electronjs.org/docs/tutorial/quick-start
[slack]: https://slack.com
[spectron]: https://electronjs.org/spectron
[spectron]: https://electronjs.org/spectron
[wagon]: https://www.wagonhq.com
[webtorrent]: https://webtorrent.io/desktop
[webdriver]: http://webdriver.io

