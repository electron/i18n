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

### `shell.openExternal(url[, options, callback])`

* `url` String - Max 2081 characters on windows, or the function returns false.
* `options` Objeto (opcional) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*
* `callback` Function (opcional) *macOS* - If specified will perform the open asynchronously. 
  * `error` Error

Retorna `Boolean` - Se um aplicativo estava disponível para abrir o URL. Se o retorno de chamada for especificado, sempre retornará true.

Abra o URL do protocolo externo fornecido na maneira padrão da área de trabalho. (Por exemplo, mailto: URLs no agente de email padrão do usuário).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Retorna `Boolean` - Se o item foi movido com sucesso para o lixo.

Move o arquivo fornecido para o lixo e retorna um boolean para o operação.

### `shell.beep()`

Toca um sinal sonoro.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) -Por padrão é   `create`, pode ser um dos seguintes: 
  * `create` - Cria um novo atalho, sobrescrevendo se necessário.
  * `update` - Atualiza propriedades especificadas apenas em um atalho existente.
  * `replace` - Sobrescreve um atalho existente, falha se o atalho não existir.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Retorna `Boolean` - Se o atalho foi criado com sucesso.

Cria ou atualiza um link de atalho em `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Retorna [`ShortcutDetails`](structures/shortcut-details.md)

Resolve o link de atalho em `shortcutPath`.

Uma exceção será lançada quando qualquer erro acontecer.
