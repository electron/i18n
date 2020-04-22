# StreamProtocolResponse オブジェクト

* `statusCode` Number (任意) - HTTP レスポンスコード。
* `headers` Record<String, String | String[]> (任意) - レスポンスヘッダーに含まれるオブジェクト。
* `data` ReadableStream | null - レスポンスの本文を表す Node.js 読み取り可能ストリーム。
