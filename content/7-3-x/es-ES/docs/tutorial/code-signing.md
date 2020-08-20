# Firma de código

La firma de código es una tecnología de seguridad que usas para certificar que una aplicación fue creada por ti.

En macOS el sistema puede detectar algún cambio en la aplicación, si el cambio es introducido accidentalmente o por código malicioso.

En Windows el sistema asigna un nivel de confianza a tu certificado de firma de código, si tu nivel de confianza es bajo o no tienes, se mostrará un dialogo de seguridad que aparecerá cuando el usuario comience a usar tu aplicación.  El nivel de confianza aumenta con el tiempo, por lo que es mejor iniciar la firma del código lo antes posible.

Si bien es posible distribuir aplicaciones sin firmar, no es recomendable. Por ejemplo, esto es lo que los usuarios de macOS ven cuando intentan iniciar una aplicación sin firmar:

![advertencia de aplicación sin firma en macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> La aplicación no puede ser abierta porque es de un desarrollador no identificado

Si tu estas haciendo una aplicación Electron que tu quieres empaquetar y distribuir, debería ser de código firmado. Las tiendas de aplicaciones de Mac y Windows no permiten aplicaciones no firmadas.

# Firmando compilaciones Mac

Antes de Firmar aplicaciones macOS, debes hacer lo siguiente:

1. Afiliate en el [Apple Developer Program][] (requiere un pago anual)
2. Descarga e instala [Xcode][]
3. Genera, descarga e instala [signing certificates][]

Hay una serie de herramientas para firmar su aplicación empaquetada:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Si tu no estas usando`electron-packager`, pasa la bandera `--osx-sign=true` para firmar tu compilación.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Mira [electron.build/code-signing](https://www.electron.build/code-signing)

Para mas información, mira la [ Guia de envio de la Mac App Store ][].

# Firmando compilaciones Windows

Antes de Firmar Compilaciones Windows, tu debes hacer lo siguiente:

1. Obtener un certificado de firma de código de Windows Authenticode (requiere una cuota anual)
2. Instala Visual Studio 2015/2017 (para obtener la utilidad de firmado)

Usted puede obtener una certificado de firma de código desde muchos revendedores. Los precios varían, así que puede que valga la pena tu tiempo para comparar precios. Entre los revendedores populares se incluyen:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Entre otros, compare para encontrar uno que se adapte a sus necesidades, Google es tu amigo :)

Hay una serie de herramientas para firmar su aplicación empaquetada:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

Mira la [guía de la Windows Store][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[ Guia de envio de la Mac App Store ]: mac-app-store-submission-guide.md
[guía de la Windows Store]: windows-store-guide.md
