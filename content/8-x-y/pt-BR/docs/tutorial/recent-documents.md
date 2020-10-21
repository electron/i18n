# Documentos Recentes (Windows & macOS)

Windows e macOS fornecem acesso a uma lista de documentos recentes abertos pelo o aplicativo via JumpList ou menu dock, respectivamente.

__JumpList:__

![Arquivos recentes do JumpList][1]

__Menu dock de aplicação:__

![Menu Dock do macOS][2]

To add a file to recent documents, you can use the [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments][clearrecentdocuments] API to empty the recent documents list:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Notas do Windows

Para poder utilizar este recurso no Windows, sua aplicação tem que ser registrada como um manipulador do tipo de arquivo do documento, caso contrário, o arquivo não aparecerá no JumpList mesmo depois de adicioná-lo. You can find everything on registering your application in [Application Registration][app-registration].

Quando um usuário clica em um arquivo do JumpList, uma nova instância de sua aplicação será iniciada com o caminho do arquivo adicionado como um argumento de linha de comando.

## Notas do macOS

When a file is requested from the recent documents menu, the `open-file` event of `app` module will be emitted for it.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
