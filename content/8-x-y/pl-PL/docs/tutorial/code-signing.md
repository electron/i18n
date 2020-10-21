# Podpisywanie kodu

Code signing is a security technology that you use to certify that an app was created by you.

On macOS the system can detect any change to the  app, whether the change is introduced accidentally or by malicious code.

W systemie Windows system przypisuje poziom zaufania do certyfikatu podpisywania kodu, który jeśli nie posiadasz, lub jeśli Twój poziom zaufania jest niski, spowoduje pojawienie się okien dialogowych bezpieczeństwa , gdy użytkownicy zaczną korzystać z aplikacji.  Zaufaj poziomowi budować z czasem , aby łatwiej było rozpocząć podpisywanie kodu tak szybko, jak to możliwe.

Chociaż możliwe jest dystrybuowanie niepodpisanych aplikacji, nie jest to zalecane. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. Magazyny aplikacji Mac i Windows nie pozwalają na bezpodpisane aplikacji.

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

For more info, see the [Mac App Store Submission Guide][].

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
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
