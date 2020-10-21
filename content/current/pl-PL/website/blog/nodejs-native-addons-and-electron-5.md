---
title: Node.js Native Addons oraz Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Jeśli masz problemy z użyciem natywnego dodatku Node.js z Electronem 5. , jest szansa, że trzeba go zaktualizować, aby pracować z najnowszą wersją V8.

---

## Pożegnanie `v8::Handle`, Witaj `v8::Local`

W 2014 r. zespół V8 przestarzały `v8::Handle` na korzyść `v8::Lokalnie` dla lokalnych. Electron 5.0 zawiera wersję V8, która ostatecznie usunęła `v8::Handle` dla dobra i natywnego Nodu. s dodatki, które nadal używają, będą musiały zostać zaktualizowane, zanim będą mogły być użyte z Electron 5.0.

Wymagana zmiana kodu jest minimalna, ale *każdy* natywny moduł węzła, który nadal używa `v8::Handle` nie będzie mógł zbudować z Electronem 5. i będzie musiał zostać zmodyfikowany. Dobrą wiadomością jest ten węzeł. v12 będzie również obejmował tę zmianę V8, więc moduły, które używają `v8::Handle` będą musiały zostać zaktualizowane *i tak* aby pracować z nadchodzącą wersją Node.

## Trzymam natywny dodatek, jak mogę pomóc?

Jeśli utrzymujesz natywny dodatek dla Node.js, upewnij się, że wszystkie wystąpienia `v8::Handle` zostaną zastąpione `v8:Local`. Pierwszy z nich był tylko pseudonimem tego drugiego, więc nie ma potrzeby wprowadzania żadnych innych zmian w celu rozwiązania tego konkretnego problemu.

Możesz również być zainteresowany przyjrzeniem się [N-API](https://nodejs.org/api/n-api.html), który jest utrzymywany oddzielnie od V8 jako część Node. ma na celu odizolowanie natywnych dodatków od zmian w podstawowym silniku JavaScript. Więcej informacji [znajdziesz w dokumentacji N-API na stronie Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Pomoc! Używam natywnego dodatku w mojej aplikacji i to nie zadziała!

Jeśli używasz natywnego dodatku dla Node. s w aplikacji i natywny dodatek nie będzie budował z powodu tego problemu, sprawdź z autorem dodatku, aby sprawdzić, czy wydali nową wersję, która rozwiązuje problem. Jeśli nie, dotarcie do autora (lub [otwarcie Pull Request!](https://help.github.com/articles/about-pull-requests/)) jest prawdopodobnie Twoim najlepszym zakładem.
