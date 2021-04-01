# Objet PostCorps

* `donnees` Fleche[PostData](./post-data.md)> - Les données post à envoyer à la nouvelle fenêtre.
* `Typecontenu` Fiche - Le titre `typecontenu` utilisé pour les données. Une des applications `application/x-www-form-urlencoded` ou ` forme-donnees multipart/`. Correspond à l'attribut `enctype` du formulaire HTML soumis.
* `boundary` String (facultatif) - La limite utilisée pour séparer plusieurs parties du message. Uniquement valide lorsque `contentType` est `multipart/form-data`.

Notez que les clés commençant par `--` ne sont pas prises en charge actuellement. Par exemple, cela soumettra erronément comme `multipart/form-data` lorsque `nativeWindowOpen` est défini à `false` dans webPreferences :

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
