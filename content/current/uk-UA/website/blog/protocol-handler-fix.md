---
title: Виправлення вразливості протоколу
author: zeke
date: '2018-01-22'
---

Виявлено віддалене виконання вразливості кодів, що впливають на застосунки Electron що використовують користувацькі обробники протоколу. This vulnerability has been assigned the CVE identifier [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Уражені платформи

Застосунки Electron розроблені для функціонування на Windows, які реєструють себе як обробник для протоколу, наприклад, `myapp://`, вразливі.

Такі додатки можуть впливати незважаючи на те, як працює протокол, наприклад використовуючи рідний код, реєстр Windows або Electron's [app.setAsDefaultProtocol](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS and Linux are **not vulnerable** to this issue.

## Пом'якшення

Ми опублікували нові версії Electron, які містять виправлення для цієї уразливості: [`1.8.2-beta.5`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7.12`](https://github.com/electron/electron/releases/tag/v1.7.12), та [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Ми закликаємо усіх розробників Electron оновити їх програми до останньої стабільні версії.

Якщо з якихось причин ви не можете оновити версію Electron, ви можете додати `--` як останній аргумент під час виклику [додатку. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), який не дає Chromium аналізувати подальші параметри. Подвійний даш `-` означає кінець параметрів команди, , після яких приймаються лише положення змінних значень.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Для більш детальної інформації, див. [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

Щоб дізнатися більше про найкращі практики для збереження ваших додатків Electron у див. наш [підручник безпеки](https://electronjs.org/docs/tutorial/security).

Якщо ви хочете повідомити про вразливість у Electron, напишіть security@electronjs.org.
