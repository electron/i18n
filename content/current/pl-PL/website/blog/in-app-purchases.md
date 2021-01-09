---
title: "Nowe w Electron 2: Zakupy w aplikacji"
author: zeke
date: '2018-04-04'
---
  
Nowa linia wydania Electron 2.0 jest [zapakowana](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) z nowymi funkcjami i poprawkami. Jednym z najważniejszych elementów tej nowej wersji jest nowy [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) dla Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Zakupy w aplikacji umożliwiają zakup treści lub subskrypcji bezpośrednio w aplikacjach. Daje to programistom łatwy sposób na uwzględnienie [modelu biznesowego freemium](https://developer.apple.com/app-store/freemium-business-model/), w którym użytkownicy nie płacą za pobranie aplikacji i są oferowani opcjonalne zakupy w aplikacji za funkcje premium, dodatkowe treści lub subskrypcje.

Nowe API zostało dodane do Electron przez społeczność [Adrien Fery](https://github.com/AdrienFery) , aby włączyć zakupy w aplikacji w [Amanote](https://amanote.com/), aplikacja Electron do wykładów i konferencji. Amanote jest darmowy do pobrania i pozwala na dodawanie do PDF notatek o strukturze z funkcjami takimi jak wzory matematyczne, rysunki, nagrywanie audio i wiele więcej.

Od dodania wsparcia zakupu w aplikacji do wersji Mac Amanote, Adrien odnotował **40% wzrost sprzedaży**!

## Rozpoczęcie

Nowy [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API już wylądował w najnowszej Electron beta:

```sh
npm i -D electron@beta
```

Dokumentacja dla API może być [znaleziona na GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), i Adrien był wystarczająco miły, aby napisać samouczek na temat korzystania z API. Aby rozpocząć dodawanie zakupów w aplikacji do aplikacji, [zobacz samouczek](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Więcej [ulepszeń w API](https://github.com/electron/electron/pull/12464) jest w pracy i wkrótce będzie w nadchodzącym wydaniu Electrona.

## Windows Może być następny

Następnie, Adrien ma nadzieję na otwarcie nowego kanału przychodów dla Amanote poprzez dodanie wsparcia dla zakupów w aplikacji Microsoft Store w Electron. Bądź czujny na rozwoju w tym zakresie!