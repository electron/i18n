# Pasek zadań Windows

## Przegląd

Elektron posiada API, aby skonfigurować ikonę aplikacji na pasku zadań systemu Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Menu kontekstowe nazywa się `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Aplikacje definiują zadania na podstawie zarówno funkcji programu, jak i klucza rzeczy, które użytkownik ma z nimi zrobić. Zadania powinny być wolne od kontekstów, w że aplikacja nie musi działać, aby działać. powinny być również statystycznie najczęstszymi czynnościami, które normalny użytkownik wykonałby w aplikacji, np. skompresuj wiadomość e-mail lub otwórz kalendarz w programie pocztowym, utwórz nowy dokument w procesorze słów, uruchom aplikację w określonym trybie lub uruchom jedną z jej podpoleceń. Aplikacja nie powinna zaśmiecać menu zaawansowanymi funkcjami, których standardowi użytkownicy nie będą potrzebowali lub jednorazowe działania, takie jak rejestracja. Nie używaj zadań dla przedmiotów promocyjnych, takich jak ulepszenia lub oferty specjalne.
> 
> Zdecydowanie zaleca się, aby lista zadań była statyczna. Powinien pozostać taki sam niezależnie od stanu lub statusu aplikacji. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

![PT](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Przykłady

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Ten pasek narzędzi jest znanym standardowym paskiem narzędzi. Ma maksymalnie 7 przycisków. Identyfikator każdego przycisku, obraz, podpowiedź i stan są zdefiniowane w strukturze, która jest następnie przekazywana do paska zadań. Aplikacja może pokazać, włączone, wyłączone, lub ukryć przyciski na pasku miniatur zgodnie z wymaganiami bieżącego stanu.
> 
> Na przykład Windows Media Player może oferować standardowe funkcje przesyłania mediów , takie jak odtwarzanie, pauza, wyciszenie i zatrzymanie.

![gracz](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Przykłady

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

wygrywa. etThumbarButtons([
  {
    tooltip: 'button1',
    ikona: ścieżka. oin(__dirname, 'button1.png'),
    kliknij () { console. og('button1 kliknięty') }
  }, {
    tooltip: 'button2',
    ikona: path.join(__dirname, 'button2. ng'),
    flag: ['enabled', 'dismissonclick'],
    click () { console. og('button2 kliknięty.') }
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Nakładki ikon na pasku zadań

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Nakładki ikon służą jako kontekstowe powiadomienie o statusie, i mają na celu negowanie potrzeby posiadania osobnej ikony statusu obszaru powiadomień, aby przekazać tę informację użytkownikowi. Na przykład nowy status poczty w programie Microsoft Outlook, obecnie wyświetlany w obszarze powiadomień, można teraz zaznaczyć za pomocą nakładki na pasku zadań. Ponownie musisz zdecydować podczas cyklu rozwoju, która metoda jest najlepsza dla Twojej aplikacji. Ikony nakładki są przeznaczone do dostarczania ważnych, długotrwałych powiadomień lub powiadomień takich jak status sieci, status komunikatora lub nowa poczta. Użytkownik nie powinien być prezentowany ze stale zmieniającymi się nakładkami lub animacjami.

![Nakładka na przycisku paska zadań](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Przykład

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Zazwyczaj okno jest wgrywane, aby poinformować użytkownika, że okno wymaga uwagi, ale nie ma obecnie ostrości klawiatury.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Przykład

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.
