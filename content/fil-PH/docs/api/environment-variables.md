# Environment Variables 

> Kontrolin ang pagsasaayos ng application at pag-uugali nang walang pagbabago ng code.

Ang ilang mga pag-uugali ng Electron ay kinokontrol ng mga variable ng kapaligiran dahil sila ay nasimulan nang mas maaga kaysa sa mga flags ng command line at code ng app.

Halimbawa sa POSIX shell:

```bash
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

### `GOOGLE_API_KEY
`

Kasama sa elektron ang hardcoded na key ng API para sa paghiling ng mga kahilingan sa geocoding ng Google webservice. Dahil ang key na API na ito ay kasama sa bawat bersyon ng Electron, ito ay madalas na lumalampas sa quota ng paggamit nito. Upang magtrabaho sa paligid nito, maaari mong matustusan ang iyong sariling Google API key sa kapaligiran. Ilagay ang sumusunod na code sa iyong pangunahing proseso file, bago buksan ang anumang mga window ng browser na gagawa ng mga kahilingan sa geocoding:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'

```

Para sa mga tagubilin kung paano makakuha ng isang key ng Google API, bisitahin ang  ang pahinang ito </ 0>.</p> 

Bilang default, maaaring hindi pinapayagan ang isang bagong nabuong Google API key para gumawa ng mga kahilingan sa geocoding. Upang paganahin ang mga kahilingan sa geocoding, bisitahin ang  ang pahinang ito </ 0>.</p> 

### `ELECTRON_NO_ASAR
`

Hindi pinapagana ang suporta ng ASAR. Ang variable na ito ay suportado lamang sa mga proseso sa forked child at spawned child proseso na nagtatakda ng ` ELECTRON_RUN_AS_NODE </ 0>. </p>

<h3><code>ELECTRON_RUN_AS_NODE
`</h3> 

Nagsisimula ang proseso bilang isang normal na proseso ng Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Don't use the global menu bar on Linux.

## Development Variables

The following environment variables are intended primarily for development and debugging purposes.

### `ELECTRON_ENABLE_LOGGING`

Prints Chrome's internal logging to the console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.