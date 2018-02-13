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

Karena tingkat aktivitas di `electron/electron` repositori sangat tinggi, pertanyaan dan permintaan untuk bantuan umum menggunakan elektron harus langsung menghubungi [saluran komunitas yang lenggang](https://atomio.slack.com) atau [forum](https://discuss.atom.io/c/electron).

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

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Mendahulukan Laporan Bug

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Memecahkan Laporan Bug

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.