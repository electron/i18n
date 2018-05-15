# Versi Elektronika

> Tampilan rinci tentang kebijakan dan implementasi versi kami.

Seperti versi 2.0.0, Electron mengikuti [semver](#semver). Perintah berikut akan menginstal stabil terbaru dari Electron:

```sh
peasangan npm --save-dev electron
```

Untuk memperbarui proyek yang ada untuk menggunakan versi stabil terbaru:

```sh
pemasangan npm --save-dev electron@latest
```

## Versi 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Meskipun mudah bagi pengembang yang menggabungkan fitur, ini menciptakan masalah bagi pengembang aplikasi yang menghadapi klien. Siklus pengujian QA dari aplikasi utama seperti Slack, Stride, Teams, Skype, VS Code, Atom , dan Desktop dapat berlangsung lama dan stabilitas adalah hasil yang sangat diinginkan. Ada risiko tinggi dalam mengadopsi fitur baru saat mencoba menyerap perbaikan bug.

Berikut adalah contoh strategi 1.x:

![](../images/versioning-sketch-0.png)

Aplikasi yang dikembangkan dengan `1.8.1` tidak dapat memperbaiki bug `1.8.3` tanpa menyerap fitur `1.8.2`, atau dengan membelokkan perbaikan dan mempertahankan baris rilis baru.

## Versi 2.0 dan Seterusnya

Ada beberapa perubahan besar dari strategi 1.x yang kami diuraikan di bawah ini. Setiap perubahan dimaksudkan untuk memenuhi kebutuhan dan prioritas pengembang/pengelola dan pengembang aplikasi.

1. Penggunaan semip yang ketat
2. Pengenalan semver-compliant `-beta`tag
3. Pengenalan [pesan komit konvensional](https://conventionalcommits.org/)
4. Well-defined stabilization branches
5. The `master` branch is versionless; only stabilization branches contain version information

Kami akan membahas secara rinci bagaimana cara kerja git branching, bagaimana penandaan npm bekerja, apa yang diharapkan pengembang untuk dilihat, dan bagaimana seseorang dapat mengubah backport.

# semver

Dari 2,0 dan seterusnya, Elektron akan mengikuti semver.

Berikut adalah tabel yang secara eksplisit memetakan jenis perubahan pada kategori semver mereka yang sesuai (mis. Major, Minor, Patch).

| Versi increment                | Versi minor                         | Versi Patch                       |
| ------------------------------ | ----------------------------------- | --------------------------------- |
| Elektron melanggar API berubah | Perubahan API non-breaking elektron | Perbaikan bug electron            |
| Node.js major version updates  | Node.js minor version updates       | Node.js patch version updates     |
| Pembaruan versi kromium        |                                     | memperbaiki kromium terkait patch |

Perhatikan bahwa kebanyakan update kromium akan dianggap melanggar. Perbaikan yang bisa di-backport kemungkinan akan dipilih ceri sebagai tambalan.

# Cabang Stabilisasi

Stabilisasi cabang adalah cabang yang berjalan sejajar dengan master, mengambil hanya cherry-mengambil komit yang berkaitan dengan keamanan atau stabilitas. Cabang-cabang ini tidak pernah tergabung kembali untuk dikuasai.

![](../images/versioning-sketch-1.png)

Cabang stabilisasi selalu baik **major** or **minor** versi baris, dan dinamai sesuai template berikut `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Kami mengizinkan beberapa cabang stabilisasi ada bersamaan, dan berniat untuk mendukung setidaknya dua secara paralel setiap saat, mendukung perbaikan sekuriti seperlunya. ![](../images/versioning-sketch-2.png)

Baris yang lebih tua tidak akan didukung oleh GitHub, namun kelompok lain dapat mengambil stabilitas kepemilikan dan stabilitas backport dan keamanan mereka sendiri. Kami mencegah hal ini, namun menyadari bahwa ini membuat hidup lebih mudah bagi banyak pengembang aplikasi.

# Rilis Beta dan Perbaikan Bug

Pengembang ingin mengetahui rilis mana yang *aman* untuk digunakan. Bahkan fitur yang tampaknya tidak berdosa bisa mengenalkan regresi dalam aplikasi yang kompleks. Pada saat bersamaan, penguncian ke versi tetap berbahaya karena anda mengabaikan tambalan keamanan dan perbaikan bug yang mungkin keluar sejak versi anda. Tujuan kami adalah membiarkan rangkaian standar berikut masuk `package.json` :

- Gunakan ` ~ 2.0.0 </ 0> untuk mengakui hanya perbaikan stabilitas atau keamanan terkait rilis Anda <code> 2.0.0 </ 0>.</li>
<li>Gunakan <code>^ 2.0.0` untuk mengakui fitur pekerjaan yang tidak melanggar * cukup stabil * serta perbaikan keamanan dan bug.

Yang penting dari poin kedua adalah aplikasi yang menggunakan ` ^` tetap dapat mengharapkan tingkat stabilitas yang masuk akal. Untuk mencapai hal ini, semver memungkinkan * pengenal pra-rilis * untuk menunjukkan versi tertentu belum *aman* atau * stabil*.

Apapun yang anda pilih, secara berkala Anda harus menemukan versi ` package.json ` karena melanggar perubahan adalah fakta kehidupan Chromium.

Prosesnya adalah sebagai berikut:

1. Semua baris rilis utama dan minor baru dimulai dengan `-beta.N` tag untuk `N >= 1`. Pada saat itu, set fitur adalah **terkunci**. Baris rilis itu tidak mengakui fitur lebih lanjut, dan hanya berfokus pada keamanan dan stabilitas. misalnya `2.0.0-beta.1`.
2. Perbaikan bug, perbaikan regresi, dan patch keamanan dapat diterima. Setelah melakukannya, beta baru dirilis `N`. Misalnya `2.0.0-beta.2`
3. Jika rilis beta tertentu *dianggap* stabil, maka akan dirilis ulang sebagai bangunan yang stabil, hanya mengubah informasi versi. misalnya `2.0.0`.
4. Jika perbaikan bug masa depan atau patch keamanan perlu dilakukan setelah rilis stabil, mereka menerapkannya dan versi *patch* bertambah misalnya `2.0.1`.

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Contoh siklus hidup dalam gambar:

- Cabang rilis baru dibuat yang mencakup rangkaian fitur terbaru. Ini diterbitkan menjadi` 2.0.0-beta.1 </ 0>.
<img src="../images/versioning-sketch-3.png" alt="" /></li>
<li>A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as <code>2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- Beta dianggap *umumnya stabil* dan diterbitkan lagi sebagai non-beta di bawah `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Beberapa contoh bagaimana berbagai rentang semver akan mengambil rilis baru:

![](../images/versioning-sketch-7.png)

# Fitur yang Hilang: Alphas, dan Nightly

Strategi kami memiliki beberapa pengorbanan, yang untuk saat ini kami merasa sesuai. Yang paling penting bahwa fitur baru di master mungkin memerlukan beberapa saat sebelum mencapai garis rilis yang stabil. Jika Anda ingin segera mencoba fitur baru, Anda harus membangun Elektron sendiri.

Sebagai pertimbangan di masa depan, kami dapat memperkenalkan satu atau kedua hal berikut:

- malam membangun dari tuan; ini akan memungkinkan orang untuk menguji fitur baru dengan cepat dan memberikan umpan balik
- rilis alpha yang memiliki batasan stabilitas yang lebih longgar pada beta; misalnya akan diizinkan untuk mengakui fitur baru saat saluran stabilitas masuk *alpha*

# Bendera fitur

Bendera fitur adalah praktik umum di Chromium, dan mapan di ekosistem pengembangan web. Dalam konteks Elektron, bendera fitur atau **soft branch** harus memiliki sifat berikut:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- itu benar-benar segmen jalur kode baru dan lama; refactoring kode lama untuk mendukung fitur baru *violates* kontrak bendera fitur
- flag fitur akhirnya dihapus setelah soft-branch digabung

Kami mendamaikan kode yang ditandai dengan strategi versi kami sebagai berikut:

1. kami tidak mempertimbangkan iterasi pada kode yang diberi tanda bendera di cabang stabilitas; Bahkan penggunaan bendera fitur yang bijaksana bukan tanpa resiko
2. anda dapat memecahkan kontrak API dalam kode yang diberi tanda bendera tanpa menabrak versi utama. Kode yang ditandai tidak mematuhi semver

# Semantic Commits

Kami berusaha untuk meningkatkan kejelasan di semua tingkat proses update dan release. Dimulai dengan `2.0.0` kami akan meminta permintaan tarik sesuai dengan spesifikasi [Konvensional ](https://conventionalcommits.org/), yang dapat diringkas sebagai berikut:

- Komitmen yang akan menghasilkan tiang utama **utama** harus dimulai dengan `BREAKING CHANGE:`.
- Komitmen yang akan menghasilkan titik semintang **minor** harus dimulai dengan `feat:`.
- Perintah yang akan menghasilkan tambatan semver **patch** harus dimulai dengan `fix:`.

- Kami mengizinkan meremas commit, asalkan berpegang pesan terjepit di atas format pesan.

- Hal ini dapat diterima untuk beberapa commit dalam permintaan tarik untuk tidak memasukkan awalan semantik, asalkan komit kemudian dalam permintaan tarik sama berisi pesan semantik bermakna mencakup.

# Versionless `master`

- `Master` branch akan selalu berisi `0.0.0-dev` di yang `package.json`
- Rilis Cabang-cabang tidak pernah digabung kembali ke master
- Rilis cabang *Apakah* mengandung versi yang benar di mereka `package.json`