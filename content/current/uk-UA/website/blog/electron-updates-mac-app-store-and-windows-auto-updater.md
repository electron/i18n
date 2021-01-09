---
title: Mac App Store та Windows Auto Updater Electron
author: молодший
date: '2015-11-05'
---

Нещодавно Electron додав дві захоплюючі функції: Mac App Store сумісної збірки та вбудоване автоматичне оновлення Windows.

---

## Підтримка Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Станом на `v0.34.0` кожен реліз Electron включає збірку, сумісну з Mac App Store. Раніше додаток, побудований на Electron не буде відповідати вимогам Apple для Mac App Store. Більшість цих вимог пов'язані з використанням приватного API. Для того, щоб видалити пісочницю Electron таким чином, він відповідає вимогам двох модулів, які необхідно видалити:

- `crash-репортер`
- `автоматичне оновлення`

Крім того, дещо змінилось залежно від виявлення змін DNS, функцій захоплення відео та доступності функції. Ви можете прочитати більше про зміни і [відправити ваш додаток до Mac App store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) в документації. Розподіл можна знайти на [Electron releases page](https://github.com/electron/electron/releases), Префіксується за частотою ``.

Споріднені запити на споживання: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Автоматично оновлювати Windows

У Electron `v0.34.1` модуль `автоматичного оновлення` був поліпшений для роботи з [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Це означає, що Electron корабельне оформлення легких шляхів автоматичного оновлення вашого додатку на ОС X та Windows. Ви можете прочитати більше про [налаштування вашого додатку для автоматичного оновлення на Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) у документації.

Споріднений запит на злиття: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

