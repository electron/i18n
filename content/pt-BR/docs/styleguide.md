# Guia de estilo de Documentação do Electron

Estas são as diretrizes para escrever a documentação do Electron.

## Títulos

* Cada página deve ter um único `#` no nível de título na parte superior.
* Chapters in the same page must have `##`-level headings.
* Sub-chapters need to increase the number of `#` in the heading according to their nesting depth.
* The page's title must follow [APA title case][title-case].
* All chapters must follow [APA sentence case][sentence-case].

Usado o `Inicio Rápido` como exemplo:

```markdown
# Início rápido

...

## Processo principal

...

## Processo de renderização

...

## Execute seu aplicativo

...

### Executar como um

 de distribuição...

### Binário do Electron baixado manualmente

...
```

Para referencias à API, existem exceções a está regra.

## Funcionalidades Markdown

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* Use `sh` ao invés de `cmd` nos blocos de código (devido ao destaque de sintaxe).
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* No nesting lists more than 2 levels (due to the markdown renderer).
* All `js` and `javascript` code blocks are linted with [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* For unordered lists, use asterisks instead of dashes.

## Picking words

* Use "will" over "would" when describing outcomes.
* Prefer "in the ___ process" over "on".

## Referências da API

The following rules only apply to the documentation of APIs.

### Title and description

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

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
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Los Eventos de Instancia deben aparecer listados bajo un capítulo de `### Eventos de Instancia`.
* As Propriedades da Instância devem ser listadas abaixo de um `### Propriedades de Instância` capítulo.
  * Instance Properties must start with "A [Property Type] ..."

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

### Methods and their arguments

O capítulo de métodos deve estar no seguinte formato:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - Uma descrição de parâmetro.
* `optional` Integer (opcional) - Outra descrição do parâmetro.

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Por exemplo, os métodos da classe `Session` sob o módulo `session` usa `ses` como `objectName`.

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
obrigatório[, opcional]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

#### Platform-specific functionality

Se um argumento ou um método for exclusivo para determinadas plataformas, essas plataformas são denotadas usando uma lista itálica delimitada pelo espaço seguindo o tipo de dados. Os valores podem ser `macOS`, `Windows` ou `Linux`.

```markdown
* 'animar' Boolean (opcional) _macOS_ _Windows_ - Animar a coisa.
```

### Eventos

O capítulo de eventos deve estar na seguinte forma:

```markdown
### Evento: 'wake-up'

Retorno:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

Os argumentos de um evento seguem as mesmas regras e métodos.

### Propriedades

O capítulo de propriedades deve estar no seguinte formulário:

```markdown
### session.defaultsession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

Veja [electron/i18n](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
