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

Из под PowerShell с расширенными разрешениями (откройте как "Администратор"), запустите `electron-windows-store` с обязательными параметрами, подав как входные, так и выводные директории, имя приложения и версию, и подтверждение, что `node_modules` будут сжаты.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

После запуска инструмент начнет работу: он принимает ваше приложение как ввод, сжимая `node_modules`. Затем, он архивирует ваше приложение как `app.zip`. Используя установщик и Windows Container, он создает "расширенный" AppX пакет - включая Windows Application Manifest (`AppXManifest.xml`), а также виртуальные файловую систему и реестр внутри выходной папки.

После создания файлов расширенной AppX, инструмент использует упаковщик приложений Windows - Windows App Packager (`MakeAppx.exe`) - чтобы из всех файлов создать пакет AppX в одном файле. Наконец, инструмент может быть использован для создания доверенного сертификата на вашем компьютере, чтобы подписывать новые пакеты AppX. С подписанным AppX пакетом, CLI также может автоматически установить пакет на вашу машину.

## Шаг 3: Использование AppX пакета

Чтобы запустить ваш пакет, вашим пользователям необходима Windows 10 с так называемым "Юбилейным обновлением" - дополнительная информация по обновлению Windows [здесь](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

В отличие от традиционных UWP приложений, упакованные приложения должны пройти процесс ручной проверки, записаться на которую можно [здесь](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). Тем временем, все пользователи смогут установить ваш пакет, кликнув по нему два раза, так что передача в магазин может быть не обязательной, если вы хотите более легкий способ установки. В управляемых средах (обычно на уровне предприятия), `Add-AppxPackage` [PowerShell Cmdlet может использоваться для установки в автоматическом режиме](https://technet.microsoft.com/en-us/library/hh856048.aspx).

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