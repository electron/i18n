## Sınıf: IncomingMessage

> HTTP/HTTPS isteklerininin cevaplarını halleder.

İşlem: [Ana](../glossary.md#main-process)

`IncomingMessage`, [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) arayüzünü gerçekler, bundan dolayı bir [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)'dır.

### Örnek olayları

#### Olay: 'data'

Dönüşler:

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

### Örnek Özellikler

Bir `IncomingMessage` örneğinde aşağıdaki okunabilir özellikler bulunur:

#### `response.statusCode`

HTTP yanıt durum kodu belirten bir `Integer`.

#### `response.statusMessage`

HTTP yanıt mesajı temsil eden bir `Katar`.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* Tüm başlıklar küçük harflerde olmalıdır.
* Her bir başlık adı, başlık nesnesinde bir dizi değerli özellik üretir.
* Her bir başlık değeri, başlık adıyla ilişki bir diziye eklenir.

#### `response.httpVersion`

HTTP protokolü versiyon numarasını belirten bir `Katar`. Genelde değerler '1.0', '1.1' gibi olur. Ayrıca `httpVersionMajor` ve `httpVersionMinor`, ayrı ayrı HTTP büyük ve küçük sürüm numaralarını geri döndüren iki tam sayı değerli okunabilir özelliktir.

#### `response.httpVersionMajor`

HTTP prokotolünün büyük versiyon numarasını belirten bir `Katar`.

#### `response.httpVersionMinor`

HTTP prokotolünün minik versiyon numarasını belirten bir `Katar`.
