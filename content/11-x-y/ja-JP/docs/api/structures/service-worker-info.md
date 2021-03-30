# ServiceWorkerInfo オブジェクト

* `scriptUrl` String - このサービスワーカーが実行するスクリプトの完全 URL
* `scope` String - このサービスワーカーが有効になる基底 URL。
* `renderProcessId` Number - このサービスワーカーを実行しているプロセスの仮想 ID。  これは OS の PID ではありません。  これは `webContents.getProcessId()` に使用される ID 集合と一致します。
