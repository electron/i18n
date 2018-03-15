# aplikasi

> Kendalikan siklus hidup kejadian aplikasi Anda.

Proses: [Utama](../glossary.md#main-process)

Contoh berikut ini menunjukkan bagaimana untuk keluar dari aplikasi ketika jendela terakhir ditutup:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Kejadian

Objek `aplikasi` memancarkan kejadian-kejadian berikut:

### Kejadian: 'will-finish-launching'

Dipancarkan saat aplikasi telah menyelesaikan proses awal mula dasar. Pada Windows dan Linux, kejadian `will-finish-launching` sama dengan kejadian `ready`; di macOS, kejadian ini mewakili pemberitahuan `applicationWillFinishLaunching` dari `NSApplication`. Anda biasanya akan menyiapkan pendengar untuk kejadian `open-file` dan `open-url` di sini, dan memulai pelapor crash dan pemutakhir otomatis.

Dalam kebanyakan kasus, Anda mestinya hanya melakukan semuanya dalam pemroses kejadian `ready`.

### Kejadian: 'ready'

Mengembalikan:

* `launchInfo` Object *macOS*

Emitted ketika Elektron selesai menginisialisasi. Di macos , ` launchInfo </ 0> memegang <code> userInfo </ 0> dari <code> NSUserNotification </ 0> yang digunakan untuk membuka aplikasi, jika diluncurkan dari Notification Center. Anda dapat menghubungi <code> app.isReady () </ 0> untuk memeriksa apakah acara ini telah dipecat.</p>

<h3>Acara : 'window-all-closed'</h3>

<p>Emitted ketika semua jendela telah ditutup.</p>

<p>Jika Anda tidak berlangganan acara ini dan semua jendela ditutup, perilaku defaultnya adalah berhenti dari aplikasi; Namun, jika Anda berlangganan, Anda mengontrol apakah aplikasi berhenti atau tidak. Jika pengguna menekan <code> Cmd + Q </ 0> , atau pengembang yang disebut
 <code> app.quit () </ 0> , Elektron pertama akan mencoba untuk menutup semua jendela dan kemudian memancarkan
 <code> akan- berhenti </ 0>  event , dan dalam hal ini <code> jendela-semua-ditutup </ 0>  acara tidak akan dipancarkan.</p>

<h3>Acara : 'sebelum-berhenti'</h3>

<p>Returns:</p>

<ul>
<li><code>event` Event</li> </ul> 

Emitted sebelum aplikasi mulai menutup jendela-jendelanya. Memanggil ` event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p><strong> Catatan: </ 0> Jika aplikasi berhenti diprakarsai oleh <code> autoUpdater.quitAndInstall () </ 1> 
lalu <code> sebelum-berhenti </ 1> dipancarkan <em> setelah </ 2> memancarkan < 1> dekat </ 1>  acara pada semua jendela dan menutup mereka.</p>

<h3>Acara : 'akan-berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code>peristiwa` Peristiwa</li> </ul> 

Emitted ketika semua jendela telah ditutup dan aplikasi akan berhenti. Memanggil ` event.preventDefault () </ 0> akan mencegah perilaku default, yang mengakhiri aplikasi.</p>

<p>Lihat deskripsi <code> jendela-semua-ditutup </ 0>  acara untuk perbedaan antara <code> akan-berhenti </ 0> dan <code> jendela-semua-ditutup </ 0> peristiwa.</p>

<h3>Acara : 'berhenti'</h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` exitCode </ 0> Integer</li>
</ul>

<p>Emitted saat aplikasi berhenti.</p>

<h3>Event : 'open-file' <em> macos </ 0></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* `path` String</ul> 

Emitted saat pengguna ingin membuka file dengan aplikasi. The ` open-file yang </ 0> 
event biasanya dipancarkan saat aplikasi sudah terbuka dan OS ingin menggunakan kembali aplikasi untuk membuka file. <code> open-file </ 0> juga dipancarkan saat sebuah file diturunkan ke dok dan aplikasi belum berjalan. Pastikan untuk mendengarkan <code> open-file yang </ 0> acara sangat awal di startup aplikasi Anda untuk menangani kasus ini (bahkan sebelum <code> siap </ 0>  acara dipancarkan).</p>

<p>Anda harus menghubungi <code>event.preventDefault()` jika Anda ingin menangani acara ini.

Pada Windows, Anda harus mengurai ` process.argv </ 0> (dalam proses utama) untuk mendapatkan filepath.</p>

<h3>Acara: 'buka-url' <em> macos </em></h3>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara</li> 

* ` url </ 0> String</li>
</ul>

<p>Emitted saat pengguna ingin membuka URL dengan aplikasi. File <code> Info.plist <code> aplikasi Anda
 harus menentukan skema url di dalam kunci <code> CFBundleURLTypes `, dan set ` NSPrincipalClass ` ke <0> AtomApplication </code>.</p> 
  Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  ### Acara: 'aktifkan' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `hasVisibleWindows` Boolean
  
  Emitted saat aplikasi diaktifkan. Berbagai tindakan dapat memicu acara ini, seperti meluncurkan aplikasi untuk pertama kalinya, mencoba meluncurkan ulang aplikasi saat sudah berjalan, atau mengklik ikon dok atau ikon taskbar.
  
  ### Acara: 'lanjutkan aktivitas' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
<li><code>ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` Objek - Berisi status spesifik aplikasi yang disimpan oleh aktivitas di perangkat lain.
  
  Emitted selama [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) saat aktivitas dari perangkat lain ingin dilanjutkan. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  Aktivitas pengguna hanya dapat dilanjutkan di aplikasi yang memiliki ID Tim pengembang yang sama dengan aplikasi sumber aktivitas dan yang mendukung jenis aktivitas. Jenis aktivitas yang didukung ditentukan di aplikasi `Info.plist` di bawah tombol `NSUserActivityTypes`.
  
  ### Event: 'will-continue-activity' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. Anda harus menghubungi `event.preventDefault()` jika Anda ingin menangani acara ini.
  
  ### Event: 'continue-activity-error' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `error` String - A string with the error's localized description.
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.
  
  ### Event: 'activity-was-continued' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
<li><code>ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` Object - Contains app-specific state stored by the activity.
  
  Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.
  
  ### Event: 'update-activity-state' *macOS*
  
  Pengembalian:
  
  * `acara` Acara
  * `ketik` String - String yang mengidentifikasi aktivitas. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
  * `userInfo` Object - Contains app-specific state stored by the activity.
  
  Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediatelly, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.
  
  ### Event: 'new-window-for-tab' *macOS*
  
  Pengembalian:
  
  * `event</ 0> Acara</li>
</ul>

<p>Emitted when the user clicks the native macOS new tab button. The new
tab button is only visible if the current <code>BrowserWindow` has a `tabbingIdentifier`</p> 
    ### Event: 'browser-window-blur'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>window` [BrowserWindow](browser-window.md)
    
    Emitted when a [browserWindow](browser-window.md) gets blurred.
    
    ### Event: 'browser-window-focus'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>window` [BrowserWindow](browser-window.md)
    
    Emitted when a [browserWindow](browser-window.md) gets focused.
    
    ### Event: 'browser-window-created'
    
    Mengembalikan:
    
    * `acara` Acara
    * `window` [BrowserWindow](browser-window.md)
    
    Emitted when a new [browserWindow](browser-window.md) is created.
    
    ### Event: 'web-contents-created'
    
    Mengembalikan:
    
    * `event</ 0> Acara</li>
<li><code>webContents` [WebContents](web-contents.md)
    
    Emitted when a new [webContents](web-contents.md) is created.
    
    ### Acara: 'sertifikat-kesalahan'
    
    Pengembalian:
    
    * `event</ 0> Acara</li>
<li><code>webContents` [WebContents](web-contents.md)
    * ` url </ 0> String</li>
<li><code>error` String - Kode kesalahan
    * `sertifikat` [Sertifikat](structures/certificate.md)
    * `callback` Fungsi 
      * `isTrusted` Boolean - Whether to consider the certificate as trusted
    
    Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.preventDefault()` and call `callback(true)`.
    
    ```javascript
const {app} = require ('electron') app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
   if (url === 'https://github.com') {
     // Verifikasi logika.
    event.preventDefault()
     callback(true)
   } else {
     callback (false)
   }})
```

### Acara: 'pilih-klien-sertifikat'

Pengembalian:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Sertifikat[]](structures/certificate.md)
* `callback` Fungsi 
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emitted ketika sertifikat klien diminta.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

```javascript
const {app} = require('electron') app.on('select-client-certificate', (event, webContents, url, list, callback) => {
 event.preventDefault()
 callback(daftar[0]) 
})    
```

### Acara: 'login'

Mengembalikan:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `permintaan` Sasaran 
  * `method` String
  * `url` URL
  * `perujuk` URL
* `authInfo` Sasaran 
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Fungsi 
  * `namapengguna` String
  * `katasandi` String

Emitted ketika `webContents` ingin melakukan auth dasar.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const {app} = require('electron') app.on('login', (event, webContents, request, authInfo, callback) => {
 event.preventDefault()
 callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Mengembalikan:

* `event` Event
* `terbunuh` Boolean

Emitted when the gpu process crashes or is killed.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Mengembalikan:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See https://www.chromium.org/developers/design-documents/accessibility for more details.

## Metode

The `app` object has the following methods:

**Catatan:** Beberapa metode hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking user and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `pilihan` Objek (pilihan) 
  * `args` String[] - (optional)
  * `execPath` String (optional)

Relaunches the app when current instance exits.

By default the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

```javascript
const {app} = require ('electron') app.relaunch({args: process.argv.slice(1).concat(['-- relaunch'])}) app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Hides all application windows without minimizing them.

### `app.show()` *macOS*

Shows application windows after they were hidden. Does not automatically focus them.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `nama` String

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

You can request the following paths by the name:

* `home` User's home directory.
* `appData` Per-user application data directory, which by default points to: 
  * `%APPDATA%` on Windows
  * `$XDG_CONFIG_HOME` or `~/.config` on Linux
  * `~/Library/Application Support` on macOS
* `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
* `temp` Temporary directory.
* `exe` The current executable file.
* `module` The `libchromiumcontent` library.
* `desktop` The current user's Desktop directory.
* `documents` Directory for a user's "My Documents".
* `downloads` Directory for a user's downloads.
* `music` Directory for a user's music.
* `pictures` Directory for a user's pictures.
* `videos` Directory for a user's videos.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.
### `app.getFileIcon(path[, options], callback)`

* `path` String
* `pilihan` Objek (pilihan) 
  * `ukuran` Tali 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
* `callback` Fungsi 
  * Kesalahan `kesalahan`
  * `ikon` [NativeImage](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `nama` String
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `nama` String

Overrides the current application's name.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Clears the recent documents list.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Mengembalikan `Boolean` - Apakah panggilan berhasil.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Mengembalikan `Boolean` - Apakah panggilan berhasil.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Mengembalikan `Boolean` - Apakah panggilan berhasil.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Mengembalikan `Objek`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.
### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

** Catatan: </ 0> Jika objek ` JumpListCategory </ 1> tidak memiliki <code> tipe </ 1> atau <code> nama </ 1> 
properti yang ditetapkan maka <code> tipe < / 1> diasumsikan <code> tugas </ 1> . If the <code>name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.</p> 

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const {app} = require ('electron') app.setJumpList([
   {
     type: 'custom',
     name: 'Proyek Terbaru',
     item: [
       {type: 'file', path: 'C:\\Projects\\project1.proj '},
       {type:' file ', path: 'C:\\Projects\\project2.proj '}
     ]
   },
   { // memiliki nama jadi `type` diasumsikan sebagai nama "custom"
 : 'Tools',
     item: [
       {
         type: 'task',
         title: 'Tool A',
         program: process.execPath,
         args: '--run-tool-a',
         icon: process.execPath,
         iconIndex: 0,
         deskripsi : 'Runs Tool A'
       },
       {
         type: 'task',
        judul: 'Alat B',
         program: process.execPath,
        args: '--run-tool-b',
         icon: process.execPath,
         iconIndex: 0,
         description: 'Runs Tool B'
       }
     ]
   },
 {type: 'frequent' },
 {// tidak memiliki nama dan tipe tidak ada Jadi `tipe` diasumsikan sebagai item "tugas": [
{
 type: 'task',
 title: 'New Project',
 program: process.execPath,
 args: '--new-project',
 deskripsi: 'Buat yang baru proyek.'
},
 {type: 'separator' },
{
 type: 'task',
 title: 'Recover Project',
 program: process.execPath,
 args: '--recover-project',
 deskripsi: 'Recover Project'
}
]
}
])
```

### `app.makeSingleInstance(callback)`

* `callback` Fungsi 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Returns `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron') biarkan myWindow = null const isSecondInstance = app.makeSingleInstance ((commandLine, workingDirectory) => {
   // Seseorang mencoba untuk menjalankan instance kedua, kita harus memusatkan jendela kita.
  jika (myWindow) {
     if (myWindow.isMinimized()) myWindow.restore()
     myWindow.focus()
   }}) if (isSecondInstance) {
   app.quit()} // buat myWindow, muat sisa aplikasi, dll...
app.on('siap', () => {})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. Maps ke [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `pilihan` Sasaran 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Fungsi 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Mengembalikan `Boolean` - Apakah panggilan berhasil.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `pilihan` Objek (pilihan) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Mengembalikan `Objek`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Sasaran 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Sebagai contoh:

```javascript
const appFolder = path.dirname(process.execPath) const updateExe = path.resolve(appFolder, '..', 'Update.exe') const exeName = path.basename(process.execPath) app.setLoginItemSettings ({
   openAtLogin: true,
   path: updateExe,
   args: [
     '--processStart', `"${exeName}"`,
     '--process-start-args', `"--hidden"`
   ]})
```

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `pilihan` Sasaran 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `identitas` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `format` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `teks` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Hides the dock icon.

### `app.dock.show()` *macOS*

Shows the dock icon.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `gambar` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.