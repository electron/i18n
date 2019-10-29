# CPUUsage ऑब्जेक्ट

* `percentCPUUsage` Number - CPUUUsage प्राप्त करने के लिए अंतिम कॉल के बाद से उपयोग किए गए CPU का प्रतिशत है। पहला कॉल 0 देता है।
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.