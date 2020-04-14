# Task Object

* ` program </ 0> String - Jalur program untuk dijalankan, biasanya Anda harus menentukan <code> process.execPath </ 0> yang akan membuka program saat ini.</li>
<li><code> argumen </ 0>  String - Argumen baris perintah saat <code> program </ 0> dijalankan.</li>
<li><code> judul </ 0>  String - The String yang akan ditampilkan dalam Jumplist a.</li>
<li><code> deskripsi </ 0>  String - Uraian tugas ini.</li>
<li><code> iconPath </ 0>  String - Path absolut ke ikon yang akan ditampilkan di JumpList, yang bisa menjadi file sumber sembarangan yang berisi ikon. Anda biasanya dapat menentukan <code> process.execPath </ 0> untuk menampilkan ikon program.</li>
<li><code> iconIndex </ 0>  Number - Indeks ikon pada file icon. Jika file ikon terdiri dari dua ikon atau lebih, tetapkan nilai ini untuk mengidentifikasi ikonnya. Jika file icon terdiri dari satu ikon, nilai ini adalah 0.</li>
<li><code>workingDirectory` String (optional) - The working directory. Default is empty.