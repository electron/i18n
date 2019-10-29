# ProcessMemoryInfo オブジェクト

* `residentSet` Integer *Linux* *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - プロセス間で共有されるメモリ量で、通常、 Electron のコード自体が使っているキロバイト単位のメモリ量。