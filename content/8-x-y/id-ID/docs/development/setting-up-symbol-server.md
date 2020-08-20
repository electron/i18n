# Menyiapkan Symbol Server di Debugger

Simbol Debug memungkinkan Anda melakukan sesi debugging yang lebih baik. Mereka memiliki informasi tentang fungsi yang terdapat dalam executables dan dynamic library dan memberi Anda informasi untuk mendapatkan clean call stack. Symbol Server memungkinkan debugger memuat simbol, binari dan sumber yang benar secara otomatis tanpa memaksa pengguna mendownload file debugging besar. Fungsi server seperti server simbol Microsoft </ 0> sehingga dokumentasi dapat bermanfaat.</p> 

Perhatikan bahwa karena Elektron yang dibebaskan dibangun sangat dioptimalkan, debugging tidak selalu mudah. Debugger tidak dapat menampilkan konten semua variabel dan jalur eksekusi bisa terasa aneh karena inlining, panggilan ekor, dan pengoptimalan komplotan lainnya. Satu-satunya solusi adalah membangun bangunan lokal yang tidak dioptimalkan .

URL server simbol resmi untuk Elektron adalah https: // electron -symbols.githubapp.com. Anda tidak dapat mengunjungi URL ini secara langsung, Anda harus menambahkannya ke jalur simbol alat debugging Anda. Pada contoh di bawah ini, direktori cache lokal digunakan untuk menghindari pengambilan PDB dari server secara berulang kali. Ganti ` c: \ code \ simbol </ 0> dengan direktori cache yang sesuai pada mesin Anda.</p>

<h2 spaces-before="0">Menggunakan Symbol Server di Windbg</h2>

<p spaces-before="0">Jalur simbol Windbg dikonfigurasi dengan nilai string yang dibatasi dengan karakter tanda bintang. Untuk hanya menggunakan server simbol Elektron , tambahkan entri berikut ke jalur simbol Anda ( <strong x-id="1"> Catatan: </ 0> Anda dapat mengganti <code> c: \ code \ symbols </ 1> dengan direktori yang dapat ditulis di komputer Anda, jika Anda lebih memilih lokasi yang berbeda untuk simbol yang diunduh):</p>

<pre><code class="powershell">SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
`</pre> 

Tetapkan string ini sebagai ` _NT_SYMBOL_PATH </ 0> di lingkungan, dengan menggunakan menu Windbg, atau dengan mengetikkan perintah <code> .sympath </ 0> . Jika Anda ingin mendapatkan simbol dari server simbol Microsoft juga, Anda harus mencantumkannya terlebih dulu:</p>

<pre><code class="powershell">SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
`</pre> 



## Menggunakan server simbol dalam Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' />

<img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />



## Mengatasi masalah: Simbol tidak akan dimuat

Ketik perintah berikut di Windbg untuk mencetak mengapa simbol tidak dimuat:



```powershell
> !sym noisy
> .reload /f electron.exe
```
