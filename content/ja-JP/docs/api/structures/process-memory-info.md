# ProcessMemoryInfo Object

* `residentSet` Integer *Linux* と *Windows* - 現在、実際の物理 RAM に確保されているキロバイト単位のメモリ量。
* `private` Integer - JS ヒープや HTML コンテンツなど、他のプロセスと共有されないキロバイト単位のメモリ量。
* `shared` Integer - プロセス間で共有されるメモリ量で、通常、 Electron のコード自体が使っているキロバイト単位のメモリ量。