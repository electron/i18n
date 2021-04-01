# Probleme in Der Elektron

* [Wie man zu Problemen beiträgt](#how-to-contribute-to-issues)
* [Bitte um allgemeine Hilfe](#asking-for-general-help)
* [Einreichen eines Fehlerberichts](#submitting-a-bug-report)
* [Triaging a Bug Report](#triaging-a-bug-report)
* [Auflösen eines Fehlerberichts](#resolving-a-bug-report)

## Wie man zu Problemen beiträgt

Für jedes Thema gibt es grundsätzlich drei Möglichkeiten, wie eine Person beitragen kann:

1. Indem Sie das Thema zur Diskussion stellen: Wenn Sie glauben, dass Sie einen neuen Fehler in Electron gefunden haben, sollten Sie es melden, indem Sie ein neues Problem in dem [`electron/electron` Issue Tracker](https://github.com/electron/electron/issues)erstellen.
2. Indem Sie helfen, das Problem zu wiederholen: Sie können dies entweder tun, indem Sie unterstützende Details (ein reproduzierbarer Testfall, der einen Fehler zeigt) oder indem Sie , Vorschläge zur Lösung des Problems bereitstellen.
3. Indem Sie helfen, das Problem zu lösen: Dies kann durch den Nachweis , dass das Problem kein Fehler ist oder behoben wird, getan werden; aber häufiger, indem sie eine Pull-Anfrage öffnen, die die Quelle in `electron/electron` in einer konkreten und überprüfbaren Weise ändert.

## Bitte um allgemeine Hilfe

["Finding Support"-](../tutorial/support.md#finding-support) verfügt über eine Liste von Ressourcen, um Programmierhilfe zu erhalten, Sicherheitsprobleme zu melden, beitragen und vieles mehr. Bitte verwenden Sie den Problem-Tracker nur für Bugs!

## Einreichen eines Fehlerberichts

So senden Sie einen Fehlerbericht:

Beim Öffnen eines neuen Problems im [`electron/electron` Issue Tracker](https://github.com/electron/electron/issues/new/choose)wird Benutzern eine Vorlage angezeigt, die ausgefüllt werden soll.

Wenn Sie glauben, dass Sie einen Fehler in Electron gefunden haben, füllen Sie bitte die Vorlage nach besten Kräften aus.

Die beiden wichtigsten Informationen, die für die Auswertung des Berichts erforderlich sind, sind eine Beschreibung des Fehlers und einen einfachen Testfall, um ihn neu zu erstellen. Es ist einfacher, einen Fehler zu beheben, wenn er reproduziert werden kann.

Weitere Informationen finden Sie unter [Erstellen eines Beispiels für minimal, vollständig und überprüfbar](https://stackoverflow.com/help/mcve).

## Triaging a Bug Report

Es ist üblich, dass offene Fragen Diskussionen beinhalten. Einige Mitwirkende haben möglicherweise unterschiedliche Meinungen, einschließlich, ob das Verhalten ein Fehler oder ein Feature ist. Diese Diskussion ist Teil des Prozesses und sollte konzentriert, hilfreich, und professionell gehalten werden.

Knappe Antworten, die weder zusätzlichen Kontext noch unterstützende Details sind nicht hilfreich oder professionell. Für viele sind solche Reaktionen ärgerlich und unfreundlich.

Die Beitragenden werden ermutigt, Probleme gemeinsam zu lösen und einem anderen dabei zu helfen, Fortschritte zu erzielen. Wenn Sie auf ein Problem stoßen, das Sie für ungültig halten, oder , das falsche Informationen enthält, erklären Sie *, warum* Sie sich mit zusätzlichen unterstützenden Kontext so fühlen, und seien Sie bereit, davon überzeugt zu sein, dass Sie sich irren können. Auf diese Weise können wir oft schneller zum richtigen Ergebnis gelangen.

## Auflösen eines Fehlerberichts

Die meisten Probleme werden durch Öffnen einer Pull-Anforderung behoben. Der Prozess zum Öffnen und Überprüfen einer Pull-Anforderung ähnelt dem des Öffnens und Austriierens von Problemen, aber enthält einen erforderlichen Überprüfungs- und Genehmigungsworkflow, der sicherstellt, dass die vorgeschlagenen Änderungen der den minimalen Qualitäts- und Funktionsrichtlinien des -Electron-Projekts entsprechen.
