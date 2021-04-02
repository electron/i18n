# Objeto PostData

* `type` String - Um dos seguintes:
  * `rawData` - Os dados estão disponíveis como `Buffer`, no campo `rawData` .
  * `file` - O objeto representa um arquivo. Os campos `filePath`, `offset`, `length` e `modificationTime` serão usados para descrever o arquivo.
  * `blob` - O objeto representa um `Blob`. O campo `blobUUID` será usado para descrever o `Blob`.
* `bytes` String (opcional) - Os bytes brutos dos dados do post em uma `Buffer`. Necessário para o tipo `rawData` .
* `filePath` String (opcional) - O caminho do arquivo que está sendo carregado. Necessário para o tipo `file` .
* `blobUUID` String (opcional) - A `UUID` do `Blob` sendo carregada. Necessário para o tipo `blob` .
* `offset` Integer (opcional) - O deslocamento desde o início do arquivo sendo carregado, em bytes. Válido apenas para `file` tipos.
* `length` Inteiro (opcional) - O comprimento do arquivo sendo carregado, em bytes. Se definido para `-1`, todo o arquivo será carregado. Válido apenas para `file` tipos.
* `modificationTime` Double (opcional) - O tempo de modificação do arquivo representado por um duplo, que é o número de segundos desde o `UNIX Epoch` (1 de janeiro de 1970). Válido apenas para `file` tipos.
