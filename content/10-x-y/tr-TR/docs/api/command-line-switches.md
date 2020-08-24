# Desteklenen Komut Satırı Anahtarları

> Elektron tarafından desteklenen komut satırı anahtarları.

[Uygulama][app] modülünün [hazır][ready] olayı yayılmadan önce [app.commandLine.appendSwitch][append-switch] kullanarak uygulamanızın ana komut dosyalarına ekleyebilirsiniz:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

### --auth-server-whitelist=`url`

Tümleşik kimlik doğrulamanın etkinleştirildiği virgülle ayrılmış sunucular listesi.

Örneğin:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

o zaman `example.com`, ` foobar.com`, `baz` ile biten herhangi bir `url` entegre kimlik doğrulama için kabul edilmiş olacaktır. Without `*` prefix the URL has to match exactly.

### --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --disable-http-cache

HTTP istekleri için disk önbelleği devre dışı bırakır.

### --disable-http2

HTTP/2 ve SPDY/3.1 protokollerini devre dışı bırakın.

### --disable-renderer-backgrounding

Chromium görünmez sayfa oluşturucu işlemlerinin önceliğinin düşürülmesini engeller.

Eğer sadece bir pencere içindeki daralmaları devre dışı bırakmak istiyorsanız, tüm global render işlemlerinde bu bayrak ile [playing silent audio][play-silent-audio]'i alabilirsiniz.

### --disk-cache-size=`size`

Disk önbelleği tarafından kullanılacak maksimum disk alanını bayt cinsinden ifade etmeye zorlar.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Chromium loglarını konsol içerisine yazdırır.

Kullanıcının uygulaması yüklenene kadar bu anahtar `app.commandLine.appendSwitch` içerisinde kullanılamaz fakat aynı etkiyi yaratması için `ELECTRON_ENABLE_LOGGING` ortam değişkenini ayarlayabilirsiniz.

### --host-rules=`rules`

Ana bilgisayar adlarının nasıl eşleştirileceğini denetleyen virgülle ayrılmış `kurallar`.

Örneğin:

* `MAP * 127.0.0.1` Tüm ana makine adlarını 127.0.0.1 ile eşleşmesi için zorlar
* `MAP *.google.com proxy` Tüm google.com alt etki alanları "proxy" çözülmesi için zorlar.
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` "www.google.com" dışında her şeyi "baz" a yeniden eşler.

Bu eşlemeler, net istekli bitiş noktası sunucusu için geçerlidir (TCP bağlantısı ve ana çözümleyici doğrudan bir bağlantıda ve `CONNECT` Http proxy bağlantısında ve `SOCKS` proxy bağlantısı bitiş noktası sunucusu içerisinde).

### --host-resolver-rules=`rules`

Gibi `--host-rules` ama bu `kurallar` sadece ana çözümleyici için geçerlidir.

### --ignore-certificate-errors

Sertifika ile ilgili hataları yok sayar.

### --ignore-connections-limit=`domains`

`,` Ile ayrılmış `alan adları` listesi için bağlantı limitini yoksay.

### --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" app'iniz
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log=`path`

Kaydedilecek net günlük olaylarını etkinleştirir ve bunları `yoluna` yazar.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Örneğin:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Local adreslerde (`localhost`, `127.0.0.1` etc.), `google.com` alt alan adları ile yer alan tüm ana bilgisayarlar dışında kullanılacak proxy sunucuları `foo.com` suffix içermeli ve `1.2.3.4:5678` içinde bulundurmalı.

### --proxy-pac-url=`url`

PAC komut dosyasını belirtilen `url`'de kullanır.

### --proxy-server=`address:port`

Sistem ayarını geçersiz kılan belirli bir proxy sunucusu kullanın. Bu anahtar HTTPS ve WebSocket istekleri dahil olmak üzere yalnızca HTTP protokollü istekleri etkiler. Ayrıca, tüm proxy sunucuların HTTPS'yi ve WebSocket isteklerini desteklemediği de dikkat çeken bir noktadır. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Belirtilen `port` noktasında HTTP üzerinden uzaktan hata ayıklamayı etkinleştirir.

### --ppapi-flash-path=`path`

Pepper flash eklentisi `yolunu` belirler.

### --ppapi-flash-version=`version`

Pepper flash eklentisi `sürümünü` ayarlar.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.

### -vmodule=`pattern`

Modül başına `--v` tarafından verilen değeri geçersiz kılmak için maksimal V-logging düzeylerini verir. Örnek `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Örnek `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Anahtar sadece `--enable-logging` işlemi tamamlandığında çalışır.

## Node.js Flags

Electron supports some of the [CLI flags][node-cli] supported by Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspect-brk[=[host:]port]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Activate inspector on `host:port`. Default is `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

See the [Debugging the Main Process][debugging-main-process] guide for more details.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http
Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.

[app]: app.md
[append-switch]: app.md#appcommandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
