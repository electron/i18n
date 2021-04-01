---
title: Do nativo ao JavaScript no Electron
author: codebytere
date: '2019-03-19'
---

Como os recursos do Electron escritos em C++ ou Objective-C chegar ao JavaScript, para que estejam disponíveis para um usuário final?

---

## Fundo

[Electron](https://electronjs.org) é uma plataforma JavaScript cujo objetivo principal é abaixar a barreira de entrada para desenvolvedores construírem aplicativos de desktop robustos sem se preocuparem com implementações específicas de plataforma. No entanto, em sua essência, o Electron em si ainda precisa de funcionalidade específica de plataforma para ser escrita em uma determinada linguagem de sistema.

Na realidade, o Electron lida com o código nativo para que você possa se concentrar em uma única API JavaScript.

Mas como é que isso funciona? Como os recursos do Electron escritos em C++ ou Objective-C chegar ao JavaScript, para que estejam disponíveis para um usuário final?

Para rastrear este caminho, vamos começar com o [`aplicativo` módulo](https://electronjs.org/docs/api/app).

Ao abrir o arquivo [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) dentro do diretório `lib/` , você encontrará a seguinte linha de código para o topo:

```js
const binding = process.electronBinding('app')
```

Esta linha aponta diretamente para o mecanismo do Electron para vincular seus módulos C++/Objective-C ao JavaScript para uso por desenvolvedores. Essa função é criada pelo cabeçalho e o arquivo de implementação [](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) para a classe `ElectronBindings`.

## `process.electronBinding`

Estes arquivos adicionam a função `process.electronBinding` , que se comporta como o `process.binding` do Node.js. `process.binding` é uma implementação de nível inferior do Node. o método [`require()`](https://nodejs.org/api/modules.html#modules_require_id) dos s, exceto que permite que os usuários `exijam código nativo` ao invés de outro código escrito em JS. Esta função personalizada de `process.electronBinding` confere a capacidade de carregar código nativo do Electron.

Quando um módulo JavaScript de nível superior (como `app`) requer este código nativo, como é definido e definido o estado desse código nativo? Onde os métodos estão expostos a JavaScript? E as propriedades?

## `companheiro_nativo`

Presentemente, respostas a essa pergunta podem ser encontradas em `native_mate`: um fork da biblioteca [`gin` do Chromium](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) que facilita os tipos de marshal entre C++ e JavaScript.

Dentro do `native_mate/native_mate` há um arquivo de cabeçalho e implementação para `object_template_builder`. É isso que nos permite formar módulos no código nativo, cuja forma está em conformidade com o que os desenvolvedores JavaScript esperariam.

### `mate::ObjectTemplateConstrutor`

Se olharmos para cada módulo Electron como um objeto ``, se torna mais fácil de ver por que queremos usar `object_template_builder` para construí-los. Esta classe é construída sobre uma classe exposta pelo V8, que é um motor de alto desempenho aberto de JavaScript e WebAssembly do Google, escrito em C++. O V8 implementa a especificação JavaScript (ECMAScript), então suas implementações de funcionalidades nativas podem ser diretamente correlacionadas a implementações em JavaScript. Por exemplo, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) nos dá objetos JavaScript sem uma função e protótipo dedicados. Ele usa `Objeto[.prototype]`, e em JavaScript seria equivalente a [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Para ver isso na ação, olhe para o arquivo de implementação do módulo de aplicativo, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). Na parte inferior são os seguintes:

```cpp
mate::ObjectTemplateBuilder(isolar, protótipo->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GPUInfo)
```

Na linha acima, `.SetMethod` é chamado de `mate::ObjectTemplateBuilder`. `. O etMethod` pode ser chamado em qualquer instância da classe `ObjectTemplateBuilder` para definir métodos no [protótipo de objeto](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) em JavaScript, com a seguinte sintaxe:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Este é o equivalente em JavaScript de:

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementação aqui
}
```

Essa classe também contém funções para definir propriedades em um módulo:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

ou

```cpp
.SetProperty("nome_propriedade", &obter_função_para_vincular, &definir_função_para_associar)
```

Eis, por sua vez, as implementações JavaScript do [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

e

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

É possível criar objetos JavaScript formados com protótipos e propriedades como os desenvolvedores esperam, e mais claramente razão sobre funções e propriedades implementadas neste nível inferior de sistema!

A decisão em torno de onde implementar qualquer determinado método de módulo é em si mesmo complexa e frequentemente não determinística, que cobriremos em uma publicação futura.
