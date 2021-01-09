# Podpisywanie kodu

Code signing is a security technology that you use to certify that an app was created by you.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

W systemie Windows system przypisuje poziom zaufania do certyfikatu podpisywania kodu, który jeśli nie posiadasz, lub jeśli Twój poziom zaufania jest niski, spowoduje pojawienie się okien dialogowych bezpieczeństwa , gdy użytkownicy zaczną korzystać z aplikacji.  Zaufaj poziomowi budować z czasem , aby łatwiej było rozpocząć podpisywanie kodu tak szybko, jak to możliwe.

Chociaż możliwe jest dystrybuowanie niepodpisanych aplikacji, nie jest to zalecane. Zarówno Windows, jak i macOS domyślnie uniemożliwią pobranie albo wykonanie niepodpisanych aplikacji. Zaczynając od macOS Catalina (wersja 10.15), użytkownicy muszą przejść przez wiele ręcznych kroków, aby otworzyć aplikacje bez podpisu.

![ostrzeżenie macOS Catalina Gatekeeper: Aplikacja nie może być otwarta, ponieważ twórca nie może zostać zweryfikowany](../images/gatekeeper.png)

Jak widzisz, użytkownicy otrzymują dwie opcje: Przenieś aplikację prosto do kosza lub anuluj uruchamianie. Nie chcesz, aby Twoi użytkownicy widzieli to okno.

Jeśli budujesz aplikację Electrona, którą zamierzasz pakować i rozpowszechniać, powinna być podpisana kod. Magazyny aplikacji Mac i Windows nie pozwalają na bezpodpisane aplikacji.

# Podpisywanie kompilacji macOS

Przed podpisaniem kompilacji macOS, musisz wykonać następujące czynności:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Istnieje wiele narzędzi do podpisywania spakowanej aplikacji:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Jeśli używasz `electron-packer`, przejdź flagę `--osx-sign=true` aby podpisać swoją kompilację.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Zobacz [electron.build/code-signing](https://www.electron.build/code-signing)

## Notaryzacja

Począwszy od macOS Catalina, Apple wymaga notariuszy aplikacji. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. niekoniecznie musisz ukończyć ten krok dla każdej budowli, którą tworzysz - po prostu kompilacje, które zamierzasz wysłać do użytkowników.

## Mac App Store

See the [Mac App Store Guide][].

# Podpisywanie wersji Windows

Przed podpisaniem wersji Windows musisz wykonać następujące czynności:

1. Pobierz certyfikat podpisywania kodu uwierzytelniania Windows (wymaga rocznej opłaty)
2. Zainstaluj Visual Studio 2015/2017 (aby uzyskać narzędzie podpisania)

Możesz otrzymać certyfikat podpisywania kodu od wielu sprzedawców. Ceny są różne, więc może być warte twojego czasu na zakupy. Popularni sprzedawcy to:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Między innymi prosimy o znalezienie takiego, który odpowiada Twoim potrzebom, Google jest twoim znajomym :)

Istnieje wiele narzędzi do podpisywania spakowanej aplikacji:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Sklep Windows

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
