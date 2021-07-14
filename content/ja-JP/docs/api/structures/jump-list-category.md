# JumpListCategory Object

* `type` String (optional) - One of the following:
  * `tasks` - Items in this category will be placed into the standard `Tasks` category. There can be only one such category, and it will always be displayed at the bottom of the Jump List.
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**注:** `JumpListCategory` オブジェクトに `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティは設定されている一方で `type` プロパティが省略された場合、`type` は `custom` と見做されます。

**注:** ジャンプリストのアイテムの `description` プロパティは最大長は 260 文字です。 この制限を超えると、アイテムはジャンプリストに追加されず、表示されません。
