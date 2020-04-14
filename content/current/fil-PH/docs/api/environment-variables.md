# Nagbabago sa kapaligiran

> Kontrolin ang pagsasaayos ng application at pag-uugali nang walang pagbabago ng code.

Ang ilang mga pag-uugali ng Electron ay kinokontrol ng mga variable ng kapaligiran dahil sila ay nasimulan nang mas maaga kaysa sa mga flags ng command line at code ng app.

Halimbawa sa POSIX shell:

```sh
$i- export  and ELECTRON_ENABLE_LOGGING=true
$ electron
```

Halimbawa ng Windows console: 

```powershell
> i-set and ELECTRON_ENABLE_LOGGING=true
> electron
```

## Mga Variable ng Produksyon

Ang mga sumusunod na variable ng kapaligiran ay inilaan lalo na para gamitin sa runtime sa mga naka-package na application ng Electron.

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Halimbawa:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Unsupported options are:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` are explicitly disallowed in packaged apps, except for the following:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY
`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'

```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Bilang default, maaaring hindi pinapayagan ang isang bagong nabuong Google API key para gumawa ng mga kahilingan sa geocoding. Upang paganahin ang mga kahilingan sa geocoding, bisitahin ang  ang pahinang ito </ 0>.</p> 

### `ELECTRON_NO_ASAR
`

Hindi pinapagana ang suporta ng ASAR. Ang variable na ito ay suportado lamang sa mga proseso sa forked child at spawned child proseso na nagtatakda ng ` ELECTRON_RUN_AS_NODE </ 0>. </p>

<h3><code>ELECTRON_RUN_AS_NODE
`</h3> 

Nagsisimula ang proseso bilang isang normal na proseso ng Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows* 

Huwag ilakip sa kasalukuyang session ng console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux* 

Huwag gamitin ang global menu bar sa Linux.

### `ELECTRON_TRASH` *Linux*

Set the trash implementation on Linux. Default is `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Development Variables 

Ang mga sumusunod na variable ng kapaligiran ay inilaan lalo na para sa pag-unlad at mga layunin ng pag-debug.

### `ELECTRON_ENABLE_LOGGING
`

Ini-print ang Chrome's internal logging sa console.

### `ELECTRON_LOG_ASAR_READS
`

Kapag bumabasa ang Electron mula sa isang file ng ASAR, mag-log sa read offset at file path sa ang system ` tmpdir </ 0>. Ang resultang file ay maaaring ibigay sa module ng ASAR
upang i-optimize ang pag-order ng file.</p>

<h3><code>ELECTRON_ENABLE_STACK_DUMPING
`</h3> 

Ini-print ang stack trace sa console kapag nag-crash ang Electron.

Ang variable ng kapaligiran na ito ay hindi gagana kung ang ` crashReporter </ 0> ay nagsimula.</p>

<h3><code>ELECTRON_DEFAULT_ERROR_MODE` *Windows* </h3> 

Ipinapakita ang dialog ng pag-crash ng Windows kapag nag-crash ang Electron.

Ang variable ng kapaligiran na ito ay hindi gagana kung ang ` crashReporter </ 0> ay nagsimula.</p>

<h3><code>ELECTRON_OVERRIDE_DIST_PATH`</h3> 

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Paggamit:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```