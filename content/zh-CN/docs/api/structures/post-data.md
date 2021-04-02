# PostData Object

* `type` 字符串 - 下列之一：
  * `rawData` - 数据可作为 `Buffer`，在 `rawData` 领域。
  * `file` - 对象表示文件。 `filePath`、 `offset`、 `length` 和 `modificationTime` 场将用于描述该文件。
  * `blob` - 对象表示 `Blob`。 `blobUUID` 场将用 来形容 `Blob`。
* `bytes` 字符串（可选） - `Buffer`中帖子数据的原始字节。 `rawData` 类型所必需的。
* `filePath` 字符串（可选） - 正在上传的文件的路径。 `file` 类型所需的 。
* `blobUUID` 字符串（可选） - 上传 `Blob` 的 `UUID` 。 `blob` 类型所必需的。
* `offset` 整数（可选） - 从文件开始 以字节进行上传的偏移。 仅适用于 `file` 类型。
* `length` 整数（可选） - 正在上传的文件的长度，字节。 如果设置为 `-1`，整个文件将被上传。 仅适用于 `file` 类型。
* `modificationTime` 双（可选） - 文件的修改时间 以双倍表示，这是自 `UNIX Epoch` 以来的秒数（1970 年 1 月 1 日）。 仅适用于 `file` 类型。
