# Electron Support

## Hilfe finden

Wenn Sie Sicherheitsbedenken haben, lesen Sie bitte das [Sicherheitsdokument](https://github.com/electron/electron/tree/master/SECURITY.md).

Wenn du nach Programmierhilfe suchst, für Antworten auf Fragen oder um mit anderen Entwicklern zu diskutieren, die Electron verwenden, können Sie an diesen Orten mit der Community interagieren:
- [`Elektron`](https://discuss.atom.io/c/electron) Kategorie in den Atom Foren
- `#atom-Shell` Kanal auf Freenode
- `#electron` Kanal auf [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`Elektron-ru`](https://telegram.me/electron_ru) *(Russisch)*
- [`Elektron-br`](https://electron-br.slack.com) *(Brasilianisches Portugiesisch)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Koreanisch)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japanisch)*
- [`Elektron-tr`](https://electron-tr.herokuapp.com) *(Türkisch)*
- [`Elektron-ID`](https://electron-id.slack.com) *(Indonesien)*
- [`Elektron-pl`](https://electronpl.github.io) *(Polen)*

Wenn Sie zu Electron beitragen möchten, lesen Sie das [Beitragsdokument](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Wenn Sie einen Fehler in einer [unterstützten Version](#supported-versions) von Electron gefunden haben, melden Sie ihn bitte mit dem [Issue-Tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) ist eine von der Community verwaltete Liste von nützlichen Beispiel-Apps, Werkzeugen und Ressourcen.

## Unterstützte Versionen

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

Die neueste stabile Version erhält einseitig alle Korrekturen von `Master`, und die vorhergehende Version erhält die überwiegende Mehrheit dieser Korrekturen als Zeit- und Bandbreitenanforderungen. Die älteste unterstützte Release-Zeile erhält nur Sicherheits-Korrekturen direkt.

Alle unterstützten Freigabelinien akzeptieren externe Pull-Requests zum Backport Korrekturen, die zuvor mit `Master zusammengeführt wurden`, , obwohl dies von Fall zu Fall für einige ältere unterstützte Zeilen sein kann. Alle angefochtenen Entscheidungen rund um die Version werden von der [Releases Arbeitsgruppe](https://github.com/electron/governance/tree/master/wg-releases) als Tagesordnungspunkt bei ihrer wöchentlichen Sitzung der Woche gelöst, die der Backport PR erhoben wird.

### Derzeit unterstützte Versionen
- 8.x.y
- 7.x.y
- 6.x.y

### Ende des Lebens

Wenn ein Release-Zweig das Ende seines Unterstützungszyklus erreicht, die Serie wird in NPM veraltet und ein endgültiges Ende der Support-Version gemacht. Diese Version wird eine Warnung hinzufügen, um mitzuteilen, dass eine nicht unterstützte Version von Electron verwendet wird.

Diese Schritte sollen den App-Entwicklern helfen, zu lernen, wenn ein Zweig, den sie verwenden, nicht unterstützt wird, aber ohne übermäßig aufdringlich für Endbenutzer zu sein.

Wenn eine Bewerbung außergewöhnliche Umstände hat und auf einer nicht unterstützten Serie von Electron bleiben muss Entwickler können die Warnung zum Ende der Unterstützung verstummen, indem sie die endgültige Veröffentlichung aus dem `Paket weglassen. Sohn` `devDependencies`. Zum Beispiel, da die 1-6-x Serie mit einem Ende der Unterstützung 1.6 endete. 8 Release, Entwickler könnten wählen, um ohne Warnungen in der 1-6-x-Serie zu bleiben mit `devDependency` von `"electron": 1. .0 - 1.6.17`.

## Unterstützte Plattformen

Die folgenden Plattformen werden durch Electron unterstützt:

### macOS

Nur 64Bit-Binärdateien werden für macOS bereitgestellt, und die minimale Unterstützung für macOS ist macOS 10.10 (Yosemite).

### Windows

Windows 7 und neuere Versionen werden unterstützt. Ältere Betriebssysteme werden nicht unterstützt (und funktionieren nicht zusammen mit Electron).

Sowohl `ia32` (`x86`) als auch `x64` (`amd64`) Binärdateien werden für Windows bereitgestellt. [Electron 6.0.8 und später native Unterstützung für Windows auf Arm (`arm64`) Geräten](windows-arm.md) hinzufügen. Das Ausführen von Apps, die mit früheren Versionen gepackt wurden, ist mit dem ia32-Programm möglich.

### Linux

Die vorgebauten `ia32` (`i686`) und `x64` (`amd64`) Binärdateien von Electron sind auf Ubuntu 12. 4, die `armv7l` Binärdatei ist gegen ARM v7 mit hard-float ABI und NEON für Debian Wheezy gebaut.

[Until the release of Electron 2.0][arm-breaking-change], Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Beide Binärdateien sind identisch.

Ob die vorkompilierten Dateien auf einer Distribution laufen, hängt davon ab, ob die Distribution die Bibliotheken enthält, die auf der Build-Plattform verwendet wurden. Deshalb ist nur für Ubuntu 12.04 garantiert, dass es funktioniert, aber die folgenden Plattformen wurden ebenfalls bestätigt, kompatibel mit den vorkompilierten Dateien zu sein:

* Ubuntu 12.04 und neuer
* Fedora 21
* Debian 8

[arm-breaking-change]: ../breaking-changes.md#duplicate-arm-assets
