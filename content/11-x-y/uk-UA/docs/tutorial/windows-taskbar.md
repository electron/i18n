# Панель завдань Windows

Electron має API для налаштування значка додатка на панелі задач Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## Список JumpList

Windows дозволяє програмам визначати контекстне меню, яке буде показано, коли користувачі клацніть правою кнопкою миші на панелі завдань. Це контекстне меню називається `JumpList`. Ви вказуєте настроювані дії в `Завданнях` категорії JumpList, як цитовані з MSDN:

> Додатки визначають завдання і на основі функцій програми і ключа очікується, що користувач зробить з ними. Завдання повинні бути без контексту, в , що програма не повинна виконуватись для їх роботи. Ці також повинні бути статистично найбільш поширеними діями, які міг би нормальний користувач виконувати у програмі, наприклад створення повідомлення електронної пошти або відкриття календаря в програмі пошти, створити новий документ в текстовому процесорі, запустіть програму в певному режимі або запустіть одну з її підкоманд. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Не використовуйте завдання для рекламних елементів, таких як оновлення або спеціальні пропозиції.
> 
> Настійно рекомендується зробити список завдань статичним. Він повинен залишатись і незалежно від стану або статусу програми. Незважаючи на те, що можливо змінювати список динамічно, ви повинні вважати, що це може заплутати користувача, який не очікує від цієї частини списку призначення до зміни.

__Завдання Internet Explorer:__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

На відміну від панелі завдань в macOS, яке є справжнім меню, користувацькі завдання в Windows працюють як ярлики додатків на кшталт того, що користувач натискає на завдання, програму буде виконана з вказаними аргументами.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    додаток: процес. xecPath,
    аргументи: '--new-window',
    iconPath: процес. xecPath,
    iconIndex: 0,
    title: 'Новий Window',
    опис: 'Create new window'
  }
])
```

Щоб очистити список завдань, викличте `app.setUserTasks` з пустим масивом:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Користувацькі завдання все ще будуть показані навіть після закриття програми, таким чином значок і шлях до завдання повинен існувати, поки ваш додаток не буде видалено.


## Thumbnail Toolbars

На Windows ви можете додати мініатюрну панель інструментів за допомогою зазначених кнопок в панелі завдань розташування вікна додатка. Він надає користувачам доступ до певної команди вікна без відновлення чи активації вікна.

З MSDN, це ілюстровано:

> Ця панель інструментів є звичним стандартною лінією керування. Він має максимум сім кнопок. ID кожної кнопки, зображення, підказки та стану встановлюються в структурі, яка потім передається на панель завдань. Додаток може показати, увімкнути, вимкнути або приховати кнопки з мініатюр панелі інструментів, як це необхідно поточного стану.
> 
> Наприклад, Windows Media Player може запропонувати стандартні транспортні засоби такі як гра, пауза, приглушення та зупинка.

__Панель мініатюр програвача Windows:__

![гравець](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

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

Для очищення кнопки мініатюр панелі інструментів, просто зателефонуйте `BrowserWindow.setThumbartons` з пустим масивом:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Накладання іконок на панелі завдань

На Windows кнопка задач може використовувати невелике накладання для відображення програми статусу, цитовану з MSDN:

> Накладки іконок служать контекстним повідомленням про статус, і призначені для заперечення необхідності окремого значка статусу сповіщення для зв'язку з цією інформацією користувача. Наприклад, новий статус пошти в Microsoft Outlook, в даний час відображається в області сповіщень Тепер можна вказати через перекриття на кнопці з панелі завдань. Знову ж таки, ви маєте вирішити під час вашого циклу розробки який метод найкраще підходить для вашої програми. Накладення значків призначених для забезпечення важливого, давнього статусу або сповіщень, таких як мережевий статус, статус месенджеру або нова пошта. Користувач не повинен бути представлений постійно змінюючи накладання чи анімацію.

__Накладання на кнопку панелі завдань:__

![Накладання на кнопку панелі завдань](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Опис для оверлеї')
```


## Прошити фрейм

На Windows ви можете виділити кнопку панелі завдань, щоб привернути увагу користувача. Це схоже на те, щоб скинути піктограму док-станції на macOS. З орієнтації MSDN на документацію:

> Зазвичай вікно прошито для інформування користувача, якому вікно вимагає уваги, але що на ньому зараз немає фокусу клавіатури.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Не забудьте викликати `flashFrame` метод `false` , щоб вимкнути Flash. В вищезгаданий приклад його називають коли вікно потрапляє у фокус, але ви можете використати тайм-аут або іншу подію, щоб вимкнути її.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
