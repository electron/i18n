## Sınıf: IncomingMessage

> HTTP/HTTPS isteklerininin cevaplarını halleder.

Süreç: [Ana](../glossary.md#main-process)

`IncomingMessage`, [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) arayüzünü gerçekler, bundan dolayı bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dır.

### Örnek olayları

#### Olay: 'data'

Döndürür:

* `chunk` Tampon - Cevap içeriğınin bir kısmı.

`data` olayı, dönen cevabi uygulanabilir koda geçirmek için kullanılan yöntemdir.

#### Olay: 'end'

Dönen cevabının içeriğinin bittiğini belirtir.

#### Olay: 'aborted'

Devam eden bir HTTP işleminde, isteğin iptal edildiği durumda çagırılır.

#### Olay: 'error'

Döndürür:

`error` Hata - Tipik olarak hatanın ana sebebini belirten bir katar tutar.

Dönen cevabın veri olaylarını işlerken hata gelirse işleme girer. Örnek olarak, sunucu cevabı hala akıştayken eğer sunucu kapatılırsa, yanıt nesnesinde bir `hata` olayı yayınlanır ve istek nesnesinde bir `kapat` olayı takip edilir.

### Örnek özellikleri

Bir `IncomingMessage` örneğinde aşağıdaki okunabilir özellikler bulunur:

#### `response.statusCode`

HTTP yanıt durum kodu belirten bir `Integer`.

#### `response.statusMessage`

HTTP yanıt mesajı temsil eden bir `Katar`.

#### `response.headers`

HTTP başlıklarını temsil eden bir `Obje`. `headers` objesi aşağıdaki gibi formatlanır:

* Tüm başlıklar küçük harflerde olmalıdır.
* Each header name produces an array-valued property on the headers object.
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

HTTP protokolü versiyon numarasını belirten bir `Katar`. Genelde değerler '1.0', '1.1' gibi olur. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

HTTP prokotolünün büyük versiyon numarasını belirten bir `Katar`.

#### `response.httpVersionMinor`

HTTP prokotolünün minik versiyon numarasını belirten bir `Katar`.