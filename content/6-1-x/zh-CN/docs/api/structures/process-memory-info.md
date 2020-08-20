# ProcessMemoryInfo 对象

* `居民集`整数_Linux_ _和 Windows_ - 当前固定到实际物理RAM的内存量，以千字节为单位。
* `私有` 整数- 其他进程未共享的内存量，例如JS堆或以千字节为单位的HTML内容。
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.
