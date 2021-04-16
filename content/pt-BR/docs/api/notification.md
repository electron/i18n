# Notificação

> Criar notificações para o desktop do sistema

Processo: [Main](../glossary.md#main-process)

## Usando no processo renderizador

Se você quiser mostrar Notificações de um processo de renderização, você deve usar a API de notificação HTML5 [](../tutorial/notifications.md)

## Class: Notification

> Criar notificações para o desktop do sistema

Processo: [Main](../glossary.md#main-process)

`Notification` é um [][event-emitter]eventEmitter.

Cria um novo `Notification` com propriedades nativas definidas pelo `options`.

### Métodos estáticos

A classe `Notification` tem os seguintes métodos estáticos:

#### `Notification.isSupported()`

Retorna `Boolean` - se as notificações do desktop são suportadas ou não pelo atual sistema

### `nova Notificação([options])`

* objeto `options` (opcional)
  * `title` String (opcional) - Um título para a notificação, que será mostrado na parte superior da janela de notificação quando for mostrado.
  * `subtitle` String (opcional) __ do macOS - Uma legenda para a notificação, que será exibida abaixo do título.
  * `body` String (opcional) - O texto do corpo da notificação, que será exibido abaixo do título ou legenda.
  * `silent` Boolean (opcional) - Emitir ou não um ruído de notificação do SISTEMA OPERACIONAL ao mostrar a notificação.
  * `icon` (| de cordas [NativeImage](native-image.md)) (opcional) - Um ícone a ser usado na notificação.
  * `hasReply` Boolean (opcional) __ do macOS - Adicionar ou não uma opção de resposta inline à notificação.
  * `timeoutType` String (opcional) _o Linux_ __ do Windows - A duração do tempo limite da notificação. Pode ser 'padrão' ou 'nunca'.
  * `replyPlaceholder` String (opcional) __ macOS - O espaço reservado para escrever no campo de entrada de resposta inline.
  * `sound` String (opcional) __ do macOS - O nome do arquivo de som a ser reproduzido quando a notificação é mostrada.
  * `urgency` String (opcional) __ Linux - O nível de urgência da notificação. Pode ser 'normal', 'crítico' ou 'baixo'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (opcional) __ do macOS - Ações a serem adicionadas à notificação. Leia as ações e limitações disponíveis na documentação `NotificationAction` .
  * `closeButtonText` String (opcional) __ macOS - Um título personalizado para o botão de fechamento de um alerta. Uma sequência vazia fará com que o texto localizado padrão seja usado.
  * `toastXml` String (opcional) __ do Windows - Uma descrição personalizada da Notificação no Windows substituindo todas as propriedades acima. Fornece personalização completa do design e comportamento da notificação.

### Eventos de instância

Objetos criados com `new Notification` emitem os seguintes eventos:

**Nota:** Alguns eventos só estão disponíveis em sistemas operacionais específicos e são rotulados como tal.

#### Evento: 'show'

Retorna:

* `event` Event

Emitido quando a notificação é mostrada ao usuário, observe que isso pode ser disparado várias vezes, pois uma notificação pode ser mostrada várias vezes através do método `show()` .

#### Evento: 'clique'

Retorna:

* `event` Event

Emitido quando a notificação é clicada pelo usuário.

#### Evento: 'close'

Retorna:

* `event` Event

Emitido quando a notificação é encerrada por intervenção manual do usuário.

Este evento não tem garantia de ser emitido em todos os casos em que a notificação estiver encerrada.

#### Evento: 'responder' __do macOS

Retorna:

* `event` Event
* `reply` String - A sequência que o usuário inseriu no campo de resposta inline.

Emitido quando o usuário clica no botão "Responder" em uma notificação com `hasReply: true`.

#### Evento: 'ação' __do macOS

Retorna:

* `event` Event
* `index` Número - O índice da ação que foi ativada.

#### Event: 'failed' _Windows_

Retorna:

* `event` Event
* `error` String - The error encountered during execution of the `show()` method.

Emitted when an error is encountered while creating and showing the native notification.

### Métodos de Instância

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### Propriedades de Instância

#### `notification.title`

A `String` property representing the title of the notification.

#### `notification.subtitle`

A `String` property representing the subtitle of the notification.

#### `notification.body`

A `String` property representing the body of the notification.

#### `notification.replyPlaceholder`

A `String` property representing the reply placeholder of the notification.

#### `notification.sound`

A `String` property representing the sound of the notification.

#### `notification.closeButtonText`

A `String` property representing the close button text of the notification.

#### `notification.silent`

A `Boolean` property representing whether the notification is silent.

#### `notification.hasReply`

A `Boolean` property representing whether the notification has a reply action.

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Pode ser 'normal', 'crítico' ou 'baixo'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Pode ser 'padrão' ou 'nunca'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

#### `notification.toastXml` _Windows_

A `String` property representing the custom Toast XML of the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
