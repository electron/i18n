---
title: 'Projekt der Woche: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

This week we interviewed the creator of [Jasper][], an Electron-based tool for managing GitHub notifications.

---

## Hallo! Wer bist du?

Ich bin [Ryo Maruyama](https://github.com/h13i32maru), ein Software-Entwickler in Japan. Ich entwickle [Jasper](https://jasperapp.io) und [ESDoc](https://esdoc.org).

## Was ist Jasper?

[Jasper][] is a flexible and powerful issue reader for GitHub. Es unterstützt Probleme und Pull-Requests auf github.com und GitHub Enterprise.

[![Jasper App Screenshot](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Warum haben Sie es geschafft?

Wenn Menschen GitHub in ihren Job- oder OSS-Aktivitäten verwenden, neigen sie dazu, täglich viele Benachrichtigungen zu erhalten. Um die Benachrichtigungen zu abonnieren, bietet GitHub E-Mail und [Web-Benachrichtigungen](https://github.com/notifications). Ich habe diese für ein paar Jahre verwendet, aber ich hatte folgende Probleme:

- Es ist einfach, Probleme zu übersehen, wo ich erwähnt wurde, kommentiert, oder ich beobachte.
- Ich habe einige Probleme in die Ecke meines Kopfes gestellt, um sie später zu überprüfen, aber ich vergesse sie manchmal.
- Um Probleme nicht zu vergessen, halte ich viele Tabs in meinem Browser offen.
- Es ist schwer alle Probleme zu überprüfen, die mit mir zusammenhängen.
- Es ist schwierig, die gesamte Aktivität meines Teams zu begreifen.

Ich habe viel Zeit und Energie damit verbracht, diese Probleme zu verhindern. so entschied ich, einen Issue-Reader für GitHub zu erstellen, um diese Probleme effizient zu lösen, und begann mit der Entwicklung von Jasper.

## Wer benutzt Jasper?

Jasper wird von Entwicklern, Designern und Managern in mehreren Unternehmen verwendet, die GitHub verwenden. Natürlich verwenden auch einige OSS-Entwickler. Und es wird auch von einigen Leuten bei GitHub verwendet!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Wie funktioniert Jasper?

Sobald Jasper konfiguriert ist, erscheint der folgende Bildschirm. Von links nach rechts können Sie "Streams List", "Issue List" und "Issue Body" sehen.

[![Jasper Startbildschirm](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Dieser "Stream" ist die Kernfunktion von Jasper. Wenn Sie zum Beispiel "Issues, die @zeke im electron/electron repository zugewiesen sind", erstellen Sie den folgenden Stream:

```
repo:electron/electron assignee:zeke ist:issue
```

[![Jasper Startbildschirm 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Nach der Erstellung des Stream und der Wartezeit für ein paar Sekunden, können Sie sehen, welche Probleme die Bedingungen erfüllen.

[![Jasper Startbildschirm 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Was können wir mit Streams tun?

Ich werde einführen, welche Bedingungen für den Stream verwendet werden können.

### Benutzer und Teams

| Stream                                        | Issues                                                        |
| --------------------------------------------- | ------------------------------------------------------------- |
| `erwähnungen:Katzen: Hund`                    | Probleme mit dem Benutzer `cat` oder `Hund`                   |
| `Autor:cat Autor:dog`                         | Probleme erstellt von Benutzer `Katze` oder `Hund`            |
| `zuweisend:Katze zuweisend:Hund`              | `Katze` oder `Hund` zugewiesen                                |
| `commenter:cat commenter:dog`                 | Probleme, die `Katze` oder `Hund` kommentiert haben           |
| `involviert:cat involves:dog`                 | Probleme mit "involviert" `Katze` oder `Bob`                  |
| `team:animal/white-cat team:animal/black-dog` | Probleme mit `Tier/weiße Katze` oder `Tier/Schwarzer Hund` in |

`umfasst` bedeutet `Erwähnung`, `Autor`, `Zuweiser` oder `Kommentar`

### Repositories und Organisationen

| Stream                           | Issues                                    |
| -------------------------------- | ----------------------------------------- |
| `repo:cat/springen repo:dog/run` | Probleme in `cat/jump` oder `dog/run`     |
| `org:electron user:cat user:dog` | Probleme in `Elektron`, `cat` oder `Hund` |

`org` ist identisch mit `Benutzer`

### Attribute

| Stream                                            | Issues                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Probleme, die an `v1.0.0` oder `v1.0.1` in `cat/jump` angehängt sind |
| `repo:cat/springen Label:bug label:blocker`       | Angehängte Probleme `Fehler` **und** `Blocker` in `cat/jump`         |
| `elektron ODER atomshell`                         | Probleme, die `Elektron` oder `atomshell` beinhalten                 |

### Bewertungsstatus

| Stream                       | Issues                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `ist:pr Review:required`     | Probleme, die in `cat/springen` überprüft werden müssen                                         |
| `is:pr review-angefragt:cat` | Probleme, die von `Katze` überprüft werden. <br/> Aber diese werden noch nicht überprüft. |
| `ist:pr überprüft von:cat`   | Probleme, die von `Katze` überprüft werden                                                      |

<br/>

Wie Sie vielleicht bemerkten, können Streams die Suchabfragen von GitHub verwenden. Weitere Informationen zur Verwendung von Streams und Suchabfragen finden Sie in den folgenden URLs.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper hat auch Funktionen für ungelesene Fehlerverwaltung, ungelesene Kommentarverwaltung, Markierungsstars, Benachrichtigungsaktualisierung, Filterprobleme, Tastaturkürzel, etc.

## Ist Jasper ein bezahltes Produkt? Wie viel kostet das?

Jasper ist $12. Sie können jedoch die [kostenlose Testversion](https://jasperapp.io/) für 30 Tage verwenden.

## Warum haben Sie Jasper auf Electronic gebaut?

Ich mag die folgenden Aspekte der Elektronik:

- Apps können mit JavaScript/CSS/HTML entwickelt werden.
- Apps können für Windows, Mac und Linux-Plattformen gebaut werden.
- Electron ist aktiv entwickelt und hat eine große Gemeinschaft.

Diese Funktionen ermöglichen eine schnelle und einfache Entwicklung von Desktop-Anwendungen. Das ist großartig! Wenn Sie eine Produktidee haben, sollten Sie die Verwendung von Electron mit allen Mitteln in Betracht ziehen.

## Was sind einige Herausforderungen, denen Sie bei der Entwicklung von Jasper gegenüberstehen?

Ich hatte es schwer mit dem Stream-Konzept umzugehen. At first I considered using GitHub's [Notifications API][]. Ich habe jedoch festgestellt, dass sie bestimmte Anwendungsfälle nicht unterstützt. After that I considered using the [Issues API][] and [Pull Requests API][], in addition to the Notification API. Aber es wurde nie das, was ich wollte. Then while thinking about various methods, I realized that polling GitHub's [Search API][] would offer the most flexibility. Es dauerte etwa einen Monat der Experimente bis zu diesem Punkt dann implementierte ich einen Prototypen von Jasper mit dem Stream-Konzept in zwei Tagen.

Hinweis: The polling is limited to once every 10 seconds at most. Dies ist für die Beschränkung der GitHub API akzeptabel.

## Was kommt als Nächstes?

Ich habe einen Plan, die folgenden Funktionen zu entwickeln:

- **Ein gefilterter Stream**: Ein Stream hat einige gefilterte Streams, die Probleme im Stream filtern. Es ist wie die Ansicht von SQL.
- **Mehrere Konten**: Sie können github.com und GHE verwenden
- **Performance**verbessern: Vorerst ist das Laden eines Problems in WebView eine niedrige Geschwindigkeit als normale Browser.

Folge [@jasperappio](https://twitter.com/jasperappio) auf Twitter für Updates.

[Jasper]: https://jasperapp.io
[Notifications API]: https://developer.github.com/v3/activity/notifications/
[Pull Requests API]: https://developer.github.com/v3/pulls/
[Issues API]: https://developer.github.com/v3/issues/
[Search API]: https://developer.github.com/v3/search/

