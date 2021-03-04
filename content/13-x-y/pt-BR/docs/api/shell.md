# shell

> Gerencia arquivos e URLs usando seus aplicativos padrão.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) (non-sandboxed only)

O módulo `shell` fornece funções relacionadas à integração com a área de trabalho.

Um exemplo de como abrir uma URL no navegador padrão do usuário:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**Note:** While the `shell` module can be used in the renderer process, it will not function in a sandboxed renderer.

## Métodos

O módulo `shell` tem os seguintes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

### `shell.openPath(path)`

* `path` String

Returns `Promise<String>` - Resolves with a string containing the error message corresponding to the failure if a failure occurred, otherwise "".

Abre o arquivo fornecido na maneira padrão da área de trabalho.

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (optional)
  * `activate` Boolean (optional) _macOS_ - `true` to bring the opened application to the foreground. O padrão é `verdadeiro`.
  * `workingDirectory` String (optional) _Windows_ - The working directory.

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.trashItem(path)`

* `path` String - path to the item to be moved to the trash.

Returns `Promise<void>` - Resolves when the operation has been completed. Rejects if there was an error while deleting the requested item.

This moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin on Windows, and a desktop-environment-specific location on Linux).

### `shell.beep()`

Toca o sinal sonoro.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - Cria um novo atalho, sobrescrevendo se necessário.
  * `update` - Atualiza propriedades especificadas apenas em um atalho existente.
  * `replace` - Sobrescreve um atalho existente, falha se o atalho não existir.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

Retorna [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

Uma exceção será lançada quando qualquer erro acontecer.
