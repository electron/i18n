# Notificações (Windows, Linux, macOS)

## Visão Geral

Todos os três sistemas operacionais fornecem meios para que os aplicativos enviem notificações para o usuário. A técnica de mostrar notificações é diferente para os processos Principal e Renderizador.

Para o processo Renderer, o Electron permite convenientemente que os desenvolvedores enviem notificações com a API de notificação de [HTML5](https://notifications.spec.whatwg.org/), , usando as APIs de notificação nativas do sistema operacional em execução para exibi-la.

Para mostrar notificações no processo principal, precisa usar o módulo [Notificação](../api/notification.md).

## Exemplo

### Mostrar notificações no processo de Renderização

Assumindo que você tem um aplicativo Electron funcional do [Guia de início Rápido](quick-start.md), adicione a seguinte linha ao índice `. tml` arquivo antes do fechamento `</body>` etiqueta:

```html
<script src="renderer.js"></script>
```

e adicione o arquivo</code> de renderização do `renderers:</p>

<pre><code class="javascript fiddle='docs/fiddles/features/notifications/renderer'">const myNotification = new Notification('Título', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notificação clicada')
}
`</pre>

Após iniciar o aplicativo Electron, você verá a notificação:

![Notificação no processo de renderização](../images/notification-renderer.png)

Se você abrir o Console e clicar na notificação, você verá a mensagem gerada depois de acionar o evento `onclick`:

![Mensagem Onclick para a notificação](../images/message-notification-renderer.png)

### Mostrar notificações no processo principal

Começando com um aplicativo de trabalho do [Guia de Início Rápido](quick-start.md), atualize o arquivo `main.js` com as seguintes linhas:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Após iniciar o aplicativo Electron, você verá a notificação:

![Notificação no processo principal](../images/notification-main.png)

## Informação Adicional

Enquanto o código e a experiência do usuário em sistemas operacionais sejam semelhantes, há algumas diferenças.

### Windows

* No Windows 10, um atalho para seu aplicativo com um [ID de usuário do modelo de aplicativo](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) deve ser instalado no menu Iniciar. Isto pode ser overkill durante o desenvolvimento, então adicionar `node_modules\electron\dist\electron.exe` no seu Menu Inicial também faz o truque. Navegue até o arquivo no Explorer, clique com o botão direito e "Fixar em Iniciar". Em seguida, você precisará adicionar a linha `app.setAppUserModelId(process.execPath)` ao seu processo principal para ver as notificações.
* No Windows 8.1 e Windows 8, um atalho para o seu aplicativo, com um, [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) deve ser instalado na tela inicial. No entanto, ele não precisa ser fixado na a tela iniciar.
* No Windows 7, notificações funcionam através de uma implementação personalizada que visualmente se assemelha aos sistemas mais novos.

O Electron tenta automatizar o trabalho em torno do Application User Model ID. Quando o Electron é usado juntamente com o framework de instalação e atualização Squirrel, [atalhos serão definidos automaticamente corretamente](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Além disso, Electron irá detectar que o Squirrel foi usado e irá chamar automaticamente `app.setAppUserModelId()` com o valor correto. Durante o desenvolvimento, você pode ter que chamar [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) por si só.

Além disso, no Windows 8, o comprimento máximo para o corpo da notificação é de 250 caracteres, o time do Windows recomenda que a notificações tenha 200 caracteres. Dito isto, essa limitação foi removida no Windows 10, mas a equipe do Windows pede que os desenvolvedores seja razoável. Tentativa de enviar gigantescas quantidades de texto pela API (milhares de caracteres) pode resultar em instabilidade.

#### Notificações Avançadas

Versões posteriores do Windows permitem notificações avançadas, com os modelos personalizados, imagens e outros elementos flexíveis. Para enviar essas notificações(tanto do processo principal, quanto do processo de renderização), use o módulo de userland [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), que usa addons nativos Node parar enviar `ToastNotification` e objetos `TileNotification`.

Enquanto as notificações incluindo botões trabalham com `o electron-windows-notifics`, manipular respostas requer o uso de [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), que ajuda a registrar os componentes COM necessários e chamar o seu aplicativo Electron com os dados de usuário inseridos.

#### Modo Silêncio/ Apresentação

Para detectar se você tem permissão para enviar uma notificação, use o módulo userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permite que você determine antes do tempo se o Windows irá ou não silenciosamente lançar a notificação fora.

### macOS

As notificações são simples no macOS, mas você deve estar ciente das [diretrizes da Interface Humana da Apple sobre notificações](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note que as notificações tem um limite de 256 bytes de tamanho e serão truncadas se você exceder esse limite.

#### Notificações Avançadas

Versões posteriores do macOS permitem notificações com um campo de entrada, permitindo o usuário responder rapidamente uma notificação. Para enviar uma notificação com um campo de entrada, use o módulo da userland [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Não perturbe / Estado de sessão

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permitirá você detectar antes do tempo ou não a notificação que será exibida.

### Linux

Notificações são enviadas usando `libnotify` que podem mostrar notificações em qualquer ambiente de trabalho que segue as [Especificação de Notificação em Desktop](https://developer.gnome.org/notification-spec/), incluindo Cinnamon, Enlightenment, Unity, GNOME, KDE.
