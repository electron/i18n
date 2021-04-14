# globalShortcut

> Detecta eventos de teclado quando o aplicativo não tiver o foco do teclado.

Processo: [Main](../glossary.md#main-process)

O módulo `globalShortcut` pode registrar/cancelar o registro de um atalho de teclado global com o sistema operativo que você possa personalizar as operações para os vários atalhos.

** Nota:** O atalho é global; Isso funcionará mesmo se o aplicativo não tenha o foco do teclado. Este módulo não pode ser usado antes que o `ready` evento do módulo do aplicativo seja emitido.

```javascript
const { app, globalShortcut } = require ('electron')

app.whenReady().then(((( (() => {
  // Registre um ouvinte de atalho 'CommandOrControl+X'.
  const ret = globalShortcut.register ('CommandOrControl+X', () => {
    console.log('CommandOrControl+X é pressionado')
  })

  se (!ret) { console
    .log ('falha no registro')
  }

  // Verifique se um atalho está registrado.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Unregister a short atalho.
  globalShortcut.unregister ('CommandOrControl+X')

  // Não registrador todos os atalhos.
  globalShortcut.não-registroAll()
})
```

## Métodos

O módulo `globalShortcut` tem os seguintes métodos:

### `globalShortcut.register (acelerador, retorno de chamada)`

* `accelerator` [acelerador](accelerator.md)a
* `callback` Function

Devoluções `Boolean` - Se o atalho foi registrado com sucesso.

Registra um atalho global de `accelerator`. O `callback` é chamado quando o atalho registrado é pressionado pelo usuário.

Quando o acelerador já está sendo utilizado por outras aplicações, esta chamada falhará silenciosamente. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

Os seguintes aceleradores não serão registrados com sucesso no macOS 10.14 Mojave, a menos que o aplicativo tenha sido autorizado como um cliente de acessibilidade [confiável](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Reprodução/Pausa da Mídia"
* "Media Next Track"
* "Faixa anterior da mídia"
* "Media Stop"

### `globalShortcut.registerAll (aceleradores, retorno de chamada)`

* `accelerators` String[] - uma matriz de</a>acelerador

s.</li> 
  
  * `callback` Function</ul> 

Registra um atalho global de todos os itens `accelerator` em `accelerators`. O `callback` é chamado quando qualquer um dos atalhos registrados é pressionado pelo usuário.

Quando um determinado acelerador já é tomado por outros aplicativos, esta chamada falhará silenciosamente. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.

Os seguintes aceleradores não serão registrados com sucesso no macOS 10.14 Mojave, a menos que o aplicativo tenha sido autorizado como um cliente de acessibilidade [confiável](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Reprodução/Pausa da Mídia"
* "Media Next Track"
* "Faixa anterior da mídia"
* "Media Stop"



### `globalShortcut.isRegistered(acelerador)`

* `accelerator` [acelerador](accelerator.md)a

Retorna `Boolean` - Se esta aplicação registrou o `accelerator`.

Quando o acelerador já está sendo utilizado por outras aplicações, esta ainda retorna `false`. Este comportamento é pretendido pelos sistemas operacionais, uma vez que eles não querem que os aplicativos lutem por atalhos globais.



### `globalShortcut.unregister(acelerador)`

* `accelerator` [acelerador](accelerator.md)a

Não registra o atalho global de `accelerator`.



### `globalShortcut.não-registroAll()`

Não registra todos os atalhos globais.
