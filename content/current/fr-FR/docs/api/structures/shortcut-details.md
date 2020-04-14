# Objet ShortcutDetails

* `target` String - La cible à lancer depuis ce raccourci.
* `cwd` String (facultatif) - Le répertoire de travail. Vide par défaut.
* `args` String (facultatif) - Les arguments à appliquer à `target` lors du lancement de ce raccourci. Vide par défaut.
* `description` String (facultatif) - La description du raccourci. Vide par défaut.
* `icon` String (facultatif) - Le chemin d'accès à l'icône, peut être une DLL ou EXE. `icon` et `iconIndex` doivent être ensemble. Vide par défaut, qui utilisera l'icône de la cible.
* `iconIndex` Number (facultatif) - L'ID de la ressource icône lorsque `icon` est une DLL ou EXE. 0 par défaut.
* `appUserModelId` String (facultatif) - L'Application User Model ID. Vide par défaut.