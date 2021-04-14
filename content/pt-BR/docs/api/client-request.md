## Class: ClientRequest

> Realiza requisições HTTP/HTTPS.

Processo: [Main](../glossary.md#main-process)

`ClientRequest` implementa a interface [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) e deste modo um [EventEmitter][event-emitter].

### `new ClientRequest(opções)`

* `options` (| de objetos String) - Se `options` for uma String, ela será interpretada como URL de solicitação. Se for um objeto, espera-se especificar totalmente uma solicitação HTTP através do seguintes propriedades:
  * `method` String (opcional) - O método de solicitação HTTP. Padrão para o método GET .
  * `url` String (opcional) - A URL da solicitação. Deve ser fornecido no formulário absoluto com o esquema de protocolo especificado como http ou https.
  * `session` Session (opcional) - A instância [`Session`](session.md) com a qual a solicitação está associada.
  * `partition` String (opcional) - O nome da [`partição`](session.md) com a qual a requisição está associada. O padrão é uma string vazia. A opção `session` substitui `partition`. Assim, se a `sessão` é explicitamente especificada, a `partição` é ignorada.
  * `credentials` String (opcional) - Pode ser `include` ou `omit`. Se enviar credenciais [](https://fetch.spec.whatwg.org/#credentials) com este pedido . Se definida para `include`, serão utilizadas credenciais da sessão associadas ao a solicitação será usada. Se definido para `omit`, as credenciais não serão enviadas com a solicitação (e o evento `'login'` não será acionado no evento de um 401). Isso corresponde ao comportamento do [buscar](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) opção de mesmo nome. Se essa opção não for especificada, a autenticação dados da sessão serão enviados e os cookies não serão enviados (a menos que `useSessionCookies` seja definido).
  * `useSessionCookies` Boolean (opcional) - Se enviar cookies com esta solicitação da sessão fornecida. Se `credentials` for especificado, esta opção não tem efeito. Por padrão é `false`.
  * `protocol` String (opcional) - Pode ser `http:` ou `https:`. O protocolo esquema na forma de "esquema:". Padrão para 'http:'.
  * `host` String (opcional) - O servidor, definido como a concatenação do nome com a porta: 'nome:porta'.
  * `hostname` String (opcional) - O nome do servidor.
  * `port` Integer (opcional) - O número da porta do servidor.
  * `path` String (opcional) - A parte do caminho da URL de requisição.
  * `redirect` String (opcional) - Pode ser `follow`, `error` ou `manual`. O modo de redirecionamento para esta solicitação. Quando o modo estiver `error`, qualquer redirecionamento será abortado. Quando o modo estiver `manual` o redirecionamento será cancelado, a menos que [`request.followRedirect`](#requestfollowredirect) seja invocado sincronicamente durante o evento [`redirect`](#event-redirect) .  O padrão é `follow`.
  * `origin` String (opcional) - A URL de origem da solicitação.

As propriedades em `options`, como `protocol`, `host`, `hostname`, `port` e `path` seguem estritamente o modelo Node.js, como descrito no módulo [URL](https://nodejs.org/api/url.html).

Por exemplo, nós poderíamos criar a mesma requisição para 'github.com' da seguinte forma:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Eventos de instância

#### Evento: 'response'

Retorna:

* `response` IncomingMessage - Um objeto representando a resposta HTTP.

#### Evento: 'login'

Retorna:

* objeto `authInfo`
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (opcional)
  * `password` String (opcional)

Emitido quando um proxy de autenticação está solicitando as credenciais de usuário.

A função de `callback` é esperada para chamar de volta as credenciais do usuário:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```

Informar credenciais vazias irá cancelar a requisição e reportar um erro de autenticação no objeto de resposta:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Evento: 'finish'

Emitido logo após o último pedaço dos dados de `request` for escrito no objeto `request`.

#### Evento: 'abort'

Emitido quando o `request` é abortado. O evento `abort` não será disparado se o `request` já estiver fechado.

#### Evento: 'error'

Retorna:

* `error` Error - um objeto de erro que provê informações sobre a falha.

Emitido quando o módulo `net` falha ao emitir uma requisição de rede. Normalmente quando o objeto `request` emite um evento `error`, um evento `close` virá a seguir e nenhum objeto de resposta será fornecido.

#### Evento: 'close'

Emitido como último evento na transação HTTP de requisição-resposta. O evento `close` indica que nenhum outro evento será emitido no objeto `request` e nem no objeto `response`.

#### Evento: 'redirect'

Retorna:

* `statusCode` Integer
* `method` String
* `redirectUrl` Cordas
* Registro `responseHeaders`<String, String[]>

Emitido quando o servidor retorna uma resposta de redirecionamento (por exemplo, 301 Movido Permanentemente). Chamando [`request.followRedirect`](#requestfollowredirect) continuará com o redirecionamento.  Se este evento for tratado, [`request.followRedirect`](#requestfollowredirect) deve ser chamado **síncrontemente**, caso contrário, a solicitação será cancelada.

### Propriedades de Instância

#### `request.chunkedEncoding`

Um `Boolean` especificando se a solicitação usará codificação de transferência em pedaços HTTP ou não. Padrão para falso. A propriedade é legível e gravável, porém pode ser definida apenas antes da primeira operação de gravação, pois os cabeçalhos HTTP ainda não são colocados no fio. Tentar definir a propriedade `chunkedEncoding` após a primeira de gravação vai dar um erro.

O uso de codificação em pedaços é fortemente recomendado se você precisar enviar um grande corpo de solicitação de , pois os dados serão transmitidos em pequenos pedaços em vez de serem protegidos internamente dentro da memória do processo Electron.

### Métodos de Instância

#### `request.setHeader(name, value)`

* `name` String - Um nome de cabeçalho HTTP extra.
* `value` String - Um valor extra de cabeçalho HTTP.

Adiciona um cabeçalho HTTP extra. O nome do cabeçalho será emitido como está sem diminuir. Só pode ser chamado antes da primeira gravação. Chamando este método após a primeira gravação vai dar um erro. Se o valor repassado não for um `String`, seu método `toString()` será chamado para obter o valor final.

Certos cabeçalhos são proibidos de serem definidos por aplicativos. Estes cabeçalhos estão listados abaixo. Mais informações sobre cabeçalhos restritos podem ser encontradas em [o cabeçalho do Chromium](https://source.chromium.org/chromium/chromium/src/+/master:services/network/public/cpp/header_util.cc;drc=1562cab3f1eda927938f8f4a5a91991fefde66d3;bpv=1;bpt=1;l=22).

* `Comprimento do conteúdo`
* `Host`
* `Trailer` ou `Te`
* `Atualização`
* `Cookie2`
* `Manter-vivo`
* `Codificação-Codificação`

Além disso, a definição do cabeçalho `Connection` para o valor `upgrade` também é proibida.

#### `request.getHeader(name)`

* `name` String - Especifique um nome de cabeçalho extra.

Devoluções `String` - O valor de um nome de cabeçalho extra previamente definido.

#### `request.removeHeader(name)`

* `name` String - Especifique um nome de cabeçalho extra.

Remove um nome de cabeçalho extra previamente definido. Este método só pode ser chamado de antes da primeira gravação. Tentar chamá-lo depois da primeira gravação vai dar um erro.

#### `request.write(chunk[, codificação][, retorno de chamada])`

* `chunk` (| de cordas Buffer) - Um pedaço dos dados do órgão de solicitação. Se for uma sequência , ela será convertida em um Buffer usando a codificação especificada.
* `encoding` String (opcional) - Usado para converter pedaços de corda em objetos de buffer. Padrão para 'utf-8'.
* função `callback` (opcional) - Chamado após o término da operação de gravação.

`callback` é essencialmente uma função fictícia introduzida no propósito de manter semelhança com a API .js Nó. É chamado assincronicamente no próximo de carrapato depois que `chunk` conteúdo foram entregues na camada de rede Chromium. Ao contrário da implementação .js Nó, não é garantido que `chunk` conteúdo tenha sido lavado no fio antes de `callback` ser chamado.

Adiciona um pedaço de dados ao corpo de solicitação. A primeira operação de gravação pode fazer com que os cabeçalhos de solicitação sejam emitidos no fio. Após a primeira operação de gravação, não é permitido adicionar ou remover um cabeçalho personalizado.

#### `request.end ([chunk][, codificação][, retorno de chamada])`

* `chunk` (| de cordas Buffer) (opcional)
* `encoding` String (opcional)
* função `callback` (opcional)

Envia a última parte dos dados da solicitação. As operações subsequentes de gravação ou final não serão permitidas. O evento `finish` é emitido logo após o término da operação.

#### `request.abort()`

Cancela uma transação HTTP em andamento. Se a solicitação já emitiu o `close` evento, a operação de abortagem não terá efeito. Caso contrário, um evento em andamento emitirá eventos `abort` e `close` . Além disso, se houver um objeto de resposta em andamento, ele emitirá o `aborted` evento.

#### `request.followRedirect()`

Continua qualquer redirecionamento pendente. Só pode ser chamado durante um evento `'redirect'` .

#### `request.getUploadProgress()`

Retorna `Object`:

* `active` Booleano - Se o pedido está ativo no momento. Se isso for falso nenhuma outra propriedade será definida
* `started` Boolean - Se o upload já começou. Se isso for falso, tanto `current` quanto `total` serão definidos como 0.
* `current` Integer - O número de bytes que foram carregados até agora
* `total` Inteiro - O número de bytes que serão carregados neste pedido

Você pode usar este método em conjunto com `POST` solicitações para obter o progresso de um upload de arquivo ou outra transferência de dados.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
