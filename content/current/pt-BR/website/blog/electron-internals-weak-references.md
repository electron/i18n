---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

Como uma linguagem com a coleta de lixo, JavaScript libera os usuários de gerenciar recursos manualmente. Mas como o Electron hospeda este ambiente, ele precisa ter muito cuidado para evitar vazamentos de memória e recursos.

Esta postagem introduz o conceito de referências fracas e como elas são usadas para gerenciar recursos no Electron.

---

## Referências fracas

Em JavaScript, sempre que você atribuir um objeto para uma variável, você está adicionando uma referência ao objeto. Enquanto houver uma referência ao objeto, ele será sempre mantido na memória. Once all references to the object are gone, i.e. there are no longer variables storing the object, the JavaScript engine will recoup the memory on next garbage collection.

Uma referência fraca é uma referência a um objeto que permite que você obtenha o objeto sem afetar se ele será coletado ou não. Você também será notificado quando o objeto estiver coletado. Torna-se então possível gerenciar recursos com JavaScript.

Usando a classe `NativeImage` no Electron como exemplo, toda vez que você chamar a classe `nativeImage. reate()` API, uma instância `NativeImage` é retornada e é armazenando a imagem em C++. Uma vez que você for feito com a instância e o motor JavaScript (V8) tiver coletado o objeto, código em C++ será chamado para liberar os dados da imagem na memória, então não há necessidade de usuários gerenciarem manualmente.

Another example is [the window disappearing problem][window-disappearing], which visually shows how the window is garbage collected when all the references to it are gone.

## Testando referências fracas no Electron

Não há nenhuma maneira de testar diretamente referências fracas em JavaScript bruto, já que a linguagem não tem uma maneira de atribuir referências fracas. The only API in JavaScript related to weak references is [WeakMap][WeakMap], but since it only creates weak-reference keys, it is impossible to know when an object has been garbage collected.

Em versões do Electron anteriores à v0.37.8, você pode usar a interna`v8Util. API do Destruetctor` para testar referências fracas, que adiciona uma referência fraca para o objeto passado e chama o callback quando o objeto é coletado no lixo:

```javascript
// Code below can only run on Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util.setDestructor(object, function () {
  console.log('The object is garbage collected')
})

// Remove all references to the object.
object = undefined
// Manually starts a GC.
gc()
// Console prints "The object is garbage collected".
```

Observe que você tem que iniciar o Electron com a função `--js-flags="--expose_gc"` switch para expor a função `gc`.

A API foi removida em versões posteriores porque o V8 na verdade não permite a execução de o código JavaScript no destrutor e em versões posteriores causaria falhas aleatórias.

## Referências fracas no módulo `remoto`

Além de gerenciar recursos nativos com C++, o Electron também precisa de referências fracas para gerenciar recursos JavaScript. An example is Electron's `remote` module, which is a [Remote Procedure Call][remote-procedure-call] (RPC) module that allows using objects in the main process from renderer processes.

Um desafio com o módulo `remoto` é evitar vazamentos de memória. Quando os usuários obtiverem um objeto remoto no processo de renderização, o `módulo` remoto deve garantir que o objeto continue a ser publicado no processo principal até que as referências no processo de renderização sejam perdidas. Adicionalmente, também tem que garantir que o objeto possa ser coletado de lixo quando não há mais referência a ele em processos de renderização.

Por exemplo, sem a implementação adequada, o seguinte código causaria vazamentos de memória rapidamente:

```javascript
const {remote} = require('electron')

para (let i = 0; i < 10000; +i) {
  remote.nativeImage.createEmpty()
}
```

O gerenciamento de recursos no módulo `remoto` é simples. Sempre que um objeto é solicitado, uma mensagem é enviada para o processo principal e o Electron irá armazenar o objeto em um mapa e atribuir um ID para ele, em seguida, envie o ID de volta para o processo de renderização . No processo de renderização o módulo `remoto` receberá o ID e encapsula com um objeto proxy e quando o objeto proxy for lixo coletado, uma mensagem será enviada para o processo principal para liberar o objeto.

Usando `remote.require` API como exemplo, uma implementação simplificada é como esta:

```javascript
remote.require = function (name) {
  // Diga ao processo principal para retornar os metadados do módulo.
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // Crie um objeto proxy.
  const object = metaToValue(meta)
  // Diga ao processo principal para liberar o objeto quando o objeto proxy é garbage
  // coletado.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return objeto
}
```

No processo main:

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Adicione uma referência ao objeto.
  map[++id] = object
  // Converter objeto em metadados.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (evento, id) {
  delete map[id]
})
```

## Mapas com valores fracos

Com a implementação simples anterior, cada chamada no módulo `remoto` irá retornar um novo objeto remoto do processo principal, e cada objeto remoto representa uma referência ao objeto no processo principal.

O design em si está bom, mas o problema é que há várias chamadas para receber o mesmo objeto, vários objetos de proxy serão criados e para objetos complicados isto pode adicionar enorme pressão no uso de memória e coleta de lixo .

Por exemplo, o seguinte código:

```javascript
const {remote} = require('electron')

para (let i = 0; i < 10000; +i) {
  remote.getCurrentWindow()
}
```

Ele primeiro usa muita memória criando objetos de proxy e, em seguida, ocupa a CPU (Central Processing Unit) para lixeira coletando-os e enviando mensagens IPC .

Uma otimização óbvia é armazenar em cache os objetos remotos: quando já existe um objeto remoto com o mesmo ID, o objeto remoto anterior será retornado em vez de criar um novo.

Isso não é possível com a API no núcleo do JavaScript. Using the normal map to cache objects will prevent V8 from garbage collecting the objects, while the [WeakMap][WeakMap] class can only use objects as weak keys.

Para resolver isso, um tipo de mapa com valores como referências fracas é adicionado, o que é perfeito para armazenar em cache objetos com IDs. Agora o `remote.require` se parece com isto:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Diga ao processo principal para retornar os meta dados do módulo.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Observe que o `remoteObjectCache` armazena objetos como referências fracas, então não há necessidade de excluir a chave quando o objeto é coletado de lixo.

## Código nativo

Para pessoas interessadas no código C++ de referências fracas no Electron, pode ser encontrado nos seguintes arquivos:

API `setDestructor`:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

A API `createIDWeakMap`:

* [`tecla_fraco_mapa.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`átomo_api_fraco_mapa_fraca`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

[window-disappearing]: https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes
[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[remote-procedure-call]: https://en.wikipedia.org/wiki/Remote_procedure_call

