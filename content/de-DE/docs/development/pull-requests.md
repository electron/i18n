# Pull Requests

* [Einrichtung deiner Lokalen Entwicklungsumgebung](#setting-up-your-local-environment)
  * [Schritt 1: Fork](#step-1-fork)
  * [Schritt 2: Build](#step-2-build)
  * [Schritt 3: Branch](#step-3-branch)
* [Mache die Änderungen](#making-changes)
  * [Schritt 4: Code](#step-4-code)
  * [Schritt 5: Commit](#step-5-commit)
    * [Schritt 5: Commit](#commit-message-guidelines)
  * [Schritt 6: Rebase](#step-6-rebase)
  * [Schritt 7: Teste](#step-7-test)
  * [Schritt 8: Push](#step-8-push)
  * [Schritt 9: Erstelle einen Pull Request](#step-9-opening-the-pull-request)
  * [Schritt 10: Besprechen und Aktualisieren](#step-10-discuss-and-update)
    * [Workflow für Genehmigungs- und Anforderungsänderungen](#approval-and-request-changes-workflow)
  * [Schritt 11: Landung](#step-11-landing)
  * [Kontinuierliche Integrationstests](#continuous-integration-testing)

## Einrichtung deiner Lokalen Entwicklungsumgebung

### Schritt 1: Fork

Forke das Projekt [auf GitHub](https://github.com/electron/electron) und clone deinen fork lokal.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Schritt 2: Build

Build Schritte und Abhängigkeiten unterscheiden sich leicht, abhängig von Deinem Betriebssystem. Lies hier für eine detaillierte Anleitung zum lokalen bauen von Electron Apps:

* [Aufbauend auf macOS](build-instructions-macos.md)
* [Bauen auf Linux](build-instructions-linux.md)
* [Bauen auf Windows](build-instructions-windows.md)

Nach dem lokalen bauen des Projekts bist du startklar zum machen von Änderungen!

### Schritt 3: Branch

Um Ihre Entwicklungsumgebung zu organisieren, erstellen Sie lokale Branchen, um Ihre Arbeit halten. Diese sollten direkt vom `master` Verzweigungszweig verzweigt werden.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Mache die Änderungen

### Schritt 4: Code

Die meisten Pull-Anforderungen, die für das `electron/electron` -Repository geöffnet wurden, enthalten Änderungen am C/C++-Code im Ordner `shell/` , den JavaScript-Code im Ordner `lib/` , die Dokumentation in `docs/api/` oder Tests im Ordner `spec/` .

Stellen Sie sicher, dass Sie von Zeit zu Zeit `npm run lint` für alle Codeänderungen ausführen, , um sicherzustellen, dass sie dem Codestil des Projekts entsprechen.

Weitere Informationen zu bewährten Methoden zum Ändern von Code in verschiedenen Teilen Projekts finden Sie unter [](coding-style.md) des Codierungs stils.

### Schritt 5: Commit

Es wird empfohlen, ihre Änderungen logisch innerhalb einzelner -Commits gruppiert zu halten. Viele Mitwirkende finden es einfacher, Änderungen zu überprüfen, die auf mehrere Commits aufgeteilt sind. Die Anzahl der Commits in einer Pull-Anforderung ist unbegrenzt.

```sh
$ git add my/changed/files
$ git commit
```

Beachten Sie, dass mehrere Commits oft gequetscht werden, wenn sie gelandet werden.

#### Schritt 5: Commit

Eine gute Commit-Nachricht sollte beschreiben, was sich geändert hat und warum. Das Electron-Projekt verwendet [semantische Commit-Nachrichten](https://conventionalcommits.org/) , um Freigabeprozess zu optimieren.

Bevor eine Pullanforderung zusammengeführt werden kann, muss **einen Pull-Anforderungstitel mit einem semantischen Präfix** haben.

Beispiele für Commit-Nachrichten mit semantischen Präfixen:

* `fix: Prevent_default nicht überschreiben, wenn der Standardnichtwert verhindert wurde`
* `feat: app.isPackaged()-Methode hinzufügen`
* `docs: app.isDefaultProtocolClient ist jetzt unter Linux verfügbar`

Allgemeine Präfixe:

* fix: Eine Fehlerbehebung
* feat: Eine neue Funktion
* Dokumente: Dokumentationsänderungen
* Test: Hinzufügen fehlender Tests oder Korrigieren vorhandener Tests
* Build: Änderungen, die sich auf das Buildsystem auswirken
* ci: Änderungen an unseren CI-Konfigurationsdateien und Skripten
* perf: Eine Codeänderung, die die Leistung verbessert
* Refactor: Eine Codeänderung, die weder einen Fehler behebt noch eine Funktion hinzufügt
* style: Änderungen, die die Bedeutung des Codes nicht beeinflussen (Linting)
* Anbieter: Bumping einer Abhängigkeit wie libchromiumcontent oder node

Andere Dinge, die Sie beim Schreiben einer Commit-Nachricht beachten sollten:

1. Die erste Zeile sollte:
   * enthalten eine kurze Beschreibung der Änderung (vorzugsweise 50 Zeichen oder weniger, und nicht mehr als 72 Zeichen)
   * mit Ausnahme der richtigen Substantive, Akronyme und Wörter, die sich auf Code beziehen, wie Funktions-/Variablennamen, vollständig in Kleinbuchstaben sein
2. Lassen Sie die zweite Zeile leer.
3. Umschließen Sie alle anderen Zeilen mit 72 Spalten.

#### Breaking Changes

Ein Commit, der den Text am Anfang seines optionalen Text- oder Fußzeilenabschnitts `BREAKING CHANGE:` hat, führt eine brechende API-Änderung ein (die mit der Haupt- in der semantischen Versionierung korreliert). Eine brechende Änderung kann Teil von Commits eines beliebigen Typs sein. z.B. ein `fix:`, `feat:` & `chore:` Typen wären alle gültig, zusätzlich zu jeder anderen Typ.

Weitere Informationen finden Sie in [conventionalcommits.org](https://conventionalcommits.org) .

### Schritt 6: Rebase

Sobald Sie Ihre Änderungen vorgenommen haben, ist es eine gute Idee, `git rebase` (nicht `git merge`) zu verwenden, um Ihre Arbeit mit dem Haupt-Repository zu synchronisieren.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Dadurch wird sichergestellt, dass Ihr Arbeitszweig die neuesten Änderungen von `electron/electron` Master hat.

### Schritt 7: Teste

Fehlerbehebungen und Funktionen sollten immer mit Tests kommen. Ein [Testleitfaden](testing.md) wurde bereitgestellt, um den Prozess zu vereinfachen. Ein Blick auf andere Tests, um zu sehen, wie sie strukturiert werden sollten, kann ebenfalls hilfreich sein.

Führen Sie vor dem Absenden Ihrer Änderungen in einer Pull-Anforderung immer die vollständige Testsammlung aus. So führen Sie die Tests aus:

```sh
$ npm run test
```

Stellen Sie sicher, dass der linter keine Probleme meldet und dass alle Tests erfolgreich sind. Bitte senden Sie keine Patches, die bei beiden Überprüfungen fehlschlagen.

Wenn Sie Tests aktualisieren und eine einzelne Spezifikation ausführen möchten, um sie zu überprüfen:

```sh
$ npm run test -match=menu
```

Die oben genannten würden nur Spezifikationsmodule ausführen, die `menu`, was für alle nützlich ist, die an Tests arbeiten, die andernfalls ganz am Ende Testzyklus wären.

### Schritt 8: Push

Sobald Ihre Commits bereit sind zu gehen -- mit bestandenen Tests und Fusseln -- den Prozess des Öffnens einer Pull-Anforderung beginnen, indem Sie Ihren Arbeitszweig auf GitHub an Ihre Gabel drücken.

```sh
$ git push origin my-branch
```

### Schritt 9: Erstelle einen Pull Request

In GitHub wird Ihnen beim Öffnen einer neuen Pull-Anforderung eine Vorlage angezeigt, die ausgefüllt werden soll:

```markdown
<!--
Vielen Dank für Ihre Pull-Anfrage. Bitte geben Sie oben eine Beschreibung an und überprüfen Sie
den folgenden Anforderungen.

Fehlerbehebungen und neue Funktionen sollten Tests und möglicherweise Benchmarks enthalten.

Leitfaden für die Beiträge: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Schritt 10: Besprechen und Aktualisieren

Sie erhalten wahrscheinlich Feedback oder Änderungen an Ihrer Pull-Anfrage. Dies ist ein großer Teil des Einreichungsprozesses, also lassen Sie sich nicht entmutigen! Einige Beitragszahler können sich sofort für die Pull-Anfrage anmelden. Andere haben möglicherweise detaillierte Kommentare oder Feedback. Dies ist ein notwendiger Teil des Prozesses , um zu beurteilen, ob die Änderungen richtig und notwendig sind.

Um Änderungen an einer vorhandenen Pull-Anforderung vorzunehmen, nehmen Sie die Änderungen an Ihrem lokalen -Zweig vor, fügen Sie mit diesen Änderungen einen neuen Commit hinzu, und schieben Sie diese an Ihre Forke. GitHub aktualisiert die Pull-Anforderung automatisch.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

Es gibt eine Reihe von erweiterten Mechanismen für die Verwaltung von Commits mit `git rebase` , die verwendet werden können, aber über den Rahmen dieses Handbuchs hinausgehen.

Fühlen Sie sich frei, einen Kommentar in der Pull-Anfrage an Ping-Rezensenten zu posten, wenn Sie auf eine Antwort auf etwas warten. Wenn Sie auf Wörter oder Akronyme stoßen, die unbekannt erscheinen, lesen Sie dieses [Glossar](https://sites.google.com/a/chromium.org/dev/glossary).

#### Workflow für Genehmigungs- und Anforderungsänderungen

Alle Pull-Anforderungen bedürfen der Genehmigung eines [Code-Besitzers](https://github.com/electron/electron/blob/master/.github/CODEOWNERS) des Gebiets, das Sie geändert haben, um zu landen. Wenn ein Betreuer einen Pull- Anforderung überprüft, kann er Änderungen anfordern. Diese können klein sein, z. B. das Fixieren eines Tippfehlers, oder wesentliche Änderungen mit sich bringen können. Solche Anfragen sollen hilfreich sein, aber kann manchmal als abrupt oder nicht hilfreich auftreten, vor allem, wenn sie nicht konkrete Vorschläge zu *enthalten, wie* , sie zu ändern.

Versuchen Sie, sich nicht entmutigen zu lassen. Wenn Sie der Meinung sind, dass eine Überprüfung ungerecht ist, sagen Sie dies oder suchen Sie die Eingabe eines anderen Projektbeitragenden. Oft sind solche Kommentare das Ergebnis ein Gutachter hat sich nicht genügend Zeit für die Überprüfung genommen und sind nicht schlecht gemeint. Solche Schwierigkeiten können oft mit ein wenig Geduld gelöst werden. Dennoch sollte von Gutachtern ein hilfreiches Feedback erwartet werden.

### Schritt 11: Landung

Um zu landen, muss ein Pull-Antrag von mindestens einem Electron Code Owner überprüft und genehmigt werden und CI passieren. Wenn es danach keine Einwänden anderer Mitwirkender gibt, kann die Pull-Anforderung zusammengeführt werden.

Herzlichen Glückwunsch und Dank für Ihren Beitrag!

### Kontinuierliche Integrationstests

Jede Pull-Anforderung wird auf dem Continuous Integration (CI)-System getestet, um bestätigen, dass sie auf den unterstützten Plattformen von Electron funktioniert.

Im Idealfall wird die Pull-Anforderung auf allen CI-Plattformen übergeben ("grün sein"). Dies bedeutet, dass alle Tests erfolgreich sind und es keine Fehler gibt. Es es jedoch nicht ungewöhnlich ist, dass die CI-Infrastruktur selbst an bestimmten -Plattformen scheitert oder dass so genannte "flaky"-Tests scheitern ("rot sein"). Jeder CI- Fehler muss manuell überprüft werden, um die Ursache zu ermitteln.

CI wird automatisch gestartet, wenn Sie eine Pull-Anforderung öffnen, aber nur Core-Betreuer einen CI-Lauf neu starten können. Wenn Sie der Meinung sind, dass CI eine falsch negativ gibt, bitten Sie einen Betreuer, die Tests neu zu starten.
