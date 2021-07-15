# JumpListCategory Object

* `type` String (optional) - One of the following:
  * `tasks` - Items in this category will be placed into the standard `Tasks` category. There can be only one such category, and it will always be displayed at the bottom of the Jump List.
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**注意：** 如果一个 `JumpListCategory` 对象既没有设置 `type` 属性，也没有设置 `name` 属性，则假设其 `type` 是 `tasks`。 如果设置了 ` name ` 属性, 但省略了 ` type ` 属性, 则假定 ` type ` 为 ` custom`。

**注意：** 跳列表项目 `description` 属性的最大长度为 260 个字符。 超过这个限制，当前项将不会被添加到跳转列表，也不会被展示。
