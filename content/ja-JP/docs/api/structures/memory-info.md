# MemoryInfo オブジェクト

* `pid` Integer - プロセスID。
* `workingSetSize` Integer - 現在、実際の物理RAMに固定されているメモリ量。
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
* `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

すべての統計情報はキロバイト単位で報告されることに注意してください。