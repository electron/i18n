# PostBody Object

* `data` Array<[PostData](./post-data.md)> - 新しいウィンドウに送信する投稿データ。
* `contentType` String - データに使用される `content-type` ヘッダー。 `application/x-www-form-urlencoded` または `multipart/form-data` のどちらか。 送信された HTML フォームの `enctype` 属性に相当します。
* `boundary` String (任意) - メッセージの複数の部分を分離するために使用される境界。 `contentType` が `multipart/form-data` の場合のみ有効です。

`--`から始まるキーは現在サポートされていません。 例えば、webPreferencesで `nativeWindowOpen` が `false` に設定されている場合、これは `multipart/form-data` として誤って送信されます。

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
