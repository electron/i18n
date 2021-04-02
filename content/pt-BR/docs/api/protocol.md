# protocol

> Registra um protocolo personalizado e intercepta as solicitações de protocolo existentes.

Processo: [Main](../glossary.md#main-process)

Um exemplo de implementação de um protocolo que tem o mesmo efeito que o `file://` protocol:

```javascript
const { app, protocol } = require ('electron')
caminho const = require('path')

app.whenReady().then((() => {
  protocol.registerFileProtocol('átomo', (solicitação, retorno de chamada) => {
    url const = request.url.substr(7)
    callback({ path: path.normalize('${__dirname}/${url}') })
  })
})
```

**Nota:** Todos os métodos, a menos que seja especificados, só podem ser usados ​​após o evento `app` quando é emitido.

## Usando `protocol` com uma `partition` personalizada ou `session`

Um protocolo é registrado em um objeto específico de [`session`](./session.md) Electron. Se você não especificar uma sessão, então seu `protocol` será aplicado a sessão padrão que o Electron usa. No entanto, se você definir um `partition` ou `session` no `webPreferences`do seu `browserWindow`, então essa janela usará uma sessão diferente e seu protocolo personalizado não funcionará se você apenas usar `electron.protocol.XXX`.

Para que seu protocolo personalizado funcione em combinação com uma sessão personalizada, você precisa registrá-lo nessa sessão explicitamente.

```javascript
const { session, app, protocol } = require ('electron')
caminho const = require('path')

app.whenReady().then((() => {
  partição const = 'persist:exemplo'
  const ses = session.fromPartition(partição)

  ses.protocol.protocol.registerFileProtocol('átomo', (solicitação, retorno de chamada) => {
    url const = request.url.substr(7)
    callback({ path: path.normalize('${__dirname}/${url}') })
  })

  mainWindow = novo BrowserWindow({ webPreferências: { partition } })
})
```

## Métodos

O módulo de protocolo possui os seguintes métodos:

### `protocol.registerSchemesAsPrivileged (customSchemes)`

* `customSchemes` [CustomScheme[]](structures/custom-scheme.md)

**Nota:** Este método só pode ser usado antes que o `ready` evento do módulo `app` seja emitido e possa ser chamado apenas uma vez.

Registra o `scheme` como padrão, seguro, ignora a política de segurança de conteúdo para recursos, permite o registro do ServiceWorker, suporta buscar API e transmitir vídeo/áudio. Especifique um privilégio com o valor de `true` para habilitar o recurso.

Um exemplo de registro de um esquema privilegiado, que ignora a Política de segurança de de conteúdo:

```javascript
const { protocol } = require('electron') protocolo
.registerSchemesAsPrivileged([
  { esquema: 'foo', privilégios: { bypassCSP: true } }
])
```

Um esquema padrão adere ao que a RFC 3986 chama [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). Por exemplo `http` e `https` são esquema padrão, enquanto `file` não é.

O registro de um esquema como padrão permite que recursos relativos e absolutos sejam resolvidos corretamente quando atendidos. Caso contrário, o esquema se comportará como o protocolo `file`, mas sem a capacidade de resolver URLs relativos.

Por exemplo, quando você carrega a página seguinte com o protocolo personalizado sem registrando-o como esquema padrão, a imagem não será carregada porque esquemas não padrão não podem reconhecer URLs relativas:

```html
<body>
  <img src='test.png'>
</body>
```

Registrar um esquema como padrão permitirá o acesso aos arquivos através do[FileSystem API][file-system-api]. Caso contrário, o renderizador lançará um erro de segurança para o esquema.

Por apis de armazenamento da Web padrão (localStorage, sessionStorage, webSQL, indexadoDB, cookies) são desativados para esquemas não padrão. Então, em geral, se você quiser registrar um protocolo personalizado para substituir o protocolo `http` , você tem que registrar -lo como um esquema padrão.

Os protocolos que usam fluxos (http e protocolos de fluxo) devem definir `stream: true`. Os elementos HTML `<video>` e `<audio>` esperam que os protocolos tampem suas respostas por padrão. O sinalizador `stream` configura esses elementos para corretamente esperar respostas de streaming.

### `protocol.registerFileProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler`
  * </a>de  do Protocolo de `request`

</li> 
    
      * `callback` Function 
        * `response` (| de cordas  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi registrado com sucesso

Registra um protocolo de `scheme` que enviará um arquivo como resposta. O `handler` será chamado com `request` e `callback` onde `request` é um pedido de entrada para o `scheme`.

Para lidar com o `request`, o `callback` deve ser chamado com o caminho do arquivo ou com um objeto que tenha uma propriedade `path` , por exemplo. `callback(filePath)` ou `callback({ path: filePath })`. A `filePath` deve ser um caminho absoluto.

Por padrão, o `scheme` é tratado como `http:`, que é analisado de forma diferente a partir de protocolos que seguem a "sintaxe uri genérica" como `file:`.



### `protocol.registerBufferProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (| buffer  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi registrado com sucesso

Registra um protocolo de `scheme` que enviará um `Buffer` como resposta.

O uso é o mesmo com `registerFileProtocol`, exceto que o `callback` deve ser chamado com um objeto `Buffer` ou um objeto que tenha a propriedade `data` .

Exemplo:



```javascript
protocol.registerBufferProtocol('átomo', (solicitação, retorno de chamada) => {
  callback({ mimeType: 'text/html', dados: Buffer.from('<h5>Response</h5>') })
})
```




### `protocol.registerStringProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (| de cordas  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi registrado com sucesso

Registra um protocolo de `scheme` que enviará um `String` como resposta.

O uso é o mesmo com `registerFileProtocol`, exceto que o `callback` deve ser chamado com um `String` ou um objeto que tenha a propriedade `data` .



### `protocol.registerHttpProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * Protocolo de `response` Reponse</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi registrado com sucesso

Registra um protocolo de `scheme` que enviará uma solicitação HTTP como resposta.

O uso é o mesmo com `registerFileProtocol`, exceto que o `callback` deve ser chamado com um objeto que tenha a propriedade `url` .



### `protocol.registerStreamProtocol (esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (ReadableStream |  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi registrado com sucesso

Registra um protocolo de `scheme` que enviará um fluxo como resposta.

O uso é o mesmo com `registerFileProtocol`, exceto que o `callback` deve ser chamado com um objeto [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) ou um objeto que tem a propriedade `data` .

Exemplo:



```javascript
const { protocol } = require ('electron')
const { PassThrough } = require ('stream')

função createStream (texto) {
  const rv = novo PassThrough() // PassThrough é também um fluxo legível
  rv.push(texto)
  rv.push(nulo)
  retorno rv
}

protocolo.registerStreamProtocol('átomo', (solicitação, retorno de chamada) => {
  callback({ status
    : 200,
    cabeçalhos: {
      'tipo de conteúdo': 'text/html'
    },
    dados: createStream('<h5>Response</h5>')
  })
})
```


É possível passar qualquer objeto que implemente a API de fluxo legível (emite `data`/`end`/`error` eventos). Por exemplo, veja como um arquivo pode ser devolvido:



```javascript
protocol.registerStreamProtocol('átomo', (solicitação, retorno de chamada) => {
  callback (fs.createReadStream('index.html'))
})
```




### `protocolo.unregisterProtocol(esquema)`

* `scheme` String

Devoluções `Boolean` - Se o protocolo foi não registrado com sucesso

Não se ressurrece ao protocolo personalizado de `scheme`.



### `protocol.isProtocolRegistered(esquema)`

* `scheme` String

Retorno `Boolean` - Se `scheme` já está registrado.



### `protocol.interceptFileProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (| de cordas  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi interceptado com sucesso

Intercepta `scheme` protocolo e usa `handler` como novo manipulador do protocolo que envia um arquivo como resposta.



### `protocol.interceptStringProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (| de cordas  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi interceptado com sucesso

Intercepta `scheme` protocolo e usa `handler` como novo manipulador do protocolo que envia um `String` como resposta.



### `protocol.interceptBufferProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (| buffer  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi interceptado com sucesso

Intercepta `scheme` protocolo e usa `handler` como novo manipulador do protocolo que envia um `Buffer` como resposta.



### `protocol.interceptHttpProtocol(esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * Protocolo de `response` [Reponse](structures/protocol-response.md)</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi interceptado com sucesso

Intercepta `scheme` protocolo e usa `handler` como novo manipulador do protocolo que envia um novo pedido HTTP como resposta.



### `protocol.interceptStreamProtocol (esquema, manipulador)`

* `scheme` String
* Função `handler` 
    * </a>de  do Protocolo de `request` </li> 
    
      * `callback` Function 
        * `response` (ReadableStream |  Protocolo de [Reponse](structures/protocol-response.md))</ul></li> </ul> 

Devoluções `Boolean` - Se o protocolo foi interceptado com sucesso

O mesmo que `protocol.registerStreamProtocol`, exceto que substitui um manipulador de protocolo existente.



### `protocolo.uninterceptProtocol(esquema)`

* `scheme` String

Devoluções `Boolean` - Se o protocolo foi não interceptado com sucesso

Remova o interceptor instalado para `scheme` e restaure seu manipulador original.



### `protocol.isProtocolIntercepted(esquema)`

* `scheme` String

Retorna `Boolean` - Se `scheme` já foi interceptado.

[file-system-api]: https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem
