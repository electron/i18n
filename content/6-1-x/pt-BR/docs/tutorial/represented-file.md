# Representação de Arquivo para o macOS BrowserWindows

No macOS, uma janela pode definir a representação do arquivo para mostra na barra de título quando o usar o Command-Clique ou Control-Clique sobre o título do caminho, um popup vai ser exibido.

Você também pode definir o estado de editado de uma janela para que o ícone do arquivo possa indicar se o documento nesta janela foi modificado.

__Representação de arquivo em popup menu:__

![Representação de Arquivo](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Para definir uma representação de arquivo de uma janela, você pode usar as APIs [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) e [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos):

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
