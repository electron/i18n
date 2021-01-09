# Podepsání kódu

Podpis kódu je bezpečnostní technologie, kterou používáte k potvrzení, že jste vytvořili aplikaci .

Na macOS systém umí detekovat jakékoliv změny aplikace, ať už je změna spuštěna omylem nebo škodlivým kódem.

V systému Windows systém přiřadí úroveň důvěry vašemu certifikátu s podpisem kódu, který , pokud jej nemáte, nebo pokud je vaše důvěryhodnost nízká, způsobí, že se při používání aplikace objeví dialogy zabezpečení .  Trust level se vytváří v průběhu času , takže je lepší začít podepisovat kód co nejdříve.

I když je možné distribuovat nepodepsané aplikace, není to doporučeno. Windows i macOS ve výchozím nastavení zabrání stahování nebo spuštění nepodepsaných aplikací. Počínaje macOS Catalina (verze 10.15), uživatelé musí procházet několika manuálními kroky k otevření nepodepsaných aplikací.

![upozornění macOS Catalina Gatekeeper: Aplikaci nelze otevřít, protože vývojář nemůže být ověřen](../images/gatekeeper.png)

Jak vidíte, uživatelé dostávají dvě možnosti: přesuňte aplikaci přímo do koše nebo zrušte její spuštění. Nechcete, aby uživatelé viděli tento dialog.

Pokud budujete Electron aplikaci, kterou hodláte balit a distribuovat, měla by být označena kódem. Aplikace Mac a Windows neumožňují nepodepsané aplikace.

# Podepisování makOS sestavení

Před podpisem macOS sestavení musíte udělat následující:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Existuje řada nástrojů pro podepsání vaší zabalené aplikace:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Používáte-li `electron-packager`, předejte příkaz `--osx-sign=true` k podpisu svého sestavení.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Viz [electron.build/code-signed](https://www.electron.build/code-signing)

## Oznámení

Počínaje macOS Catalina, Apple vyžaduje notarizaci. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. Nepotřebujete nutně dokončit tento krok pro každou stavbu, kterou vytvoříte – jen stavby, které hodláte odeslat uživatelům.

## Mac App Store

See the [Mac App Store Guide][].

# Podepisování sestavení Windows

Před podpisem Windows sestavení musíte udělat následující:

1. Získejte podepsaný certifikát kódu Windows Authenticode (vyžaduje roční poplatek)
2. Nainstalujte Visual Studio 2015/2017 (pro získání podepisovacího nástroje)

Můžete získat certifikát s podpisem kódu od mnoha prodejců. Ceny se liší, takže může mít cenu za váš čas nakupovat kolem sebe. Mezi populární prodejce patří:

* [digikert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Mimo jiné prosím nakupujte a najděte tu, která vyhovuje vašim potřebám, Google je váš přítel :)

Existuje řada nástrojů pro podepsání vaší zabalené aplikace:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

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
