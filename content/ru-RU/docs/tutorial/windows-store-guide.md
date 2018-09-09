# Руководство по распространению с помощью Windows Store

С выходом Windows 10, старый добрый исполнительный файл win32 обзавелся новым братом: универсальной платформой Windows (The Universal Windows Platform). Новый формат `.appx` не только позволяет применять различные новые API, как push-уведомления от Кортаны, но также значительно упрощает установку и обновления через Windows Store.

Microsoft разработали инструмент, который компилирует приложения на Electron как `.appx` пакеты, позволяя разработчикам использовать некоторые приятные нововведения от новой модели приложения. Этот гайд объясняет как его использовать - и какие возможности и ограничения присутствуют у пакета Electron AppX.

## Предыстория и требования

"Юбилейное обновление" Windows 10 (Windows 10 "Anniversary Update") позволяет запускать win32 `.exe`-файлы, запуская их вместе с виртуализованными системой и реестром. Они оба создаются во время компиляции запуском приложения и установщика внутри контейнера Windows (Windows Container), позволяя Windows определить, какие именно изменения были внесены в операционную систему во время установки. Соединение исполнительного файла с виртуальными файловой системой и реестром позволяет Windows задействовать установку и деинсталляцию в одно касание (one-click installation / uninstallation).

Вдобавок, exe-файл запускается внутри appx модели - это означает, что он может использовать множество API, доступных универсальной платформе Windows (Universal Windows Platform). Для получения еще больших возможностей, приложение на Electron можно соединить с невидимым фоновым процессом UWP, запущенным вместе с `exe`-файлом - что-то типа напарника, который будет запускать фоновые процессы, получать push-уведомления или взаимодействовать с другими UWP приложениями.

Для компиляции любого существующего приложения на Electron, удостоверьтесь, что вы попадаете под следующие требования:

* Windows 10 with Anniversary Update (выпущено 2-го Августа, 2016)
* The Windows 10 SDK, [загрузить здесь](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Как минимум Node 4 (для проверки версии, запустите в терминале `node -v`)

После этого, установите `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## 1 Шаг: Упакуйте ваше приложение

Упакуйте приложение, используя [electron-packager](https://github.com/electron-userland/electron-packager) (или подобный инструмент). Удостоверьтесь, что вы удалили `node_modules`, которые не понадобятся вам в финальной версии приложения, так как любой неиспользуемый модуль в конечном счете увеличит размер вашего приложения.

Консольный вывод должен иметь примерный вид:

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
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Шаг 2: Запуск electron-windows-store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Once executed, the tool goes to work: It accepts your Electron app as an input, flattening the `node_modules`. Then, it archives your application as `app.zip`. Using an installer and a Windows Container, the tool creates an "expanded" AppX package - including the Windows Application Manifest (`AppXManifest.xml`) as well as the virtual file system and the virtual registry inside your output folder.

Once the expanded AppX files are created, the tool uses the Windows App Packager (`MakeAppx.exe`) to create a single-file AppX package from those files on disk. Finally, the tool can be used to create a trusted certificate on your computer to sign the new AppX package. With the signed AppX package, the CLI can also automatically install the package on your machine.

## Step 3: Using the AppX Package

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

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