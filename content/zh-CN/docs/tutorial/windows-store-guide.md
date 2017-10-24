# Windows 商店指南

在 Windows 10 中, 一些不错的旧 win32 程序迎来了一个新朋友: 通用Windows平台. 新的 `.appx` 格式不仅启用了许多新的强大的 API，如 Cortana 或推送通知，而且通过Windows 应用商店，也同时简化了安装和更新。

Microsoft [开发了一个工具，将 Electron 应用程序编译为 `.appx` 软件包](https://github.com/catalystcode/electron-windows-store)，使开发人员能够使用新应用程序模型中的一些好东西。 本指南解释了如何使用它 - 以及 Electron AppX 包的功能和限制。

## 背景和要求

Windows 10 的 "周年更新" 能够运行 win32 `.exe` 程序并且它们的虚拟化文件系统和注册表跟随一起启动。 两者都是通过在 Windows 容器中运行应用程序和安装器编译后创建的，允许 Windows 在安装过程中正确识别操作系统进行了哪些修改。 将可执行文件和虚拟文件系统与虚拟注册表配对, 允许 Windows 启用一键安装和卸载。

此外，exe 在 appx 模型内启动 - 这意味着它可以使用通用 Windows 平台可用的许多 API。 为了获得更多的功能，Electron 应用程序可以与一个看不见的 UWP 后台任务配合使用，它与 `exe` 一起启动，作为后台运行任务的接收器，接收推送通知或与其他 UWP 应用程序通信 。

要编译任何现有的 Electron 应用程序，请确保满足以下要求:

* Windows 10及周年更新 (2016年8月2日发布的)
* Windows 10 SDK, [这里下载](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* 最新的 Node 4 (运行 `node -v` 来确认)

然后, 安装 `electron-windows-store` CLI:

    npm install -g electron-windows-store
    

## 步骤 1: 打包你的 Electron 应用程序

打包应用程序使用 [electron-packager](https://github.com/electron-userland/electron-packager) (或类似工具). 确保在最终的应用程序中删除不需要的 `node_modules`, 因为这些你不需要模块只会额外增加你的应用程序的大小.

结构输出应该看起来大致像这样:

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
    ├── natives_blob.bin
    ├── node.dll
    ├── resources
    │   ├── app
    │   └── atom.asar
    ├── snapshot_blob.bin
    ├── squirrel.exe
    └── ui_resources_200_percent.pak
    

## 步骤 2: 运行 electron-windows-store

从提权的 PowerShell(用管理员身份运行它) 中, 以所需的参数运行 `electron-windows-store`，传递输入和输出目录，应用程序的名称和版本，以及确认 `node_modules` 应该是扁平的。

    electron-windows-store `
        --input-directory C:\myelectronapp `
        --output-directory C:\output\myelectronapp `
        --flatten true `
        --package-version 1.0.0.0 `
        --package-name myelectronapp
    

一旦执行，工具就开始工作：它接受您的 Electron 应用程序作为输入，展平 `node_modules`。 然后，它将应用程序归档为 `app.zip`。 使用安装程序和 Windows 容器，该工具创建一个“扩展的” AppX 包 - 包括 Windows 应用程序清单 (`AppXManifest.xml`)以及虚拟文件系统和输出文件夹中的虚拟注册表。

当创建扩展的 AppX 文件后，该工具使用 Windows App Packager(`MakeAppx.exe`)将磁盘上的这些文件创建为单文件 AppX 包。 最后，该工具可用于在计算机上创建可信证书，以签署新的 AppX 包。 使用签名的 AppX 软件包，CLI也可以自动在您的计算机上安装软件包。

## 步骤 3: 使用 AppX 包

为了运行您的软件包，您的用户将需要将 Windows 10 安装“周年纪念更新” - 有关如何更新Windows的详细信息可以在[这里](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update)找到

与传统的UWP应用程序不同，打包应用程序目前需要进行手动验证过程，您可以在[这里](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge)申请. In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.