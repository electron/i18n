---
title: Narzędzia dostępności
author: jlord
date: '2016-08-23'
---

Udostępnianie aplikacji jest ważne i z radością wprowadzamy nowe funkcje [Devtron](https://electronjs.org/devtron) i [Spectron](https://electronjs.org/spectron) , które dają programistom możliwość poprawy ich aplikacji dla wszystkich.

---

Obawy dotyczące dostępności w aplikacjach Electron są podobne do tych na stronach internetowych, ponieważ są one ostatecznie HTML. Z aplikacjami Electron nie możesz jednak używać zasobów online do kontroli dostępności, ponieważ aplikacja nie ma adresu URL do wskazania audytora.

Te nowe funkcje dostarczają narzędzia do audytu aplikacji Electron. Możesz dodać audyty do testów za pomocą Spectron lub użyć ich w DevTools z Devtron. Przeczytaj podsumowanie narzędzi lub sprawdź naszą [dokumentację dostępności](https://electronjs.org/docs/tutorial/accessibility/) , aby uzyskać więcej informacji.

### Spectron

W testach Framework Spectron możesz teraz kontrolować każde okno i `<webview>` tag w aplikacji. Na przykład:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Możesz dowiedzieć się więcej o tej funkcjonalności w [Dokumentacji Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

W Devtron znajduje się nowa zakładka ułatwień dostępu, która pozwoli Ci kontrolować stronę w aplikacji, sortować i filtrować wyniki.

![devtron zrzut z ekranu](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Oba te narzędzia korzystają z biblioteki [Narzędzia programistyczne](https://github.com/GoogleChrome/accessibility-developer-tools) stworzonej przez Google dla Chrome. Możesz dowiedzieć się więcej o regułach audytu dostępności, które biblioteka używa w tym [repozytorium wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Jeśli znasz inne świetne narzędzia ułatwień dostępu dla Electron, dodaj je do [dokumentacji dostępności](https://electronjs.org/docs/tutorial/accessibility/) za pomocą pull requesta.

