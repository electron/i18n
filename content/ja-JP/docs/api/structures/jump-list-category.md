# JumpListCategory オブジェクト

* `type` String (任意) - 以下のいずれか: 
  * `tasks` - このカテゴリの項目は、標準の `Tasks` カテゴリに配置されます。 このようなカテゴリが1つだけあると、ジャンプリストの下部に常に表示されます。
  * `frequent` - アプリによってよく開くファイルの一覧が表示されます。カテゴリの名前と項目はWindowsによって設定されます。
  * `recent` - アプリによって最近開いたファイルの一覧が表示されます。カテゴリの名前と項目はWindowsによって設定されます。 間接的に `app.addRecentDocument(path)` を使うことで、項目がこのカテゴリに追加されることがあります。
  * `custom` - タスクやファイルのリンクを表示します。`name` は必ずアプリによって設定されなければなりません。
* `name` String (任意) - `type` が `custom` の場合は必ず設定し、それ以外は省略すべきです。
* `items` JumpListItem[] (任意) - `type` が `tasks` もしくは `custom` の場合は [`JumpListItem`](jump-list-item.md) のオブジェクトの配列、それ以外は省略すべきです。

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.