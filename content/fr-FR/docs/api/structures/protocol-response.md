# Objet ProtocolResponse

* `error` Integer (facultatif) - Lorsqu’il est attribué, le `request` échouera avec le `error` numéro . Pour les numéros d'erreur disponibles que vous pouvez utiliser, veuillez consulter la liste des erreurs [net][net-error].
* `statusCode` Number (facultatif) - Le code de réponse HTTP est 200 par défaut.
* `charset` String (facultatif) -Jeu de caractères du body de la réponse: `"utf-8"` par défaut.
* `charset` String (facultatif) -Type MIME du body de la réponse: `"text/html"` par défaut. L'initialisation du `mimeType` définira implicitement l'en-tête `content-type` dans la réponse, mais si `content-type` est déjà défini dans les en-têtes ``, le `mimeType` sera alors ignoré.
* `headers` Record<string, string | string[]>(facultatif) - Un object contenant les en-têtes de réponse. Les clés doivent être du type String, et les valeurs doivent être soit des String ou un Tableau de Chaînes.
* `data` (Tampon | Chaîne | ReadableStream) (facultatif) - L’organe de réponse. Lorsque la réponse est du type stream, il s'agit d'un stream lisible par Node.js et représentant le corps de la réponse. Lorsqu'il s'agit d'une réponse de type `Buffer`, il s'agit d'un `Buffer`. Lorsqu'il s'agit d'une réponse de type `String`, il s'agit d'une `String`. Et c'est est ignoré pour les autres types de réponses.
* `path` String (facultatif) - Chemin vers le fichier qui serait envoyé comme réponse corps. Ceci n’est utilisé que pour les réponses de fichiers.
* `url` String (facultatif) - Téléchargez le `url` et pipe le résultat en réponse corps. Ceci n’est utilisé que pour les réponses URL.
* `referrer` String (facultatif) - L’URL `referrer` 'ÉCRAN. Ceci n’est utilisé que pour les réponses fichier et URL.
* `method` String (facultatif) - The HTTP `method`. Ceci n’est utilisé que pour les réponses fichier et URL.
* `session` session (facultatif) - La session utilisée pour demander l’URL, par défaut la demande HTTP réutilise la session en cours. Définir `session` pour `null` utiliserait une session indépendante aléatoire. Ceci n’est utilisé que pour les réponses URL.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (facultatif) - Les données utilisées comme données de téléchargement. Ce n’est utilisé pour les réponses URL lorsque `method` est `"POST"`.

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
