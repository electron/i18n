# Objet JumpListItem

* `type` String (facultatif) - Une des valeurs suivantes : 
  * `task` - Une tâche va lancer une application avec des arguments spécifiques.
  * `separator` - Peut être utilisé pour séparer des éléments dans une catégorie `Tasks` standard.
  * `file` - Un lien de fichier ouvre un fichier en utilisant l'application qui a créé la liste de raccourcis, pour ce faire, l'application doit être enregistrée comme une application pouvant ouvrir ce type de fichier (bien qu'il n'a pas a être l'application par défaut pour ce type de fichier).
* `path` String (facultatif) - Chemin d'accès du fichier à ouvrir, doit être défini si le `type` est `file`.
* `program` String (facultatif) - Chemin du programme à exécuter, habituellement, vous devez spécifier `process.execPath` qui ouvre le programme en cours. Doit être défini uniquement si le `type` est `task`.
* `args` String (facultatif) - Les arguments de ligne de commande lors de l'exécution du `program`. Doit être défini uniquement si le `type` est `task`.
* `title` String (facultatif) - Le texte à afficher pour l'élément dans la liste de raccourcis. Doit être défini uniquement si le `type` est `task`.
* `description` String (facultatif) - Description de la tâche (affichée dans une info-bulle). Doit être défini uniquement si le `type` est `task`.
* `iconPath` String (facultatif) - Le chemin d'accès absolu d'une icône à afficher dans une liste de raccourcis, qui peut être une ressource arbitraire d'un fichier de ressource contenant une icône. (`.ico`, `.exe`, `.dll`). Vous pouvez généralement spécifier `process.execPath` pour afficher l’icône du programme.
* `iconIndex` Number (facultatif) - L'index de l'icône dans le fichier de ressource. Si un fichier de ressource contient plusieurs icône, cette valeur peut être utilisée pour spécifier l'index de l'icône devant être affichée pour cette tâche. Si un fichier de ressource ne contient qu'une seule icône, alors cette propriété doit être définie à zéro.
* `workingDirectory` String (optionnel) - Le répertoire de travail. Vide par défaut.