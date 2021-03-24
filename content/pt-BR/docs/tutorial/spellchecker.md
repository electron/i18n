# SpellChecker

O Electron possui suporte integrado para a correção ortográfica do Chromium desde o Electron 8.  No Windows e Linux, isto é alimentado por dicionários do Hunspell, e no macOS ele faz uso das APIs ortográficas nativas.

## Como habilitar o corretor ortográfico?

Para o Electron 9 ou superior, o corretor ortográfico é habilitado por padrão.  Para Electron 8, você precisa ativá-lo no `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Como definir os idiomas que o corretor ortográfico usa?

No macOS, como usamos as APIs nativas, não há como definir a linguagem que o corretor ortográfico usa. Por padrão no macOS, o corretor ortográfico nativo detectará automaticamente o idioma usado para você.

Para Windows e Linux, há algumas APIs do Electron que você deve usar para definir os idiomas para o corretor ortográfico.

```js
// Define o corretor ortográfico para verificar o Inglês EUA e Francês
myWindow.session. (['en-US', 'fr'])

// Um array de todos os códigos de idioma disponíveis
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Por padrão, o corretor ortográfico ativará o idioma correspondente à linguagem do sistema operacional atual.

## Como colocar os resultados do corretor ortográfico no meu menu de contexto?

Todas as informações necessárias para gerar um menu de contexto são fornecidas no evento [`context-menu`](../api/web-contents.md#event-context-menu) em cada instância</code> do `webContents.  Um pequeno exemplo
de como fazer um menu de contexto com essas informações é fornecido abaixo.</p>

<pre><code class="js">const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('contexto-menu', (evento, params) => {
  const menu = new Menu()

  // Adicione cada sugestão de ortografia
  para (const suggestion of params. menu {
    ictionarySugestões. ppend(new MenuItem({
      label: sugestão,
      click: () => mainWindow.webContents. eplaceMisspelling(sugestão)
    }))
  }

  // Permite que os usuários adicionem a palavra errada ao dicionário
  se (params. isspelledWord) {
    menu. ppend(
      new MenuItem({
        label: 'Adicionar ao dicionário',
        clique: () => mainWindow. ebContents. ession.addWordToSpellCheckerDictionary(params.mispelledWord)
      })
    )
  }

  menu.popup()
})
`</pre>

## O corretor ortográfico usa algum serviço do Google?

Embora o corretor ortográfico em si não envie nenhum tipo, palavras ou entrada de usuário para os serviços do Google, os arquivos de dicionário de caça são baixados do Google CDN por padrão.  Se você quiser evitar isso, você pode fornecer uma URL alternativa para baixar os dicionários.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
