---
title: "Ogłaszanie obsługi TypeScript w Electron"
author: zeke
date: '2017-06-01'
---

Pakiet `electron` npm zawiera teraz plik definicji TypeScript, który zawiera szczegółowe adnotacje całego Electron API. Te adnotacje mogą poprawić Twój rozwój Electron doświadczenia **nawet jeśli piszesz vanilla JavaScript**. Wystarczy `npm zainstalować elektron` , aby uzyskać aktualne typy Electron w Twoim projekcie.

---

TypeScript jest otwartym językiem programowania stworzonym przez Microsoft. Jest to superzestaw JavaScript, który rozszerza język poprzez dodanie wsparcia dla statycznych typów. Społeczność TypeScript szybko rozwinęła się w ostatnich latach, i TypeScript był uszeregowany wśród [najbardziej kochanych języków programistycznych](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) w najnowszej ankiecie programisty Stack.  TypeScript jest opisany jako "JavaScript który skales" i drużyny na [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), i [Microsoft](https://github.com/Microsoft/vscode) używają go do pisania skalowalnych aplikacji Electrona, które są używane przez miliony ludzi.

TypeScript obsługuje wiele nowszych funkcji językowych w JavaScript takich jak klasy , destrukturyzacja obiektów, i asynchronizacja/oczekiwanie, ale jej prawdziwym wyróżnianiem jest **adnotacje typu**. Zgłaszanie danych wejściowych i wyjściowych oczekiwanych przez program może [zmniejszyć błędy](https://slack.engineering/typescript-at-slack-a81307fa288d) przez pomagając w znalezieniu błędów w czasie kompilacji, i adnotacje mogą również służyć jako formalna deklaracja [, jak działa Twój program](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Gdy biblioteki są napisane wanilla Javascript, te typy są często niejasnie definiowane jako po zapisie dokumentacji. Funkcje mogą często akceptować więcej typów niż to, co zostało udokumentowane, lub funkcja może mieć niewidzialne ograniczenia , które nie są udokumentowane, co może prowadzić do błędów czasu pracy.

TypeScript rozwiązuje ten problem używając **plików definicji**. Plik definicji TypeScript opisuje wszystkie funkcje biblioteki i jej przewidywane typy wejściowe i wyjściowe. Gdy autorzy biblioteki łączą plik definicji TypeScript z ich opublikowaną biblioteką, konsumenci tej biblioteki mogą [przeglądać swoje API bezpośrednio wewnątrz edytora](https://code.visualstudio.com/docs/editor/intellisense) i natychmiast zacząć z niego korzystać, często bez konieczności zapoznawania się z dokumentacją biblioteki .

Wiele popularnych projektów, takich jak [Kąt](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (i teraz Electron! skompiluj swój własny plik definicji i powiązaj go z ich opublikowanym pakietem npm. Dla projektów, które nie zawierają własnego pliku definicji, jest [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), zewnętrzny ekosystem plików definicyjnych utrzymywanych przez społeczność.

## Pag-install

Począwszy od wersji 1.6.10, każde wydanie Electron zawiera własny plik definicji TypeScript. Po zainstalowaniu pakietu `electron` z npm, plik `electron.d.ts` jest automatycznie połączony z zainstalowanym pakietem .

[Najbezpieczniejszy sposób](https://electronjs.org/docs/tutorial/electron-versioning/) zainstalowania Electron używa dokładnego numeru wersji:

```sh
npm install electron --save-dev --save-exact
```

Lub jeśli używasz [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn dodaj elektron --dev --exact
```

Jeśli używałeś już definicji innych firm, takich jak `@types/electron` i `@types/node`, powinieneś usunąć je ze swojego projektu Electron, aby zapobiec kolizjom.

Plik definicji pochodzi z naszej [ustrukturyzowanej dokumentacji API](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), więc zawsze będzie spójny z [dokumentacją API Electrona](https://electronjs.org/docs/api/). Po prostu zainstaluj `electron` i zawsze otrzymasz definicje TypeScript, które są aktualne w wersji Electron, której używasz.

## Zużycie

Aby uzyskać podsumowanie jak zainstalować i używać nowych adnotacji TypeScript obejrzyj ten krótki ekran demonstracyjny: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Jeśli używasz [Visual Studio Code](https://code.visualstudio.com/), masz już wbudowane wsparcie TypeScript. Istnieją również pluginy utrzymywane przez społeczność dla [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), i [inni edytorzy](https://www.typescriptlang.org/index.html#download-links)

Gdy Twój edytor zostanie skonfigurowany do TypeScript, zaczniesz zobaczyć więcej zachowań o kontekście, takich jak autokompletne sugestie, odniesienie do metody inline, sprawdzanie argumentów i więcej.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Metoda autouzupełniania">
  <figcaption>Metoda autouzupełniania</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Metoda referencyjna">
  <figcaption>Interline method reference</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Sprawdzenie argumentów">
  <figcaption>Sprawdzanie argumentów</figcaption>
</figure>

## Pierwsze kroki z TypeScript

Jeśli jesteś nowy w TypeScript i chcesz dowiedzieć się więcej, ten [film wprowadzający z Microsoftu](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) zapewnia dobry przegląd dlaczego język został utworzony, jak to działa, jak z niego korzystać, i gdzie ma się to udać.

Na oficjalnej stronie internetowej TypeScript znajduje się również [podręcznik](https://www.typescriptlang.org/docs/handbook/basic-types.html) i [](https://www.typescriptlang.org/play/index.html) .

Ponieważ TypeScript jest superzerem JavaScript, Twój istniejący kod JavaScript jest już ważny TypeScript. Oznacza to, że możesz stopniowo przekształcić istniejący projekt JavaScript do TypeScript w nowe funkcje językowe, w razie potrzeby.

## Dziękujemy

Ten projekt nie byłby możliwy bez pomocy społeczności Electron dla opiekunów open-source. Dzięki [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak) [Forster Brendan](https://github.com/shiftkey), i wiele innych osób do naprawiania błędów, ulepszeń dokumentacji, i wskazówek technicznych.

## Wsparcie

If you encounter any issues using Electron's new TypeScript definition files, please file an issue on the [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues) repository.

Szczęśliwego TypeScripting!
