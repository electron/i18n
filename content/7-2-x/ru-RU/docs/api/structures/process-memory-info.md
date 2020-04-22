# Объект ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - объем памяти, не разделяемый с другими процессами, такими как куча JS или содержимое HTML, в килобайтах.
* `shared` Integer - объем памяти, разделяемый между процессами, обычно потребляемый самим кодом Electron, в килобайтах.
