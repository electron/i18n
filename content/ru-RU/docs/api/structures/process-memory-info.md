# Объект ProcessMemoryInfo

* `residentSet` Integer *Linux* *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - объем памяти, разделяемый между процессами, обычно потребляемый самим кодом Electron, в килобайтах.