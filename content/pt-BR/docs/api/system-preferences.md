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

O mesmo que `subscribeNotification`, mas usa `NSWorkspace.sharedWorkspace.notificationCenter`. Isso é necessário para eventos como `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` __macOS

* `id` Inteiro

Remove o assinante com `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` __macOS

* `id` Inteiro

O mesmo que `unsubscribeNotification`, mas remove o assinante de `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` __macOS

* `id` Inteiro

O mesmo que `unsubscribeNotification`, mas remove o assinante de `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` __macOS

* `defaults` Record<String, String | Boolean | Number> - um dicionário de (`key: value`) padrão de usuário

Adicione os padrões especificados aos `NSUserDefaults`do aplicativo .

### `systemPreferences.getUserDefault(key, type)` __macOS

* `key` Cordas
* `type` String - Pode ser `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` ou `dictionary`.

Retorno `any` - O valor da `key` em `NSUserDefaults`.

Alguns `key` populares e `type`são:

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

Definir o valor da `key` em `NSUserDefaults`.

Note que `type` deve corresponder ao tipo real de `value`. Uma exceção é lançada se não o fizerem.

Alguns `key` populares e `type`são:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` __macOS

* `key` Cordas

Remove o `key` em `NSUserDefaults`. Isso pode ser usado para restaurar o valor padrão ou global de um `key` previamente definido com `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` __do Windows

Devoluções `Boolean` - `true` se [][dwm-composition] de composição DWM (Aero Glass) estiver habilitado e `false` contrário.

Um exemplo de usá-lo para determinar se você deve criar uma janela transparente ou não (janelas transparentes não funcionarão corretamente quando a composição do DWM estiver desativada):

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

Devoluções `String` - Os usuários atuais preferência de cor de acento amplo do sistema em RGBA forma hexadícida.

```js
cor const = sistemaPreferences.getAccentColor() // '"aabbccdd"'
vermelho const = cor.substr(0, 2) // "aa"
verde const = cor.substr(2, 2) // "bb"
cônso azul = cor.substr(4, 2) // "cc"
const alfa = cor.substr(6, 2) // "dd"
```

Esta API só está disponível no macOS 10.14 Mojave ou mais recente.

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

Retorna `String` - A configuração de cor do sistema na forma hexadecimal RGB (`#ABCDEF`). Veja os [documentos do Windows][windows-colors] e os [os][macos-colors] os documentos do macOS para obter mais detalhes.

As seguintes cores estão disponíveis apenas no macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`e `unemphasized-selected-text`.

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

Retornos `String` - A cor padrão do sistema formatado como `#RRGGBBAA`.

Retorna uma das várias cores padrão do sistema que se adaptam automaticamente à vibração e alterações nas configurações de acessibilidade como 'Aumentar o contraste' e 'Reduzir a transparência'. Consulte [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) para obter mais detalhes.

### `systemPreferences.isInvertedColorScheme()` __ _do Windows_preterido

Devoluções `Boolean` - `true` se um esquema de cores invertida (um esquema de cores de alto contraste com texto claro e fundos escuros) estiver ativo, `false` caso contrário.

**Preterido:** Deve usar a nova API [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) .

### `systemPreferences.isHighContrastColorScheme()` __ __</em> _do   do MacOS</h3>

Retorna `Boolean` - `true` se um tema de alto contraste estiver ativo, `false` caso contrário.

**Preterido:** Deve usar a nova API [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) .

### `systemPreferences.getEffectiveAppearance()` __macOS

Retorna `String` - Pode ser `dark`, `light` ou `unknown`.

Obtém a configuração de aparência macOS que é aplicada atualmente ao seu aplicativo, mapas para [NSApplication.effectiveAexa](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` __ _macOS preterido_

Retorno `String` | `null` - Pode ser `dark`, `light` ou `unknown`.

Obtém a configuração de aparência do macOS que você declarou que deseja para seu aplicativo, mapas para [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Você pode usar a API `setAppLevelAppearance` para definir esse valor.

### `systemPreferences.setAppLevelAppearance(appearance)` __ _macOS preterido_

* | de cordas `appearance` nulo - Pode ser `dark` ou `light`

Define a configuração de aparência para o seu aplicativo, isso deve substituir o padrão do sistema e substituir o valor de `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` __macOS

Retorna `Boolean` - se este dispositivo tem ou não a capacidade de usar o Touch ID.

**NOTA:** Esta API retornará `false` em sistemas macOS mais antigos que o Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` __macOS

* `reason` String - A razão pela qual você está pedindo a autenticação do Touch ID

Devoluções `Promise<void>` - resolve se o usuário tiver autenticado com sucesso com o Touch ID.

```javascript
const { systemPreferences } = require ('electron')

sistemaPreferences.promptTouchID ('Para obter consentimento para uma coisa de segurança fechada').então(sucesso => {
  console.log('Você tem autenticado com sucesso com Touch ID!')
}).catch(err => { console
  .log(err)
})
```

Esta API em si não protegerá seus dados de usuário; em vez disso, é um mecanismo para permitir que você faça isso. Os aplicativos nativos precisarão definir [as constantes de controle de acesso](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) como [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) na entrada do chaveiro para que a leitura seja solicitada automaticamente para o consentimento biométrico do Touch ID. Isso poderia ser feito com [`node-keytar`](https://github.com/atom/node-keytar), de tal forma que se armazenaria uma chave de criptografia com `node-keytar` e só a buscaria se `promptTouchID()` resolvesse.

**NOTA:** Esta API retornará uma promessa rejeitada em sistemas macOS mais antigos que a Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` __macOS

* `prompt` Booleano - se o usuário será ou não informado via prompt se o processo atual não é confiável.

Devolução `Boolean` - `true` se o processo atual for um cliente de acessibilidade confiável e `false` se não for.

### `systemPreferences.getMediaAccessStatus(mediaType)` __do macOS do Windows</em> _</h3>

* `mediaType` String - Pode ser `microphone`, `camera` ou `screen`.

Retorna `String` - Pode ser `not-determined`, `granted`, `denied`, `restricted` ou `unknown`.

Esse consentimento do usuário não foi exigido no macOS 10.13 High Sierra ou inferior para que este método sempre retorne `granted`. macOS 10.14 Mojave ou superior requer consentimento para acesso `microphone` e `camera` . macOS 10.15 Catalina ou superior requer consentimento para acesso `screen` .

O Windows 10 tem uma configuração global que controla `microphone` e `camera` acesso para todos os aplicativos win32. Ele sempre retornará `granted` para `screen` e para todos os tipos de mídia em versões mais antigas do Windows.

### `systemPreferences.askForMediaAccess(mediaType)` __macOS

* `mediaType` String - o tipo de mídia que está sendo solicitada; pode ser `microphone`, `camera`.

Devoluções `Promise<Boolean>` - Uma promessa que resolve com `true` se o consentimento foi concedido e `false` se foi negado. Se uma `mediaType` inválida for aprovada, a promessa será rejeitada. Se uma solicitação de acesso for negada e posteriormente for alterada através do painel Preferências do sistema, uma reinicialização do aplicativo será necessária para que as novas permissões entrem em vigor. Se o acesso já foi solicitado e negado, _deve_ ser alterado através do painel de preferência; um alerta não aparecerá e a promessa será resolvida com o status de acesso existente.

**Importante:** Para aproveitar adequadamente esta API, você [deve definir](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) as `NSMicrophoneUsageDescription` e `NSCameraUsageDescription` strings no arquivo `Info.plist` do seu aplicativo. Os valores dessas chaves serão usados para preencher as caixas de permissão para que o usuário seja devidamente informado quanto à finalidade da solicitação de permissão. Consulte [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) para obter mais informações sobre como defini-las no contexto de Electron.

Esse consentimento do usuário não era necessário até o macOS 10.14 Mojave, então este método sempre retornará `true` se o seu sistema estiver funcionando 10.13 High Sierra ou inferior.

### `systemPreferences.getAnimationSettings()`

Retorna `Object`:

* `shouldRenderRichAnimation` Booleano - Retorna verdadeiro se animações ricas devem ser renderizadas. Analisa o tipo de sessão (por exemplo, ambiente remoto) e as configurações de acessibilidade para dar orientação para animações pesadas.
* `scrollAnimationsEnabledBySystem` Boolean - Determina em uma base por plataforma se as animações de rolagem (por exemplo, produzidas pela chave home/end) devem ser ativadas.
* `prefersReducedMotion` Boolean - Determina se o usuário deseja movimento reduzido com base em APIs da plataforma.

Retorna um objeto com configurações de animação do sistema.

## Propriedades

### `systemPreferences.appLevelAppearance` __macOS

Uma propriedade `String` que pode ser `dark`, `light` ou `unknown`. Ele determina a configuração de aparência do macOS para seu aplicativo. Isso mapeia os valores em: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Definindo isso irá anular a padrão do sistema, bem como o valor de `getEffectiveAppearance`.

Os valores possíveis que podem ser definidos são `dark` e `light`, e os possíveis valores de retorno são `dark`, `light`e `unknown`.

Esta propriedade só está disponível no macOS 10.14 Mojave ou mais recente.

### `systemPreferences.effectiveAppearance` __ _macOS Readonly_

Uma propriedade `String` que pode ser `dark`, `light` ou `unknown`.

Retorna a configuração de aparência do macOS que está atualmente aplicada ao seu aplicativo, mapas para [NSApplication.effectiveAexa](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
