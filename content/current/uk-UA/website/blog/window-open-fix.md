---
title: Виправлення вразливості вікна BrowserView
author: ckerr
date: '2019-02-03'
---

Знайдена кодова вразливість, що дозволяє Node бути повторно включений у дитячих вікнах.

---

Відкриття BrowserView з `пісочницею: true` або `nativeWindowOpen: true` і `nodeIntegration: false` призводить до веб-вмісту, де `вікно. ручка` можна викликати і нове дочірнє вікно матиме `nodeIntegration` включено. Ця вразливість впливає на всі підтримувані версії Electron.

## Пом'якшення

Ми опублікували нові версії Electron, які містять виправлення для цієї уразливості: [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4), та [`5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Ми радимо всім розробникам Electron оновити їх програми до останньої стабільної версії негайно.

Якщо з якихось причин ви не можете оновити вашу версію Electron, ви можете пом'якшити цю проблему, відключивши всі дочірні веб-контенти:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Додаткова інформація

Цю вразливість знайдено і повідомили відповідально до проекту Electron користувачем [PalmerAL](https://github.com/PalmerAL).

Щоб дізнатися більше про найкращі практики для збереження ваших програм Electron – перегляньте наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Якщо ви хочете повідомити про вразливість у Electron, напишіть про безпеку@electronjs.org.
