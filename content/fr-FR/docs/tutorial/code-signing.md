# Signature de code

La signature de code est une technologie de sécurité que vous utilisez pour certifier qu'une application a bien été créée par vous.

Sur macOS le système peut détecter tout changement apporté à l'application, qu'il s'agisse d'une modification introduite accidentellement ou par du code malicieux.

Sous Windows, le système assigne un niveau de confiance à votre certificat de signature de code, les utilisateurs seront avisés par des affichages de sécurité au démarrage de votre application si vous n'en possédez pas ou si votre niveau de confiance est faible .  Le niveau de confiance s'établit au fil du temps, il est donc préférable de signer le code le plus tôt possible.

Bien qu'il soit possible de distribuer des applications non signées, cela n'est pas recommandé. Windows et macOS empêcheront par défaut le téléchargement ou l'exécution d'applications non signées. À partir de macOS Catalina (version 10.15), les utilisateurs doivent passer par plusieurs étapes manuelles pour ouvrir des applications non signées.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the
developer cannot be verified](../images/gatekeeper.png)

Comme vous pouvez le voir, les utilisateurs ont deux options : déplacez l'application directement dans la corbeille ou annulez son exécution. Vous ne voulez pas que vos utilisateurs voient cette boîte de dialogue.

Si vous développez une application Electron destinée à être empaquetée et distribuée, son code devra être signé.

# Signature & certification des versions macOS

Une bonne préparation des applications macOS pour la publication nécessite deux étapes : tout d'abord, l'application doit être signée. Then, the app needs to be uploaded to Apple for a process called "notarization", where automated systems will further verify that your app isn't doing anything to endanger its users.

Pour démarrer le processus, assurez-vous que vous remplissez les conditions pour signer et certifier votre application :

1. S'inscrire au [Programme de Développeurs Apple][] (moyennant des frais annuels)
2. Téléchargez et installez [Xcode][] - cela nécessite un ordinateur exécutant macOS
3. Générer, télécharger et installer [des certificats de signature][]

L'écosystème d'Electron donne priorité à la configuration et a la liberté et bien sur donc il y a plusieurs moyens de signer et certifier votre application.

## `electron-forge`

Si vous utilisez l'outil de génération d'Electron vous devrez faire quelques ajouts à votre configuration pour signer et certifier votre application. [Forge](https://electronforge.io) is a collection of the official Electron tools, using [`electron-packager`][], [`electron-osx-sign`][], and [`electron-notarize`][] under the hood.

Regardons un exemple de configuration comportant tous les champs obligatoires. Not all of them are required: the tools will be clever enough to automatically find a suitable `identity`, for instance, but we recommend that you are explicit.

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix.fun",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

Le fichier `plist` référencé ici a besoin des habilitations spécifiques à macOS suivantes pour certifier aux mécanismes de sécurité d'Apple que votre application agit sans risque :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Pour voir tout cela en action, consultez le code source d'Electron Fiddle, [en particulier son fichier de configuration pour `electron-forge` ](https://github.com/electron/fiddle/blob/master/forge.config.js).

Si vous prévoyez dans votre application d'accéder au microphone ou à la caméra à l'aide des API d'Electron, vous devrez également ajouter les droits suivants :

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

If these are not present in your app's entitlements when you invoke, for example:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Votre application peut planter. See the Resource Access section in [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) for more information and entitlements you may need.

## `electron-builder`

Electron Builder comes with a custom solution for signing your application. You can find [its documentation here](https://www.electron.build/code-signing).

## `electron-packager`

If you're not using an integrated build pipeline like Forge or Builder, you are likely using [`electron-packager`][], which includes [`electron-osx-sign`][] and [`electron-notarize`][].

Si vous utilisez l'API de Packager, vous pouvez fournit une [configuration](https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html) qui signera et certifiera votre application.

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    entitlements: 'entitlements.plist',
    'entitlements-inherit': 'entitlements.plist',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

Le fichier `plist` référencé ici a besoin des habilitations spécifiques à macOS suivantes pour certifier aux mécanismes de sécurité d'Apple que votre application agit sans risque :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

See the [Mac App Store Guide][].

# Signature des versions Windows

Avant de signer les versions pour Windows, vous devez faire ce qui suit :

1. Obtenir un certificat de signature de code d'authentification Windows (frais annuels)
2. Installez Visual Studio pour obtenir l'utilitaire de signature ( [Community Edition ](https://visualstudio.microsoft.com/vs/community/) qui est gratuite est suffisante)

Vous pouvez obtenir un certificat de signature de code auprès de nombreux revendeurs. Les prix varient, donc il peut valoir la peine que vous compariez. Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* Et bien d'autres, veuillez comparer pour en trouver un qui correspond à vos besoins, Google est votre ami 😄

Il existe un certain nombre d’outils pour la signature de votre application empaquetée :

* [`electron-winstaller`][] génére un installateur pour Windowq et le signe pour vous
* [`electron-forge`][] peut signer les installateurs qu'il génère à travers des cibles Squirrel.Windows ou MSI.
* [`électron-builder`][] peut signer certaines de ses cibles Windows

## Windows Store

Consultez le [Guide Windows Store][].

[Programme de Développeurs Apple]: https://developer.apple.com/programs/
[`électron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[des certificats de signature]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Guide Windows Store]: windows-store-guide.md
