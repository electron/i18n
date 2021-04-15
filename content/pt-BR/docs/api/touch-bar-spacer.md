## Class: TouchBarSpacer

> Create a spacer between two items in the touch bar for native macOS applications

Processo: [Main](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* objeto `options`
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. Este é o padrão.
    * `large` - Large space between items. Mapas para `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupar todo o espaço disponível. Mapas para `NSTouchBarItemIdentifierFlexibleSpace`.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarSpacer`:

#### `touchBarSpacer.size`

Um `String` representando o tamanho do espaçador.  Pode ser `small`, `large` ou `flexible`.
