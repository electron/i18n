# ` File </ 0> Objek</h1>

<blockquote>
  <p>Gunakan API HTML5 <code> File </ 0>  untuk bekerja secara native dengan file pada file sistem.</p>
</blockquote>

<p>Antarmuka File DOM menyediakan abstraksi di sekitar file asli agar pengguna dapat mengerjakan file asli secara langsung dengan API file HTML5 . Elektron telah menambahkan atribut <code> path </ 0> ke antarmuka <code> File </ 0> yang menunjukkan path sebenarnya file pada file sistem.</p>

<p>Contoh mendapatkan jalur nyata dari file yang diseret-ke-aplikasi:</p>

<pre><code class="html">&lt;div id="holder"&gt;
   Tarik file Anda di sini
 </ 0> 

&lt;script&gt;
   document.addEventListener ('drop', function (e) {
     e.preventDefault ();
     e.stopPropagation ();

     untuk (biarkan f dari e.dataTransfer.files) {
       console.log ('File yang Anda seret di sini:', f.path)
     }
   });
  document.addEventListener ('dragover', function (e) {
     e.preventDefault ();
     e.stopPropagation ();
   });
</ 1>
`</pre>