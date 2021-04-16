# Objet ProtocolResponse

* `error` Integer (optional) - When assigned, the `request` will fail with the `error` number . Pour les numéros d'erreur disponibles que vous pouvez utiliser, veuillez consulter la liste des erreurs [net][net-error].
* `statusCode` Number (facultatif) - Le code de réponse HTTP est 200 par défaut.
* `charset` String (facultatif) -Jeu de caractères du body de la réponse: `"utf-8"` par défaut.
* `charset` String (facultatif) -Type MIME du body de la réponse: `"text/html"` par défaut. L'initialisation du `mimeType` définira implicitement l'en-tête `content-type` dans la réponse, mais si `content-type` est déjà défini dans les en-têtes ``, le `mimeType` sera alors ignoré.
* `headers` Record<string, string | string[]>(facultatif) - Un object contenant les en-têtes de réponse. Les clés doivent être du type String, et les valeurs doivent être soit des String ou un Tableau de Chaînes.
* `data` (Buffer | String | ReadableStream) (optional) - The response body. Lorsque la réponse est du type stream, il s'agit d'un stream lisible par Node.js et représentant le corps de la réponse. Lorsqu'il s'agit d'une réponse de type `Buffer`, il s'agit d'un `Buffer`. Lorsqu'il s'agit d'une réponse de type `String`, il s'agit d'une `String`. Et c'est est ignoré pour les autres types de réponses.
* `path` String (optional) - Path to the file which would be sent as response body. This is only used for file responses.
* `url` String (optional) - Download the `url` and pipe the result as response body. This is only used for URL responses.
* `referrer` String (optional) - The `referrer` URL. This is only used for file and URL responses.
* `method` String (optional) - The HTTP `method`. This is only used for file and URL responses.
* `session` Session (optional) - The session used for requesting URL, by default the HTTP request will reuse the current session. Setting `session` to `null` would use a random independent session. This is only used for URL responses.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (optional) - The data used as upload data. This is only used for URL responses when `method` is `"POST"`.

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
