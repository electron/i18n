## Xcodeでのデバッグ

### ソースデバッグ用 Xcode プロジェクトの生成 (Xcode からはコードをビルドできない)
`gn gen` に --ide=xcode 引数を加えて実行します。
```sh
$ gn gen out/Testing --ide=xcode
```
これで、electron.ninja.xcworkspace を生成します。 このワークスペースを開いて、ブレークポイントをセットしてインスペクトしなければなりません。

GNでIDEプロジェクトの生成についての情報を見るには、`gn help gen`を見てください。

### デバッグとブレークポイント

ビルド後にElectronアプリを起動します。 You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [注意: レンダラープロセスをデバッグする場合は、Electron Helper にもアタッチする必要があります。]

インデックスファイル内のどこにでもブレークポイントを設定することができます。 ただし、Chromium ソース内でブレークポイントを直接設定することはできません。 To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. これは、一つ以上クラスがある場合は、そのうちのすべてのクラスから、その名前を持つすべての関数のブレークポイントを設定します。 デバッガをアタッチする前にブレークポイントを設定する手順を実行することもできますが、シンボリックブレークポイント関数の実際のブレークポイントは、デバッガがアプリにアタッチされるまで表示されないことがあります。
