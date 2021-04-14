## Class: TouchBarButton

> Create a button in the touch bar for native macOS applications

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarButton (opções)`

* objeto `options`
  * `label` String (opcional) - Texto de botão.
  * `accessibilityLabel` String (opcional) - Uma breve descrição do botão para uso por leitores de tela como VoiceOver.
  * `backgroundColor` String (opcional) - Alterar a cor de fundo no formato hex, ou seja, `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (opcional) - Ícone do botão.
  * `iconPosition` String (opcional) - Pode ser `left`, `right` ou `overlay`. Inadimplência para `overlay`.
  * `click` Função (opcional) - Função de chamada quando o botão é clicado.
  * `enabled` Booleano (opcional) - Se o botão está em um estado habilitado.  O padrão é `true`.

Ao definir `accessibilityLabel`, certifique-se de considerar o macOS [as melhores práticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

Um `String` representando a descrição do botão a ser lido por um leitor de tela. Só será lido pelos leitores de tela se nenhum rótulo for definido.

#### `touchBarButton.label`

Um `String` representando o texto atual do botão. Alterar esse valor atualiza imediatamente o botão na barra de toque.

#### `touchBarButton.backgroundColor`

Um código hexax `String` representando a cor de fundo atual do botão. Alterar esse valor atualiza imediatamente botão na barra de toque.

#### `touchBarButton.icon`

Um `NativeImage` representando o ícone atual do botão. Alterar esse valor atualiza imediatamente o botão na barra de toque.

#### `touchBarButton.iconPosition`

Um `String` - Pode ser `left`, `right` ou `overlay`.  Inadimplência para `overlay`.

#### `touchBarButton.habilitado`

Um `Boolean` representando se o botão está em um estado habilitado.
