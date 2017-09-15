# Guide de Soumission Mac App Store

Depuis la version 0.34.0, Electron permet la soumission des applications empaquetées pour le Mac App Store (MAS). Ce guide fournit les informations sur : Comment soumettre votre application et les limites du MAS build.

**Remarque :** Soumettre une application pour Mac App Store nécessite l’inscription au [Programme développeur Apple](https://developer.apple.com/support/compare-memberships/), qui coûte de l’argent.

## Comment soumettre votre App

Les étapes suivantes présentent un moyen simple de soumettre votre application sur le Mac App Store. Toutefois, ces mesures ne garantissent pas que votre application sera approuvée par Apple ; vous devez toujours lire le guide [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) d'Apple sur la façon de répondre aux exigences du Mac App Store.

### Obtenir un certificat

Pour soumettre votre application sur le Mac App Store, vous devez d’abord obtenir un certificat d’Apple. Vous pouvez suivre ces [guides existants](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) sur le web.

### Obtenir un Team ID

Avant de signer votre application, vous devez connaître le Team ID de votre compte. Pour trouver votre Team ID, connectez-vous sur [Apple Developer Center](https://developer.apple.com/account/), cliquez sur Membership dans la barre latérale. Votre Team ID apparaît dans la section informations Membership sous le nom d’équipe.

### Signer votre App

Après avoir terminé les préparatifs, vous pouvez empaqueter votre application en suivant [Distribution de l'application](application-distribution.md) et passer ensuite à la signature de votre application.

Tout d’abord, vous devez ajouter une clé `ElectronTeamID` au fichier `Info.plist` de votre application, qui possède le Team ID comme valeur :

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Ensuite, vous devez préparer les deux fichiers suivant.

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
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <string>TEAM_ID.votre.bundle.id</string>
  </dict>
</plist>
```

Vous devez remplacer `TEAM_ID` par votre Team ID et remplacez `votre.bundle.id` par le Bundle ID de votre application.

Et puis signez votre application avec le script suivant :

```bash
#!/bin/bash

# Nom de votre app.
APP="VotreApp"
# Le chemin de votre app à signer.
APP_PATH="/chemin/vers/VotreApp.app"
# Le chemin d'accès où vous voulez mettre l'empaquetage signé.
RESULT_PATH="~/Desktop/$APP.pkg"
# Le nom du certificat que vous demandez.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# Le chemin d'accès de vos fichiers plist.
CHILD_PLIST="/chemin/vers/child.plist"
PARENT_PLIST="/chemon/vers/parent.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/Contents/MacOS/$APP Helper EH"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/Contents/MacOS/$APP Helper NP"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Si vous êtes nouveau dans l'app sandboxing sur macOS, vous devriez également lire le guide d'Apple [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) pour avoir une idée de base. Puis ajoutez les clés pour les autorisations requises par votre application aux fichiers de droits.

Au lieu de signer manuellement votre application, vous pouvez également choisir d'utiliser le module [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) pour faire le boulot.

#### Signer des modules natifs

Les modules natifs utilisés dans votre application doivent également être signés. Si vous utilisez electron-osx-sign, n'oubliez pas d'inclure le chemin d'accès des binaires générés dans la liste d'arguments :

```bash
electron-osx-sign VotreApp.app VotreApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Remarquez que les modules natifs peuvent avoir des fichiers intermédiaires générés qui ne doivent pas être inclus (car ils devront aussi être signée). Si vous utilisez [electron-packager](https://github.com/electron-userland/electron-packager) avant la version 8.1.0, ajoutez `--ignore=.+\.o$` à vos étapes de compilation pour ignorer ces fichiers. La version 8.1.0 et ultérieur ignore ces fichiers par défaut.

### Envoyer votre App

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) before uploading.

### Soumettre votre App à une révision

Après ces étapes, vous pouvez [soumettre votre application à une révision](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limitation de MAS Build

In order to satisfy all requirements for app sandboxing, the following modules have been disabled in the MAS build:

* `crashReporter`
* `autoUpdater`

and the following behaviors have been changed:

* Video capture may not work for some machines.
* Certain accessibility features may not work.
* Apps will not be aware of DNS changes.
* APIs for launching apps at login are disabled. See https://github.com/electron/electron/issues/7312#issuecomment-249479237

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing](https://developer.apple.com/app-sandboxing/) for more information.

### Additional Entitlements

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your `parent.plist` file to be able to use these APIs from your app's Mac App Store build.

#### Accès réseau

Enable outgoing network connections to allow your app to connect to a server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Enable incoming network connections to allow your app to open a network listening socket:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

## Problèmes connus

### `shell.openItem(filePath)`

This will fail when the app is signed for distribution in the Mac App Store. Subscribe to [#9005](https://github.com/electron/electron/issues/9005) for updates.

#### Workaround

`shell.openExternal('file://' + filePath)` will open the file in the default application as long as the extension is associated with an installed app.

## Cryptographic Algorithms Used by Electron

Depending on the country and region you are located, Mac App Store may require documenting the cryptographic algorithms used in your app, and even ask you to submit a copy of U.S. Encryption Registration (ERN) approval.

Electron uses following cryptographic algorithms:

* AES - [NIST SP 800-38A](http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](http://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](http://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](http://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](http://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](http://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](http://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://www.openssl.org/docs/manmaster/crypto/mdc2.html)
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](http://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

On how to get the ERN approval, you can reference the article: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).