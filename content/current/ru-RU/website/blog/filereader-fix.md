---
title: Уязвимость Chromium FileReader
author: звук маршалло
date: '2019-03-07'
---

В Chrome была обнаружена серьезная уязвимость, которая затрагивает все программы, основанные на Chromium, включая Electron.

Эта уязвимость была назначена `CVE-2019-5786`.  Подробнее об этом можно прочитать в [блоге Chrome](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Пожалуйста, обратите внимание, что Chrome имеет сообщения об этой уязвимости, поэтому настоятельно рекомендуется обновить Electron ASAP.

---

## Сфера охвата

Это влияет на любое приложение Electron, которое может запускать сторонние или ненадежные JavaScript.

## Смягчение

Затрагиваемые приложения должны обновиться до патчей версии Electron.

Мы опубликовали новые версии Electron, которые включают исправления для этой уязвимости:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

Последняя бета-версия Electron 5 отслеживает Chromium 73 и поэтому уже исправлена:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Дополнительная информация

Эта уязвимость была обнаружена Clement Lecigne of Google Threat Analysis Group и доведена до сведения команды Chrome.  Запись в блоге Chrome находится [здесь](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Если вы хотите сообщить об уязвимости в Electron, напишите на security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
