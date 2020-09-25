# Objeto PostData

* `type` String - Um dos seguintes:
  * `rawData` - Os dados estão disponíveis como um `Buffer`, no campo `rawData`.
  * `file` - O objeto representa um arquivo. Os campos `filePath`, `offset`, `length` e `modificationTime` serão usados para descrever o arquivo.
  * `blob` - O objeto representa um `Blob`. O campo `blobUUID` será usado para descrever o `Blob`.
* `bytes` String (opcional) - Os bytes brutos dos dados do post em um `Buffer`. Obrigatório para o tipo `rawData`.
* `filePath` String (opcional) - O caminho do arquivo sendo carregado. Obrigatório para o tipo `file`.
* `blobUUID` String (opcional) - O `UUID` do `Blob` sendo carregado. Obrigatório para o tipo `blob`.
* `offset` Integer (opcional) - O deslocamento do início do arquivo sendo carregado, em bytes. Válido somente para o tipo `file`.
* `length` Integer (opcional) - O tamanho do arquivo sendo carregado, em bytes. Se definido como `-1`, o arquivo inteiro será carregado. Válido somente para o tipo `file`.
* `modificationTime` Double (opcional) - O tempo de modificação do arquivo representado por um double, que é o número de segundos desde o `UNIX Epoch` (1 de jan de 1970). Válido somente para o tipo `file`.
