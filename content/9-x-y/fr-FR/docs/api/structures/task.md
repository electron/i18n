# Objet Task

* `program` String - Chemin du programme à exécuter, habituellement, vous devez spécifier `process.execPath` qui ouvre le programme en cours.
* `arguments` String - Les arguments de ligne de commande lors de l'exécution du `programme`.
* `title` String - La chaîne de caractères à afficher dans une JumpList.
* `description` String - Description de cette tâche.
* `iconPath` String - Le chemin d'accès absolu de l'icône à afficher dans une JumpList, qui peut être un fichier de ressources arbitraire contenant une icône. Vous pouvez généralement spécifier `process.execPath` pour afficher l’icône du programme.
* `iconIndex` Number - L'index de l'icône dans le fichier d'icônes. Si un fichier d'icônes se compose de deux ou plusieurs icônes, définissez cette valeur pour identifier l'icône. Si un fichier d’icônes se compose d’une icône, cette valeur est 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
