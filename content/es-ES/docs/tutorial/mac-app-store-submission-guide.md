# Guía de presentación de Mac App Store

Desde v0.34.0, Electron permite enviar aplicaciones empaquetados a la Mac App Store (MAS). Esta guía proporciona información sobre: Cómo presentar su aplicación y las limitaciones del MAS construyen.

**Note:** presentación de una aplicación de Mac App Store requiere inscribir [Apple desarrollador de Program](https://developer.apple.com/support/compare-memberships/), que cuesta dinero.

## Cómo presentar tu aplicación

Los pasos siguientes introducen una manera simple de presentar su aplicación a la Mac App Store. Sin embargo, estos pasos no garantizan que su aplicación, se aprobarán por Apple; necesita leer [Submitting App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) su guía de Apple cumplir los requisitos de la Mac App Store.

### Obtener certificado de

Para enviar su aplicación a la Mac App Store, primero debe obtener un certificado de Apple. Puede seguir estos guides</a> existing en la web.</p> 

### Obtener ID de equipo

Antes de firmar la aplicación, usted necesita saber el equipo de ID de su cuenta. Para localizar el ID de su equipo, ingrese a [Apple desarrollo Center](https://developer.apple.com/account/) y calidad de miembro, haga clic en la barra lateral. Su ID de equipo aparece en la sección de información bajo el nombre de equipo.

### Firmar la aplicación

Después de terminar los trabajos de preparación, puede empaquetar su aplicación por los siguientes[Application Distribution](application-distribution.md) y luego proceder a firmar la aplicación.

En primer lugar, se debe agregar una clave de `ElectronTeamID` a `Info.plist` de su aplicación, que tiene su ID de equipo como valor:

```xml
<plist version="1.0"><dict>...
  <key>ElectronTeamID</key> <string>TEAM_ID</string></dict></plist>
```

Deberá preparar dos archivos de los derechos.

`child.plist`:

```xml
<? xml version = "1,0" encoding = "UTF-8"?> <! Plist DOCTYPE público "-//Apple//DTD PLIST 1.0 / / EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" ><plist version="1.0"> <dict> <key>com.apple.security.app sandbox</key> <true/> <key>com.apple.security.inherit</key> <true/> </dict></plist>
```

`parent.plist`:

```xml
<? xml version = "1,0" encoding = "UTF-8"?> <! Plist DOCTYPE público "-//Apple//DTD PLIST 1.0 / / EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" ><plist version="1.0"> <dict> <key>com.apple.security.app sandbox</key> <true/> <key>com.apple.security.application groups</key> <string>TEAM_ID.your.bundle.id</string> </dict></plist>
```

Se debe reemplazar `TEAM_ID` con su ID de equipo y reemplazar `your.bundle.id` con el ID de paquete de la aplicación.

Y entonces firmar la aplicación con el siguiente script:

```bash
#! / bin/bash # nombre de la aplicación de la bobina = "SUAPLICACIÓN" # la ruta de tu aplicación a firmar.
APP_PATH="/path/to/YourApp.app" # la ruta a la ubicación que desea poner el paquete firmado.
RESULT_PATH="~/Desktop/$APP.pkg" # el nombre de certificados que solicita.
APP_KEY = "3 Mac desarrollador de aplicación: nombre de la empresa (APPIDENTITY)" INSTALLER_KEY = "3ª fiesta Mac desarrollador instalador: empresa nombre (APPIDENTITY)" # la ruta de los archivos plist.
CHILD_PLIST="/path/to/Child.plist" PARENT_PLIST="/path/to/parent.plist" FRAMEWORKS_PATH = "$APP_KEY" "Marcos de contenidos de$APP_PATH" codiseño de la -s -f--codiseño de "$FRAMEWORKS_PATH/Electron marco Framework.framework/Versions/A/Electron" derechos "$CHILD_PLIST" "$APP_KEY" -s -f--los derechos "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib" codesign -s "$APP_KEY" -f--los derechos "$CHILD_PLIST" $FRAMEWORKS_PATH/Electron Framework.framework/" Codiseño de Versions/A/Libraries/libnode.dylib"-s"$APP_KEY"-f--los derechos"$CHILD_PLIST"" $FRAMEWORKS_PATH/Electron Framework.framework"codesign"$APP_KEY"-s -f--los derechos"$CHILD_PLIST""$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"codiseño codesign de"$APP_KEY"-s -f--los derechos"$CHILD_PLIST"" $FRAMEWORKS_PATH/$APP Helper.app/"-s"$APP_KEY"-f--los derechos"$CHILD_PLIST "" $FRAMEWORKS_PATH/$APP auxiliar EH.app/Contents/MacOS/$APP auxiliar EH"codesign -s"$APP_KEY"-f--codiseño de derechos"$CHILD_PLIST""$FRAMEWORKS_PATH/$APP EH.app/ Helper""$APP_KEY"-s -f--los derechos"$CHILD_PLIST"" $FRAMEWORKS_PATH/$APP auxiliar NP.app/Contents/MacOS/$APP auxiliar NP"codesign -s"$APP_KEY"-f-- derechos "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP NP.app/ Helper" codesign "$APP_KEY" -s -f--codesign de derechos "$CHILD_PLIST" "$APP_PATH/contenido/MacOS/$APP" -s "$APP_KEY" -f--los derechos "$PARENT_PLIST" "$APP_PATH" productbuild - componente "$APP_PATH" /aplicaciones--firmar "$INSTALLER_KEY" "$RESULT_PATH"
```

Si eres nuevo en sandboxing de aplicación bajo macOS, también debe leer a través [Enabling de Apple App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) para tener una idea básica, luego agregar las llaves para los permisos necesarios para su aplicación a los archivos de los derechos.

Aparte de firmar manualmente la aplicación, también puede optar por utilizar el módulo de[electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) para hacer el trabajo.

#### Muestra los módulos nativos

Módulos nativos utilizados en su aplicación también necesitan la firma. Si usa el Electron-osx-signo, asegúrese de incluir la ruta a los binarios construidos en la lista de argumentos:

```bash
Electron-osx-signo YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

También nota que los módulos nativos pueden tener archivos intermedios producidos que no deberían incluirse (como también tendrían que ser firmado). Si utilizas[electron packager](https://github.com/electron-userland/electron-packager) antes de la versión 8.1.0, agregue`--ignore=.+\.o$` a su paso de compilación para omitir estos archivos. Versiones 8.1.0 y después ignora los archivos por defecto.

### Subir tu aplicación

Después de firmar su aplicación, puede utilizar Application Loader para subirlo a iTunes Connect para el procesamiento, asegurándose de que tiene [created un record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) antes de subir.

### Presentar su aplicación para revisión

Después de estos pasos, usted puede [submit su aplicación para review](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limitaciones de construcción MAS

Con el fin de satisfacer todos los requisitos de espacio aislado de la aplicación, que los siguientes módulos han sido personas con discapacidad en el MAS construcción:

* `crashReporter`
* `autoUpdater`

y se han cambiado los comportamientos siguientes:

* Captura de vídeo puede no funcionar para algunas máquinas.
* Ciertas características de accesibilidad no funcionen.
* Aplicaciones no será conscientes de los cambios DNS.
* API para lanzar aplicaciones en el inicio de sesión están deshabilitadas. Ver https://github.com/electron/electron/issues/7312#issuecomment-249479237

También, debido al uso de sandboxing de aplicación, los recursos que se pueden acceder por la aplicación son estrictamente limitados; se puede leer Sandboxing</a> de App para obtener más información.</p> 

### Derechos adicionales

Dependiendo de que APIs de Electron usos de su aplicación, puede que necesite agregar derechos adicionales para el archivo `parent.plist` para poder utilizar estas API de compilación de Mac App Store de su aplicación.

#### Acceso a la red

Permitir las conexiones salientes de la red permitir su aplicación para conectarse a un servidor:

```xml
<key>com.Apple.Security.Network.client</key><true/>
```

Habilitar las conexiones entrantes de red permitir su aplicación para abrir una red de socket de escucha:

```xml
<key>com.Apple.Security.Network.server</key><true/>
```

Ver la documentation</a> de acceso a la red de Enabling para más detalles.</p> 

#### dialog.showOpenDialog

```xml
<key>com.Apple.Security.files.User-selected.read-only</key><true/>
```

Ver el [Enabling según el acceso al archivo documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para más detalles.

#### dialog.showSaveDialog

```xml
<key>com.Apple.Security.files.User-selected.read-write</key><true/>
```

Ver el [Enabling según el acceso al archivo documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para más detalles.

## Known issues

### `shell.openItem(filePath)`

This will fail when the app is signed for distribution in the Mac App Store. Subscribe to [#9005](https://github.com/electron/electron/issues/9005) for updates.

#### Workaround

`shell.openExternal('file://' + filePath)` will open the file in the default application as long as the extension is associated with an installed app.

## Cryptographic Algorithms Used by Electron

Depending on the country and region you are located, Mac App Store may require documenting the cryptographic algorithms used in your app, and even ask you to submit a copy of U.S. Encryption Registration (ERN) approval.

Electron uses following cryptographic algorithms:

* AES - [NIST SP 800-38A](http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](http://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](http://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62 – 2005
* ECDH - ANS X9.63 – 2001
* HKDF - [NIST SP 800-56C](http://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - 46-3</a> DE FIPS</li> 
    
    * DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
    * DSA - [ANSI X 9 .30](http://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
    * CE - [SEC 1](http://www.secg.org/sec1-v2.pdf)
    * IDEA - libro "En el diseño y seguridad de los cifrados de bloques" por X. Lai
    * MD2 - [RFC 1319](http://tools.ietf.org/html/rfc1319)
    * MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
    * MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
    * MD2 - [ISO/IEC 10118-2](https://www.openssl.org/docs/manmaster/crypto/mdc2.html)
    * RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
    * RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
    * RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
    * RIPEMD - [ISO/IEC 10118-3](http://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)</ul> 
    
    On how to get the ERN approval, you can reference the article: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).