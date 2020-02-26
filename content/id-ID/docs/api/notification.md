# Pemberitahuan

> Buat notifikasi desktop OS

Proses: [Main](../glossary.md#main-process)

## Menggunakan dalam proses renderer

Jika Anda ingin menampilkan Notifikasi dari proses renderer, Anda harus menggunakan  HTML5 Notification API </ 0></p> 

## Kelas: Pemberitahuan

> Buat notifikasi desktop OS

Proses: [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

Ini menciptakan baru ` Pemberitahuan </ 0> dengan sifat asli yang ditetapkan oleh <code> Pilihan </ 0> .</p>

<h3>Metode Statis</h3>

<p>Kelas <code> pemberitaun</ 0> memiliki metode statis berikut:</p>

<h4><code>Notification.isSupported()`</h4> 

Mengembalikan ` Boolean </ 0> - Apakah pemberitahuan desktop didukung pada sistem saat ini atau tidak</p>

<h3><code> Pemberitahuan baru ( [pilihan] ) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code>pilihan` Objek (opsional) 

* ` judul </ 0>  String - Judul untuk pemberitahuan, yang akan ditampilkan di bagian atas jendela pemberitahuan saat ditampilkan.</li>
<li><code>subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
* ` tubuh </ 0> String - bahasa teks visual, yang akan ditampilkan di bawah judul atau subjudul.</li>
<li><code>silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
* `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
* `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
* `timeoutType` String (optional) *Linux* *Windows* - The timeout duration of the notification. Can be 'default' or 'never'.
* `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
* `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
* `urgency` String (optional) *Linux* - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
* `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
* `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.</li> </ul> 

### Perihal contoh

Objek yang dibuat dengan ` Pemberitahuan baru </ 0> memancarkan peristiwa berikut:</p>

<p><strong> Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4>Acara: 'show'</h4>

<p>Returns:</p>

<ul>
<li><code>event` Sinyal</li> </ul> 

Emitted saat pemberitahuan ditunjukkan kepada pengguna, perhatikan bahwa ini dapat dipecat beberapa kali karena pemberitahuan dapat ditampilkan beberapa kali melalui metode ` menunjukan() </ 0> .</p>

<h4>Acara : 'klik'</h4>

<p>Mengirimkan:</p>

<ul>
<li><code>peristiwa` Peristiwa</li> </ul> 

Emitted saat notifikasi diklik oleh pengguna.

#### Acara : 'dekat'

Pengembalian:

* `event</ 0> Acara</li>
</ul>

<p>Emitted saat notifikasi ditutup dengan intervensi manual dari pengguna.</p>

<p>This event is not guaranteed to be emitted in all cases where the notification
is closed.</p>

<h4>Acara : 'balas' <em> macos </ 0></h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` balasan</ 0>  String - String yang dimasukkan pengguna ke kolom dibarisan balasan.</li>
</ul>

<p>Emitted saat pengguna mengklik tombol "Balas" pada notifikasi dengan <code> telah di balas: benar </ 0> .</p>

<h4>Acara: 'aktifkan' <em> macOS </ 0></h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` masukkan </ 0>  Nomor - Indeks tindakan yang diaktifkan.</li>
</ul>

<h3>Metode Contoh</h3>

<p>Objek yang dibuat dengan <code> Notifikasi baru </ 0> memiliki metode contoh berikut:</p>

<h4><code>pemberitahuan.menunjukkan ()`</h4> 
  Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.
  
  If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.
  
  #### `notification.close()`
  
  Dismisses the notification.
  
  ### Contoh properti
  
  #### `notification.title`
  
  A `String` property representing the title of the notification.
  
  #### `notification.subtitle`
  
  A `String` property representing the subtitle of the notification.
  
  #### `notification.body`
  
  A `String` property representing the body of the notification.
  
  #### `notification.replyPlaceholder`
  
  A `String` property representing the reply placeholder of the notification.
  
  #### `notification.sound`
  
  A `String` property representing the sound of the notification.
  
  #### `notification.closeButtonText`
  
  A `String` property representing the close button text of the notification.
  
  #### `notification.silent`
  
  A `Boolean` property representing whether the notification is silent.
  
  #### `notification.hasReply`
  
  A `Boolean` property representing whether the notification has a reply action.
  
  #### `notification.urgency` *Linux*
  
  A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  
  Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.
  
  #### `notification.timeoutType` *Linux* *Windows*
  
  A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.
  
  If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.
  
  #### `notification.actions`
  
  A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.
  
  ### Memutar Suara
  
  Di macos , Anda dapat menentukan nama suara yang ingin Anda putar saat pemberitahuan ditampilkan. Salah satu suara default (di bawah Preferensi Sistem> Suara) dapat digunakan, selain file suara khusus. Pastikan file suara disalin di bawah kumpulan aplikasi (misalnya, `App kamu .app/isi/sumber daya </ 0> ), atau salah satu dari lokasi berikut:</p>

<ul>
<li><code>~ / Perpustakaan / Suara`</li> 
  
  * `/ Perpustakaan / Suara`
  * `/ Jaringan / Perpustakaan / Suara`
  * `/ Sistem / Perpustakaan / Suara`</ul> 
  
  Lihat dokumen  NS suara </ 0> untuk informasi lebih lanjut.</p>