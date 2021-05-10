# Signature de code

La signature de code est une technologie de sécurité que vous utilisez pour certifier qu'une application a bien été créée par vous.

Sur macOS le système peut détecter tout changement apporté à l'application, qu'il s'agisse d'une modification introduite accidentellement ou par du code malicieux.

Sous Windows, le système assigne un niveau de confiance à votre certificat de signature de code, les utilisateurs seront avisés par des affichages de sécurité au démarrage de votre application si vous n'en possédez pas ou si votre niveau de confiance est faible .  Le niveau de confiance s'établit au fil du temps, il est donc préférable de signer le code le plus tôt possible.

Bien qu'il soit possible de distribuer des applications non signées, cela n'est pas recommandé. Windows et macOS empêcheront par défaut le téléchargement ou l'exécution d'applications non signées. À partir de macOS Catalina (version 10.15), les utilisateurs doivent passer par plusieurs étapes manuelles pour ouvrir des applications non signées.

![Avertissement pour macOS Catalina Gatekeeper : L'application ne peut pas être ouverte car le développeur
ne peut pas être vérifié](../images/gatekeeper.png)

Comme vous pouvez le voir, les utilisateurs ont deux options : déplacez l'application directement dans la corbeille ou annulez son exécution. Vous ne voulez pas que vos utilisateurs voient cette boîte de dialogue.

Si vous développez une application Electron destinée à être empaquetée et distribuée, son code devra être signé.

# Signature & certification des versions macOS

Une bonne préparation des applications macOS pour la publication nécessite deux étapes : tout d'abord, l'application doit être signée. Ensuite, l'application doit être téléchargée sur Apple pour un processus appelé "notariation", où les systèmes automatisés vérifieront davantage que votre application ne fait rien pour mettre en danger ses utilisateurs.

Pour démarrer le processus, assurez-vous que vous remplissez les conditions pour signer et certifier votre application :

1. S'inscrire au [Programme de Développeurs Apple][] (moyennant des frais annuels)
2. Télécharger et installer [Xcode][] - cela nécessite un ordinateur exécutant macOS
3. Générer, télécharger et installer [des certificats de signature][]

L'écosystème d'Electron donne priorité à la configuration et a la liberté et bien sur donc il y a plusieurs moyens de signer et certifier votre application.

## `electron-forge`

Si vous utilisez l'outil de génération d'Electron vous devrez faire quelques ajouts à votre configuration pour signer et certifier votre application. [Forge](https://electronforge.io) est une collection des outils officiels d'Electron, en utilisant [`electron-packager`][], [`electron-osx-sign`][], et [`electron-notarize`][] sous le capot.

Regardons un exemple de configuration comportant tous les champs obligatoires. Tous les ne sont pas requis : les outils seront suffisamment intelligents pour trouver automatiquement une identité `appropriée`, par exemple, mais nous vous recommandons d'être explicite.

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

Si ceux-ci ne sont pas présents dans les droits de votre application lorsque vous invoquez, par exemple :

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Votre application peut planter. Consultez la section Accès aux ressources dans [Exécution renforcée](https://developer.apple.com/documentation/security/hardened_runtime) pour plus d'informations et de droits dont vous pourriez avoir besoin.

## `electron-builder`

Electron Builder est fourni avec une solution personnalisée pour signer votre application. Vous pouvez trouver [sa documentation ici](https://www.electron.build/code-signing).

## `electron-packager`

Si vous n'utilisez pas de pipeline de construction intégré comme Forge ou Builder, vous utilisez probablement [`electron-packager`][], qui comprend [`electron-osx-sign`][] et [`electron-notarize`][].

Si vous utilisez l'API de Packager, vous pouvez fournit une [configuration](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html) qui signera et certifiera votre application.

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identité: 'Application ID développeur : Felix Rieseberg (LT94ZKYDCJ)',
    'durcis-runtime' : vrai,
    droits : 'alinéas. liste',
    "droits d'héritage" : "droits. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
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

Vous pouvez obtenir un certificat de signature de code auprès de nombreux revendeurs. Les prix varient, donc il peut valoir la peine que vous compariez. Les revendeurs populaires comprennent :

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
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
