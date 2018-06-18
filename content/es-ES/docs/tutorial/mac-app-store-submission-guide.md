# Guía de publicación en la Mac App Store

Desde su V0.34.0, Electron permite introducir paquetes de aplicaciones a la Mac App Store (MAS). Esta guía provee información de: Como presentar tu aplicación y las limitaciones de la estructura del MAS.

**Nota:** Presentar una aplicación en la Mac App Store requiere la aprobación del [programa de desarrolladores de Apple](https://developer.apple.com/support/compare-memberships/), el cual cuesta dinero.

## Como presentar su aplicación

Los siguientes pasos introducen una manera más simple de presentar su aplicación en la Mac App Store. Sin embargo, estos paso no aseguran que su aplicación será aprobada por Apple: Todavía debe leer la guía de Apple para [presentar tu aplicación](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) sobre como cumplir con los requerimientos de la Mac App Store.

### Obtener el certificado

Para presentar tu aplicación en la Mac App Store, primero debe obtener un certificado de Apple. Puede seguir las [guías existentes](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) en la web.

### Obtener identificación de equipo

Antes de firmar su aplicación, necesita conocer la identificaicón del equipo de su cuenta. Para localizar la identificación de su equipo, entre en el [Centro de Desarrolladores de Apple](https://developer.apple.com/account/), y haga click en membresía en la barra lateral. Tu identificación de equipo aparece en la sección de información de membresía bajo el nombre del equipo.

### Firmar tu aplicación

Después de los trabajos preparativos, puede empacar su aplicación siguiendo [Distribución de la aplicación](application-distribution.md), y después firmando su aplicación.

Primer, tiene que añadir la llave `ElectronTeamID` a la `Info.plist` de su aplicación, el cual tiene la identificación de su equipo como valor:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Luego, necesita preparar 3 archivos con los derechos.

`child.plist`:

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

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <string>TEAM_ID.your.bundle.id</string>
  </dict>
</plist>
```

`loginhelper.plist`:

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

Tiene que cambiar `TEAM_ID` con la identificación de su equipo, y reemplazar `your.bundle.id` con la identificación de su aplicación.

Y luego firme u aplicación con el siguiente script:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# La ruta a la localización donde quiere poner el paquete firmado.
RESULT_PATH="~/Desktop/$APP.pkg"
# El nombre de los certificados que ha solicitado.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# La ruta a los archivos plist.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

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
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Si es nuevo trabajando con aplicaciones en cajas de arena en macOS, debería leer también [Habilitando caja de arena de aplicaciones](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) de Apple para tener una idea básica, luego añada la llaves para los permisos necesitados por su aplicación a los archivos con los derechos.

Además de firmar la aplicación manualmente, también puede elegir usar el módulo [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) para hacer el trabajo.

#### Firmar módulos nativos

Módulos nativos utilizados en su aplicación también necesitan la firma. Si usa el Electron-osx-signo, asegúrese de incluir la ruta a los binarios construidos en la lista de argumentos:

```sh
Electron-osx-signo YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Note también que los módulos nativos pueden tener archivos intermediarios los cuales no deben ser incluidos (de la misma forma en que tienen que ser firmados). Si utiliza [electron-packager](https://github.com/electron-userland/electron-packager) antes de la versión 8.1.0, agregue `--ignore=.+\.o$` a sus pasos de estructuración para ignorar estos archivos. Versión 8.1.0 y posteriores ignora estos archivos por defecto.

### Actualice su aplicación

Después de firmar su aplicación, usted puede usar Application Loader para actualizarla en la conexión de Itunes para procesarlo, asegurándose de [crear un registro](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) antes de subirlo.

### Presentar su aplicación para revisión

Después de estos pasos, usted puede [presentar su aplicación para revisión](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limitaciones de la estructura del MAS

Con el fin de satisfacer todos los requerimientos de las aplicaciones en la caja de arena, los siguientes módulos han sido deshabilitados en la estructura del MAS:

* `crashReporter`
* `autoUpdater`

y los siguientes comportamientos han sido cambiados:

* La captura de video puede no funcionar para algunos equipos.
* Algunas características de accesibilidad pudiesen no funcionar.
* Las aplicaciones no tendrán la señal de los cambios DNS.

Igualmente, dado el uso de las aplicaciones en caja de arena, los recursos que pueden ser accesados por la aplicación son limitados; puede leer [App Sandboxing](https://developer.apple.com/app-sandboxing/) para más información.

### Derechos adicionales

Dependiendo de que APIs de Electron usos de su aplicación, puede que necesite agregar derechos adicionales para el archivo `parent.plist` para poder utilizar estas API de compilación de Mac App Store de su aplicación.

#### Acceso a la red

Habilitar conexiones de red salientes para permitir que su aplicación se conecte al servidor:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Habilitar conexiones de red entrantes para permitir que su aplicación abra puertos de escucha:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

Vea la [Documentación sobre la habilitación del acceso de red](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) para más detalles.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Vea la [documentación sobre la habilitación del acceso del usuario a archivos seleccionados](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para más información.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Vea la [documentación sobre la habilitación del acceso del usuario a archivos seleccionados](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) para más información.

## Problemas conocidos

### `shell.openItem(filePath)`

Esto fallará cuando la aplicación sea firmada para distribución en la Mac App Store. Subscrita a [#9005](https://github.com/electron/electron/issues/9005) para actualizaciones.

#### Soluciones

`shell.openExternal('file://' + filePath)` Abrirá el archivo en la aplicación por defecto siempre y cuando la extensión esté asociada con la aplicación instalada.

## Algoritmos criptográficos utilizados por Electron

Dependiendo del país y región en el que se encuentre, la Mac App Store puede requerir la documentación de los algoritmo criptográficos en su aplicación, e incluso pedirle que presente una copia de la aprobación registro de encriptación de EEUU (ERN).

Electron usa los siguientes algoritmos criptográficos:

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
* IDEA - "On the Design and Security of Block Ciphers" (En el diseño y la seguridad de las cifras cifradas) libro de X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

Sobre como obtener la aprobación ERN, puede referenciar el artículo: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).