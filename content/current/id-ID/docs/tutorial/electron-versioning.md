# Versi Elektronika

> Tampilan rinci tentang kebijakan dan implementasi versi kami.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

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

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

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


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Cabang Stabilisasi

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Since Electron 8, stabilization branches are always **major** version lines, and named against the following template `$MAJOR-x-y` e.g. `8-x-y`.  Prior to that we used **minor** version lines and named them as `$MAJOR-$MINOR-x` e.g. `2-0-x`

Kami mengizinkan beberapa cabang stabilisasi ada bersamaan, dan berniat untuk mendukung setidaknya dua secara paralel setiap saat, mendukung perbaikan sekuriti seperlunya. ![](../images/versioning-sketch-2.png)

Baris yang lebih tua tidak akan didukung oleh GitHub, namun kelompok lain dapat mengambil stabilitas kepemilikan dan stabilitas backport dan keamanan mereka sendiri. Kami mencegah hal ini, namun menyadari bahwa ini membuat hidup lebih mudah bagi banyak pengembang aplikasi.

# Rilis Beta dan Perbaikan Bug

Pengembang ingin mengetahui rilis mana yang _aman_ untuk digunakan. Bahkan fitur yang tampaknya tidak berdosa bisa mengenalkan regresi dalam aplikasi yang kompleks. Pada saat bersamaan, penguncian ke versi tetap berbahaya karena anda mengabaikan tambalan keamanan dan perbaikan bug yang mungkin keluar sejak versi anda. Tujuan kami adalah membiarkan rangkaian standar berikut masuk `package.json` :

* Gunakan ` ~ 2.0.0 </ 0> untuk mengakui hanya perbaikan stabilitas atau keamanan terkait rilis Anda <code> 2.0.0 </ 0>.</li>
<li>Gunakan <code>^ 2.0.0` untuk mengakui fitur pekerjaan yang tidak melanggar _ cukup stabil _ serta perbaikan keamanan dan bug.

Yang penting dari poin kedua adalah aplikasi yang menggunakan ` ^` tetap dapat mengharapkan tingkat stabilitas yang masuk akal. To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Apapun yang anda pilih, secara berkala Anda harus menemukan versi ` package.json ` karena melanggar perubahan adalah fakta kehidupan Chromium.

Prosesnya adalah sebagai berikut:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes before Week 3 in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

For each major and minor bump, you should expect to see something like the following:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Contoh siklus hidup dalam gambar:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* Beta dianggap _umumnya stabil_ dan diterbitkan lagi sebagai non-beta di bawah `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Beberapa contoh bagaimana berbagai rentang semver akan mengambil rilis baru:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas
Strategi kami memiliki beberapa pengorbanan, yang untuk saat ini kami merasa sesuai. Yang paling penting bahwa fitur baru di master mungkin memerlukan beberapa saat sebelum mencapai garis rilis yang stabil. Jika Anda ingin segera mencoba fitur baru, Anda harus membangun Elektron sendiri.

Sebagai pertimbangan di masa depan, kami dapat memperkenalkan satu atau kedua hal berikut:

* rilis alpha yang memiliki batasan stabilitas yang lebih longgar pada beta; misalnya akan diizinkan untuk mengakui fitur baru saat saluran stabilitas masuk _alpha_

# Bendera fitur
Bendera fitur adalah praktik umum di Chromium, dan mapan di ekosistem pengembangan web. Dalam konteks Elektron, bendera fitur atau **soft branch** harus memiliki sifat berikut:

* it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* itu benar-benar segmen jalur kode baru dan lama; refactoring kode lama untuk mendukung fitur baru _violates_ kontrak bendera fitur
* feature flags are eventually removed after the feature is released

# Semantic Commits

Kami berusaha untuk meningkatkan kejelasan di semua tingkat proses update dan release. Dimulai dengan `2.0.0` kami akan meminta permintaan tarik sesuai dengan spesifikasi [Konvensional ](https://conventionalcommits.org/), yang dapat diringkas sebagai berikut:

* Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
* Komitmen yang akan menghasilkan titik semintang **minor** harus dimulai dengan `feat:`.
* Perintah yang akan menghasilkan tambatan semver **patch** harus dimulai dengan `fix:`.

* Kami mengizinkan meremas commit, asalkan berpegang pesan terjepit di atas format pesan.
* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versioned `master`

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- Rilis Cabang-cabang tidak pernah digabung kembali ke master
- Rilis cabang _Apakah_ mengandung versi yang benar di mereka `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
