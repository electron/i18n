# Objeto de resposta ao protocolo

* `error` Inteiro (opcional) - Quando atribuído, o `request` falhará com o número `error` . Para obter os números de erro disponíveis que você pode usar, consulte a lista de erros de rede [][net-error].
* `statusCode` Número (opcional) - O código de resposta HTTP, padrão é 200.
* `charset` String (opcional) - O charset do corpo de resposta, padrão é `"utf-8"`.
* `mimeType` String (opcional) - O tipo MIME de corpo de resposta, padrão é `"text/html"`. A configuração `mimeType` definiria implicitamente o cabeçalho `content-type` em resposta, mas se `content-type` já estiver definido em `headers`, o `mimeType` seria ignorado.
* `headers` Gravar<string, string | string[]> (opcional) - Um objeto contendo os cabeçalhos de resposta. As teclas devem ser String, e os valores devem ser string ou array of string.
* `data` (| buffer | de cordas ReadableStream) (opcional) - O corpo de resposta. Quando retornando como resposta, este é um fluxo .js nó legível representando corpo de resposta. Ao retornar `Buffer` como resposta, este é um `Buffer`. Ao retornar `String` como resposta, este é um `String`. Isso é ignorado por outros tipos de respostas.
* `path` String (opcional) - Caminho para o arquivo que seria enviado como resposta corpo. Isso é usado apenas para respostas de arquivos.
* `url` String (opcional) - Baixe o `url` e insunar o resultado como resposta corpo. Isso só é usado para respostas de URL.
* `referrer` String (opcional) - A URL `referrer` . Isso só é usado para de arquivos e respostas de URL.
* `method` String (opcional) - O `method`HTTP . Isso só é usado para de arquivos e respostas de URL.
* `session` Session (opcional) - A sessão usada para solicitar URL, por padrão a solicitação HTTP reutilizará a sessão atual. Definir `session` para `null` usaria uma sessão independente aleatória. Isso só é usado para respostas de URL.
* `uploadData` [ProtocolResponseUploadData](protocol-response-upload-data.md) (opcional) - Os dados usados como dados de upload. Isso só é usado para respostas de URL quando `method` é `"POST"`.

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h

[net-error]: https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h
