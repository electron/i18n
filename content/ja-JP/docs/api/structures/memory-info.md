# MemoryInfo オブジェクト

* `workingSetSize` Integer - 現在、実際の物理 RAM に確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理 RAM に確保されたことのある最大メモリ量。
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

すべての統計情報はキロバイト単位で返ってくることに注意してください。
