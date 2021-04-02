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

#### Evento: 'falhou' __do Windows

Retorna:

* `event` Event
* `error` String - O erro encontrado durante a execução do método `show()` .

Emitido quando um erro é encontrado ao criar e mostrar a notificação nativa.

### Métodos de Instância

Objetos criados com `new Notification` têm os seguintes métodos de instância:

#### `notification.show()`

Imediatamente mostra a notificação ao usuário, observe que isso significa ao contrário da implementação de notificação HTML5 , instanciando um `new Notification` não mostrado imediatamente ao usuário, você precisa chamar este método antes que o do SISTEMA OPERACIONAL o exiba.

Se a notificação tiver sido mostrada antes, este método descartará a notificação anteriormente mostrada e criará uma nova com propriedades idênticas.

#### `notification.close()`

Descarta a notificação.

### Propriedades de Instância

#### `notification.title`

Uma propriedade `String` representando o título da notificação.

#### `notificação.legenda`

Um `String` propriedade representando a legenda da notificação.

#### `notificação.corpo`

Uma propriedade `String` representando o corpo da notificação.

#### `notification.replyPlaceholder`

Um `String` propriedade representando o espaço reservado de resposta da notificação.

#### `notification.sound`

Uma propriedade `String` representando o som da notificação.

#### `notification.closeButtonText`

Uma propriedade `String` representando o texto do botão de fechamento da notificação.

#### `notificação.silent`

Uma propriedade `Boolean` representando se a notificação é silenciosa.

#### `notificação.hasReply`

Um `Boolean` propriedade representando se a notificação tem uma ação de resposta.

#### </em>Linux `notification.urgency` _</h4>

Um `String` imóvel representando o nível de urgência da notificação. Pode ser 'normal', 'crítico' ou 'baixo'.

A inadimplência é 'baixa' - veja [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) para obter mais informações.

#### `notification.timeoutType` __Do</em> _Linux</h4>

Uma propriedade `String` representando o tipo de tempo limite para a notificação. Pode ser 'padrão' ou 'nunca'.

Se `timeoutType` for definida como 'nunca', a notificação nunca expira. Ele permanece aberto até ser fechado pela API de chamada ou pelo usuário.

#### `notification.actions`

Um [`NotificationAction[]`](structures/notification-action.md) imóvel representando as ações da notificação.

#### `notification.toastXml` __do Windows

Uma propriedade `String` representando o Toast XML personalizado da notificação.

### Tocando Sons

No macOS, você pode especificar o nome do som que deseja reproduzir quando a notificação for mostrada. Qualquer um dos sons padrão (em System Preferences > Sound) pode ser usado, além de arquivos de som personalizados. Certifique-se de que o arquivo de som seja copiado sob o pacote de aplicativos (por exemplo, `YourApp.app/Contents/Resources`), ou um dos seguintes locais:

* `~/Biblioteca/Sons`
* `/Biblioteca/Sons`
* `/Rede/Biblioteca/Sons`
* `/Sistema/Biblioteca/Sons`

Consulte os [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) para obter mais informações.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
