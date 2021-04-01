---
title: Исправление уязвимости SQLite
author: ckerr
date: '2018-12-18'
---

Обнаружена уязвимость удаленного выполнения кода, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," затрагивающая программное обеспечение на основе SQLite или Chromium, включая все версии Electron.

---

## Сфера охвата

Воздействие на приложения Electron с использованием Web SQL.


## Смягчение

Затрагиваемые приложения должны перестать использовать Web SQL или обновиться до обновленной версии Electron.

Мы опубликовали новые версии Electron, которые включают исправления для этой уязвимости:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

Сообщения об этом в дикой природе отсутствуют; однако в отношении затрагиваемых приложений настоятельно рекомендуется смягчить.

## Дополнительная информация

Эта уязвимость была обнаружена командой Tencent Blade, которые опубликовали [сообщение в блоге, в котором обсуждается уязвимость](https://blade.tencent.com/magellan/index_en.html).

Чтобы узнать больше о лучших методах обеспечения безопасности приложений Electron, смотрите [наш учебник по безопасности](https://electronjs.org/docs/tutorial/security).

Если вы хотите сообщить об уязвимости в Electron, напишите на security@electronjs.org.
