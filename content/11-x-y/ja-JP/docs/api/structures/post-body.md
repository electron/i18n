# PostBody オブジェクト

* `data` Array<[PostData](./post-data.md)> - 新しいウィンドウに送信する投稿データ。
* `contentType` String - データに使用する `content-type` ヘッダー。 `application/x-www-form-urlencoded` と `multipart/form-data` のどちらかにできます。 送信される HTML フォームの `enctype` 属性に相当します。
* `boundary` String (任意) - メッセージを複数部分へ分ける際に使用する境界。 `contentType` が `multipart/form-data` の場合のみ有効です。

`--` から始まるキーが現在サポートされていないことに注意してください。 例えば、webPreferencesで `nativeWindowOpen` が `false` に設定されている場合、これは `multipart/form-data` として誤って送信されます。

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
