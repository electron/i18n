# PostBody Object

* `data` Array<[PostData](./post-data.md)> - 새 창으로 전송된 post data 입니다.
* `contentType` String - 전송된 data를 나타내는 `content-type` 헤더. `application/x-www-form-urlencoded` 혹은 `multipart/form-data`이 될 수 있음. 제출된 HTML 양식의 `enctype` 특성을 해당합니다.
* `boundary` String (optional) - 여러개 message 파트를 구분하기 위해 사용된 경계 문자열 입니다. `contentType`는 `multipart/form-data`일 때만 유효합니다.

`--`로 시작하는 것은 현재 지원 되지 않습니다. For example, this will errantly submit as `multipart/form-data` when `nativeWindowOpen` is set to `false` in webPreferences:

```html
<form
  target="_blank"
  method="POST"
  enctype="application/x-www-form-urlencoded"
  action="https://postman-echo.com/post"
>
  <input type="text" name="--theKey">
  <input type="submit">
</form>
```
