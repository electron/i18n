# systemPreferences

> Obtenha preferências do sistema.

Processo: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Eventos

O objeto `systemPreferences` emite os seguintes eventos:

### Evento: 'accent-color-changed' _Windows_

Retorna:

* `event` Event
* `newColor` String - A nova cor RGBA que o usuário atribuiu a ser seu sistema cor de acento.

### Evento: 'mudança de cor' __do Windows

Retorna:

* `event` Event

### Evento: 'invertido-colorido-scheme-mudança' _Windows_ __preterido

Retorna:

* `event` Event
* `invertedColorScheme` Boolean - `true` se um esquema de cores invertida (um esquema de cores de alto contraste com texto claro e fundos escuros) estiver sendo usado, `false` caso contrário.

**Preterado:** Deve usar o novo evento [`updated`](native-theme.md#event-updated) no módulo `nativeTheme` .

### Evento: 'high-contrast-color-scheme-scheme-changed' _Windows_ _preterido_

Retorna:

* `event` Event
* `highContrastColorScheme` Booleano - `true` se um tema de alto contraste está sendo usado, `false` contrário.

**Preterado:** Deve usar o novo evento [`updated`](native-theme.md#event-updated) no módulo `nativeTheme` .

## Métodos

### `systemPreferences.isDarkMode()` __ __</em> _do   do MacOS</h3>

Devoluções `Boolean` - Se o sistema está no Modo Escuro.

**Preterido:** Deve usar a nova API [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) .

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` __macOS

Devolução `Boolean` - Se a configuração deslizar entre páginas está em jogo.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` __macOS

* `event` Cordas
* Registro `userInfo`<String, any>
* `deliverImmediately` Boolean (opcional) - `true` postar notificações imediatamente mesmo quando o aplicativo de assinatura estiver inativo.

As postagens `event` como notificações nativas do macOS. O `userInfo` é um Object que contém o dicionário de informações do usuário enviado junto com a notificação.

### `systemPreferences.postLocalNotification(event, userInfo)` __macOS

* `event` Cordas
* Registro `userInfo`<String, any>

As postagens `event` como notificações nativas do macOS. O `userInfo` é um Object que contém o dicionário de informações do usuário enviado junto com a notificação.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` __macOS

* `event` Cordas
* Registro `userInfo`<String, any>

As postagens `event` como notificações nativas do macOS. O `userInfo` é um Object que contém o dicionário de informações do usuário enviado junto com a notificação.

### `systemPreferences.subscribeNotification(event, callback)` __macOS

* `event` Cordas
* `callback` Function
  * `event` Cordas
  * Registro `userInfo`<String, unknown>
  * `object` Cordas

Retornos `Number` - O ID desta assinatura

Assina notificações nativas de macOS, `callback` será chamada com `callback(event, userInfo)` quando o `event` correspondente acontecer. O `userInfo` é um Objeto que contém o dicionário de informações do usuário enviado junto com a notificação. O `object` é o remetente da notificação, e só suporta valores `NSString` por enquanto.

A `id` do assinante é devolvida, que pode ser usada para cancelar a inscrição do `event`.

Sob o capô esta API assina `NSDistributedNotificationCenter`, exemplo de valores de `event` são:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorpreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` __macOS

* `event` Cordas
* `callback` Function
  * `event` Cordas
  * Registro `userInfo`<String, unknown>
  * `object` Cordas

Retornos `Number` - O ID desta assinatura

O mesmo que `subscribeNotification`, mas usa `NSNotificationCenter` para padrões locais. Isso é necessário para eventos como `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` __macOS

* `event` Cordas
* `callback` Function
  * `event` Cordas
  * Registro `userInfo`<String, unknown>
  * `object` Cordas

Retornos `Number` - O ID desta assinatura

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` __macOS

* `id` Inteiro

Removes the subscriber with `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` __macOS

* `id` Inteiro

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` __macOS

* `id` Inteiro

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` __macOS

* `defaults` Record<String, String | Boolean | Number> - um dicionário de (`key: value`) padrão de usuário

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` __macOS

* `key` Cordas
* `type` String - Pode ser `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` ou `dictionary`.

Returns `any` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` __macOS

* `key` Cordas
* `type` String - Pode ser `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` ou `dictionary`.
* `value` Cordas

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` __macOS

* `key` Cordas

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` __do Windows

Returns `Boolean` - `true` if [DWM composition][dwm-composition] (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
const { BrowserWindow, systemPreferences } = requer ('elétron')
navegador constOptions = { width: 1000, height: 800 }

// Tornar a janela transparente somente se a plataforma o suportar.
se (process.platform !== 'win32' || sistemaPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Criar a janela.
const win = novo BrowserWindow (browserOptions)

// Navegar.
se (browserOptions.transparent) {
  win.loadURL ('arquivo://${__dirname}/index.html')
} else {
  // Sem transparência, então carregamos um recuo que usa estilos básicos.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` __do macOS do Windows</em> _</h3>

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
cor const = sistemaPreferences.getAccentColor() // '"aabbccdd"'
vermelho const = cor.substr(0, 2) // "aa"
verde const = cor.substr(2, 2) // "bb"
cônso azul = cor.substr(4, 2) // "cc"
const alfa = cor.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` __do macOS do Windows</em> _</h3>

* `color` String - Um dos seguintes valores:
  * No</strong>do Windows **:</p>
    * `3d-dark-shadow` - Sombra escura para elementos de exibição tridimensionais.
    * `3d-face` - Cor facial para elementos de exibição tridimensionais e para diálogo fundo da caixa.
    * `3d-highlight` - Destaque para elementos de exibição tridimensionais.
    * `3d-light` - Cor clara para elementos de exibição tridimensionais.
    * `3d-shadow` - Cor da sombra para elementos de exibição tridimensionais.
    * `active-border` - Fronteira de janela ativa.
    * `active-caption` - Barra de título de janela ativa. Especifica a cor do lado esquerdo gradiente de cor da barra de título de uma janela ativa se o efeito gradiente estiver ativado.
    * `active-caption-gradient` - Cor do lado direito no gradiente de cor de uma barra de título de janela ativa.
    * `app-workspace` - Cor de fundo de vários aplicativos de interface de documento (MDI) .
    * `button-text` - Texto nos botões de pressão.
    * `caption-text` - Texto na legenda, caixa de tamanho e caixa de seta de barra de rolagem.
    * `desktop` - Cor de fundo da área de trabalho.
    * `disabled-text` - Texto cinza (desativado).
    * `highlight` - Item(s) selecionado em um controle.
    * `highlight-text` - Texto de itens(s) selecionados em um controle.
    * `hotlight` - Cor para um hiperlink ou item hot-tracked.
    * `inactive-border` - Fronteira de janela inativa.
    * `inactive-caption` - Legenda de janela inativa. Especifica a cor do lado esquerdo no gradiente de cores da barra de título de uma janela inativa se o efeito gradiente estiver ativado.
    * `inactive-caption-gradient` - Cor do lado direito no gradiente de cor de uma barra de título da janela inativa.
    * `inactive-caption-text` - Cor do texto em uma legenda inativa.
    * `info-background` - Cor de fundo para controles de ponta de ferramenta.
    * `info-text` - Cor de texto para controles de ponta de ferramenta.
    * `menu` - Fundo do menu.
    * `menu-highlight` - A cor usada para destacar itens do menu quando o menu aparece como um menu plano.
    * `menubar` - A cor de fundo da barra de menus quando os menus aparecem como menus de planas.
    * `menu-text` - Texto nos menus.
    * `scrollbar` - Pergaminho barra área cinza.
    * `window` - Fundo da janela.
    * `window-frame` - Moldura da janela.
    * `window-text` - Texto nas janelas.</li>
  * No</strong>macOS **
    * `alternate-selected-control-text` - O texto em uma superfície selecionada em uma lista ou tabela. __preterido
    * `control-background` - O fundo de um grande elemento de interface, como um navegador ou tabela.
    * `control` - A superfície de um controle.
    * `control-text` - O texto de um controle que não está desativado.
    * `disabled-control-text` - O texto de um controle que está desativado.
    * `find-highlight` - A cor de um indicador de achado.
    * `grid` - As linhas de grade de um elemento de interface, como uma tabela.
    * `header-text` - O texto de uma célula de cabeçalho em uma mesa.
    * `highlight` - A fonte de luz virtual na tela.
    * `keyboard-focus-indicator` - O anel que aparece ao redor do controle focado no momento ao usar o teclado para navegação de interface.
    * `label` - O texto de um rótulo contendo conteúdo primário.
    * `link` - Link para outros conteúdos.
    * `placeholder-text` - Uma sequência de espaço reservado em uma exibição de controle ou texto.
    * `quaternary-label` - O texto de um rótulo de menor importância do que um rótulo terciário, como o texto da marca d'água.
    * `scrubber-textured-background` - O fundo de um esfregador na Barra de Toque.
    * `secondary-label` - O texto de um rótulo de menor importância do que um rótulo normal, como um rótulo usado para representar uma subposição ou informações adicionais.
    * `selected-content-background` - O plano de fundo para conteúdo selecionado em uma janela ou exibição de teclas.
    * `selected-control` - A superfície de um controle selecionado.
    * `selected-control-text` - O texto de um controle selecionado.
    * `selected-menu-item-text` - O texto de um menu selecionado.
    * `selected-text-background` - O pano de fundo do texto selecionado.
    * `selected-text` - Texto selecionado.
    * `separator` - Um separador entre diferentes seções de conteúdo.
    * `shadow` - A sombra virtual lançada por um objeto elevado na tela.
    * `tertiary-label` - O texto de um rótulo de menor importância do que um rótulo secundário, como um rótulo usado para representar texto desativado.
    * `text-background` - Texto de fundo.
    * `text` - O texto em um documento.
    * `under-page-background` - O fundo por trás do conteúdo de um documento.
    * `unemphasized-selected-content-background` - O conteúdo selecionado em uma janela ou exibição não-chave.
    * `unemphasized-selected-text-background` - Um plano de fundo para texto selecionado em uma janela ou visualização não-chave.
    * `unemphasized-selected-text` - Texto selecionado em uma janela ou exibição não-chave.
    * `window-background` - O fundo de uma janela.
    * `window-frame-text` - O texto na área da barra de títulos da janela.</li> </ul></li> </ul>

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs][windows-colors] and the [macOS docs][macos-colors] for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` __macOS

* `color` String - Um dos seguintes valores:
  * `Azul`
  * `Brown`
  * `Cinza`
  * `Verde`
  * `Laranja`
  * `Rosa`
  * `Roxo`
  * `Vermelho`
  * `Amarelo`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for  more details.

### `systemPreferences.isInvertedColorScheme()` __ _do Windows_preterido

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` __ __</em> _do   do MacOS</h3>

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` __macOS

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` __ _macOS preterido_

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` __ _macOS preterido_

* | de cordas `appearance` nulo - Pode ser `dark` ou `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` __macOS

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` __macOS

* `reason` String - A razão pela qual você está pedindo a autenticação do Touch ID

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } = require ('electron')

sistemaPreferences.promptTouchID ('Para obter consentimento para uma coisa de segurança fechada').então(sucesso => {
  console.log('Você tem autenticado com sucesso com Touch ID!')
}).catch(err => { console
  .log(err)
})
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` __macOS

* `prompt` Booleano - se o usuário será ou não informado via prompt se o processo atual não é confiável.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` __do macOS do Windows</em> _</h3>

* `mediaType` String - Pode ser `microphone`, `camera` ou `screen`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` __macOS

* `mediaType` String - o tipo de mídia que está sendo solicitada; pode ser `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

Retorna `Object`:

* `shouldRenderRichAnimation` Booleano - Retorna verdadeiro se animações ricas devem ser renderizadas. Analisa o tipo de sessão (por exemplo, ambiente remoto) e as configurações de acessibilidade para dar orientação para animações pesadas.
* `scrollAnimationsEnabledBySystem` Boolean - Determina em uma base por plataforma se as animações de rolagem (por exemplo, produzidas pela chave home/end) devem ser ativadas.
* `prefersReducedMotion` Boolean - Determina se o usuário deseja movimento reduzido com base em APIs da plataforma.

Returns an object with system animation settings.

## Propriedades

### `systemPreferences.appLevelAppearance` __macOS

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` __ _macOS Readonly_

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
