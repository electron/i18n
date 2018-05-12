# Electron 문서 스타일 안내

Electron 문서 작성 가이드입니다.

## 제목

* 각 페이지는 상단에 하나의 `#`-단계의 제목을 사용해야 합니다.
* 같은 페이지의 챕터는 `##`-단계의 제목을 사용해야 합니다.
* 하위 챕터는 포함 단계에따라 제목에 `#` 의 수를 증가시켜야 합니다.
* "of" 와 "and" 같은 접속사를 제외한, 페이지 제목의 모든 단어는 대문자로 시작해야 합니다.
* 챕터 제목의 첫 단어만 대문자로 시작해야 합니다.

`Quick Start` 를 예로 듭니다:

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

API 참고문서에는, 이 규칙에 대한 예외가 있습니다.

## 마크다운 규칙

* 코드 블럭에서 `cmd` 대신 `sh` 를 사용하세요 (문법 강조기 때문입니다.)
* 한줄은 영문 80 자 길이로 맞춰야 합니다.
* 2단계를 넘는 중첩 목록은 사용하면 안됩니다. (마크다운 렌더러 때문입니다.)
* 모든 `js` 와 `javascript` 코드 블럭들은 [표준-마크다운](http://npm.im/standard-markdown)에 의해 분석됩니다.

## 단어 선택

* 결과를 설명할 때 "would" 대신 "will" 을 사용합니다.
* "on" 대신 "in the ___ process" 표현을 지향합니다. 

## API 참조

다음 규칙은 API 문서에만 적용됩니다.

### 페이지 제목

각 페이지는 `BrowserWindow`, `autoUpdater`, `session` 와 같은 `require('electron')` 에 의해 반환되는 실 객체의 이름을 제목으로 사용해야 합니다.

페이지 제목 아래에는 `>` 로 시작하는 한 줄 짜리 설명이 있어야 합니다.

`session` 사용 예시:

```markdown
# session

> 브라우저 세션, 쿠키, 캐시, 프록시 설정, 등을 관리.
```

### 모듈 메소드 및 이벤트

클래스가 아닌 모듈에서 메소드 및 이벤트는 `## Methods` 와 `## Events` 챕터에 있어야 합니다.

`autoUpdater` 사용 예시:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### 클래스

* API 클래스와 모듈 클래스는 `## Class: TheClassName` 챕터 아래에 표시합니다.
* 한 페이지에 여러 개의 클래스가 있을 수 있습니다.
* 생성자는 `###` 레벨 제목으로 나열되야 합니다.
* [정적 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)는 `### Statis Methods` 챕터 아래에 표시합니다.
* [인스턴스 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods)는 `### Instance Methods` 챕터 아래에 표시합니다.
* 반환 값이 있는 모든 메소드는 "반환값 `[TYPE]` - 반환 값 설명" 형태의 설명으로 시작해야 합니다. 
  * 메소드가 `Object` 를 반환하면, 끝에 콜론을 붙인 뒤 다음줄부터 함수 매개변수와 같은 스타일로 순서에 상관없이 그 구조를 명시해야 합니다.
* 인스턴스 이벤트는 `### Instance Events` 챕터 아래에 표시합니다.
* 인스턴스 이벤트는 `### Instance Properties` 챕터 아래에 표시합니다. 
  * 인스턴스 속성은 "[속성 유형] ..." 으로 시작해야 합니다.

`Session` 과 `Cookies` 클래스 사용 예시:

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

### 메소드

메소드장은 반드시 다음의 형식을 따라야 합니다.

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - 파라미터 설명.
* `optional` Integer (optional) - 다른 파라미터 설명.

...
```

제목은 `###` 혹은 `####`-단계로 합니다. 모듈이냐 클래스냐에 따라 달라집니다.

모듈의 경우, `objectName`은 모듈의 이름입니다. 클래스의 경우, 클래스의 인스턴스 이름이어야 하며, 모듈의 이름과 달라야합니다.

예를 들어, `session` 모듈의 `Session`클래스의 메소드는 `objectName` 으로 `ses`를 사용해야 합니다.

선택적인 인수는 각각을 컴마로 구분하여 대괄호 `[]` 로 감쌉니다:

```sh
필수[, 선택]
```

아래 메소드에 각 인수에 대한 더 자세한 내용이 있습니다. 인수의 유형은 기본 유형 중 하나로 표시합니다.

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* •또는 Electron 의 [`WebContent`](api/web-contents.md)와 같은 사용자 타입

인수 또는 메소드가 특정 플랫폼에만 사용된다면, 이 플랫폼들은 자료형 다음에 공백으로 구분된 이탤릭체 목록으로 표시됩니다. 값은 <0>macOS</0>, <0>windows</0>, 또는 <0>Linux</0> 일 수 있습니다. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` 유형의 인수는 배열이 무엇을 포함하는지 아래에 명시해야 합니다.

`Function` 유형의 인수를 위한 설명은 호출방법을 명확히 하고, 전달되는 매개변수의 유형을 표시해야 합니다.

### Events

이벤트 챕터는 다음을 따릅니다:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

제목은 `###` 또는 `####`-단계로 합니다. 모듈이냐 클래스냐에 따라 달라집니다.

이벤트의 인수는 메소드와 같은 규칙을 따릅니다.

### 속성

속성 챕터는 다음을 따릅니다:

```markdown
### session.defaultSession

...
```

제목은 `###` 또는 `####`-단계로 합니다. 모듈이냐 클래스냐에 따라 달라집니다.

## 문서 번역

[electron/i18n](https://github.com/electron/i18n#readme) 을 참조하세요.