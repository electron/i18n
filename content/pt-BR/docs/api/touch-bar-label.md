## Class: TouchBarLabel

> Crie um rótulo na barra de toque para aplicações nativas do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarLabel (opções)`

* objeto `options`
  * `label` String (opcional) - Texto a ser exibido.
  * `accessibilityLabel` String (opcional) - Uma breve descrição do botão para uso por leitores de tela como VoiceOver.
  * `textColor` String (opcional) - Cor hexa de texto, ou seja, `#ABCDEF`.

Ao definir `accessibilityLabel`, certifique-se de considerar o macOS [as melhores práticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarLabel`:

#### `touchBarLabel.label`

Um `String` representando o texto atual da etiqueta. Alterar esse valor atualiza imediatamente o rótulo em a barra de toque.

#### `touchBarLabel.accessibilityLabel`

Um `String` representando a descrição do rótulo a ser lido por um leitor de tela.

#### `touchBarLabel.textColor`

Um código hexax `String` representando a cor de texto atual da etiqueta. Alterar esse valor atualiza imediatamente o rótulo na barra de toque.
