# Objeto JumpListCategory

* `type` String (optional) - One of the following:
  * `tarefas` - itens nesta categoria serão colocados na categoria de `tarefas` padrão. Só pode existir um de cada categoria, e sempre será mostrado no final da Jump List.
  * `frequente` - Exibe uma lista de arquivos abertos recentemente pelo aplicativo, o nome da categoria e seus itens são definidos pelo Windows.
  * `recent` - Exibe uma lista de arquivos abertos recentemente pelo aplicativo, o nome e a categoria de seus itens são definidos pelo Windows. Itens podem ser adicionados indiretamente a esta categoria usando `app.addRecentDocument(path)`.
  * `custom` - Exibe tarefas ou links para arquivos, o `name` precisa ser definido pelo aplicativo.
* `name` String (opcional) - Precisa ser definido se o `type` é `custom`, caso contrário deverá ser omitido.
* `items` JumpListItem[] (opcional) - Matriz de [`JumpListItem`](jump-list-item.md) objetos que se `type` for `tasks` ou `custom`, caso contrário, deverá ser omitido.

**Nota:** Se um objeto `JumpListCategory` não tem o `type` nem a propriedade do `name` definido, então seu `type` é assumido como `tasks`. Se a propriedade do `name` está definida mas a propriedade do `type` é omissa, então o `type` é assumido como `custom`.
