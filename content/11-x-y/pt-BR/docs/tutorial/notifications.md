# Notificações (Windows, Linux, macOS)

Todos os três sistemas operacionais fornecem meios para os aplicativos enviarem notificações para o usuário. Electron convenientemente permite que os desenvolvedores envie notificações com a [API de notificação do HTML5](https://notifications.spec.whatwg.org/), usado as APIs do sistema operacional em execução para exibi-la.

**Nota:** Uma vez que esta é uma API do HTML5 só está disponível no processo de renderização. Se você que mostrar a notificações em um processo principal por favor, verifique o módulo [Notification](../api/notification.md).

```javascript
const myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Enquanto o código e a experiência do usuário em sistemas operacionais sejam semelhantes, há algumas diferenças.

## Windows
* No Windows 10, um atalho para seu aplicativo com um [Application User Model ID][app-user-model-id] deve ser instalado no Menu Iniciar. Isso pode ser desnecessário durante o desenvolvimento, então adicionar `node_modules\electron\dist\electron.exe` ao Menu Iniciar também funciona. Navegue até o arquivo no Explorer, clique com o botão direito e "Fixar em Iniciar". Você vai precisar adicionar a linha `app.setAppUserModelId(process.execPath)` ao seu processo principal parar ver as notificações.
* No Windows 8.1 e Windows 8, um atalho para o seu aplicativo, com um, [Application User Model ID][app-user-model-id] deve ser instalado na tela inicial. No entanto, ele não precisa ser fixado na a tela iniciar.
* No Windows 7, notificações funcionam através de uma implementação personalizada que visualmente se assemelha aos sistemas mais novos.

O Electron tenta automatizar o trabalho em torno do Application User Model ID. Quando o Electron é usado juntamente com o framework de instalação e atualização Squirrel, [atalhos serão definidos automaticamente corretamente][squirrel-events]. Além disso, Electron irá detectar que o Squirrel foi usado e irá chamar automaticamente `app.setAppUserModelId()` com o valor correto. Durante o desenvolvimento, você pode ter que chamar [`app.setAppUserModelId()`][set-app-user-model-id] por si só.

Além disso, no Windows 8, o comprimento máximo para o corpo da notificação é de 250 caracteres, o time do Windows recomenda que a notificações tenha 200 caracteres. Dito isto, essa limitação foi removida no Windows 10, mas a equipe do Windows pede que os desenvolvedores seja razoável. Tentativa de enviar gigantescas quantidades de texto pela API (milhares de caracteres) pode resultar em instabilidade.

### Notificações Avançadas

Versões posteriores do Windows permitem notificações avançadas, com os modelos personalizados, imagens e outros elementos flexíveis. Para enviar essas notificações(tanto do processo principal, quanto do processo de renderização), use o módulo de userland [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), que usa addons nativos Node parar enviar `ToastNotification` e objetos `TileNotification`.

Enquanto as notificações incluindo botões funcionam com `electron-windows-notifications`, manipular respostas requer o uso de [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) que ajuda a registrar os componentes COM necessários e chamar seu aplicativo Electron com a entrada do usuário.

### Modo Silêncio/ Apresentação

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permite que você determine antes do tempo se é ou não permitido. Caso não seja o Windows vai silenciosamente jogar a notificação para fora.

## macOS

As notificações são simples no macOS, mas você deve estar ciente das [diretrizes da Interface Humana da Apple sobre notificações](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note que as notificações tem um limite de 256 bytes de tamanho e serão truncadas se você exceder esse limite.

### Notificações Avançadas

Versões posteriores do macOS permitem notificações com um campo de entrada, permitindo o usuário responder rapidamente uma notificação. Para enviar uma notificação com um campo de entrada, use o módulo da userland [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Não perturbe / Estado de sessão

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permitirá você detectar antes do tempo ou não a notificação que será exibida.

## Linux

Notificações são enviadas usando `libnotify` que podem mostrar notificações em qualquer ambiente de trabalho que segue as [Especificação de Notificação em Desktop][notification-spec], incluindo Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
