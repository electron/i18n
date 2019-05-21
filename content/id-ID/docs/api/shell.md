# kulit

> Kelola file dan URL menggunakan aplikasi bawaan mereka.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

The `shell` modul menyediakan fungsi yang berkaitan dengan integrasi desktop.

Contoh membuka URL di browser default pengguna:

```javascript
const { shell } = require('electron') shell.openExternal ('https://github.com')
```

## Methods

The `shell` modul memiliki metode berikut:

### `shell.showItemInFolder (fullPath)`

* `fullPath` String

Mengembalikan `Boolean` - Apakah item berhasil ditampilkan.

Tampilkan file yang diberikan di file manager. Jika memungkinkan, pilih file.

### `shell.openItem(fullPath)`

* `fullPath` String

Mengembalikan `Boolean` - Apakah item berhasil dibuka.

Buka file yang diberikan dengan cara default desktop.

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Objek (opsional) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `pilihan` Objek (opsional) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemUntukSampah(JalurPenuh)`

* `fullPath` String

Kembali `Boolean` - Apakah item berhasil dipindahkan ke tempat sampah.

Pindahkan file yang diberikan ke sampah dan mengembalikan status boolean untuk pengoperasiannya.

### `Shell.beep()`

Bermain suara bip.

### `shell.writeShortcutLink (shortcutPath [, operasi], pilihan)` *Windows*

* `shortcutPath` String
* `operasi` String (opsional) - Default adalah `membuat`, bisa jadi salah satu dari berikut ini: 
  * `buat` - membuat shortcut baru, Timpa jika diperlukan.
  * `update` - update ditentukan properti hanya pada tombol cepat yang ada.
  * `menggantikan` - menimpa tombol cepat yang ada, gagal jika tidak ada jalan pintas.
* `pilihan` [ShortcutDetails](structures/shortcut-details.md)

Kembali `Boolean` - Apakah cara pintas telah dibuat berhasil.

Membuat atau memperbarui tautan pintasan di `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Kembali [`ShortcutDetails`](structures/shortcut-details.md)

Menyelesaikan link pintasan di `shortcutPath`.

Pengecualian akan dilemparkan ketika terjadi kesalahan.