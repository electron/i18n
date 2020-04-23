# Objet JumpListCategory

* `type` String (optional) - One of the following:
  * `tasks` - Les éléments de cette catégorie seront placée la catégorie standard `Tasks`. Il ne peut y avoir qu'une seule catégorie de ce type, et elle sera toujours affichée en bas de la liste de raccourcis.
  * `frequent` - Affiche une liste de fichiers ouverts fréquemment par l'application, le nom de la catégorie et ses éléments sont définies par Windows.
  * `recent` - Affiche une liste de fichiers ouverts récemment par l'application, le nom de la catégorie et ses éléments sont définies par Windows. Des éléments peuvent être ajoutés à cette catégorie indirectement à l'aide de `app.addRecentDocument(path)`.
  * `custom` - Affiche des tâches ou des liens de fichier, le `name` doit être définie par l'application.
* `name` String (facultatif) - Doit être définie si le `type` est `custom`, sinon il doit être omis.
* `items` JumpListItem[] (facultatif) - Tableau d'objets [`JumpListItem`](jump-list-item.md) si le `type` est `tasks` ou `custom`, sinon il doit être omis.

**Remarque :** Si un objet `JumpListCategory` n'a ni de `type` ni de propriété `name` de défini, alors le `type` est assumé être `tasks`. Si la propriété `name` est définie mais que le `type` est omis, alors le `type` est assumé être `custom`.
