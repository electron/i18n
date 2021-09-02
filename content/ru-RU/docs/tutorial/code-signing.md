# Подписывание кода

Подпись кода - это технология безопасности, которую вы используете для удостоверения того, что приложение было создано вами.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

On Windows, the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low, will cause security dialogs to appear when users start using your application.  Trust level builds over time so it's better to start code signing as early as possible.

Можно распространять неподписанные приложения, но не рекомендуется. Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![предупреждение macOS Catalina Gatekeeper: Не удается открыть приложение, так как
разработчик не может быть проверен](../images/gatekeeper.png)

As you can see, users get two options: Move the app straight to the trash or cancel running it. You don't want your users to see that dialog.

If you are building an Electron app that you intend to package and distribute, it should be code-signed.

# Signing & notarizing macOS builds

Properly preparing macOS applications for release requires two steps: First, the app needs to be code-signed. Then, the app needs to be uploaded to Apple for a process called "notarization", where automated systems will further verify that your app isn't doing anything to endanger its users.

To start the process, ensure that you fulfill the requirements for signing and notarizing your app:

1. Зарегистрироваться в [Apple Developer Program][] (требует оплату раз в год)
2. Download and install [Xcode][] - this requires a computer running macOS
3. Сгенерировать [подписанные сертификаты][]

Electron's ecosystem favors configuration and freedom, so there are multiple ways to get your application signed and notarized.

## `electron-forge`

If you're using Electron's favorite build tool, getting your application signed and notarized requires a few additions to your configuration. [Forge](https://electronforge.io) is a collection of the official Electron tools, using [`electron-packager`][], [`electron-osx-sign`][], and [`electron-notarize`][] under the hood.

Let's take a look at an example configuration with all required fields. Not all of them are required: the tools will be clever enough to automatically find a suitable `identity`, for instance, but we recommend that you are explicit.

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

The `plist` file referenced here needs the following macOS-specific entitlements to assure the Apple security mechanisms that your app is doing these things without meaning any harm:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Обратите внимание, что до Electron 12 также требовалось право на `com.apple.security.cs.allow-unsigned-executable-memory`. Тем не менее, его больше не следует использовать, если есть возможность.

To see all of this in action, check out Electron Fiddle's source code, [especially its `electron-forge` configuration file](https://github.com/electron/fiddle/blob/master/forge.config.js).

If you plan to access the microphone or camera within your app using Electron's APIs, you'll also need to add the following entitlements:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

If these are not present in your app's entitlements when you invoke, for example:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Your app may crash. See the Resource Access section in [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) for more information and entitlements you may need.

## `electron-builder`

Electron Builder comes with a custom solution for signing your application. You can find [its documentation here](https://www.electron.build/code-signing).

## `electron-packager`

If you're not using an integrated build pipeline like Forge or Builder, you are likely using [`electron-packager`][], which includes [`electron-osx-sign`][] and [`electron-notarize`][].

Если вы используете API Packager, вы можете передать [то, что подписывает и заверяет нотариально ваше приложение ](https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html).

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
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Вплоть до Electron 12 элемент `com.apple.security.cs.allow-unsigned-executable-memory` обязателен. Тем не менее, его больше не следует использовать, если есть возможность.

## Mac App Store

See the [Mac App Store Guide][].

# Подписывание сборок для Windows

Перед подписью, следует:

1. Получить сертификат для подписания кода аутентификации Windows (требуется ежегодная плата)
2. Установите Visual Studio для получения утилиты подписи (бесплатной версия [ Community Edition](https://visualstudio.microsoft.com/vs/community/) достаточно)

Вы можете получить сертификат от множества продавцов, включая самых популярных. Цены варьируются, поэтому это может стоить вашего времени, чтобы ходить по магазинам. Популярные реселлеры включают:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* Amongst others, please shop around to find one that suits your needs, Google is your friend 😄

Существует ряд инструментов для подписывания приложений:

* [`electron-winstaller`][] will generate an installer for windows and sign it for you
* [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
* [`electron-builder`][] can sign some of its windows targets

## Windows Store

Смотри страницу [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[подписанные сертификаты]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
