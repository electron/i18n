# Objekt Nach dem Text

* `Daren`Pfeil[PostDaten](./post-data.md)-Die Post Daten um der neuen Fenster gesendet zu werden.
* `Inhalt Typ`Zeile- Das`Etikett von Inhalt Typ fuer die Daten verwendet. Eine
<code>Anwendung/x-www-Forme-mit Urlcode`oder`vielteilig`/Form-von Daten. Entspricht dem `enctype` Attribut des übermittelten HTML-Formulares.
* `Grenze`Zeile (optional)-Die verwendete Grenze um diese Nachricht zu teilen. Anwendbar nur wenn`Inhalt Typ <code>vielteilig/Form-Daten`ist.

Beachten Sie, dass Schlüssel, die mit `beginnen --` beginnen, derzeit nicht benutzt werden. Zum Beispiel, wird dies falsch als`vielteilig/Form-Daten senden wird`, wenn `NativeOffeneFenster` falsch </code>in WebOptionen eingestellt ist:

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
