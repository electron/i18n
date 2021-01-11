# Цифровая подпись

Подпись кода - это технология безопасности, которую вы используете для удостоверения того, что приложение было создано вами.

В macOS система может обнаружить любые изменения в приложении, является ли изменение введенным случайно или вредоносным кодом.

В Windows система присваивает уровень доверия вашему коду, подписывающему сертификат , который если у вас нет, или, если уровень доверия низкий, вызовет появление диалогов безопасности когда пользователи начнут использовать ваше приложение.  Уровень доверия строится со временем, поэтому лучше начать подпись кода как можно раньше.

Можно распространять неподписанные приложения, но не рекомендуется. По умолчанию Windows и macOS предотвратят загрузку или выполнение неподписанных приложений. Начиная с macOS Catalina (версия 10.15), пользователи должны пройти несколько ручных шагов для открытия неподписанных приложений.

![macOS Catalina Gatekeeper предупреждает: Приложение не может быть открыто, потому что
разработчик не может быть проверен](../images/gatekeeper.png)

Как видите, пользователи получают два варианта: Переместить приложение прямо в корзину или отменить его выполнение. Вы не хотите, чтобы ваши пользователи видели это диалоговое окно.

Если вы создаете приложение Electron, которое вы собираетесь поставлять и распространять, то оно должно быть подписано кодом.

# Подписание & нотариальная сборка macOS

Правильная подготовка приложений для выпуска требует двух шагов: во-первых, приложение должно быть подписано кодом. Затем, приложение должно быть загружено в Apple для процесса под названием "нотаризация", где автоматизированные системы будут проверять, что ваше приложение не делает ничего для создания угрозы своим пользователям.

Чтобы начать процесс, убедитесь, что вы выполнили требования для подписания и заверяете ваше приложение:

1. Зарегистрироваться в [Apple Developer Program](https://developer.apple.com/programs/) (требует оплату раз в год)
2. Скачать и установить [Xcode](https://developer.apple.com/xcode) - для этого требуется компьютер под управлением macOS
3. Сгенерировать [подписанные сертификаты](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Конфигурация и свобода экосистем Electron, так что есть несколько способов подписать ваше приложение и заверять его нотариально.

## `electron-forge`

Если вы используете любимый инструмент для сборки Electron, то для того, чтобы ваше приложение подписано и нотариально заверено требуется несколько дополнений к вашей конфигурации. [Кузка](https://electronforge.io) представляет собой набор официальных инструментов Electron, используя [`электро-упаковщик`], [`Электрон-осс-знак`] и [`Электрон-нотариус`] под капюшоном.

Давайте рассмотрим конфигурацию примера со всеми обязательными полями. Необходимы не все из них: инструменты будут достаточно умными, чтобы автоматически найти подходящий `идентификатор`, Например, но мы рекомендуем вам откровенно.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "материальные права": "материальные права. список",
          "права наследования": "права собственности". список",
          "флаги подписи": "библиотека"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

`plist` файл, на который ссылаются ссылки должны быть предоставлены следующие права для того, чтобы удостовериться в том, что ваше приложение делает эти вещи без каких-либо вредов:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Чтобы увидеть все это в действии, просмотрите исходный код Electron Fiddle, [особенно его `electron-forge` конфигурации файла](https://github.com/electron/fiddle/blob/master/forge.config.js).

Если вы планируете получить доступ к микрофону или камере в вашем приложении с помощью API Electron, вам также нужно добавить следующие права:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Если эти права отсутствуют в вашем приложении, например:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Ваше приложение может произойти сбой. Смотрите раздел доступа к ресурсам в [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) для получения дополнительной информации и дополнительных прав.

## `electron-builder`

Electron Builder поставляется с пользовательским решением для подписания вашего приложения. вы можете найти [его документацию здесь](https://www.electron.build/code-signing).

## `electron-packager`

Если вы не используете встроенную конвейерную линию сборки типа Forge или Builder, то скорее всего вы используете [`электродвигатель`], которая включает [`Электронный Знак`] и [`Электронотариально нотариально`].

Если вы используете API Packager, вы можете передать [в конфигурации, что оба знака и заверяет ваше приложение ](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    entitments: 'entitlements. list',
    'Право наследования': 'материальные права'. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

`plist` файл, на который ссылаются ссылки должны быть предоставлены следующие права для того, чтобы удостовериться в том, что ваше приложение делает эти вещи без каких-либо вредов:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llow-jit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com. pple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Смотрите [Mac App Store Guide](mac-app-store-submission-guide.md).

# Подписывание сборок для Windows

Перед подписью, следует:

1. Получить сертификат для подписания кода аутентификации Windows (требуется ежегодная плата)
2. Установите Visual Studio для получения утилиты подписи (бесплатная версия [ Community Edition](https://visualstudio.microsoft.com/vs/community/) достаточно)

Вы можете получить сертификат подписи кода у многих реселлеров. Цены варьируются, поэтому может стоить вашего времени для покупок. Популярные реселлеры включают:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Среди других, пожалуйста, купите, чтобы найти тот, который подходит вашим потребностям, Google является вашим другом 😄

Существует ряд инструментов для подписывания приложений:

* [`Электрон-winstaller`] создаст программу установки для Windows и подпишет ее за вас
* [`Электронная ковка`] может подписать процесс установки, который он генерирует через Squirrel.Windows или MSI цели.
* [`electron-builder`] подписывает некоторые приложения для Windows

## Windows Store

Смотри страницу [Windows Store Guide](windows-store-guide.md).
