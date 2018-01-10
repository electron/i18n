# Bellek Bilgi Nesnesi

* `pid` Tam sayı -İşlemcinin işlemci kimliği.
* `workingSetSize` Tam sayı - Şu anda gerçek fiziksel RAM'e tutturulmuş bellek miktarı.
* `peakWorkingSetSize` Tamsayı - Gerçek fiziksel RAM'e sabitlenmiş maksimum bellek miktarı.
* `privateBytes` Tam sayı - Diğer işlemler tarafından paylaşılmayan bellek miktarı, Js heap veya HTML içeriği gibi.
* `sharedBytes` Tamsayı - İşlemler arasında paylaşılan bellek miktarı, genel olarak Elektron kodunun kendisi tarafından tüketilen bellek

Tüm istatistikleri kilobayt cinsinden raporlanır dikkat edin.