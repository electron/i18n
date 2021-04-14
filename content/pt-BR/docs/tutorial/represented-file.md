# Representação de Arquivo para o macOS BrowserWindows

## Visão Geral

No macOS, você pode definir um arquivo representado para qualquer janela em seu aplicativo. O ícone do arquivo representado será mostrado na barra de título, e quando os usuários `Command-Click` ou `Control-Click`, um popup com um caminho para o arquivo será mostrado .

![Representação de Arquivo][1]

> NOTA: A captura de tela acima é um exemplo onde esse recurso é usado para indicar o arquivo aberto atualmente no editor de texto do Átomo.

Você também pode definir o estado editado para uma janela para que o ícone do arquivo possa indicar se o documento nesta janela foi modificado.

Para definir uma representação de arquivo de uma janela, você pode usar as APIs [BrowserWindow.setRepresentedFilename][setrepresentedfilename] e [BrowserWindow.setDocumentEdited][setdocumentedited].

## Exemplo

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), adicione as seguintes linhas ao arquivo `main.js`:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require ('electron')

app.whenReady().then(((() => {
  const win = novo BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEded(true)
})
```

Após iniciar o aplicativo Electron, clique no título com `Command` ou `Control` tecla pressionada. Você deve ver um popup com o arquivo que você acabou de definir:

![Arquivo representado](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
