# NotificationAction Object

* `type</ 0>  String - Tipe tindakan, bisa dengan <code>button</ 0> .</li>
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
    </tr> </tbody> </table> 
    ### Dukungan tombol pada macos
    
    In order for extra notification buttons to work on macOS your app must meet the following criteria.
    
    * Aplikasi telah ditandatangani
    * App memilikinya  NSUserNotificationAlertStyle </ 0> disetel ke <code> alert </ 0> di <code> info.plist </ 0> .</li>
</ul>

<p>Jika salah satu dari persyaratan ini tidak terpenuhi maka tombolnya tidak akan muncul.</p>