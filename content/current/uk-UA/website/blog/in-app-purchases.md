---
title: "Нове в Electron 2: Покупки в додатку"
author: zeke
date: '2018-04-04'
---
  
Новий рядок випуску Electron 2.0 [запакований](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) з новими функціями і виправленнями. Один з підсвічування від цієї нової основної версії є новою версією [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) для Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Покупки програм увімкніть вміст або передплату, щоб бути придбано безпосередньо у програмах. Це дає розробникам простий спосіб прийняти [freemium бізнес-модель](https://developer.apple.com/app-store/freemium-business-model/), де користувачі нічого не платять для завантаження додатку і пропонуються додаткові можливості за придбання преміум-функцій, додаткові матеріали або підписка.

Новий API було додано до Electron через внесок спільноти [Adrien Fery](https://github.com/AdrienFery) щоб увімкнути покупки в додатку [Amanote](https://amanote.com/)офіційний клієнт Electron для лекцій і конференцій. Аманот може вільно звантажувати, дозволяє очищати і структуровані нотатки , які буде додано до PDF, з такими функціями, як математична формула, креслення, аудіозапис та багато іншого.

Відколи додавання in-app підтримки для покупки в Mac версії Amanote, Adrien помітив **40% збільшення продажів**!

## З чого почати

Нове [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API вже приземлилося в останній бета-версії Electron:

```sh
npm -D електрон @beta
```

Документація для API може бути [знайдена на GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), і Адріан було досить доброзичливим, щоб написати навчальний посібник про те, як користуватися API. Для почати додавати покупки у додатку [перегляньте підручник](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Більше [поліпшення API](https://github.com/electron/electron/pull/12464) перебувають у роботі, і незабаром приземлиться в майбутній бета-релізі Electron.

## Windows може бути наступним

Далі Adrien сподівається відкрити новий канал прибутків для Amanote додавши підтримку для покупки в додатку Microsoft Store в Electron. Слідкуйте за нами та подіями про це!