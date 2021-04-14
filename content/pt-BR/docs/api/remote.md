# remote

> Use os principais módulos de processo do processo renderizador.

Processo: [Renderizador](../glossary.md#renderer-process)

> ⚠️ ⚠️ DE AVISO O módulo `remote` é [](https://github.com/electron/electron/issues/21408)preterido. Em vez de `remote`, use [`ipcRenderer`](ipc-renderer.md) e [`ipcMain`](ipc-main.md).
> 
> Leia mais sobre por que o módulo `remote` é preterido [aqui](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).
> 
> Se você ainda quiser usar `remote` apesar das preocupações de de desempenho e segurança, consulte</a>@electron/remoto .</p> </blockquote> 
> 
> O módulo `remote` fornece uma maneira simples de realizar o IPC (comunicação entre processsos) entre o processo renderizador (página web) e o processo principal.
> 
> No Electron, módulos relacionados com GUI (como `dialog`, `menu` etc.) são disponibilizados somente no processo principal, não no processo renderizador. Para usá-los, o módulo `ipc` do processo renderizador é necessário para enviar mensagens interprocessuais para o processo principal. Com o módulo `remote` , você pode invocar métodos do objeto de processo principal sem enviar mensagens interprocessas explicitamente, semelhante ao</a>RMI de Java . Um exemplo de criação de uma janela de navegador a partir de um processo de renderização :</p> 
> 
> ```javascript
const { BrowserWindow } = require ('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL ('https://github.com')
```

**Nota:** Para o inverso (acesse o processo de renderização a partir do processo principal), você pode usar [webContents.executeJavaScript](web-contents.md#contentsexecutejavascriptcode-usergesture).

**Nota:** O módulo remoto pode ser desativado por razões de segurança nos seguintes contextos:

- [`BrowserWindow`](browser-window.md) - definindo a opção `enableRemoteModule` para `false`.
- [`<webview>`](webview-tag.md) - definindo o atributo `enableremotemodule` para `false`.

## Objetos remotos

Cada objeto (incluindo funções) retornado pelo módulo `remote` representa um objeto no processo principal (chamamos de objeto remoto ou função remota). Quando você invoca métodos de um objeto remoto, chame uma função remota ou crie um novo objeto com o construtor remoto (função), você está realmente enviando mensagens interprocessas síncronsas .

No exemplo acima, tanto [`BrowserWindow`](browser-window.md) quanto `win` eram objetos remotos e `new BrowserWindow` não criaram um objeto `BrowserWindow` no processo de renderização . Em vez disso, criou um objeto `BrowserWindow` no processo principal e devolveu o objeto remoto correspondente no processo de renderização, ou seja, o objeto `win` .

**Nota:** Apenas [propriedades enumeráveis][enumerable-properties] que estão presentes quando o objeto remoto é referenciado pela primeira vez são acessíveis via controle remoto.

**Nota:** Arrays e Buffers são copiados sobre iPC quando acessados através do módulo `remote` . Modificá-los no processo renderizador não os modifica no processo principal e vice-versa.

## Vida útil de objetos remotos

O elétron garante que, enquanto o objeto remoto no processo de renderização vidas (ou seja, não tenha sido coletado lixo), o objeto correspondente no processo principal não será liberado. Quando o objeto remoto tiver sido lixo coletado, o objeto correspondente no processo principal será dereferenciado.

Se o objeto remoto for vazado no processo renderizador (por exemplo, armazenado em um mapa, mas nunca liberado), o objeto correspondente no processo principal também será vazado, então você deve ter muito cuidado para não vazar objetos remotos.

Os tipos de valor primário, como strings e números, no entanto, são enviados por cópia.

## Passando retornos de chamadas para o processo principal

O código no processo principal pode aceitar retornos de chamada do renderizador - por exemplo, o módulo `remote` - mas você deve ser extremamente cuidadoso ao usar este recurso .

Primeiro, a fim de evitar impasses, os retornos de chamadas passados para o processo principal são chamados assincronicamente. Você não deve esperar que o processo principal obter o valor de retorno dos retornos dos retornos.

Por exemplo, você não pode usar uma função do processo renderizador em uma `Array.map` chamada no processo principal:

```javascript
mapa principal do processoNumers.js
exportações.withRendererCallback = (mapper) => {
  retorno [1, 2, 3].map(mapper)
}

exportações.comLocalCallback = () => {
  retorno [1, 2, 3].map(x => x + 1)
}
```

```javascript
processo renderizador
mapa constNumbers = require ('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const comLocalCb = mapNumbers.withLocalCallback()

console.log(comRendererCb, comLocalCb)
// [indefinida, indefinidos, indefinidos], [2, 3, 4]
```

Como você pode ver, o valor síncronente de retorno do renderer callback não era tão esperado, e não correspondia ao valor de retorno de um retorno idêntico que vive no processo principal.

Em segundo lugar, os retornos de chamadas passados para o processo principal persistirão até que o principal processo de coleta de lixo.

Por exemplo, o seguinte código parece inocente à primeira vista. Ele instala um retorno de chamada para o evento `close` em um objeto remoto:

```javascript
requer ('electron').remote.getCurrentWindow().on('close', () => {
  // janela foi fechada...
})
```

Mas lembre-se que o retorno de chamada é referenciado pelo processo principal até que você explicitamente desinstalá-lo. Se não o fizer, cada vez que você recarregar sua janela, o retorno de chamada será instalado novamente, vazando um retorno de chamada para cada reinicialização.

Para piorar as coisas, uma vez que o contexto de retornos de chamadas previamente instalados foi divulgado, exceções serão levantadas no processo principal quando o evento `close` for emitido.

Para evitar esse problema, certifique-se de limpar quaisquer referências aos retornos de chamadas renderizados passado para o processo principal. Isso envolve limpar os manipuladores de eventos, ou garantir que o processo principal seja explicitamente instruído a desreferir retornos de chamadas que vieram de um processo de renderização que está saindo.

## Acessando módulos incorporados no processo principal

Os módulos incorporados no processo principal são adicionados como getters no módulo `remote` , para que você possa usá-los diretamente como o módulo `electron` .

```javascript
aplicativo const = exigir ('elétron').console remoto.app
.log(app)
```

## Métodos

O módulo `remote` tem os seguintes métodos:

### `remote.getCurrentWindow()`

Retornos [`BrowserWindow`](browser-window.md) - A janela a que esta página pertence.

**Nota:** Não utilize `removeAllListeners` no [`BrowserWindow`](browser-window.md). O uso disso pode remover todos os [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) ouvintes, desativar eventos de cliques em botões de barra de toque e outras consequências não intencionais .

### `remote.getCurrentWebContents()`

Retornos [`WebContents`](web-contents.md) - O conteúdo da web desta página.

### `remote.getGlobal(name)`

* `name` String

Retornos `any` - A variável global de `name` (por exemplo. `global[name]`) no processo principal .

## Propriedades

### `remoto.necessário`

Uma função `NodeJS.Require` equivalente a `require(module)` no processo principal. Os módulos especificados por seu caminho relativo se resolverão em relação ao ponto de entrada do processo principal.

ex.

```sh

principal
│ (índice foo.js
│ └-─➤ .js
.js ).➤ pacote.json
└%.➤ renderer
    └%.➤ índice.js
```

```js
principal processo: principal/índice.js
const { app } = require ('electron')
app.whenReady().then((() => { /* ... */ })
```

```js
algum módulo relativo: principal/foo.js
módulo.exports = 'bar'
```

```js
processo renderer: renderer/index.js
const foo = require ('electron').remote.require('./foo') // bar
```

### `remote.process` _Readonly_

Um objeto `NodeJS.Process` .  O objeto `process` no processo principal. Isso é o mesmo que `remote.getGlobal('process')` mas é armazenado em cache.

[enumerable-properties]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
