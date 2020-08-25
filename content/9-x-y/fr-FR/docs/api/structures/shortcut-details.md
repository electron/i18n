# Objet ShortcutDetails

* `target` String - La cible à lancer depuis ce raccourci.
* `cwd` String (facultatif) - Le répertoire de travail. Vide par défaut.
* `args` String (facultatif) - Les arguments à appliquer à `target` au lancement à partir de ce raccourci. Vide par défaut.
* `description` String (facultatif) - La description du raccourci. Par défaut est vide.
* `icon` String (facultatif) - Le chemin vers l'icône, peut être un DLL ou EXE. `icon` et `iconIndex` doivent être initiés ensemble. La valeur par défaut est vide, qui utilise l' icône de la cible.
* `iconIndex` Number (facultatif) - L'ID de la ressource icône lorsque `icon` est un DLL ou EXE. Par défaut, 0.
* `appUserModelId` String (facultatif) - Le User Model ID de l'application. Par défaut est vide.
