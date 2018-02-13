# Обект UploadData

* `bytes` Buffer - Съдържанието, което се изпраща.
* `file` String - Пътя до файла, който ще бъде качен.
* `blobUUID` String - Уникален идентификатор на blob данните. Използвайте метод [ses.getBlobData](../session.md#sesgetblobdataidentifier-callback) за да върнете данните.