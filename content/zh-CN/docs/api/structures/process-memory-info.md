# ProcessMemoryInfo 对象

* `居民集`整数_Linux_ _和 Windows_ - 当前固定到实际物理RAM的内存量，以千字节为单位。
* `private` 整数 - 其他过程（如千字节中的 JS 堆或 HTML 内容）未共享的内存量。
* `shared` 整数 - 过程之间共享的内存量，通常 电子代码本身在千字节中消耗的记忆量。
