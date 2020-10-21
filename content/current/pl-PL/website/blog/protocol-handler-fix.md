---
title: Naprawa podatności na zagrożenia protokołem
author: zeke
date: '2018-01-22'
---

Odkryto lukę w wykonaniu zdalnego kodu wpływającą na aplikacje Electrona, które korzystają z obsługi niestandardowych protokołów. Ta podatność na zagrożenia została przypisana identyfikatorowi CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Dotknięte platformy

Aplikacje Electron zaprojektowane do uruchamiania na Windowsie, które rejestrują się jako domyślne obsługa protokołu, jak `mojapa://`, są podatne na zagrożenia.

Takie aplikacje mogą być zmienione niezależnie od sposobu rejestracji protokołu, np. przy użyciu natywnego kodu, rejestru Windows lub API Electrona [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows).

macOS i Linux nie są **wrażliwe** na ten problem.

## Łagodzenie skutków

Opublikowaliśmy nowe wersje Electrona, które zawierają poprawki tej podatności: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), i [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17) Zachęcamy wszystkich programistów Electron do natychmiastowej aktualizacji ich aplikacji do najnowszej stabilnej wersji .

Jeśli z jakiegoś powodu nie możesz zaktualizować swojej wersji Electron, możesz dodać `--` jako ostatni argument podczas dzwonienia [. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) , który uniemożliwia Chromium analizowanie dalszych opcji. Podwójny myślnik `--` oznacza koniec opcji polecenia, po którym akceptowane są tylko parametry pozycji.

```js
app.setAsfaultProtocolClient(protokół, process.execŚcieżka [
  '--your-switches-here',
  '--'
])
```

Zobacz [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API, aby uzyskać więcej informacji.

Aby dowiedzieć się więcej o najlepszych praktykach, aby zapewnić bezpieczeństwo aplikacji Electrona, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Jeśli chcesz zgłosić lukę w Electron, e-mail security@electronjs.org.
