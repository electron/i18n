# Tentang Electron

[Electron](https://electron.atom.io) adalah perpustakaan open source yang dikembangkan oleh GitHub untuk membangun aplikasi desktop lintas-platform dengan HTML, CSS, dan JavaScript. Electron menyelesaikan hal ini dengan menggabungkan [Chromium](https://www.chromium.org/Home) dan [Node.js](https://nodejs.org) ke dalam satu runtime dan aplikasi dapat dikemas untuk Mac, Windows, dan Linux.

Elektron dimulai pada 2013 sebagai kerangka kerja di mana [Atom](https://atom.io), editor teks milik GitHub, akan dibangun. Dua yang dibuka di musim semi tahun 2014.

Karena telah menjadi alat populer yang digunakan oleh pengembang open source, pemula, dan perusahaan-perusahaan yang mapan. [Melihat siapa yang membangun pada elektron](https://electron.atom.io/apps/).

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

Karena ketergantungan pada Node.js dan Chromium, electron adalah dalam posisi versi rumit dan [tidak mengikuti `semver`](http://semver.org). Anda harus karena itu selalu referensi versi tertentu elektron. [Baca lebih lanjut tentang versi elektron 's](https://electron.atom.io/docs/tutorial/electron-versioning/) atau melihat [versi yang saat ini digunakan](https://electron.atom.io/#electron-versions).

### LTS

Dukungan jangka panjang dari versi elektron tidak saat ini ada. Jika versi elektron anda saat ini bekerja dengan baik, Anda dapat tinggal di atasnya untuk sepanjang seperti yang Anda inginkan. Jika Anda ingin membuat menggunakan fitur-fitur baru anda harus meng-upgrade ke versi terbaru.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |