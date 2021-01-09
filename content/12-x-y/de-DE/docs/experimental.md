# Experimentelle APIs

Einige der Electron-APIs sind mit `_Experimental_` in der Dokumentation markiert. Dieses Schlagwort gibt an, dass die API möglicherweise nicht als stabil angesehen wird und die API häufiger entfernt oder verändert werden kann als andere APIs mit weniger Warnung.

## Bedingungen für eine API, die als experimentell markiert werden soll

Jeder kann eine API als experimentell in einem FeaturePR markieren Unstimmigkeiten über die experimentelle Natur eines Feature können in der API WG diskutiert werden, wenn diese nicht im PR gelöst werden können.

## Prozess zum Entfernen des experimentellen Tags

Sobald eine API stabil war und in mindestens zwei wichtigen stabilen Release-Zeilen kann nominiert werden, um seinen experimentellen Tag entfernen zu lassen.  Diese Diskussion sollte bei einem API-WG-Meeting stattfinden.  Dinge, die bei der Diskussion / Nominierung berücksichtigt werden sollen:

* Die obige Bedingung "zwei wichtige Stabel-Freigabe-Zeilen" muss erfüllt sein
* Während dieser Zeit sollten keine größeren Fehler / Probleme durch die Übernahme dieser Funktion verursacht worden sein
* Die API ist stabil genug und wurde von Chromium-Upgrades nicht stark beeinträchtigt
* Benutzt jemand die API?
* Erfüllt die API die ursprünglich vorgeschlagenen Usenecasen, weist sie Lücken auf?
