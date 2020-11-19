# Dodawanie aplikacji do Windows Store

Z systemem Windows 10 dobry stary wygrany32 plik wykonywalny otrzymał nowe rodzeństwo: Uniwersalna platforma Windows. Nowy `. format ppx` nie tylko włącza liczbę nowych potężnych API takich jak Cortana lub powiadomienia Push ale poprzez Windows Store upraszcza również instalację i aktualizację.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. Ten przewodnik wyjaśnia, jak go używać - i jakie są możliwości i ograniczenia pakietu Electron AppX.

## Tło i wymagania

Windows 10 "Roczniowa aktualizacja" jest w stanie uruchomić pliki binarne32 `.exe` przez uruchamianie ich razem z wirtualnym systemem plików i rejestru. Obie są tworzone podczas kompilacji poprzez uruchomienie aplikacji i instalowanie w systemie Windows Kontener umożliwienie Windows dokładnego określenia, jakie modyfikacje systemu operacyjnego są dokonywane podczas instalacji. Parowanie pliku wykonywalnego z wirtualnym systemem plików i wirtualnym rejestrem pozwala Windows na włączenie instalacji i odinstalowanie jednego kliknięcia .

Dodatkowo, exe jest uruchamiane wewnątrz modelu aplikacji - co oznacza, że może używać wielu API dostępnych na Universal Windows Platform. Aby zyskać jeszcze więcej możliwości, aplikacja Electron może sparować z niewidzialnym zadaniem UWP uruchomionym razem z `exe` - rodzajem uruchamianym jako sidekick do uruchamiania zadań w tle, odbieranie powiadomień push lub komunikowanie się z innymi aplikacjami UWP .

Aby skompilować jakąkolwiek istniejącą aplikację Electron, upewnij się, że masz następujące wymagania :

* Windows 10 z aktualizacją rocznicową (wydanie 2 sierpnia 2016 r.)
* The Windows 10 SDK, [downloadable here][windows-sdk]
* Co najmniej węzeł 4 (do sprawdzenia, uruchom `węzeł -v`)

Następnie przejdź i zainstaluj `electron-windows-store` CLI:

```sh
npm zainstaluj -g electron-windows-store
```

## Krok 1: Spakuj Twoją Aplikację Electron

Package the application using [electron-packager][electron-packager] (or a similar tool). Upewnij się, że usuniesz `node_modules` , których nie potrzebujesz w swojej ostatniej aplikacji, ponieważ jakikolwiek moduł, którego tak naprawdę nie potrzebujesz, zwiększy rozmiar aplikacji.

Wyjście powinno wyglądać mniej więcej tak:

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
<unk> <unk> <unk> node.dll
<unk> <unk> zasoby
<unk> <unk> <unk> <unk> app.asar
<unk> <unk> <unk> <unk> v8_context_snapshot.bin
<unk> <unk> <unk> squirrel.exe
<unk> <unk> <unk> <unk> ui_resources_200_percent.pak
```

## Krok 2: Uruchamianie electron-windows-store

Z podwyższonego PowerShell (uruchom go "jako Administrator"), uruchom `electron-windows-store` z wymaganymi parametrami, przekazywanie zarówno katalogów wejściowych , jak i wyjściowych, nazwy i wersji aplikacji oraz potwierdzenie, że `node_modules` powinno być wyrównane.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Po wykonaniu, narzędzie zadziała: Akceptuje aplikację Electron jako dane wejściowe, wyrównując `node_modules`. Następnie archiwizuje Twoją aplikację jako `app.zip`. Używając instalatora i pojemnika z systemem Windows, narzędzie tworzy "expanded" AppX pakiet - w tym Manifest aplikacji Windows (`AppXManifest. ml`) jak oraz wirtualny system plików i wirtualny rejestr wewnątrz folderu wyjściowego .

Po utworzeniu rozszerzonych plików AppX narzędzie używa Windows App Packager (`MakeAppx. xe`) aby utworzyć pakiet AppX z tych plików na dysku. Wreszcie narzędzie może być użyte do stworzenia zaufanego certyfikatu na komputerze do podpisania nowego pakietu AppX. Dzięki podpisanemu pakietowi AppX CLI może również automatycznie zainstalować pakiet na twoim komputerze.

## Krok 3: Korzystanie z pakietu AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here][how-to-update].

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here][centennial-campaigns]. W międzyczasie wszyscy użytkownicy będą mogli zainstalować pakiet poprzez dwukrotne kliknięcie, więc przedłożenie do sklepu może nie być konieczne, jeśli szukasz prostszej metody instalacji. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion][add-appxpackage].

Innym ważnym ograniczeniem jest to, że skompilowany pakiet AppX nadal zawiera win32 wykonywalny - i dlatego nie będzie działać na Xbox, HoloLen lub telefony.

## Opcjonalnie: Dodaj funkcje UWP za pomocą zadania w tle

Możesz sparować swoją aplikację Electron z niewidzialnym zadaniem w tle UWP, które korzysta w pełni z funkcji Windows 10 - takich jak powiadomienia push, Integracja z Cortaną, lub żywe kafelki.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## Opcjonalnie: Konwertuj używając wirtualizacji kontenera

Aby wygenerować pakiet AppX, `electron-windows-store` CLI używa szablonu , który powinien działać dla większości aplikacji Electron. Jeśli jednak używasz niestandardowego instalatora lub powinieneś doświadczyć problemów z wygenerowanym pakietem, Ty możesz spróbować utworzyć pakiet za pomocą kompilacji z kontenerem Windows - w tym trybie, CLI zainstaluje i uruchomi Twoją aplikację w pustym kontenerem Windows , aby określić, jakie modyfikacje aplikacja dokładnie robi w systemie operacyjnym .

Przed pierwszym uruchomieniem CLI musisz skonfigurować "Windows Desktop App Converter". To zajmie kilka minut, ale nie martw się - musisz to zrobić tylko raz. Download and Desktop App Converter from [here][app-converter]. Otrzymasz dwa pliki: `DesktopAppConverter.zip` i `BaseImage-14316.wim`.

1. Rozpakuj `DesktopAppConverter.zip`. Z podwyższonego PowerShell (otwarty za pomocą "Uruchom jako Administrator", upewnij się, że twoja polityka wykonania systemów pozwala nam uruchomić wszystko, co zamierzamy uruchomić, wywołując `Set-ExecutionPolicy bypass`.
2. Następnie uruchom instalację konwertera aplikacji desktopowych, przechodząc w lokalizacji podstawowego obrazu Windows (pobranego jako `BaseImage-14316. im`), przez wywołanie `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Jeśli uruchamianie powyższego polecenia spowoduje ponowne uruchomienie, uruchom ponownie urządzenie i uruchom ponownie powyższe polecenie po udanym ponownym uruchomieniu.

Po zakończeniu instalacji możesz przejść do kompilacji aplikacji Electron.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
