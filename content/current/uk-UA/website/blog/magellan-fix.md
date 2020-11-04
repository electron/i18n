---
title: Виправлення вразливості SQLite
author: ckerr
date: '2018-12-18'
---

Уразливість віддаленого виконання коду,[Magellan](https://blade.tencent.com/magellan/index_en.html)", при використанні програми на основі SQLite або Chromium, з усіма версіями Electron.

---

## Область використання

Застосунки Electron, що використовують Web SQL, впливають на них.


## Пом'якшення

Вражені програми повинні припинити використовувати Web SQL або оновити до пропатченої версії Electron.

Ми опублікували нові версії Electron, які включають виправлення для цієї вразливості:
  * [4,0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-бета.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Однак у дикій природі немає жодного повідомлення про це; постраждалих додатків закликають пом'якшити.

## Додаткова інформація

Це виявлене командою Tencent Blade, яка опублікувала [пост в блозі, який обговорює вразливість](https://blade.tencent.com/magellan/index_en.html).

Щоб дізнатися більше про найкращі практики для збереження ваших програм Electron – перегляньте наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Якщо ви хочете повідомити про вразливість у Electron, напишіть про безпеку@electronjs.org.
