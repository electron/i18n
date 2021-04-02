## Class: IncomingMessage

> Manuseie as respostas às solicitações HTTP/HTTPS.

Processo: [Main](../glossary.md#main-process)

`IncomingMessage` implementa a interface</a> Readable Stream [e, portanto, é um](https://nodejs.org/api/stream.html#stream_readable_streams)eventEmitter

.</p> 



### Eventos de instância



#### Evento: 'dados'

Retorna:

* `chunk` Buffer - Um pedaço dos dados do corpo de resposta.

O `data` evento é o método usual de transferência de dados de resposta para código aplicável.



#### Evento: 'fim'

Indica que o corpo de resposta terminou. Deve ser colocado antes do evento 'dados'.



#### Evento: 'abortado'

Emitido quando uma solicitação foi cancelada durante uma transação HTTP em curso.



#### Evento: 'error'

Retorna:

`error` Erro - Normalmente, uma sequência de erros identifica a causa raiz da falha de identificação.

Emitido quando ocorreu um erro ao transmitir eventos de dados de resposta. Para instância, se o servidor fechar o subjacente enquanto a resposta ainda estiver streaming, um evento `error` será emitido no objeto de resposta e um evento `close` seguirá posteriormente no objeto de solicitação.



### Propriedades de Instância

Uma instância `IncomingMessage` tem as seguintes propriedades legíveis:



#### `response.statusCode`

Um `Integer` indica o estado do código de resposta HTTP.



#### `response.statusMessage`

Uma `String` representa a mensagem de estado HTTP.



#### `response.headers`

Um `Record<string, string | string[]>` representando os cabeçalhos de resposta HTTP. O objeto `headers` é formatado da seguinte forma:

* Todos os nomes de cabeçalho são em minúsculas.
* Duplicatas de `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`, ou `user-agent` são descartadas.

* `set-cookie` é sempre uma matriz. Duplicatas são adicionadas à matriz.

* Para cabeçalhos `cookie` duplicados, os valores são unidos com '; '.
* Para todos os outros cabeçalhos, os valores são unidos com '.



#### `response.httpVersion`

Um `String` indicando o número da versão do protocolo HTTP. Os valores típicos são '1.0' ou '1.1'. Além disso, `httpVersionMajor` e `httpVersionMinor` são duas propriedades legíveis avaliadas pela Integer que retornam, respectivamente, os números de versão principal e menores.



#### `response.httpVersionMajor`

Um `Integer` indicando o número principal da versão do protocolo HTTP.



#### `response.httpVersionMinor`

Um `Integer` indicando o número de versão menor do protocolo HTTP.
