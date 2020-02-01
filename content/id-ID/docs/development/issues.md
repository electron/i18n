# Isu Dalam Elektron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Pertanyaan Umum](#asking-for-general-help)
* [Mengirimkan Laporan Bug](#submitting-a-bug-report)
* [Mendahulukan Laporan Bug](#triaging-a-bug-report)
* [Memecahkan Laporan Bug](#resolving-a-bug-report)

## How to Contribute to Issues

Untuk masalah apapun, pada dasarnya ada tiga cara seorang individu dapat berkontribusi:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Dengan membantu menyelesaikan masalah: Anda dapat melakukan dengan salah satu cara ini yaitu menyediakan rincian bantu ( Sebuah tes yang menguji guna membuktikan adanya Bug) atau dengan cara menyediakan saran ke ajukan permasalahan.
3. Dengan membantu menyelesaikan masalah: Hal tersebut bisa dilakukan dengan cara mendemontrasikan masalah tersebut bukan sebuah Bug atau sudah diperbaiki; namun lebih sering lagi, dengan membuka pull request yang mengganti sumber di `electron/electron` dengan cara yang konkret dan mudah ditinjau.

## Pertanyaan Umum

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Mengirimkan Laporan Bug

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

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

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Mendahulukan Laporan Bug

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Memecahkan Laporan Bug

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.