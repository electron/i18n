---
title: "Новое в Electron 2: Покупки в приложении"
author: zeke
date: '2018-04-04'
---
  
Новая линия релиза Electron 2.0 [упакована](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) с новыми функциями и исправлениями. One of the highlights from this new major version is a new [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) for Apple's [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Покупки внутри приложения включают контент или подписки, которые будут приобретены непосредственно в приложениях. Это дает разработчикам простой способ охватить [бизнес-моделью](https://developer.apple.com/app-store/freemium-business-model/), когда пользователи ничего не платят за скачивание приложения и предлагают дополнительные покупки в приложении для премиум-функций, дополнительного контента или подписки.

Новый API был добавлен участником Electron [Adrien Fery](https://github.com/AdrienFery) для включения покупок внутри приложения в [Amanote](https://amanote.com/), приложение для лекций и конференций. Amanote является бесплатным для скачивания и позволяет удалять и структурировать заметки для добавления в PDF, с функциями, такими как математическая формула, чертежи, аудио запись и многое другое.

С момента добавления поддержки покупки внутри приложения в Mac версии Amanote, Adrien отметил, что **40% увеличение продаж**!

## Начало работы

Новый [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API уже приземлился в последней бета-версии Electron:

```sh
npm i -D electron@beta
```

Документы для API можно [найти на GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), и Adrien был достаточно любезен, чтобы написать учебник о том, как использовать API. Чтобы начать добавление покупок в ваше приложение, [смотрите руководство](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

[улучшений API](https://github.com/electron/electron/pull/12464) находятся в разработке, и скоро приземлится в предстоящем бета-релизе Electron.

## Windows может быть следующему

Далее Adrien надеется открыть новый канал доходов для Amanote, добавляя поддержку покупок Microsoft Store в приложениях Electron. Будьте в курсе разработок на этом!