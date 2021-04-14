## Classe: ServiceWorkers

> Consulte e receba eventos de uma sessão de trabalhadores ativos.

Processo: [Main](../glossary.md#main-process)

As instâncias da classe `ServiceWorkers` são acessadas usando `serviceWorkers` propriedade de um `Session`.

Como por exemplo:

```javascript
const { session } = requer ('elétron')

// Obter todos os trabalhadores do serviço.
console.log (session.defaultSession.serviceWorkers.getAllRunning())

// Alçar registros e obter informações do funcionário do serviço
session.defaultSession.serviceWorkers.on('console-message', (evento, mensagemDe detalhes) => {
  console.log(
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersionID(messageDetails.versionId)
  )
})
```

### Eventos de instância

Os seguintes eventos estão disponíveis em instâncias de `ServiceWorkers`:

#### Evento: 'console-message'

Retorna:

* `event` Event
* `messageDetails` Objeto - Informações sobre a mensagem do console
  * `message` String - A mensagem real do console
  * número `versionId` - O ID de versão do trabalhador do serviço que enviou a mensagem de registro
  * `source` String - O tipo de fonte para esta mensagem.  Podem ser `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` ou `other`.
  * `level` Número - O nível de registro, de 0 a 3. Para que corresponda a `verbose`, `info`, `warning` e `error`.
  * `sourceUrl` String - A URL de onde a mensagem veio
  * `lineNumber` Número - O número de linha da fonte que acionou esta mensagem de console

Emitido quando um funcionário de serviço registra algo no console.

### Métodos de Instância

Os seguintes métodos estão disponíveis em instâncias de `ServiceWorkers`:

#### `serviceWorkers.getAllRunning()`

Devoluções `Record<Number, ServiceWorkerInfo>` - Um [ServiceWorkerInfo](structures/service-worker-info.md) objeto onde as chaves são o ID da versão do trabalhador do serviço e os valores são as informações sobre esse trabalhador do serviço.

#### `serviceWorkers.getFromVersionID(versãoId)`

* Número de `versionId`

Devoluções [`ServiceWorkerInfo`](structures/service-worker-info.md) - Informações sobre este trabalhador de serviço

Se o trabalhador do serviço não existir ou não estiver executando este método, será exceção.
