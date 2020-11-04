---
title: Виправлення файлової читанки Chromium
author: маршаллофзвук
date: '2019-03-07'
---

Високосерйозна вразливість була виявлена в Chrome яка впливає на все програмне забезпечення на основі Chromium, включаючи Electron.

Ця вразливість призначена `CVE-2019-5786`.  Про це ви можете прочитати більше в [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Зверніть увагу, що Chrome має повідомлення про цю вразливість, що використовується в дикій природі, тож рекомендується оновити Electron ASAP.

---

## Область використання

Це впливає на будь-який застосунок Electron, який може запустити третю сторону або недовірений JavaScript.

## Пом'якшення

Вражені додатки повинні оновитися до патченої версії Electron.

Ми опублікували нові версії Electron, які включають виправлення для цієї вразливості:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Остання бета-версія Electron 5 відслідковувала Chromium 73 і, тому вже пропатчена:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Додаткова інформація

Ця вразливість була відкрита компанією Clement Lecigne Threat Analysis Group та відомою команді Chrome.  Блог Chrome знайдено [тут](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Щоб дізнатися більше про найкращі практики для збереження ваших програм Electron – перегляньте наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Якщо ви хочете повідомити про вразливість у Electron, напишіть про безпеку@electronjs.org.
