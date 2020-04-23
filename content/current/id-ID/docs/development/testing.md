# Pengujian

Kami bertujuan untuk menjaga cakupan kode dalam Elektron tinggi. Kami meminta agar semua menarik Permintaan tidak hanya lulus semua tes yang sudah ada, tapi idealnya juga menambah tes baru untuk menutupi perubahan kode dan skenario skenario baru. Memastikan bahwa kita mengambarkan sebagai banyak jalur kode dan penggunaan kasus Elektron yang mungkin memastikan bahwa kita semua aplikasi berjalan dengan lebih sedikit bug.

Repositori ini dilengkapi dengan aturan linting untuk JavaScript dan C ++ - serta tes unit dan berintegrasi. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting

Untuk memastikan bahwa JavaScript Anda sesuai dengan gaya pengkodean Elektron, jalankan ` npm jalankan lint-js </ 0>, yang akan menjalankan <code> standar </ 0> terhadap kedua Elektron itu sendiri sekaligus sebagai bagian tes. Jika Anda menggunakan editor dengan plugin/addon sistem, Anda mungkin ingin menggunakan salah satu dari banyak <a href="https://standardjs.com/#are-there-text-editor-plugins"> StandardJS addons</a> untuk mengetahui pengkodean pelanggaran gaya sebelum Anda pernah melakukan mereka.</p>

<p spaces-before="0">Untuk menjalankan <code> standar </ 0> dengan parameter-parameternya, jalankan <code> npm run lint-js - </ 0> lalu diikuti oleh
argumen yang Anda inginkan untuk melewati ke <code> standar </ 0>.</p>

<p spaces-before="0">Untuk memastikan bahwa C ++ Anda sesuai dengan gaya pengkodean Elektron,
jalankan <code> npm jalankan lint-cpp </ 0>, yang menjalankan script <code> cpplint </ 0>. Kami merekomendasikan 
Anda menggunakan <code> clang-format </ 0> dan menyiapkan <a href="clang-format.md"> sebuah tutorial singkat </ 1>.</p>

<p spaces-before="0">There is not a lot of Python in this repository, but it too is governed
by coding style rules. <code>npm run lint-py` will check all Python, using `pylint` to do so.

## Pengujian unit

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

Untuk menjalankan semua unit test, jalankan ` npm jalankan test </ 0>. Tes unitnya adalah Elektron
aplikasi (surprise!) yang bisa ditemukan di folder <code> spasi </ 0>. Perhatikan bahwa itu mempunyai miliknya sendiri
<code> package.json </ 0> dan karena itu dependensinya tidak didefinisikan
di level atas <code> package.json </ 0>.</p>

<p spaces-before="0">To run only specific tests matching a pattern, run <code>npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices

#### Extra steps to run the unit test:

1. Visual Studio 2019 must be installed.
2. Node headers have to be compiled for your configuration.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. The electron.lib has to be copied as node.lib.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Missing fonts

[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:
1. Push the Windows key and search for _Manage optional features_.
2. Click _Add a feature_.
3. Select _Japanese Supplemental Fonts_ and click _Install_.

#### Pixel measurements

Some tests which rely on precise pixel measurements may not work correctly on devices with Hi-DPI screen settings due to floating point precision errors. To run these tests correctly, make sure the device is set to 100% scaling.

To configure display scaling:
1. Push the Windows key and search for _Display settings_.
2. Under _Scale and layout_, make sure that the device is set to 100%.
