# AtlamaListesiÖgesi Nesnesi

* `type` Dize (opsiyonel) - Aşağıdakilerden biri: 
  * `task` - Bir görev özel argümanlarla bir uygulamayı açacak.
  * `separator` - Standart `Tasks` kategorisindeki öğeleri ayırmak için kullanılabilir.
  * `file` - Dosya uzantısı uygulamayı kullanarak Atlama Listesini oluşturan dosyayı açacak, bunun uygulamayı çalıştırması için bir dosya türü işleyicisi olarak kaydedilmesi gerekir (ancak varsayılan işleyici olmasına gerek yoktur).
* `path` Dize (opsiyonel) - Açılacak dosyanın yolu, sadece `type` `file` ise ayarlanmalıdır.
* `program` Dize (opsiyonel) - Yürütülecek programın yolu, genellikle geçerli programı açan `process.execPath` belirtmelisiniz. Sadece `type` `task` ise ayarlanmalıdır.
* `args` Dize (opsiyonel) - `program` yürütüldüğü sıradaki komut satırı argümanları. Sadece `type` `task` ise ayarlanmalıdır.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.