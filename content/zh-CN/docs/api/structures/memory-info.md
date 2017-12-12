# MemoryInfo 对象

* `pid` Integer - 进程ID
* `workingSetSize` Integer- 当前占用的物理内存RAM总量
* `peakWorkingSetSize` Integer - 已被占用的物理内存最大值。在macOS上这个值始终为0
* `privateBytes` Integer - 独占内存，不被其他进程（如JavaScript堆或者HTML内容）共享的内存数量
* `sharedBytes` Integer -共享内存，在进程之间共享的内存数量，通常是Electron自身消耗的内存量

备注：所有数据值以KB为单位