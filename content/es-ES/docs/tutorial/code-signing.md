# Firma de código

Firma de código es una tecnología de seguridad que usas para certificar que una aplicación fue creada por ti.

En macOS el sistema puede detectar algún cambio en la aplicación, si el cambio es introducido accidentalmente o por código malicioso.

En Windows el sistema asigna un nivel de confianza a tu certificado de firma de código, si tu nivel de confianza es bajo o no tienes, se mostrará un dialogo de seguridad que aparecerá cuando el usuario comience a usar tu aplicación. El nivel de confianza aumenta con el tiempo, por lo que es mejor iniciar la firma del código lo antes posible.

Si bien es posible distribuir aplicaciones sin firmar, no es recomendable. Por ejemplo, esto es lo que los usuarios de macOS ven cuando intentan iniciar una aplicación sin firmar:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> La aplicación no puede ser abierta porque es de un desarrollador no identificado

Si tu estas haciendo una aplicación Electron que tu quieres empaquetar y distribuir, debería ser de código firmado. Las tiendas de aplicaciones de Mac y Windows no permiten aplicaciones no firmadas.

# Firmando aplicaciones Mac

Antes de Firmar aplicaciones macOS, debes hacer lo siguiente:

1. Afiliate en el [Apple Developer Program](https://developer.apple.com/programs/) (requiere un pago anual)
2. Descarga e instala [Xcode](https://developer.apple.com/xcode)
3. Genera, descarga e instala [signing certificates](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Hay un numero de herramientas para firmar tu aplicación empaquetada:

- [`electron-osx-sign`] Es una herramienta independiente para firmar paquetes macOS.
- [`electron-packager`] en conjunto con `electron-osx-sign`. Si tu no estas usando`electron-packager`, pasa la bandera `--osx-sign=true` para firmar tu compilación. 
    - [`electron-forge`] usa `electron-packager` internamente, tu puede colocar la opción `osxSign` en tu configuración.
- [`electron-builder`] tiene incorporada capacidades de firma de código. Mira [electron.build/code-signing](https://www.electron.build/code-signing)

Para mas información, mira la [ Guia de envio de la Mac App Store ](mac-app-store-submission-guide.md).

# Signing Windows builds

Before signing Windows builds, you must do the following:

1. Get a Windows Authenticode code signing certificate
2. Install Visual Studio 2015/2017 (to get the signing utility)

You can get a code signing certificate from a lot of resellers, popular ones include:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

Hay un numero de herramientas para firmar tu aplicación empaquetada:

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide](windows-store-guide.md).