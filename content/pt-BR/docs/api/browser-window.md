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

    * `preload` String (opcional) - Especifica um script que será carregado antes que outros scripts sejam executados na página. Este script sempre terá acesso a APIs de nó não importa se a integração de nó está ligada ou desligada. O valor deve ser o caminho absoluto do arquivo para o script. Quando a integração do nó é desligada, o script pré-carregamento pode reintroduzir símbolos globais do Node de volta ao escopo global. Veja exemplo [aqui](process.md#event-loaded).

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

Uma propriedade `Boolean` que determina se a janela está excluída do menu Windows do aplicativo. `false` por padrão.



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

Define se o botão de janela maximize/zoom alterna o modo fullscreen ou maximize a janela.



#### `win.isFullScreenable()`

Devoluções `Boolean` - Se o botão de janela de maximizar/zoom alterna o modo fullscreen ou maximizar a janela.



#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Booleano

Define se a janela pode ser fechada manualmente pelo usuário. No Linux não faz nada.



#### `win.isClosable()` _macOS_ _Windows_

Devoluções `Boolean` - Se a janela pode ser fechada manualmente pelo usuário.

No Linux sempre retorna `true`.



#### `win.setAlwaysOnTop (flag[, level][, relativaLevel])`

* `flag` Booleano
* `level` String (opcional) _macOS_ _Windows_ - Os valores incluem `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`e ~~`dock`~~ (Preterido). O padrão é `floating` quando `flag` é verdade. O `level` é reiniciado para `normal` quando a bandeira é falsa. Observe que de `floating` a `status` incluído, a janela é colocada abaixo do Dock no macOS e abaixo da barra de tarefas no Windows. De `pop-up-menu` a um superior é mostrado acima do Dock no macOS e acima da barra de tarefas no Windows. Consulte os [][window-levels] de documentos do macOS para obter mais detalhes.

* `relativeLevel` Integer (opcional) __ macOS - O número de camadas mais altas para definir esta janela em relação ao `level`dado . O padrão é `0`. Observe que a Apple desencoraja a definição de níveis superiores a 1 acima `screen-saver`.

Define se a janela deve aparecer sempre em cima de outras janelas. Depois de configurando isso, a janela ainda é uma janela normal, não uma janela de caixa de ferramentas na qual não pode ser focada.



#### `win.isAlwaysOnTop()`

Retorna `Boolean` - Se a janela está sempre em cima de outras janelas.



#### `win.moveAbove (mediaSourceId)`

* `mediaSourceId` String - ID de janela no formato do id do DesktopCapturerSource. Por exemplo, "janela:1869:0".

Move a janela acima da janela de origem no sentido de ordem z. Se o `mediaSourceId` não for de janela tipo ou se a janela não existir, então este método lança um erro.



#### `win.moveTop()`

Move janela para topo (z-order) independentemente do foco



#### `win.center()`

Move a janela para o centro da tela.



#### `win.setPosition(x, y[, animar])`

* `x` Integer
* `y` Integer
* `animate` Boolean (opcional) __do macOS

Move janela para `x` e `y`.



#### `win.getPosition()`

Retorna `Integer[]` - Contém a posição atual da janela.



#### `win.setTitle(título)`

* `title` String

Muda o título da janela nativa para `title`.



#### `win.getTitle()`

Retorna `String` - O título da janela nativa.

**Nota:** O título da página web pode ser diferente do título da janela nativa.



#### `win.setSheetOffset(offsetY[, offsetX])` __macOS

* `offsetY` Float
* `offsetX` Float (opcional)

Altera o ponto de fixação para folhas no macOS. Por padrão, as folhas são anexadas logo abaixo do quadro da janela, mas você pode querer exibi-las abaixo de uma barra de ferramentas renderizada por HTML. Como por exemplo:



```javascript
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()

barra de ferramentas constRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```




#### `win.flashFrame(flag)`

* `flag` Booleano

Inicia ou pára de piscar a janela para atrair a atenção do usuário.



#### `win.setSkipTaskbar(skip)`

* `skip` Booleano

Faz com que a janela não apareça na barra de tarefas.



#### `win.setKiosk(flag)`

* `flag` Booleano

Entra ou sai do modo quiosque.



#### `win.isKiosk()`

Devoluções `Boolean` - Se a janela está no modo quiosque.



#### `win.isTabletMode()` __do Windows

Devoluções `Boolean` - Se a janela está no modo tablet Windows 10.

Como os usuários do Windows 10 podem [usar seu PC como](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet)de tablet, sob este modo os aplicativos podem optar por otimizar sua interface do usuário para tablets, como ampliando a barra de títulos e escondendo botões da barra de título.

Esta API retorna se a janela está no modo tablet, e o `resize` evento pode ser usado para ouvir alterações no modo tablet.



#### `win.getMediaSourceId()`

Devoluções `String` - ID de janela no formato do id do DesktopCapturerSource. Por exemplo, "janela:1234:0".

Mais precisamente o formato é `window:id:other_id` onde `id` é `HWND` no Windows, `CGWindowID` (`uint64_t`) no macOS e `Window` (`unsigned long`) no Linux. `other_id` é usado para identificar conteúdos da Web (guias) de modo que dentro da mesma janela de nível superior.



#### `win.getNativeWindowHandle()`

Devoluções `Buffer` - A alça específica da plataforma da janela.

O tipo nativo da alça é `HWND` no Windows, `NSView*` no macOS e `Window` (`unsigned long`) no Linux.



#### `win.hookWindowMessage(message, callback)` __do Windows

* `message` Integer
* `callback` Function 
    * `wParam` qualquer - O `wParam` fornecido ao WndProc
  * `lParam` qualquer - O `lParam` fornecido ao WndProc

Liga uma mensagem de janelas. O `callback` é chamado quando a mensagem é recebida no WndProc.



#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Devolução `Boolean` - `true` ou `false` dependendo se a mensagem está ligada.



#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Desembrulhe a mensagem da janela.



#### `win.unhookAllWindowMessages()` _Windows_

Desembrulhe todas as mensagens da janela.



#### `win.setRepresentedFilename(filename)` __macOS

* `filename` String

Define o nome do caminho do arquivo que a janela representa e o ícone do arquivo aparecerá na barra de título da janela.



#### `win.getRepresentedFilename()` no _macOS_

Devoluções `String` - O nome do caminho do arquivo que a janela representa.



#### `win.setDocumentEdited(edited)` __macOS

* `edited` Booleano

Especifica se o documento da janela foi editado e o ícone na barra de de título ficará cinza quando definido como `true`.



#### `win.isDocumentEdited()` no _macOS_

Devoluções `Boolean` - Se o documento da janela foi editado.



#### `win.focusOnWebView()`



#### `win.blurWebView()`



#### `win.capturePage ([rect])`

* `rect` [Retângulo](structures/rectangle.md) (opcional) - Os limites para capturar

Retorna `Promise<NativeImage>` - Resolve com um</a>NativeImage </p> 

Captura um instantâneo da página dentro de `rect`. Omitir `rect` capturará toda a página visível. Se a página não estiver visível, `rect` pode estar vazia.



#### `win.loadURL(url[, opções])`

* String `url`
* objeto `options` (opcional) 
    * `httpReferrer` (| de cordas [Referidor](structures/referrer.md)) (opcional) - Uma URL http referrer.
  * `userAgent` String (opcional) - Um agente do usuário originário da solicitação.
  * `extraHeaders` String (opcional) - Cabeçalhos extras separados por "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (opcional)
  * `baseURLForDataURL` String (opcional) - URL base (com separador de caminho de trailing) para que os arquivos sejam carregados pela URL de dados. Isso só é necessário se o `url` especificado for uma URL de dados e precisar carregar outros arquivos.

Retorna `Promise<void>` - a promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](web-contents.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](web-contents.md#event-did-fail-load)).

O mesmo que [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

O `url` pode ser um endereço remoto (por exemplo. `http://`) ou um caminho para um arquivo HTML local usando o protocolo `file://` .

Para garantir que os URLs de arquivo sejam devidamente formatados, recomenda-se usar método [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) do Node:



```javascript
url const = require ('url').format({
  protocolo: 'file',
  barras: true,
  pathname: require('path').join(__dirname, 'index.html')


win.loadURL(url)
```


Você pode carregar uma URL usando uma solicitação de `POST` com dados codificados por URL fazendo seguinte:



```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    tipo: 'rawData',
    bytes: Buffer.from ('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```




#### `win.loadFile(filePath[, options])`

* `filePath` Cordas
* objeto `options` (opcional) 
    * `query` Record<String, String> (opcional) - Passou para `url.format()`.
  * `search` String (opcional) - Passou para `url.format()`.
  * `hash` String (opcional) - Passou para `url.format()`.

Retorna `Promise<void>` - a promessa será resolvida quando a página terminar de carregar (ver [`did-finish-load`](web-contents.md#event-did-finish-load)), e rejeita se a página não carregar (ver [`did-fail-load`](web-contents.md#event-did-fail-load)).

O mesmo que `webContents.loadFile`, `filePath` deve ser um caminho para um arquivo de HTML em relação à raiz do seu aplicativo.  Consulte os `webContents` para obter mais informações.



#### `win.reload()`

O mesmo que `webContents.reload`.



#### `win.setMenu(menu)` __Do</em> _Linux</h4> 

* `menu` Menu | null

Define o `menu` como a barra de menu da janela.



#### `win.removeMenu()` __Do</em> _Linux</h4> 

Remova a barra de menu da janela.



#### `win.setProgressBar(progress[, options])`

* `progress` Duplo
* objeto `options` (opcional) 
    * `mode` String _Windows_ - Modo para a barra de progresso. Pode ser `none`, `normal`, `indeterminate`, `error` ou `paused`.

Define valor de progresso na barra de progresso. O intervalo válido é [0, 1.0].

Remova a barra de progresso quando o progresso < 0; Mude para o modo indeterminado quando o progresso > 1.

Na plataforma Linux, só suporta o ambiente de desktop Unity, você precisa especificar o nome do arquivo `*.desktop` para `desktopName` campo em `package.json`. Por padrão, assumirá `{app.name}.desktop`.

No Windows, um modo pode ser passado. Os valores aceitos são `none`, `normal`, `indeterminate`, `error`e `paused`. Se você chamar `setProgressBar` sem um conjunto de modo (mas com um valor dentro da faixa válida), `normal` será assumido.



#### `win.setOverlayIcon(overlay, description)` __do Windows

* `overlay` [NativeImage](native-image.md) | nulo - o ícone a ser exibido na parte inferior canto direito do ícone da barra de tarefas. Se este parâmetro for `null`, a sobreposição é limpa

* `description` String - uma descrição que será fornecida aos leitores de tela acessibilidade

Define uma sobreposição de 16 x 16 pixels no ícone atual da barra de tarefas, geralmente usado para transmitir algum tipo de status do aplicativo ou notificar passivamente o usuário.



#### `win.setHasShadow(hasShadow)`

* `hasShadow` Booleano

Define se a janela deve ter uma sombra.



#### `win.hasShadow()`

Retorna `Boolean` - Se a janela tem uma sombra.



#### `win.setOpacity(opacity)` __do macOS do Windows</em> _</h4> 

* número `opacity` - entre 0,0 (totalmente transparente) e 1.0 (totalmente opaco)

Define a opacidade da janela. No Linux, não faz nada. Fora do número vinculado valores são fixados à faixa [0, 1].



#### `win.getOpacity()`

Retorna `Number` - entre 0,0 (totalmente transparente) e 1.0 (totalmente opaco). No Linux, sempre retorna 1.



#### `win.setShape(rects)` __</em> _Experimental_ _Do   Linux</h4> 

* `rects` [Retângulo[]](structures/rectangle.md) - Define uma forma na janela. Passar uma lista vazia reverte a janela para ser retangular.

A configuração de uma forma de janela determina a área dentro da janela onde o sistema permite o desenho e a interação do usuário. Fora da região dada, não serão sorteados pixels e nenhum evento do mouse. Eventos de rato fora de a região não serão recebidos por essa janela, mas cairão até o que estiver atrás da janela.



#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Retornos `Boolean` - Se os botões foram adicionados com sucesso

Adicione uma barra de ferramentas em miniatura com um conjunto especificado de botões à imagem em miniatura de uma janela em um layout de botão de barra de tarefas. Retorna um objeto `Boolean` indica se a miniatura foi adicionada com sucesso.

O número de botões na barra de ferramentas em miniatura não deve ser superior a 7 devido a sala limitada. Uma vez que você configure a barra de ferramentas em miniatura, a barra de ferramentas não pode ser removida devido à limitação da plataforma. Mas você pode chamar a API com uma matriz de vazia para limpar os botões.

O `buttons` é uma matriz de objetos `Button` :

* objeto `Button` 
    * `icon` [NativeImage](native-image.md) - O icone exibido na barra de ferramentas de miniaturas.
  * `click` Function
  * `tooltip` String (opcional) - O texto do tooltip do botão.
  * `flags` String[] (opcional) - Controle estados e comportamentos específicos do botão . Por padrão, é `['enabled']`.

As `flags` são um array que pode conter as seguintes `String`s:

* `enabled` - O botão está ativo e disponível ao usuário.
* `disabled` - O botão está desativado. Está presente, mas tem um estado visual indicando que não responderá à ação do usuário.

* `dismissonclick` - Quando o botão é clicado, o janela da miniatura é fechada imediatamente.

* `nobackground` - Não desenha a borda do botão, utiliza apenas a imagem.

* `hidden` - O botão não é exibido ao usuário.
* `noninteractive` - O botão está ativado, mas não interativo; nenhum estado de botão pressionado é desenhado. Esse valor destina-se a casos em que o botão é usado em uma notificação.



#### `win.setThumbnailClip(region)` _Windows_

* `region` [Retângulo](structures/rectangle.md) - Região da janela

Define a região da janela para mostrar como a imagem da miniatura exibida quando pairando sobre a janela na barra de tarefas. Você pode redefinir a miniatura para ser toda a janela especificando uma região vazia: `{ x: 0, y: 0, width: 0, height: 0 }`.



#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` Cordas

Define a ferramentaFina que é exibida ao pairar sobre a miniatura da janela na barra de tarefas.



#### `win.setAppDetails(options)` _Windows_

* objeto `options` 
    * `appId` String (opcional) -</a>de identificação do modelo de usuário do aplicativo da janela . Tem que ser definido, caso contrário as outras opções não terão efeito.</li> 
    
      * `appIconPath` String (opcional) -</a>ícone de relançamento da janela .</li> 
    
      * `appIconIndex` Inteiro (opcional) - Índice do ícone em `appIconPath`. Ignorado quando `appIconPath` não está definido. O padrão é `0`.
  * `relaunchCommand` String (opcional) -</a>de comando de relançamento do da janela .</li> 
    
      * `relaunchDisplayName` String (opcional) -</a>de nome de exibição de relançamento da janela .</li> </ul></li> </ul> 
    
    Define as propriedades para o botão de barra de tarefas da janela.
    
    **Nota:** `relaunchCommand` e `relaunchDisplayName` devem ser sempre definidos juntos. Se uma dessas propriedades não for definida, então nenhuma delas será usada.
    
    

#### `win.showDefinitionForSelection()` no _macOS_

O mesmo que `webContents.showDefinitionForSelection()`.



#### `win.setIcon(icon)` __Linux do Windows</em> _</h4> 

* `icon` [NativeImage](native-image.md) | String

Altera o ícone da janela.



#### `win.setWindowButtonVisibility(visible)` __macOS

* `visible` Booleano

Define se os botões do semáforo da janela devem ser visíveis.

Isso não pode ser chamado quando `titleBarStyle` está definido para `customButtonsOnHover`.



#### `win.setAutoHideMenuBar(hide)`

* `hide` Booleano

Define se a barra de menu da janela deve se esconder automaticamente. Uma vez definida a barra de menu só aparecerá quando os usuários pressionarem a tecla de `Alt` única.

Se a barra de menu já estiver visível, ligar para `setAutoHideMenuBar(true)` não o esconderá imediatamente.



#### `win.isMenuBarAutoHide()`

Devolva `Boolean` - Se a barra de menu se esconde automaticamente.



#### `win.setMenuBarVisibility(visible)` __Linux do Windows</em> _</h4> 

* `visible` Booleano

Define se a barra de menu deve ser visível. Se a barra de menu estiver ocultada automaticamente, os usuários ainda podem levantar a barra de menu pressionando a única `Alt` tecla.



#### `win.isMenuBarVisible()`

Devoluções `Boolean` - Se a barra de menu é visível.



#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Booleano
* objeto `options` (opcional) 
    * `visibleOnFullScreen` Boolean (opcional) __ macOS - Define se a janela deve ser visível acima das janelas da tela cheia

Define se a janela deve ser visível em todos os espaços de trabalho.

**Nota:** Esta API não faz nada no Windows.



#### `win.isVisibleOnAllWorkspaces()`

Retorna `Boolean` - Se a janela é visível em todos os espaços de trabalho.

**Nota:** Esta API sempre retorna falsa no Windows.



#### `win.setIgnoreMouseEvents(ignore[, opções])`

* `ignore` Booleano
* objeto `options` (opcional) 
    * `forward` Boolean (opcional) __ _o_ do   Do iCarros - Se for verdade, o mouse se move mensagens para o Chromium, permitindo eventos relacionados ao mouse, como `mouseleave`. Só é usado quando `ignore` é verdade. Se `ignore` for falso, o encaminhamento é sempre desativado independentemente desse valor.

Faz a janela ignorar todos os eventos do rato.

Todos os eventos do mouse que aconteceram nesta janela serão passados para a janela abaixo esta janela, mas se essa janela tiver foco, ela ainda receberá eventos do teclado.



#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Booleano

Impede que o conteúdo da janela seja capturado por outros aplicativos.

No macOS, ele define o compartilhamento do NSWindowType para NSWindowSharingNone. No Windows ele chama SetWindowDisplayAffinity com `WDA_EXCLUDEFROMCAPTURE`. Para a versão 2004 do Windows 10 e para cima a janela será removida da captura inteiramente, versões mais antigas do Windows se comportam como se `WDA_MONITOR` fosse aplicada capturando uma janela preta.



#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Booleano

Muda se a janela pode ser focada.

No macOS ele não remove o foco da janela.



#### `win.setParentWindow (pai)`

* `parent` browserwindow | Null

Define `parent` como a janela pai da janela atual, passando `null` transformará janela atual em uma janela de nível superior.



#### `win.getParentWindow()`

Retorna `BrowserWindow` - A janela dos pais.



#### `win.getChildWindows()`

Retorna `BrowserWindow[]` - Todas as janelas infantis.



#### `win.setAutoHideCursor(autoHide)` __macOS

* `autoHide` Booleano

Controla se deve ocultar o cursor ao digitar.



#### `win.selectPreviousTab()` no _macOS_

Seleciona a guia anterior quando as guias nativas estão habilitadas e há outras guias na janela.



#### `win.selectNextTab()` no _macOS_

Seleciona a próxima guia quando as guias nativas estiverem habilitadas e há outras guias na janela.



#### `win.mergeAllWindows()` no _macOS_

Mescla todas as janelas em uma janela com várias guias quando as guias nativas estão habilitadas e há mais de uma janela aberta.



#### `win.moveTabToNewWindow()` no _macOS_

Mova a guia atual para uma nova janela se as guias nativas estiverem ativadas e houver mais de uma guia na janela atual.



#### `win.toggleTabBar()` no _macOS_

Alterna a visibilidade da barra de guia se as guias nativas estiverem ativadas e houver apenas uma guia na janela atual.



#### `win.addTabbedWindow(browserWindow)` __macOS

* `browserWindow` BrowserWindow

Adiciona uma janela como guia nesta janela, após a guia para a instância da janela.



#### `win.setVibrancy(type)` __macOS

* | de cordas `type` nulo - Pode ser `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, ou `under-page`. Consulte a documentação [do macOS][vibrancy-docs] para mais detalhes.

Adiciona um efeito de vibração à janela do navegador. Passar `null` ou uma de corda vazia removerá o efeito de vibração na janela.

Note que `appearance-based`, `light`, `dark`, `medium-light`e `ultra-dark` foram preteridos e serão removidos em uma versão próxima do macOS.



#### `win.setTrafficLightPosition(position)` __macOS

* </a>de `position` Point</li> </ul> 
  
  Defina uma posição personalizada para os botões do semáforo. Só pode ser usado com `titleBarStyle` definido para `hidden`.
  
  

#### `win.getTrafficLightPosition()` no _macOS_

Retornos `Point` - A posição atual para os botões do semáforo. Só pode ser usado com `titleBarStyle` definido para `hidden`.



#### `win.setTouchBar(touchBar)` __macOS

* `touchBar` TouchBar | Null

Define o layout touchBar para a janela atual. Especificar `null` ou `undefined` limpa a barra de toque. Este método só tem um efeito se a máquina tiver uma barra de toque e estiver funcionando no macOS 10.12.1+.

**Nota:** A API touchbar é atualmente experimental e pode alterar ou ser removido em futuras versões eletrônicas.



#### </em>Experimental `win.setBrowserView(browserView)` _</h4> 

* `browserView` [browserView](browser-view.md) | nulo - Anexar `browserView` ao `win`. Se houver outros `BrowserView`anexados, eles serão removidos de esta janela.



#### </em>Experimental `win.getBrowserView()` _</h4> 

Retorno `BrowserView | null` - O `BrowserView` ligado ao `win`. Devolva `null` se não estiver anexado. Ele joga um erro se vários `BrowserView`s estiverem conectados.



#### </em>Experimental `win.addBrowserView(browserView)` _</h4> 

* `browserView` [browserView](browser-view.md)

API de substituição para setBrowserView trabalho de suporte com várias visualizações do navegador.



#### </em>Experimental `win.removeBrowserView(browserView)` _</h4> 

* `browserView` [browserView](browser-view.md)



#### </em>Experimental `win.setTopBrowserView(browserView)` _</h4> 

* `browserView` [browserView](browser-view.md)

Eleva `browserView` acima de outras `BrowserView`está ligada ao `win`. Lança um erro se `browserView` não estiver ligado ao `win`.



#### </em>Experimental `win.getBrowserViews()` _</h4> 

Devoluções `BrowserView[]` - um conjunto de todos os BrowserViews que foram anexados com `addBrowserView` ou `setBrowserView`.

**Nota:** A API BrowserView atualmente é experimental e pode mudar ou ser removida em versões futuras do Electron.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
