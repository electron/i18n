# contextBridge

> Crie uma ponte segura, bidirecional e síncronenta em contextos isolados

Processo: [Renderizador](../glossary.md#renderer-process)

Um exemplo de expor uma API a um renderizador de um script de pré-carga isolado é dado abaixo:

```javascript
Preload (Isolated World)
const { contextBridge, ipcRenderer } = require ('electron')

contextBridge.exposeInMainWorld(
  'elétron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
```

```javascript
Renderer (Main World)

window.electron.doThing()
```

## Glossário

### Mundo Principal

O "Mundo Principal" é o contexto JavaScript em que seu código principal de renderização é executado. Por padrão, a página que você carrega em seu renderer executa código neste mundo.

### Mundo Isolado

When `contextIsolation` is enabled in your `webPreferences` (this is the default behavior since Electron 12.0.0), your `preload` scripts run in an "Isolated World".  Você pode ler mais sobre o isolamento do contexto e o que ele afeta no [](../tutorial/security.md#3-enable-context-isolation-for-remote-content) os documentos de segurança.

## Métodos

O módulo `contextBridge` tem os seguintes métodos:

### </em>Experimental `contextBridge.exposeInMainWorld(apiKey, api)` _</h3>

* `apiKey` String - A chave para injetar a API no `window` .  A API estará acessível em `window[apiKey]`.
* `api` qualquer - Sua API, mais informações sobre o que esta API pode ser e como ela funciona está disponível abaixo.

## Usando

### API

O `api` fornecido ao [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) deve ser um `Function`, `String`, `Number`, `Array`, `Boolean`, ou um objeto cujas chaves são cordas e valores são uma `Function`, `String`, `Number`, `Array`, `Boolean`, ou outro objeto aninhado que atenda às mesmas condições.

`Function` valores são proxiados ao outro contexto e todos os outros valores são **copiados** e ****congelados . Quaisquer dados / primitivos enviados a API se tornam imutáveis e as atualizações em ambos os lados da ponte não resultam em uma atualização do outro lado.

Um exemplo de uma API complexa é mostrado abaixo:

```javascript
const { contextBridge } = require ('electron')

contextBridge.exposeInMainWorld(
  'elétron',
  {
    doThing: () => ipcRenderer.send('do-a-thing'),
    myPromises: [Promise.resolve(), Promise.reject(('whoops')],
    anAsyncFunction: async () => 123,
    dados: {
      myFlags: ['a', 'b', 'c'],
      bootTime: 1234
    },
    aninhadoAPI: {
      ainda mais profundo: {
        youCanDoThisAsMuchAsYouWant: {
          fn: () => ({
            returnData: 123
          })
        }
      }


}
```

### Funções de API

`Function` valores que você vincula através da `contextBridge` são proxied através de Elétron para garantir que os contextos permaneçam isolados.  Este resulta em algumas limitações-chave que delineamos abaixo.

#### Suporte ao parâmetro / Erro / Tipo de Retorno

Como parâmetros, erros e valores de devolução são **copiados** quando são enviados sobre a ponte, existem apenas certos tipos que podem ser usados. Em alto nível, se o tipo que você deseja usar pode ser serializado e deserializado no mesmo objeto, funcionará.  Uma tabela de suporte tipo foi incluída abaixo para a completude:

| Tipo                                                                                                           | Complexidade | Suporte a parâmetros | Suporte ao valor de retorno | Limitações                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------- | ------------ | -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                       | Simples      | ✅                    | ✅                           | N/A                                                                                                                                                                                                                                             |
| `Número`                                                                                                       | Simples      | ✅                    | ✅                           | N/A                                                                                                                                                                                                                                             |
| `Booleano`                                                                                                     | Simples      | ✅                    | ✅                           | N/A                                                                                                                                                                                                                                             |
| `Object`                                                                                                       | Complexo     | ✅                    | ✅                           | As chaves devem ser suportadas usando apenas tipos "Simples" nesta tabela.  Os valores devem ser suportados nesta tabela.  As modificações do protótipo são descartadas.  O envio de aulas personalizadas copiará valores, mas não o protótipo. |
| `Array`                                                                                                        | Complexo     | ✅                    | ✅                           | As mesmas limitações do tipo `Object`                                                                                                                                                                                                           |
| `Erro`                                                                                                         | Complexo     | ✅                    | ✅                           | Erros que são jogados também são copiados, isso pode resultar na mensagem e empilhar traços do erro mudando ligeiramente devido ao ser jogado em um contexto diferente                                                                          |
| `Prometo`                                                                                                      | Complexo     | ✅                    | ✅                           | As promessas só são proxiadas se forem o valor de retorno ou parâmetro exato.  Promessas aninhadas em matrizes ou objetos serão descartadas.                                                                                                    |
| `Function`                                                                                                     | Complexo     | ✅                    | ✅                           | As modificações do protótipo são descartadas.  Enviar aulas ou construtores não funcionará.                                                                                                                                                     |
| [Tipos clonáveis](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Simples      | ✅                    | ✅                           | Veja o documento vinculado em tipos clonáveis                                                                                                                                                                                                   |
| `Símbolo`                                                                                                      | N/A          | ❌                    | ❌                           | Símbolos não podem ser copiados em contextos para que sejam descartados                                                                                                                                                                         |

Se o tipo que você se importa não está na tabela acima, provavelmente não é suportado.

### Exposing Node Global Symbols

The `contextBridge` can be used by the preload script to give your renderer access to Node APIs. The table of supported types described above also applies to Node APIs that you expose through `contextBridge`. Please note that many Node APIs grant access to local system resources. Be very cautious about which globals and APIs you expose to untrusted remote content.

```javascript
const { contextBridge } = require('electron')
const crypto = require('crypto')
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum (data) {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
  }
})
```
