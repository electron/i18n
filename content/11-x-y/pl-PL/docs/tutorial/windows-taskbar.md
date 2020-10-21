# Pasek zadań Windows

Elektron posiada API, aby skonfigurować ikonę aplikacji na pasku zadań systemu Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList

System Windows pozwala aplikacją na definiowanie menu kontekstowego, które pojawia się, gdy użytkownicy klikają prawym przyciskiem myszy na ikonę aplikacji w pasku zadań. Menu kontekstowe nazywa się `JumpList`. Określasz niestandardowe akcje w kategorii `Zadania` JumpList, zacytowane z MSDN:

> Aplikacje definiują zadania na podstawie zarówno funkcji programu, jak i klucza rzeczy, które użytkownik ma z nimi zrobić. Zadania powinny być wolne od kontekstów, w że aplikacja nie musi działać, aby działać. powinny być również statystycznie najczęstszymi czynnościami, które normalny użytkownik wykonałby w aplikacji, np. skompresuj wiadomość e-mail lub otwórz kalendarz w programie pocztowym, utwórz nowy dokument w procesorze słów, uruchom aplikację w określonym trybie lub uruchom jedną z jej podpoleceń. Aplikacja nie powinna zaśmiecać menu zaawansowanymi funkcjami, których standardowi użytkownicy nie będą potrzebowali lub jednorazowe działania, takie jak rejestracja. Nie używaj zadań dla przedmiotów promocyjnych, takich jak ulepszenia lub oferty specjalne.
> 
> Zdecydowanie zaleca się, aby lista zadań była statyczna. Powinien pozostać taki sam niezależnie od stanu lub statusu aplikacji. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

__Zadania Internet Explorer:__

![PT](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

W przeciwieństwie do menu doku w macOS, które jest prawdziwym menu, zadania użytkownika w systemie Windows działają , takie jak skróty aplikacji, które kiedy użytkownik kliknie na zadanie, program zostanie wykonany z określonymi argumentami.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: proces. xecŚcieżka
    : argumenty: '--new-window',
    ścieżka ikon: proces. xecPath,
    ikonIndex: 0,
    title: 'New Window',
    opis: 'Utwórz nowe okno'
  }
])
```

Aby wyczyścić listę zadań, wywołaj `app.setUserTasks` pustą tablicą:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Zadania użytkownika będą nadal wyświetlane nawet po zamknięciu aplikacji, więc ikona i ścieżka programu określone dla zadania powinny istnieć do czasu odinstalowania aplikacji .


## Thumbnail Toolbars

W systemie Windows możesz dodać miniaturę paska narzędzi z określonymi przyciskami na pasku zadań układu okna aplikacji. Zapewnia użytkownikom możliwość dostępu do polecenia konkretnego okna bez przywracania lub aktywowania okna.

Z MSDN, jest podświetlony:

> Ten pasek narzędzi jest znanym standardowym paskiem narzędzi. Ma maksymalnie 7 przycisków. Identyfikator każdego przycisku, obraz, podpowiedź i stan są zdefiniowane w strukturze, która jest następnie przekazywana do paska zadań. Aplikacja może pokazać, włączone, wyłączone, lub ukryć przyciski na pasku miniatur zgodnie z wymaganiami bieżącego stanu.
> 
> Na przykład Windows Media Player może oferować standardowe funkcje przesyłania mediów , takie jak odtwarzanie, pauza, wyciszenie i zatrzymanie.

__Pasek miniatur Windows Media Player:__

![gracz](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Aby wyczyścić miniaturki przycisków paska narzędzi, po prostu zadzwoń do `BrowserWindow.setThumbarButtons` pustą tablicą:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Nakładki ikon na pasku zadań

W systemie Windows przycisk paska zadań może użyć małej nakładki do wyświetlania statusu aplikacji , zacytowanej z MSDN:

> Nakładki ikon służą jako kontekstowe powiadomienie o statusie, i mają na celu negowanie potrzeby posiadania osobnej ikony statusu obszaru powiadomień, aby przekazać tę informację użytkownikowi. Na przykład nowy status poczty w programie Microsoft Outlook, obecnie wyświetlany w obszarze powiadomień, można teraz zaznaczyć za pomocą nakładki na pasku zadań. Ponownie musisz zdecydować podczas cyklu rozwoju, która metoda jest najlepsza dla Twojej aplikacji. Ikony nakładki są przeznaczone do dostarczania ważnych, długotrwałych powiadomień lub powiadomień takich jak status sieci, status komunikatora lub nowa poczta. Użytkownik nie powinien być prezentowany ze stale zmieniającymi się nakładkami lub animacjami.

__Nakładka na pasku zadań:__

![Nakładka na przycisku paska zadań](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## Flash Frame

W systemie Windows możesz podświetlić przycisk paska zadań, aby zwrócić uwagę użytkownika. Jest to podobne do odbijania ikony doku na macOS. Na podstawie dokumentacji referencyjnej MSDN

> Zazwyczaj okno jest wgrywane, aby poinformować użytkownika, że okno wymaga uwagi, ale nie ma obecnie ostrości klawiatury.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Nie zapomnij wywołać metody `flashFrame` z `false` aby wyłączyć flash. W powyższy przykład jest wywoływany kiedy okno wchodzi w ostrość, ale możesz użyć limitu czasu lub innego zdarzenia, aby go wyłączyć.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
