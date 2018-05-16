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

Huwag ilakip sa kasalukuyang session ng console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux* 

Huwag gamitin ang global menu bar sa Linux.

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

Ang variable ng kapaligiran na ito ay hindi gagana kung ang  crashReporter </ 0> ay nagsimula.</p>