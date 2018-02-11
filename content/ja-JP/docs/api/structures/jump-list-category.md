# JumpListCategory オブジェクト

* `type` String (任意) - 次のいずれか: 
  * `tasks` - このカテゴリのアイテムは、標準の `Tasks` カテゴリに配置されます。 このようなカテゴリが1つだけあると、ジャンプリストの下部に常に表示されます。
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (任意) - `type` が `custom` の場合は必ず設定し、それ以外は省略すべきです。
* `items` JumpListItem[] (任意) - `type` が `tasks` もしくは `custom` の場合は [`JumpListItem`](jump-list-item.md) のオブジェクトの配列、それ以外は省略すべきです。

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.