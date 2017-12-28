## Kelas: BrowserWindowProxy

> Memanipulasi jendela browser anak

Process: [Renderer](../glossary.md#renderer-process)

Objek ` BrowserWindowProxy </ 0> dikembalikan dari <code> window.open </ 0> dan menyediakan
fungsi terbatas dengan jendela anak.</p>

<h3>Metode Instance</h3>

<p>Objek <code> BrowserWindowProxy </ 0> memiliki metode contoh berikut:</p>

<h4><code>win.blur ()`</h4> 

Menghapus fokus dari jendela anak.

#### `win.close ()`

Memaksa menutup jendela anak tanpa memanggil acara bongkar muatnya.

#### `win.eval (kode)`

* ` kode </ 0> String</li>
</ul>

<p>Mengevaluasi kode di jendela anak.</p>

<h4><code>win.focus ()`</h4> 
    Memfokuskan jendela anak (membawa jendela ke depan).
    
    #### `win.print ()`
    
    Meminta dialog cetak pada jendela anak.
    
    #### `win.postMessage (pesan, targetOrigin)`
    
    * ` pesan </ 0> String</li>
<li><code> targetOrigin </ 0> String</li>
</ul>

<p>Mengirim pesan ke jendela anak dengan asal yang ditentukan atau <code> * </ 0> untuk no
preferensi asal</p>

<p>Selain metode ini, jendela anak menerapkan objek <code> window.opener </ 0>
tanpa sifat dan metode tunggal.</p>

<h3>Instance Properties</h3>

<p>Objek <code> BrowserWindowProxy </ 0> memiliki properti contoh berikut:</p>

<h4><code>menang`</h4> 
        A  Boolean </ 0> yang disetel ke true setelah jendela anak ditutup.</p>