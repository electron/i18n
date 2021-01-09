---
title: Виправлення уразливості
author: ckerr
date: '2018-08-22'
---

Віддалене виконання коду уразливість виявляється під впливом додатків з можливістю відкривати вкладені дочірні вікна на версії Electron (3. .0-beta.6, 2.0.7, 1.8.7 і 1.7.15). Ця вразливість призначена ідентифікатор CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Уражені платформи

У вас є вплив, якщо що:

1. Ви вставляєте _будь-який контент користувача_ у пісочницю
2. Ви приймаєте поле користувача з будь-якими вразливостями XSS

_Подробиці_

You are impacted if any user code runs inside an `iframe` / can create an `iframe`. Зважаючи на можливість вразливості XSS, можна припустити, що більшість додатків вразливі до цього випадку.

Ви також порушуєтесь, якщо відкриєте будь-яке вікно з `nativeWindowOpen: true` або `пісочниця: true`.  Хоча ця вразливість також вимагає уразливості XSS для існування у вашому додатку, ви повинні застосувати хоча б одне з цих пом'якшень, якщо у вас встановлений будь-який з цих параметрів.

## Пом'якшення

Ми опублікували нові версії Electron, які містять виправлення для цієї уразливості: [`3.0.0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2.0.8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), та [`1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Ми закликаємо всіх розробників Electron негайно оновити їх програми до останньої стабільної версії.

Якщо з якоїсь причини ви не можете оновити версію Electron, то ви можете захистити вашу програму шляхом укриття дзвінка `події. reventDefault()` on the `new-Window` event для всіх  `webContents`'. Якщо ви не використовуєте `window.open` чи будь-які дочірні вікна взагалі, це також є допустимим пом'якшенням для вашого застосунку.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Якщо ви покладаєтеся на можливість ваших дитячих вікон для створення онуків, потім третя стратегія пом'якшення - використовувати наступний код у вашому вікні верхнього рівня:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (event, url, frameName, disposition, options) => {
      якщо (!options. переваги) {
        варіанти. ebPreferences = {}
      }
      Об'єкт. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      якщо (необов'язково, s.webContents) {
        handle(options. ebContents)
      }
    })
  }
  ручку(topWebContents)
}

enforceInheritance(mainWindow. ембленти)
```

Цей код вручну зобов'язує вікно верхнього рівня `webPreferences` вручну застосовується до всіх дочірніх вікон безкінечно глибоко.

## Додаткова інформація

Цю вразливість знайдено і повідомили відповідно проекту Electron за допомогою [Мета Austin](https://twitter.com/mattaustin) of [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Щоб дізнатися більше про найкращі практики для збереження ваших програм Electron – перегляньте наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Якщо ви хочете повідомити про вразливість у Electron, напишіть про безпеку@electronjs.org.
