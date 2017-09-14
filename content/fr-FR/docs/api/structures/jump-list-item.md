# Objet JumpListItem

* `type` String (facultatif) - Une des valeurs suivantes : 
  * `task` - Une tâche va lancer une application avec des arguments spécifiques.
  * `separator` - Peut être utilisé pour séparer des éléments dans une catégorie `Tasks` standard.
  * `file` - Un lien de fichier ouvre un fichier en utilisant l'application qui a créé la liste de raccourcis, pour ce faire, l'application doit être enregistrée comme une application pouvant ouvrir ce type de fichier (bien qu'il n'a pas a être l'application par défaut pour ce type de fichier).
* `path` String (facultatif) - Chemin d'accès du fichier à ouvrir, doit être définit si le `type` est `file`.
* `program` String (facultatif) - Chemin du programme à exécuter, habituellement, vous devez spécifier `process.execPath` qui ouvre le programme en cours. Doit être défini uniquement si le `type` est `task`.
* `args` String (facultatif) - Les arguments de ligne de commande lors de l'exécution du `program`. Doit être défini uniquement si le `type` est `task`.
* `title` String (facultatif) - Le texte à afficher pour l'élément dans la liste de raccourcis. Doit être défini uniquement si le `type` est `task`.
* `description` String (facultatif) - Description de la tâche (affichée dans une info-bulle). Doit être défini uniquement si le `type` est `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.