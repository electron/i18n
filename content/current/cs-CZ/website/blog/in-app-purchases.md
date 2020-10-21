---
title: "Nový v Electronu 2: Nákupy v aplikaci"
author: zeke
date: '2018-04-04'
---
  
Nová verze Electron 2.0 je [zabalena](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) s novými funkcemi a opravami. Jednou z hlavních hlavních poznámek z této nové verze je nová [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) pro Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Nákupy v aplikaci umožňují zakoupit obsah nebo předplatné přímo z aplikací. To dává vývojářům snadný způsob, jak přijmout obchodní model [freemium](https://developer.apple.com/app-store/freemium-business-model/), kde uživatelé neplatí nic za stažení aplikace a jsou nabízeny volitelné nákupy v aplikaci za prémiové funkce, další obsah nebo předplatné.

Nové API bylo přidáno do Electronu přispěvatelem komunity [Adrien Fery](https://github.com/AdrienFery) pro povolení nákupů v aplikaci [Amanote](https://amanote.com/), aplikaci Electron pro přijímání poznámek k přednáškám a konferencím. Amanote je zdarma ke stažení a umožňuje přidání jasných a strukturovaných poznámek do PDF, s funkcemi jako jsou matematické vzorce, kresby, zvuk nahrávání a další.

Od přidání nákupní podpory v aplikaci do Mac verze Amanote, Adrien zaznamenal **40% nárůst prodeje**!

## Začněme

Nové [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API již přistálo v nejnovější Electron beta:

```sh
npm i -D electron@beta
```

Dokumenty pro API mohou být [nalezeny na GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), a Adrien byly natolik laskavé, aby napsaly, jak používat API. Chcete-li začít přidávat nákupy v aplikaci, [podívejte se na tutoriál](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Další [vylepšení API](https://github.com/electron/electron/pull/12464) jsou v dílech a brzy budou přistát v nadcházející verzi Electron beta.

## Windows by mohlo být další

Dále Adrien doufá, že otevře nový příjmový kanál pro Amanote přidáním podpory pro nákupy v aplikaci Microsoft Store v Electron. Zůstaňte naladěni na vývoj!