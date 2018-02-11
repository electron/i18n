# MemoryInfo オブジェクト

* `pid` Integer - プロセスのプロセスID。
* `workingSetSize` Integer - 現在、実際の物理RAMに確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理RAMに確保されたことのある最大メモリ量。macOSではこの値は常に0になります。
* `privateBytes` Integer - JSヒープやHTMLコンテンツなど、他のプロセスと共有されないメモリ量。
* `sharedBytes` Integer - プロセス間で共有されるメモリ量で、通常は、Electronのコード自体が使っているメモリ。

すべての統計情報はキロバイト単位で返ってくることに注意してください。