# CPUUsage Object

* `percentCPUUsage` Number - Phần trăm CPU đã được sử dụng kể từ lần cuối gọi hàm getCPUUsage. Lần gọi đầu tiên trả về 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.