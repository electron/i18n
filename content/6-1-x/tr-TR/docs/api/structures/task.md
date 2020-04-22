# Görev Nesnesi

* `program` Dizi - Yürütülecek programın yolunu `process.execPath` mevcut programı açan yolu seçmelisiniz.
* `argümanlar` Dizi - Yorum satırı argümanları `program` çalıştığında açılır.
* `başlık` String - Bir JumpList'te gösterilecek metin.
* `açıklama` String - Bu görevin açıklaması.
* `simgeYolu` String - Bir simgenin içinde gösterilecek mutlak yol Jumplist, bir simge içeren rastgele kaynak dosyası olabilir. Genelikle belirtebilirsin `process.execPath` program simgesini göstermek için.
* `iconindex` Number - Simge dosyasındaki simge indexi. Bir simge dosyası iki veya daha fazla simgeden oluşuyorsa, simgeyi tanımlamak için bu değeri ayarlayın. Eğer bir simge dosyası tek bir simgeden oluşuyorsa bu değer 0'dır.
* `workingDirectory` String (optional) - The working directory. Default is empty.
