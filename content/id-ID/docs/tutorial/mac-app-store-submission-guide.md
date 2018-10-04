# Panduan Pengiriman Mac App Store

Sejak v0.34.0, Electron mengizinkan pengiriman aplikasi yang dikemas ke Mac App Store (MAS). Panduan ini memberikan informasi tentang: bagaimana cara mengirimkan aplikasi Anda dan keterbatasan MAS membangun.

**Note:** Mengirimkan aplikasi ke Mac App Store memerlukan pendaftaran [ Apple Developer Program ](https://developer.apple.com/support/compare-memberships/), yang membutuhkan biaya.

## Cara Mengirimkan Aplikasi Anda

Langkah-langkah berikut mengenalkan cara mudah untuk mengirimkan aplikasi Anda ke Mac App Store. Namun, langkah-langkah ini tidak memastikan aplikasi Anda akan disetujui oleh Apple; kamu Masih perlu membaca Apple [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) panduan di bagaimana cara memenuhi persyaratan Mac App Store.

### Dapatkan Sertifikat

Untuk mengirimkan aplikasi Anda ke Mac App Store, pertama Anda harus mendapatkan sertifikat dari Apel. Anda bisa mengikuti ini [existing guides](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) di web.

### Dapatkan ID Tim

Sebelum menandatangani aplikasi Anda, Anda perlu mengetahui ID Tim akun Anda. Untuk menemukan ID Tim Anda, Masuk ke [Apple Developer Center](https://developer.apple.com/account/), dan klik Membership di sidebar. ID Tim Anda muncul di Keanggotaan Bagian informasi dengan nama tim.

### Tanda Tangani Aplikasi

Setelah menyelesaikan pekerjaan persiapan, Anda dapat mengemas aplikasi Anda dengan mengikuti [ Distribusi Aplikasi ](application-distribution.md), lalu lanjutkan ke menandatangani aplikasi Anda.

Pertama, Anda harus menambahkan kunci `ElektronTeamID` ke aplikasi `Info.plist`, yang memiliki ID Tim Anda sebagai nilai:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Kemudian, Anda perlu menyiapkan tiga file hak.

`child.plist`:

```xml
<? versi xml = "1.0" pengkodean = "UTF-8"? ><! DOCTYPE plist umum "-//Apple//DTD PLIST 1.0 / / EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" > <plist version="1.0"><dict><key>com.apple.security.app-sandbox</key> <true/> <key>com.apple.security.inherit</key> <true/></dict></plist>
```

`parent.plist`:

```xml
<? versi xml = "1.0" pengkodean = "UTF-8"? ><! DOCTYPE plist umum "-//Apple//DTD PLIST 1.0 / / EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" > <plist version="1.0"><dict><key>com.apple.security.app-sandbox</key> <true/> <key>com.apple.security.application-kelompok</key> <string>TEAM_ID.your.bundle.id</string></dict></plist>
```

`loginhelper.plist`:

```xml
<? versi xml = "1.0" pengkodean = "UTF-8"? ><! DOCTYPE plist umum "-//Apple//DTD PLIST 1.0 / / EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" > <plist version="1.0"><dict><key>com.apple.security.app-sandbox</key> <true/></dict></plist>
```

Anda harus mengganti `TEAM_ID` dengan ID Tim Anda, dan ganti ` your.bundle.id` dengan ID Bundle aplikasi Anda.

Dan kemudian masuki aplikasi Anda dengan skrip berikut:

```sh
#! / bin / Bash

# nama aplikasi anda.
aplikasi = "yourapp"
# jalan aplikasi Anda untuk masuk.
APP_PATH ="/path/to/YourApp.app" # Jalan ke lokasi yang ingin Anda gunakan untuk memasukkan paket yang ditandatangani.
RESULT_PATH="~/Desktop/$APP.pkg"
# Nama sertifikat yang Anda minta.
APP_KEY ="Aplikasi Pengembang Mac Pihak ke-3: Nama Perusahaan (APPIDENTITY)" INSTALLER_KEY="Installer Pengembang Mac Pihak Ketiga: Nama Perusahaan (APPIDENTITY)" # Jalan file plist anda.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Jika Anda baru mengenal aplikasi sandboxing di bawah macos, Anda juga harus membaca Apple's [Mengaktifkan App Sandbox ](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) untuk memiliki ide dasar, tambahkan kunci untuk izin yang dibutuhkan oleh aplikasi Anda ke file hak.

Terlepas dari penandatanganan aplikasi Anda secara manual, Anda juga dapat memilih untuk menggunakan modul [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) untuk melakukan pekerjaan itu.

#### Masuki Modul Asli

Modul asli yang digunakan di aplikasi Anda juga perlu ditandatangani. Jika menggunakan tanda elektron-osx, pastikan untuk menyertakan jalan ke binari yang dibangun di dalamnya daftar argumen:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Perhatikan juga bahwa modul asli mungkin memiliki file antara yang dihasilkan yang seharusnya tidak disertakan (karena mereka juga perlu ditandatangani). Jika Anda menggunakan [elektron-packager](https://github.com/electron-userland/electron-packager) sebelum versi 8.1.0, tambahkan `--ignore=.+\.o$` ke langkah membangun Anda untuk mengabaikan berkas-berkas ini. Versi 8.1.0 dan yang lebih baru mengabaikan file tersebut secara default.

### Upload Aplikasi Anda

Setelah menandatangani aplikasi Anda, Anda dapat menggunakan Application Loader untuk mengunggahnya ke iTunes hubungkan untuk diproses, pastikan Anda telah membuat [membuat catatan](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html)sebelum mengunggah.

### Kirimkan Aplikasi Anda untuk Diperiksa

Setelah langkah ini, anda dapat [ mengirimkan aplikasi untuk ditinjau](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Keterbatasan MAS Build

Untuk memenuhi semua persyaratan untuk sandboxing aplikasi, modul berikut telah dinonaktifkan dalam MAS build:

* `kerusakanReporter`
* `autoUpdater`

dan perilaku berikut telah diubah:

* Penangkapan video mungkin tidak bekerja untuk beberapa mesin.
* Beberapa fitur aksesibilitas tertentu mungkin tidak bekerja.
* Aplikasi tidak akan mengetahui perubahan DNS.

Selain itu, karena penggunaan sandboxing aplikasi, sumber daya yang bisa diakses oleh aplikasi ini sangat terbatas; kamu bisa membaca [App Sandboxing](https://developer.apple.com/app-sandboxing/) untuk informasi lebih lanjut.

### Tambahan Entitlements

Bergantung pada API Elektron yang digunakan aplikasi Anda, Anda mungkin perlu menambahkan tambahan hak untuk berkas`parent.plist` agar dapat menggunakan API ini dari blog aplikasi Mac App Store anda dibuat.

#### Internet akses

Aktifkan koneksi jaringan keluar untuk memungkinkan aplikasi Anda terhubung ke server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Aktifkan koneksi jaringan masuk agar aplikasi Anda dapat membuka jaringan soket mendengarkan:

```xml
<key>com.apple.security.network.server</key> <true/>
```

Lihat [Mengaktifkan dokumentasi Akses Jaringan](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) untuk lebih jelasnya.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key> <true/>
```

Lihat [Mengaktifkan dokumentasi Akses Berkas yang Dipilih Pengguna](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) untuk lebih jelasnya.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Lihat [Mengaktifkan dokumentasi Akses Berkas yang Dipilih Pengguna](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) untuk lebih jelasnya.

## Algoritma Kriptografi yang Digunakan oleh Elektron

Tergantung pada negara dan wilayah yang Anda berada, Mac App Store mungkin memerlukan mendokumentasikan algoritma kriptografi yang digunakan dalam aplikasi Anda, dan bahkan meminta Anda untuk mengirimkan salinan persetujuan US enkripsi pendaftaran (ERN).

Elektron menggunakan algoritma kriptografi berikut:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [ RFC 3394 ](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62-2005
* ECDH - ANS X9.63-2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [ RFC 2612 ](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "Di Desain dan Keamanan Blok Ciphers" oleh X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

Cara mendapatkan persetujuan ERN, Anda bisa merujuk artikelnya: [Bagaimana memasukkan aplikasi ke Apple App Store secara legal saat menggunakan enkripsi (atau cara mendapatkan ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).