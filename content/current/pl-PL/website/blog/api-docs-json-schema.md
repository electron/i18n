---
title: Dokumentacja API Electrona jako Dane Strukturalne
author: zeke
date: '2016-09-27'
---

Dziś ogłaszamy kilka ulepszeń do dokumentacji Electrona. Każde nowe wydanie zawiera teraz [plik JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) opisujący szczegółowo wszystkie publiczne API Electrona. Utworzyliśmy ten plik, aby umożliwić programistom korzystanie z dokumentacji API Electrona w ciekawy nowy sposób.

---

## Przegląd schematu

Każde API jest obiektem o właściwościach takich jak nazwa, opis, typ, itp. Klasy takie jak `BrowserWindow` i `Menu` mają dodatkowe właściwości opisujące ich metody instancji, właściwości instancji, zdarzenia itp.

Oto fragment ze schematu, który opisuje klasę `BrowserWindow`:

```js
{
  nazwa: 'BrowserWindow',
  opis: 'Tworzenie i sterowanie oknami przeglądarki. ,
  proces: {
    main: true,
    renderer: false
  },
  type: 'Klasa',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperts: [...],
  instanceEvents: [...]
}
```

A oto przykład opisu metody, w tym przypadku metoda `apis.BrowserWindow.instanceMethods.setMaximumSize`:

```js
{
  nazwa: 'setMaximumSize',
  podpis: '(width, height)',
  opis: 'Ustawia maksymalny rozmiar okna na szerokość i wysokość. ,
  parametry: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Wykorzystanie nowych danych

Aby ułatwić programistom korzystanie z tych ustrukturyzowanych danych w swoich projektach, stworzyliśmy [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), mały pakiet npm, który jest publikowany automatycznie za każdym razem, gdy pojawi się nowa wersja Electrona .

```sh
npm instaluje electron-api-docs --save
```

Dla natychmiastowego gratyfikacji, wypróbuj moduł w swoim Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Sposób gromadzenia danych

Dokumentacja API Electron jest zgodna z [Stylem kodowania Electron](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) i [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), aby można było programowo analizować jego zawartość.

[electron-docs-linter](https://github.com/electron/electron-docs-linter) jest nową zależnością rozwojową repozytorium `electron/electron`. Jest to narzędzie wiersza poleceń, które lintuje wszystkie pliki markdown i wymusza reguł styleguide. Jeśli błędy zostaną znalezione, są one na liście, a proces wydania jest zatrzymany. Jeśli dokumenty API są prawidłowe, `electron-json. plik` pi został utworzony i [został przesłany do GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) jako część wersji Electron.

## Standardowy Javascript i Standard Markdown

Wcześniej w tym roku baza kodowa Electrona została zaktualizowana w celu użycia [`standardu`](http://standardjs.com/) dla wszystkich JavaScript. README podsumowuje uzasadnienie tego wyboru:

> Przyjęcie standardowego stylu oznacza uszeregowanie znaczenia przejrzystości kodeksów i konwencji wspólnotowych na poziomie wyższym niż styl osobisty. Może to nie mieć sensu dla 100 % projektów i kultur rozwoju, jednak otwarte źródło może być wrogiem dla nowych. Ustanowienie jasnych i zautomatyzowanych oczekiwań twórców sprawia, że projekt jest zdrowszy.

Ostatnio utworzyliśmy [standardową markdown](https://github.com/zeke/standard-markdown) , aby sprawdzić, czy wszystkie snippety kodu JavaScript w naszej dokumentacji są prawidłowe i spójne ze stylem samego kodu.

Łącznie te narzędzia pomagają nam używać ciągłej integracji (CI), aby automatycznie znaleźć błędy w pull requestów. Zmniejsza to obciążenie ludzi, którzy dokonują przeglądu kodu i daje nam większą pewność co do dokładności naszej dokumentacji.

### Wysiłki społeczności

Dokumentacja Electron stale się poprawia i mamy naszą wspaniałą społeczność open-source, która może za to podziękować. Od tego pisania prawie 300 osób przyczyniło się do opracowania dokumentów.

Cieszymy się, że możemy zobaczyć, co ludzie robią z tymi nowymi, ustrukturyzowanymi danymi. Możliwe zastosowania obejmują:

- Ulepszenia do [https://electronjs.org/docs/](https://electronjs.org/docs/)
- [plik definicji TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) dla bardziej usprawnionego rozwoju Electron w projektach za pomocą TypeScript.
- Dokumentacja offline dla narzędzi takich jak [Dash.app](https://kapeli.com/dash) i [devdocs.io](http://devdocs.io/)

