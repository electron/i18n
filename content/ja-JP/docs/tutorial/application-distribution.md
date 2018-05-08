# アプリケーションの配布

Electron でアプリを配布する際は、Electron の [プレビルドバイナリ](https://github.com/electron/electron/releases) をダウンロードする必要があります。 次に、アプリケーションが含まれたフォルダの名前を `app` に変更し、Electron のリソースディレクトリに以下に示すように配置します。 Electron のプレビルドバイナリの場所は、以下の例では `electron/` と示されていることに注意してください。

macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Windows および Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

そして、`Electron.app` (Linuxでは`electron`、Windowsでは`electron.exe`) を実行すれば、アプリが起動します。`electron` ディレクトリが末端のユーザに配布する配布物となります。

## アプリをファイルにパッケージする

すべてのソースコードをコピーすることでアプリを提供する方法とは別に、アプリのソースコードがユーザに公開されるのを避けるため、[asar](https://github.com/electron/asar) アーカイブにアプリをパッケージすることができます。

`app` フォルダの代わりに `asar` アーカイブを使用するためには、アーカイブファイルを `app.asar` という名前に変更し、Electron のリソースディレクトリに以下のように配置する必要があります。そうすれば、Electron はアーカイブを読み込みを試み、そこから起動します。

macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Windows および Linux:

```text
electron/resources/
└── app.asar
```

詳細については、[アプリケーションのパッケージ化](application-packaging.md) でご確認ください。

## ダウンロードしたバイナリの名称変更

アプリを Electron にバンドルした後、ユーザーに配布する前に、 Electron の名称変更をしたいでしょう。

### Windows

`electron.exe` のファイル名は、任意の名前に変更することが出来ます。また、アイコンやその他の情報を [rcedit](https://github.com/atom/rcedit) のようなツールで編集出来ます。

### macOS

`Electron.app` のファイル名は、好きな任意の名前に変更することが出来ます。その場合、以下のファイル内の `CFBundleDisplayName`、`CFBundleIdentifier`、`CFBundleName` も変更する必要があります。

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

アクティビティモニタ上で `Electron Helper` と表示されるのを避けるために、ヘルパーアプリの名前を変更することも出来ます。ただし、ヘルパーアプリの実行ファイル名が変更されていることを確認してください。

名前を変更したアプリケーションの構造は以下のようになります。

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

`electron` 実行形式の名前は好きな任意の名前に変更できます。

## パッケージツール

アプリのパッケージを手動で行う代わりに、サードパーティー製の自動パッケージツールを使用できます。

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## ソースから Electron をリビルドして名称変更する

ソースからプロダクト名を変更してビルドすることで、Electron を名称変更することも可能です。これを行うためには、`atom.gyp` を編集して、クリーンなリビルドを行う必要があります。

### カスタム Electron フォークを作成する

Electron のカスタムフォークを作成することは、"製品レベル" のアプリケーションの場合でも、アプリを構築するために必要なことはほとんどありません。 `electron-packager` や `electron-forge` のようなツールを使うと、これらのステップを実行せずに Electron を "名称変更" することができます。

アップストリームで入手できないか、公式でリジェクトされている Electron に直接パッチしている、カスタムの C++ コードがある場合、Electron をフォークする必要があります。 Electron のメンテナーとして、あなたのやりたい通りにしたいと思っているなら、公式版の Electron に変更を加えるためにできるだけ努力していただけると助かります。その方があなたにとってはるかに易しく、且つ我々はあなたの助力に感謝するでしょう。

#### surf-build でカスタムリリースを作成する

1. npm を介して [Surf](https://github.com/surf-build/surf) をインストールします。`npm install -g surf-build@latest`

2. 新しい S3 バケットを作成し、以下の空のディレクトリ構造を作成します。
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. 以下の環境変数を設定します。

* `ELECTRON_GITHUB_TOKEN` - GitHub 上でリリースを作成できるトークン
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - シンボルと同じように node.js ヘッダをアップロードする場所
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - `ELECTRON_GITHUB_TOKEN` と同じに設定します
* `SURF_TEMP` - パスが長すぎる問題を防ぐために、Windowsでは `C:\Temp` に設定してください
* `TARGET_ARCH` - `ia32` か `x64` に設定します。

1. `script/upload.py` で、特にあなたが Electron proper のコントリビュータである場合、`ELECTRON_REPO` をあなたのフォーク (`MYORG/electron`) に設定*しなければなりません*。

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. ビルドが完了するまで、非常に、非常に長い間待ちます。