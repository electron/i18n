# Aktualizowanie aplikacji

Istnieje kilka sposobów, aby zaktualizować aplikację Electron. Ten najprostszy i oficjalnie wspierany jest korzystając z wbudowanej struktury [Squirrel](https://github.com/Squirrel) oraz modułu [autoUpdater](../api/auto-updater.md) Electron'a.

## Używanie `update.electronjs.org`

Zespół Electron utrzymuje [update.electronjs.org](https://github.com/electron/update.electronjs.org), darmową i otwarto-źródłową usługę, której aplikacje Electron mogą używać do samodzielnej aktualizacji. Usługa jest zaprojektowana dla aplikacji Electrona, które spełniają następujące kryteria:

- Aplikacja działa na macOS lub Windows
- Aplikacja ma publiczne repozytorium GitHub
- Kompilacje są publikowane w wersjach GitHub
- Kompilacje są podpisane kodem

Najprostszym sposobem na korzystanie z tej usługi jest zainstalowanie [update-electron-app](https://github.com/electron/update-electron-app), modułu Node.js wstępnie skonfigurowanego do użytku z update.electronjs.org.

Zainstaluj moduł:

```sh
npm install update-electron-app
```

Wywołaj aktualizatora z głównego pliku procesowego aplikacji:

```js
require('update-electron-app')()
```

Domyślnie ten moduł będzie sprawdzał dostępność aktualizacji przy starcie aplikacji, a następnie co dziesięć minut. Gdy zostanie znaleziona aktualizacja, zostanie automatycznie pobrana w tle. Po zakończeniu pobierania, wyświetlane jest okno dialogowe pozwalające użytkownikowi na ponowne uruchomienie aplikacji.

Jeśli potrzebujesz dostosować konfigurację, możesz [przekazać opcje `update-electron-app`](https://github.com/electron/update-electron-app) lub [użyć usługi aktualizacji bezpośrednio](https://github.com/electron/update.electronjs.org).

## Wdrażanie aktualizacji serwera

Jeśli tworzysz prywatną aplikację Electrona lub jeśli nie publikujesz wydań do GitHub Releases, może być konieczne uruchomienie własnego serwera aktualizacji.

W zależności od potrzeb można wybrać z jednego z tych:

- [Hazel](https://github.com/zeit/hazel) - Aktualizuj serwer dla prywatnych lub otwartych aplikacji, które można wdrożyć za darmo na [Teraz](https://zeit.co/now). Wyciąga on z [GitHub Releases](https://help.github.com/articles/creating-releases/) i zwiększa moc CDN GitHuba.
- [Nuts](https://github.com/GitbookIO/nuts) – używa również [wersji GitHub](https://help.github.com/articles/creating-releases/), ale pamiętaj o aktualizacjach aplikacji na dysku i obsługuje prywatne repozytoria.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – zapewnia kokpit menedżerski do obsługi wydań i nie wymaga wydania na GitHubie.
- [Nucleus](https://github.com/atlassian/nucleus) – kompletny serwer aktualizacji aplikacji Electron obsługiwany przez Atlassian. Obsługuje wiele aplikacji i kanałów; używa statycznego sklepu plików , aby zminimalizować koszty serwera.

## Wdrażanie aktualizacji do twojej aplikacji

Po wdrożeniu swojego serwera aktualizacji, kontynuuj importowanie wymaganych modułów w kodzie. Poniższy kod może się różnić dla różnych serwerów oprogramowania, ale działa tak jak opisano podczas używania [Hazel](https://github.com/zeit/hazel).

**Ważne:** Upewnij się, że poniższy kod zostanie wykonany tylko w spakowanej aplikacji, a nie w fazie rozwoju. Możesz użyć [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) aby sprawdzić środowisko.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Następnie skonstruuj adres URL serwera aktualizacji i powiedz [autoUpdater](../api/auto-updater.md) o nim:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Jako ostatni krok, sprawdź aktualizacje. Poniższy przykład będzie sprawdzać co minutę:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Gdy Twoja aplikacja jest [zapakowana](../tutorial/application-distribution.md), otrzyma aktualizację dla każdej nowej [wersji GitHub](https://help.github.com/articles/creating-releases/) , którą opublikowałeś .

## Stosowanie aktualizacji

Teraz, gdy skonfigurowałeś podstawowy mechanizm aktualizacji dla swojej aplikacji, musisz upewnić się, że użytkownik otrzyma powiadomienie, gdy pojawi się aktualizacja. Ten można osiągnąć za pomocą API autoUpdatera [zdarzeń](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Nowa wersja została pobrana. Uruchom ponownie aplikację, aby zastosować aktualizacje.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response == 0) autoUpdater.quitAndInstall()
  })
})
```

Upewnij się, że błędy są [obsługiwane](../api/auto-updater.md#event-error). Oto przykład logowania do `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('Wystąpił problem podczas aktualizowania aplikacji')
  console.error(message)
})
```

## Ręczna obsługa aktualizacji

Ponieważ żądania od Auto Update nie są pod twoim bezpośrednim nadzorem, możesz znaleźć sytuacje, które są trudne do obsługi (np. jeśli serwer aktualizacji jest za uwierzytelnianiem). Pole `url` obsługuje pliki, co oznacza, że z pewnym wysiłkiem można pominąć aspekt komunikacji serwera. [Oto przykład tego, jak to może działać](https://github.com/electron/electron/issues/5020#issuecomment-477636990).
