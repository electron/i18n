# Supporting macOS Dark Mode

No macOS 10.14 Mojave, a Apple introduziu um novo [system-wide dark mode](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) para todos computadores macOS.  Se seu app Electron tiver um modo escuro, você pode fazer isso seguir o modo de sistema em modo escuro usando [o `nativeTheme` api](../api/native-theme.md).

No macOS 10.15 Catalina, a Apple introduziu uma nova opção "automática" de modo escuro para todos os computadores do macOS. Em ordem `nativeTheme. houldUseDarkColors` e `Bandeja` APIs para funcionar corretamente nesse modo na Catalina, você precisa ter `NSRequiresAquaSystemAppearance` definido como `false` nas suas `informações. lista` arquivo, ou esteja no Electron `>=7.0.0`. Both [Electron Packager][electron-packager] and [Electron Forge][electron-forge] have a [`darwinDarkModeSupport` option][packager-darwindarkmode-api] to automate the `Info.plist` changes during app build time.

## Atualiza automaticamente as interfaces nativas

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically, anything where the UI comes from macOS and not your app. As of Electron 7.0.0, the default behavior is to opt in to this automatic theming from the OS. Se você deseja desativar e estiver usando Electron
&gt; 8.0. , você deve definir a chave `NSRequiresAquaSystemAppearance` no arquivo `Info.plist` para `true`. Observe que Electron 8.0. e acima não vai deixar seu opt-out deste tema, devido ao uso do macOS 10.14 SDK.

## Atualiza automaticamente suas próprias interfaces

Se seu app tem seu próprio modo escuro, você deve ativá-lo e desligar a sincronização com a configuração de modo escuro do sistema. Você pode fazer isso ao ouvir o evento atualizado de tema no módulo `nativeTheme` do Electron.

Como por exemplo:

```javascript
const { nativeTheme } = require('electron')

nativeTheme.on('atualizado', função theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors)
})
```

[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
