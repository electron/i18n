## Class: TouchBarSlider

> Crie um controle deslizante na barra de toque para aplicações nativas do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções TouchBarSlider (opções)`

* objeto `options`
  * `label` String (opcional) - Texto de rótulo.
  * `value` Inteiro (opcional) - Valor selecionado.
  * `minValue` Inteiro (opcional) - Valor mínimo.
  * `maxValue` Inteiro (opcional) - Valor máximo.
  * `change` Função (opcional) - Função para chamar quando o controle deslizante é alterado.
    * `newValue` Número - O valor que o usuário selecionou no Slider.

### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBarSlider`:

#### `touchBarSlider.label`

Um `String` representando o texto atual do controle deslizante. Alterar esse valor atualiza imediatamente o controle deslizante na barra de toque.

#### `touchBarSlider.value`

Um `Number` representando o valor atual do controle deslizante. Alterar esse valor atualiza imediatamente o controle deslizante na barra de toque.

#### `touchBarSlider.minValor`

Um `Number` representando o valor mínimo atual do controle deslizante. Alterar esse valor atualiza imediatamente o controle deslizante na barra de toque.

#### `touchBarSlider.maxValue`

Um `Number` representando o valor máximo atual do controle deslizante. Alterar esse valor atualiza imediatamente o controle deslizante na barra de toque.
