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

Electron versions *< 2.0* tidak sesuai dengan [semver](http://semver.org) spesifikasi. Versi utama berhubungan dengan perubahan API pengguna akhir . Versi minor berhubungan dengan rilis utama Chromium . Versi patch sesuai dengan fitur baru dan perbaikan bug. Meskipun mudah bagi pengembang yang menggabungkan fitur, ini menciptakan masalah bagi pengembang aplikasi yang menghadapi klien. Siklus pengujian QA dari aplikasi utama seperti Slack, Stride, Teams, Skype, VS Code, Atom , dan Desktop dapat berlangsung lama dan stabilitas adalah hasil yang sangat diinginkan. Ada risiko tinggi dalam mengadopsi fitur baru saat mencoba menyerap perbaikan bug.

Berikut adalah contoh strategi 1.x:

![](../images/versioning-sketch-0.png)

Aplikasi yang dikembangkan dengan `1.8.1` tidak dapat memperbaiki bug `1.8.3` tanpa menyerap fitur `1.8.2`, atau dengan membelokkan perbaikan dan mempertahankan baris rilis baru.

## Versi 2.0 dan Seterusnya

Ada beberapa perubahan besar dari strategi 1.x yang kami diuraikan di bawah ini. Setiap perubahan dimaksudkan untuk memenuhi kebutuhan dan prioritas pengembang/pengelola dan pengembang aplikasi.

1. Penggunaan semip yang ketat
2. Pengenalan semver-compliant `-beta`tag
3. Introduction of [conventional commit messages](https://conventionalcommits.org/)
4. Clearly defined stabilization branches
5. The `master` branch is versionless; only stability branches contain version information

Kami akan membahas secara rinci bagaimana cara kerja git branching, bagaimana penandaan npm bekerja, apa yang diharapkan pengembang untuk dilihat, dan bagaimana seseorang dapat mengubah backport.

# semver

Dari 2,0 dan seterusnya, Elektron akan mengikuti semver.

Berikut adalah tabel yang secara eksplisit memetakan jenis perubahan pada kategori semver mereka yang sesuai (mis. Major, Minor, Patch).

* **Versi increment** 
    * Pembaruan versi kromium
    * update versi utama node.js
    * Elektron melanggar API berubah
* **Versi minor** 
    * update versi node.js minor
    * Perubahan API non-breaking elektron
* **Patch Version Increments** 
    * node.js patch version updates
    * memperbaiki kromium terkait patch
    * electron bug fixes

Perhatikan bahwa kebanyakan update kromium akan dianggap melanggar. Perbaikan yang bisa di-backport kemungkinan akan dipilih ceri sebagai tambalan.

# Stabilization Branches

Stabilisasi cabang adalah cabang yang berjalan sejajar dengan master, mengambil hanya cherry-mengambil komit yang berkaitan dengan keamanan atau stabilitas. Cabang-cabang ini tidak pernah tergabung kembali untuk dikuasai.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Baris yang lebih tua tidak akan didukung oleh GitHub, namun kelompok lain dapat mengambil stabilitas kepemilikan dan stabilitas backport dan keamanan mereka sendiri. Kami mencegah hal ini, namun menyadari bahwa ini membuat hidup lebih mudah bagi banyak pengembang aplikasi.

# Beta Releases and Bug Fixes

Developers want to know which releases are *safe* to use. Bahkan fitur yang tampaknya tidak berdosa bisa mengenalkan regresi dalam aplikasi yang kompleks. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a `-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. That release line admits no further features, and focuses only on security and stability. e.g. `2.0.0-beta.1`.
2. Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.

For each major and minor bump, you should expect too see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be pack-ported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Fitur yang Hilang: Alphas, dan Nightly

Strategi kami memiliki beberapa pengorbanan, yang untuk saat ini kami merasa sesuai. Yang paling penting bahwa fitur baru di master mungkin memerlukan beberapa saat sebelum mencapai garis rilis yang stabil. Jika Anda ingin segera mencoba fitur baru, Anda harus membangun Elektron sendiri.

Sebagai pertimbangan di masa depan, kami dapat memperkenalkan satu atau kedua hal berikut:

* malam membangun dari tuan; ini akan memungkinkan orang untuk menguji fitur baru dengan cepat dan memberikan umpan balik
* rilis alpha yang memiliki batasan stabilitas yang lebih longgar pada beta; misalnya akan diizinkan untuk mengakui fitur baru saat saluran stabilitas masuk *alpha*

# Bendera fitur

Bendera fitur adalah praktik umum di Chromium, dan mapan di ekosistem pengembangan web. Dalam konteks Elektron, bendera fitur atau **soft branch** harus memiliki sifat berikut:

* apakah diaktifkan/baik pada saat runtime, atau build-time; kami tidak mendukung konsep bendera fitur yang diberi daftar permintaan
* itu benar-benar segmen jalur kode baru dan lama; refactoring kode lama untuk mendukung fitur baru *violates* kontrak bendera fitur
* flag fitur akhirnya dihapus setelah soft-branch digabung

Kami mendamaikan kode yang ditandai dengan strategi versi kami sebagai berikut:

1. kami tidak mempertimbangkan iterasi pada kode yang diberi tanda bendera di cabang stabilitas; Bahkan penggunaan bendera fitur yang bijaksana bukan tanpa resiko
2. anda dapat memecahkan kontrak API dalam kode yang diberi tanda bendera tanpa menabrak versi utama. Kode yang ditandai tidak mematuhi semver

# Semantic Commits

Kami berusaha untuk meningkatkan kejelasan di semua tingkat proses update dan release. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* We allow squashing of commits, provided that the squashed message adheres the the above message format.

* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as a later commit in the same pull request contains a meaningful encompassing semantic message.

# Versionless `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Release branches are never merged back to master
* Release branches *do* contain the correct version in their `package.json`