# Documentos Recentes (Windows & macOS)

## Visão Geral

Windows e macOS fornecem acesso a uma lista de documentos recentes abertos pelo o aplicativo via JumpList ou menu dock, respectivamente.

__JumpList:__

![Arquivos recentes do JumpList][1]

__Menu dock de aplicação:__

![Menu Dock do macOS][2]

Para adicionar um arquivo a documentos recentes, você precisa usar o aplicativo [.addRecentDocument][addrecentdocument] API.

## Exemplo

### Adicionar um item aos documentos recentes

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), adicione as seguintes linhas ao arquivo `main.js`:

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Após iniciar o aplicativo Electron, clique com o botão direito no ícone do aplicativo. Você deve ver o item que acabou de adicionar. Neste guia, o item é um arquivo de Markdown localizado na raiz do projeto:

![Documento recente](../images/recent-documents.png)

### Limpar a lista de documentos recentes

Para limpar a lista de documentos recentes, você precisa usar [app.clearRecentDocuments][clearrecentdocuments] API no arquivo `main.js` :

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Informação Adicional

### Notas do Windows

Para usar este recurso no Windows, seu aplicativo precisa ser registrado como um manipulador do tipo de arquivo do documento, caso contrário, o arquivo não aparecerá no JumpList mesmo depois de adicioná-lo. Você pode encontrar tudo no cadastro em [][app-registration]de Inscrição de Inscrição .

Quando um usuário clica em um arquivo do JumpList, uma nova instância de sua aplicação será iniciada com o caminho do arquivo adicionado como um argumento de linha de comando.

### Notas do macOS

#### Adicionar a lista de documentos recentes ao menu do aplicativo

Você pode adicionar itens de menu para acessar e limpar documentos recentes adicionando o seguinte código snippet ao seu modelo de menu:

```json
{
  "submenu":[
    {
      "label":"Abrir recente",
      "papel":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "papel":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![Item de menu recentes do macOS Documents][7]

Quando um arquivo é solicitado no menu de documentos recentes, o `open-file` evento de `app` módulo será emitido para ele.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[7]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
