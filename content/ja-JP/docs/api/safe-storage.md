# safeStorage

> 文字列をローカルマシンに保管するにあたって簡単な暗号化と復号へのアクセスを可能にします。

プロセス: [Main](../glossary.md#main-process)

このモジュールは、ディスクに保存されたデータを、フルディスクアクセス権のある他のアプリケーションやユーザのアクセスから保護します。

なお、Mac ではシステムのキーチェーンへのアクセスが必要であり、これらの呼び出しがユーザ入力の収集のために現在のスレッドをブロックすることがあります。 パスワード管理ツールが利用可能な場合、Linux でも同じことが言えます。

## メソッド

`safeStorage` モジュールには以下のメソッドがあります。

### `safeStorage.isEncryptionAvailable()`

戻り値 `Boolean` - 暗号化が利用可能かどうか。

Linux では、秘密鍵が利用可能であれば true を返します。 MacOS では、キーチェーンが利用可能な場合は true を返します。 Windows では、他の前提条件なしに true を返します。

### `safeStorage.encryptString(plainText)`

* `plainText` String

戻り値 `Buffer` -  暗号化した文字列を表すバイトの配列。

この関数は、暗号化に失敗するとエラーを送出します。

### `safeStorage.decryptString(encrypted)`

* `encrypted` Buffer

戻り値 `String` - 復号した文字列。 `safeStorage.encryptString` で得た暗号化されたバッファを、文字列に復号します。

この関数は、復号に失敗するとエラーを送出します。
