## Class: Tray

> Adicione ícones e menus de contexto à área de notificação do sistema.

Processo: [Main](../glossary.md#main-process)

`Tray` é um [][event-emitter]eventEmitter.

```javascript
const { app, Menu, Tray } = requer ('elétron')

deixa bandeja =
-feira nulo.whenReady().then(()=> { bandeja
  = nova bandeja ('/path/to/my/icon')
  contexto constMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  bandeja.setToolTip('Este é o meu aplicativo.')
  tray.setContextMenu(contextMenu)
})
```

__Limitações de plataforma:__

* No Linux, o indicador do aplicativo será usado se for suportado, caso contrário, `GtkStatusIcon` será usado em vez disso.
* Em distribuições Linux que só têm suporte a indicadores de aplicativos, você tem que instalar `libappindicator1` para fazer o ícone da bandeja funcionar.
* O indicador do aplicativo só será mostrado quando tiver um menu de contexto.
* Quando o indicador de aplicativo é usado no Linux, o evento `click` é ignorado.
* No Linux para que as alterações feitas em `MenuItem`individuais entrem em vigor, você tem que chamar `setContextMenu` novamente. Como por exemplo:

```javascript
const { app, Menu, Tray } = require ('electron')

deixar appIcon =
nulo app.whenReady().then(((() => {
  appIcon = nova Bandeja ('/path/to/my/icon')
  contexto constMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Faça uma alteração no menu de contexto
  contextoMenu.items[1].checked = false

  // Ligue novamente para o Linux porque modificamos o menu de contexto
  appIcon.setContextMenu(contextMenu)
})
```

* No Windows é recomendado usar `ICO` ícones para obter melhores efeitos visuais.

Se você quiser manter exatamente os mesmos comportamentos em todas as plataformas, você não deve confiar no evento `click` e sempre anexar um menu de contexto ao ícone da bandeja.

### `nova Bandeja (imagem, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (opcional) __ do Windows - Atribui um GUID ao ícone da bandeja. Se o executável for assinado e a assinatura contiver uma organização na linha de assunto, então o GUID está permanentemente associado a essa assinatura. As configurações de nível de SO, como a posição do ícone da bandeja na bandeja do sistema, persistirão mesmo que o caminho para as alterações executáveis. Se o executável não for assinado por código, o GUID será permanentemente associado ao caminho para o executável. Mudar o caminho para o executável quebrará a criação do ícone da bandeja e um novo GUID deve ser usado. No entanto, é altamente recomendável usar o parâmetro GUID apenas em conjunto com executável assinado por código. Se um aplicativo definir vários ícones de bandeja, cada ícone deve usar um GUID separado.

Cria um novo ícone de bandeja associado ao `image`.

### Eventos de instância

O módulo `Tray` emite os seguintes eventos:

#### Evento: 'clique'

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Retângulo](structures/rectangle.md) - Os limites do ícone da bandeja.
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o ícone da bandeja é clicado.

#### Evento: 'clique com o botão direito' __ _do_do Apple

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Retângulo](structures/rectangle.md) - Os limites do ícone da bandeja.

Emitido quando o ícone da bandeja é clicado com o botão direito do mouse.

#### Evento: 'double-click' _macOS_ _Windows_

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Retângulo](structures/rectangle.md) - Os limites do ícone da bandeja.

Emitido quando o ícone da bandeja é clicado duas vezes.

#### Evento: 'balão-show' _Windows_

Emitido quando o balão da bandeja aparece.

#### Evento: 'balão-click' _Windows_

Emitido quando o balão da bandeja é clicado.

#### Evento: 'balão fechado' _Windows_

Emitido quando o balão da bandeja é fechado por causa do tempo limite ou do usuário manualmente o fecha.

#### Evento: 'drop' __do macOS

Emitido quando quaisquer itens arrastados são deixados no ícone da bandeja.

#### Evento: 'drop-files' __do macOS

Retorna:

* `event` Event
* `files` String[] - Os caminhos dos arquivos descartados.

Emitidos quando os arquivos arrastados são deixados no ícone da bandeja.

#### Evento: 'drop-text' __do macOS

Retorna:

* `event` Event
* `text` String - a sequência de texto descartada.

Emitido quando o texto arrastado é deixado no ícone da bandeja.

#### Evento: 'arrastar-enter' __do macOS

Emitido quando uma operação de arrasto entra no ícone da bandeja.

#### Evento: 'drag-leave' __do macOS

Emitido quando uma operação de arrasto sai do ícone da bandeja.

#### Evento: 'drag-end' __do macOS

Emitido quando uma operação de arrasto termina na bandeja ou termina em outro local.

#### Evento: 'mouse-up' __do macOS

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o mouse é liberado de clicar no ícone da bandeja.

Nota: Isso não será emitido se você tiver definido um menu de contexto para sua bandeja usando `tray.setContextMenu`, como resultado de restrições de nível macOS.

#### Evento: 'mouse-down' __do macOS

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o mouse clica no ícone da bandeja.

#### Evento: 'mouse-enter' __do macOS

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o mouse entra no ícone da bandeja.

#### Evento: 'mouse-leave' __do macOS

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o mouse sai do ícone da bandeja.

#### Evento: 'mouse-move' _macOS_ _Windows_

Retorna:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - A posição do evento.

Emitido quando o mouse se move no ícone da bandeja.

### Métodos de Instância

A classe `Tray` tem os seguintes métodos:

#### `tray.destroy()`

Destrói o ícone da bandeja imediatamente.

#### `tray.setImage (imagem)`

* `image` ([NativeImage](native-image.md) | String)

Define o `image` associado a este ícone de bandeja.

#### `tray.setPressedImage(image)` __macOS

* `image` ([NativeImage](native-image.md) | String)

Define o `image` associado a este ícone de bandeja quando pressionado no macOS.

#### `tray.setToolTip (toolTip)`

* `toolTip` Cordas

Define o texto do hover para este ícone de bandeja.

#### `tray.setTitle(title[, options])` __macOS

* `title` String
* objeto `options` (opcional)
  * `fontType` String (opcional) - A variante da família da fonte a ser exibida, pode ser `monospaced` ou `monospacedDigit`. `monospaced` está disponível no macOS 10.15+ e `monospacedDigit` está disponível no macOS 10.11+.  Quando deixado em branco, o título usa a fonte padrão do sistema.

Define o título exibido ao lado do ícone da bandeja na barra de status (suporte às cores ANSI).

#### `tray.getTitle()` no _macOS_

Devoluções `String` - o título exibido ao lado do ícone da bandeja na barra de status

#### `tray.setIgnoreDoubleClickEvents(ignore)` __macOS

* `ignore` Booleano

Define a opção de ignorar eventos de clique duplo. Ignorar esses eventos permite que você de detectar cada clique individual do ícone da bandeja.

Esse valor é definido como falso por padrão.

#### `tray.getIgnoreDoubleClickEvents()` no _macOS_

Devoluções `Boolean` - Se os eventos de clique duplo serão ignorados.

#### `tray.displayBalloon(options)` _Windows_

* objeto `options`
  * `icon` (</a> | NativeImage

String) (opcional) - Ícone a ser usado quando `iconType` estiver `custom`.</li> 
    
      * `iconType` String (opcional) - Pode ser `none`, `info`, `warning`, `error` ou `custom`. O padrão é `custom`.
  * `title` String
  * `content` Cordas
  * `largeIcon` Booleano (opcional) - A versão grande do ícone deve ser usada. O padrão é `true`. Mapas para [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Booleano (opcional) - Não toque o som associado. Por padrão é `false`. Mapas para [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (opcional) - Não exiba a notificação do balão se o usuário atual estiver em "tempo de silêncio". Por padrão é `false`. Mapas para [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].</ul></li> </ul> 

Exibe um balão de bandeja.



#### `tray.removeBalloon()` __do Windows

Remove um balão de bandeja.



#### `tray.focus()` __do Windows

O foco de retornos para a área de notificação da barra de tarefas. Os ícones da área de notificação devem usar esta mensagem quando tiverem concluído sua operação de interface do usuário. Por exemplo, se o ícone exibir um menu de atalho, mas o usuário pressionar o ESC para cancelá-lo, usar `tray.focus()` para retornar o foco à área de notificação.



#### `tray.popUpContextMenu([menu, position])` __ __do MacOS

* Menu `menu` (opcional)
* `position` [Point](structures/point.md) (opcional) - A posição pop-up.

Aparece o menu de contexto do ícone da bandeja. Quando `menu` for aprovada, o `menu` será mostrado em vez do menu de contexto do ícone da bandeja.

`position` está apenas disponível no Windows, sendo (0, 0) por padrão.



#### `tray.closeContextMenu()` _macOS_ _Windows_

Fecha um menu de contexto aberto, conforme definido por `tray.setContextMenu()`.



#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Define o menu de contexto para este ícone.



#### `tray.getBounds()` _macOS_ _Windows_

Retornos [`Rectangle`](structures/rectangle.md)

A `bounds` deste ícone de bandeja como `Object`.



#### `tray.isDestroyed()`

Devoluções `Boolean` - Se o ícone da bandeja é destruído.

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
