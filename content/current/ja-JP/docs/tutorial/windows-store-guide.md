# Windowsストア ガイド

Windows 10では、古き良き Win32 実行形式は新たな兄弟をむかえました: Universal Windows Platform。 新しい `.appx` フォーマットは、Cortana や Push通知のような新しい強力な API を利用できるだけでなく、Windows ストアを通じて、シンプルなインストールとアップデートが可能になります。

Microsoft は [Electron アプリを `.appx` パッケージとしてコンパイル可能なツールを開発](https://github.com/catalystcode/electron-windows-store)したため、開発者は新しいアプリケーション モデルの一部を使用できます。 このガイドではその使用方法 - Electron AppX パッケージの機能と制限について解説します。

## 背景と必要条件

Windows 10 "Anniversary Update" では、仮想ファイルシステムとレジストリと共に起動することで win32 `.exe` バイナリを実行できます。 どちらも、Windows Container内部でアプリとインストーラーを実行することで、インストール中のオペレーティングシステムに対する変更を正確に検出できます。 仮想ファイルシステムと仮想レジストリを実行ファイルのペアにすることで、Windowsがワンクリックでインストールとアンインストールが可能になる。

さらにexeは内部的にはappxモデルとして起動される - つまりUniversal Windows Platformで利用可能なAPIの多くを使用できる。 より多くの機能として、Electronアプリは `exe`と共に、バックグラウンドでタスクを実行する、プッシュ通知を受け取る、他のUWPアプリケーションと通信するなど、表示しないUWPバックグラウンドタスクを組合せることができます。

既存のElectronアプリをコンパイルするには、以下の要件を満たしていることを確認してください:

* Windows 10 with Anniversary Update (2016年8月2日にリリース)
* Windows 10 SDK [ここからダウンロード](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* 少なくてもNode 4 (`node -v`を実行してチェックできます)

次に、`electron-windows-store` CLIに移動してインストールする:

```sh
npm install -g electron-windows-store
```

## ステップ1: Electronアプリケーションのパッケージ化

[electron-packager](https://github.com/electron/electron-packager) (または類似ツール) を用いてパッケージします。 アプリケーションサイズが大きくなるので、実際には必要ないモジュールを`node_modules`から確実に削除します。

出力はおおよそ以下のようになります:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   └── app.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## ステップ2: electron-windows-storeを実行

昇格したPowerShell(管理者として実行) で、入力と出力ディレクトリ、アプリ名とバージョン、`node_modules`をフラット化することの確認など、必要なパラメーターと共に`electron-windows-store`を実行する。

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

一度ツールが実行されると: Electronアプリを入力として受け入れて、`node_modules`をフラット化します。 次にアプリケーションを`app.zip`としてアーカイブします。 インストーラーとWindows Containerを使って、ツールは、出力フォルダーにWindows Application Manifest (`AppXManifest.xml`) 、仮想ファイルシステム、仮想レジストリーを含む「拡張された」AppXパッケージを作成します。

拡張されたAppXファイルが作成されると、ツールはディスク上のそれらのファイルから、単一ファイルのAppXパッケージを作成するためにWindows App Packager(`MakeAppx.exe`) を使用します。 最後にツールはAppXパッケージを署名するためにコンピューター上に信頼された証明書を作成します。 署名されたAppXパッケージを使うと、CLIはマシンにパッケージを自動的にインストールすることもできる。

## ステップ3: AppXパッケージの使用

あなたのパッケージを実行するために、ユーザーは"Anniversary Update"と呼ばれるWindows 10が必要です。Windowsを更新する方法の詳細は[ここ](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update)をご参照ください。

従来のUWPアプリと対照的に、パッケージ化されたアプリは、現在、[ここ](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge)で申請できる手動検証プロセスが必要です。 全てのユーザーはパッケージをダブルクリックすることでインストールできるため、もしより簡単なインストール方法を探しているのであれば、ストアへのサブミットは必要ではありません。 (通常はエンタープライズなど) 管理された環境 では、`Add-AppxPackage` [PowerShell Cmdletを使用して自動的にインストールできる](https://technet.microsoft.com/en-us/library/hh856048.aspx)。

もう一つの重要な制限は、コンパイルされたAppXパッケージはまだWin32実行形式であり、Xbox、HoloLens、Phoneでは実行できないことです。

## オプション: BackgroundTaskを使ってUWP機能を追加
プッシュ通知、Cortana統合、ライブタイルなど、Windows 10機能を完全に使った非表示UWPバックグラウンドタスクとElectronアプリを組み合わせることができます。

Electronアプリがバックグラウンドタスクを使って、トースト通知の送信とライブタイルを利用する方法は、[マイクロソフトが提供するサンプルをチェック](https://github.com/felixrieseberg/electron-uwp-background)してください。

## オプション: コンテナ仮想化を使った変換

ほとんどのElectronアプリは、AppX パッケージを生成するために`electron-windows-store` CLIで動作するテンプレートを使っている。 しかし、もしもカスタムインストーラーを使った場合や、生成されたパッケージで問題が発生した場合には、Windows Containerでコンパイルを使ったパッケージ作成を試すことができ、このモデルでは、アプリケーションがオペレーティングシステムに対して具体的にどんな変更をしているのかを検出するため、CLIは空のWindows Containerにアプリケーションをインストールして実行します。

初めてCLIを実行する前に「Windows Desktop App Converter」をセットアップする必要があります。 これには数分かかりますが、一度だけなので心配する必要はありません。 [ここから](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter)Desktop App Conveterをダウンロードします。 あなたは2つのファイルを受け取ります: `DesktopAppConverter.zip`と`BaseImage-14316.wim`

1. `DesktopAppConverter.zip`を展開します。 (管理者として実行) で昇格したPowerShellで`Set-ExecutionPolicy bypass`を呼び出して、システム実行ポリシーで全ての実行を可能にします。
2. 次にDesktop App Converterのインストールを実行して、(`BaseImage-14316.wim`としてダウンロードされた) Windowsベースイメージの場所を渡して、`.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`を呼び出します。
3. 上記コマンドを実行して再起動が促されたら、マシンを再起動して、再起動に成功した後で上記コマンドをもう一度実行してください。

インストールが成功すると、Electronアプリのコンパイルに進むことができます。
