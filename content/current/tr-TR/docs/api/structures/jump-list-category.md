# AtlamaListesiÖğesi Nesnesi

* `Türü` Dize (opsiyonel) - Aşağıdakilerden biri: 
  * `tasks` - Bu kategorideki öğeler `Tasks` kategorisi içinde yer alacak. Böyle tek bir kategori olabilir ve her zaman bağlantı listesini alt kısmında görüntülenir.
  * `recent` - Uygulama tarafından en son açılan dosyaların listesini görüntüler, kategori ismi ve öğeleri Windows tarafından ayarlanır.
  * `recent` - Uygulama tarafından en son açılan dosyaların listesini görüntüler, kategori ismi ve öğeleri Windows tarafından ayarlanır. `app.addRecentDocument(path)` dolaylı olarak kullanılarak öğeler bu kategoriye eklenebilir.
  * `custom` - Görevleri ya da dosya uzantılarını görüntüler, `name` uygulama tarafından ayarlanmalıdır.
* `name` Dize (opsiyonel) - Eğer `type` `custom` ise ayarlanmalıdır, aksi takdirde göz ardı edilmelidir.
* `items` AtlamaListesiÖğesi[] (opsiyonel) - [`JumpListItem`](jump-list-item.md) dizesi nesneleri, eğer `type` `tasks` veya `custom` ise, aksi takdirde göz ardı edilmelidir.

**Not:** Eğer bir `JumpListCategory` nesnesinin ne `type` ne de `name` özelliği ayarlanmamışsa `type` ının `tasks` olduğu varsayılır. Eğer `name` özelliği ayarlanmış fakat `type` göz ardı edilmişse yine `type` ın `custom` olduğu varsayılır.