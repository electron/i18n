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

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with [a template](https://github.com/electron/electron/blob/master/.github/ISSUE_TEMPLATE/Bug_report.md) that should be filled in.

If you believe that you have found a bug in Electron, please fill out the template to the best of your ability.

Dua hal yang paling penting dari informasi yang dibutuhkan untuk mengevaluasi laporan adalah Sebuah penjelasan tentang Bug dan sebuah tes kasus yang simpel untuk membuatnya kembali. It is easier to fix a bug if it can be reproduced.

Lihat [ Bagaimana cara membuat contoh yang minimal, komplit dan yang bisa di verifikasi ](https://stackoverflow.com/help/mcve).

## Mendahulukan Laporan Bug

Ini hal yang wajar untuk membuka isu dan memulai diskusi. Beberapa kontributor mungkin memiliki pendapat yang berbeda, termasuk apakah itu kebiasaan Bug atau fitur. Diskusi ini adalah bagian dari proses dan harus tetap fokus, bermanfaat dan profesional.

Respon singkat yang menyediakan baik itu penambahan konteks maupun mendukung detail, dianggap tidak bermanfaat ataupun profesional. Terlalu banyak, respon juga mengganggu dan kurang menyenangkan.

Kontributor sangat disarankan untuk memecahkan isu secara bersama dan membantu satu sama lain dalam membuat perkembangan. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. Dengan melakukan hal tersebut, kita sering mencapai solusi permasalahan yang benar dan cepat.

## Memecahkan Laporan Bug

Kebanyakan isu diselesaikan dengan membuka Pull request. Proses untuk membuka dan mereview Pull request sama dengan proses untuk membuka dan triaging isu, namun disertai dengan tinjauan dan alur kerja persetujuan yang diperlukan untuk mengusulkan perubahan untuk memenuhi kualitas minimal dan pedoman proyek electron.
