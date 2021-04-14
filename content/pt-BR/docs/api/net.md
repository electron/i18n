# net

> Emitir solicitações HTTP/HTTPS usando a biblioteca de rede nativa do Chromium

Processo: [Main](../glossary.md#main-process)

O módulo `net` é uma API do lado do cliente para emitir solicitações HTTP(S). É semelhante ao [módulos de](https://nodejs.org/api/http.html) HTTP e [HTTPS](https://nodejs.org/api/https.html) de Node.js mas usa biblioteca de rede nativa do Chromium em vez da implementação .js Node, oferecendo melhor suporte para proxies web. Ele também suporta verificar o status da rede.

A seguir está uma lista não exaustiva de por que você pode considerar usar o módulo `net` em vez dos módulos .js nó nativo:

* Gerenciamento automático da configuração proxy do sistema, suporte aos arquivos de configuração wpad e proxy pac.
* Túnel automático de solicitações HTTPS.
* Suporte para autenticação de proxies usando esquemas básicos de autenticação, digestão, NTLM, Kerberos ou negociar esquemas de autenticação.
* Suporte para proxies de monitoramento de tráfego: Proxies semelhantes a violinista usados para acesso controle e monitoramento.

Os componentes de API (incluindo classes, métodos, propriedades e nomes de eventos) são semelhantes aos usados em Node.js.

Uso de exemplo:

```javascript
const { app } = require ('electron')
app.whenReady().then(((() => {
  const { net } = require('electron')
  pedido de const = net.request ('https://github.com')
  request.on('response', (resposta) => {
    console.log('STATUS: ${response.statusCode}') console
    .log('HEADERS: ${JSON.stringify(response.headers)}')
    response.on('data', (chunk) => {
      console.log('BODY: ${chunk}')
    })
    response.on('end', () => {
      console.log('Sem mais dados em resposta.')
    })
  })
  request.end()
})
```

A `net` API só pode ser usada após o aplicativo emitir o evento `ready` . Tentar usar o módulo antes do evento `ready` vai dar um erro.

## Métodos

O módulo `net` possui os seguintes métodos:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - As opções de `ClientRequest` construtor.

Retornos [`ClientRequest`](./client-request.md)

Cria uma instância [`ClientRequest`](./client-request.md) utilizando os `options` fornecidos que são encaminhados diretamente para o `ClientRequest` construtor. O método `net.request` seria usado para emitir solicitações de HTTP seguras e inseguras de acordo com o esquema de protocolo especificado no objeto `options` .

### `net.isOnline()`

Retornos `Boolean` - Se existe atualmente conexão com a internet.

Um valor de retorno de `false` é um indicador muito forte de que o usuário não será capaz de se conectar a sites remotos. No entanto, o valor de retorno de `true` é inconclusivo; mesmo que algum link esteja para cima, é incerto se uma determinada tentativa de conexão a um determinado local remoto será bem sucedida.

## Propriedades

### `net.online` _Readonly_

Uma propriedade `Boolean` . Se existe atualmente conexão com a internet.

Um valor de retorno de `false` é um indicador muito forte de que o usuário não será capaz de se conectar a sites remotos. No entanto, o valor de retorno de `true` é inconclusivo; mesmo que algum link esteja para cima, é incerto se uma determinada tentativa de conexão a um determinado local remoto será bem sucedida.
