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

### `GOOGLE_API_kunci`

Elektron mencakup kunci API hardcoded untuk mengajukan permintaan ke layanan web geokode Google. Karena kunci API ini disertakan dalam setiap versi Elektron , ini seringkali melebihi kuota pemakaiannya. Untuk mengatasi masalah ini, Anda dapat menyediakan kunci Google API Anda sendiri di lingkungan. Tempatkan kode berikut di file proses utama Anda, sebelum membuka jendela browser yang akan membuat permintaan geocoding:

```javascript
proses.env.GOOGLE_API_kunci = 'kamu_kunci_di sini'
```

Untuk petunjuk tentang cara mendapatkan kunci Google API , kunjungi  halaman ini </ 0> .</p> 

Secara default, kunci Google API yang baru dibuat mungkin tidak diizinkan untuk membuat permintaan geocoding. Untuk mengaktifkan permintaan geocoding, kunjungi  halaman ini </ 0> .</p> 

### `ELEKTRON_tidak_ASAR`

Nonaktifkan dukungan ASAR . Variabel ini hanya didukung pada proses anak bercabang dan melahirkan proses anak yang menetapkan ` ELECTRON_menjalankan_sebagai_NODE </ 0> .</p>

<h3><code>ELECTRON_menjalankan_sebagai_NODE`</h3> 

Mulai proses sebagai proses Node.js normal.

### ` ELECTRON_tidak_melapirkan_menghibur </ 0>  <em> jendela</ 1></h3>

<p>Jangan lampirkan sesi konsol saat ini.</p>

<h3><code> ELECTRON_memaksa_jendela_MENU_BAR </ 0>  <em> Linux </ 1></h3>

<p>Jangan gunakan menu bar global di Linux.</p>

<h2>Variabel Pembangunan</h2>

<p>Variabel lingkungan berikut ditujukan terutama untuk keperluan pengembangan dan debugging.</p>

<h3><code>ELECTRON_memungkinkan_LOGGING`

Mencetak log internal Chrome ke konsol.

### `ELECTRON_LOG_ASAR_READS`

Ketika Elektron membaca dari file ASAR , log membaca mengimbangi dan jalankan file ke sistem ` tmpdir </ 0> . File yang dihasilkan dapat diberikan ke modul ASAR untuk mengoptimalkan pemesanan file.</p>

<h3><code>ELECTRON_memungkinkan_tumpuka _DUMPING`</h3> 

Mencetak tumpukan jejak ke konsol saat Electron crash.

Variabel lingkungan ini tidak akan bekerja jika  crashReporter </ 0> dimulai.</p>

<h3><code> ELECTRON_DEFAULT_kesalahan_mode </ 0>  <em> jendela </ 1></h3>

<p>Menunjukkan dialog crash Windows saat Electron crash.</p>

<p>Variabel lingkungan ini tidak akan bekerja jika <code> crashReporter </ 0> dimulai.</p>