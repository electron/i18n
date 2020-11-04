---
title: Виправлення вразливості веб-перегляду
author: ckerr
date: '2018-03-21'
---

Виявлено вразливість, яка дозволяє інтегрування Node.js бути ввімкнена в деяких програмах Electron, що їх відключають. Ця вразливість призначена ідентифікатор CVE [CVE-2018-1006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Поражені додатки

Застосунок постраждає, якщо *всі* наступних вірні:

 1. Запускається на Electron 1.7, 1.8, або 2.0.0-beta
 2. Дозволяє виконання довільного віддаленого коду
 3. Відключає інтеграцію Node.js
 4. Не оголошує `webviewTag: false` у своєму webPreferences
 5. Не активує параметр `nativeWindowOption`
 6. Не перехоплювати `події нового вікна` події і вручну змінити `event.newguest` без використання тегу додаткових параметрів

Хоча це схоже на меншість застосунків Electron, ми заохочуємо оновити всі додатки як запобіжні умови.

## Пом'якшення

Ця вразливість зафіксована на сьогодні [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4), і [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) релізів.

Розробники, які не в змозі оновити версію Electron можуть пом’якшити вразливість наступним кодом:

```js
app.on('web-contents-created', (event, win) => {
  перемогти. n('new-window', (event, newURL, frameName, disposition,
                        параметри, additionalFeatures) => {
    якщо (! піки. параметри ebPreferences) = {};
    options.webPrefertions. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    параметри. ebPreferences.webviewTag = false;
    видалить options.webPrefertions. reload;
  })
})

// та *IF* ви взагалі не використовуєте WebViews,
// Ви можете також хотіти
програми. n('web-contents-created', (event, win) => {
  перемоги. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Додаткова інформація

Цю вразливість знайдено і повідомили відповідально до проекту Electron від Brendan Scarvell [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Щоб дізнатися більше про найкращі практики для збереження ваших програм Electron – перегляньте наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Щоб повідомити про вразливість у Electron, будь ласка, напишіть про безпеку@electronjs.org.

Будь ласка, приєднайтеся до нашого [списку контактів](https://groups.google.com/forum/#!forum/electronjs) , щоб отримати оновлення про релізи та рівень безпеки.

