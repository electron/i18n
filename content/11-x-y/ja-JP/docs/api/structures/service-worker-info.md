# ServiceWorkerInfo オブジェクト

* `scriptUrl` String - このサービスワーカーが実行するスクリプトの完全な URL
* `scope` String - このサービスワーカーがアクティブになるベースURL。
* `renderProcessId` Number - このサービスワーカーが実行しているプロセスの仮想ID。  これは OS の PID ではありません。  これは `webContents.getProcessId()` に使用されるIDセットと一致します。
