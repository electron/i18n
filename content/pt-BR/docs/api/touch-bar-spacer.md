## Class: TouchBarSpacer

> Crie um espaçador entre dois itens na barra de toque para aplicações nativas do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções touchBarSpacer (opções)`

* objeto `options`
  * `size` String (opcional) - Tamanho do espaçador, os valores possíveis são:
    * `small` - Pequeno espaço entre os itens. Mapas para `NSTouchBarItemIdentifierFixedSpaceSmall`. Este é o padrão.
    * `large` - Grande espaço entre os itens. Mapas para `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupar todo o espaço disponível. Mapas para `NSTouchBarItemIdentifierFlexibleSpace`.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarSpacer`:

#### `touchBarSpacer.size`

Um `String` representando o tamanho do espaçador.  Pode ser `small`, `large` ou `flexible`.
