# CPUUsage Object

* `percentCPUUsage` شماره - درصد استفاده از پردازشگر از زمان فراخوانی getCPUUsage. اولین فراخوانی مقدار ۰ را برگشت می دهد.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. اولین فراخوانی مقدار ۰ را برگشت می دهد. Will always return 0 on Windows.
