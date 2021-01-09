# Semnarea codului

Semnarea codului este o tehnologie de securitate pe care o utilizați pentru a certifica faptul că o aplicație a fost creată de dvs.

Pe macOS, sistemul poate detecta orice modificare a aplicației, indiferent dacă aceasta este introdusă accidental sau prin cod răuvoitor.

Pe Windows sistemul atribuie un nivel de încredere la certificatul de semnare a codului pe care nu îl ai, sau în cazul în care nivelul dvs. de încredere este scăzut va cauza ca dialogurile de securitate să apară atunci când utilizatorii încep să folosească aplicația dvs.  Nivelul de încredere construiește în timp astfel încât este mai bine să începi semnarea codului cât mai curând posibil.

Deşi este posibilă distribuirea aplicaţiilor nesemnate, aceasta nu este recomandată. Atât Windows cât și macOS vor preveni, în mod implicit, fie descărcarea, fie executarea aplicațiilor nesemnate. Începând cu macOS Catalina (versiunea 10.15), utilizatorii trebuie să parcurgă mai mulți pași manuali pentru a deschide aplicații nesemnate.

![atenționarea macOS Catalina Gatekeeper: Aplicația nu poate fi deschisă deoarece dezvoltatorul nu poate fi verificat](../images/gatekeeper.png)

După cum vedeți, utilizatorii primesc două opțiuni: Mută aplicația direct la gunoi sau anulează rularea. Nu vrei ca utilizatorii să vadă acest dialog.

Dacă construiești o aplicație Electron pe care intenționezi să o ambalezi și să o distribuiești, aceasta ar trebui să fie semnată cu cod. Magazinele de aplicații Mac și Windows nu permit aplicații nesemnate.

# Semnarea versiunilor macOS

Înainte de semnarea macOS construiește, trebuie să faceți următoarele:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Există o serie de unelte pentru semnarea aplicației tale împachetate:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Dacă folosești `un ambalator electron-`, trece steagul `--osx-sign=true` pentru a semna construcția.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Vezi [electron.build/code-signing](https://www.electron.build/code-signing)

## Notarizare

Începând cu macOS Catalina, Apple necesită ca aplicațiile să fie notarizate. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Magazin de aplicații Mac

See the [Mac App Store Guide][].

# Versiuni de semnare Windows

Înainte de a semna versiuni Windows, trebuie să faceți următoarele:

1. Obține un certificat de semnare a codului de autentificare Windows (necesită o taxă anuală)
2. Instalați Visual Studio 2015/2017 (pentru a obține semnarea)

Poți obține un certificat de cod de la o mulțime de distribuitori. Preţurile variază, astfel încât poate merita timp să faci cumpărături. Revânzătorii populari includ:

* [digicerat](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Printre altele, vă rugăm să faceți cumpărături pentru a găsi unul care se potrivește nevoilor dvs., Google este prietenul dvs. :)

Există o serie de unelte pentru semnarea aplicației tale împachetate:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Magazin Windows

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
