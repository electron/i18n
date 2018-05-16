# shell

> Gerencia arquivos e URLs usando seus aplicativos padrão.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

O módulo `shell` fornece funções relacionadas à integração com a área de trabalho.

Um exemplo de como abrir uma URL no navegador padrão do usuário:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Métodos

O módulo `shell` tem os seguintes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully shown.

Mostra o arquivo especificado em um gerenciador de arquivos. Se possível, seleciona o arquivo.

### `shell.openItem(fullPath)`

* `fullPath` String

Retorna `Boolean` - Se o item foi aberto com êxito.

Abre o arquivo fornecido na maneira padrão da área de trabalho.

### `shell.openExternal(url[, options, callback])`

* `url` String - max 2081 characters on windows, or the function returns false.
* `options` Objeto (opcional) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (opcional) *macOS* - If specified will perform the open asynchronously. 
  * `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash.

Move o arquivo fornecido para o lixo e retorna um boolean para o operação.

### `shell.beep()`

Toca o sinal sonoro.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following: 
  * `create` - Cria um novo atalho, sobrescrevendo se necessário.
  * `update` - Atualiza propriedades especificadas apenas em um atalho existente.
  * `replace` - Sobrescreve um atalho existente, falha se o atalho não existir.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Retorna [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

Uma exceção será lançada quando qualquer erro acontecer.