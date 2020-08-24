# ` File </ 0> Objek</h1>

<blockquote spaces-before="0">
  <p spaces-before="0">Gunakan API HTML5 <code> File </ 0>  untuk bekerja secara native dengan file pada file sistem.</p>
</blockquote>

<p spaces-before="0">Antarmuka File DOM menyediakan abstraksi di sekitar file asli agar pengguna dapat mengerjakan file asli secara langsung dengan API file HTML5 . Elektron telah menambahkan atribut <code> path </ 0> ke antarmuka <code> File </ 0> yang menunjukkan path sebenarnya file pada file sistem.</p>

<p spaces-before="0">Contoh mendapatkan jalur nyata dari file yang diseret-ke-aplikasi:</p>

<pre><code class="html"><div id="holder">
  Drag your file here
</div>

<script>
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
`</pre>
