# ProcessMemoryInfo オブジェクト

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - JS ヒープや HTML コンテンツなど、他のプロセスと共有されないキロバイト単位のメモリ量。
* `shared` Integer - プロセス間で共有されるメモリ量で、通常、 Electron のコード自体が使っているキロバイト単位のメモリ量。
