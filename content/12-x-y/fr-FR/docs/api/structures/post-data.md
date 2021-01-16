# PostData Object

* `type` String - One of the following:
  * `rawData` - Les données sont disponibles en tant que `Buffer`, dans le champ `rawData`.
  * `file` - L'objet représente un fichier. Les champs `filePath`, `offset`, `length` et `modificationTime` seront utilisés pour décrire le fichier.
  * `blob` - L'objet représente un `Blob`. Le champ `blobUID` sera utilisé pour décrire le `Blob`.
* `bytes` String (facultatif) - Les octets bruts des données du post dans un `Buffer`. Requis pour le type de `rawData`.
* `path` String (facultatif) - Le chemin du fichier en cours de téléchargement. Requis pour le type de `fichier`.
* `blobUUID` String (facultatif) - Le `UUID` du `Blob` en cours de téléchargement. Requis pour le type de `blob`.
* `offset` Integer (facultatif) - Le décalage depuis le début du fichier étant téléchargé, en octets. Uniquement valable pour les types `fichiers`.
* `longueur` Integer (facultatif) - La longueur du fichier en cours de téléchargement, en octets. Si réglé sur `-1`, le fichier entier sera téléchargé. Uniquement valable pour les types `fichiers`.
* `modificationTime` Double (facultatif) - L'heure de modification du fichier représenté par un double, qui est le nombre de secondes depuis l'`Epoque UNIX` (1 janvier 1970). Uniquement valable pour les types `fichiers`.
