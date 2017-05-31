# Guide de présentation de Mac App Store

Depuis v0.34.0, électrons permet de soumettre des applications packagées pour le Mac App Store (mais). Ce guide fournit des informations sur : Comment soumettre votre application et les limites du MAS construisent.

**Note:** soumettre une application pour Mac App Store nécessite l’inscription [Apple développeur Program](https://developer.apple.com/support/compare-memberships/), qui coûte de l’argent.

## Comment soumettre votre App

Les étapes suivantes présentent un moyen simple de soumettre votre application sur le Mac App Store. Toutefois, ces mesures ne garantissent pas que votre application sera approuvée par Apple ; vous devez toujours lire Apple [Submitting App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) votre guide sur la façon de répondre aux exigences du Mac App Store.

### Obtenir un certificat

Pour soumettre votre application sur le Mac App Store, vous devez d’abord obtenir un certificat d’Apple. Vous pouvez suivre ces guides</a> existing sur le web.</p> 

### Obtenir l’ID de l’équipe

Avant de signer votre application, vous devez connaître l’ID de l’équipe de votre compte. Pour trouver votre ID d’équipe, connectez-vous à [Apple développeur Center](https://developer.apple.com/account/), puis cliquez sur membres dans la barre latérale. Votre ID d’équipe apparaît dans la section informations d’appartenance sous le nom de l’équipe.

### Signer votre App

Après avoir terminé les travaux de préparation, vous pouvez empaqueter votre application en suivant[Application Distribution](application-distribution.md) et passer ensuite à la signature de votre application.

Tout d’abord, vous devez ajouter une clé de `ElectronTeamID` à `Info.plist` de votre application, qui possède l’ID de votre équipe comme valeur :

```xml
<plist version="1.0"><dict>...
  <key>ElectronTeamID</key> <string>TEAM_ID</string></dict></plist>
```

Ensuite, vous devez préparer les deux fichiers de droits.

`child.plist` :

```xml
< ? xml version = « 1,0 » encoding = « UTF-8 » ?> < ! DOCTYPE plist PUBLIC «-//Apple//DTD PLIST 1.0 / / EN » « http://www.apple.com/DTDs/PropertyList-1.0.dtd » ><plist version="1.0"> <dict> <key>com.apple.security.app-sandbox</key> <true/> <key>com.apple.security.inherit</key> <true/> </dict></plist>
```

`parent.plist` :

```xml
< ? xml version = « 1,0 » encoding = « UTF-8 » ?> < ! DOCTYPE plist PUBLIC «-//Apple//DTD PLIST 1.0 / / EN » « http://www.apple.com/DTDs/PropertyList-1.0.dtd » ><plist version="1.0"> <dict> <key>com.apple.security.app-sandbox</key> <true/> <key>com.apple.security.application-groups</key> <string>TEAM_ID.your.bundle.id</string> </dict></plist>
```

Vous devez remplacer `TEAM_ID` par votre ID d’équipe et remplacez `your.bundle.id` par l’ID de l’ensemble de votre application.

Et puis signer votre application avec le script suivant :

```bash
#! / bin/bash # nom de votre App APP = « VotreApplication » # le chemin d’accès de votre application à signer.
APP_PATH="/path/to/YourApp.app » # le chemin d’accès à l’emplacement que vous voulez mettre le package signé.
RESULT_PATH="~/Desktop/$APP.pkg » # le nom de certificats que vous avez demandée.
APP_KEY = "3ème partie Mac Developer Application : nom de l’entreprise (APPIDENTITY) » INSTALLER_KEY =" 3ème partie Mac Developer installateur : Company Name (APPIDENTITY) » # le chemin d’accès de vos fichiers plist.
CHILD_PLIST="/path/to/Child.plist » PARENT_PLIST="/path/to/parent.plist » FRAMEWORKS_PATH = « $APP_PATH/contenu/Frameworks » codesign -s « $APP_KEY » -f--codesign de « $FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron cadre » versements « $CHILD_PLIST » -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib » codesign -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/Electron Framework.framework/ Codesign Versions/A/Libraries/libnode.dylib » -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/Electron Framework.framework » codesign -s « $APP_KEY » -f--codesign droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper » -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP Helper.app/ » codesign -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP Helper EH.app/Contents/MacOS/$APP Helper EH » codesign -s « $APP_KEY » -f--« $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP EH.app/ Helper » de codesign droits -s « $APP_KEY » -f--droits « $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP Helper NP.app/Contents/MacOS/$APP Helper NP » codesign -s « $APP_KEY » -f-- droits au « $CHILD_PLIST » « $FRAMEWORKS_PATH/$APP NP.app/ Helper » codesign « $APP_KEY » -s -f--droits « $CHILD_PLIST » « $APP_PATH/contenu/MacOS/$APP » codesign -s « $APP_KEY » -f--droits « $PARENT_PLIST » « $APP_PATH » productbuild--composant « $APP_PATH » / applications--signer « $INSTALLER_KEY » « $RESULT_PATH »
```

Si vous êtes nouveau sur le sandboxing app sous macOS, vous devriez également lire via Apple [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) d’avoir une idée de base, puis ajouter les clés pour les autorisations requises par votre application pour les fichiers de droits.

Outre manuellement signant votre app, vous pouvez également choisir d’utiliser le module[electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) pour faire le travail.

#### Signer des Modules natifs

Les modules natifs utilisés dans votre application doivent également être signés. Si vous utilisez électron-osx-signe, n’oubliez pas d’inclure le chemin d’accès pour les fichiers binaires générés dans la liste d’arguments :

```bash
électron-osx-signe YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Remarque que les modules natifs peuvent avoir des fichiers intermédiaires a également produit qui ne doivent pas être inclus (car ils devront aussi être signée). Si vous utilisez[electron-packager](https://github.com/electron-userland/electron-packager) avant la version 8.1.0, ajoutez`--ignore=.+\.o$` à votre étape de génération d’ignorer ces fichiers. Version 8.1.0 et plus tard ignore les fichiers par défaut.

### Télécharger votre application

Après la signature de votre application, vous pouvez utiliser le chargeur d’Application à télécharger sur iTunes Connect pour le traitement, en s’assurant que vous avez [created un record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) avant de le télécharger.

### Soumettre votre application de contrôle

Après ces étapes, vous pouvez [submit votre application pour review](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limites de construction de MAS

Afin de satisfaire toutes les exigences pour la mise en sandbox app, que les modules suivants ont été handicapés dans les MAS mise à jour :

* `crashReporter`
* `autoUpdater`

et les comportements suivants ont été modifiés :

* Capture vidéo peut-être ne pas fonctionner pour certaines machines.
* Certaines fonctions d’accessibilité peuvent ne pas fonctionner.
* Apps ne seront pas au courant des changements DNS.
* API pour lancer des applications à la connexion est désactivés. Voir https://github.com/electron/electron/issues/7312#issuecomment-249479237

En outre, en raison de l’utilisation de la mise en sandbox app, les ressources qui sont accessibles par l’app sont strictement limitées ; vous pouvez lire [App Sandboxing](https://developer.apple.com/app-sandboxing/) pour plus d’informations.

### Versements supplémentaires

Selon quelles API d’électrons votre app utilise, vous devrez peut-être ajouter des versements supplémentaires à votre fichier `parent.plist` pour pouvoir utiliser ces API à partir de votre application Mac App Store.

#### Accès au réseau

Activez les connexions sortantes de réseau permettre à votre application de se connecter à un serveur :

```xml
<key>com.Apple.Security.Network.client</key><true/>
```

Activez les connexions réseau entrantes permettre à votre application d’ouvrir un réseau socket à l’écoute :

```xml
<key>com.Apple.Security.Network.server</key><true/>
```

Voir la documentation</a> d’accès au réseau de Enabling pour plus de détails.</p> 

#### dialog.showOpenDialog

```xml
<key>com.Apple.Security.files.User-selected.read-only</key><true/>
```

Voir la documentation</a> d’accès au fichier choisi Enabling pour plus de détails.</p> 

#### dialog.showSaveDialog

```xml
<key>com.Apple.Security.files.User-selected.read-write</key><true/>
```

Voir la documentation</a> d’accès au fichier choisi Enabling pour plus de détails.</p> 

## Algorithmes de chiffrement utilisés par électron

Selon les pays et la région vous vous situez, Mac App Store peut exiger de documenter les algorithmes de chiffrement utilisés dans votre application et même vous demander de fournir une copie de l’approbation de l’inscription de chiffrement US (ERN).

Électrons utilise suivant les algorithmes de chiffrement :

* AES - [NIST SP 800-38A](http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](http://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](http://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS NORME X9.62 – 2005
* ECDH - ANS X9.63 – 2001
* HKDF - [NIST SP 800-56C](http://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](http://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X 9 .30](http://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDÉE - livre « Sur le Design et sécurité de Block Ciphers » par X. Lai
* MD2 - [RFC 1319](http://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://www.openssl.org/docs/manmaster/crypto/mdc2.html)
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](http://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

Sur la façon d’obtenir l’approbation de l’ERN, vous pouvez faire référence à l’article : [How à soumettre légalement une app de l’App Store d’Apple, lorsqu’il utilise le chiffrement (ou comment obtenir une ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).