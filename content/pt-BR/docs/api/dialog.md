# dialog

> Exibe diálogos nativos do sistema para abrir e salvar arquivos, alertas, etc.

Processo: [Main](../glossary.md#main-process)

Exemplo mostrando um diálogo para selecionar múltiplos arquivos e diretórios:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

O Diálogo é aberto a partir do thread principal do Electron. Se deseja usar o objeto dialog de um processo de renderização, lembre-se de acessar usando o código a seguir:

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## Métodos

O módulo `dialog` possúi os seguintes métodos:

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `title` String (opcional)
  * `defaultPath` String (opcional)
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `properties` String[] (opcional) - contém os recursos os quais o dialog deverá usar. Os seguintes valores são suportados: 
    * `openFile` - Permite selecionar arquivos.
    * `openDirectory` - Permite selecionar diretórios.
    * `multiSelections` - Permite selecionar múltiplos caminhos.
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` *macOS* - Allow creating new directories from dialog.
    * `promptToCreate` *Windows* - Prompt for creation if the file path entered in the dialog does not exist. Na verdade este valor não cria o arquivo no caminho especificado mas permite que o aplicativo entenda que deverá criar o diretório não existente.
    * `noResolveAliases` *macOS* - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` *macOS* - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `message` String (opcional) *macOS* - Mensagem a ser apresentada acima da janela de entrada.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Function (opcional) 
  * `filePaths` String[] - Um array de caminhos de arquivos selecionados pelo usuário
  * `bookmarks` String[] *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

Retorna `String[]`, um array de caminhos de arquivos selecionados pelo usuário, se o callback é fornecido, retornará `undefined`.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

Os `filters` designam um array dos tipos que podem ser apresentados ou selecionados quando você quer que o usuário veja apenas um tipo específico. Como por exemplo:

```javascript
{
  filters: [
    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
    {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Custom File Type', extensions: ['as']},
    {name: 'All Files', extensions: ['*']}
  ]
}
```

As array de `extensions` devem conter extensões sem caracteres-curinga ou pontos. (`'png'` é bom mas, `'.png'` e `'*.png'` são ruins). Para mostrar todos os arquivos use o caracter-curinga `*` (nenhum ouro caracter-curinga é suportado).

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`.

**Nota.:** No Windows e Linux um diálogo aberto não pode ser usado ao mesmo tempo para selecionar arquivos e diretórios, portanto se você estabelecer `properties` para `['openFile', 'openDirectory']` nessas plataformas, um seletor de diretório será mostrado.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `title` String (opcional)
  * `defaultPath` String (opcional) - Caminho absoluto do diretório, caminho absoluto do arquivo, ou o nome do arquivo a ser usado como padrão.
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `message` String (opcional) *macOS* - Mensagem a ser exibida acima de campos de texto.
  * `nameFieldLabel` String (opcional) *macOS* - Rótulo personalizado do texto a ser exibido em frente ao campo do nome do arquivo.
  * `showsTagField` Boolean (opcional) *macOS* - apresenta a tag do campo de entrada, por padrão `true`.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `callback` Function (opcional) 
  * `filename` String
  * `bookmark` String *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Retorna `String`, o caminho do arquivo escolhido pelo usuário. Se um callback é fornecido, retornará `undefined`.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

Os `filters` especificam um array de tipos de arquivo que podem ser exibidos, veja `dialog.ShowOpenDialog` para exemplos.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `type` String (opcional) - Pode ser `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. No Windows, `"question"` exibe o mesmo ícone que `"info"`, a menos que você especifique um ícone usando a opção `"icon"`. No macOS, tanto `"warning"` como `"error"` exibirão o mesmo ícone de alerta.
  * `buttons` String[] (opcional) - Array de textos para botões. No Windows, uma array vazia resultará em um botão rotulado "OK".
  * `defaultId` Integer (opcional) - Indicador do botão na array de botões que será selecionado como padrão quando a caixa de mensagem abrir.
  * `title` String (opcional) - Título da caixa de mensagem, algumas plataformas não o exibirão.
  * `message` String - Conteúdo da caixa de mensagem.
  * `detail` String (opcional) - Informações adicionais da mensagem.
  * `checkboxLabel` String (opcional) - Se fornecida, a caixa de mensagem incluirá uma caixa de seleção com o devido rótulo. O estado da caixa de seleção poderá ser verificada apenas quando `callback` estiver sendo usado.
  * `checkboxChecked` Boolean (opcional) - Estado inicial da caixa de seleção designada como ativa. `false` por padrão.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Integer (opcional) - O indicador do botão será usado para cancelar o diálogo, por via da tecla `Esc`. Por padrão é atribuído ao primeiro botão como "cancelar" ou "não" como rótulos. Se botões desse tipo não existem e essa opção não é atribuída, `` será usado como valor de retorno ou resposta do callback. Essa opção é ignorada no Windows.
  * `noLink` Boolean (opcional) - No Windows, o Electron tentará identificar qual dos `buttons` são botões comuns (como "cancelar" ou "sim"), e exibir os outros como links de comandos no diálogo. Ele pode fazer o diálogo ser apresentado com o estilo dos aplicativos modernos do Windows. Se você não deseja esse comportamento, você pode definir `noLink` para `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normaliza o acesso às teclas do teclado entre as plataformas. Por padrão é `false`. Ativando-o assume-se que `&` é usado nos rótulos dos botões para atribuir a tecla de atalho de acesso do teclado assim os rótulos serão convertidos para que funcionem corretamente em cada plataforma, os caracteres `&` são removidos no macOS, convertidos para `_` no Linux, e deixados intactos no Windows. Por exemplo, um rótulo de botão `Vie&w` será convertido para `Vie_w` no Linux e `View` no macOS e pode ser selecionado através de `Alt-W` no Windows e Linux.
* `callback` Function (opcional) 
  * `response` Number - The index of the button that was clicked.
  * `checkboxChecked` Boolean - O estado ativo da caixa de seleção se `checkboxLabel` foi definido. Senão `false`.

Retorna `Integer`, o indicador do botão clicado, se um callback é fornecido ele retorna undefined.

Exibe uma caixa de mensagem, esse método bloqueará o processo até que a caixa de mensagem seja fechada. Ele retorna o indicador do botão clicado.

O argumento `browserWindow` permite que o dialog seja acoplado a janela parent, tornando-a modal.

Se um `callback` é passado, o dialog mão bloquearáo proceso. A solicitação à API será dessincronizada e o resultado será passado por via do `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

Exibe um dialog modal que apresenta uma mensagem de erro.

Esse API pode ser chamado com segurança antes de que o evento `ready` que é emitido pelo `app`, é usado para reportar erros nos estágios iniciais da execução do aplicativo. Se chamado antes do evento `ready` do aplicativo no Linux, a mensagem será emitida para stderr, e o GUI do dialog não será mostrado.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - O certificado para trust/import.
  * `message` String - A mensagem a ser exibida para o usuário.
* `callback` Function

No macOS, esse método exibe um dialog modal que apresenta uma mensagem e informação de certificado, dando ao usuário a opção de confiar/importar o certificado. Se você fornecer um argumento `browserWindow` o dialog será acoplado à janela parent, fazendo-a modal.

No Windows as opções são mais limitadas, devido às API's do Win32 usadas:

* Como o macOS fornece o seu próprio diálogo de confirmação o argumento `message` não é usado.
* O argumento `browserWindow` é ignorado já que não é possível fazer essa confirmação um diálogo modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Você pode chamar `BrowserWindow.getCurrentWindow().setSheetOffset (offset)`para mudar o offset da janela aonde os diálogos (sheets) estão acoplados.