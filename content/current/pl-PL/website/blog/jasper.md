---
title: 'Projekt Tygodnia: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

W tym tygodniu skonsultowaliśmy się z twórcą [Jasper](https://jasperapp.io), opartym na Electronie narzędziem do zarządzania powiadomieniami GitHub.

---

## Witaj! Kim jesteś?

Jestem [Ryo Maruyama](https://github.com/h13i32maru), programistą oprogramowania w Japonii. Tworzę [Jasper](https://jasperapp.io) i [ESDoc](https://esdoc.org).

## Co to jest Jasper?

[Jasper](https://jasperapp.io) jest elastycznym i potężnym czytnikiem problemów dla GitHub. Wspiera kwestie i żądania ściągnięcia na github.com i GitHub Enterprise.

[![Zrzut ekranu Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Dlaczego to zrobiłeś?

Gdy ludzie używają GitHub w swojej pracy lub aktywności OSS, zwykle otrzymują wiele powiadomień codziennie. Jako sposób subskrybowania powiadomień, GitHub dostarcza wiadomości e-mail i [powiadomień internetowych](https://github.com/notifications). Wykorzystywałem je przez kilka lat, ale stanęłem w obliczu następujących problemów:

- Łatwo zapomnieć o sprawach, o których wspomniałem, skomentowałem, lub obserwuję.
- Umieściłem kilka spraw w zakątku, aby sprawdzić je później, ale czasami o nich zapomniałem.
- Aby nie zapomnieć o problemach, pozostawiam wiele kart otwartych w mojej przeglądarce.
- Trudno sprawdzić wszystkie problemy, które są ze mną powiązane.
- Trudno uchwycić całą działalność mojej drużyny.

Spędzałem dużo czasu i energii, próbując zapobiec tym problemom, więc zdecydowałem się uczynić czytnik problemów dla GitHub w celu skutecznego rozwiązywania tych problemów i zaczęłam rozwijać Jasper.

## Kto używa Jasper?

Jasper jest używany przez deweloperów, projektantów i menedżerów w kilku firmach, które używają GitHub. Oczywiście niektórzy deweloperzy OSS również go używają. I jest również używany przez niektórych ludzi na GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Jak działa Jasper?

Po skonfigurowaniu programu Jasper pojawi się następujący ekran. Od lewej do prawej, możesz zobaczyć "listę strumień", "listę zgłoszeń" i "organ problemu".

[![Ekran początkowy Jaspera](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Ten "strumień" jest podstawową cechą Jaspera. Na przykład, jeśli chcesz zobaczyć "problemy, które są przypisane do @zeke w repozytorium electron/electron", tworzysz następujący strumień:

```
repo:electron/electron przypisane:zeke is:issue
```

[![Ekran początkowy Jaspera 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Po utworzeniu strumienia i oczekiwaniu na kilka sekund, możesz zobaczyć problemy, które spełniają warunki.

[![Ekran początkowy Jaspera 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Co możemy zrobić z strumieniami?

Wprowadzę jakiego rodzaju warunki mogą być stosowane w strumieniu.

### Użytkownicy i zespoły

| Strumień                                          | Problemy                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `wzmianki:koty wzmianki:dog`                      | Problemy, które wspominają użytkownika `kot` lub `psa`                        |
| `autor:kot autor:dog`                             | Problemy stworzone przez użytkownika `kota` lub `psa`                         |
| `przypisywane:cat assignee:dog`                   | Problemy przypisane do `kota` lub `psa`                                       |
| `komentarz:kot komentarz:dog`                     | Problemy, które `kot` lub `pies` skomentował                                  |
| `dotyczą:koty wiążą się:pies`                     | Problemy, które "włączają" `kot` lub `bob`                                    |
| `drużyna:zwierzę/białe koty: zwierzę/czarny pies` | Problemy, które `zwierzę/biite-kot` lub `zwierzę/czarny pies` są wymienione w |

`obejmuje` oznacza, że `wzmianka`, `autora`, `przypisana osoba` lub `komentarz`

### Repozytoria i organizacje

| Strumień                         | Problemy                                  |
| -------------------------------- | ----------------------------------------- |
| `repo:cat/jump repo:dog/run`     | Problemy w `cat/jump` lub `dog/run`       |
| `org:electron user:cat user:dog` | Problemy w `electron`, `kocie` lub `psie` |

`org` jest taki sam jak `użytkownik`

### Atrybut

| Strumień                                                  | Problemy                                                              |
| --------------------------------------------------------- | --------------------------------------------------------------------- |
| `repo:cat/skok kamień milowy:v1.0.0 kamień milowy:v1.0.1` | Zagadnienia, które są załączone do `v1.0.0` lub `v1.0.1` w `cat/skok` |
| `repo:cat/jump label:bug label:blocker`                   | Zagadnienia, które są załączone `błąd` **i** `bloker` w `kat/skok`    |
| `elektron LUB atomshell`                                  | Problemy zawierające `electron` lub `atomshell`                       |

### Status recenzji

| Strumień                        | Problemy                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `jest:pr recenzja:wymagane`     | Zagadnienia, które są wymagane w `cat/jump`                                                 |
| `jest:pr recenzja:cat`          | Zagadnienia, o które zwrócono się do `kotów`. <br/> Ale te nie są jeszcze sprawdzane. |
| `jest:pr recenzowany przez:kot` | Zagadnienia sprawdzone przez `kota`                                                         |

<br/>

Jak mogłeś zauważyć patrząc na to, strumienie mogą korzystać z wyszukiwań GitHub. Szczegółowe informacje na temat korzystania z strumieni i zapytań wyszukiwania, zobacz następujące adresy URL.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper posiada również funkcje zarządzania nieprzeczytanymi problemami, nieprzeczytane zarządzanie komentarzami, oznaczanie gwiazdek, aktualizacja powiadomień, filtrowanie problemów z klawiaturą, skróty itp.

## Czy Jasper jest płatnym produktem? Ile to kosztuje?

Jasper wynosi 12 dolarów. Możesz jednak używać [bezpłatnej wersji próbnej](https://jasperapp.io/) przez 30 dni.

## Dlaczego zdecydowałeś się zbudować Jaspera na Electron?

Lubię następujące aspekty Electrona:

- Aplikacje można tworzyć z JavaScript/CSS/HTML.
- Aplikacje mogą być budowane dla platform Windows, Mac, Linux.
- Electron jest aktywnie rozwijany i ma dużą społeczność.

Funkcje te umożliwiają szybki i prosty rozwój aplikacji stacjonarnych. To niesamowite! Jeśli masz jakąkolwiek koncepcję produktu, należy rozważyć korzystanie z Electrona za każdym razem.

## Jakie wyzwania stoją przed Tobą podczas rozwoju programu Jasper?

Miałem trudny czas wypracowując koncepcję "strumienia". Na początku rozważałem użycie [Powiadomień API](https://developer.github.com/v3/activity/notifications/). Zauważyłem jednak, że nie popiera ona niektórych przypadków stosowania. Następnie rozważałem użycie [Problemów API](https://developer.github.com/v3/issues/) i [Pull Requests API](https://developer.github.com/v3/pulls/), oprócz API powiadomień. Ale nigdy nie stało się to tym, czego chciałem. Wtedy myśląc o różnych metodach, zdałem sobie sprawę, że odpytywanie [API wyszukiwania GitHub](https://developer.github.com/v3/search/) zapewni największą elastyczność. Doprowadzenie do tego punktu zajęło około miesiąc doświadczenia, następnie wdrożyłem prototyp Jaspera z koncepcją strumienia w ciągu dwóch dni.

Uwaga: Ankieta jest ograniczona do co najwyżej co 10 sekund. Jest to wystarczająco dopuszczalne dla ograniczenia GitHub API.

## Co dalej?

Mam plan rozwoju następujących cech:

- **Filtrowany strumień**: Strumień posiada filtrowany strumień, który filtruje problemy w strumieniu. Jest tak jak w widoku SQL.
- **Wiele kont**: będziesz mógł używać github.com i GHE
- **Popraw wydajność**: Do chwili obecnej problem w WebView to niska prędkość niż zwykła przeglądarka.

Śledź [@jasperappio](https://twitter.com/jasperappio) na Twitterze, aby uzyskać aktualizacje.

