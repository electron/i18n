# Saklar Baris Perintah Chrome yang Didukung

> Beralih baris perintah yang didukung oleh Elektron .

Anda dapat menggunakan [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) untuk menambahkan mereka di app's script utama sebelum acara [siap](app.md#event-ready) modul [app](app.md) dibunyikan:

```javascript
const {app} = require ('electron')
app.commandLine.appendSwitch ('remote-debugging-port', '8315')
app.commandLine.appendSwitch ('host-rules', 'MAP * 127.0.0.1')

app.on ('siap', () = > {
   // kode kamu disini
})
```

## --ignore-connections-limit = ` domain `

Abaikan batas koneksi untuk ` domain ` yang dipisahkan oleh `, `.

## --disable-http-cache

Menonaktifkan cache disk untuk permintaan HTTP.

## --disable-http2

Nonaktifkan protokol HTTP / 2 dan SPDY / 3.1.

## periksa =` port ` dan --inspect-brk =` port `</0>

Bendera yang terkait dengan Debug, lihat panduan [ Debugging Main Process ](../tutorial/debugging-main-process.md) untuk rinciannya.

## --remote-debugging-port = ` port `

Mengaktifkan debugging jarak jauh melalui HTTP pada port ` yang ditentukan `.

## --disk-cache-size=`size`

Forces the maximum disk space to be used by the disk cache, in bytes.

## --js-flags=`flags`

Specifies the flags passed to the Node JS engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node's V8 JavaScript engine.

## --proxy-server=`address:port`

Gunakan server proxy tertentu, yang menggantikan pengaturan sistem. Saklar ini hanya memengaruhi permintaan dengan protokol HTTP, termasuk HTTPS dan WebSocket permintaan. Perlu dicatat juga bahwa tidak semua server proxy mendukung HTTPS dan Permintaan WebSocket.

## --proxy-bypass-list=`hosts`

Instruksikan Elektron untuk memotong server proxy untuk semi-colon-separated yang diberikan daftar host Bendera ini hanya memiliki efek jika digunakan bersamaan ` - proxy-server `.

For example:

```javascript
const {app} = require ('electron')
app.commandLine.appendSwitch ('proxy-bypass-list', '<local>; * google.com; * foo.com; 1.2.3.4: 5678')
```

Akan menggunakan server proxy untuk semua host kecuali untuk alamat lokal (` localhost `, ` 127.0.0.1` dll.), ` google.com` subdomain, host yang berisi akhiran ` foo.com ` dan apa saja di `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Uses the PAC script at the specified `url`.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

For example:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

Daftar server yang dipisahkan koma yang otentikasinya telah diaktifkan.

Sebagai contoh:

    --auth-server-whitelist = '* example.com, * foobar.com, * baz'
    

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

Daftar server yang dipisahkan koma yang diperlukan oleh pendelegasian mandat pengguna. Tanpa awalan `*` url harus sesuai persis.

## -- kesalahan sertifikat-kesalahan

Ignores certificate related errors.

## --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

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