## Class: WebRequest

> Intercepte e modifique o conteúdo de um pedido em vários estágios de sua vida.

Processo: [Main](../glossary.md#main-process)

Os casos da classe `WebRequest` são acessados usando a propriedade `webRequest` de um `Session`.

Os métodos de `WebRequest` aceitam um `filter` opcional e um `listener`. O `listener` será chamado com `listener(details)` quando o evento da API aconteceu. O objeto `details` descreve o pedido.

⚠️ Somente serão utilizadas as últimas `listener` anexadas. Passando `null` como `listener` cancelará a inscrição do evento.

O objeto `filter` tem uma propriedade `urls` que é um conjunto de padrões de de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de de URL. Se o `filter` for omitido, todas as solicitações serão correspondidas.

Para certos eventos, o `listener` é passado com um `callback`, que deve ser chamado com um objeto `response` quando `listener` fez seu trabalho.

Um exemplo de adicionar `User-Agent` cabeçalho para solicitações:

```javascript
const { session } = requer ('elétron')

// Modifique o agente do usuário para todas as solicitações para as seguintes urls.
filtro const = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filtro, (detalhes, retorno de chamada) => {
  detalhes.requestHeaders['User-Agent'] = 'MyAgent'
  callback ({ requestHeaders: details.requestHeaders })
})
```

### Métodos de Instância

Os seguintes métodos estão disponíveis em instâncias de `WebRequest`:

#### `webRequest.onBeforeRequest([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Function
    * objeto `response`
      * `cancel` Booleano (opcional)
      * `redirectURL` String (opcional) - A solicitação original é impedida de ser enviada ou concluída e, em vez disso, é redirecionada para a URL dada.

O `listener` será chamado com `listener(details, callback)` quando uma solicitação estiver prestes a ocorrer.

O `uploadData` é uma matriz de objetos `UploadData` .

O `callback` tem que ser chamado com um objeto `response`.

Alguns exemplos de `urls` válidas:

```js
'http://foo:1234/'
'http://foo.com/'
'http://foo:1234/bar'
'*://*/*'
'*://example.com/*'
'*://example.com/foo/*'
'http://*.foo:1234/'
'file://foo:1234/bar'
'http://foo:*/'
'*://www.foo.com/'
```

#### `webRequest.onBeforeSendHeaders([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * Registro `requestHeaders`<string, string>
  * `callback` Function
    * objeto `beforeSendResponse`
      * `cancel` Booleano (opcional)
      * `requestHeaders` Record<string, string | string[]> (opcional) - Quando fornecido, a solicitação será feita com esses cabeçalhos.

O `listener` será chamado com `listener(details, callback)` antes de enviar uma solicitação HTTP, uma vez que os cabeçalhos de solicitação estejam disponíveis. Isto pode ocorrer após uma conexão TCP ser feita ao servidor, mas antes que qualquer dado http seja enviado.

O `callback` tem que ser chamado com um objeto `response` .

#### `webRequest.onSendHeaders([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * Registro `requestHeaders`<string, string>

O `listener` será chamado com `listener(details)` pouco antes de uma solicitação será enviada ao servidor, modificações de resposta `onBeforeSendHeaders` anteriores são visíveis no momento em que este ouvinte for demitido.

#### `webRequest.onHeadersReceived([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `statusLine` Cordas
    * `statusCode` Integer
    * Registro `requestHeaders`<string, string>
    * `responseHeaders` Record<string, string[]> (opcional)
  * `callback` Function
    * objeto `headersReceivedResponse`
      * `cancel` Booleano (opcional)
      * `responseHeaders` Record<string, string | string[]> (opcional) - Quando fornecido, o servidor é assumido ter respondido com esses cabeçalhos.
      * `statusLine` String (opcional) - Deve ser fornecido ao substituir `responseHeaders` para alterar o status do cabeçalho, caso contrário, a resposta original o status do cabeçalho será usado.

O `listener` será chamado com `listener(details, callback)` quando os cabeçalhos de resposta http de uma solicitação foram recebidos.

O `callback` tem que ser chamado com um objeto `response` .

#### `webRequest.onResponseStarted([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `responseHeaders` Record<string, string[]> (opcional)
    * `fromCache` Boolean - Indica se a resposta foi buscada do cache de de disco.
    * `statusCode` Integer
    * `statusLine` Cordas

O `listener` será chamado com `listener(details)` quando o primeiro byte do corpo de resposta for recebido. Para solicitações HTTP, isso significa que a linha de status e os cabeçalhos de resposta estão disponíveis.

#### `webRequest.onBeforeRedirect([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `redirectURL` Cordas
    * `statusCode` Integer
    * `statusLine` Cordas
    * `ip` String (opcional) - O endereço IP do servidor para o enviado.
    * `fromCache` Booleano
    * `responseHeaders` Record<string, string[]> (opcional)

O `listener` será chamado com `listener(details)` quando um servidor iniciado redirecionamento está prestes a ocorrer.

#### `webRequest.onCompleted ([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `responseHeaders` Record<string, string[]> (opcional)
    * `fromCache` Booleano
    * `statusCode` Integer
    * `statusLine` Cordas
    * `error` Cordas

O `listener` será chamado com `listener(details)` quando uma solicitação for concluída .

#### `webRequest.onErrorOccurred ([filtro, ]ouvinte)`

* objeto `filter` (opcional)
  * `urls` String[] - Conjunto de padrões de URL que serão usados para filtrar as solicitações que não correspondem aos padrões de URL.
* | de função `listener` Null
  * objeto `details`
    * `id` Inteiro
    * String `url`
    * `method` String
    * `webContentsId` Inteiro (opcional)
    * `webContents` WebContents (opcional)
    * `frame` WebFrameMain (opcional)
    * `resourceType` Cordas
    * `referrer` Cordas
    * `timestamp` Duplo
    * `fromCache` Booleano
    * `error` String - A descrição do erro.

O `listener` será chamado com `listener(details)` quando ocorrer um erro.
