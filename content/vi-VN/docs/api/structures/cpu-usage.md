# CPUUsage Object

* `percentCPUUsage` Number - Phần trăm CPU đã được sử dụng kể từ lần cuối gọi hàm getCPUUsage. Lần gọi đầu tiên trả về 0.
* `idleWakeupsPerSecond` Number - Số lần trung bình cpu thức dậy mỗi giây kể từ lần cuối gọi hàm getCPUUsage. Lần gọi đầu tiên trả về 0. Sẽ luôn trả về 0 trên Windows.