# Isu Dalam Elektron

# Isu

* [Bagaimana cara berkonstribusi di Isu](#how-to-contribute-in-issues)
* [Pertanyaan Umum](#asking-for-general-help)
* [Mengirimkan Laporan Bug](#submitting-a-bug-report)
* [Mendahulukan Laporan Bug](#triaging-a-bug-report)
* [Memecahkan Laporan Bug](#resolving-a-bug-report)

## Bagaimana cara berkonstribusi di Isu

Untuk masalah apapun, pada dasarnya ada tiga cara seorang individu dapat berkontribusi:

1. Dengan membuka diskusi untuk permasalahan: Jika anda yakin anda telah menemukan bug baru di elektron, anda harus melaporkannya dengan cara membuat isu baru di `electron/electron` pelacak masalah/isu.
2. Dengan membantu menyelesaikan masalah: Anda dapat melakukan dengan salah satu cara ini yaitu menyediakan rincian bantu ( Sebuah tes yang menguji guna membuktikan adanya Bug) atau dengan cara menyediakan saran ke ajukan permasalahan.
3. Dengan membantu menyelesaikan masalah: Hal tersebut bisa dilakukan dengan cara mendemontrasikan masalah tersebut bukan sebuah Bug atau sudah diperbaiki; namun lebih sering lagi, dengan membuka pull request yang mengganti sumber di `electron/electron` dengan cara yang konkret dan mudah ditinjau.

## Pertanyaan Umum

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Mengirimkan Laporan Bug

Ketika membuka isu di `electron/electron` pelacak isu, pengguna akan di tampilkan dengan templete yang harus di isi.

```markdown
<!-- 
Terimakasih karena telah membuka isu! Beberapa hal yang perlu di perhatikan:

- Pelacak isu hanya untuk Bug dan fitur permintaan.
- Sebelum melaporkan Bug, silahkan coba mereproduksi masalah anda terhadap versi terbaru dari electron.
-Jika anda membutuhkan saran secara umum, gabung di Slack kami: http://atom-slack.herokuapp.com 
-->

*Versi Electron
*Sistem Operasi

### Kebiasaan yang diharapkan

<!--Apa menurut anda yang akan terjadi? -->

### Perilaku Aktual

<!-- Apa yang sebenarnya terjadi? -->

### Bagaimana cara memproduksi

<!--
Kesempatan terbaik anda untuk menemukan Bug ini secara cepat adalah dengan menyediakan REPOSITORI yang bisa di klon dan berfungsi.

Kamu dapat menarik file di https://github.com/electron/electron-quick-start dan termasuk link untuk cabang dengan perubahan yang telah anda buat.

Jika anda menyediakan URL, mohon masukkan perintah yang dibutuhkan untuk mengklon/pengaturan/jalankan repo anda, contoh

$ git clone $YOUR_URL -b $BRANCH   
$ npm install   
$ npm start || electron .

-->
```

Jika anda yakin bahwa anda telah menemukan Bug di electron, mohon isi formulir ini sesuai kemampuan terbaik anda.

Dua hal yang paling penting dari informasi yang dibutuhkan untuk mengevaluasi laporan adalah Sebuah penjelasan tentang Bug dan sebuah tes kasus yang simpel untuk membuatnya kembali. Lebih mudah untuk memperbaiki Sebuah Bug jika Bug tersebut dapat direproduksi kembali.

Lihat [ Bagaimana cara membuat contoh yang minimal, komplit dan yang bisa di verifikasi ](https://stackoverflow.com/help/mcve).

## Mendahulukan Laporan Bug

Ini hal yang wajar untuk membuka isu dan memulai diskusi. Beberapa kontributor mungkin memiliki pendapat yang berbeda, termasuk apakah itu kebiasaan Bug atau fitur. Diskusi ini adalah bagian dari proses dan harus tetap fokus, bermanfaat dan profesional.

Respon singkat yang menyediakan baik itu penambahan konteks maupun mendukung detail, dianggap tidak bermanfaat ataupun profesional. Terlalu banyak, respon juga mengganggu dan kurang menyenangkan.

Kontributor sangat disarankan untuk memecahkan isu secara bersama dan membantu satu sama lain dalam membuat perkembangan. Jika mendapat sebuah isu yang anda rasa tidak valid, atau mengandung informasi yang tidak benar, jelaskan *mengapa* anda merasa seperti itu dengan konteks pendukung tambahan, dan mampu meyakinkan bahwa anda salah. Dengan melakukan hal tersebut, kita sering mencapai solusi permasalahan yang benar dan cepat.

## Memecahkan Laporan Bug

Kebanyakan isu diselesaikan dengan membuka Pull request. Proses untuk membuka dan mereview Pull request sama dengan proses untuk membuka dan triaging isu, namun disertai dengan tinjauan dan alur kerja persetujuan yang diperlukan untuk mengusulkan perubahan untuk memenuhi kualitas minimal dan pedoman proyek electron.