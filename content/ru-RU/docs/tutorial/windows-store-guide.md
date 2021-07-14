# Руководство по распространению с помощью Windows Store

С выходом Windows 10, старый добрый исполнительный файл win32 обзавелся новым братом: универсальной платформой Windows (The Universal Windows Platform). Новый формат `.appx` не только позволяет применять различные новые API, как push-уведомления от Кортаны, но также значительно упрощает установку и обновления через Windows Store.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. Этот гайд объясняет как его использовать - и какие возможности и ограничения присутствуют у пакета Electron AppX.

## Предыстория и требования

"Юбилейное обновление" Windows 10 (Windows 10 "Anniversary Update") позволяет запускать win32 `.exe`-файлы, запуская их вместе с виртуализованными файловой системой и реестром. Они оба создаются во время компиляции запуском приложения и установщика внутри контейнера Windows (Windows Container), позволяя Windows определить, какие именно изменения были внесены в операционную систему во время установки. Соединение исполнительного файла с виртуальными файловой системой и реестром позволяет Windows задействовать установку и деинсталляцию в одно касание (one-click installation / uninstallation).

Вдобавок, exe-файл запускается внутри appx модели - это означает, что он может использовать множество API, доступных универсальной платформе Windows (Universal Windows Platform). Для получения еще больших возможностей, приложение на Electron можно соединить с невидимым фоновым процессом UWP, запущенным вместе с `exe`-файлом - что-то типа напарника, который будет запускать фоновые процессы, получать push-уведомления или взаимодействовать с другими UWP приложениями.

Для компиляции любого существующего приложения на Electron, удостоверьтесь, что вы попадаете под следующие требования:

* Windows 10 with Anniversary Update (выпущено 2-го Августа, 2016)
* The Windows 10 SDK, [загрузить здесь][windows-sdk]
* Как минимум Node 4 (для проверки версии, запустите в терминале `node -v`)

После этого, установите `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## 1 Шаг: Упакуйте ваше приложение

Упакуйте приложение, используя [electron-packager][electron-packager] (или подобный инструмент). Удостоверьтесь, что вы удалили `node_modules`, которые не понадобятся вам в финальной версии приложения, так как любой неиспользуемый модуль в конечном счете увеличит размер вашего приложения.

Консольный вывод должен иметь примерный вид:

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

## Шаг 2: Запуск electron-windows-store

Из под PowerShell с расширенными разрешениями (откройте как "Администратор"), запустите `electron-windows-store` с обязательными параметрами, подав как входные, так и выводные директории, имя приложения и версию, и подтверждение, что `node_modules` будут сжаты.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

После запуска инструмент начнет работу: он принимает ваше приложение как ввод, сжимая `node_modules`. Затем, он архивирует ваше приложение как `app.zip`. Используя установщик и Windows Container, он создает "расширенный" AppX пакет - включая Windows Application Manifest (`AppXManifest.xml`), а также виртуальные файловую систему и реестр внутри выходной папки.

После создания файлов расширенной AppX, инструмент использует упаковщик приложений Windows - Windows App Packager (`MakeAppx.exe`) - чтобы из всех файлов создать пакет AppX в одном файле. Наконец, инструмент может быть использован для создания доверенного сертификата на вашем компьютере, чтобы подписывать новые пакеты AppX. С подписанным AppX пакетом, CLI также может автоматически установить пакет на вашу машину.

## Шаг 3: Использование AppX пакета

Чтобы запустить ваш пакет, вашим пользователям необходима Windows 10 с так называемым "Юбилейным обновлением" - дополнительная информация по обновлению Windows [здесь][how-to-update].

В отличие от традиционных UWP приложений, упакованные приложения должны пройти процесс ручной проверки, записаться на которую можно [здесь][centennial-campaigns]. Тем временем, все пользователи смогут установить ваш пакет, кликнув по нему два раза, так что передача в магазин может быть не обязательной, если вы хотите более легкий способ установки. В управляемых средах (обычно на уровне предприятия), `Add-AppxPackage` [PowerShell Cmdlet может использоваться для установки в автоматическом режиме][add-appxpackage].

Еще одним важным ограничением является то, что скомпилированный AppX пакет все еще содержит win32 запускаемый файл - как следствие, он не запустится на Xbox, Hololens или смартфонах.

## Опционально: Добавьте UWP функционал, используя BackgroundTask

Вы можете соединить свое приложение с невидимым фоновым UWP процессом, который будет использовать функционал Windows 10 на полную - push-уведомления, интеграция Кортаны или живые тайлы в меню Пуск.

Чтобы проверить, как приложение на Electron использует этот процесс для отправки Toast-уведомлений и живых тайлов, [посмотрите на пример от Microsoft][background-task].

## Опционально: Конвертируйте с помощью виртуализации контейнера

Чтобы создать AppX пакет, `electron-windows-store` CLI использует шаблон, который должен подойти для большинства приложений на Electron. Однако, если вы используете кастомный установщик, или вы испытываете какие-либо проблемы с созданным пакетом, вы можете попытаться создать пакет с использованием компиляции с Windows контейнером, CLI установит и запустит ваше приложение в пустом Windows контейнере, чтобы определить, какие изменения ваше приложение вносит в операционную систему.

Перед запуском CLI в первый раз, вам нужно настроить "Конвертер десктопных приложений Windows" ("Windows Desktop App Converter"). Этот процесс займет пару минут, но не беспокойтесь - его нужно запустить лишь один раз. Загрузите Desktop App Converter [здесь][app-converter]. Вы получите два файла: `DesktopAppConverter.zip` и `BaseImage-14316.wim`.

1. Распакуйте `DesktopAppConverter.zip`. Из под PowerShell с расширенными разрешениями ("открыть как Администратор", убедитесь, что политика запуска на вашей системе позволяет нам запускать все, что потребуется, использовав ` обход Set-ExecutionPolicy`).
2. Затем, запустите установку Desktop App Converter, указав место Windows base Image (загружено как `BaseImage-14316.wim`), вызвав  `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Если запуск вышеуказанных команд потребует перезагрузки, пожалуйста, сделайте это и снова выполните эти команды после успешной перезагрузки.

После успешной установки вы можете перейти к компиляции вашего приложения.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
