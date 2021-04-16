# PostData 对象

* `type` String - 下列之一:
  * `rawData` - 数据作为 `Buffer` 放在 `rawData` 字段中。
  * `file` - 当前对象代表一个文件。 `filePath`、 `offset`、 `length` 和 `modificationTime` 字段将用于描述该文件。
  * `blob` - 当前对象为 `Blob`。 `blobUUID` 字段将用于描述 `Blob`。
* `bytes` String (可选) - 发送数据中的原始字节`Buffer`。 需要`rawData` 类型。
* `file` String (可选) - 上传文件的路径。 需要`file` 类型。
* `blobUUID` String (可选) - 正在上传的 `Blob` 的 `UUID`。 需要 `blob` 类型。
* `offset` Integer (可选) - 从要上传的文件开头的字节偏移量。 只对 `file` 类型有效。
* `length` Integer (可选) - 要上传的文件字节长度。 如果设置为 `-1`, 则整个文件将被上传。 只对 `file` 类型有效。
* `modificationTime` Double (可选) - 文件的修改时间，以double类型表示，即自 `UNIX Epoch` (1970 年 1 月 1 日) 以来的秒数。 只对 `file` 类型有效。
