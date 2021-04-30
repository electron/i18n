# Firma de código

La firma de código es una tecnología de seguridad que utiliza para certificar que una aplicación fue creada por usted.

En macOS el sistema puede detectar cualquier cambio en la aplicación, tanto si el cambio es introducido accidentalmente como por código malicioso.

En Windows, el sistema asigna un nivel de confianza a tu certificado de firma de código que si no tienes, o si su nivel de confianza es bajo, causará que aparezcan diálogos de seguridad cuando los usuarios comiencen a usar su aplicación.  Confiar en que el nivel de confianza crea con el tiempo, por lo que es mejor empezar a firmar código tan pronto como sea posible.

Si bien es posible distribuir aplicaciones sin firmar, no es recomendable. Tanto Windows como macOS evitarán, por defecto, la descarga o la ejecución de aplicaciones sin firmar. A partir de macOS Catalina (versión 10.15), los usuarios tienen que pasar por múltiples pasos manuales para abrir aplicaciones sin firmar.

![macOS Catalina Gatekeeper advertencia: La aplicación no se puede abrir porque el desarrollador
no puede ser verificado](../images/gatekeeper.png)

Como puedes ver, los usuarios tienen dos opciones: Mover la aplicación directamente a la papelera o cancelar la ejecución. Tú no quieres que tus usuarios vean ese diálogo.

Si está construyendo una aplicación Electron que tiene la intención de empaquetar y distribuir, debería estar firmada con el código.

# Firmar & crear macOS de notarización

La preparación adecuada de las aplicaciones macOS para su lanzamiento requiere dos pasos: primero, la aplicación necesita estar firmada con código. Luego, la aplicación necesita ser subida a Apple para un proceso llamado "notarización", donde los sistemas automatizados comprobarán aún más que tu aplicación no está haciendo nada para poner en peligro a sus usuarios.

Para iniciar el proceso, asegúrese de cumplir con los requisitos para firmar y notarizar su aplicación:

1. Afiliate en el [Apple Developer Program][] (requiere un pago anual)
2. Descargar e instalar [Xcode][] - esto requiere un ordenador que ejecuta macOS
3. Genera, descarga e instala [signing certificates][]

El ecosistema de Electron favorece la configuración y la libertad, así que hay múltiples maneras de que tu aplicación sea firmada y notarizada.

## `electron-forge`

Si usas la herramienta de construcción favorita de Electron, firmar tu aplicación y notarizarla requiere algunas adiciones a tu configuración. [Forge](https://electronforge.io) es una colección de las herramientas oficiales de Electron usando [`electron-packager`][], [`electron-osx-sign`][]y [`electron-notarize`][] bajo el capó.

Echemos un vistazo a una configuración de ejemplo con todos los campos requeridos. No todos de ellos son necesarios: las herramientas serán lo suficientemente inteligentes como para encontrar automáticamente una identidad `adecuada`, por ejemplo, pero le recomendamos que sea explícito.

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

El archivo `plist` mencionado aquí necesita los siguientes derechos específicos de macOS para asegurar los mecanismos de seguridad de Apple que tu aplicación está haciendo estas cosas sin tener ningún daño:

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

Para ver todo esto en acción, consulta el código fuente de Electron Fiddle, [especialmente su `electron-forge` archivo de configuración ](https://github.com/electron/fiddle/blob/master/forge.config.js).

Si planeas acceder al micrófono o cámara dentro de tu aplicación usando las API de Electron, también necesitarás añadir los siguientes derechos:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Si estos no están presentes en los derechos de tu aplicación cuando invoque, por ejemplo:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Tu aplicación puede fallar. Consulte la sección de Acceso a Recursos en [Runtime Endurecido](https://developer.apple.com/documentation/security/hardened_runtime) para más información y derechos que pueda necesitar.

## `electron-builder`

Electron Builder viene con una solución personalizada para la firma de su aplicación. Usted puede encontar [its documentation here](https://www.electron.build/code-signing).

## `electron-packager`

Si no está utilizando un pipeline de construcción integrado como Forge o Builder, es probable que esté usando [`electron-packager`][], que incluye [`electron-osx-sign`][] y [`electron-notarize`][].

Si está utilizando la API de Packager, puede pasar [en la configuración que firma y notariza su aplicación](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

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

El archivo `plist` mencionado aquí necesita los siguientes derechos específicos de macOS para asegurar los mecanismos de seguridad de Apple que tu aplicación está haciendo estas cosas sin tener ningún daño:

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

Vea la [Mac App Store Guide][].

# Firmando compilaciones Windows

Antes de Firmar Compilaciones Windows, tu debes hacer lo siguiente:

1. Obtener un certificado de firma de código de Windows Authenticode (requiere una cuota anual)
2. Instale Visual Studio para obtener la utilizada para firmar (la gratis [Community Edition](https://visualstudio.microsoft.com/vs/community/) es suficiente)

Usted puede obtener una certificado de firma de código desde muchos revendedores. Los precios varían, así que puede que valga la pena tu tiempo para comprar. Entre los revendedores populares se incluyen:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Por favor, compra uno para encontrar uno que se adapte a tus necesidades, Google es tu amigo 😄

Hay una serie de herramientas para firmar su aplicación empaquetada:

* [`electron-winstaller`][] generará un instalador para Windows y lo firmará usted
* [`electron-forge`][] puede firmar instaladores que genera a través de Squirrel.Windows o objetivos MSI.
* [`electron-builder`][] can sign some of its windows targets

## Windows Store

Mira la [guía de la Windows Store][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[guía de la Windows Store]: windows-store-guide.md
