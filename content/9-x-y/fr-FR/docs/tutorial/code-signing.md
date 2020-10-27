# Signature de code

La signature de code est une technologie de sécurité que vous utilisez pour certifier qu'une application a bien été créée par vous.

Sur macOS le système peut détecter tout changement apporté à l'application, qu'il s'agisse d'une modification introduite accidentellement ou par du code malicieux.

Sur Windows le système assigne un niveau de confiance à votre certificat de signature de code qui, selon que vous n'en ayez pas ou que son niveau de confiance est trop bas, fera apparaître des messages de sécurité lorsque les utilisateurs démarreront votre application.  Le niveau de confiance évoluant jour après jour, il est recommandé d'utiliser la signature de code le plus tôt possible.

Bien qu'il reste possible de distribuer des applications non signées, cela n'est pas recommandé. Windows et macOS empêcheront par défaut soit le téléchargement soit l'exécution d'applications non signées. Depuis macOS Catalina (version 10.15), les utilisateurs doivent passer manuellement par plusieurs étapes pour ouvrir des applications non signées.

![Avertissement sur macOS Catalina Gatekeeper : L'application ne peut pas être ouverte car le développeur ne peut pas être vérifié](../images/gatekeeper.png)

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
- [`electron-builder`][] has built-in code-signing capabilities. Voir [electron.build/code-signing](https://www.electron.build/code-signing)

## Notariation

A partir de macOS Catalina, Apple exige que les applications soient notariées. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. Vous n'avez pas nécessairement besoin de compléter cette étape pour chaque build que vous réalisez - juste les versions que vous avez l'intention de livrer aux utilisateurs.

## Mac App Store

See the [Mac App Store Guide][].

# Signature des versions Windows

Avant de signer les versions de Windows, vous devez faire ce qui suit :

1. Obtenir un certificat de signature de code d'authentification Windows (frais annuels)
2. Installez Visual Studio 2015/2017 (pour obtenir l'utilitaire de signature)

Vous pouvez obtenir un certificat de signature de code auprès de nombreux revendeurs. Les prix varient, donc il peut valoir la peine que vous compariez. Les revendeurs populaires comprennent :

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Et bien d'autres, veuillez comparer pour en trouver un qui correspond à vos besoins, Google est votre ami :)

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
