# Tentang Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron menyelesaikan hal ini dengan menggabungkan [Chromium](https://www.chromium.org/Home) dan [Node.js](https://nodejs.org) ke dalam satu runtime dan aplikasi dapat dikemas untuk Mac, Windows, dan Linux.

Elektron dimulai pada 2013 sebagai kerangka kerja di mana [Atom](https://atom.io), editor teks milik GitHub, akan dibangun. Dua yang dibuka di musim semi tahun 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Baca terus untuk mempelajari lebih lanjut tentang kontributor dan rilis elektron atau cara mulai membangun aplikasi dengan elektron melalui [Panduan Ringkas](quick-start.md).

## Tim Inti dan Kontributor

Elektron dikelola oleh sebuah tim di GitHub serta sekelompok [contributors aktif](https://github.com/electron/electron/graphs/contributors) dari komunitas. Beberapa kontributor individu dan beberapa bekerja lebih besar perusahaan yang mengembangkan pada elektron. Kami senang untuk menambahkan kontributor untuk proyek sebagai pengelola. Baca lebih lanjut tentang [kontribusi kepada Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Rilis

[Rilis Electron](https://github.com/electron/electron/releases) sangat kerap. Kami merilis ketika ada perbaikan bug yang signifikan, api atau yang memperbarui versi baru dari chromium atau Node.js.

### Memperbarui Dependensi

Elektron versi Chromium biasanya diperbarui dalam waktu satu atau dua minggu setelah Chromium versi baru dirilis, tergantung pada upaya yang terlibat dalam upgrade.

Ketika sebuah versi baru dari Node.js dirilis, elektron biasanya menunggu sekitar satu bulan sebelum meningkatkannya untuk membawa di versi yang lebih stabil.

Di Electron, Node.js dan Chromium berbagi satu contoh V8 — biasanya versi yang Kromium menggunakan. Sebagian besar waktu ini *hanya bekerja* tapi kadang-kadang itu berarti menambal Node.js.

### Versi

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Filosofi inti

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Riwayat

Below are milestones in Electron's history.

| :calendar:       | :tada:                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| **April 2013**   | [Atom Shell dimulai](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).         |
| **Mei 2014**     | [Atom Shell merupakan open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **April 2015**   | [Atom Shell menjadi Electron](https://github.com/electron/electron/pull/1389).                                      |
| **Mei 2016**     | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **Mei 2016**     | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Agustus 2016** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |