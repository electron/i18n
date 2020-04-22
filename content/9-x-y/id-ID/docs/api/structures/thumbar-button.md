# Objek Tombol Thumbar

* ` ikon </ 0>  <a href="../native-image.md"> NativeImage </ 1> - Ikon ditampilkan di toolbar thumbnail.</p></li>
<li><p spaces-before="0"><code> klik </ 0> Fungsi</p></li>
<li><code> tooltip </ 0>  String (opsional) - Teks tooltip tombol.</li>
<li><code>flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.</li> </ul>

The ` bendera </ 0> adalah array yang yang dapat mencakup berikut <code> String </ 0> s:</p>

<ul>
<li><code> diaktifkan </ 0> - Tombol aktif dan tersedia untuk pengguna.</li>
<li><p spaces-before="0"><code>disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.</li>
* ` dismissonclick </ 0> - Saat tombol diklik, jendela thumbnail segera ditutup.</p></li>
<li><p spaces-before="0"><code> nobackground </ 0> - Jangan menggambar batas tombol, gunakan hanya gambarnya.</p></li>
<li><code> hidden </ 0> - Tombol tidak ditunjukkan ke pengguna.</li>
<li><code>noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.</li> </ul>
