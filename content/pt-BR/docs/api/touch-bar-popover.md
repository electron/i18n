## Class: TouchBarPopover

> Crie um popover na barra de toque para aplicações nativas do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarPopover (opções)`

* objeto `options`
  * `label` String (opcional) - Texto do botão Popover.
  * `icon` [NativeImage](native-image.md) (opcional) - Ícone do botão Popover.
  * `items` [](touch-bar.md) TouchBar - Itens para exibir no popover.
  * `showCloseButton` Boolean (opcional) - `true` exibir um botão de fechamento à esquerda do popover, `false` não mostrá-lo. O padrão é `true`.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarPopover`:

#### `touchBarPopover.label`

Um `String` representando o texto atual do botão popover. Alterar esse valor atualiza imediatamente o popover na barra de toque.

#### `touchBarPopover.icon`

Um `NativeImage` representando o ícone de botão atual do popover. Alterar esse valor atualiza imediatamente o popover na barra de toque.
