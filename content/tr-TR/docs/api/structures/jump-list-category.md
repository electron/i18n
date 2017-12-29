# JumpListCategory Nesnesi

* `type` Dize (opsiyonel) - Aşağıdakilerden biri: 
  * `tasks` - Bu kategorideki öğeler `Tasks` kategorisi içinde yer alacak. Böyle sadece bir kategori olabilir, ve her zaman Atlama Listesinin en altında görüntülenir.
  * `frequent` - Uygulama tarafından sıklıkla açılan dosyaların listesini görüntüler, kategori ismi ve öğeleri Windows tarafından ayarlanır.
  * `recent` - Uygulama tarafından en son açılan dosyaların listesini görüntüler, kategori ismi ve öğeleri Windows tarafından ayarlanır. `app.addRecentDocument(path)` dolaylı olarak kullanılarak öğeler bu kategoriye eklenebilir.
  * `custom` - Görevleri ya da dosya uzantılarını görüntüler, `name` uygulama tarafından ayarlanmalıdır.
* `name` Dize (opsiyonel) - Eğer `type` `custom` ise ayarlanmalıdır, aksi takdirde göz ardı edilmelidir.
* `items` AtlamaListesiÖğesi[] (opsiyonel) - [`JumpListItem`](jump-list-item.md) dizesi nesneleri, eğer `type` `tasks` veya `custom` ise, aksi takdirde göz ardı edilmelidir.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.