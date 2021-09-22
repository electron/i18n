# safeStorage

> 文字列をローカルマシンに保管するにあたって簡単な暗号化と復号へのアクセスを可能にします。

プロセス: [Main](../glossary.md#main-process)

このモジュールは、ディスクに保存されたデータを、フルディスクアクセス権のある他のアプリケーションやユーザのアクセスから保護します。

Note that on Mac, access to the system Keychain is required and these calls can block the current thread to collect user input. The same is true for Linux, if a password management tool is available.

## メソッド

`safeStorage` モジュールには以下のメソッドがあります。

### `safeStorage.isEncryptionAvailable()`

Returns `Boolean` - Whether encryption is available.

On Linux, returns true if the secret key is available. On MacOS, returns true if Keychain is available. On Windows, returns true with no other preconditions.

### `safeStorage.encryptString(plainText)`

* `plainText` String

Returns `Buffer` -  An array of bytes representing the encrypted string.

This function will throw an error if encryption fails.

### `safeStorage.decryptString(encrypted)`

* `encrypted` Buffer

Returns `String` - the decrypted string. Decrypts the encrypted buffer obtained  with `safeStorage.encryptString` back into a string.

This function will throw an error if decryption fails.
