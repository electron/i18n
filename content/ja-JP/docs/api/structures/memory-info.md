# MemoryInfo オブジェクト

* `pid` Integer - プロセスのプロセスID。
* `workingSetSize` Integer - 現在、実際の物理RAMに確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理RAMに確保されたことのある最大メモリ量。macOSではこの値は常に0になります。
* `privateBytes` Integer - JSヒープやHTMLコンテンツなど、他のプロセスと共有されないメモリ量。
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

すべての統計情報はキロバイト単位で返ってくることに注意してください。