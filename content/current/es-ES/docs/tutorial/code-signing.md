# Firma de código

La firma de código es una tecnología de seguridad que usas para certificar que una aplicación fue creada por ti.

En macOS el sistema puede detectar cualquier cambio en la aplicación, tanto si el cambio es introducido accidentalmente como por código malicioso.

On Windows, the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low, will cause security dialogs to appear when users start using your application.  Trust level builds over time so it's better to start code signing as early as possible.

Si bien es posible distribuir aplicaciones sin firmar, no es recomendable. Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the
developer cannot be verified](../images/gatekeeper.png)

Como puedes ver, los usuarios tienen dos opciones: Mover la aplicación directamente a la papelera o cancelar la ejecución. Tú no quieres que tus usuarios vean ese diálogo.

If you are building an Electron app that you intend to package and distribute, it should be code-signed.

# Signing & notarizing macOS builds

Properly preparing macOS applications for release requires two steps: First, the app needs to be code-signed. Then, the app needs to be uploaded to Apple for a process called "notarization", where automated systems will further verify that your app isn't doing anything to endanger its users.

To start the process, ensure that you fulfill the requirements for signing and notarizing your app:

1. Afiliate en el [Apple Developer Program](https://developer.apple.com/programs/) (requiere un pago anual)
2. Download and install [Xcode](https://developer.apple.com/xcode) - this requires a computer running macOS
3. Genera, descarga e instala [signing certificates](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Electron's ecosystem favors configuration and freedom, so there are multiple ways to get your application signed and notarized.

## `electron-forge`

If you're using Electron's favorite build tool, getting your application signed and notarized requires a few additions to your configuration. [Forge](https://electronforge.io) is a collection of the official Electron tools, using [`electron-packager`], [`electron-osx-sign`], and [`electron-notarize`] under the hood.

Let's take a look at an example configuration with all required fields. Not all of them are required: the tools will be clever enough to automatically find a suitable `identity`, for instance, but we recommend that you are explicit.

```json
{
  "name": "mi-app",
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
          "appleIdPassword": "mi-clave-apple-id",
        }
      }
    }
  }
}
```

The `plist` file referenced here needs the following macOS-specific entitlements to assure the Apple security mechanisms that your app is doing these things without meaning any harm:

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

To see all of this in action, check out Electron Fiddle's source code, [especially its `electron-forge` configuration file](https://github.com/electron/fiddle/blob/master/forge.config.js).


## `Electron-builder`

Electron Builder viene con una solución personalizada para la firma de su aplicación. Usted puede encontar [its documentation here](https://www.electron.build/code-signing).

## `Empaquetador de Electron`

If you're not using an integrated build pipeline like Forge or Builder, you are likely using [`electron-packager`], which includes [`electron-osx-sign`] and [`electron-notarize`].

If you're using Packager's API, you can pass [in configuration that both signs and notarizes your application](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

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

The `plist` file referenced here needs the following macOS-specific entitlements to assure the Apple security mechanisms that your app is doing these things without meaning any harm:

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

Vea la [Mac App Store Guide](mac-app-store-submission-guide.md).

# Firmando compilaciones Windows

Antes de Firmar Compilaciones Windows, tu debes hacer lo siguiente:

1. Obtener un certificado de firma de código de Windows Authenticode (requiere una cuota anual)
2. Instale Visual Studio para obtener la utilizada para firmar (la gratis [Community Edition](https://visualstudio.microsoft.com/vs/community/) es suficiente)

Usted puede obtener una certificado de firma de código desde muchos revendedores. Prices vary, so it may be worth your time to shop around. Entre los revendedores populares se incluyen:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Amongst others, please shop around to find one that suits your needs, Google is your friend 😄

Hay una serie de herramientas para firmar su aplicación empaquetada:

- [`electron-winstaller`] generará un instalador para windows y lo firmará por usted
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] puede firmar algunos de los empaques instaladores de windows

## Windows Store

Mira la [guía de la Windows Store](windows-store-guide.md).
