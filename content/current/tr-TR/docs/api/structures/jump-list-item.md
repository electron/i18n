# AtlamaListesiÖğesi Nesnesi

* `tip` Dize (opsiyonel) - Aşağıdakilerden biri: 
  * `task` - Bir görev özel argümanlarla bir uygulamayı açacak.
  * `separator` - Standart `Tasks` kategorisindeki öğeleri ayırmak için kullanılabilir.
  * `file` - Dosya uzantısı uygulamayı kullanarak Atlama Listesini oluşturan dosyayı açacak, bunun uygulamayı çalıştırması için bir dosya türü işleyicisi olarak kaydedilmesi gerekir (ancak varsayılan işleyici olmasına gerek yoktur).
* `path` Dize (opsiyonel) - Açılacak dosyanın yolu, sadece `type` `file` ise ayarlanmalıdır.
* `program` Dize (opsiyonel) - Yürütülecek programın yolu, genellikle geçerli programı açan `process.execPath` belirtmelisiniz. Sadece `type` `task` ise ayarlanmalıdır.
* `args` Dize (opsiyonel) - `program` yürütüldüğü sıradaki komut satırı argümanları. Sadece `type` `task` ise ayarlanmalıdır.
* `title` Dize (opsiyonel) - Atlama Listesindeki öğe için gösterilecek olan metin. Sadece `type` `task` ise ayarlanmalıdır.
* `description` Dize (opsiyonel) - Görev tanımı (bir ipucunda gösterilen). Sadece `type` `task` ise ayarlanmalıdır.
* `iconPath` Dize (opsiyonel) - Bir Atlama Listesinde gösterilen bir simgenin mutlak yolu, bir simge içeren rastgele bir kaynak dosyası olabilir (örn. `.ico`, `.exe`, `.dll`). Genellikle program simgesini göstermek için `process.execPath` belirtebilirsiniz.
* `iconIndex` Sayı (opsiyonel) - Kaynak dosyadaki simgenin dizini. Eğer bir kaynak dosyası birçok simge içeriyorsa bu değer bu görev için gösterilmesi gereken simgenin sıfır-tabanlı dizinini belirtmek için kullanılabilir. Bir kaynak dosyası sadece bir simge içeriyorsa, bu özellik sıfır olarak ayarlanmalıdır.
* `workingDirectory` String (optional) - The working directory. Default is empty.