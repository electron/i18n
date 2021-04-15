---
title: Node.js Native Addons und Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Wenn Sie Probleme mit der Verwendung eines nativen Node.js Addons mit Electron 5 haben. , gibt es eine Chance, dass es aktualisiert werden muss, um mit der neuesten Version von V8 zu arbeiten.

---

## Goodbye `v8::Handle`, Hallo `v8::Local`

2014 veraltete das V8-Team `v8::Handle` zugunsten von `v8::Local` für lokale Handles. Electron 5.0 enthält eine Version von V8, die schließlich `v8::Handle` für den guten und nativen Knoten entfernt hat. s Erweiterungen, die es noch verwenden, müssen aktualisiert werden, bevor sie mit Electron 5.0 verwendet werden können.

Die erforderliche Änderung des Codes ist minimal, aber *jedes* natives Knoten-Modul, das immer noch `v8::Handle` verwendet, wird nicht mit Electron 5 kompilieren. und muss geändert werden. The good news is that Node.js v12 will also include this V8 change, so any modules that use `v8::Handle` will need to be updated *anyway* to work with the upcoming version of Node.

## Ich unterhalte ein natives Addon, wie kann ich helfen?

Wenn Sie ein natives Addon für Node.js pflegen, stellen Sie sicher, dass Sie alle Vorkommnisse von `v8::Handle` durch `v8::Local` ersetzen. Ersterer war nur ein Alias für Letztere, daher müssen keine weiteren Änderungen vorgenommen werden, um dieses spezielle Problem anzugehen.

Sie können sich auch für die [N-API](https://nodejs.org/api/n-api.html)interessieren, die separat von V8 als Teil von Knoten betreut wird. ist selbst und zielt darauf ab, native Addons vor Änderungen in der zugrundeliegenden JavaScript-Engine zu schützen. Weitere Informationen [finden Sie in der N-API-Dokumentation auf der Node.js Website](https://nodejs.org/api/n-api.html#n_api_n_api).

## Hilfe! Ich benutze ein natives Addon in meiner App und es funktioniert nicht!

Wenn Sie ein natives Addon für Knoten verbrauchen. s in Ihrer App und das native Addon wird aufgrund dieses Problems nicht erstellt Überprüfen Sie mit dem Autor des Addons ob er eine neue Version veröffentlicht hat, die das Problem behebt. Wenn nicht, ist es wahrscheinlich Ihre beste Wette, wenn Sie auf den Autor gehen (oder [eine Pull Request öffnen!](https://help.github.com/articles/about-pull-requests/)).
