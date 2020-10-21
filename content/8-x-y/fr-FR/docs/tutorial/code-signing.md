# Signature de code

La signature de code est une technologie de sécurité que vous utilisez pour certifier qu'une application a bien été créée par vous.

Sur macOS le système peut détecter tout changement apporté à l'application, qu'il s'agisse d'une modification introduite accidentellement ou par du code malicieux.

Sur Windows le système assigne un niveau de confiance à votre certificat de signature de code qui, selon que vous n'en ayez pas ou que son niveau de confiance est trop bas, fera apparaître des messages de sécurité lorsque les utilisateurs démarreront votre application.  Le niveau de confiance évoluant jour après jour, il est recommandé d'utiliser la signature de code le plus tôt possible.

Bien qu'il reste possible de distribuer des applications non signées, cela n'est pas recommandé. Par exemple, voici ce que les utilisateurs macOS voient lorsqu'ils tentent de démarrer une application non signée :

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> L'application ne peut être ouverte parce qu'elle provient d'un développeur non identifié

Si vous développez une application Electron destinée à être empaquetée et distribuée, son code devrait être signé. Les Stores Mac et Windows n'acceptent pas les applications non signées.

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

For more info, see the [Mac App Store Submission Guide][].

# Signature des versions Windows

Avant de signer les versions de Windows, vous devez faire ce qui suit :

1. Obtenir un certificat de signature de code d'authentification Windows (frais annuels)
2. Installez Visual Studio 2015/2017 (pour obtenir l'utilitaire de signature)

Vous pouvez obtenir un certificat de signature de code auprès de nombreux revendeurs. Les prix varient, donc il vaut la peine que vous fassiez des achats. Les revendeurs populaires comprennent :

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Entre autres, s'il vous plaît magasiner autour de vous pour en trouver un qui correspond à vos besoins, Google est votre ami :)

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
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[des certificats de signature]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
