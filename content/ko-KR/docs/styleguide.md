# Electron 문서 스타일 안내

Electron 문서 작성 지침입니다.

## 제목

* 각 페이지는 상단에 단일 `#` 레벨 제목을 가지고 있어야 합니다.
* 같은 페이지의 챕터는 `##` 레벨 제목을 가지고 있어야 합니다.
* 하위 챕터는 중첩 깊이에 따라 제목에 `#` 의 수를 늘려야 합니다.
* "of" 와 "and" 같은 접속사를 제외한, 페이지 제목의 모든 단어는 대문자로 시작해야 합니다.
* 챕터 제목의 첫 단어만 대문자로 시작해야 합니다.

`시작하기` 를 예로 듭니다:

```markdown
# 시작하기

...

## 주요 프로세스

...

## 렌더러 프로세스

...

## 앱 실행

...

### 배포판으로 실행

...

### 수동으로 내려받은 Electron 바이너리

...
```

API 참조의 경우, 이 규칙에 대한 예외가 있습니다.

## 마크다운 규칙

* 코드 블럭에서 `cmd` 대신 `bash` 를 사용하세요 (구문 강조기로 인해).
* 줄은 80 열로 줄 바꿈 되어야 합니다.
* 2 단계 이상의 중첩 목록은 없습니다 (마크다운 렌더러로 인해).
* 모든 `js` 와 `javascript` 코드 블록은 [standard-markdown](http://npm.im/standard-markdown) 으로 검사합니다.

## 단어 선택

* 결과를 기술 할 때 "would" 보다 "will" 을 사용하세요.
* "on" 보다 "in the ___ process" 를 선호합니다.

## API 참조

다음 규칙은 API 문서에만 적용됩니다.

### 페이지 제목

각 페이지는 `require('electron')` 에 의해 반환 된 실제 객체 이름을 제목으로 사용해야 하며, `BrowserWindow`, `autoUpdater`, `session` 와 같은 것 들이 있습니다.

페이지 제목 아래에는 `>` 로 시작하는 한 줄 짜리 설명이 있어야 합니다.

`session` 을 예로 듭니다:

```markdown
# session

> 브라우저 세션, 쿠키, 캐시, 프록시 설정, 등을 관리 합니다.
```

### Module methods and events

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
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Instance Properties` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]
    

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

Translations of the Electron docs are located within the `docs-translations` directory.

To add another set (or partial set):

* Create a subdirectory named by language abbreviation.
* Translate the files.
* Update the `README.md` within your language directory to link to the files you have translated.
* Add a link to your translation directory on the main Electron [README](https://github.com/electron/electron#documentation-translations).

Note that the files under `docs-translations` must only include the translated ones, the original English files should not be copied there.