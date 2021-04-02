# shell

> Gerencia arquivos e URLs usando seus aplicativos padrão.

Processo: [principal](../glossary.md#main-process),</a> renderer

(somente sem caixa de areia)</p> 

O módulo `shell` fornece funções relacionadas à integração com a área de trabalho.

Um exemplo de como abrir uma URL no navegador padrão do usuário:



```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```


**Nota:** Embora o módulo `shell` possa ser usado no processo de renderização, ele não funcionará em uma renderização de caixa de areia.



## Métodos

O módulo `shell` tem os seguintes métodos:



### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Mostre o arquivo dado em um gerenciador de arquivos. Se possível, selecione o arquivo.



### `shell.openPath (caminho)`

* `path` String

Devoluções `Promise<String>` - Resolve com uma sequência contendo a mensagem de erro correspondente à falha se ocorreu uma falha, caso contrário "".

Abre o arquivo fornecido na maneira padrão da área de trabalho.



### `shell.openExternal(url[, opções])`

* `url` String - Max 2081 caracteres nas janelas.
* objeto `options` (opcional) 
    * `activate` Boolean (opcional) __ macOS - `true` para trazer o aplicativo aberto para o primeiro plano. O padrão é `verdadeiro`.
  * `workingDirectory` String (opcional) __ do Windows - O diretório de trabalho.

Retornos `Promise<void>`

Abra a URL de protocolo externo dada da maneira padrão da área de trabalho. (Por exemplo, mailto: URLs no agente de e-mail padrão do usuário).



### `shell.moveItemToTrash(fullPath[, deleteOnFail])` __preterido

* `fullPath` String
* `deleteOnFail` Booleano (opcional) - Remover ou não unilateralmente o item se o Lixo estiver desativado ou não no volume. __macOS

Devoluções `Boolean` - Se o item foi movido com sucesso para o lixo ou excluído de outra forma.



> NOTA: Este método é preterido. Use `shell.trashItem` em vez disso.

Move o arquivo fornecido para o lixo e retorna um boolean para o operação.



### `shell.trashItem(caminho)`

* `path` String - caminho para o item a ser movido para o lixo.

Devolução `Promise<void>` - Resolve quando a operação estiver concluída. Rejeita se houve um erro ao excluir o item solicitado.

Isso move um caminho para o local de lixo específico do SISTEMA (Lixo no macOS, Reciclar Bin no Windows e um local específico para o ambiente de desktop no Linux).



### `shell.beep()`

Toca o sinal sonoro.



### `shell.writeShortcutLink(shortcutPath[, operation], options)` __do Windows

* `shortcutPath` Cordas
* `operation` String (opcional) - O padrão é `create`, pode ser um dos seguintes: 
    * `create` - Cria um novo atalho, sobrescrevendo se necessário.
  * `update` - Atualiza propriedades especificadas apenas em um atalho existente.
  * `replace` - Sobrescreve um atalho existente, falha se o atalho não existir.
* `options` [Atalho](structures/shortcut-details.md)sde detalhes

Devoluções `Boolean` - Se o atalho foi criado com sucesso.

Cria ou atualiza um link de atalho em `shortcutPath`.



### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` Cordas

Retorna [`ShortcutDetails`](structures/shortcut-details.md)

Resolve o link de atalho em `shortcutPath`.

Uma exceção será lançada quando qualquer erro acontecer.
