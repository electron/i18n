# NotificationAction Object

* ` ketik </ 0>  String - Tipe tindakan, dapat <code> tombol </ 0> .</li>
<li><code> teks </ 0>  String - (opsional) Label untuk tindakan yang diberikan.</li>
</ul>

<h2>Platform / Action Support</h2>

<table>
<thead>
<tr>
  <th>tipe aksi</th>
  <th>Dukungan Platform</th>
  <th>Penggunaan <code> teks </ 0></th>
  <th>Default <code> teks </ 0></th>
  <th>Keterbatasan</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>tombol`</td> 
    Maksimum satu tombol, jika multiple hanya diberikan yang terakhir digunakan. Tindakan ini juga incomptible dengan  hasReply </ 0> dan akan diabaikan jika <code> hasReply </ 0> yaitu <code> benar </ 0> .</td>
</tr>
</tbody>
</table>

<h3>Dukungan tombol pada macos</h3>

<p>In order for extra notification buttons to work on macOS your app must meet the
following criteria.</p>

<ul>
<li>Aplikasi ditandatangani</li>
<li>App memilikinya <code> NSUserNotificationAlertStyle </ 0> disetel ke <code> alert </ 0> di <code> info.plist </ 0> .</li>
</ul>

<p>Jika salah satu dari persyaratan ini tidak terpenuhi maka tombolnya tidak akan muncul.</p>