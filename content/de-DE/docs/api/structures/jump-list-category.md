# JumpListCategory Object

* `type` String (optional) - One of the following:
  * `tasks` - Aufgaben in dieser Kategorie werden in die Kategorie `Tasks` eingeordnet. Es kann nur eine solche Kategorie geben, und sie wird am ende der Liste dargestellt.
  * `frequent` - Zeigt eine Liste der Dateien an, die häufig von der Anwendung geöffnet werden, der Name der Kategorie und ihre Elemente werden von Windows festgelegt.
  * `recent` - Zeigt eine Liste der zuletzt von der Anwendung geöffneten Dateien an, der Name der Kategorie und ihre Elemente werden von Windows festgelegt. Artikel können dieser Kategorie indirekt hinzugefügt werden durch `app.addRecentDocument(path)`.
  * `custom` - Zeigt Tasks oder Dateiverknüpfungen an, `name` muss von der App gesetzt werden.
* `name` String (optional) - Muss gesetzt werden, wenn `type` `custom` ist, sonst sollte es weggelassen werden.
* `items` JumpListItem[] (optional) - Array von [`JumpListItem`](jump-list-item.md) Objekten, wenn der Typ <1>Tasks</1> oder <1>custom</1> ist, andernfalls sollte er weggelassen werden.

**Anmerkung:** Wenn eine `JumpListCategory`Objekt nie den Typ ` nie den <code>Namen ` hat Die eingestellte Funktion von seinem Typ ` ist dann als <code>tasks`wahrgenommen. Wenn die Eigenschaft `name` gesetzt ist, aber die Eigenschaft `type` weggelassen wird, dann wird angenommen, dass die Eigenschaft `type` `custom` ist.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.
