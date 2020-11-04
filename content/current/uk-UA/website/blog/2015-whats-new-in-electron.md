---
title: Що нового в Electron
author: молодший
date: '2015-10-15'
---

Там були деякі цікаві оновлення та розмови, дані з Electron нещодавно, ось округлення.

---

## Джерело

Electron тепер в актуальному стані з Chrome 45 як `v0.32.0`. До інших оновлень належать...

### Краща документація

![нові документи](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

Ми змінили структуру і стандартизували документацію так, щоб вона виглядала краще та краще читала. Існують також переклади, які сприяють громаді, як і японська та корейська мова.

Відповідні запити на отримання: [electron/electron#2028](https://github.com/electron/electron/pull/2028), [electron/electron#2533](https://github.com/electron/electron/pull/2533), [electron/electron#2557](https://github.com/electron/electron/pull/2557), [electron/electron#2709](https://github.com/electron/electron/pull/2709), [electron/electron#2725](https://github.com/electron/electron/pull/2725), [electron/electron#2698](https://github.com/electron/electron/pull/2698), [electron/electron#2649](https://github.com/electron/electron/pull/2649).

### Node.js 4.1.0

Починаючи з `v0.33.0` Electron кораблі з Node.js 4.1.0.

Споріднений запит: [electron/electron#2817](https://github.com/electron/electron/pull/2817).

### вузло-прегіп

Модулі покладаються на `node-pre-gyp` тепер можуть бути скомпільовані проти Electron під час створення з джерела.

Пов'язаний запит на злиття: [mapbox/node-pre-gyp#175](https://github.com/mapbox/node-pre-gyp/pull/175).

### Підтримка ARM

Electron забезпечує збірки для Linux на ARMv7. Він працює на таких популярних платформах, як Chromebook і Raspberry Pi 2.

Супутні проблеми: [atom/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138), [electron/electron#2094](https://github.com/electron/electron/pull/2094), [electron/electron#366](https://github.com/electron/electron/issues/366).

### Вікно в стилі Yosemite-style

![вікно без фреймворку](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

Оновлення [@jaanus](https://github.com/jaanus) було об'єднано, як і інші вбудовані ОС X, дозволяє створювати вікна без використання frameless з системним трафіком та підсвічуванням на OS X Yosemite та пізніше.

Супутниковий запит: [electron/electron#2776](https://github.com/electron/electron/pull/2776).

### Служба підтримки друку коду Google

Після Google Літо коду ми об'єднали патчі [@hokein](https://github.com/hokein) для покращення друку підтримки, і додавання можливості друкувати сторінку в PDF-файли.

Пов'язані задачі: [electron/electron#2677](https://github.com/electron/electron/pull/2677), [electron/electron#1935](https://github.com/electron/electron/pull/1935), [electron/electron#1532](https://github.com/electron/electron/pull/1532), [electron/electron#805](https://github.com/electron/electron/issues/805), [electron/electron#1669](https://github.com/electron/electron/pull/1669), [electron/electron#1835](https://github.com/electron/electron/pull/1835).

## Atom

Atom тепер оновлено до Electron `v0.30.6` під час роботи Chrome 44. Оновлення до `v0.33.0` в процесі [атомі/atom#8779](https://github.com/atom/atom/pull/8779).

## Говори

GitHubber [Amy Palamountain](https://github.com/ammeep) чудово вступив до Electron у розмові [Nordic.js](https://nordicjs2015.confetti.events). Вона також створила [електро-прискорювач](https://github.com/ammeep/electron-accelerator) бібліотеку.

#### Побудова місцевих програм з Electron мовою Amy Palomountain

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[Бен Огл](https://github.com/benogle), також у команді Atom, дали відгук Electron на [YAPC Asia](http://yapcasia.org/2015/):

#### Побудова програм із Web Technologies від Ben Ogle

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

Член команди [Kevin Sawicki](https://github.com/kevinsawicki) та інші спільно виступали з Electron на конференціїBay [, це група Electron User](http://www.meetup.com/Bay-Area-Electron-User-Group/) останнім часом. [відео](http://www.wagonhq.com/blog/electron-meetup) було розміщено, ось пара:</p> 



#### Історія Electron від Кевін Совіцького

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### Створення веб-додатку відчуває себе носієм Бен Готоу

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

