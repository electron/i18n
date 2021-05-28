# Electron Support

## Hilfe finden

Wenn Sie Sicherheitsbedenken haben, lesen Sie bitte das [Sicherheitsdokument](https://github.com/electron/electron/tree/master/SECURITY.md).

Wenn du nach Programmierhilfe suchst, für Antworten auf Fragen oder um mit anderen Entwicklern zu diskutieren, die Electron verwenden, können Sie an diesen Orten mit der Community interagieren:

* [`Electron's Discord`](https://discord.com/invite/electron) has channels for:
  * Getting help
  * Ecosystem apps like [Electron Forge](https://github.com/electron-userland/electron-forge) and [Electron Fiddle](https://github.com/electron/fiddle)
  * Sharing ideas with other Electron app developers
  * And more!
* [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
* `#electron` Kanal auf [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
* [`electron-ru`](https://telegram.me/electron_ru) *(Russian)*
* [`electron-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Korean)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japanese)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
* [`electron-pl`](https://electronpl.github.io) *(Poland)*

Wenn Sie zu Electron beitragen möchten, lesen Sie das [Beitragsdokument](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Wenn Sie einen Fehler in einer [unterstützten Version](#supported-versions) von Electron gefunden haben, melden Sie ihn bitte mit dem [Issue-Tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) ist eine von der Community verwaltete Liste von nützlichen Beispiel-Apps, Werkzeugen und Ressourcen.

## Unterstützte Versionen

The latest three *stable* major versions are supported by the Electron team. Wenn zum Beispiel die neueste Version 6.1.x ist, werden sowohl die 5.0.x als auch als auch die 4.2.x Serie unterstützt.  Wir unterstützen nur die neueste kleinere Version für jede stabile Release-Serie.  Dies bedeutet, dass im Falle einer Sicherheitsbehebung 6.1. wird die Korrektur erhalten, aber wir werden keine neue Version von 6.0.x veröffentlichen.

Die neueste stabile Version erhält einseitig alle Korrekturen von `Master`, und die vorhergehende Version erhält die überwiegende Mehrheit dieser Korrekturen als Zeit- und Bandbreitenanforderungen. Die älteste unterstützte Release-Zeile erhält nur Sicherheits-Korrekturen direkt.

Alle unterstützten Freigabelinien akzeptieren externe Pull-Requests zum Backport Korrekturen, die zuvor mit `Master zusammengeführt wurden`, , obwohl dies von Fall zu Fall für einige ältere unterstützte Zeilen sein kann. Alle angefochtenen Entscheidungen rund um die Version werden von der [Releases Arbeitsgruppe](https://github.com/electron/governance/tree/master/wg-releases) als Tagesordnungspunkt bei ihrer wöchentlichen Sitzung der Woche gelöst, die der Backport PR erhoben wird.

Wenn eine API in einer Weise geändert oder entfernt wird, die bestehende Funktionalität kaputt macht die vorherige Funktionalität wird für mindestens zwei Hauptversionen unterstützt, wenn möglich ist, bevor sie entfernt werden. Zum Beispiel, wenn eine Funktion drei Argumente benötigt: und diese Zahl ist in Hauptversion 10 auf zwei reduziert die Version mit drei Argumenten würde weiter funktionieren, bis mindestens die Hauptversion 12 funktioniert. Vorher den Mindestwert für zwei Versionen werden wir versuchen, die Rückwärtskompatibilität über zwei Versionen hinaus zu unterstützen, bis die Betreuer das Gefühl haben, dass die Wartungslast zu hoch ist, um dies weiterhin tun zu können.

### Derzeit unterstützte Versionen

* 13.x.y
* 12.x.y
* 11.x.y

### Ende des Lebens

Wenn ein Release-Zweig das Ende seines Unterstützungszyklus erreicht, die Serie wird in NPM veraltet und ein endgültiges Ende der Support-Version gemacht. Diese Version wird eine Warnung hinzufügen, um mitzuteilen, dass eine nicht unterstützte Version von Electron verwendet wird.

Diese Schritte sollen den App-Entwicklern helfen, zu lernen, wenn ein Zweig, den sie verwenden, nicht unterstützt wird, aber ohne übermäßig aufdringlich für Endbenutzer zu sein.

Wenn eine Bewerbung außergewöhnliche Umstände hat und auf einer nicht unterstützten Serie von Electron bleiben muss Entwickler können die Warnung zum Ende der Unterstützung verstummen, indem sie die endgültige Veröffentlichung aus dem `Paket weglassen. Sohn` `devDependencies`. Zum Beispiel, da die 1-6-x Serie mit einem Ende der Unterstützung 1.6 endete. 8 Release, Entwickler könnten wählen, um ohne Warnungen in der 1-6-x-Serie zu bleiben mit `devDependency` von `"electron": 1. .0 - 1.6.17`.

## Unterstützte Plattformen

Die folgenden Plattformen werden durch Electron unterstützt:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.11 (El Capitan).

Native support for Apple Silicon (`arm64`) devices was added in Electron 11.0.0.

### Windows

Windows 7 und neuere Versionen werden unterstützt. Ältere Betriebssysteme werden nicht unterstützt (und funktionieren nicht zusammen mit Electron).

Sowohl `ia32` (`x86`) als auch `x64` (`amd64`) Binärdateien werden für Windows bereitgestellt. [Native support for Windows on Arm (`arm64`) devices was added in Electron 6.0.8.](windows-arm.md). Das Ausführen von Apps, die mit früheren Versionen gepackt wurden, ist mit dem ia32-Programm möglich.

### Linux

The prebuilt binaries of Electron are built on Ubuntu 18.04.

Ob die vorkompilierten Dateien auf einer Distribution laufen, hängt davon ab, ob die Distribution die Bibliotheken enthält, die auf der Build-Plattform verwendet wurden. Deshalb ist nur für Ubuntu 18.04 garantiert, dass es funktioniert, aber die folgenden Plattformen wurden ebenfalls bestätigt, kompatibel mit den vorkompilierten Dateien zu sein:

* Ubuntu 14.04 und neuer
* Fedora 24 and newer
* Debian 8 and newer
