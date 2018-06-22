# Notificações (Windows, Linux, macOS)

Todos os três sistemas operacionais fornecem meios para os aplicativos enviarem notificações para o usuário. Electron convenientemente permite que os desenvolvedores envie notificações com a [API de notificação do HTML5](https://notifications.spec.whatwg.org/), usado as APIs do sistema operacional em execução para exibi-la.

**Nota:** Uma vez que esta é uma API do HTML5 só está disponível no processo de renderização. Se você que mostrar a notificações em um processo principal por favor, verifique o módulo [Notification](../api/notification.md).

```javascript
let myNotification = new Notification('Título', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notificação clicada')
}
```

Enquanto o código e a experiência do usuário em sistemas operacionais sejam semelhantes, há algumas diferenças.

## Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. No entanto, ele não precisa ser fixado na a tela iniciar.
* No Windows 7, notificações funcionam através de uma implementação personalizada que visualmente se assemelha aos sistemas mais novos.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

Além disso, no Windows 8, o comprimento máximo para o corpo da notificação é de 250 caracteres, o time do Windows recomenda que a notificações tenha 200 caracteres. Dito isto, essa limitação foi removida no Windows 10, mas a equipe do Windows pede que os desenvolvedores seja razoável. Tentativa de enviar gigantescas quantidades de texto pela API (milhares de caracteres) pode resultar em instabilidade.

### Notificações Avançadas

Versões posteriores do Windows permitem notificações avançadas, com os modelos personalizados, imagens e outros elementos flexíveis. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Modo Silêncio/ Apresentação

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permite que você determine antes do tempo se é ou não permitido. Caso não seja o Windows vai silenciosamente jogar a notificação para fora.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note que as notificações tem um limite de 256 bytes de tamanho e serão truncadas se você exceder esse limite.

### Notificações Avançadas

Versões posteriores do macOS permitem notificações com um campo de entrada, permitindo o usuário responder rapidamente uma notificação. Para enviar uma notificação com um campo de entrada, use o módulo da userland [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Não perturbe / Estado de sessão

Para detectar se é ou não permitido enviar uma notificação, use o módulo da userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Isso permitirá você detectar antes do tempo ou não a notificação que será exibida.

## Linux

Notificações são enviadas usando `libnotify` que podem mostrar notificações em qualquer ambiente de trabalho que segue as [Especificação de Notificação em Desktop](https://developer.gnome.org/notification-spec/), incluindo Cinnamon, Enlightenment, Unity, GNOME, KDE.