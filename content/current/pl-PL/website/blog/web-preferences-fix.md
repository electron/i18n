---
title: Korekta podatności na zagrożenia
author: ckerr
date: '2018-08-22'
---

Odkryto lukę w wykonaniu zdalnego kodu wpływającą na aplikacje z możliwością otwierania zagnieżdżonych okien podrzędnych w wersjach Electron (3. .0-beta.6, 2.0.7, 1.8.7 i 1.7.15). Tej podatności przypisano identyfikator CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Dotknięte platformy

Zostałeś uderzony, jeśli:

1. Umieściłeś _dowolnych_ zawartości zdalnego użytkownika, nawet w piaskownicy.
2. Akceptujesz dane wejściowe użytkownika z jakimikolwiek podatnościami XSS

_Szczegóły_

Zostałeś uderzony, jeśli jakikolwiek kod użytkownika działa wewnątrz `iframe` / może utworzyć `iframe`. Biorąc pod uwagę możliwość podatności na zagrożenia XSS, można założyć, że większość aplikacji jest podatna na tę sytuację.

Zostałeś również uderzony, jeśli otworzysz którekolwiek ze swoich okien za pomocą opcji `nativeWindowOpen: true` lub `sandbox: true`.  Mimo że ta wrażliwość wymaga również wrażliwości XSS w Twojej aplikacji, nadal należy zastosować jedno z poniższych ograniczeń, jeśli korzystasz z którejkolwiek z tych opcji.

## Łagodzenie skutków

Opublikowaliśmy nowe wersje Electrona, które zawierają poprawki dla tej podatności: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8) [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)i [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16) Wzywamy wszystkich programistów Electron do natychmiastowej aktualizacji ich aplikacji do najnowszej stabilnej wersji.

Jeśli z jakiegoś powodu nie możesz zaktualizować swojej wersji Electron, możesz chronić swoją aplikację przez zdarzenie `. reventDefault()` na platformie `new-window` dla wszystkich  `webContents`'. Jeśli nie używasz `window.open` lub żadnego okna podrzędnego, to jest to również poprawna modyfikacja dla twojej aplikacji.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Jeśli pacjent opiera się na zdolności okien dla dziecka do wykonywania okien dziecięcych, następnie trzecią strategią łagodzącą jest użycie następującego kodu w górnym oknie:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (zdarzenie, url, frameName, disposition, opcje) => {
      jeśli (!opcje). ebPreferencje) {
        opcji. ebPreferences = {}
      }
      Obiekt. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(opcje. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContent)
```

Ten kod wymusi ręcznie że okna najwyższego poziomu `webPreferences` są ręcznie stosowane do wszystkich okien podrzędnych nieskończenie głęboko.

## Inne informacje

Ta wrażliwość została znaleziona i zgłoszona odpowiedzialnie projektowi Electron przez [Matt Austin](https://twitter.com/mattaustin) z [Bezpieczeństwo kontrastowe](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Aby dowiedzieć się więcej o najlepszych praktykach, aby zachować bezpieczeństwo aplikacji Electron, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Jeśli chcesz zgłosić lukę w Electron, napisz na adres e-mail@electronjs.org.
