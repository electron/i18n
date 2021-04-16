# ProcessMemoryInfo 对象

* `residentSet` Integer _Linux_ _Windows_ - 当前固定到实际物理RAM的内存量(KB)。
* `private` Integer - 其他进程未共享的内存量，以KB为单位，如JS堆或HTML内容。
* `shared` Integer - 进程之间共享的内存量，通常是Electron代码本身所消耗的内存，单位为KB。
