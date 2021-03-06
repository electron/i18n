# JumpListCategory Object

* `type` String (optional) - One of the following:
  * `tasks` - Items in this category will be placed into the standard `Tasks` category. There can be only one such category, and it will always be displayed at the bottom of the Jump List.
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Remarque :** Si un objet `JumpListCategory` n'a ni de `type` ni de propriété `name` définie le `type` est donc supposé être `tasks`. Si la propriété `name` est définie mais que le `type` est omis, alors le `type` est assumé être `custom`.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.
