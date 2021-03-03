# Objeto PostData

* `type` String - One of the following:
  * `rawData` - Los Datos están disponibles como un `Buffer`, en el campo `rawData`.
  * `file` - El objeto representa un archivo. Los campos `filePath`, `offset`, `length` y `modificationTime` se utilizarán para describir el archivo.
  * `blob` - El objeto representa un `Blob`. El campo `blobUUID` se utilizará para describir el `Blob`.
* `bytes` String (opcional) - Los bytes sin procesar del post data en un `Buffer`. Requerido para el tipo `rawData`.
* `filePath` String (opcional) - La ruta del archivo que se está cargando. Requerido para el tipo `file`.
* `blobUUID` String (opcional) - El `UUID` del `Blob` que está siendo cargado. Requerido para el tipo `blob`.
* `offset` Integer (opcional) - El desplazamiento desde el principio del archivo que esta siendo cargado, en bytes. Sólo válido para tipos `file`.
* `length` Integer (opcional) - La longitud del archivo que se está cargando, en bytes. Si se establece a `-1`, el archivo entero se cargará. Sólo válido para tipos `file`.
* `modificationTime` Double (opcional) - El tiempo de modificación del archivo representado por un double, el cual es el número de segundo desde `UNIX Epoch` (Enero 1, 1970). Sólo válido para tipos `file`.
