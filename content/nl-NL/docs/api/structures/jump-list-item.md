# JumpListItem Object

* `type` String (optioneel) - Een van de volgende: 
  * `taak` - Een taak zal een app starten met specifieke argumenten.
  * `separator` - Kan worden gebruikt om items te scheiden in de standaard `Tasks` categorie.
  * `file` - Een bestandslink opent een bestand met behulp van de app die de Jump List heeft gemaakt, om dit te laten werken moet de app geregistreerd worden als een handler voor het bestandstype (hoewel het niet de standaard handler hoeft te zijn).
* `path` String (optioneel) - Pad van het te openen bestand moet alleen worden ingesteld als `type` is `bestand`.
* `programma` String (optioneel) - Pad van het uit te voeren programma, meestal moet je `process.execPath` specificeren, die het huidige programma opent. Moet alleen ingesteld zijn als `type` is `task`.
* `args` String (optioneel) - De argumenten van de command line wanneer `program` wordt uitgevoerd. Moet alleen worden ingesteld als `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.