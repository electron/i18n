# Electron 문서 스타일 안내

Electron 문서 작성 지침입니다.

## 제목

* 각 페이지는 상단에 단일 `#` 레벨 제목을 가지고 있어야 합니다.
* 같은 페이지의 챕터는 `##` 레벨 제목을 가지고 있어야 합니다.
* 하위 챕터는 중첩 깊이에 따라 제목에 `#` 의 수를 늘려야 합니다.
* "of" 와 "and" 같은 접속사를 제외한, 페이지 제목의 모든 단어는 대문자로
  시작해야 합니다.
* 챕터 제목의 첫 단어만 대문자로 시작해야 합니다.

`빠른 시작` 을 예로 듭니다:

```markdown
# 빠른 시작

...

## 주 프로세스

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
* 모든 `js` 와 `javascript` 코드 블록은
  [standard-markdown](http://npm.im/standard-markdown) 으로 검사합니다.

## 단어 선택

* 결과를 기술 할 때 "would" 보다 "will" 을 사용하세요.
* "on" 보다 "in the ___ process" 를 선호합니다.

## API 참조

다음 규칙은 API 문서에만 적용됩니다.

### 페이지 제목

각 페이지는 `require('electron')` 에 의해 반환 된 실제 객체 이름을 제목으로
사용해야 하며, `BrowserWindow`, `autoUpdater`, `session` 와 같은 것 들이
있습니다.

페이지 제목 아래에는 `>` 로 시작하는 한 줄 짜리 설명이 있어야 합니다.

`session` 을 예로 듭니다:

```markdown
# session

> 브라우저 세션, 쿠키, 캐시, 프록시 설정, 등을 관리 합니다.
```

### 모듈 메소드 및 이벤트

클래스가 아닌 모듈의 경우, 메소드 및 이벤트는 `## 메소드` 와 `## 이벤트` 장
아래에 나열해야 합니다.

`autoUpdater` 을 예로 듭니다:

```markdown
# autoUpdater

## 이벤트

### 이벤트: 'error'

## 메소드

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### 클래스

* API 클래스 또는 모듈의 일부인 클래스는 `## 클래스: TheClassName` 장 아래에
  나열되야 합니다.
* 한 페이지에 여러 개의 클래스가 있을 수 있습니다.
* 생성자는 `###` 레벨 제목으로 나열되야 합니다.
* [정적 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
  는 `### 정적 메소드` 장 아래에 나열되야 합니다.
* [인스턴스 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods)
  는 `### 인스턴스 메소드` 장 아래에 나열되야 합니다.
* 반환 값이 있는 모든 메소드는 "반환값 `[유형]` - 반환 값 설명" 으로 설명을
  시작해야 합니다.
  * 메소드가 `객체` 를 반환하면, 그 구조는 콜론과 개행 문자 다음에 함수 매개
    변수와 같은 방식으로 된 정렬되지 않은 속성의 목록으로 지정할 수 있습니다.
* 인스턴스 이벤트는 `### 인스턴스 이벤트` 장 아래에 나열되야 합니다.
* 인스턴스 속성은 `### 인스턴스 속성` 장 아래에 나열되야 합니다.
  * 인스턴스 속성은 "[속성 유형] ..." 으로 시작해야 합니다.

`Session` 과 `Cookies` 클래스를 예로 듭니다:

```markdown
# session

## 메소드

### session.fromPartition(partition)

## 속성

### session.defaultSession

## 클래스: Session

### 인스턴스 이벤트

#### Event: 'will-download'

### 인스턴스 메소드

#### `ses.getCacheSize(callback)`

### 인스턴스 속성

#### `ses.cookies`

## 클래스: Cookies

### 인스턴스 메소드

#### `cookies.get(filter, callback)`
```

### 메소드

메소드 장은 다음 형식이어야 합니다:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - 매개 변수 설명.
* `optional` Integer (선택) - 다른 매개 변수 설명.

...
```

제목은 모듈의 메소드인지 클래스의 메소드인지에 따라 `###` 또는 `####` 레벨일 수
있습니다.

모듈의 경우, `objectName` 은 모듈의 이름입니다. 클래스의 경우, 클래스의
인스턴스의 이름이며 모듈의 이름과 같으면 안됩니다.

예를 들어, `session` 모듈의 `Session` 클래스의 메소드는 `ses` 를 `objectName`
으로 사용해야 합니다.

선택적 인수는 선택적 인수를 둘러싼 대괄호 `[]` 와 이 선택적 인수가 다른 인수
뒤에 오는 경우 필요한 쉼표로 표시됩니다.

```
required[, optional]
```

메소드 아래에는 각 인수에 대한 자세한 정보가 있습니다. 인수의 유형은 공통 유형
중 하나에 의해 표기됩니다:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Electron 의 [`WebContent`](api/web-contents.md) 같은 사용자 정의 유형

인수 또는 메소드가 특정 플랫폼에 고유한 경우, 해당 플랫폼은 자료 유형 다음에
공백으로 구분 된 기울임 꼴 목록으로 표시됩니다. 값은 `macOS`, `Windows`, `Linux`
일 수 있습니다.

```markdown
* `animate` Boolean (선택) _macOS_ _Windows_ - Animate the thing.
```

`Array` 유형 인수는 설명 아래에 배열이 포함할 요소를 명시해야 합니다.

`Function` 형 인자에 대한 설명은 그것이 어떻게 호출 될 수 있는 지를 명확히하고
그것에 전달 될 파라미터의 유형을 열거해야 합니다.

### 이벤트

이벤트 장은 다음 형식이어야 합니다:

```markdown
### 이벤트: 'wake-up'

반환값:

* `time` String

...
```

제목은 모듈의 이벤트인지 클래스의 이벤트인지에 따라 `###` 또는 `####` 레벨일 수
있습니다.

이벤트의 인수는 메소드와 동일한 규칙을 따릅니다.

### 속성

속성 장은 다음 형식이어야 합니다:

```markdown
### session.defaultSession

...
```

제목은 모듈의 속성인지 클래스의 속성인지에 따라 `###` 또는 `####` 레벨일 수
있습니다.

## 문서 번역

Electron 문서의 번역본은 `docs-translations` 디렉토리에 있습니다.

다른 집합(또는 부분 집합)을 추가하려면:

* 언어 약어로 명명 된 하위 디렉토리를 생성하세요.
* 파일을 번역하세요.
* 번역한 파일에 연결되도록 언어 디렉토리의 `README.md` 파일을 수정하세요.
* 주 Electron [README](https://github.com/electron/electron#documentation-translations)
  에 번역 디렉토리 링크를 추가하세요.

`docs-translations` 아래의 파일들은 번역 된 것들만 포함해야하며, 원본 영문
파일을 복사하면 안됩니다.
