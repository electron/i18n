# Firma de código

La firma de código es una tecnología de seguridad que usas para certificar que una aplicación fue creada por ti.

En macOS el sistema puede detectar cualquier cambio en la aplicación, tanto si el cambio es introducido accidentalmente como por código malicioso.

En Windows el sistema asigna un nivel de confianza a tu certificado de firma de código, si tu nivel de confianza es bajo o no tienes, se mostrará un dialogo de seguridad que aparecerá cuando el usuario comience a usar tu aplicación. El nivel de confianza aumenta con el tiempo, por lo que es mejor iniciar la firma del código lo antes posible.

Si bien es posible distribuir aplicaciones sin firmar, no es recomendable. Tanto Windows como macOS evitarán, por defecto, la descarga o la ejecución de aplicaciones sin firmar. A partir de macOS Catalina (versión 10.15), los usuarios tienen que pasar por múltiples pasos manuales para abrir aplicaciones sin firmar.

![Advertencia de macOS Catalina Gatekeeper: La aplicación no se puede abrir porque el desarrollador no puede ser verificado](../images/gatekeeper.png)

Como puedes ver, los usuarios tienen dos opciones: Mover la aplicación directamente a la papelera o cancelar la ejecución. Tú no quieres que tus usuarios vean ese diálogo.

If you are building an Electron app that you intend to package and distribute, it should be code-signed. Las tiendas de aplicaciones de Mac y Windows no permiten aplicaciones no firmadas.

# Firmando compilaciones Mac

Antes de Firmar aplicaciones macOS, debes hacer lo siguiente:

1. Afiliate en el [Apple Developer Program](https://developer.apple.com/programs/) (requiere un pago anual)
2. Descarga e instala [Xcode](https://developer.apple.com/xcode)
3. Genera, descarga e instala [signing certificates](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Hay una serie de herramientas para firmar su aplicación empaquetada:

- [`electron-osx-sign`] Es una herramienta independiente para firmar paquetes macOS.
- [`electron-packager`] en conjunto con `electron-osx-sign`. Si tu no estas usando`electron-packager`, pasa la bandera `--osx-sign=true` para firmar tu compilación. 
    - [`electron-forge`] usa `electron-packager` internamente, tu puede colocar la opción `osxSign` en tu configuración.
- [`electron-builder`] tiene incorporada capacidades de firma de código. Mira [electron.build/code-signing](https://www.electron.build/code-signing)

## Notarization

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification *before* distributing the app to your users.

To automate this process, you can use the [`electron-notarize`] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide](mac-app-store-submission-guide.md).

# Firmando compilaciones Windows

Antes de Firmar Compilaciones Windows, tu debes hacer lo siguiente:

1. Obtener un certificado de firma de código de Windows Authenticode (requiere una cuota anual)
2. Instala Visual Studio 2015/2017 (para obtener la utilidad de firmado)

Usted puede obtener una certificado de firma de código desde muchos revendedores. Los precios varían, así que puede que valga la pena tu tiempo para comparar precios. Entre los revendedores populares se incluyen:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Entre otros, compare para encontrar uno que se adapte a sus necesidades, Google es tu amigo :)

Hay una serie de herramientas para firmar su aplicación empaquetada:

- [` electron-winstaller </ 0>] generará un instalador para Windows y lo firmará</li>
<li>[<code> electron-forge </ 0>] puede firmar los instaladores generados por Squirrel.Windows o MSI.</li>
<li>[<code>electron-builder`] puede firmar algunos de los empaques instaladores de windows

## Windows Store

Mira la [guía de la Windows Store](windows-store-guide.md).