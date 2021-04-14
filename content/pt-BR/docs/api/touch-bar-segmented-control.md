## Class: TouchBarSegmentedControl

> Crie um controle segmentado (um grupo de botões) onde um botão tem um estado selecionado

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarSegmentedControl (opções)`

* objeto `options`
  * `segmentStyle` String (opcional) - Estilo dos segmentos:
    * `automatic` - Padrão. O aparecimento do controle segmentado é automaticamente determinado com base no tipo de janela em que o controle é exibido e a posição dentro da janela. Mapas para `NSSegmentStyleAutomatic`.
    * `rounded` - O controle é exibido usando o estilo arredondado. Mapas para `NSSegmentStyleRounded`.
    * `textured-rounded` - O controle é exibido usando o estilo arredondado texturizado. Mapas para `NSSegmentStyleTexturedRounded`.
    * `round-rect` - O controle é exibido usando o estilo de retificada redondo. Mapas para `NSSegmentStyleRoundRect`.
    * `textured-square` - O controle é exibido usando o estilo de quadrada texturizada. Mapas para `NSSegmentStyleTexturedSquare`.
    * `capsule` - O controle é exibido usando o estilo cápsula. Mapas para `NSSegmentStyleCapsule`.
    * `small-square` - O controle é exibido usando o pequeno estilo quadrado. Mapas para `NSSegmentStyleSmallSquare`.
    * `separated` - Os segmentos no controle são exibidos muito próximos de cada outro, mas não se tocando. Mapas para `NSSegmentStyleSeparated`.
  * `mode` String (opcional) - O modo de seleção do controle:
    * `single` - Padrão. Um item selecionado de cada vez, selecionando um desmarca o item selecionado anteriormente. Mapas para `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Vários itens podem ser selecionados por vez. Mapas para `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Faça com que os segmentos atuem como botões, cada segmento pode ser pressionado e liberado, mas nunca marcado como ativo. Mapas para `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Uma série de segmentos para colocar neste controle.
  * `selectedIndex` Integer (opcional) - O índice do segmento atualmente selecionado, será atualizado automaticamente com a interação do usuário. Quando o modo estiver `multiple` será o último item selecionado.
  * `change` Função (opcional) - Chamado quando o usuário seleciona um novo segmento.
    * `selectedIndex` Inteiro - O índice do segmento selecionado pelo usuário.
    * `isSelected` Boolean - Seja como resultado da seleção do usuário, o segmento é selecionado ou não.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

Um `String` representando os controles do estilo atual do segmento. A atualização deste valor atualiza imediatamente o controle na barra de toque.

#### `touchBarSegmentedControl.segments`

Uma matriz `SegmentedControlSegment[]` representando os segmentos neste controle. Atualizando esse valor imediatamente atualiza o controle na barra de toque. Atualizar propriedades profundas dentro deste conjunto **não atualiza a barra de toque**.

#### `touchBarSegmentedControl.selectedIndex`

Uma `Integer` representando o segmento atualmente selecionado. Alterar esse valor atualiza imediatamente o controle na barra de toque. A interação do usuário com a barra de toque atualizará esse valor automaticamente.

#### `touchBarSegmentedControl.mode`

Um `String` representando o modo de seleção atual do controle.  Pode ser `single`, `multiple` ou `buttons`.
