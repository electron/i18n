---
title: Что нового в Electron
author: джлорд
date: '2015-10-15'
---

В последнее время были некоторые интересные обновления и беседы на Electron, вот круглу.

---

## Источник

Electron теперь обновлён с Chrome 45 по состоянию на `v0.32.0`. Другие обновления включают...

### Лучшая документация

![новая документация](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Мы изменили структуру и стандартизировали документацию, с тем чтобы она лучше выглядела и лучше читала. Существуют также переводы документации, внесенные общинами, такие, как японский и корейский.

Связанные запросы на слияние: [электрон/электрон#2028](https://github.com/electron/electron/pull/2028), [электрон/электрон#2533](https://github.com/electron/electron/pull/2533), [электрон/электрон#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Начиная с `v0.33.0` корабли Electron с Node.js 4.1.0.

Соответствующий запрос на слияние: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### узловый прегип

Модули, основанные на `node-pre-gyp` , теперь могут быть скомпилированы с Electron при сборке из исходного кода.

Связанный Pull request: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Поддержка ARM

Electron теперь предоставляет сборки для Linux на ARMv7. Он работает на популярных платформах, таких как Chromebook и Raspberry Pi 2.

Связанные вопросы: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Безрамное окно в стиле Yosemite

![бесоконное окно](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Патч от [@jaanus](https://github.com/jaanus) был объединен, как и другие встроенные приложения OS X, позволяет создавать ненужные окна с системными светофорами на OS X Yosemite и более поздней версии.

Соответствующий запрос на слияние: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Поддержка печати Google Summer of Code

После Google Summer of Code мы объединили патчи на [@hokein](https://github.com/hokein) , чтобы улучшить поддержку печати, и добавьте возможность печати страницы в PDF файлы.

Связанные вопросы: [Электрон/электрон#2677](https://github.com/electron/electron/pull/2677), [электрон/электрон#1935](https://github.com/electron/electron/pull/1935), [электрон/электрон#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom обновлён до Electron `v0.30.6` под управлением Chrome 44. Идет обновление до `v0.33.0` на [atom/atom#8779](https://github.com/atom/atom/pull/8779).

## Переговоры

GitHubber [Amy Palamountain](https://github.com/ammeep) дал отличное представление о Electron в разговоре на [Nordic.js](https://nordicjs2015.confetti.events). Она также создала [-ускоритель](https://github.com/ammeep/electron-accelerator) библиотеку.

#### Создание собственных приложений с Electron от Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Бен Огл](https://github.com/benogle), также командой Atom , дал доклад Electron на [YAPC Asia](http://yapcasia.org/2015/):

#### Создание настольных приложений с помощью веб-технологий от Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Член команды Atom [Кевин Савицки](https://github.com/kevinsawicki) , а другие провели переговоры о Electron в [Bay Are Electron User Group](http://www.meetup.com/Bay-Area-Electron-User-Group/) недавно. [видео](http://www.wagonhq.com/blog/electron-meetup) были опубликованы, вот пара:

#### История Electron от Кевина Савицки

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Заставить веб-приложение чувствовать себя народным Бен Гооу

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

