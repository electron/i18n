# Variabel Lingkungan

> Kontrol konfigurasi dan perilaku aplikasi tanpa mengubah kode.

Perilaku Elektron tertentu dikendalikan oleh variabel lingkungan karena diinisialisasi lebih awal dari pada baris perintah dan kode aplikasi.

Contoh kulit POSIX:

```sh
$ export ELECTRON _memungkinkan_LOGGING = benar $ electron
```

Contoh konsol jendela :

```powershell
& gt; atur ELECTRON _memungkinkan_LOGGING = benar
 & gt;  elektron
```

## Variabel Produksi

Variabel lingkungan berikut ditujukan terutama untuk digunakan pada saat runtime dalam aplikasi Elektron yang dikemas .

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Contoh:

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

### `GOOGLE_API_kunci`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
proses.env.GOOGLE_API_kunci = 'kamu_kunci_di sini'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Secara default, kunci Google API yang baru dibuat mungkin tidak diizinkan untuk membuat permintaan geocoding. Untuk mengaktifkan permintaan geocoding, kunjungi halaman ini </ 0> .</p> 



### `ELEKTRON_tidak_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.



### `ELECTRON_menjalankan_sebagai_NODE`

Mulai proses sebagai proses Node.js normal.



### ` ELECTRON_tidak_melapirkan_menghibur </ 0>  <em x-id="4"> jendela</ 1></h3>

<p spaces-before="0">Jangan lampirkan sesi konsol saat ini.</p>

<h3 spaces-before="0"><code> ELECTRON_memaksa_jendela_MENU_BAR </ 0>  <em x-id="4"> Linux </ 1></h3>

<p spaces-before="0">Jangan gunakan menu bar global di Linux.</p>

<h3 spaces-before="0"><code>ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`



## Variabel Pembangunan

Variabel lingkungan berikut ditujukan terutama untuk keperluan pengembangan dan debugging.




### `ELECTRON_memungkinkan_LOGGING`

Mencetak log internal Chrome ke konsol.



### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.



### `ELECTRON_memungkinkan_tumpuka _DUMPING`

Mencetak tumpukan jejak ke konsol saat Electron crash.

Variabel lingkungan ini tidak akan bekerja jika ` crashReporter </ 0> dimulai.</p>

<h3 spaces-before="0"><code> ELECTRON_DEFAULT_kesalahan_mode </ 0>  <em x-id="4"> jendela </ 1></h3>

<p spaces-before="0">Menunjukkan dialog crash Windows saat Electron crash.</p>

<p spaces-before="0">Variabel lingkungan ini tidak akan bekerja jika <code> crashReporter </ 0> dimulai.</p>

<h3 spaces-before="0"><code>ELECTRON_OVERRIDE_DIST_PATH`</h3> 

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Pemakaian:



```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
