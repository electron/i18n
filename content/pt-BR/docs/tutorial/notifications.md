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

* No Windows 10, notificações "simplesmente funcionam".
* No Windows 8.1 e Windows 8, um atalho para o seu aplicativo, com um, [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) deve ser instalado na tela inicial. No entanto, ele não precisa ser fixado na a tela iniciar.
* No Windows 7, notificações funcionam através de uma implementação personalizada que visualmente se assemelha aos sistemas mais novos.

Além disso, no Windows 8, o comprimento máximo para o corpo da notificação é de 250 caracteres, o time do Windows recomenda que a notificações tenha 200 caracteres. Dito isto, essa limitação foi removida no Windows 10, mas a equipe do Windows pede que os desenvolvedores seja razoável. Tentativa de enviar gigantescas quantidades de texto pela API (milhares de caracteres) pode resultar em instabilidade.

### Notificações Avançadas

Versões posteriores do Windows permitem notificações avançadas, com os modelos personalizados, imagens e outros elementos flexíveis. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Modo Silêncio/ Apresentação

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Notificações Avançadas

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.