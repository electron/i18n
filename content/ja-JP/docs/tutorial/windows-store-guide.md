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

[electron-packager](https://github.com/electron-userland/electron-packager)(または似たようなツール) を使ってパッケージ化します。 アプリケーションサイズが大きくなるので、実際には必要ないモジュールを`node_modules`から確実に削除します。

出力はおおよそ以下のようになります:

```text
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
│ ├── am.pak
│ ├── ar.pak
│ ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│ ├── app
│ └── atom.asar
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
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

一度ツールが実行されると: Electronアプリを入力として受け入れて、`node_modules`をフラット化します。 次にアプリケーションを`app.zip`としてアーカイブします。 インストーラーとWindows Containerを使って、ツールは、出力フォルダーにWindows Application Manifest (`AppXManifest.xml`) 、仮想ファイルシステム、仮想レジストリーを含む「拡張された」AppXパッケージを作成します。

拡張されたAppXファイルが作成されると、ツールはディスク上のそれらのファイルから、単一ファイルのAppXパッケージを作成するためにWindows App Packager(`MakeAppx.exe`) を使用します。 最後にツールはAppXパッケージを署名するためにコンピューター上に信頼された証明書を作成します。 署名されたAppXパッケージを使うと、CLIはマシンにパッケージを自動的にインストールすることもできる。

## ステップ3: AppXパッケージの使用

あなたのパッケージを実行するために、ユーザーは"Anniversary Update"と呼ばれるWindows 10が必要です。Windowsを更新する方法の詳細は[ここ](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update)をご参照ください。

従来のUWPアプリと対照的に、パッケージ化されたアプリは、現在、[ここ](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge)で申請できる手動検証プロセスが必要です。 In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.