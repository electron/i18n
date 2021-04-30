# Objeto JumpListCategory

* `type` String (opcional) - Um dos seguintes:
  * `tarefas` - itens nesta categoria serão colocados na categoria de `tarefas` padrão. Só pode existir um de cada categoria, e sempre será mostrado no final da Jump List.
  * `frequente` - Exibe uma lista de arquivos abertos recentemente pelo aplicativo, o nome da categoria e seus itens são definidos pelo Windows.
  * `recent` - Exibe uma lista de arquivos abertos recentemente pelo aplicativo, o nome e a categoria de seus itens são definidos pelo Windows. Itens podem ser adicionados indiretamente a esta categoria usando `app.addRecentDocument(path)`.
  * `custom` - Exibe tarefas ou links para arquivos, o `name` precisa ser definido pelo aplicativo.
* `name` String (opcional) - Precisa ser definido se o `type` é `custom`, caso contrário deverá ser omitido.
* `items` JumpListItem[] (opcional) - Matriz de [`JumpListItem`](jump-list-item.md) objetos que se `type` for `tasks` ou `custom`, caso contrário, deverá ser omitido.

**Nota:** Se um objeto `JumpListCategory` não tiver for nem a propriedade `type` nem a `name` definidas, então seu `type` é assumido como `tasks`. Se a propriedade do `name` está definida mas a propriedade do `type` é omissa, então o `type` é assumido como `custom`.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.
