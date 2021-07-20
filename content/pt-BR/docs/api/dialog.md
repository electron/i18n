# dialog

> Exibe diálogos nativos do sistema para abrir e salvar arquivos, alertas, etc.

Processo: [Main](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

## Métodos

O módulo `dialog` possúi os seguintes métodos:

### `dialog.showOpenDialogSync([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `title` String (opcional)
  * `defaultPath` String (opcional)
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `properties` String[]&#32;(optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Permite selecionar arquivos.
    * `openDirectory` - Permite selecionar diretórios.
    * `multiSelections` - Permite selecionar múltiplos caminhos.
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Na verdade este valor não cria o arquivo no caminho especificado mas permite que o aplicativo entenda que deverá criar o diretório não existente.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (opcional) _macOS_ - Mensagem a ser apresentada acima da janela de entrada.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Como por exemplo:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

As array de `extensions` devem conter extensões sem caracteres-curinga ou pontos. (`'png'` é bom mas, `'.png'` e `'*.png'` são ruins). Para mostrar todos os arquivos use o caracter-curinga `*` (nenhum ouro caracter-curinga é suportado).

**Nota.:** No Windows e Linux um diálogo aberto não pode ser usado ao mesmo tempo para selecionar arquivos e diretórios, portanto se você estabelecer `properties` para `['openFile', 'openDirectory']` nessas plataformas, um seletor de diretório será mostrado.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `title` String (opcional)
  * `defaultPath` String (opcional)
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `properties` String[]&#32;(optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Permite selecionar arquivos.
    * `openDirectory` - Permite selecionar diretórios.
    * `multiSelections` - Permite selecionar múltiplos caminhos.
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Na verdade este valor não cria o arquivo no caminho especificado mas permite que o aplicativo entenda que deverá criar o diretório não existente.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (opcional) _macOS_ - Mensagem a ser apresentada acima da janela de entrada.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] - Um array de caminhos de arquivos selecionados pelo usuário. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[]&#32;(optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated. (For return values, see [table here](#bookmarks-array).)

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Como por exemplo:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

As array de `extensions` devem conter extensões sem caracteres-curinga ou pontos. (`'png'` é bom mas, `'.png'` e `'*.png'` são ruins). Para mostrar todos os arquivos use o caracter-curinga `*` (nenhum ouro caracter-curinga é suportado).

**Nota.:** No Windows e Linux um diálogo aberto não pode ser usado ao mesmo tempo para selecionar arquivos e diretórios, portanto se você estabelecer `properties` para `['openFile', 'openDirectory']` nessas plataformas, um seletor de diretório será mostrado.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `title` String (optional) - The dialog title. Cannot be displayed on some _Linux_ desktop environments.
  * `defaultPath` String (opcional) - Caminho absoluto do diretório, caminho absoluto do arquivo, ou o nome do arquivo a ser usado como padrão.
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `message` String (opcional) _macOS_ - Mensagem a ser exibida acima de campos de texto.
  * `nameFieldLabel` String (opcional) _macOS_ - Rótulo personalizado do texto a ser exibido em frente ao campo do nome do arquivo.
  * `showsTagField` Boolean (opcional) _macOS_ - apresenta a tag do campo de entrada, por padrão `true`.
  * `properties` String[]&#32;(optional)
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

Os `filters` especificam um array de tipos de arquivo que podem ser exibidos, veja `dialog.ShowOpenDialog` para exemplos.

### `dialog.showSaveDialog([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `title` String (optional) - The dialog title. Cannot be displayed on some _Linux_ desktop environments.
  * `defaultPath` String (opcional) - Caminho absoluto do diretório, caminho absoluto do arquivo, ou o nome do arquivo a ser usado como padrão.
  * `buttonLabel` String (opcional) - Rótulo personalizado para o botão de confirmação, quando deixado em branco o label padrão será usado.
  * `filters` [FileFilter[]](structures/file-filter.md) (opcional)
  * `message` String (opcional) _macOS_ - Mensagem a ser exibida acima de campos de texto.
  * `nameFieldLabel` String (opcional) _macOS_ - Rótulo personalizado do texto a ser exibido em frente ao campo do nome do arquivo.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[]&#32;(optional)
    * `showHiddenFiles` - Mostra arquivos escondidos no dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
* `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present. (For return values, see [table here](#bookmarks-array).)

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

Os `filters` especificam um array de tipos de arquivo que podem ser exibidos, veja `dialog.ShowOpenDialog` para exemplos.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `message` String - Conteúdo da caixa de mensagem.
  * `type` String (opcional) - Pode ser `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. No Windows, `"question"` exibe o mesmo ícone que `"info"`, a menos que você especifique um ícone usando a opção `"icon"`. No macOS, tanto `"warning"` como `"error"` exibirão o mesmo ícone de alerta.
  * `buttons` String[]&#32;(optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opcional) - Indicador do botão na array de botões que será selecionado como padrão quando a caixa de mensagem abrir.
  * `title` String (opcional) - Título da caixa de mensagem, algumas plataformas não o exibirão.
  * `detail` String (opcional) - Informações adicionais da mensagem.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (opcional)
  * `cancelId` Integer (opcional) - O indicador do botão será usado para cancelar o diálogo, por via da tecla `Esc`. Por padrão é atribuído ao primeiro botão como "cancelar" ou "não" como rótulos. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - No Windows, o Electron tentará identificar qual dos `buttons` são botões comuns (como "cancelar" ou "sim"), e exibir os outros como links de comandos no diálogo. Ele pode fazer o diálogo ser apresentado com o estilo dos aplicativos modernos do Windows. Se você não deseja esse comportamento, você pode definir `noLink` para `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normaliza o acesso às teclas do teclado entre as plataformas. Por padrão é `false`. Ativando-o assume-se que `&` é usado nos rótulos dos botões para atribuir a tecla de atalho de acesso do teclado assim os rótulos serão convertidos para que funcionem corretamente em cada plataforma, os caracteres `&` são removidos no macOS, convertidos para `_` no Linux, e deixados intactos no Windows. Por exemplo, um rótulo de botão `Vie&w` será convertido para `Vie_w` no Linux e `View` no macOS e pode ser selecionado através de `Alt-W` no Windows e Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal. If `browserWindow` is not shown dialog will not be attached to it. In such case it will be displayed as an independent window.

### `dialog.showMessageBox([browserWindow, ]options[, callback)`

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `message` String - Conteúdo da caixa de mensagem.
  * `type` String (opcional) - Pode ser `"none"`, `"info"`, `"error"`, `"question"` ou `"warning"`. No Windows, `"question"` exibe o mesmo ícone que `"info"`, a menos que você especifique um ícone usando a opção `"icon"`. No macOS, tanto `"warning"` como `"error"` exibirão o mesmo ícone de alerta.
  * `buttons` String[]&#32;(optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opcional) - Indicador do botão na array de botões que será selecionado como padrão quando a caixa de mensagem abrir.
  * `title` String (opcional) - Título da caixa de mensagem, algumas plataformas não o exibirão.
  * `detail` String (opcional) - Informações adicionais da mensagem.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (opcional)
  * `cancelId` Integer (opcional) - O indicador do botão será usado para cancelar o diálogo, por via da tecla `Esc`. Por padrão é atribuído ao primeiro botão como "cancelar" ou "não" como rótulos. If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (opcional) - No Windows, o Electron tentará identificar qual dos `buttons` são botões comuns (como "cancelar" ou "sim"), e exibir os outros como links de comandos no diálogo. Ele pode fazer o diálogo ser apresentado com o estilo dos aplicativos modernos do Windows. Se você não deseja esse comportamento, você pode definir `noLink` para `true`.
  * `normalizeAccessKeys` Boolean (opcional) - Normaliza o acesso às teclas do teclado entre as plataformas. Por padrão é `false`. Ativando-o assume-se que `&` é usado nos rótulos dos botões para atribuir a tecla de atalho de acesso do teclado assim os rótulos serão convertidos para que funcionem corretamente em cada plataforma, os caracteres `&` são removidos no macOS, convertidos para `_` no Linux, e deixados intactos no Windows. Por exemplo, um rótulo de botão `Vie&w` será convertido para `Vie_w` no Linux e `View` no macOS e pode ser selecionado através de `Alt-W` no Windows e Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:

* `response` Number - The index of the clicked button.
* `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box.

O argumento `browserWindow` permite que o diálogo seja acoplado a janela parent, tornando-a modal.

### `dialog.showErrorBox(title, content)`

* `title` String - O título a ser exibido na caixa de erro.
* `content` String - O conteúdo a ser exibido na caixa de erro.

Exibe um dialog modal que apresenta uma mensagem de erro.

Esse API pode ser chamado com segurança antes de que o evento `ready` que é emitido pelo `app`, é usado para reportar erros nos estágios iniciais da execução do aplicativo. Se chamado antes do evento `ready` do aplicativo no Linux, a mensagem será emitida para stderr, e o GUI do dialog não será mostrado.

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md))
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - O certificado para trust/import.
  * `message` String - A mensagem a ser exibida para o usuário.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

No macOS, esse método exibe um dialog modal que apresenta uma mensagem e informação de certificado, dando ao usuário a opção de confiar/importar o certificado. Se você fornecer um argumento `browserWindow` o dialog será acoplado à janela parent, fazendo-a modal.

No Windows as opções são mais limitadas, devido às API's do Win32 usadas:

* Como o macOS fornece o seu próprio diálogo de confirmação o argumento `message` não é usado.
* O argumento `browserWindow` é ignorado já que não é possível fazer essa confirmação um diálogo modal.

## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Sucesso   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Erro     | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Você pode chamar `BrowserWindow.getCurrentWindow().setSheetOffset (offset)`para mudar o offset da janela aonde os diálogos (sheets) estão acoplados.
