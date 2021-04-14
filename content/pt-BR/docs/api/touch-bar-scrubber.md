## Class: TouchBarScrubber

> Crie um purificador (um seletor rolável)

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarScrubber (opções)`

* objeto `options`
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Uma variedade de itens para colocar neste purificador.
  * `select` Função (opcional) - Chamado quando o usuário toca em um item que não foi o último item tocado.
    * `selectedIndex` Inteiro - O índice do item selecionado pelo usuário.
  * `highlight` Função (opcional) - Chamado quando o usuário tocar em qualquer item.
    * `highlightedIndex` Inteiro - O índice do item tocado pelo usuário.
  * `selectedStyle` String (opcional) - Estilo de item selecionado. Pode ser `background`, `outline` ou `none`. Inadimplência para `none`.
  * `overlayStyle` String (opcional) - Estilo de item de sobreposição selecionado. Pode ser `background`, `outline` ou `none`. Inadimplência para `none`.
  * `showArrowButtons` Booleano (opcional) - Inadimplência para `false`.
  * `mode` String (opcional) - Pode ser `fixed` ou `free`. O padrão é `free`.
  * `continuous` Booleano (opcional) - Inadimplência para `true`.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarScrubber`:

#### `touchBarScrubber.itens`

Uma matriz `ScrubberItem[]` representando os itens deste purificador. Atualizando esse valor imediatamente atualiza o controle na barra de toque. Atualizar propriedades profundas dentro deste conjunto **não atualiza a barra de toque**.

#### `touchBarScrubber.selectedStyle`

Um `String` representando o estilo que os itens selecionados no purificador devem ter. Atualizando esse valor imediatamente atualiza o controle na barra de toque. Valores possíveis:

* `background` - Mapas para `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapas para `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Remove todos os estilos.

#### `touchBarScrubber.overlayStyle`

Um `String` representando o estilo que os itens selecionados no purificador devem ter. Este estilo é sobreposto em cima do item de esfregador em vez de ser colocado atrás dele. A atualização deste valor atualiza imediatamente o controle na barra de toque . Valores possíveis:

* `background` - Mapas para `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapas para `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Remove todos os estilos.

#### `touchBarScrubber.showArrowButtons`

Um `Boolean` representando se deve mostrar as setas de seleção esquerda/direita neste esfregador. Atualizando esse valor atualiza imediatamente o controle na barra de toque.

#### `touchBarScrubber.mode`

Um `String` representando o modo deste purificador. Atualizando esse valor imediatamente atualiza o controle na barra de toque. Valores possíveis:

* `fixed` - Mapas para `NSScrubberModeFixed`.
* `free` - Mapas para `NSScrubberModeFree`.

#### `touchBarScrubber.contínuo`

Um `Boolean` representando se este esfregador é contínuo ou não. Atualizando esse valor imediatamente atualiza o controle na barra de toque.
