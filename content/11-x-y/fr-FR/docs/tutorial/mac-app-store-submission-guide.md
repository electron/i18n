# Guide de Soumission Mac App Store

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Pour soumettre une application au Mac App Store, il faut s'inscrire dans le [Apple Developer Programme][developer-program], qui coûte de l'argent.

## Comment soumettre votre App

Les étapes suivantes présentent un moyen simple de soumettre votre application sur le Mac App Store. Toutefois, ces mesures ne garantissent pas que votre application sera approuvée par Apple ; vous devez toujours lire le guide [Submitting Your App][submitting-your-app] d'Apple sur la façon de répondre aux exigences du Mac App Store.

### Obtenir un certificat

Pour soumettre votre application sur le Mac App Store, vous devez d’abord obtenir un certificat d’Apple. Vous pouvez suivre ces [guides existants][nwjs-guide] sur le web.

### Obtenir un Team ID

Avant de signer votre application, vous devez connaître le Team ID de votre compte. Pour trouver votre Team ID, connectez-vous sur [Apple Developer Center](https://developer.apple.com/account/), cliquez sur Membership dans la barre latérale. Votre Team ID apparaît dans la section informations Membership sous le nom d’équipe.

### Signer votre App

Après avoir terminé les préparatifs, vous pouvez empaqueter votre application en suivant [Distribution de l'application](application-distribution.md) et passer ensuite à la signature de votre application.

Tout d'abord, vous devez ajouter une clé `ElectronTeamID` à votre application `Info.plist`, qui a votre ID d'équipe comme valeur :

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Ensuite, vous devez préparer les trois fichiers suivant.

`child.plist` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1. //FR" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com. pple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security. groupes de pplication</key>
    <array>
      <string>TEAM_ID. notre.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```

Vous devez remplacer `TEAM_ID` par votre Team ID et remplacez `votre.bundle.id` par le Bundle ID de votre application.

Et puis signez votre application avec le script suivant :

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/chemin/vers/VotreApp.app"
# Le chemin d'accès où vous voulez mettre l'empaquetage signé.
RESULT_PATH="~/Desktop/$APP.pkg"
# Le nom du certificat que vous demandez.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# Le chemin d'accès de vos fichiers plist.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. ramework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" " "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" " "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### Signer des modules natifs

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

```sh
electron-osx-sign VotreApp.app VotreApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Remarquez que les modules natifs peuvent avoir des fichiers intermédiaires générés qui ne doivent pas être inclus (car ils devront aussi être signée). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Les versions 8.1.0 et plus tard ignorent ces fichiers par défaut.

### Envoyer votre App

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### Soumettre votre App à une révision

After these steps, you can [submit your app for review][submit-for-review].

## Limitation de MAS Build

Afin de satisfaire toutes les exigences pour l'app sandboxing, les modules suivants ont été désactivé dans la compilation MAS :

* `crashReporter`
* `autoUpdater`

et les comportements suivants ont été modifiés :

* La capture vidéo peut ne pas fonctionner pour certaines machines.
* Certaines fonctionnalités d'accessibilité peuvent ne pas fonctionner.
* Les applications ne seront pas au courant des changements DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Droits supplémentaires

Selon quelles APIs d'Electron votre application utilise, vous devrez peut-être ajouter des droits supplémentaires à votre fichier `parent.plist` pour pouvoir utiliser ces APIs à partir de votre application Mac App Store.

#### Accès réseau

Activez les connexions sortantes du réseau pour permettre votre application de se connecter à un serveur :

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Activez les connexion entrantes du réseau pour permettre votre application d'ouvrir un système d'écoute socket :

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation][network-access] for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

## Algorithmes de chiffrement utilisés par Electron

Selon les pays dans lesquels vous publiez votre application, vous pourriez être requis pour fournir des informations sur les algorithmes de chiffrement utilisés dans votre logiciel . See the [encryption export compliance docs][export-compliance] for more information.

Electron utilise ces algorithmes de chiffrement suivants :

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-osx-sign]: https://github.com/electron-userland/electron-osx-sign
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
