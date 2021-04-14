# dialog

> Exibe diálogos nativos do sistema para abrir e salvar arquivos, alertas, etc.

Processo: [Main](../glossary.md#main-process)

Um exemplo de mostrar uma caixa de diálogo para selecionar vários arquivos:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ propriedades: ['openFile', 'multiSelections'] }))
```

## Métodos

O módulo `dialog` possúi os seguintes métodos:

### `opções de diálogo.showOpenDialogSync([browserWindow])`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  * `title` String (opcional)
  * `defaultPath` String (opcional)
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `properties` String[] (opcional) - Contém quais características a caixa de diálogo deve uso. Os seguintes valores são suportados:
    * `openFile` - Permite selecionar arquivos.
    * `openDirectory` - Permite selecionar diretórios.
    * `multiSelections` - Permite selecionar múltiplos caminhos.
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` __ macOS - Permitir a criação de novos diretórios a partir do diálogo.
    * `promptToCreate` __ do Windows - Solicitamos a criação se o caminho do arquivo inserido na caixa de diálogo não existir. Na verdade este valor não cria o arquivo no caminho especificado mas permite que o aplicativo entenda que deverá criar o diretório não existente.
    * `noResolveAliases` __ macOS - Desativar o caminho automático de de caminho (symlink). Os pseudônimos selecionados agora retornarão o caminho do pseudônimo em vez de seu caminho de destino.
    * `treatPackageAsDirectory` __ macOS - Tratar pacotes, como pastas de `.app` , como diretório em vez de um arquivo.
    * `dontAddToRecent` __ do Windows - Não adicione o item que está sendo aberto à lista de documentos recentes.
  * `message` String (opcional) _macOS_ - Mensagem a ser apresentada acima da janela de entrada.
  * `securityScopedBookmarks` Boolean (opcional) __ de massa</em> _macOS - Crie marcadores de segurança [](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) quando embalados para a Mac App Store.</li> </ul></li> </ul>

Devolução `String[] | undefined`, os caminhos de arquivo escolhidos pelo usuário; se o diálogo for cancelado, ele retorna `undefined`.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

O `filters` especifica um conjunto de tipos de arquivos que podem ser exibidos ou selecionados quando você deseja limitar o usuário a um tipo específico. Como por exemplo:

```javascript
{
  filtros: [
    { nome: 'Imagens', extensões: ['jpg', 'png', 'gif'] },
    { nome: 'Filmes', extensões: ['mkv', 'avi', 'mp4'] },
    { nome: 'Custom File Type', extensões: ['as'] },
    { nome: 'Todos os Arquivos', extensões: ['*']

}
```

As array de `extensions` devem conter extensões sem caracteres-curinga ou pontos. (`'png'` é bom mas, `'.png'` e `'*.png'` são ruins). Para mostrar todos os arquivos use o caracter-curinga `*` (nenhum ouro caracter-curinga é suportado).

**Nota.:** No Windows e Linux um diálogo aberto não pode ser usado ao mesmo tempo para selecionar arquivos e diretórios, portanto se você estabelecer `properties` para `['openFile', 'openDirectory']` nessas plataformas, um seletor de diretório será mostrado.

```js
dialog.showOpenDialogSync(mainWindow, {
  propriedades: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog ([browserWindow]options)`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  * `title` String (opcional)
  * `defaultPath` String (opcional)
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `properties` String[] (opcional) - Contém quais características a caixa de diálogo deve uso. Os seguintes valores são suportados:
    * `openFile` - Permite selecionar arquivos.
    * `openDirectory` - Permite selecionar diretórios.
    * `multiSelections` - Permite selecionar múltiplos caminhos.
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` __ macOS - Permitir a criação de novos diretórios a partir do diálogo.
    * `promptToCreate` __ do Windows - Solicitamos a criação se o caminho do arquivo inserido na caixa de diálogo não existir. Na verdade este valor não cria o arquivo no caminho especificado mas permite que o aplicativo entenda que deverá criar o diretório não existente.
    * `noResolveAliases` __ macOS - Desativar o caminho automático de de caminho (symlink). Os pseudônimos selecionados agora retornarão o caminho do pseudônimo em vez de seu caminho de destino.
    * `treatPackageAsDirectory` __ macOS - Tratar pacotes, como pastas de `.app` , como diretório em vez de um arquivo.
    * `dontAddToRecent` __ do Windows - Não adicione o item que está sendo aberto à lista de documentos recentes.
  * `message` String (opcional) _macOS_ - Mensagem a ser apresentada acima da janela de entrada.
  * `securityScopedBookmarks` Boolean (opcional) __ de massa</em> _macOS - Crie marcadores de segurança [](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) quando embalados para a Mac App Store.</li> </ul></li> </ul>

Devoluções `Promise<Object>` - Resolver com um objeto contendo o seguinte:

* `canceled` Booleano - se o diálogo foi cancelado ou não.
* `filePaths` String[] - Um array de caminhos de arquivos selecionados pelo usuário. Se o diálogo for cancelado, será uma matriz vazia.
* `bookmarks` String[] (opcional) __ __ em massa - Uma matriz que corresponde ao conjunto `filePaths` de strings codificadas base64 que contém dados de marcadores com escopo de segurança. `securityScopedBookmarks` deve ser habilitado para que isso seja preenchido. (Para valores de retorno, consulte [tabela aqui](#bookmarks-array).)

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

O `filters` especifica um conjunto de tipos de arquivos que podem ser exibidos ou selecionados quando você deseja limitar o usuário a um tipo específico. Como por exemplo:

```javascript
{
  filtros: [
    { nome: 'Imagens', extensões: ['jpg', 'png', 'gif'] },
    { nome: 'Filmes', extensões: ['mkv', 'avi', 'mp4'] },
    { nome: 'Custom File Type', extensões: ['as'] },
    { nome: 'Todos os Arquivos', extensões: ['*']

}
```

As array de `extensions` devem conter extensões sem caracteres-curinga ou pontos. (`'png'` é bom mas, `'.png'` e `'*.png'` são ruins). Para mostrar todos os arquivos use o caracter-curinga `*` (nenhum ouro caracter-curinga é suportado).

**Nota.:** No Windows e Linux um diálogo aberto não pode ser usado ao mesmo tempo para selecionar arquivos e diretórios, portanto se você estabelecer `properties` para `['openFile', 'openDirectory']` nessas plataformas, um seletor de diretório será mostrado.

```js
dialog.showOpenDialog (principal Janela, {
  propriedades: ['openFile', 'openDirectory']
}).então(resultado => { console
  .log(resultado.cancelado)
  console.log (result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync ([browserWindow]options)`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  * `title` String (opcional)
  * `defaultPath` String (opcional) - Caminho absoluto do diretório, caminho absoluto do arquivo, ou o nome do arquivo a ser usado como padrão.
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `message` String (opcional) _macOS_ - Mensagem a ser exibida acima de campos de texto.
  * `nameFieldLabel` String (opcional) _macOS_ - Rótulo personalizado do texto a ser exibido em frente ao campo do nome do arquivo.
  * `showsTagField` Boolean (opcional) _macOS_ - apresenta a tag do campo de entrada, por padrão `true`.
  * `properties` String[] (opcional)
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` __ macOS - Permitir a criação de novos diretórios a partir do diálogo.
    * `treatPackageAsDirectory` __ macOS - Tratar pacotes, como pastas de `.app` , como diretório em vez de um arquivo.
    * `showOverwriteConfirmation` __ Linux - Define se o usuário será apresentado uma caixa de diálogo de confirmação se o usuário digitar um nome de arquivo que já existe.
    * `dontAddToRecent` __ do Windows - Não adicione o item que está sendo salvo na lista de documentos recentes.
  * `securityScopedBookmarks` Boolean (opcional) __ __ em massa do macOS - Crie um</a> de marcador de segurança

quando embalado para a Mac App Store. Se essa opção estiver ativada e o arquivo ainda não existir, um arquivo em branco será criado no caminho escolhido.</li> </ul></li> </ul> 
    
    Devolução `String | undefined`, o caminho do arquivo escolhido pelo usuário; se o diálogo for cancelado, ele retorna `undefined`.
    
    O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.
    
    Os `filters` especificam um array de tipos de arquivo que podem ser exibidos, veja `dialog.ShowOpenDialog` para exemplos.
    
    

### `dialog.showSaveDialog ([browserWindow]options)`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  
    * `title` String (opcional)
  * `defaultPath` String (opcional) - Caminho absoluto do diretório, caminho absoluto do arquivo, ou o nome do arquivo a ser usado como padrão.
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `message` String (opcional) _macOS_ - Mensagem a ser exibida acima de campos de texto.
  * `nameFieldLabel` String (opcional) _macOS_ - Rótulo personalizado do texto a ser exibido em frente ao campo do nome do arquivo.
  * `showsTagField` Boolean (opcional) __ macOS - Mostre a caixa de entrada das tags, padrão para `true`.
  * `properties` String[] (opcional)
    
        * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` __ macOS - Permitir a criação de novos diretórios a partir do diálogo.
    * `treatPackageAsDirectory` __ macOS - Tratar pacotes, como pastas de `.app` , como diretório em vez de um arquivo.

    * `showOverwriteConfirmation` __ Linux - Define se o usuário será apresentado uma caixa de diálogo de confirmação se o usuário digitar um nome de arquivo que já existe.

    * `dontAddToRecent` __ do Windows - Não adicione o item que está sendo salvo na lista de documentos recentes.
  * `securityScopedBookmarks` Boolean (opcional) __ __ em massa do macOS - Crie um</a> de marcador de segurança quando embalado para a Mac App Store. Se essa opção estiver ativada e o arquivo ainda não existir, um arquivo em branco será criado no caminho escolhido.</li> </ul></li> </ul> 
    
    Devoluções `Promise<Object>` - Resolver com um objeto contendo o seguinte:
    
    * `canceled` Booleano - se o diálogo foi cancelado ou não.
* `filePath` String (opcional) - Se o diálogo for cancelado, este será `undefined`.
* `bookmark` String (opcional) __ __ em massa - Base64, que contém os dados do marcador com escopo de segurança para o arquivo salvo. `securityScopedBookmarks` deve estar habilitado para que isso esteja presente. (Para valores de retorno, consulte [tabela aqui](#bookmarks-array).)

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

Os `filters` especificam um array de tipos de arquivo que podem ser exibidos, veja `dialog.ShowOpenDialog` para exemplos.

**Nota:** No macOS, o uso da versão assíncroníncro é recomendado para evitar problemas quando expandir e colapsar o diálogo.



### `opções de dialog.showMessageBoxSync([browserWindow])`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  
    * `message` String - Conteúdo da caixa de mensagem.
  * `type` String (opcional) - Pode ser `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. No Windows, `"question"` exibe o mesmo ícone que `"info"`, a menos que você especifique um ícone usando a opção `"icon"`. No macOS, tanto `"warning"` como `"error"` exibirão o mesmo ícone de alerta.

  * `buttons` String[] (opcional) - Matriz de textos para botões. No Windows, uma matriz vazia resultará em um botão rotulado como "OK".

  * `defaultId` Integer (opcional) - Indicador do botão na array de botões que será selecionado como padrão quando a caixa de mensagem abrir.
  * `title` String (opcional) - Título da caixa de mensagem, algumas plataformas não o exibirão.
  * `detail` String (opcional) - Informações adicionais da mensagem.
  * `checkboxLabel` String (opcional) - Se for fornecida, a caixa de mensagens incluirá uma caixa de seleção com o rótulo dado.
  * `checkboxChecked` Booleano (opcional) - Estado verificado inicial da caixa de seleção . `false` por padrão.
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `cancelId` Integer (opcional) - O indicador do botão será usado para cancelar o diálogo, por via da tecla `Esc`. Por padrão é atribuído ao primeiro botão como "cancelar" ou "não" como rótulos. Se não existirem botões identificados e essa opção não for definida, `0` será usada como valor de retorno.
  * `noLink` Boolean (opcional) - No Windows, o Electron tentará identificar qual dos `buttons` são botões comuns (como "cancelar" ou "sim"), e exibir os outros como links de comandos no diálogo. Ele pode fazer o diálogo ser apresentado com o estilo dos aplicativos modernos do Windows. Se você não deseja esse comportamento, você pode definir `noLink` para `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normaliza o acesso às teclas do teclado entre as plataformas. Por padrão é `false`. Ativando-o assume-se que `&` é usado nos rótulos dos botões para atribuir a tecla de atalho de acesso do teclado assim os rótulos serão convertidos para que funcionem corretamente em cada plataforma, os caracteres `&` são removidos no macOS, convertidos para `_` no Linux, e deixados intactos no Windows. Por exemplo, um rótulo de botão `Vie&w` será convertido para `Vie_w` no Linux e `View` no macOS e pode ser selecionado através de `Alt-W` no Windows e Linux.

Retorna `Integer` - o índice do botão clicado.

Mostra uma caixa de mensagem, bloqueará o processo até que a caixa de mensagens seja fechada. Ele retorna o índice do botão clicado.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal. Se `browserWindow` não for mostrado o diálogo não será anexado a ele. Nesse caso, será exibido como uma janela independente.



### `opções dialog.showMessageBox([browserWindow])`

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options`
  
    * `message` String - Conteúdo da caixa de mensagem.
  * `type` String (opcional) - Pode ser `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. No Windows, `"question"` exibe o mesmo ícone que `"info"`, a menos que você especifique um ícone usando a opção `"icon"`. No macOS, tanto `"warning"` como `"error"` exibirão o mesmo ícone de alerta.

  * `buttons` String[] (opcional) - Matriz de textos para botões. No Windows, uma matriz vazia resultará em um botão rotulado como "OK".

  * `defaultId` Integer (opcional) - Indicador do botão na array de botões que será selecionado como padrão quando a caixa de mensagem abrir.
  * `title` String (opcional) - Título da caixa de mensagem, algumas plataformas não o exibirão.
  * `detail` String (opcional) - Informações adicionais da mensagem.
  * `checkboxLabel` String (opcional) - Se for fornecida, a caixa de mensagens incluirá uma caixa de seleção com o rótulo dado.
  * `checkboxChecked` Booleano (opcional) - Estado verificado inicial da caixa de seleção . `false` por padrão.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Integer (opcional) - O indicador do botão será usado para cancelar o diálogo, por via da tecla `Esc`. Por padrão é atribuído ao primeiro botão como "cancelar" ou "não" como rótulos. Se não existirem botões identificados e essa opção não for definida, `0` será usada como valor de retorno.
  * `noLink` Boolean (opcional) - No Windows, o Electron tentará identificar qual dos `buttons` são botões comuns (como "cancelar" ou "sim"), e exibir os outros como links de comandos no diálogo. Ele pode fazer o diálogo ser apresentado com o estilo dos aplicativos modernos do Windows. Se você não deseja esse comportamento, você pode definir `noLink` para `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normaliza o acesso às teclas do teclado entre as plataformas. Por padrão é `false`. Ativando-o assume-se que `&` é usado nos rótulos dos botões para atribuir a tecla de atalho de acesso do teclado assim os rótulos serão convertidos para que funcionem corretamente em cada plataforma, os caracteres `&` são removidos no macOS, convertidos para `_` no Linux, e deixados intactos no Windows. Por exemplo, um rótulo de botão `Vie&w` será convertido para `Vie_w` no Linux e `View` no macOS e pode ser selecionado através de `Alt-W` no Windows e Linux.

Devoluções `Promise<Object>` - resolve com uma promessa contendo as seguintes propriedades:

* `response` Número - O índice do botão clicado.
* `checkboxChecked` Boolean - O estado verificado da caixa de seleção se `checkboxLabel` foi definido. Caso contrário, `false`.

Mostra uma caixa de mensagens.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.



### `dialog.showErrorBox(title, content)`

* `title` String - O título a ser exibido na caixa de erro.
* `content` String - O conteúdo a ser exibido na caixa de erro.

Exibe um dialog modal que apresenta uma mensagem de erro.

Esse API pode ser chamado com segurança antes de que o evento `ready` que é emitido pelo `app`, é usado para reportar erros nos estágios iniciais da execução do aplicativo. Se chamado antes do evento `ready` do aplicativo no Linux, a mensagem será emitida para stderr, e o GUI do dialog não será mostrado.



### `dialog.showCertificateTrustDialog([browserWindow, ]options)` __ __do MacOS

* `browserWindow` [browserWindow](browser-window.md) (opcional)
* objeto `options` 
    * `certificate` [Certificate](structures/certificate.md) - O certificado para trust/import.
  * `message` String - A mensagem a ser exibida para o usuário.

Devoluções `Promise<void>` - resolve quando o diálogo de confiança do certificado é mostrado.

No macOS, esse método exibe um dialog modal que apresenta uma mensagem e informação de certificado, dando ao usuário a opção de confiar/importar o certificado. Se você fornecer um argumento `browserWindow` o dialog será acoplado à janela parent, fazendo-a modal.

No Windows as opções são mais limitadas, devido às API's do Win32 usadas:

* Como o macOS fornece o seu próprio diálogo de confirmação o argumento `message` não é usado.

* O argumento `browserWindow` é ignorado já que não é possível fazer essa confirmação um diálogo modal.



## Matriz de marcadores

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`e `showSaveDialogSync` retornarão uma matriz de `bookmarks` .

| Tipo de compilação | segurançaSsBookmarcas booleanos | Tipo de retorno | Valor de retorno                 |
| ------------------ | ------------------------------- |:---------------:| -------------------------------- |
| massa macOS        | Verdade                         |     Sucesso     | `['LONGBOOKMARKSTRING']`         |
| massa macOS        | Verdade                         |      Erro       | `['']` (matriz de cordas vazias) |
| massa macOS        | False                           |       NA        | `[]` (matriz vazia)              |
| non mas            | Qualquer                        |       NA        | `[]` (matriz vazia)              |




## Sheets

No macOS, os diálogos são apresentados como folhas anexadas a uma janela se você fornecer uma referência [`BrowserWindow`](browser-window.md) no parâmetro `browserWindow` ou modais se nenhuma janela for fornecida.

Você pode chamar `BrowserWindow.getCurrentWindow().setSheetOffset (offset)`para mudar o offset da janela aonde os diálogos (sheets) estão acoplados.
