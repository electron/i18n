# MemoryInfo オブジェクト

* `workingSetSize` Integer - 現在、実際の物理 RAM に確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理 RAM に確保されたことのある最大メモリ量。
* `privateBytes` Integer (任意) _Windows_ - JS ヒープや HTML コンテンツなど、他のプロセスと共有されないメモリ量。

すべての統計情報はキロバイト単位で返ってくることに注意してください。
