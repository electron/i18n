# Desteklenen Komut Satırı Anahtarları

> Elektron tarafından desteklenen komut satırı anahtarları.

[Uygulama](app.md) modülünün [hazır](app.md#event-ready) olayı yayılmadan önce [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) kullanarak uygulamanızın ana komut dosyalarına ekleyebilirsiniz:

```javascript
const { app } = require('electron')
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

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" app'iniz
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server=`address:port`

Sistem ayarını geçersiz kılan belirli bir proxy sunucusu kullanın. Bu anahtar HTTPS ve WebSocket istekleri dahil olmak üzere yalnızca HTTP protokollü istekleri etkiler. Ayrıca, tüm proxy sunucuların HTTPS'yi ve WebSocket isteklerini desteklemediği de dikkat çeken bir noktadır. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Örneğin:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Local adreslerde (`localhost`, `127.0.0.1` etc.), `google.com` alt alan adları ile yer alan tüm ana bilgisayarlar dışında kullanılacak proxy sunucuları `foo.com` suffix içermeli ve `1.2.3.4:5678` içinde bulundurmalı.

## --proxy-pac-url=`url`

PAC komut dosyasını belirtilen `url`'de kullanır.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

Ana bilgisayar adlarının nasıl eşleştirileceğini denetleyen virgülle ayrılmış `kurallar`.

Örneğin:

* `MAP * 127.0.0.1` Tüm ana makine adlarını 127.0.0.1 ile eşleşmesi için zorlar
* `MAP *.google.com proxy` Tüm google.com alt etki alanları "proxy" çözülmesi için zorlar.
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
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

o zaman `example.com`, ` foobar.com`, `baz` ile biten herhangi bir `url` entegre kimlik doğrulama için kabul edilmiş olacaktır. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

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

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.

## -vmodule=`pattern`

Modül başına `--v` tarafından verilen değeri geçersiz kılmak için maksimal V-logging düzeylerini verir. Örneğin `my_module.*` ve `foo*.*` kaynak dosyaları içindeki tüm kodlar için `my_module=2,foo*=3` logging seviyelerini değiştirebilir.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Örneğin `foo/bar` dizini altındaki kaynak dosyaları tüm kodlar için `*/foo/bar/*=2` ile logging seviyeleri değiştirilebilir.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.

## --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`
- `remote.getGuestWebContents()` / `remote-get-guest-web-contents`

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.
