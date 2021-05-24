# アプリケーションの配布

## 概要

Electron アプリを配布するには、パッケージ化してアイコンを変更する必要があります。 アイコンの変更にあたっては、専用ツールか手動で行うかを選べます。

## ツールの利用

アプリケーションの配布には以下のツールを使用できます。

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

これらのツールは、あなたの Electron アプリケーションを配布可能にするにあたって必要な全手順を網羅しています。この手順には、アプリケーションのパッケージング、実行ファイルのリブランド、正しいアイコンの設定が含まれます。

[クイックスタートガイド](quick-start.md#package-and-distribute-your-application) にて `electron-forge` でアプリのパッケージ方法のサンプルを確認できます。

## マニュアル配布

### ビルド済みバイナリの利用

手動でアプリを配布する際は、Electron の [ビルド済みバイナリ](https://github.com/electron/electron/releases) をダウンロードする必要があります。 次に、アプリケーションが含まれたフォルダの名前を `app` に変更し、Electron のリソースディレクトリに以下に示すように配置します。

> *注意:* 以下の例では、Electron のビルド済みバイナリの場所を `electron/` としています。

*macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Windows および Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

その後、macOS では `Electron.app`、Linux では `electron`、Windows では `electron.exe` を実行すると、Electron がアプリとして起動します。 そして、その `electron` ディレクトリがユーザーに頒布する頒布物となります。

### アプリソースコードのアーカイブの利用

Parcel や Webpack などのバンドラを使用していない場合、ソースファイルをすべてコピーしてアプリを頒布するのではなく [asar][] アーカイブにアプリをパッケージすることで、Windows のようなプラットフォーム上でファイルの読み出しパフォーマンスを改善できます。

`app` フォルダの代わりに `asar` アーカイブを使用するためには、アーカイブファイルを `app.asar` という名前に変更し、Electron のリソースディレクトリに以下のように配置する必要があります。そうすれば、Electron はアーカイブを読み込みを試み、そこから起動します。

*macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Windows および Linux:*

```plaintext
electron/resources/
└── app.asar
```

[`electron/asar` リポジトリ ][asar]に `asar` の使い方の詳細を掲載してあります。

### ダウンロードしたバイナリの名称変更

アプリを Electron にバンドルした後、ユーザーに配布する前に、 Electron の名称変更をしたいでしょう。

#### macOS

`Electron.app` のファイル名は、好きな任意の名前に変更することが出来ます。その場合、以下のファイル内の `CFBundleDisplayName`、`CFBundleIdentifier`、`CFBundleName` も変更する必要があります。

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

アクティビティモニタ上で `Electron Helper` と表示されるのを避けるために、ヘルパーアプリの名前を変更することも出来ます。ただし、ヘルパーアプリの実行ファイル名が変更されていることを確認してください。

名前を変更したアプリケーションの構造は以下のようになります。

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

`electron.exe` のファイル名は、任意の名前に変更することが出来ます。また、アイコンやその他の情報を [rcedit](https://github.com/electron/rcedit) のようなツールで編集出来ます。

#### Linux

`electron` 実行形式の名前は好きな任意の名前に変更できます。

### ソースから Electron を再ビルドすることによる名称変更

ソースからプロダクト名を変更してビルドすることで、Electron を名称変更することも可能です。 これを行うには、製品名に対応するビルド引数 (`electron_product_name = "YourProductName" `) を `args.gn` ファイルに設定して再ビルドする必要があります。

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
