# webFrame

> Personalize a renderização da página web atual.

Processo: [Renderizador](../glossary.md#renderer-process)

`webFrame` exportação do módulo Electron é uma instância da classe `WebFrame` representando o quadro superior do `BrowserWindow`atual . Subquadrados podem ser recuperados por certas propriedades e métodos (por exemplo. `webFrame.firstChild`).

Um exemplo de zoom da página atual para 200%.

```javascript
const { webFrame } = require ('electron')

webFrame.setZoomFactor(2)
```

## Métodos

A classe `WebFrame` tem os seguintes métodos de instância:

### `webFrame.setZoomFactor(fator)`

* `factor` fator Double - Zoom; padrão é 1.0.

Altera o fator de zoom para o fator especificado. O fator zoom é por cento de zoom dividido por 100, então 300% = 3,0.

O fator deve ser maior que 0,0.

### `webFrame.getZoomFactor()`

Retornos `Number` - O fator zoom atual.

### `webFrame.setZoomLevel(nível)`

* número `level` - Nível de zoom.

Altera o nível de zoom para o nível especificado. O tamanho original é 0 e cada incremento acima ou abaixo representa um zoom 20% maior ou menor para padrão limites de 300% e 50% do tamanho original, respectivamente.

> **NOTA**: A política de zoom no nível do Chromium é de mesma origem, o que significa que o nível de zoom para um domínio específico se propaga em todas as instâncias de janelas com mesmo domínio. Diferenciar os URLs da janela fará com que o zoom funcione por janela.

### `webFrame.getZoomLevel()`

Retornos `Number` - O nível de zoom atual.

### `webFrame.setVisualZoomLevelLimits (mínimoNível, máximoNível)`

* Número de `minimumLevel`
* Número de `maximumLevel`

Define o nível máximo e mínimo de pinch-to-zoom.

> ****NOTA : O zoom visual é desativado por padrão em Electron. Para ree enablei-lo, ligue:
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setSpellCheckProvider (idioma, provedor)`

* `language` Cordas
* objeto `provider`
  * Função `spellCheck`
    * `words` String[]
    * `callback` Function
      * `misspeltWords` String[]

Define um provedor para verificação ortom ortomial em campos de entrada e áreas de texto.

Se você quiser usar este método, você deve desativar o verificador ortográfico builtin quando você construir a janela.

```js
const mainWindow = novo BrowserWindow({
  webPreferências: {
    spellcheck: false
  }
})
```

O `provider` deve ser um objeto que tem um método `spellCheck` que aceita uma série de palavras individuais para verificação ortográfica. A função `spellCheck` é executada assincronamente e chama a função `callback` com uma série de palavras mal-humoradas quando concluídas.

Um exemplo de uso [][spellchecker] de verificação ortográfica de nó como provedor:

```javascript
const { webFrame } = require ('electron')
feitiço constChecker = require ('spellchecker')
webFrame.setSpellCheckProvider ('en-US', {
  spellCheck (palavras, retorno de chamada) {
    setTimeout(() => {
      verificador ortográfico const = require ('spellchecker')
      const escrito erroneamente = palavras.filtro(x => spellchecker.isMisspelled(x))
      callback (escrito errado)
    }, 0)

}
```

### `webFrame.insertCSS(css)`

* `css` String - Código fonte CSS.

Devoluções `String` - Uma chave para o CSS inserido que pode ser usada posteriormente para remover CSS via `webFrame.removeInsertedCSS(key)`.

Injeta CSS na página web atual e retorna uma chave exclusiva para a folha de inserida.

### `webFrame.removeInsertedCSS(chave)`

* `key` Cordas

Remove o CSS inserido da página web atual. A folha de estilo é identificada por sua chave, que é devolvida de `webFrame.insertCSS(css)`.

### `webFrame.insertText(texto)`

* `text` String

Insere `text` ao elemento focal.

### `webFrame.executeJavaScript (código[, userGesture, callback])`

* `code` String
* `userGesture` Booleano (opcional) - Padrão é `false`.
* `callback` Função (opcional) - Chamado após a execução do script. A menos que o quadro seja suspenso (por exemplo, mostrando um alerta modal), a execução será síncrono e o retorno de chamada será invocado antes que o método retorne. Para compatibilidade com uma versão mais antiga deste método, o parâmetro de erro é segundo.
  * `result` Qualquer
  * `error` Error

Devoluções `Promise<any>` - Uma promessa que se resolve com o resultado do código de executado ou é rejeitada se a execução for lance ou resulte em uma promessa rejeitada.

Avalia `code` na página.

Na janela do navegador algumas APIs HTML como `requestFullScreen` só podem ser invocadas por um gesto do usuário. A configuração `userGesture` para `true` removerá essa limitação.

### `webFrame.executeJavaScriptInIsolatedWorld (worldId, scripts[, userGesture, callback])`

* `worldId` Integer - O ID do mundo para executar o javascript , `0` é o mundo principal padrão (onde o conteúdo é executado), `999` é o mundo usado pelo recurso `contextIsolation` da Electron. Aceita valores na faixa 1.536870911.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Booleano (opcional) - Padrão é `false`.
* `callback` Função (opcional) - Chamado após a execução do script. A menos que o quadro seja suspenso (por exemplo, mostrando um alerta modal), a execução será síncrono e o retorno de chamada será invocado antes que o método retorne.  Para compatibilidade com uma versão mais antiga deste método, o parâmetro de erro é segundo.
  * `result` Qualquer
  * `error` Error

Devoluções `Promise<any>` - Uma promessa que se resolve com o resultado do código de executado ou é rejeitada se a execução não puder ser iniciada.

Funciona como `executeJavaScript` , mas avalia `scripts` em um contexto isolado.

Note-se que quando a execução do script falhar, a promessa devolvida não rejeitar e o `result` seria `undefined`. Isso porque o Cromo não de enviar erros de mundos isolados para mundos estrangeiros.

### `webFrame.setIsolatedWorldInfo (worldId, info)`

* `worldId` Inteiro - O ID do mundo para executar o javascript, `0` é o mundo padrão, `999` é o mundo usado pela Electrons `contextIsolation` recurso. As extensões cromadas reservam a gama de IDs em `[1 << 20, 1 << 29)`. Você pode fornecer qualquer inteiro aqui.
* objeto `info`
  * `securityOrigin` String (opcional) - Origem de segurança para o mundo isolado.
  * `csp` String (opcional) - Política de Segurança de Conteúdo para o mundo isolado.
  * `name` String (opcional) - Nome para mundo isolado. Útil em devtools.

Defina a origem de segurança, a política de segurança de conteúdo e o nome do mundo isolado. Nota: Se o `csp` for especificado, o `securityOrigin` também deve ser especificado.

### `webFrame.getResourceUsage()`

Retorna `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Retorna um objeto descrevendo informações de uso da memória interna do Blink caches.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

Isso vai gerar:

```javascript
{
  imagens: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* mesmo com "imagens" */ },
  xslStyleSheets: { /* mesmo com "imagens" */ },
  fontes: { /* mesmo com "imagens" */ },
  outra: { /* mesmo com "imagens" */
}
```

### `webFrame.clearCache()`

Tentativas de liberar memória que não está mais sendo usada (como imagens de uma navegação anterior).

Note que chamar cegamente este método provavelmente torna a Electron mais lenta, uma vez que terá que reabastecer esses caches esvaziados, você só deve chamá-lo se um evento em seu aplicativo ocorreu que faz você pensar que sua página está realmente usando menos memória (ou seja, você navegou de uma página super pesada para uma principalmente vazia, e pretende ficar lá).

### `webFrame.getFrameForSelector (seletor)`

* `selector` Sequência - Seletor CSS para um elemento de quadro.

Devoluções `WebFrame` - O elemento quadro em `webFrame's` documento selecionado por `selector`, `null` seria devolvido se `selector` não selecionar um quadro ou se o quadro não estiver no processo de renderização atual.

### `webFrame.findFrameByName(nome)`

* `name` String

Devoluções `WebFrame` - Uma criança de `webFrame` com o `name`fornecido , `null` seria devolvida se não houvesse tal quadro ou se o quadro não estivesse no processo de renderização atual.

### `webFrame.findFrameByRoutingId(roteamentoId)`

* `routingId` Integer - Um `Integer` representando a id de quadro única no processo de renderização atual. Os IDs de roteamento podem ser recuperados de `WebFrame` instâncias (`webFrame.routingId`) e também são passados por quadro eventos específicos de navegação `WebContents` (por exemplo. `did-frame-navigate`)

Devoluções `WebFrame` - que tem o `routingId`fornecido , `null` se não forem encontradas.

### `webFrame.isWordMisspelled(palavra)`

* `word` String - A palavra a ser checada.

Retorna `Boolean` - Verdade se a palavra estiver escrita erroneamente de acordo com o verificador ortográfico embutido em , falso de outra forma. Se nenhum dicionário estiver carregado, sempre devolva falso.

### `webFrame.getWordSuggestions(palavra)`

* `word` String - A palavra mal escrito.

Retorna `String[]` - Uma lista de palavras sugeridas para uma determinada palavra. Se a palavra for escrita corretamente, o resultado estará vazio.

## Propriedades

### `webFrame.top` _Readonly_

Um `WebFrame | null` representando o quadro superior na hierarquia de quadros a que `webFrame` pertence, a propriedade seria `null` se o quadro superior não estivesse no processo de renderização atual.

### `webFrame.opener` _Readonly_

Um `WebFrame | null` representando o quadro que abriu `webFrame`, a propriedade seria `null` se não houver abridor ou abridor não está no processo de renderização atual.

### `webFrame.parent` _Readonly_

Um `WebFrame | null` representando o quadro pai de `webFrame`, a propriedade seria `null` se `webFrame` for superior ou pai não estiver no processo de renderização atual.

### `webFrame.firstChild` _Readonly_

Um `WebFrame | null` representando o primeiro quadro infantil de `webFrame`, o de propriedade seria `null` se `webFrame` não tiver filhos ou se o primeiro filho não estiver no processo de renderização atual .

### `webFrame.nextSibling` _Readonly_

Uma `WebFrame | null` representando o próximo quadro de irmãos, a propriedade seria `null` se `webFrame` é o último quadro em seu pai ou se o próximo irmão não está no processo de renderização atual.

### `webFrame.routingId` _Readonly_

Um `Integer` representando o id de quadro único no processo de renderização atual. Instâncias de WebFrame distintas que se referem ao mesmo quadro subjacente terão o mesmo `routingId`.

[spellchecker]: https://github.com/atom/node-spellchecker

[spellchecker]: https://github.com/atom/node-spellchecker
