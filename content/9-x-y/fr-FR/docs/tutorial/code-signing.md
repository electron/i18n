# Signature de code

La signature de code est une technologie de sécurité que vous utilisez pour certifier qu'une application a bien été créée par vous.

Sur macOS le système peut détecter tout changement apporté à l'application, qu'il s'agisse d'une modification introduite accidentellement ou par du code malicieux.

Sur Windows le système assigne un niveau de confiance à votre certificat de signature de code qui, selon que vous n'en ayez pas ou que son niveau de confiance est trop bas, fera apparaître des messages de sécurité lorsque les utilisateurs démarreront votre application.  Le niveau de confiance évoluant jour après jour, il est recommandé d'utiliser la signature de code le plus tôt possible.

Bien qu'il reste possible de distribuer des applications non signées, cela n'est pas recommandé. Windows et macOS empêcheront par défaut soit le téléchargement soit l'exécution d'applications non signées. Depuis macOS Catalina (version 10.15), les utilisateurs doivent passer manuellement par plusieurs étapes pour ouvrir des applications non signées.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

Comme vous pouvez le voir, les utilisateurs ont deux options : déplacez l'application directement dans la corbeille ou annulez son exécution. Vous ne voulez pas que vos utilisateurs voient cette boîte de dialogue.

Si vous développez une application Electron destinée à être empaquetée et distribuée, son code devra être signé. Les Stores Mac et Windows n'acceptent pas les applications non signées.

# Signer les projets pour MacOS

Avant de signer les versions macOS, vous devez :

1. S'inscrire au [Programme de Développeurs Apple][] (moyennant des frais annuels)
2. Télécharger et installer [Xcode][]
3. Générer, télécharger et installer [des certificats de signature][]

Il existe un certain nombre d’outils pour la signature de votre application empaquetée :

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Si vous utilisez `electron-packager`, passez le drapeau `--osx-sign=true` pour signer votre build.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

## Notarization

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide][].

# Signing Windows builds

Before signing Windows builds, you must do the following:

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Install Visual Studio 2015/2017 (to get the signing utility)

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Amongst others, please shop around to find one that suits your needs, Google is your friend :)

Il existe un certain nombre d’outils pour la signature de votre application empaquetée :

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide][].

[Programme de Développeurs Apple]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[des certificats de signature]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
