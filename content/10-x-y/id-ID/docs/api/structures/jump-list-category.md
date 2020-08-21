# Objek JumpListCategory

* `type` String (opsional) - Salah satu dari:
  * `tasks` - Items in this category will be placed into the standard `Tasks` category. Hanya ada satu kategori seperti itu, dan itu akan selalu ditampilkan di bagian bawah Daftar Langsung.
  * `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
  * ` recent </ 0> - Menampilkan daftar file yang baru dibuka oleh aplikasi, nama kategori dan itemnya ditetapkan oleh Windows . Item dapat ditambahkan ke kategori ini secara tidak langsung menggunakan <code> app.addRecentDocument (path) </ 0> .</li>
<li><code> custom </ 0> - Menampilkan daftar tugas atau file, <code> nama </ 0> harus ditetapkan oleh aplikasi.</li>
</ul></li>
<li><p spaces-before="0"><code> name </ 0>  String (opsional) - Harus ditetapkan jika <code> ketik </ 0> adalah <code> custom </ 0> , jika tidak maka itu harus dihilangkan.</p></li>
<li><p spaces-before="0"><code> item </ 0> JumpListItem [] (opsional) - Array dari <a href="jump-list-item.md"><code> JumpListItem </ 1> benda jika <code> ketik </ 0> adalah <code> tugas </ 0> atau
 <code> kustom < / 0> , jika tidak maka harus dihilangkan.</p></li>
</ul>

<p spaces-before="0"><strong x-id="1"> Catatan: </ 0> Jika objek <code> JumpListCategory </ 1> tidak memiliki <code> tipe </ 1> atau <code> nama </ 1> 
properti yang ditetapkan maka <code> tipe < / 1> diasumsikan <code> tugas </ 1> . If the <code>name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.</p>
