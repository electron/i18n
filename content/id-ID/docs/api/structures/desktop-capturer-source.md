# Obyek SumberPenangkapDesktop

* `id` String - Pengenal jendela atau layar yang dapat digunakan sebagai sebuah pemaksa `chromeMediaSourceId` ketika memanggil [`navigator.webkitGetUserMedia`]. Formatpengenal akan menjadi `jendela:XX` atau `layar:XX`, dimana `XX` adalah sebuah nomor yang dihasilkan secara acak.
* `nama` String - Sebuah sumber layar akan dinamai, baik `Seluruh Layar` atau `Layar <index>`, sementara itu nama sumber jendela akan cocok dengan judul jendela.
* `miniatur` [GambarAsli](../native-image.md) - Sebuah gambar miniatur. **Catatan:** Tidak ada jaminan bahwa ukuran dari miniatur sama dengan `ukuran Miniatur` yang dirincikan dalam `pilihan` dilewatkan ke `desktopCapturer.getSources`. Ukuran sesungguhnya tergantung pada skala dari layar atau jendela.