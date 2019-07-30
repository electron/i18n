# JumpListItem Object

* `type` String (optioneel) - Een van de volgende: 
  * `taak` - Een taak zal een app starten met specifieke argumenten.
  * `separator` - Kan worden gebruikt om items te scheiden in de standaard `Tasks` categorie.
  * `file` - Een bestandslink opent een bestand met behulp van de app die de Jump List heeft gemaakt, om dit te laten werken moet de app geregistreerd worden als een handler voor het bestandstype (hoewel het niet de standaard handler hoeft te zijn).
* `path` String (optioneel) - Pad van het te openen bestand moet alleen worden ingesteld als `type` is `bestand`.
* `programma` String (optioneel) - Pad van het uit te voeren programma, meestal moet je `process.execPath` specificeren, die het huidige programma opent. Moet alleen ingesteld zijn als `type` is `task`.
* `args` String (optioneel) - De argumenten van de command line wanneer `program` wordt uitgevoerd. Moet alleen worden ingesteld als `type` is `task`.
* `title` String (optioneel) - De tekst die getoond moet worden voor het item in de Jump List. Moet alleen worden ingesteld als `type` is `task`.
* ` description ` String (optioneel) - Beschrijving van de taak (weergegeven in een tooltip). Moet alleen worden ingesteld als `type` is `task`.
* `iconPath` String (optioneel) - Het absolute pad naar een pictogram dat getoond moet worden in een Jump List, dit kan een willekeurig bronbestand zijn dat een icoon bevat (bijv. `.ico`, `.exe`, `.dll`). Je kunt normaal gesproken `process.execPath` specificeren om het programmapictogram weer te geven.
* `iconIndex` Nummer (optioneel) - De index van het pictogram in het bronbestand. Als een bronbestand meerdere pictogrammen bevat, kan deze waarde worden gebruikt om de nulindex van het pictogram op te geven die voor deze taak moet worden weergegeven. Als een bronbestand slechts één pictogram bevat, moet deze eigenschap op nul gezet worden.
* `workingDirectory` String (optional) - The working directory. Default is empty.