# コード署名

コード署名はセキュリティ技術のひとつで、アプリを作成したのがあなたであることを確実にするために使用します。

macOS システムでは、その変更が誤りか悪意のあるコードによって導入されたのかにかかわらず、アプリに対する変更を検出できます。

Windows では、コード署名証明書に信頼レベルが割り当てられています。そうでない場合や、信頼レベルが低いと、ユーザがアプリケーションを使用しようとしたときにセキュリティダイアログが表示されます。  信頼レベルは時間とともに上昇するので、できるだけ早くコード署名し始めることを推奨します。

未署名のアプリを配布することは可能ですが、非推奨です。 Windows と macOS の両方は、デフォルトで未署名のアプリケーションのダウンロードや実行を阻害します。 macOS Catalina (バージョン 10.15) 以降では、ユーザーが署名されていないアプリケーションを開くには、複数ある手動の手順を実行する必要があります。

![macOS Catalina Gatekeeper の警告: このアプリは、開発元が未確認のため開けません](../images/gatekeeper.png)

見かけ上、ユーザーには 2 つの選択肢があります。アプリをゴミ箱に直接移動するか、実行をキャンセルするかです。 ユーザーにそのダイアログを表示させたくはないでしょう。

パッケージ化して配布する予定の Electron アプリケーションを作成している場合は、コード署名されている必要があります。

# macOS ビルドへの署名 & 公証

macOS アプリをリリースに向けて適切に準備するには、2 つのステップが必要です。まず、アプリをコード署名する必要があります。 そして、"公証" と呼ばれるプロセスのためにアプリを Apple にアップロードする必要があります。自動化されたシステムによって、アプリがユーザーを危険にさらすようなことをしていないかどうか、さらに確認します。

このプロセスを開始するには、以下に示すアプリへの署名と公証の要件を満たしていることを確認してください。

1. [Apple Developer Program](https://developer.apple.com/programs/) に登録する (年会費が必要)
2. [Xcode](https://developer.apple.com/xcode) をダウンロードしてインストールする - これは macOS を実行しているコンピュータに必要です
3. [署名証明書](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates) を生成、ダウンロードして、インストールする

Electron のエコシステムでは構成とその自由度を重視しているため、アプリケーションの署名と公証の取得には複数の方法が用意されています。

## `electron-forge`

好きな Electron のビルドツールを使用している場合、アプリケーションの署名と公証を行うにあたって、設定にいくつか追加する必要があります。 [Forge](https://electronforge.io) は、[`electron-packager`]、[`electron-osx-sign`]、[`electron-notarize`] を使用した、Electron 公式ツールの集合体です。

ここでは、すべての必須フィールドを設定した例を見てみましょう。 すべてが必須というわけでは無いのです。お使いのツールは適切な `identity` を自動的に見つけられるでしょう。それでも明示的に指定することを推奨します。

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix.fun",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

Apple のセキュリティメカニズムを保証するため、ここで参照されている `plist` ファイルには以下のような macOS 固有の資格情報が入っている必要があります。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

この実例をすべて見たいのであれば、Electron Fiddle のソースコード、[特に `electron-forge` の設定ファイル](https://github.com/electron/fiddle/blob/master/forge.config.js) を確認してください。


## `electron-builder`

Electron Builder にはアプリケーションに署名するためのカスタムソリューションが付属しています。 [そのドキュメントはこちら](https://www.electron.build/code-signing) にあります。

## `electron-packager`

Forge や Builder のような統合されたビルドパイプラインを使用していない場合は、[`electron-packager`] を使用していることでしょう。これには、[`electron-osx-sign`] や [`electron-notarize`] が含まれています。

Packager の API を使用している場合、[アプリケーションに署名と公証の両方を行う設定](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html) を渡すことができます。

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    entitlements: 'entitlements.plist',
    'entitlements-inherit': 'entitlements.plist',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

Apple のセキュリティメカニズムを保証するため、ここで参照されている `plist` ファイルには以下のような macOS 固有の資格情報が入っている必要があります。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

[Mac App Store Guide](mac-app-store-submission-guide.md) を参照してください。

# Windows ビルドの署名

Windows ビルドに署名する前に、以下のことをしなければなりません。

1. Windows Authenticode コード署名証明書を取得します (年会費が必要です)
2. Visual Studio をインストールして署名ユーティリティを取得します (無料の [Community Edition](https://visualstudio.microsoft.com/vs/community/) で十分です)

多くの再販業者からコード署名証明書を入手できます。 価格はさまざまですので、選ぶのに迷うでしょう。 人気のある再販業者は次のとおりです。

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* とりわけ、あなたのニーズに合ったものを見つけるのであれば探してみてください。Google は友達です 😄

パッケージアプリケーションに署名するためのツールは以下のようにたくさんあります。

- [`electron-winstaller`] は Windows 用インストーラを生成し、それに署名します。
- [`electron-forge`] は Squirrel.Windows または MSI ターゲットを通してそれが生成するインストーラに署名できます。
- [`electron-builder`] ではその Windows ターゲットのいくつかに署名することができます

## Windows Store

[Windows Store Guide](windows-store-guide.md) を参照してください。
