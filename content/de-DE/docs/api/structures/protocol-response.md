# ProtocolResponse Object

* `error` Ganzzahl (optional) - Wenn die `request` zugewiesen ist, schlägt die  mit der `error` Zahl fehl. Die verfügbaren Fehlernummern, die Sie verwenden können, finden Sie in der [Net-Fehlerliste][net-error].
* `statusCode` Number (optional) - Der Standard HTTP-Antwortcode ist 200.
* `charset` String (optional) - Der Zeichensatz des Antworttexts ist standardmäßig `"utf-8"`.
* `mimeType` String (optional) - Der MIME-Typ des Antworttexts ist standardmäßig `"text/html"`. Wenn `mimeType` festgelegt wird, wird der `content-type` -Header implizit als Antwort festgelegt, aber wenn `content-type` bereits in `headers`festgelegt ist, wird der `mimeType` ignoriert.
* `headers` Record<string, string | string[]> (optional) - Ein Objekt, das die Antwortheader enthält. Die Schlüssel müssen String sein, und Werte müssen entweder String oder Array of String sein.
* `data` (| String-| ReadableStream) (optional) - Der Antworttext. Wenn Stream als Antwort zurückgibt, ist dies ein .js lesbarer Stream, der Antworttext darstellt. Wenn `Buffer` als Antwort zurückgegeben wird, ist dies eine `Buffer`. Wenn `String` als Antwort zurückgegeben wird, ist dies eine `String`. Dies wird bei anderen Arten von Antworten ignoriert.
* `path` String (optional) - Pfad zur Datei, die als Antwort Text gesendet werden würde. Dies wird nur für Dateiantworten verwendet.
* `url` String (optional) - Laden Sie die `url` herunter und geben Sie das Ergebnis als Antwort Körper. Dies wird nur für URL-Antworten verwendet.
* `referrer` String (optional) - Die `referrer` URL. Dies wird nur für Datei- und URL-Antworten verwendet.
* `method` String (optional) - Der HTTP- `method`. Dies wird nur für Datei- und URL-Antworten verwendet.
* `session` Sitzung (optional) - Die Sitzung, die zum Anfordern von URL verwendet wird, die HTTP-Anforderung die aktuelle Sitzung wiederverwendet. Wenn Sie `session` auf `null` festlegen, wird eine zufällige unabhängige Sitzung verwendet. Dies wird nur für URL-Antworten verwendet.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (optional) - Die Daten, die als Upload-Daten verwendet werden. Dies wird nur für URL-Antworten verwendet, wenn `method` `"POST"`ist.

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
