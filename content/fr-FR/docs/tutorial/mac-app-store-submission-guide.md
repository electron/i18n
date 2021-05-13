# Guide de Soumission Mac App Store

Ce guide fournit des informations sur :

* Comment signer des applications Electron sur macOS ;
* Comment soumettre des applications Electron sur le Mac App Store (MAS) ;
* Les limitations de la compilation pour le MAS.

## Spécifications requises

Pour signer des applications Electron, les outils suivants doivent d'abord être installés :

* Xcode 11 ou plus.
* Le module npm [electron-osx-sign][electron-osx-sign].

Vous devez également créer un compte Apple Developer et rejoindre le [Apple Developper Program][developer-program].

## Signer des applications Electron

Les applications Electron peuvent être distribuées via le Mac App Store ou en dehors de celui-ci. Chaque moyen de distribution nécessite différentes façons de signer et de tester. Ce guide se concentre sur la distribution via le Mac App Store, mais mentionnera également d'autres méthodes.

Les étapes suivantes décrivent comment obtenir les certificats d'Apple, comment signer des applications Electron, et comment les tester.

### Obtenir des certificats

La façon la plus simple d’obtenir des certificats de signature est d’utiliser Xcode :

1. Ouvrir Xcode et dans les préférences ouvrir "Comptes" ;
2. Connectez-vous avec votre compte Apple ;
3. Sélectionnez une équipe et cliquez sur "Gérer les certificats" ;
4. Dans le coin inférieur gauche de la feuille de certificats de signature, cliquez sur le bouton Ajouter (+) et ajoutez les certificats suivants :
   * "Apple Development"
   * "Apple Distribution"

The "Apple Development" certificate is used to sign apps for development and testing, on machines that have been registered on Apple Developer website. The method of registration will be described in [Prepare provisioning profile](#prepare-provisioning-profile).

Apps signed with the "Apple Development" certificate cannot be submitted to Mac App Store. For that purpose, apps must be signed with the "Apple Distribution" certificate instead. But note that apps signed with the "Apple Distribution" certificate cannot run directly, they must be re-signed by Apple to be able to run, which will only be possible after being downloaded from the Mac App Store.

#### Autres certificats

Vous remarquerez peut-être qu'il existe également d'autres types de certificats.

The "Developer ID Application" certificate is used to sign apps before distributing them outside the Mac App Store.

The "Developer ID Installer" and "Mac Installer Distribution" certificates are used to sign the Mac Installer Package instead of the app itself. Most Electron apps do not use Mac Installer Package so they are generally not needed.

La liste complète des types de certificats peut être trouvée [ici](https://help.apple.com/xcode/mac/current/#/dev80c6204ec).

Apps signed with "Apple Development" and "Apple Distribution" certificates can only run under [App Sandbox][app-sandboxing], so they must use the MAS build of Electron. However, the "Developer ID Application" certificate does not have this restrictions, so apps signed with it can use either the normal build or the MAS build of Electron.

#### Legacy certificate names

Apple has been changing the names of certificates during past years, you might encounter them when reading old documentations, and some utilities are still using one of the old names.

* The "Apple Distribution" certificate was also named as "3rd Party Mac Developer Application" and "Mac App Distribution".
* The "Apple Development" certificate was also named as "Mac Developer" and "Development".

### Prepare provisioning profile

If you want to test your app on your local machine before submitting your app to the Mac App Store, you have to sign the app with the "Apple Development" certificate with the provisioning profile embedded in the app bundle.

To [create a provisioning profile](https://help.apple.com/developer-account/#/devf2eb157f8), you can follow the below steps:

1. Open the "Certificates, Identifiers & Profiles" page on the [Apple Developer](https://developer.apple.com/account) website.
2. Add a new App ID for your app in the "Identifiers" page.
3. Register your local machine in the "Devices" page. You can find your machine's "Device ID" in the "Hardware" page of the "System Information" app.
4. Register a new Provisioning Profile in the "Profiles" page, and download it to `/path/to/yourapp.provisionprofile`.

### Enable Apple's App Sandbox

Apps submitted to the Mac App Store must run under Apple's [App Sandbox][app-sandboxing], and only the MAS build of Electron can run with the App Sandbox. The standard darwin build of Electron will fail to launch when run under App Sandbox.

When signing the app with `electron-osx-sign`, it will automatically add the necessary entitlements to your app's entitlements, but if you are using custom entitlements, you must ensure App Sandbox capacity is added:

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

#### Étapes supplémentaires sans `electron-osx-sign`

Si vous signez votre application sans utiliser `electron-osx-sign`, vous devez vous assurer les droits du bundle d'applications ont au moins les clés suivantes :

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

The `TEAM_ID` should be replaced with your Apple Developer account's Team ID, and the `your.bundle.id` should be replaced with the App ID of the app.

And the following entitlements must be added to the binaries and helpers in the app's bundle:

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

And the app bundle's `Info.plist` must include `ElectronTeamID` key, which has your Apple Developer account's Team ID as its value:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

When using `electron-osx-sign` the `ElectronTeamID` key will be added automatically by extracting the Team ID from the certificate's name. You may need to manually add this key if `electron-osx-sign` could not find the correct Team ID.

### Sign apps for development

To sign an app that can run on your development machine, you must sign it with the "Apple Development" certificate and pass the provisioning profile to `electron-osx-sign`.

```bash
electron-osx-sign YourApp.app --identity='Apple Development' --provisioning-profile=/path/to/yourapp.provisionprofile
```

If you are signing without `electron-osx-sign`, you must place the provisioning profile to `YourApp.app/Contents/embedded.provisionprofile`.

The signed app can only run on the machines that registered by the provisioning profile, and this is the only way to test the signed app before submitting to Mac App Store.

### Sign apps for submitting to the Mac App Store

To sign an app that will be submitted to Mac App Store, you must sign it with the "Apple Distribution" certificate. Note that apps signed with this certificate will not run anywhere, unless it is downloaded from Mac App Store.

```bash
electron-osx-sign YourApp.app --identity='Apple Distribution'
```

### Sign apps for distribution outside the Mac App Store

If you don't plan to submit the app to Mac App Store, you can sign it the "Developer ID Application" certificate. In this way there is no requirement on App Sandbox, and you should use the normal darwin build of Electron if you don't use App Sandbox.

```bash
electron-osx-sign YourApp.app --identity='Developer ID Application' --no-gatekeeper-assess
```

By passing `--no-gatekeeper-assess`, the `electron-osx-sign` will skip the macOS GateKeeper check as your app usually has not been notarized yet by this step.

<!-- TODO(zcbenz): Add a chapter about App Notarization -->
This guide does not cover [App Notarization][app-notarization], but you might want to do it otherwise Apple may prevent users from using your app outside Mac App Store.

## Submit Apps to the Mac App Store

After signing the app with the "Apple Distribution" certificate, you can continue to submit it to Mac App Store.

However, this guide do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App][submitting-your-app] guide on how to meet the Mac App Store requirements.

### Upload

The Application Loader should be used to upload the signed app to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

If you are seeing errors like private APIs uses, you should check if the app is using the MAS build of Electron.

### Soumettre pour vérification

After uploading, you should [submit your app for review][submit-for-review].

## Limitation de MAS Build

Afin de satisfaire toutes les exigences pour l'app sandboxing, les modules suivants ont été désactivé dans la compilation MAS :

* `crashReporter`
* `autoUpdater`

et les comportements suivants ont été modifiés :

* La capture vidéo peut ne pas fonctionner pour certaines machines.
* Certaines fonctionnalités d'accessibilité peuvent ne pas fonctionner.
* Les applications ne seront pas au courant des changements DNS.

De plus, en raison de l'utilisation de l'app sandboxing, les ressources étant accessibles par l'application sont strictement limitées. Vous pouvez lire [App Sandboxing][app-sandboxing] pour plus d'informations.

### Droits supplémentaires

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your app's entitlements file. Otherwise, the App Sandbox may prevent you from using them.

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

Voir la [documentation Activer les accès réseaux][network-access] pour plus de détails.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Voir la [documentation Activer les fichiers sélectionnés par l'utilisateur][user-selected] pour plus de détails.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Voir la [documentation Activer les fichiers sélectionnés par l'utilisateur][user-selected] pour plus de détails.

## Algorithmes de chiffrement utilisés par Electron

Selon les pays dans lesquels vous publiez votre application, vous pourriez être requis pour fournir des informations sur les algorithmes de chiffrement utilisés dans votre logiciel . Voir la [documentation de conformité à l'exportation de chiffrement][export-compliance] pour plus d'informations.

Electron utilise ces algorithmes de chiffrement suivants :

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[electron-osx-sign]: https://github.com/electron/electron-osx-sign
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[app-notarization]: https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
