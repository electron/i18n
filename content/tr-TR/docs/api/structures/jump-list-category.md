# JumpListCategory Nesnesi

* `type` Dize (opsiyonel) - Aşağıdakilerden biri: 
  * `tasks` - Bu kategorideki maddeler `Tasks` kategorisi içinde yer alacak. Böyle sadece bir kategori olabilir, ve her zaman Atlama Listesinin en altında görüntülenir.
  * `frequent` - Uygulama tarafından sıklıkla açılan dosyaların listesini görüntüler, kategori ismi ve maddeleri Windows tarafından ayarlanır.
  * `recent` - Uygulama tarafından en son açılan dosyaların listesini görüntüler, kategori ismi ve maddeleri Windows tarafından ayarlanır. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.