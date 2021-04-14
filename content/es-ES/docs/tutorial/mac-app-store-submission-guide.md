# Guía de publicación en la Mac App Store

Como v0.34.0, Electron permite enviar aplicaciones empaquetadas a la Mac App Store (MAS). Esta guía proporciona información sobre: cómo enviar tu aplicación y las limitaciones de la compilación de MAS.

**Note:** Para enviar un aplicación a la App Store de Mac es necesario inscribirse en el [Apple Developer Program][developer-program], el cual cuesta dinero.

## Como presentar su aplicación

Los siguientes pasos introducen una manera más simple de presentar su aplicación en la Mac App Store. Sin embargo, estos paso no aseguran que su aplicación será aprobada por Apple: Todavía debe leer la guía de Apple para [presentar tu aplicación][submitting-your-app] sobre como cumplir con los requerimientos de la Mac App Store.

### Obtener el certificado

Para presentar tu aplicación en la Mac App Store, primero debe obtener un certificado de Apple. Puede seguir las [guías existentes][nwjs-guide] en la web.

### Obtener identificación de equipo

Antes de firmar su aplicación, necesita conocer la identificaicón del equipo de su cuenta. Para localizar la identificación de su equipo, entre en el [Centro de Desarrolladores de Apple](https://developer.apple.com/account/), y haga click en membresía en la barra lateral. Tu identificación de equipo aparece en la sección de información de membresía bajo el nombre del equipo.

### Firmar tu aplicación

Después de los trabajos preparativos, puede empacar su aplicación siguiendo [Distribución de la aplicación](application-distribution.md), y después firmando su aplicación.

Primero, usted tiene que agregar una llave `ElectronTeamID` al `Info.plist` de tu aplicación el cual tiene el ID de tu grupo como su valor:

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
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
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
# The path to the location you want to put the signed package.
RESULT_PATH="~/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# The path of your plist files.
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
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Si eres nuevo en el sandboxing de la app en macOS, también deberías leer [de Apple habilitar el entorno Sandbox de la App][enable-app-sandbox] tener una idea básica, luego agregar claves para los permisos que tu App necesita para los archivos de derechos.

Además de firmar de forma manual tu App, también puedes elegir usar el módulo de</a>
Electron-OSX-Sign para hacer el trabajo.</p> 



#### Firmar módulos nativos

Los módulos nativos utilizados en tu aplicación también necesitan ser firmados. Si utiliza electron-osx-sign, asegúrese de incluir la ruta a los binarios construidos en la lista de argumentos :



```sh
Electron-osx-signo YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```


Note también que los módulos nativos pueden tener archivos intermediarios los cuales no deben ser incluidos (de la misma forma en que tienen que ser firmados). Si usas [Electron-Packager][electron-packager] antes de la versión 8.1.0, agrega `--ignore=.+\.o$` a tu paso de construcción para ignorar estos archivos. Versiones 8.1.0 y posteriores ignoran esos archivos por defecto.



### Actualice su aplicación

Después de firmar tu App, puedes usar Application Loader para subirlo a iTunes conectar para el procesamiento, [asegurándose de que hayas creado un registro][create-record] antes de cargarlo.



### Presentar su aplicación para revisión

Después de estos pasos, puedes [enviar tu app para revisión][submit-for-review].



## Limitaciones de la estructura del MAS

Con el fin de satisfacer todos los requerimientos de las aplicaciones en la caja de arena, los siguientes módulos han sido deshabilitados en la estructura del MAS:

* `crashReporter`
* `autoUpdater`

y los siguientes comportamientos han sido cambiados:

* La captura de video puede no funcionar para algunos equipos.
* Algunas características de accesibilidad pudiesen no funcionar.
* Las aplicaciones no tendrán la señal de los cambios DNS.

Además, debido al uso del espacio aislado de la App, los recursos a los que se puede acceder mediante la App están estrictamente limitados; Puedes leer [][app-sandboxing] de sandboxing de la app para obtener más información.



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


Consulta la [habilitar la documentación de acceso a la red][network-access] para obtener más detalles .



#### dialog.showOpenDialog



```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```


Consulta la [habilitar la documentación de acceso a archivos seleccionada por el usuario][user-selected] para obtener más detalles.



#### dialog.showSaveDialog



```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```


Consulta la [habilitar la documentación de acceso a archivos seleccionada por el usuario][user-selected] para obtener más detalles.



## Algoritmos criptográficos utilizados por Electron

Dependiendo de los países en los que estás lanzando tu aplicación, puedes ser necesario proporcionar información sobre los algoritmos criptográficos utilizados en tu software. Consulta la</a> de documentos de conformidad de exportación de cifrado de para obtener más información.</p> 

Electron usa los siguientes algoritmos criptográficos:

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
* IDEA - "On the Design and Security of Block Ciphers" (En el diseño y la seguridad de las cifras cifradas) libro de X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
