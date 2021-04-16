# BrowserWindow

> Crier e controle janelas de navegação.

Processo: [Main](../glossary.md#main-process)

```javascript
// No processo main.
const { BrowserWindow } = require ('electron')

const win = novo BrowserWindow({ width: 800, height: 600 })

// Carregue uma URL remota
win.loadURL('https://github.com')

// Ou carregue um arquivo HTML local
win.loadURL('arquivo://${__dirname}/app/index.html')
```

## Janela sem frame

Para criar uma janela sem frame ou uma janela transparente de formato arbitrário, use a API [Frameless Window](frameless-window.md).

## Exibindo janela de forma elegante

Ao carregar uma página na janela diretamente, os usuários podem ver a carga da página incrementalmente, o que não é uma boa experiência para um aplicativo nativo. Para fazer a tela da janela sem flash visual, existem duas soluções para situações diferentes.

## Utilizando o evento `ready-to-show`

Enquanto a página é carregada, o evento `ready-to-show` será disparado quando o processo de renderização estiver renderizado completamente a página pela primeira vez, caso a janela ainda não tenha sido exibida. Exibindo a janela após este evento não resultará em um flash visual:

```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow({ show: false })
win.once ('ready-to-show', () => {
  win.show()
})
```

Este evento geralmente é emitido depois do evento `did-finish-load`, porém para páginas com vários recursos remotos, tal evento pode ser emitido antes.

Observe que o uso deste evento implica que o renderizador será considerado "visível" e pintura, mesmo que `show` seja falsa.  Este evento nunca disparará se você usar `paintWhenInitiallyHidden: false`

## Configurando `backgroundColor`

Para um aplicativo complexo, o evento `ready-to-show` poderia ser emitido tarde demais, fazendo com que o aplicativo aparente lentidão. Neste caso, é recomendado exibir a janela imediatamente e utilizar a propriedade `backgroundColor` com cor semelhante a cor de fundo do seu aplicativo:

```javascript
const { BrowserWindow } = require('electron')

const win = novo BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL ('https://github.com')
```

Note que mesmo para aplicativos que utilizam o evento `ready-to-show`, é recomendado informar a propriedade `backgroundColor` para fazer com que o aplicativo passe a sensação de um aplicativo nativo.

## Janelas parent e child

Ao utilizar a opção `parent`, é possível criar janelas secundarias:

```javascript
const { BrowserWindow } = require ('electron')

const top = novo BrowserWindow()
criança const = novo BrowserWindow({ parent: top })
child.show()
top.show()
```

A janela secundaria (`child`) sempre será exibida em frente a janela principal (`top`).

## Janelas Modais

Uma janela modal é uma janela secundaria que desabilita a janela principal, para criar uma janela moda, você deve especificar ambas opções `parent` e `modal`:

```javascript
const { BrowserWindow } = require ('electron')

const child = novo BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once ('ready-to-show', () => {
  child.show()
})
```

## Visibilidade de página

A [API de visibilidade de página][page-visibility-api] funciona da seguinte forma:

* Em todas as plataformas, o estado de visibilidade verifica quando a janela é ocultada/minimizada ou não.
* Adicionalmente, no macOS, o estado de visibilidade também verifica o estado de oclusão da janela. Se a janela estive obstruída (ou seja, completamente coberta) por outra janela, o estado de visibilidade será `hidden`. Em outras plataformas, o estado de visibilidade será `hidden` somente quando a janela for minimizada ou explicitamente ocultada com o método `win.hide()`.
* Se um `BrowserWindow` é criado com a propriedade `show: false`, a visibilidade inicial será `visible` independente da janela estar de fato ocultada.
* Se a propriedade `backgroundThrottling` estive desativado, o estado de visibilidade continuará `visible` mesmo que a janela esteja minimizada, ocultada ou escondida.

É recomendado que você pause operações "caras" quando o estado de visibilidadade for `hidden` com o objetivo de minimizar o consumo de energia.

## Avisos de plataformas

* No macOS, janelas modal serão exibidas como "folhas" vinculadas a janela principal.
* No macOS, as janelas secundarias manterão a posição relativa com a janela principal quando a mesma se mover, enquanto que no Windows e Linux as janelas secundarias não se movem.
* No Linux, o tipo de janelas modais será modificado para `dialog`.
* No Linux, vários ambientes desktop não há suporte para esconder uma janela modal.

## Class: BrowserWindow

> Crier e controle janelas de navegação.

Processo: [Main](../glossary.md#main-process)

`BrowserWindow` é um [][event-emitter]eventEmitter.

O mesmo cria um novo `BrowserWindow` com propriedades nativas informadas como a opção `options`.

### `novo BrowserWindow ([options])`

* objeto `options` (opcional)
  * `width` Inteiro (opcional) - Largura da janela em pixels. O padrão é `800`.
  * `height` Inteiro (opcional) - Altura da janela em pixels. O padrão é `600`.
  * `x` Integer (opcional) - (**necessário** se y for usado) A janela é deslocada da tela. Padrão é centralizar a janela.
  * `y` Integer (opcional) - (**necessário** se x for usado) Deslocamento superior da janela da tela. Padrão é centralizar a janela.
  * `useContentSize` Booleano (opcional) - O `width` e `height` seria usado como tamanho de página de web, o que significa que o tamanho da janela real incluirá o tamanho do quadro de e será ligeiramente maior. Por padrão é `false`.
  * `center` Boolean (opcional) - Mostra a janela no centro da tela.
  * `minWidth` Inteiro (opcional) - Largura mínima da janela. O padrão é `0`.
  * `minHeight` Inteiro (opcional) - Altura mínima da janela. O padrão é `0`.
  * `maxWidth` Inteiro (opcional) - Largura máxima da janela. Padrão não é limite.
  * `maxHeight` Inteiro (opcional) - Altura máxima da janela. Padrão não é limite.
  * `resizable` Booleano (opcional) - Se a janela é resizável. O padrão é `true`.
  * `movable` Booleano (opcional) - Se a janela é móvel. Isso não é implementado no Linux. O padrão é `true`.
  * `minimizable` Booleano (opcional) - Se a janela é minimizada. Isso não é implementado no Linux. O padrão é `true`.
  * `maximizable` Booleano (opcional) - Se a janela é maximizável. Isso não é implementado no Linux. O padrão é `true`.
  * `closable` Booleano (opcional) - Se a janela é closable. Isso não é implementado no Linux. O padrão é `true`.
  * `focusable` Boolean (opcional) - Se a janela pode ser focada. O padrão é `true`. Na configuração do Windows `focusable: false` também implica a configuração `skipTaskbar: true`. Na configuração do Linux `focusable: false` faz com que a janela pare de interagir com wm, de modo que a janela sempre ficará no topo em todos os espaços de trabalho .
  * `alwaysOnTop` Booleano (opcional) - Se a janela deve ficar sempre em cima de outras janelas. Por padrão é `false`.
  * `fullscreen` Boolean (opcional) - Se a janela deve aparecer na tela cheia. Quando explicitamente definido para `false` o botão fullscreen será oculto ou desativado no macOS. Por padrão é `false`.
  * `fullscreenable` Booleano (opcional) - Se a janela pode ser colocada no modo de tela cheia. No macOS, também se o botão maxim/zoom deve alternar o modo de tela completo ou maximizar a janela. O padrão é `true`.
  * `simpleFullscreen` Boolean (opcional) - Use tela completa pré-Lion no macOS. Por padrão é `false`.
  * `skipTaskbar` Boolean (opcional) - Quer mostrar a janela na barra de tarefas. O padrão é `false`.
  * `kiosk` Boolean (opcional) - Se a janela está no modo quiosque. Por padrão é `false`.
  * `title` String (opcional) - Título da janela padrão. O padrão é `"Electron"`. Se a tag HTML `<title>` for definida no arquivo HTML carregado por `loadURL()`, esta propriedade será ignorada.
  * `icon` (</a> | NativeImage

String) (opcional) - O ícone da janela. No Windows é recomendado usar `ICO` ícones para obter melhores efeitos visuais, você também pode deixá-lo indefinido para que o ícone executável seja usado.</li> 
    
      * `show` Booleano (opcional) - Se a janela deve ser mostrada quando criada. O padrão é `true`.
  * `paintWhenInitiallyHidden` Booleano (opcional) - Se o renderizador deve estar ativo quando `show` está `false` e acaba de ser criado.  Para que `document.visibilityState` funcione corretamente na primeira carga com `show: false` você deve definir isso para `false`.  Definir isso para `false` fará com que o evento `ready-to-show` não atire.  O padrão é `true`.
  * `frame` Booleano (opcional) - Especifique `false` para criar um</a>de janela sem moldura . O padrão é `true`.</li> 
    
      * `parent` BrowserWindow (opcional) - Especifique a janela pai. O padrão é `null`.
  * `modal` Booleano (opcional) - Se esta é uma janela modal. Isso só funciona quando a janela é uma janela infantil. Por padrão é `false`.
  * `acceptFirstMouse` Boolean (opcional) - Se a exibição da Web aceita um único evento mouse-down que ativa simultaneamente a janela. O padrão é `false`.
  * `disableAutoHideCursor` Booleano (opcional) - Se deve ocultar o cursor ao digitar. Por padrão é `false`.
  * `autoHideMenuBar` Booleano (opcional) - Ocultar automaticamente a barra de menus, a menos que a tecla `Alt` seja pressionada. Por padrão é `false`.
  * `enableLargerThanScreen` Booleano (opcional) - Habilite que a janela seja redimensionada maior que a tela. Apenas relevante para macOS, já que outros OSes permitem janelas maiores que a tela por padrão. Por padrão é `false`.
  * `backgroundColor` String (opcional) - A cor de fundo da janela como valor hexadecimal, como `#66CD00` ou `#FFF` ou `#80FFFFFF` (alfa no formato #AARRGGBB é suportado se `transparent` for definida para `true`). Padrão é `#FFF` (branco).
  * `hasShadow` Booleano (opcional) - Se a janela deve ter uma sombra. O padrão é `true`.
  * `opacity` Número (opcional) - Defina a opacidade inicial da janela, entre 0,0 (totalmente transparente) e 1.0 (totalmente opaco). Isso só é implementado no Windows e macOS.
  * `darkTheme` Boolean (opcional) - Forças usando o tema escuro para a janela, só funciona em alguns ambientes de desktop GTK+3. Por padrão é `false`.
  * `transparent` Booleano (opcional) - Torna a janela [](frameless-window.md#transparent-window)transparente . Por padrão é `false`. No Windows, não funciona a menos que a janela esteja sem molduras.
  * `type` String (opcional) - O tipo de janela, padrão é a janela normal. Veja mais sobre isso abaixo.
  * `visualEffectState` String (opcional) - Especifique como a aparência do material deve refletir o estado de atividade da janela no macOS. Deve ser usado com a propriedade `vibrancy` . Os valores possíveis são: 
        * `followWindow` - O pano de fundo deve aparecer automaticamente ativo quando a janela está ativa e inativa quando não está. Este é o padrão.
    * `active` - O pano de fundo deve sempre parecer ativo.
    * `inactive` - O pano de fundo deve sempre parecer inativo.
  * `titleBarStyle` String (opcional) - O estilo da barra de título da janela. O padrão é `default`. Os valores possíveis são:
    
        * `default` - Resulta no título padrão de Mac opaco cinza bar.

    * `hidden` - Resulta em uma barra de título escondida e uma janela de conteúdo em tamanho real, mas a barra de título ainda tem os controles de janela padrão ("semáforos") em no canto superior esquerdo.

    * `hiddenInset` - Resulta em uma barra de título escondida com um visual alternativo onde os botões do semáforo estão ligeiramente mais inacurdos da borda da janela.

    * `customButtonsOnHover` Boolean (opcional) - Desenhe botões personalizados perto, e minimize botões em janelas sem molduras macOS. Estes botões não exibirão a menos que pairem sobre o canto superior esquerdo da janela. Esses botões personalizados evitam problemas com eventos do mouse que ocorrem com os botões padrão da barra de ferramentas da janela. **Nota:** Esta opção é atualmente experimental.

  * `trafficLightPosition` [Point](structures/point.md) (opcional) - Defina uma posição personalizada para os botões do semáforo. Só pode ser usado com `titleBarStyle` definido para `hidden`

  * `fullscreenWindowTitle` Boolean (opcional) - Mostra o título na barra de títulos no modo de tela cheia no macOS para todas as opções `titleBarStyle` . Por padrão é `false`.
  * `thickFrame` Booleano (opcional) - Use `WS_THICKFRAME` estilo para janelas sem moldura no Windows , que adiciona quadro de janela padrão. Defini-lo para `false` removerá sombras da janela e animações da janela. O padrão é `true`.
  * `vibrancy` String (opcional) - Adicione um tipo de efeito de vibração à janela, apenas no macOS. Podem ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, ou `under-page`.  Observe que o uso `frame: false` em combinação com um valor de vibração requer que você use um `titleBarStyle` não padrão também. Observe também que `appearance-based`, `light`, `dark`, `medium-light`e `ultra-dark` foram preteridos e serão removidos em uma versão futura do macOS.
  * `zoomToPageWidth` Boolean (opcional) - Controla o comportamento no macOS ao opção clicando no botão de semáforo verde na barra de ferramentas ou clicando no item do menu Janela > Zoom. Se `true`, a janela crescerá para a largura preferida da página da Web quando ampliada, `false` fará com que ela amplie a largura da tela. Isso também afetará o comportamento ao ligar diretamente para `maximize()` . Por padrão é `false`.
  * `tabbingIdentifier` String (opcional) - Nome do grupo Tab, permite abrir a janela como uma guia nativa no macOS 10.12+. As janelas com o mesmo identificador de serão agrupadas. Isso também adiciona um novo botão de guia nativo à barra de guia da sua janela e permite que sua `app` e janela recebam o evento `new-window-for-tab` .
  * `webPreferences` Object (opcional) - Configurações dos recursos da página web.
    
        * `devTools` Booleano (opcional) - Quer habilitar DevTools. Se estiver definido para `false`, não pode usar `BrowserWindow.webContents.openDevTools()` para abrir DevTools. O padrão é `true`.
    * `nodeIntegration` Booleano (opcional) - Se a integração do nó estiver ativada. Por padrão é `false`.

    * `nodeIntegrationInWorker` Boolean (opcional) - Se a integração de nó é habilitada em trabalhadores web. Por padrão é `false`. Mais sobre isso podem ser encontrados em [Multithreading](../tutorial/multithreading.md).

    * `nodeIntegrationInSubFrames` Boolean (opcional) - Opção experimental para habilitando o suporte .js Node em subquadrados, como iframes e janelas infantis. Todas as suas pré-cargas serão carregadas para cada iframe, você pode usar `process.isMainFrame` para determinar se você está no quadro principal ou não.

    * `preload` String (opcional) - Especifica um script que será carregado antes que outros scripts sejam executados na página. Este script sempre terá acesso a APIs de nó não importa se a integração de nó está ligada ou desligada. O valor deve ser o caminho absoluto do arquivo para o script. Quando a integração do nó é desligada, o script pré-carregamento pode reintroduzir símbolos globais do Node de volta ao escopo global. See example [here](context-bridge.md#exposing-node-global-symbols).

    * `sandbox` Booleano (opcional) - Se configurado, este sandbox o renderizador associado à janela, tornando-o compatível com o Chromium caixa de areia nível OS e desativando o motor .js Node. Isso não é o mesmo que a opção `nodeIntegration` e as APIs disponíveis para o script pré-carga são mais limitadas. Leia mais sobre a opção [aqui](sandbox-option.md).

    * `enableRemoteModule` Booleano (opcional) - Quer habilitar o módulo [`remote`](remote.md) . Por padrão é `false`.

    * `session` [Sessão](session.md#class-session) (opcional) - Define a sessão usada pela página . Em vez de passar o objeto Session diretamente, você também pode optar por usar a opção `partition` , que aceita uma sequência de partição. Quando `session` e `partition` forem fornecidas, `session` serão preferidas. Padrão é a sessão padrão.

    * `partition` String (opcional) - Define a sessão usada pela página de acordo com a sequência de partição da sessão . Se `partition` começar com `persist:`, a página usará uma sessão persistente disponível para todas as páginas do aplicativo com o mesmo `partition`. Se não houver `persist:` prefixo, a página usará uma sessão na memória. Ao atribuir o mesmo `partition`, várias páginas podem compartilhar mesma sessão. Padrão é a sessão padrão.

    * `affinity` String (opcional) - Quando especificadas, páginas da Web com o mesmo `affinity` serão executadas no mesmo processo de renderização. Observe que, devido à reutilização processo de renderização, certas opções de `webPreferences` também serão compartilhadas entre as páginas da Web, mesmo quando você especificou valores diferentes para eles, incluindo, mas não se limitando a `preload`, `sandbox` e `nodeIntegration`. Por isso, sugere-se usar exatamente o mesmo `webPreferences` para páginas da Web com a mesma `affinity`. __preterido

    * `zoomFactor` Número (opcional) - O fator de zoom padrão da página, `3.0` representa `300%`. O padrão é `1.0`.

    * `javascript` Boolean (opcional) - Permite o suporte ao JavaScript. O padrão é `true`.

    * `webSecurity` Boolean (opcional) - Quando `false`, ela desativará a política de mesma origem (geralmente usando sites de teste por pessoas) e definirá `allowRunningInsecureContent` para `true` se essas opções não foram definidas pelo usuário. O padrão é `true`.

    * `allowRunningInsecureContent` Boolean (opcional) - Permitir que uma página https execute JavaScript, CSS ou plugins de http URLs. Por padrão é `false`.

    * `images` Booleano (opcional) - Permite suporte à imagem. O padrão é `true`.

    * `textAreasAreResizable` Booleano (opcional) - Tornar os elementos textarea resizáveis. O padrão é `true`.

    * `webgl` Boolean (opcional) - Permite o suporte ao WebGL. O padrão é `true`.

    * `plugins` Booleano (opcional) - Se os plugins devem ser ativados. Por padrão é `false`.
    * `experimentalFeatures` Booleano (opcional) - Permite as características experimentais do Cromo. Por padrão é `false`.

    * `scrollBounce` Booleano (opcional) - Permite o efeito de salto de pergaminho (banda de borracha) no macOS. Por padrão é `false`.

    * `enableBlinkFeatures` String (opcional) - Uma lista de strings de recursos separadas por `,`, como `CSSVariables,KeyboardEventKey` para habilitar. A lista completa de strings de recursos suportados pode ser encontrada no arquivo [RuntimeEnabledFeatures.json][runtime-enabled-features] 5.

    * `disableBlinkFeatures` String (opcional) - Uma lista de strings de recurso separadas por `,`, como `CSSVariables,KeyboardEventKey` para desativar. A lista completa de strings de recursos suportados pode ser encontrada no arquivo</a> runtimeEnabledFeatures.json5 .</p></li> 
      
          * `defaultFontFamily` Objeto (opcional) - Define a fonte padrão para a família de fontes.
      
            * `standard` String (opcional) - Padrão para `Times New Roman`.
      * `serif` String (opcional) - Padrão para `Times New Roman`.
      * `sansSerif` String (opcional) - Padrão para `Arial`.
      * `monospace` String (opcional) - Padrão para `Courier New`.
      * `cursive` String (opcional) - Padrão para `Script`.
      * `fantasy` String (opcional) - Padrão para `Impact`.
    * `defaultFontSize` Inteiro (opcional) - Inadimplência para `16`.
    * `defaultMonospaceFontSize` Inteiro (opcional) - Inadimplência para `13`.
    * `minimumFontSize` Inteiro (opcional) - Inadimplência para `0`.
    * `defaultEncoding` String (opcional) - Padrão para `ISO-8859-1`.
    * `backgroundThrottling` Booleano (opcional) - Se reduzir as animações e os temporizadores quando a página se torna plano de fundo. Isso também afeta a</a>de visibilidade de page visibility . Inadimplência para `true`.</p></li> 
      
          * `offscreen` Boolean (opcional) - Se ativar a renderização offscreen para a janela do navegador. Inadimplência para `false`. Veja o tutorial de renderização offscreen [](../tutorial/offscreen-rendering.md) para mais detalhes.

    * `contextIsolation` Boolean (opcional) - Se executar APIs eletrônicas e o `preload` script especificado em um contexto JavaScript separado. Os padrão para `true`. O contexto em que o script `preload` se passa só terá acesso a seus próprios `document` e `window` globais dedicados, bem como seu próprio conjunto de JavaScript builtins (`Array`, `Object`, `JSON`, etc.), que são todos invisíveis ao conteúdo carregado. A API Eletrônica só estará disponível no script `preload` e não na página carregada. Esta opção deve ser usada ao carregar conteúdo remoto potencialmente não confiável para garantir que o conteúdo carregado não possa adulterar o script `preload` e qualquer APIs electron que está sendo usada.  Esta opção usa a mesma técnica usada por [Chrome Content Scripts][chrome-content-scripts].  Você pode acessar este contexto nas ferramentas de desenvolvimento selecionando a entrada 'Contexto Isolado de Elétrons' na caixa de combinação na parte superior da guia Console.

    * `worldSafeExecuteJavaScript` Booleano (opcional) - Se verdadeiro, os valores devolvidos de `webFrame.executeJavaScript` serão higienizados para garantir que os valores JS não possam se cruzar inseguramente entre mundos ao usar `contextIsolation`. Inadimplência para `true`. __preterido

    * `nativeWindowOpen` Booleano (opcional) - Seja para usar `window.open()`nativa . Inadimplência para `false`. As janelas infantis sempre terão nó integração desativada, a menos que `nodeIntegrationInSubFrames` seja verdade. **Nota:** Esta opção está atualmente experimental.

    * `webviewTag` Booleano (opcional) - Quer habilitar a</a>de tag `<webview>` . Inadimplência para `false`. **Nota:** O script `preload` configurado para o `<webview>` terá de integração de nó ativados quando for executado, para que você garanta que de conteúdo remoto/não confiável não seja capaz de criar uma tag `<webview>` com um script `preload` possivelmente malicioso. Você pode usar o evento `will-attach-webview` em [webContents](web-contents.md) para remover o script `preload` e validar ou alterar as configurações iniciais do `<webview>`.</p></li> 
      
          * `additionalArguments` String[] (opcional) - Uma lista de strings que serão anexadas para `process.argv` no processo de renderização deste aplicativo.  Útil para passar pequenos bits de dados para scripts de pré-carregamento do processo de renderização.

    * `safeDialogs` Boolean (opcional) - Quer ativar o estilo do navegador proteção de diálogo consecutiva. Por padrão é `false`.

    * `safeDialogsMessage` String (opcional) - A mensagem a ser exibida quando proteção de diálogo consecutiva é acionada. Se não for definido o padrão mensagem seria usada, observe que atualmente a mensagem padrão está em inglês e não localizada.

    * `disableDialogs` Booleano (opcional) - Se desativar diálogos completamente. Substitui `safeDialogs`. Por padrão é `false`.

    * `navigateOnDragDrop` Boolean (opcional) - Se arrastar e soltar um arquivo ou link na página causa uma navegação. Por padrão é `false`.

    * `autoplayPolicy` String (opcional) - A política de reprodução automática para aplicar conteúdo na janela, pode ser `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Inadimplência para `no-user-gesture-required`.

    * `disableHtmlFullscreenWindowResize` Booleano (opcional) - Se impedir que a janela seja redimensionado ao entrar na tela cheia HTML. O padrão é `false`.

    * `accessibleTitle` String (opcional) - Uma sequência de títulos alternativa suprida apenas a ferramentas de acessibilidade, como leitores de tela. Esta sequência não é diretamente visível aos usuários.

    * `spellcheck` Booleano (opcional) - Se habilitar o verificador ortográfico builtin. O padrão é `true`.

    * `enableWebSQL` Booleano (opcional) - Quer habilitar a [api WebSQL](https://www.w3.org/TR/webdatabase/). O padrão é `true`.

    * `v8CacheOptions` String (opcional) - Aplica a política de cache de código v8 usada por blink. Os valores aceitos são
      
            * `none` - Desativa o cache de código
      * `code` - Cache de código heurístico
      * `bypassHeatCheck` - Contornar a heurística de cache de código, mas com compilação preguiçosa
      * `bypassHeatCheckAndEagerCompile` - O mesmo que acima, exceto compilação, é ansioso. A política padrão é `code`.
    * `enablePreferredSizeMode` Booleano (opcional) - Se ativar modo de tamanho preferido. O tamanho preferido é o tamanho mínimo necessário para conter o layout do documento — sem exigir rolagem. Habilitar isso fará com que o evento `preferred-size-changed` seja emitido no `WebContents` quando o tamanho preferido mudar. Por padrão é `false`.</ul></li> </ul></li> </ul> 

Ao definir o tamanho mínimo ou máximo da janela com `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, ele só restringe os usuários. Não vai impedir que você passar um tamanho que não siga restrições de tamanho para `setBounds`/`setSize` ou ao construtor de `BrowserWindow`.

Os possíveis valores e comportamentos da opção `type` são dependentes da plataforma. Os valores possíveis são:

* No Linux, os possíveis tipos são `desktop`, `dock`, `toolbar`, `splash`, `notification`.

* No macOS, os possíveis tipos são `desktop`, `textured`.
  
    * O tipo `textured` adiciona aparência de gradiente metálico (`NSTexturedBackgroundWindowMask`).
  * O tipo `desktop` coloca a janela no nível da janela de fundo da área de trabalho (`kCGDesktopWindowLevel - 1`). Observe que a janela da área de trabalho não receberá eventos de foco, teclado ou mouse, mas você pode usar `globalShortcut` para receber entrada com moderação.
* No Windows, o tipo possível é `toolbar`.



### Eventos de instância

Objetos criados com `new BrowserWindow` emitem os seguintes eventos:

**Nota:** Alguns eventos só estão disponíveis em sistemas operacionais específicos e são rotulados como tal.



#### Evento: 'page-title-updated'

Retorna:

* `event` Event
* `title` String
* `explicitSet` Boolean

Emitido quando o documento mudou seu título, chamando `event.preventDefault()` impedirá que o título da janela nativa mude. `explicitSet` é falso quando o título é sintetizado a partir de URL de arquivo.



#### Evento: 'close'

Retorna:

* `event` Event

Emitido quando a janela vai ser fechada. É emitido antes do `beforeunload` e `unload` evento do DOM. Ligando para `event.preventDefault()` cancelará o fechamento.

Normalmente, você gostaria de usar o manipulador de `beforeunload` para decidir se a janela deve ser fechada, que também será chamada quando a janela for recarregada. Em Electron, devolver qualquer valor que não `undefined` cancelaria o fechar. Como por exemplo:



```javascript
window.onforeunload = (e) => {
  console.log('Eu não quero ser fechado')

  // Ao contrário dos navegadores usuais de que uma caixa de mensagem será solicitada aos usuários, o retorno
  // um valor não-vazio cancelará silenciosamente o fechamento.
  Recomenda-se usar a API de diálogo para permitir que o usuário confirme o fechamento do aplicativo
  //
  e.returnValue = falso // equivalente a 'devolver falso' mas não recomendado
}
```


_**Nota**: Há uma diferença sutil entre os comportamentos de `window.onbeforeunload = handler` e `window.addEventListener('beforeunload', handler)`. Recomenda-se sempre definir o `event.returnValue` explicitamente, em vez de apenas devolver um valor, já que o primeiro funciona de forma mais consistente dentro de Electron._



#### Evento: 'closed'

Emitido quando a janela é fechada. Depois de receber este evento, você deve remover a referência à janela e evitar usá-la mais.



#### Evento: 'session-end' _Windows_

Emitido quando a sessão da janela vai terminar devido ao desligamento ou à reinicialização da máquina ou retirada da sessão.



#### Evento: 'unresponsive'

Emitido quando a página web fica sem resposta.



#### Evento: 'responsive'

Emitido quando a página web sem resposta se torna responsiva novamente.



#### Evento: 'blur'

Emitido quando a janela perde o foco.



#### Evento: 'focus'

Emitido quando a janela ganha foco.



#### Evento: 'show'

Emitido quando a janela é mostrada.



#### Evento: 'hide'

Emitido quando a janela está escondida.



#### Evento: 'ready-to-show'

Emitido quando a página da Web foi renderizada (enquanto não for exibida) e a janela pode ser exibida sem um flash visual.

Observe que o uso deste evento implica que o renderizador será considerado "visível" e pintura, mesmo que `show` seja falsa.  Este evento nunca disparará se você usar `paintWhenInitiallyHidden: false`



#### Evento: 'maximize'

Emitido quando a janela é maximizada.



#### Evento: 'unmaximize'

Emitido quando a janela sai de um estado maximizado.



#### Evento: 'minimize'

Emitido quando a janela é minimizada.



#### Evento: 'restore'

Emitido quando a janela é restaurada de um estado minimizado.



#### Evento: 'vai redimensionar' __ _do iCarros_do Windows

Retorna:

* `event` Event
* `newBounds` [Retângulo](structures/rectangle.md) - Tamanho para o tamanho da janela está sendo redimensionada.

Emitido antes que a janela seja redimensionada. Ligar para `event.preventDefault()` impedirá que a janela seja redimensionada.

Observe que isso só é emitido quando a janela está sendo redimensionada manualmente. Redimensionar a janela com `setBounds`/`setSize` não emitirá este evento.



#### Evento: 'resize'

Emitido após a janela ser redimensionada.



#### Evento: 'redimensionado' _macOS_ _Windows_

Emitido uma vez quando a janela terminou de ser redimensionada.

Isso geralmente é emitido quando a janela foi redimensionada manualmente. No macOS, redimensionar a janela com `setBounds`/`setSize` e definir o parâmetro `animate` para `true` também emitirá este evento assim que a redimensionamento terminar.



#### Evento: 'vai se mover' __ _do_do Apple

Retorna:

* `event` Event
* `newBounds` [Retângulo](structures/rectangle.md) - Localização para onde a janela está sendo movida.

Emitido antes que a janela seja movida. No Windows, chamar `event.preventDefault()` impedirá que a janela seja movida.

Observe que isso só é emitido quando a janela está sendo redimensionada manualmente. Redimensionar a janela com `setBounds`/`setSize` não emitirá este evento.



#### Evento: 'move'

Emitido quando a janela está sendo movida para uma nova posição.



#### Evento: 'movido' __ __do Windows

Emitido uma vez quando a janela é movida para uma nova posição.

__Note__: No macOS este evento é um pseudônimo de `move`.



#### Evento: 'enter-full-screen'

Emitido quando a janela entra em um estado de tela cheia.



#### Evento: 'leave-full-screen'

Emitido quando a janela deixa um estado de tela cheia.



#### Evento: 'enter-html-full-screen'

Emitido quando a janela entra em um estado de tela cheia acionado pela API HTML.



#### Evento: 'leave-html-full-screen'

Emitido quando a janela deixa um estado de tela cheia acionado pela API HTML.



#### Evento: 'always-on-top-changed'

Retorna:

* `event` Event
* `isAlwaysOnTop` Booleano

Emitido quando a janela está configurada ou desaparada para mostrar sempre em cima de outras janelas.



#### Evento: 'comando de aplicativo' __Do Windows</em> _Linux</h4> 

Retorna:

* `event` Event
* `command` Cordas

Emitido quando um</a> de comando de aplicativo é invocado. Estes são tipicamente relacionados com teclas de mídia de teclado ou comandos de do navegador, bem como o botão "Back" incorporado em alguns mouses no Windows.</p> 

Os comandos são minúsculos, os sublinhados são substituídos por hífens, e o prefixo `APPCOMMAND_` é despojado. E.g. `APPCOMMAND_BROWSER_BACKWARD` é emitido como `browser-backward`.



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()
win.on ('app-command', (e, cmd) => {
  // Navegue pela janela de volta quando o usuário aperta o botão de trás do mouse
  se (cmd === 'navegador-para trás' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```


Os seguintes comandos do aplicativo são explicitamente suportados no Linux:

* `navegador-para trás`
* `navegador-forward`



#### Evento: 'scroll-touch-start' __do macOS

Emitido quando a fase de evento da roda de rolagem começou.



#### Evento: 'scroll-touch-end' __do macOS

Emitido quando a fase de evento da roda de rolagem terminou.



#### Evento: 'scroll-touch-edge' __do macOS

Emitido quando a fase de evento da roda de rolagem foi arquivada ao atingir a borda do elemento.



#### Evento: 'deslizar' __do macOS

Retorna:

* `event` Event
* `direction` Cordas

Emitido em golpe de 3 dedos. As possíveis direções são `up`, `right`, `down`, `left`.

O método subjacente a este evento é construído para lidar com o trackpad estilo macOS mais antigo deslizando, onde o conteúdo na tela não se move com o deslizamento. A maioria dos trackpads do macOS não está configurado para permitir esse tipo de deslizar mais, então, para que ele emita corretamente a preferência 'Deslize entre páginas' em `System Preferences > Trackpad > More Gestures` deve ser definido para 'Deslizar com dois ou três dedos'.



#### Evento: 'gesto rotativo' __do macOS

Retorna:

* `event` Event
* `rotation` Float

Emitido no gesto de rotação do trackpad. Continuamente emitido até que o gesto de rotação seja terminado. O valor `rotation` de cada emissão é o ângulo em graus girados desde última emissão. O último evento emitido após um gesto de rotação será sempre de valor `0`. Os valores de rotação no sentido anti-horário são positivos, enquanto os no sentido horário são negativos.



#### Evento: 'folha de começo' __do macOS

Emitido quando a janela abre uma folha.



#### Evento: 'folha-fim' __do macOS

Emitido quando a janela fechou uma folha.



#### Evento: 'new-window-for-tab' no _macOS_

Emitido quando o novo botão de guia nativo é clicado.



#### Evento: 'system-context-menu' _Windows_

Retorna:

* `event` Event
* `point` [Point](structures/point.md) - A tela coordena o menu de contexto foi acionado em

Emitido quando o menu de contexto do sistema é acionado na janela, isso é normalmente apenas acionado quando o usuário clica com o botão direito do usuário na área não-cliente da sua janela.  Esta é a barra de título da janela ou qualquer área que você declarou como `-webkit-app-region: drag` em uma janela sem moldura.

Ligar para `event.preventDefault()` impedirá que o menu seja exibido.



### Métodos estáticos

A classe `BrowserWindow` tem os seguintes métodos estáticos:



#### `BrowserWindow.getAllWindows()`

Devoluções `BrowserWindow[]` - Uma matriz de todas as janelas do navegador abertas.



#### `BrowserWindow.getFocusedWindow()`

Retornos `BrowserWindow | null` - A janela que está focada neste aplicativo, caso contrário retorna `null`.



#### `BrowserWindow.fromWebContents (webContents)`

* `webContents` [WebContents](web-contents.md)

Devolução `BrowserWindow | null` - A janela que possui os `webContents` ou `null` se o conteúdo não for de propriedade de uma janela.



#### `BrowserWindow.fromBrowserVer (browserView)`

* `browserView` [browserView](browser-view.md)

Retorna `BrowserWindow | null` - A janela que possui o `browserView`dado . Se a visualização dada não estiver anexada a nenhuma janela, retorne `null`.



#### `BrowserWindow.fromId(id)`

* `id` Inteiro

Retorna `BrowserWindow | null` - A janela com o `id`dado .



#### `BrowserWindow.addExtension(path)` __preterido

* `path` String

Adiciona extensão do Chrome localizada em `path`e retorna o nome da extensão.

O método também não retornará se o manifesto da extensão estiver faltando ou incompleto.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.loadExtension(path)`](session.md#sesloadextensionpath-options).



#### `BrowserWindow.removeExtension(name)` __preterido

* `name` String

Remova uma extensão do Chrome pelo nome.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.removeExtension(extension_id)`](session.md#sesremoveextensionextensionid).



#### `BrowserWindow.getExtensions()` __preterido

Devoluções `Record<String, ExtensionInfo>` - As teclas são os nomes de extensão e cada valor é um Objeto contendo propriedades `name` e `version` .

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.getAllExtensions()`](session.md#sesgetallextensions).



#### `BrowserWindow.addDevToolsExtension(path)` __preterido

* `path` String

Adiciona extensão DevTools localizada em `path`e retorna o nome da extensão.

A extensão será lembrada, então você só precisa chamar esta API uma vez, este API não é para uso de programação. Se você tentar adicionar uma extensão que já sido carregada, este método não retornará e, em vez disso, registrará um aviso ao console .

O método também não retornará se o manifesto da extensão estiver faltando ou incompleto.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.loadExtension(path)`](session.md#sesloadextensionpath-options).



#### `BrowserWindow.removeDevToolsExtension(name)` __preterido

* `name` String

Remova uma extensão DevTools pelo nome.

**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.removeExtension(extension_id)`](session.md#sesremoveextensionextensionid).



#### `BrowserWindow.getDevToolsExtensions()` __preterido

Devoluções `Record<string, ExtensionInfo>` - As teclas são os nomes de extensão e cada valor é um Objeto contendo propriedades `name` e `version` .

Para verificar se uma extensão DovTools está instalada, você pode executar o seguinte:



```javascript
const { BrowserWindow } = require ('electron')

const instalado = 'devtron' em BrowserWindow.getDevToolsExtensions()
console.log(instalado)
```


**Nota:** Esta API não pode ser chamada antes que o evento `ready` do módulo `app` seja emitido.

**Nota:** Este método é preterido. Em vez disso, use [`ses.getAllExtensions()`](session.md#sesgetallextensions).



### Propriedades de Instância

Objetos criados com `new BrowserWindow` têm as seguintes propriedades:



```javascript
const { BrowserWindow } = require ('electron')
// Neste exemplo 'win' é nossa instância
vitória const = novo BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```




#### `win.webContents` _Readonly_

Um objeto `WebContents` que esta janela possui. Todos os eventos relacionados à página da Web e operações de serão feitos através dele.

Veja a documentação [`webContents`](web-contents.md) para seus métodos e eventos .



#### `win.id` _Readonly_

Uma propriedade `Integer` representando a ID única da janela. Cada ID é único entre todas as `BrowserWindow` instâncias de toda a aplicação electron.



#### `win.autoHideMenuBar`

Uma propriedade `Boolean` que determina se a barra de menu da janela deve se esconder automaticamente. Uma vez definida, a barra de menu só mostrará quando os usuários pressionarem a única tecla `Alt` .

Se a barra de menu já estiver visível, definir esta propriedade para `true` não escondê-la imediatamente.



#### `win.simpleFullScreen`

Uma propriedade `Boolean` que determina se a janela está no modo de tela completa simples (pré-Leão).



#### `win.fullScreen`

Uma propriedade `Boolean` que determina se a janela está no modo fullscreen.



#### `win.visibleOnAllWorkspaces`

Uma propriedade `Boolean` que determina se a janela é visível em todos os espaços de trabalho.

**Nota:** Sempre retorna falso no Windows.



#### `win.shadow`

Uma propriedade `Boolean` que determina se a janela tem uma sombra.



#### `win.menuBarVisible` __Linux do Windows</em> _</h4> 

Uma propriedade `Boolean` que determina se a barra de menu deve ser visível.

**Nota:** Se a barra de menu estiver ocultada automaticamente, os usuários ainda podem levantar a barra de menu pressionando a tecla de `Alt` única.



#### `win.kiosk`

Uma propriedade `Boolean` que determina se a janela está no modo quiosque.



#### `win.documentEdited` __macOS

Uma propriedade `Boolean` que especifica se o documento da janela foi editado.

O ícone na barra de título ficará cinza quando definido para `true`.



#### `win.representedFilename` __macOS

Uma propriedade `String` que determina o nome do caminho do arquivo que a janela representa, e o ícone do arquivo serão exibidos na barra de título da janela.



#### `win.title`

Uma propriedade `String` que determina o título da janela nativa.

**Nota:** O título da página web pode ser diferente do título da janela nativa.



#### `win.minimizável`

Uma propriedade `Boolean` que determina se a janela pode ser minimizada manualmente pelo usuário.

No Linux, o setter é um não-op, embora o getter retorne `true`.



#### `win.maximizable`

Uma propriedade `Boolean` que determina se a janela pode ser maximizada manualmente pelo usuário.

No Linux, o setter é um não-op, embora o getter retorne `true`.



#### `win.fullScreenable`

Uma propriedade `Boolean` que determina se o botão de janela maxima/zoom alterna o modo fullscreen ou maximiza a janela.



#### `win.resizable`

Uma propriedade `Boolean` que determina se a janela pode ser redimensionada manualmente pelo usuário.



#### `win.closable`

Uma propriedade `Boolean` que determina se a janela pode ser fechada manualmente pelo usuário.

No Linux, o setter é um não-op, embora o getter retorne `true`.



#### `win.movable`

Uma propriedade `Boolean` que determina se a janela pode ser movida pelo usuário.

No Linux, o setter é um não-op, embora o getter retorne `true`.



#### `win.excludedFromShownWindowsMenu` __macOS

Uma propriedade `Boolean` que determina se a janela está excluída do menu Windows do aplicativo. `false` by default.



```js
const win = novo Menu Desarmes{ height: 600, width: 600 }

de const = [
  {
    role: 'windowmenu'
  }
]

win.excludedDeShownWindowsMenu = menu const verdadeiro

= Menu.buildFromTemplate(modelo)
Menu.setApplicationMenu(menu)
```




#### `win.accessibleTitle`

Uma propriedade `String` que define um título alternativo fornecido apenas para ferramentas de acessibilidade, como leitores de tela. Esta sequência não é diretamente visível aos usuários.



### Métodos de Instância

Objetos criados com `new BrowserWindow` têm os seguintes métodos de instância:

**Nota:** Alguns métodos estão disponíveis somente em sistemas operacionais específicos e são rotulados como tal.



#### `win.destroy()`

Forçar o fechamento da janela, o evento `unload` e `beforeunload` não será emitido para a página web, e `close` evento também não será emitido para esta janela, mas garante que o evento `closed` será emitido.



#### `win.close()`

Tente fechar a janela. Isso tem o mesmo efeito que um usuário clicando manualmente o botão de fechamento da janela. A página web pode cancelar o fechamento, porém. Veja o</a>de de eventos próximos .</p> 



#### `win.focus()`

Foca na janela.



#### `win.blur()`

Remove o foco da janela.



#### `win.isFocused()`

Retorna `Boolean` - Se a janela está focada.



#### `win.isDestroyed()`

Retorna `Boolean` - Se a janela é destruída.



#### `win.show()`

Mostra e dá foco à janela.



#### `win.showInactive()`

Mostra a janela, mas não se concentra nela.



#### `win.hide()`

Esconde a janela.



#### `win.isVisible()`

Devoluções `Boolean` - Se a janela é visível para o usuário.



#### `win.isModal()`

Retorna `Boolean` - Se a janela atual é uma janela modal.



#### `win.maximize()`

Maximiza a janela. Isso também mostrará (mas não se concentrará) na janela se ainda não estiver sendo exibida.



#### `win.unmaximize()`

Descompimiza a janela.



#### `win.isMaximized()`

Retorna `Boolean` - Se a janela é maximizada.



#### `win.minimize()`

Minimiza a janela. Em algumas plataformas, a janela minimizada será mostrada em Doca.



#### `win.restore()`

Restaura a janela do estado minimizado ao seu estado anterior.



#### `win.isMinimized()`

Retornos `Boolean` - Se a janela é minimizada.



#### `win.setFullScreen(flag)`

* `flag` Booleano

Define se a janela deve estar no modo fullscreen.



#### `win.isFullScreen()`

Devoluções `Boolean` - Se a janela está no modo fullscreen.



#### `win.setSimpleFullScreen(flag)` __macOS

* `flag` Booleano

Entra ou sai do modo de tela cheia simples.

O modo fullscreen simples emula o comportamento nativo de fullscreen encontrado nas versões do macOS antes do Lion (10.7).



#### `win.isSimpleFullScreen()` no _macOS_

Retorna `Boolean` - Se a janela está no modo de tela cheia simples (pré-Leão).



#### `win.isNormal()`

Devoluções `Boolean` - Se a janela está em estado normal (não maximizada, não minimizada, não no modo fullscreen).



#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - A proporção a ser mantida para alguma parte da visualização de conteúdo .

* `extraSize` [Tamanho](structures/size.md) (opcional) __ macOS - O tamanho extra não deve ser incluído enquanto manter a proporção.

Isso fará com que uma janela mantenha uma proporção. O tamanho extra permite que um desenvolvedor tenha espaço, especificado em pixels, não incluído no aspecto cálculos de proporção. Esta API já leva em conta a diferença entre o tamanho de uma janela e seu tamanho de conteúdo.

Considere uma janela normal com um reprodutor de vídeo HD e controles associados. Talvez haja 15 pixels de controles na borda esquerda, 25 pixels de controles na borda direita e 50 pixels de controles abaixo do player. Para manter uma proporção de 16:9 (proporção padrão para @1920x1080 HD) dentro de o próprio jogador chamaríamos essa função com argumentos de 16/9 e
{ width: 40, height: 50 }. O segundo argumento não se importa onde a largura e a altura extras estão dentro da exibição de conteúdo - apenas que eles existem. Soma qualquer largura extra e áreas de altura que você tenha dentro da exibição geral do conteúdo.

A proporção não é respeitada quando a janela é redimensionada programação com APIs como `win.setSize`.



#### `win.setBackgroundColor (backgroundColor)`

* `backgroundColor` String - A cor de fundo da janela como valor hexadecimal, como `#66CD00` ou `#FFF` ou `#80FFFFFF` (o alfa é suportado se `transparent` for `true`). Padrão é `#FFF` (branco).

Define a cor de fundo da janela. Consulte [Configuração `backgroundColor`](#setting-backgroundcolor).



#### `win.previewFile(path[, displayName])` __macOS

* `path` String - O caminho absoluto para o arquivo para visualizar com QuickLook. Essa é importante, pois o Quick Look usa o nome do arquivo e a extensão do arquivo no caminho para determinar o tipo de conteúdo do arquivo a ser aberto.

* `displayName` String (opcional) - O nome do arquivo a ser exibido na exibição modal Quick Look. Isso é puramente visual e não afeta o conteúdo tipo do arquivo. Inadimplência para `path`.

Usa [][quick-look] de Olhar Rápido para visualizar um arquivo em um determinado caminho.



#### `win.closeFilePreview()` no _macOS_

Fecha o painel</a> Quick Look.</p> 



#### `win.setBounds(limites[, animar])`

* < Retângulo[Parcial `bounds`](structures/rectangle.md)>
* `animate` Boolean (opcional) __do macOS

Redimensiona e move a janela para os limites fornecidos. Quaisquer propriedades que não forem fornecidas serão padrão aos seus valores atuais.



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()

// definir todas as propriedades de limites
win.setBounds({ x: 440, y: 225, largura: 800, altura: 600 })

// definir uma propriedade de limites únicos
win.setBounds ({ width: 100 })

// { x: 440, y: 225, largura: 100, altura: 600 }
console.log(win.getBounds())
```




#### `win.getBounds()`

Retorna [`Rectangle`](structures/rectangle.md) - Os `limites` da janela como `Objeto`.



#### `win.getBackgroundColor()`

Retorna `String` - Obtém a cor de fundo da janela. Consulte [Configuração `backgroundColor`](#setting-backgroundcolor).



#### `win.setContentBounds(limites[, animar])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (opcional) __do macOS

Redimensiona e move a área de cliente da janela (por exemplo, a página da Web) para os limites fornecidos.



#### `win.getContentBounds()`

Retorno [`Rectangle`](structures/rectangle.md) - A `bounds` da área de clientes da janela como `Object`.



#### `win.getNormalBounds()`

Devoluções [`Rectangle`](structures/rectangle.md) - Contém os limites da janela do estado normal

**Nota:** qualquer que seja o estado atual da janela : maximizada, minimizada ou em tela cheia, esta função sempre retorna a posição e o tamanho da janela em estado normal. Em estado normal, getBounds e getNormalBounds retorna o mesmo [`Rectangle`](structures/rectangle.md).



#### `win.setEnabled (habilitação)`

* `enable` Booleano

Desabilitar ou habilitar a janela.



#### `win.isEnabled()`

Retorna `Boolean` - se a janela está ativada.



#### `win.setSize (largura, altura[, animar])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opcional) __do macOS

Redimensiona a janela para `width` e `height`. Se `width` ou `height` estiverem abaixo de qualquer restrição de tamanho mínimo definida, a janela será encaixada ao seu tamanho mínimo.



#### `win.getSize()`

Devoluções `Integer[]` - Contém a largura e a altura da janela.



#### `win.setContentSize (largura, altura[, animar])`

* `width` Integer
* `height` Integer
* `animate` Boolean (opcional) __do macOS

Redimensiona a área de cliente da janela (por exemplo, a página web) para `width` e `height`.



#### `win.getContentSize()`

Devoluções `Integer[]` - Contém a largura e altura da área cliente da janela.



#### `win.setMinimumSize (largura, altura)`

* `width` Integer
* `height` Integer

Define o tamanho mínimo da janela para `width` e `height`.



#### `win.getMinimumSize()`

Devoluções `Integer[]` - Contém a largura e altura mínimas da janela.



#### `win.setMaximumSize (largura, altura)`

* `width` Integer
* `height` Integer

Define o tamanho máximo da janela para `width` e `height`.



#### `win.getMaximumSize()`

Devoluções `Integer[]` - Contém a largura e altura máximas da janela.



#### `win.setReizável (resizável)`

* `resizable` Booleano

Define se a janela pode ser redimensionada manualmente pelo usuário.



#### `win.isResizable()`

Devoluções `Boolean` - Se a janela pode ser redimensionada manualmente pelo usuário.



#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Booleano

Define se a janela pode ser movida pelo usuário. No Linux não faz nada.



#### `win.isMovable()` _macOS_ _Windows_

Devolução `Boolean` - Se a janela pode ser movida pelo usuário.

No Linux sempre retorna `true`.



#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Booleano

Define se a janela pode ser minimizada manualmente pelo usuário. No Linux não faz nada.



#### `win.isMinimizable()` _macOS_ _Windows_

Devoluções `Boolean` - Se a janela pode ser minimizada manualmente pelo usuário.

No Linux sempre retorna `true`.



#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Booleano

Define se a janela pode ser maximizada manualmente pelo usuário. No Linux não faz nada.



#### `win.isMaximizable()` _macOS_ _Windows_

Devoluções `Boolean` - Se a janela pode ser maximizada manualmente pelo usuário.

No Linux sempre retorna `true`.



#### `win.setFullScreenable (fullscreenable)`

* `fullscreenable` Booleano

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.



#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.



#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. No Linux não faz nada.



#### `win.isClosable()` _macOS_ _Windows_

Returns `Boolean` - Whether the window can be manually closed by user.

No Linux sempre retorna `true`.



#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Booleano
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs][window-levels] for more details.

* `relativeLevel` Integer (optional) _macOS_ - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.



#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.



#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.



#### `win.moveTop()`

Moves window to top(z-order) regardless of focus



#### `win.center()`

Moves window to the center of the screen.



#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opcional) __do macOS

Moves window to `x` and `y`.



#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.



#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.



#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of the web page can be different from the title of the native window.



#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Como por exemplo:



```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```




#### `win.flashFrame(flag)`

* `flag` Booleano

Starts or stops flashing the window to attract user's attention.



#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.



#### `win.setKiosk(flag)`

* `flag` Booleano

Enters or leaves kiosk mode.



#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.



#### `win.isTabletMode()` _Windows_

Returns `Boolean` - Whether the window is in Windows 10 tablet mode.

Since Windows 10 users can [use their PC as tablet](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet), under this mode apps can choose to optimize their UI for tablets, such as enlarging the titlebar and hiding titlebar buttons.

This API returns whether the window is in tablet mode, and the `resize` event can be be used to listen to changes to tablet mode.



#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.



#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.



#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function 
    * `wParam` any - The `wParam` provided to the WndProc
  * `lParam` any - The `lParam` provided to the WndProc

Hooks a windows message. The `callback` is called when the message is received in the WndProc.



#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.



#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Unhook the window message.



#### `win.unhookAllWindowMessages()` _Windows_

Unhooks all of the window messages.



#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.



#### `win.getRepresentedFilename()` no _macOS_

Returns `String` - The pathname of the file the window represents.



#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.



#### `win.isDocumentEdited()` no _macOS_

Returns `Boolean` - Whether the window's document has been edited.



#### `win.focusOnWebView()`



#### `win.blurWebView()`



#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page. If the page is not visible, `rect` may be empty.



#### `win.loadURL(url[, options])`

* String `url`
* objeto `options` (opcional) 
    * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:



```javascript
const url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```


You can load a URL using a `POST` request with URL-encoded data by doing the following:



```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```




#### `win.loadFile(filePath[, options])`

* `filePath` String
* objeto `options` (opcional) 
    * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.



#### `win.reload()`

Same as `webContents.reload`.



#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Sets the `menu` as the window's menu bar.



#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.



#### `win.setProgressBar(progress[, options])`

* `progress` Double
* objeto `options` (opcional) 
    * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `{app.name}.desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.



#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared

* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.



#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.



#### `win.hasShadow()`

Returns `Boolean` - Whether the window has a shadow.



#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.



#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.



#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.



#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Object 
    * `icon` [NativeImage](native-image.md) - O icone exibido na barra de ferramentas de miniaturas.
  * `click` Function
  * `tooltip` String (opcional) - O texto do tooltip do botão.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

As `flags` são um array que pode conter as seguintes `String`s:

* `enabled` - O botão está ativo e disponível ao usuário.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.

* `dismissonclick` - Quando o botão é clicado, o janela da miniatura é fechada imediatamente.

* `nobackground` - Não desenha a borda do botão, utiliza apenas a imagem.

* `hidden` - O botão não é exibido ao usuário.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.



#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.



#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.



#### `win.setAppDetails(options)` _Windows_

* objeto `options` 
    * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. O padrão é `0`.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.



#### `win.showDefinitionForSelection()` no _macOS_

Same as `webContents.showDefinitionForSelection()`.



#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Changes window icon.



#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.



#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.



#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.



#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.



#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.



#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* objeto `options` (opcional) 
    * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.



#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.



#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* objeto `options` (opcional) 
    * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.



#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Booleano

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window.



#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.



#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.



#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.



#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.



#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Controls whether to hide cursor when typing.



#### `win.selectPreviousTab()` no _macOS_

Selects the previous tab when native tabs are enabled and there are other tabs in the window.



#### `win.selectNextTab()` no _macOS_

Selects the next tab when native tabs are enabled and there are other tabs in the window.



#### `win.mergeAllWindows()` no _macOS_

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.



#### `win.moveTabToNewWindow()` no _macOS_

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.



#### `win.toggleTabBar()` no _macOS_

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.



#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.



#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the [macOS documentation][vibrancy-docs] for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.



#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.



#### `win.getTrafficLightPosition()` no _macOS_

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.



#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.



#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.



#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.



#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [browserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.



#### </em>Experimental `win.removeBrowserView(browserView)` _</h4> 

* `browserView` [browserView](browser-view.md)



#### `win.setTopBrowserView(browserView)` _Experimental_

* `browserView` [browserView](browser-view.md)

Raises `browserView` above other `BrowserView`s attached to `win`. Throws an error if `browserView` is not attached to `win`.



#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Nota:** A API BrowserView atualmente é experimental e pode mudar ou ser removida em versões futuras do Electron.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
