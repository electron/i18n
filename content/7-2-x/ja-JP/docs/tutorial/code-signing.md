# コード署名

コード署名はセキュリティ技術のひとつで、アプリを作成したのがあなたであることを確実にするために使用します。

macOS では、システムは変更が誤りか悪意のあるコードによって導入されたのかにかかわらず、アプリに対する変更を検出できます。

Windows では、コード署名証明書に信頼レベルが割り当てられています。そうでない場合や、信頼レベルが低いと、ユーザがアプリケーションを使用しようとしたときにセキュリティダイアログが表示されます。  信頼レベルは時間とともに高まるので、できるだけ早くコード署名を開始することをお勧めします。

未署名のアプリを配布することは可能ですが、非推奨です。 例えば、以下は未署名のアプリを起動しようとしたときに macOS ユーザに表示されるものです。

![macOS 上の未署名アプリの警告](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> アプリは、開発元が未確認のため開けません

パッケージ化して配布する予定の Electron アプリケーションを作成している場合は、コード署名されている必要があります。 Mac と Windows の App Store では、未署名のアプリは許可されていません。

# macOS ビルドの署名

macOS ビルドに署名する前に、以下のことをしなければなりません。

1. [Apple Developer Program](https://developer.apple.com/programs/) に登録する (年会費が必要)
2. [Xcode](https://developer.apple.com/xcode) をダウンロードしてインストールする
3. [署名証明書](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates) を生成、ダウンロードして、インストールする

パッケージアプリケーションに署名するためのツールは以下のようにたくさんあります。

- [`electron-osx-sign`] は macOS パッケージに署名するためのスタンドアロンツールです。
- [`electron-packager`] は `electron-osx-sign` を同梱しています。 `electron-packager` そ使用している場合は、ビルドに署名するために `--osx-sign=true` フラグを渡してください。
  - [`electron-forge`] は内部で `electron-packager` を使用するので、forge コンフィグ内で `osxSign` オプションを設定できます。
- [`electron-builder`] には組み込みのコード署名機能があります。 [electron.build/code-signing](https://www.electron.build/code-signing) を参照してください

更なる情報は、[Mac App Store Submission Guide](mac-app-store-submission-guide.md) を参照してください。

# Windows ビルドの署名

Windows ビルドに署名する前に、以下のことをしなければなりません。

1. Windows Authenticode コード署名証明書を取得します (年会費が必要です)
2. Visual Studio 2015/2017 をインストールします (署名ユーティリティを入手するため)

多くの再販業者からコード署名証明書を入手できます。 価格はさまざまですので、買い物をする時間があるかもしれません。 人気のある再販業者は次のとおりです。

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* とりわけ、あなたのニーズに合ったものを見つけるために探してみてください。Googleは友達 :)

パッケージアプリケーションに署名するためのツールは以下のようにたくさんあります。

- [`electron-winstaller`] は Windows 用インストーラを生成し、それに署名します。
- [`electron-forge`] は Squirrel.Windows または MSI ターゲットを通してそれが生成するインストーラに署名することができます。
- [`electron-builder`] ではその Windows ターゲットのいくつかに署名することができます

## Windows Store

[Windows Store Guide](windows-store-guide.md) を参照してください。
