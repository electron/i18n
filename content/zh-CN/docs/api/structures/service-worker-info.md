# ServiceWorkerInfo 对象

* `scriptUrl` String - 当前service worker 运行的脚本的完整 URL
* `scope` String - 当前service worker为其激活的基URL。
* `renderProcessId` Number - 当前service worker运行的进程的虚拟 ID。  这个ID不是操作系统级别 PID。  此ID与 `webContents.getProcessId()` 所使用的 ID 集是一致的。
