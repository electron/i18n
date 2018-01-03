# MemoryInfo Object

* `pid` Tam sayı -İşlemcinin işlemci kimliği.
* `workingSetSize` Tam sayı - Şu anda gerçek fiziksel RAM'e tutturulmuş bellek miktarı.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
* `privateBytes` Tam sayı - Diğer işlemler tarafından paylaşılmayan bellek miktarı, Js heap veya HTML içeriği gibi.
* `sharedBytes` Tamsayı - İşlemler arasında paylaşılan bellek miktarı, genel olarak Elektron kodunun kendisi tarafından tüketilen bellek

Note that all statistics are reported in Kilobytes.