# Desteklenen Chrome Komut Satırı Anahtarları

> Elektron tarafından desteklenen komut satırı anahtarları.

[Uygulama](app.md) modülünün [hazır](app.md#event-ready) olayı yayılmadan önce [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) kullanarak uygulamanızın ana komut dosyalarına ekleyebilirsiniz:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Kodlarınızı buraya yazın
})
```

## --ignore-connections-limit=`domains`

`,` Ile ayrılmış `alan adları` listesi için bağlantı limitini yoksay.

## --disable-http-cache

HTTP istekleri için disk önbelleği devre dışı bırakır.

## --disable-http2

HTTP/2 ve SPDY/3.1 protokollerini devre dışı bırakın.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

Hata ayıklama ile ilgili bayrakları, ayrıntılar için [Debugging the Main Process](../tutorial/debugging-main-process.md) kılavuzuna bakın.

## --remote-debugging-port=`port`

Belirtilen `port` noktasında HTTP üzerinden uzaktan hata ayıklamayı etkinleştirir.

## --disk-cache-size=`size`

Disk önbelleği tarafından kullanılacak maksimum disk alanını bayt cinsinden ifade etmeye zorlar.

## --js-flags=`flags`

Node JS motoruna geçirilen bayrakları belirtir. Ana işlemdeki `bayrakları` etkinleştirmek isterseniz, Elektron başlatırken değerlerin geçmiş olması gerekir.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" app'iniz
```

[Node documentation](https://nodejs.org/api/cli.html) bakın veya kullanılabilir bayrakların bir listesi için terminalde `node --help` çalıştırın. Ayrıca, özellikle Node'un V8 JavaScript motoruna atıfta bulunan bayrakların listesini görmek için `node --v8-options`'ni çalıştırın.

## --proxy-server=`address:port`

Sistem ayarını geçersiz kılan belirli bir proxy sunucusu kullanın. Bu anahtar HTTPS ve WebSocket istekleri dahil olmak üzere yalnızca HTTP protokollü istekleri etkiler. Ayrıca, tüm proxy sunucuların HTTPS'yi ve WebSocket isteklerini desteklemediği de dikkat çeken bir noktadır.

## --proxy-bypass-list=`hosts`

Verilen yarı-kolonla ayrılmış ana bilgisayarların listesi için Electron talimatları proxy sunucusunu atlar. Bu bayrak yalnızca tandem içerisinde `--proxy-server` ile kullanılmışsa etki eder.

Örneğin:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Local adreslerde (`localhost`, `127.0.0.1` etc.), `google.com` alt alan adları ile yer alan tüm ana bilgisayarlar dışında kullanılacak proxy sunucuları `foo.com` suffix içermeli ve `1.2.3.4:5678` içinde bulundurmalı.

## --proxy-pac-url=`url`

PAC komut dosyasını belirtilen `url`'de kullanır.

## --no-proxy-server

Bir proxy sunucusu kullanmayın ve daima doğrudan bağlantılar kurun. Geçen proxy sunucu bayrakları diğerlerini geçersiz kılar.

## --host-rules=`rules`

Ana bilgisayar adlarının nasıl eşleştirileceğini denetleyen virgülle ayrılmış `kurallar`.

Örneğin:

* `MAP * 127.0.0.1` Tüm ana makine adlarını 127.0.0.1 ile eşleşmesi için zorlar
* `MAP *.google.com proxy` Tüm google.com alt etki alanları "proxy" çözülmesi için zorlar.
* `MAP test.com [::1]:77` "test.com" u IPv6 loopback için çözülmesini zorlar. Elde edilen soket adresinin bağlantı noktasını da 77 olacak şekilde zorlar.
* `MAP * baz, EXCLUDE www.google.com` "www.google.com" dışında her şeyi "baz" a yeniden eşler.

Bu eşlemeler, net istekli bitiş noktası sunucusu için geçerlidir (TCP bağlantısı ve ana çözümleyici doğrudan bir bağlantıda ve `CONNECT` Http proxy bağlantısında ve `SOCKS` proxy bağlantısı bitiş noktası sunucusu içerisinde).

## --host-resolver-rules=`rules`

Gibi `--host-rules` ama bu `kurallar` sadece ana çözümleyici için geçerlidir.

## --auth-server-whitelist=`url`

Tümleşik kimlik doğrulamanın etkinleştirildiği virgülle ayrılmış sunucular listesi.

Örneğin:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

o zaman `example.com`, ` foobar.com`, `baz` ile biten herhangi bir `url` entegre kimlik doğrulama için kabul edilmiş olacaktır. `*` öneki olmadan Url'nin tam olarak eşleşmesi gerekir.

## --auth-negotiate-delegate-whitelist=`url`

Kullanıcı kimlik bilgilerinin temsilciliğinin gerekli olduğu, virgülle ayrılmış bir sunucu listesi. `*` öneki olmadan Url'nin tam olarak eşleşmesi gerekir.

## --ignore-certificate-errors

Sertifika ile ilgili hataları yok sayar.

## --ppapi-flash-path=`path`

Pepper flash eklentisi `yolunu` belirler.

## --ppapi-flash-version=`version`

Pepper flash eklentisi `sürümünü` ayarlar.

## --log-net-log=`path`

Kaydedilecek net günlük olaylarını etkinleştirir ve bunları `yoluna` yazar.

## --disable-renderer-backgrounding

Chromium görünmez sayfa oluşturucu işlemlerinin önceliğinin düşürülmesini engeller.

Eğer sadece bir pencere içindeki daralmaları devre dışı bırakmak istiyorsanız, tüm global render işlemlerinde bu bayrak ile [playing silent audio](https://github.com/atom/atom/pull/9485/files)'i alabilirsiniz.

## --enable-logging

Chromium loglarını konsol içerisine yazdırır.

Kullanıcının uygulaması yüklenene kadar bu anahtar `app.commandLine.appendSwitch` içerisinde kullanılamaz fakat aynı etkiyi yaratması için `ELECTRON_ENABLE_LOGGING` ortam değişkenini ayarlayabilirsiniz.

## --v=`log_level`

Varsayılan maximum aktif V-logging seviyesini verir, varsayılan 0'dır. Normalde V-logging seviyeleri için pozitif değerler kullanılır.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.

## -vmodule=`pattern`

Modül başına `--v` tarafından verilen değeri geçersiz kılmak için maksimal V-logging düzeylerini verir. Örneğin `my_module.*` ve `foo*.*` kaynak dosyaları içindeki tüm kodlar için `my_module=2,foo*=3` logging seviyelerini değiştirebilir.

İleri veya geri eğik çizgi içeren herhangi bir desen sadece modüle karşı değil aynı zamanda bütün yol adına karşı test edilir. Örneğin `foo/bar` dizini altındaki kaynak dosyaları tüm kodlar için `*/foo/bar/*=2` ile logging seviyeleri değiştirilebilir.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.