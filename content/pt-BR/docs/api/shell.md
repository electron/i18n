# shell

> Gerencia arquivos e URLs usando seus aplicativos padrão.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

O módulo `shell` fornece funções relacionadas à integração com a área de trabalho.

Um exemplo de como abrir uma URL no navegador padrão do usuário:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Métodos

O módulo `shell` tem os seguintes métodos:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Retorna `Boolean` - Se o item for mostrado com sucesso.

Mostra o arquivo especificado em um gerenciador de arquivos. Se possível, seleciona o arquivo.

### `shell.openItem(fullPath)`

* `fullPath` String

Retorna `Boolean` - Se o item foi aberto com êxito.

Abre o arquivo fornecido na maneira padrão da área de trabalho.

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Objeto (opcional) 
  * `ative` Boolean (opcional) - `true` traz o aplicativo aberto para o primeiro plano. O padrão é `true`. *macOS*
  * `workingDirectory` String (opcional) - O diretório de trabalho. *Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Objeto (opcional) 
  * `ative` Boolean (opcional) - `true` traz o aplicativo aberto para o primeiro plano. O padrão é `true`. *macOS*
  * `workingDirectory` String (opcional) - O diretório de trabalho. *Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Retorna `Boolean` - Se o item foi movido para lixeira com êxito.

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