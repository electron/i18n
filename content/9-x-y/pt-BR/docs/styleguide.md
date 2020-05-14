# Guia de estilo de Documentação do Electron

Estas são as diretrizes para escrever a documentação do Electron.

## Títulos

* Cada página deve ter um único `#` no nível de título na parte superior.
* Capítulos na mesma página devem ter `##` títulos de nível.
* Subcapítulos precisam de aumentar o número de `#` no título de acordo com sua profundidade de aninhamento.
* Todas as palavras no títulos da página devem estar em letras maiúsculas, exceto conjunções como "de" e "e".
* Somente a primeira palavra de um capítulo deve estar em letra maiúscula.

Usado o `Inicio Rápido` como exemplo:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

Para referencias à API, existem exceções a está regra.

## Funcionalidades Markdown

* Use `sh` ao invés de `cmd` nos blocos de código (devido ao destaque de sintaxe).
* Linhas devem ser quebradas em 80 colunas.
* No nesting lists more than 2 levels (due to the markdown renderer).
* All `js` and `javascript` code blocks are linted with [standard-markdown](http://npm.im/standard-markdown).

## Picking words

* Use "will" over "would" when describing outcomes.
* Prefer "in the ___ process" over "on".

## Referências da API

The following rules only apply to the documentation of APIs.

### Título da página

Cada página deve usar o nome do objeto real retornado por `require('electron')` como título, tais como `BrowserWindow`, `AutoUpdater`, e `session`.

Under the page title must be a one-line description starting with `>`.

Usando `session` como exemplo:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Métodos e eventos de módulo

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Using `autoUpdater` as an example:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classes

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Constructors must be listed with `###`-level titles.
* [Métodos estáticos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) devem ser listados sob um capítulo `### Métodos estáticos`.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Los Eventos de Instancia deben aparecer listados bajo un capítulo de `### Eventos de Instancia`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Propriedades da instância devem começar com "A [Tipo de Propriedade]..."

Usando as classes `Session` e `Cookies` como exemplo:

```markdown
# session

## Métodos

### session.fromPartition(partition)

## Propriedades Estáticas

### session.defaultSession

## Classe: Session

### Eventos de Instância

#### Event: 'will-download'

### Métodos de Instância

#### `ses.getCacheSize()`

### Propriedades de Instância

#### `ses.cookies`

## Classe: Cookies

### Métodos de Instância

#### `cookies.get(filter, callback)`
```

### Métodos

O capítulo de métodos deve estar no seguinte formato:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

O título pode ser `###` ou `###`-levels dependendo do caso de ser um método de um módulo ou de uma classe.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Por exemplo, os métodos da classe `Session` sob o módulo `session` usa `ses` como `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
obrigatório[, opcional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Número`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Booleano`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Eventos

O capítulo de eventos deve estar na seguinte forma:

```markdown
### Evento: 'wake-up'

Retorno:

* `time` String

...
```

O título pode ser `###` ou `####`-níveis, dependendo se se trata de um evento de módulo ou classe.

Os argumentos de um evento seguem as mesmas regras e métodos.

### Propriedades

O capítulo de propriedades deve estar no seguinte formulário:

```markdown
### session.defaultsession

...
```

O título pode ser `###` ou `####`-níveis, dependendo se é uma propriedade de um módulo ou uma classe.

## Traduções da documentação

Veja [electron/i18n](https://github.com/electron/i18n#readme)
