# אובייקט PostBody

* `data` Array<[PostData](./post-data.md)> - המידע שיש לשלוח לחלון החדש.
* `contentType` מחרוזת - הheader `content-type` שמשמשת להעברת המידע. `application/x-www-form-urlencoded` או `multipart/form-data`. מתאימה ל`enctype` בטופס HTML שנשלח.
* `boundary` מחרוזת (אופציונלי) - התחום שמשמש להפרדת חלקים מרובים של ההודעה. חוקי רק כאשר `content` הוא `multipart/form-data`.

שימו לב כי תווים שמתחילים ב`--` אינם נתמכים עוד. לדוגמה, אפשרות זו תשלח באופן שגוי `multipart/form-data` כאשר `nativeWindowOpen` מוגדר `false` בwebPrefrences:

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
