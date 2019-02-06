# Menggunakan Modul Node Asli

Modul Node asli didukung oleh Elektron, namun karena Elektron sangat Kemungkinan menggunakan versi V8 yang berbeda dari biner Node yang terpasang di komputer Anda sistem, Anda harus secara manual menentukan lokasi header Elektron saat membangun modul asli.

## Cara menginstal modul asli

Tiga cara untuk menginstal modul asli:

### Menggunakan `npm`

Dengan menetapkan beberapa variabel lingkungan, Anda dapat menggunakan `npm` untuk menginstal modul langsung.

Contoh pemasangan semua dependensi untuk Electron:

```sh
# Versi Elektron.
ekspor npm_config_target=1.2.3
# Arsitektur Elektron, bisa jadi ia32 atau x64.
ekspor npm_config_arch=x64
ekspor npm_config_target_arch=x64
# Download header untuk Electron.
ekspor npm_config_disturl=https://atom.io/download/electron
# Beritahu node-pre-gyp yang sedang kita bangun untuk Electron.
ekspor npm_config_runtime = elektron
# Beritahu node-pre-gyp untuk membuat modul dari kode sumber.
ekspor npm_config_build_from_source=true
# Instal semua dependensi, dan simpan cache ke ~/.electron-gyp.
HOME = ~/.electron-gyp npm install
```

### Memasang modul dan membangun kembali untuk Elektron

Anda juga dapat memilih untuk menginstal modul seperti proyek Node lainnya, dan kemudian buat kembali modul untuk Elektron dengan [`elektron-rebuild`](https://github.com/paulcbetts/electron-rebuild) paket. Modul ini bisa mendapatkan versi Elektron dan menangani langkah manual mendownload header dan membuat modul asli untuk aplikasi Anda.

Contoh menginstal `elektron-rebuild` dan kemudian membangun kembali modul dengan itu:

```sh
npm install --save-dev elektron-rebuild

# Setiap kali Anda menjalankan "npm install", jalankan ini:
./node_modules/.bin/electron-rebuild

# Pada Windows jika Anda mengalami masalah, coba:
. \node_modules\.bin\electron-rebuild.cmd
```

### Membangun secara manual untuk Elektron

Jika Anda seorang pengembang yang mengembangkan modul asli dan ingin mengujinya Elektron, Anda mungkin ingin membangun kembali modul untuk Elektron secara manual. Kamu bisa gunakan `node-gyp` langsung untuk membangun Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

Perubahan `HOME=~/.electron-gyp` di mana menemukan header pengembangan. Itu `--target=1.2.3` adalah versi Elektron. `-dist-url =...` menentukan tempat untuk mendownload header. Modul `-arch=x64` mengatakan bahwa modul ini dibuat Sistem 64bit.

### Manually building for a custom build of Electron

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## Penyelesaian masalah

Jika Anda menginstal modul asli dan merasa tidak berfungsi, Anda perlu memeriksa hal berikut:

- Arsitektur modul harus sesuai dengan arsitektur Elektron (ia32 atau x64).
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Setelah Anda mengupgrade Electron, Anda biasanya perlu membangun kembali modul.
- Bila ragu, jalankan `elektron-rebuild` terlebih dahulu.

### A note about `win_delay_load_hook`

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Modul yang mengandalkan `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Jika modul menyediakan binari untuk penggunaan di Elektron, pastikan untuk menghilangkan `--build-from-source` dan lingkungan `npm_config_build_from_source` variabel untuk memanfaatkan sepenuhnya binari prebuilt.

## Modul yang mengandalkan `node-pre-gyp`

[`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp)menyediakan cara untuk menyebarkan Node asli modul dengan binari prebuilt, dan banyak modul populer menggunakannya.

Biasanya modul tersebut bekerja dengan baik di bawah Elektron, tapi terkadang saat Elektron menggunakan versi V8 yang lebih baru daripada Node, dan ada perubahan ABI, hal buruk mungkin terjadi terjadi. Jadi secara umum dianjurkan untuk selalu membangun modul asli dari Kode sumber.

Jika Anda mengikuti cara menginstal modul `npm`, maka hal ini dilakukan Secara default, jika tidak, Anda harus melewati `--build-from-source` ke `npm`, atau atur `npm_config_build_from_source` variabel lingkungan.