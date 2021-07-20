# Notificações (Windows, Linux, macOS)

## Visão Geral

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## Exemplo

### Show notifications in the Renderer process

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

...and add the `renderer.js` file:

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const NOTIFICACAO_TITULO = 'Title'
const NOTIFICACAO_CORPO = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MENSAGEM = 'Notificação clicada!'

new Notification(NOTIFICACAO_TITULO, { body: NOTIFICACAO_CORPO })
  .onclick = () => console.log(CLICK_MENSAGEM)
```

Após iniciar o aplicativo Electron, você verá a notificação:

![Notification in the Renderer process](../images/notification-renderer.png)

Além disso, se você clicar na notificação, o DOM atualizará para exibir 'Notificação clicada!".

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Após executar a aplicação em Electron, você deve ver a notificação do sistema:

![Notification in the Main process](../images/notification-main.png)

## Additional information

Enquanto o código e a experiência do usuário em sistemas operacionais sejam semelhantes, há algumas diferenças.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navegue até o arquivo no Explorer, clique com o botão direito e "Fixar em Iniciar". You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* No Windows 8.1 e Windows 8, um atalho para o seu aplicativo, com um, [Application User Model ID][app-user-model-id] deve ser instalado na tela inicial. No entanto, ele não precisa ser fixado na a tela iniciar.
* No Windows 7, notificações funcionam através de uma implementação personalizada que visualmente se assemelha aos sistemas mais novos.

O Electron tenta automatizar o trabalho em torno do Application User Model ID. Quando o Electron é usado juntamente com o framework de instalação e atualização Squirrel, [atalhos serão definidos automaticamente corretamente][squirrel-events]. Além disso, Electron irá detectar que o Squirrel foi usado e irá chamar automaticamente `app.setAppUserModelId()` com o valor correto. Durante o desenvolvimento, você pode ter que chamar [`app.setAppUserModelId()`][set-app-user-model-id] por si só.

Além disso, no Windows 8, o comprimento máximo para o corpo da notificação é de 250 caracteres, o time do Windows recomenda que a notificações tenha 200 caracteres. Dito isto, essa limitação foi removida no Windows 10, mas a equipe do Windows pede que os desenvolvedores seja razoável. Tentativa de enviar gigantescas quantidades de texto pela API (milhares de caracteres) pode resultar em instabilidade.

#### Notificações Avançadas

Versões posteriores do Windows permitem notificações avançadas, com os modelos personalizados, imagens e outros elementos flexíveis. Para enviar essas notificações(tanto do processo principal, quanto do processo de renderização), use o módulo de userland [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), que usa addons nativos Node parar enviar `ToastNotification` e objetos `TileNotification`.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Modo Silêncio/ Apresentação

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

As notificações são simples no macOS, mas você deve estar ciente das [diretrizes da Interface Humana da Apple sobre notificações][apple-notification-guidelines].

Note que as notificações tem um limite de 256 bytes de tamanho e serão truncadas se você exceder esse limite.

#### Não perturbe / Estado de sessão

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state][electron-notification-state].

Isso permitirá você detectar antes do tempo ou não a notificação que será exibida.

### Linux

Notificações são enviadas usando `libnotify` que podem mostrar notificações em qualquer ambiente de trabalho que segue as [Especificação de Notificação em Desktop][notification-spec], incluindo Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
