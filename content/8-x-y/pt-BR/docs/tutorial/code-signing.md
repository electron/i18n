# Assinando Código

A assinatura do código é uma tecnologia de segurança que você usa para certificar que um aplicativo foi criado por você.

On macOS the system can detect any change to the  app, whether the change is introduced accidentally or by malicious code.

No Windows o sistema atribui um nível de confiança ao seu certificado de assinatura de código, que se você não tiver, ou se o seu nível de confiança estiver baixo, fará com que as caixas de diálogo de segurança apareçam quando usuários começarem a usar seu aplicativo.  Nível de confiança ao longo do tempo então é melhor começar a codificar a assinatura o mais cedo possível.

Embora seja possível distribuir aplicativos não assinados, não é recomendado. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. As lojas para Mac e Windows não permitem apps não assinados.

# Assinando compilações macOS

Antes de assinar as compilações macOS, você deve fazer o seguinte:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Existem várias ferramentas para assinar seu aplicativo de pacotes:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Se você estiver usando o `electron-packager`, passe a bandeira `--osx-sign=true` para assinar a sua construção.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Veja [electron.build/code-sign](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide][].

# Assinando compilações do Windows

Antes de assinar versões do Windows, faça o seguinte:

1. Obtenha um certificado de assinatura de código do Windows Authenticode (requer uma taxa anual)
2. Instale o Visual Studio 2015/2017 (para obter a ferramenta de assinatura)

Você pode obter um certificado de assinatura de um grande número de revendedores. Os preços variam, então vale a pena pesquisar. Revendedores populares incluem:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Entre outros, por favor, faça a loja para encontrar uma que se adapte às suas necessidades, o Google é seu amigo :)

Existem várias ferramentas para assinar seu aplicativo de pacotes:

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
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
