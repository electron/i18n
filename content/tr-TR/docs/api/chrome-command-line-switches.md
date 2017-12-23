# Desteklenen Chrome Komut Satırı Anahtarları

> Elektron tarafından desteklenen komut satırı anahtarları.

[app](app.md) modülünün [ready](app.md#event-ready) olayı yayılmadan önce [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) kullanarak uygulamanızın ana komut dosyalarına ekleyebilirsiniz:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Kodlarınızı buraya yazın
})
```

## --ignore-connections-limit=`domains`

`,` Ile ayrılmış `domains` listesi için bağlantı limitini yoksay.

## --disable-http-cache

HTTP istekleri için disk önbelleği devre dışı bırakır.

## --disable-http2

HTTP/2 ve SPDY/3.1 protokollerini devre dışı bırakın.

## --inspect=`port` and --inspect-brk=`port`

Hata ayıklama ile ilgili bayrakları, ayrıntılar için [Debugging the Main Process](../tutorial/debugging-main-process.md) kılavuzuna bakın.

## --remote-debugging-port=`port`

Belirtilen `port` noktasında HTTP üzerinden uzaktan hata ayıklamayı etkinleştirir.

## --disk-cache-size=`size`

Disk önbelleği tarafından kullanılacak maksimum disk alanını bayt cinsinden ifade etmeye zorlar.

## --js-flags=`flags`

Node JS motoruna geçirilen bayrakları belirtir. Ana işlemde `flags` etkinleştirmek isterseniz, Elektron başlatırken değerlerin geçmiş olması gerekir.

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" app'iniz
```

[Node documentation](https://nodejs.org/api/cli.html) bakın veya kullanılabilir bayrakların bir listesi için terminalde `node --help` çalıştırın. Ayrıca, özellikle Node'un V8 JavaScript motoruna atıfta bulunan bayrakların listesini görmek için `node --v8-options`'ni çalıştırın.

## --proxy-server=`address:port`

Sistem ayarını geçersiz kılan belirli bir proxy sunucusu kullanın. Bu anahtar HTTPS ve WebSocket istekleri dahil olmak üzere yalnızca HTTP protokollü istekleri etkiler. Ayrıca, tüm proxy sunucuların HTTPS'yi ve WebSocket isteklerini desteklemediği de dikkat çeken bir noktadır.

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Örneğin:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

PAC komut dosyasını belirtilen `url`'de kullanır.

## --no-proxy-server

Bir proxy sunucusu kullanmayın ve daima doğrudan bağlantılar kurun. Geçen proxy sunucu bayrakları diğerlerini geçersiz kılar.

## --host-rules=`rules`

Ana bilgisayar adlarının nasıl eşleştirileceğini denetleyen virgülle ayrılmış `rules`.

Örneğin:

* `MAP * 127.0.0.1` Tüm ana makine adlarını 127.0.0.1 ile eşleşmesi için zorlar
* `MAP *.google.com proxy` Tüm google.com alt etki alanları "proxy" çözülmesi için zorlar.
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Gibi `--host-rules` ama bu `rules` sadece ana çözümleyici için geçerlidir.

## --auth-server-whitelist=`url`

Tümleşik kimlik doğrulamanın etkinleştirildiği virgülle ayrılmış sunucular listesi.

Örneğin:

    --auth-server-whitelist='*example.com, *foobar.com, *baz'
    

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

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not just the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.