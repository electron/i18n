# JumpListCategory オブジェクト

* `type` String (任意) - 以下のいずれか: 
  * `tasks` - このカテゴリの項目は、標準の `Tasks` カテゴリに配置されます。 このようなカテゴリが1つだけあると、ジャンプリストの下部に常に表示されます。
  * `frequent` - アプリによってよく開くファイルの一覧が表示されます。カテゴリの名前と項目はWindowsによって設定されます。
  * `recent` - アプリによって最近開いたファイルの一覧が表示されます。カテゴリの名前と項目はWindowsによって設定されます。 間接的に `app.addRecentDocument(path)` を使うことで、項目がこのカテゴリに追加されることがあります。
  * `custom` - タスクやファイルのリンクを表示します。`name` は必ずアプリによって設定されなければなりません。
* `name` String (任意) - `type` が `custom` の場合は必ず設定し、それ以外は省略しなければなりません。
* `items` JumpListItem[] (任意) - `type` が `tasks` もしくは `custom` の場合は [`JumpListItem`](jump-list-item.md) オブジェクトの配列を、それ以外は省略しなければなりません。

**注:** `JumpListCategory` オブジェクトが `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティが設定されているが、`type` プロパティが省略された場合、`type` は `custom` と見做されます。