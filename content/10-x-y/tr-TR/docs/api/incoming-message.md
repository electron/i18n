## Sınıf: IncomingMessage

> HTTP/HTTPS isteklerininin cevaplarını halleder.

İşlem: [Ana](../glossary.md#main-process)

`IncomingMessage`, [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) arayüzünü gerçekler, bundan dolayı bir [EventEmitter][event-emitter]'dır.

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

A `Record<string, string | string[]>` representing the HTTP response headers. The `headers` object is formatted as follows:

* Tüm başlıklar küçük harflerde olmalıdır.
* Duplicates of `age`, `authorization`, `content-length`, `content-type`, `etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`, `last-modified`, `location`, `max-forwards`, `proxy-authorization`, `referer`, `retry-after`, `server`, or `user-agent` are discarded.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with '; '.
* For all other headers, the values are joined together with ', '.

#### `response.httpVersion`

HTTP protokolü versiyon numarasını belirten bir `Katar`. Genelde değerler '1.0', '1.1' gibi olur. Ayrıca `httpVersionMajor` ve `httpVersionMinor`, ayrı ayrı HTTP büyük ve küçük sürüm numaralarını geri döndüren iki tam sayı değerli okunabilir özelliktir.

#### `response.httpVersionMajor`

HTTP prokotolünün büyük versiyon numarasını belirten bir `Katar`.

#### `response.httpVersionMinor`

HTTP prokotolünün minik versiyon numarasını belirten bir `Katar`.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
