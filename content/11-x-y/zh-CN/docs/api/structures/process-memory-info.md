# ProcessMemoryInfo 对象

* `居民集`整数_Linux_ _和 Windows_ - 当前固定到实际物理RAM的内存量，以千字节为单位。
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.
