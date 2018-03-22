# MemoryInfo オブジェクト

* `pid` Integer - プロセスのプロセス ID。
* `workingSetSize` Integer - 現在、実際の物理 RAM に確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理 RAM に確保されたことのある最大メモリ量。macOS ではこの値は常に0になります。
* `privateBytes` Integer - JS ヒープや HTML コンテンツなど、他のプロセスと共有されないメモリ量。
* `sharedBytes` Integer - プロセス間で共有されるメモリ量で、通常は、 Electron のコード自体が使っているメモリ。

すべての統計情報はキロバイト単位で返ってくることに注意してください。