# Görev Nesnesi

* `program` Dizi - Yürütülecek programın yolunu `process.execPath` mevcut programı açan yolu seçmelisiniz.
* `argümanlar` Dizi - Yorum satırı argümanları `program` çalıştığında açılır.
* `başlık` String - Bir JumpList'te gösterilecek metin.
* `açıklama` String - Bu görevin açıklaması.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconindex` Number - Simge dosyasındaki simge indexi. Bir simge dosyası iki veya daha fazla simgeden oluşuyorsa, simgeyi tanımlamak için bu değeri ayarlayın. Eğer bir simge dosyası tek bir simgeden oluşuyorsa bu değer 0'dır.