# Suportadong mga Chrome Command Line Switches

> Ang Command line switches ay sinusuportahan ng Electron.

Maaari mong gamitin ang [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) upang idagdag ito sa iyong app's ang iyong pangunahing script bago ang [ready](app.md#event-ready) event ng [app](app.md) modyul ay emitted:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // ilagay mo ang code mo dito
})
```

## --ignore-connections-limit=`domains`

Ipagsawalang bahala ang limitasyon ng koneksyon para sa `domains` bukod na listahan ng `,`.

## --disable-http-cache

Wag paganahin ang disk cache para sa kahilingan ng HTTP.

## --disable-http2

Huwag paganahin ang HTTP/2 at SPDY/3.1 protocol.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

May Kaugnayan ang debug sa mga flags, tingnan ang [ Debugging ang pangunahing Proseso ](../tutorial/debugging-main-process.md) gabay para sa mga detalye.

## --remote-debugging-port=`port`

Paganahin ang remote debugging bago ang HTTP sa pag tukoy sa `port`.

## --disk-cache-size=`size`

Gamitin ang pinakamataas na bakante ng disk cache, na magagamit, sa byte.

## --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server=`address:port`

Gumamit ng isang uri ng proxy server, para mapatungan ang system setting. Lumipat lamang kung nakakaapekto ang request ng HTTP protocol, pati na ang HTTPS at WebSocker request. Maaring kapansin-pansin na ang lahat ng proxy servers ay sumusuporta sa HTTPS at sa hiling ng WebSocket. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`hosts`

Turuan ang Electron na lampasan ang proxy server na semi-colon-separated ang listahan ng mga hosts. ito ay magkakaapekto lamang sa pinagsamang paggamit nito `--proxy-server`.

Halimbawa:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Gamitin ang proxy server sa lahat ng host, maliban sa local address (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, ang host na nag lalaman ng suffix na `foo.com` at kahit ano sa `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Gumagamit ng mga PAC script at tukuyin ang `url`.

## --no-proxy-server

Huwag gumamit ng proxy server at palaging gumawa ng mga direktang koneksiyon. patungan ang iba pang mga proxy server flag na nkalipas na.

## --host-rules=`rules`

Ang kuwit ay nag hihiwalay sa listan ng `rules` na nag kokontrol kung paano ang hostname ay itinalaga.

Halimbawa:

* `MAP * 127.0.0.1` kailangang gawin na ang lahat ng hostname ay 127.0.0.1
* `MAP *.google.com proxy` kailangang lahat ng google.com subdomains ay maresolbahan ng "proxy".
* `MAP test.com [::1]:77` pinilit ng "test.com" na maayos ng IPv6 loopback. at pilitin ang port na resultahan ang socket address kailangan ay 77.
* `MAP * baz http, ibukod ang www.google.com` ilipat sa lahat ng bagay na may "baz http", maliban sa "www.google.com".

Ang pag mappings ay inaaplay sa dulo ng host. sa kahilingan ng net (ang TCP kumonekta at mag-host ng resolver ay isang direktang koneksyon, at ang `CONNECT` sa koneksiyon ng HTTP proxy connection, at ang dulo ng host sa `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Gusto ng `--host-rules` subalit ang `rules` ay maaplay lamang sa host resolver.

## --auth-server-whitelist=`url`

Ang kuwit ang nag hihiwalay sa listahan ng mga servers para paganahin ang integrated authentication.

Halimbawa:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

ang anumang `url` na nagtatapos sa `example.com`,`foobar.com`, `baz` ay isinaalang-alang Para sa pinagsama-samang pag papatunay. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

## --ignore-certificate-errors

Balewalain ang sertipiko na may kaugnay sa mga pagkakamali.

## --ppapi-flash-path=`path`

Italaga ang `path` para sa plugin ng pepper flash.

## --ppapi-flash-version=`version`

Italaga ang `version` para sa plugin ng pepper flash.

## --log-net-log=`path`

Paganahin ang net log ng mga nangyari isulat at i-save sila sa `path`.

## --disable-renderer-backgrounding

Pinipigilan ang Chromium mula sa pagpapababa ng priyoridad ng renderer ng mga pahina na hindi nakikita sa proseso.

Etong flag ay pangkalahatang proseso ng renderer. at kung gusto mong wag paganahin ang throtting ng isang window, maaari mong kunin ang hack ng [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --Enable-logging

Itala ang mga log ng Chromium's sa console.

Ang Switch na ito ay hindi pwedeng magamit ng `app.commandLine.appendSwitch` dahil ito ay parsed na mas maaga kaysa sa mga gumagamit ng app, ngunit maaari mong i-talaga ang `ELECTRON_ENABLE_LOGGING` sa paligid variable upang makamtan ang parehong epekto nito.

## --v=`log_level`

Binigyan ng default na pinaka mainam at aktibong antas ng V-logging: 0 ang default. pangkaraniwan na ang mga positibong halaga ay ginagamit sa antas ng V-logging.

Ang pagpapalit nato ay gagana lamang kapag ang `--enable-logging` ay tapos na.

## --vmodule=`pattern`

Binigyan ang kada-modyul ng mainam na antas ng V-logging para i-override ang halaga na binigay ng `--v`. E.g. `my_module=2,foo*=3` ibig baguhin ang antas ng logging sa lahat ng code sa pinagkunan ng file na `my_module.*` at `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. E.g. `*/foo/bar/*=2` ay maaaring mabago ang antas ng logging sa lahat ng code na pinanggalingan ng files sa ilalim ng `foo/bar` directory.

Ang pagpapalit nato ay gagana lamang kapag ang `--enable-logging` ay tapos na.

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.