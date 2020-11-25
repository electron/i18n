# Versionierung von Electron

> Ein detaillierter Blick auf unsere Versionspolitik und Umsetzung.

Ab Version 2.0.0 folgt Electron [Semver](#semver). Der folgende Befehl wird die neueste stabile Version von Electronic installieren:

```sh
npm install --save-dev electron
```

Um ein bestehendes Projekt zu aktualisieren, um die neueste stabile Version zu verwenden:

```sh
npm installieren --save-dev electron@latest
```

## Version 1.x

Electron versions *< 2.0* did not conform to the [semver](https://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Obwohl es für Entwickler praktisch ist, Funktionen zu verschmelzen, schafft es Probleme für Entwickler von Client-orientierten Anwendungen. Die QA-Testzyklen der wichtigsten Apps wie Slack, Stride, Teams, Skype, VS-Code, Atom, und Desktop kann lang sein, und Stabilität ist ein höchst gewünschtes Ergebnis. Es besteht ein hohes Risiko, neue Funktionen zu übernehmen und gleichzeitig zu versuchen, Fehlerkorrekturen zu absorbieren.

Hier ein Beispiel für die 1.x-Strategie:

![1.x Versioning](../images/versioning-sketch-0.png)

Eine App, die mit `1.8.1` entwickelt wurde, kann die `1 nicht einnehmen. .3` Fehlerbehebung, ohne entweder die `1 zu absorbieren. .2` Funktion, oder durch Rückportierung der Korrektur und Wartung einer neuen Release-Zeile.

## Version 2.0 und darüber hinaus

Es gibt einige wesentliche Änderungen an unserer 1.x-Strategie, die weiter unten beschrieben werden. Jede Änderung ist dazu gedacht, die Bedürfnisse und Prioritäten von Entwicklern/Betreuern und App-Entwicklern zu befriedigen.

1. Strenge Verwendung des Sembers
2. Einführung von semver-konformen `-beta` Tags
3. Einführung von [konventionellen Commit-Nachrichten](https://conventionalcommits.org/)
4. Gut definierte Stabilisierungszweige
5. Der `Master` Zweig ist versionlos, nur Stabilisierungszweige enthalten Versionsinformationen

Wir werden im Detail erläutern, wie git branching funktioniert, wie npm tagging funktioniert, was Entwickler erwarten sollten und wie man rückportieren kann.

# semver

Ab 2.0 folgt Electron dem Semver.

Unten ist eine Tabelle mit expliziten Zuordnungen von Änderungen in ihrer zugehörigen Semberkategorie (z.B. Major, Minor, Patch).

| Größere Versionsanhebungen     | Erhöhte Versionsnummer                     | Patch-Version erhöht          |
| ------------------------------ | ------------------------------------------ | ----------------------------- |
| Electron bricht API-Änderungen | Electron nicht aufbrechende API-Änderungen | Electron Fehlerkorrekturen    |
| Node.js Hauptversion Updates   | Node.js kleinere Version Updates           | Node.js Patch Version Updates |
| Chromium-Versionsupdates       |                                            | fix-relevante Chrom-Patches   |

Beachten Sie, dass die meisten Chromium-Updates als defekt angesehen werden. Korrekturen, die rückportiert werden können, werden wahrscheinlich als Patches ausgewählt.

# Stabillisations Branches

Stabilisierungszweige sind Zweige, die parallel zum Master laufen. Sie übernehmen nur von Rosinen ausgewählte Commits, die mit Sicherheit oder Stabilität zusammenhängen. Diese Zweige werden nie wieder zum Meister zusammengeführt.

![Stabillisations Branches](../images/versioning-sketch-1.png)

Seit Electron 8 sind Stabilisierungszweige immer **Hauptversionslinien** und benannt nach der folgenden Vorlage `$MAJOR-x-y` e. . `8-x-y`.  Zuvor haben wir **kleine** Versionszeilen verwendet und sie als `$MAJOR-$MINOR-x` benannt, z.B. `2-0-x`

Wir erlauben gleichzeitige Existenz mehrerer Stabilisierungszweige und beabsichtigen, mindestens zwei jederzeit parallel zu unterstützen, gegebenenfalls Backportierung von Sicherheits-Korrekturen. ![Multiple Stability Branches](../images/versioning-sketch-2.png)

Ältere Zeilen werden von GitHub nicht unterstützt, aber andere Gruppen können die Eigentums- und Backport-Stabilität und Sicherheitskorrekturen alleine übernehmen. Wir entmutigen dies, erkennen aber an, dass es das Leben für viele Anwendungsentwickler einfacher macht.

# Beta-Versionen und Fehlerbehebungen

Entwickler möchten wissen, welche Versionen _sicher_ zu verwenden sind. Selbst scheinbar unschuldige Funktionen können Regressionen in komplexen Anwendungen einführen. Gleichzeitig Das Sperren auf eine reparierte Version ist gefährlich, da Sie Sicherheitspatches und Fehlerbehebungen ignorieren, die seit Ihrer Version herauskommen könnten. Unser Ziel ist es, folgende Standardsemberbereiche in `package.json` zuzulassen:

* Benutzen Sie `~2.0.0` um nur Stabilitäts- oder Sicherheitsreparaturen für Ihre `2.0.0` Version zuzulassen.
* Benutzen Sie `^2.0.0` um nicht zu brechen _einigermaßen stabile_ Funktionen sowie Sicherheits- und Fehlerbehebungen zuzulassen.

Wichtig an dem zweiten Punkt ist, dass Apps, die `^` verwenden, trotzdem ein angemessenes Maß an Stabilität erwarten können. Um dies zu erreichen semver erlaubt einen _-Vor-Release-Identifikator_ anzugeben, dass eine bestimmte Version noch nicht sicher ist __ oder _stable_.

Was auch immer du wählst, du musst die Version in deinem `package.json` regelmäßig bummeln, da das Abbrechen von Änderungen eine Tatsache von Chromium-Leben ist.

Der Prozess lautet wie folgt:

1. Alle neuen wichtigen und kleinen Release-Zeilen beginnen mit einer Beta-Serie, die durch Semver prerelease Tags von `Beta angezeigt wird.`, z.B. `2.0.0-beta.1`. Nach der ersten Beta müssen die nachfolgenden Beta-Releases alle folgenden Bedingungen erfüllen:
    1. Die Änderung ist rückwärts-API-kompatibel (deprecations sind erlaubt)
    2. Das Risiko für die Einhaltung unseres Zeitplans für die Stabilität muss gering sein.
2. Wenn zulässige Änderungen vorgenommen werden müssen, sobald eine Veröffentlichung Beta ist, werden sie angewendet und der Preerelease Tag ist inkrementiert, e. . `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. z.B. `2.0.0`. Nach der ersten Stable müssen alle Änderungen rückwärtskompatible Fehler oder Sicherheitsbehebungen sein.
4. Wenn zukünftige Bugfixes oder Sicherheits-Patches gemacht werden müssen, sobald eine Veröffentlichung stabil ist, sie werden angewendet und die _Patch_ Version wird erhöht e. . `2.0.1`.

Konkret bedeutet das:

1. Es ist in Ordnung, vor Woche 3 Änderungen der Nicht-Breaking-API im Beta-Zyklus zuzulassen, auch wenn diese Änderungen das Potenzial haben, moderate Nebenwirkungen zu verursachen
2. Änderungen mit Merkmalskennzeichnung zulassen die den existierenden Codepfad sonst nicht verändern, ist in den meisten Punkten des Beta-Zyklus in Ordnung. Benutzer können diese Flags explizit in ihren Apps aktivieren.
3. Die Zulassung von Funktionen jeder Art nach Woche 3 im Beta-Zyklus ist 👎 ohne sehr guten Grund.

Für jede große und kleine Beutel, sollten Sie erwarten, dass Sie so etwas wie Folgendes sehen:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Ein Beispiel für den Lebenszyklus in Bildern:

* Ein neuer Release-Zweig wird geschaffen, der die neuesten Funktionen enthält. Es wird als `2.0.0-beta.1` veröffentlicht. ![New Release Branch](../images/versioning-sketch-3.png)
* Eine Fehlerbehebung kommt in den Master, die in den Release-Zweig zurückportiert werden kann. Der Patch wird angewendet und eine neue Beta wird als `2.0.0-beta.2` veröffentlicht. ![Bugfix Backport to Beta](../images/versioning-sketch-4.png)
* Die Beta gilt als _allgemein stabil_ und wird erneut als Nicht-Beta unter `2.0.0` veröffentlicht. ![Beta to Stable](../images/versioning-sketch-5.png)
* Später wird ein Zero-Tages-Exploit aufgedeckt und ein Fix wird auf Master angewendet. Wir portieren den Fix zurück in die `2-0-x` Zeile und Release `2.0.1`. ![Security Backports](../images/versioning-sketch-6.png)

Ein paar Beispiele, wie verschiedene Semberbereiche neue Versionen aufnehmen werden:

![Semvers and Releases](../images/versioning-sketch-7.png)

# Fehlende Features: Alphas

Unsere Strategie hat einige Kompromisse, die wir für angemessen halten. Am wichtigsten ist, dass neue Funktionen im Master eine Weile dauern können, bevor sie eine stabile Release-Zeile erreichen. Wenn Sie eine neue Funktion sofort ausprobieren möchten, müssen Sie Electron selbst bauen.

In Zukunft können wir eine oder beide der folgenden Punkte einführen:

* alpha-Releases mit lockeren Stabilitätsbeschränkungen für die Betas; zum Beispiel wäre es möglich, neue Funktionen zuzulassen, während sich ein Stabilitätskanal in _Alpha befindet_

# Merkmal Flags

Feature Flags sind eine gängige Praxis in Chromium, und sind gut etabliert in der Web-Entwicklung Ökosystem. Im Kontext von Electron muss eine Merkmalflagge oder **weiche Zweige** die folgenden Eigenschaften haben:

* es ist entweder zur Laufzeit oder zur Build-Time aktiviert/deaktiviert; wir unterstützen das Konzept eines anfrage-scoped Feature Flags nicht
* es segmentiert komplett neue und alte Code-Pfade; das Umstellen des alten Codes um ein neues Feature _zu unterstützen verstößt gegen den Vertrag mit der Feature Flagge_
* Feature Flags werden irgendwann entfernt, nachdem die Funktion freigegeben wurde

# Semantische Commits

Wir bemühen uns um mehr Klarheit auf allen Ebenen des Update- und Release-Prozesses. Ab `2.0.0` benötigen wir Pull-Requests zu den [konventionellen Commits](https://conventionalcommits.org/) Spezifikationen, die wie folgt zusammengefasst werden können:

* Überträge, die zu einem Semester **major** Bump führen würden, müssen ihren Körper mit `BREAKING ÄNDERUNG:` starten.
* Commits, die zu einem Semester **kleiner** Bump führen würden, müssen mit `feat:` beginnen.
* Überträge, die zu einem Semester **Patch** führen würden, müssen mit `Fix:` beginnen.

* Wir erlauben das Zusammenbrechen von Commits, vorausgesetzt, dass die zerquetschte Nachricht sich an das obige Nachrichtenformat hält.
* Es ist akzeptabel, dass einige in einem Pull-Request ein semantisches Präfix nicht einschließen, solange der Pull-Request-Titel eine aussagekräftige semantische Nachricht enthält.

# Versioniert `Master`

* Der `Master` Zweig wird immer die nächste Hauptversion `X.0.0-nachts enthalten. DATE` in seinem `package.json`
* Release-Zweige werden nie wieder zum Master zusammengeführt
* Versionszweige _enthalten_ die richtige Version in ihrem `package.json`
* Sobald ein Release-Zweig für einen Major geschnitten ist, muss Meister auf den nächsten Major gestohlen werden.  D.h. `Master` ist immer versioniert als nächster theoretischer Release-Zweig
