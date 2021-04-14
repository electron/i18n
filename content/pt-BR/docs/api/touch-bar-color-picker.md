## Class: TouchBarColorPicker

> Crie um catador de cores na barra de toque para aplicações nativas do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarColorPicker (opções)`

* objeto `options`
  * `availableColors` String[] (opcional) - Matriz de cordas de cor hexais para aparecer como cores possíveis para selecionar.
  * `selectedColor` String (opcional) - A cor hexais selecionada no catador, ou seja, `#ABCDEF`.
  * `change` Função (opcional) - Função para chamar quando uma cor é selecionada.
    * `color` String - A cor que o usuário selecionou do catador.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarColorPicker`:

#### `touchBarColorPicker.disponívelColors`

Uma matriz `String[]` representando as cores disponíveis do seletor de cores para selecionar. Alterar esse valor imediatamente atualiza o catador de cores na barra de toque.

#### `touchBarColorPicker.selectedColor`

Um código hexamax `String` representando a cor selecionada do selecionador de cores atualmente. Alterar esse valor imediatamente atualiza o catador de cores na barra de toque.
