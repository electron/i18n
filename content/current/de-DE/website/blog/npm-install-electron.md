---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Ab Electron Version 1.3.1 können Sie `npm Elektron --save-dev` installieren, um die neueste vorkompilierte Version von Electron in Ihrer App zu installieren.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Das vorkompilierte Electron-Programm

Wenn Sie jemals an einer Electron-App gearbeitet haben, haben Sie wahrscheinlich das `Elektron-vorkompilierte` npm Paket gefunden. Dieses Paket ist ein unverzichtbarer Bestandteil von fast jedem Electron-Projekt. Wenn installiert, erkennt es Ihr Betriebssystem und lädt eine vorkompilierte Binärdatei herunter, die für die Arbeit mit der Architektur Ihres Systems kompiliert ist.

## Der neue Name

Der Electron-Installationsprozess war oft ein Stolperstein für neue Entwickler. Viele tapfere Leute haben versucht, ein Electron per App zu entwickeln, indem sie `npm Elektron installieren` statt `npm Elektron-vorkompiliert`installieren , nur zu entdecken (oft nach viel Verwirrung), dass es nicht die `Elektron` sie suchten.

Dies geschah, weil es ein existierendes `Elektron` Projekt auf npm gab, erstellt wurde, bevor GitHub Electron Projekt existierte. Um die Entwicklung von Electron für neue Entwickler einfacher und intuitiver zu gestalten, wir haben uns an den Eigentümer des vorhandenen `electron` npm Pakets gewandt, um zu fragen, ob er bereit sein würde, uns den Namen zu verwenden. Glücklicherweise war er ein Fan unseres Projekts und stimmte zu, uns zu helfen, den Namen neu zu verwenden.

## Vorgebautes Leben an

Seit Version 1.3.1 haben wir mit der Veröffentlichung von [`Elektron`](https://www.npmjs.com/package/electron) und `Elektron-Vorkompiliert` Paketen an npm parallel begonnen. Die beiden Pakete sind identisch. Wir haben uns entschieden, das Paket für eine Weile unter beiden Namen weiter zu veröffentlichen, um Tausenden von Entwicklern, die derzeit `electron-prebuilt` in ihren Projekten verwenden, nicht zu stören. We recommend updating your `package.json` files to use the  new `electron` dependency, but we will continue releasing new versions of `electron-prebuilt` until the end of 2016.

Das [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) Repository bleibt die kanonische Heimat des `Elektron` npm Pakets.

## Herzlichen Dank

Wir schulden einen besonderen Dank an [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), und viele andere [Mitwirkende](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) für das Erstellen und Verwalten von `Elektron-Vorgebaut`, und für ihren unermüdlichen Service an das JavaScript, Node. , und Electron-Gemeinschaften.

Und vielen Dank an [@logicalparadox](https://github.com/logicalparadox) dafür, dass wir erlaubt haben, das `Electron` Paket auf npm zu übernehmen.

## Aktualisiere deine Projekte

Wir haben mit der Community zusammengearbeitet, um populäre Pakete zu aktualisieren, die von dieser Änderung betroffen sind. Pakete wie [Elektron-Packager](https://github.com/electron-userland/electron-packager), [Elektron-Rebuild](https://github.com/electron/electron-rebuild), und [Elektron-Builder](https://github.com/electron-userland/electron-builder) wurden bereits aktualisiert, um mit dem neuen Namen zu arbeiten und gleichzeitig den alten Namen zu unterstützen.

Wenn Sie Probleme bei der Installation dieses neuen Pakets haben bitte teilen Sie uns mit, indem Sie ein Problem auf dem [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) Repository öffnen.

Bei anderen Problemen mit Electron benutzen Sie bitte die [electron/electron](https://github.com/electron/electron/issues) Repository.

