# Obyek SumberPenangkapDesktop

* `id` String - Pengenal jendela atau layar yang dapat digunakan sebagai sebuah pemaksa `chromeMediaSourceId` ketika memanggil [`navigator.webkitGetUserMedia`]. Formatpengenal akan menjadi `jendela:XX` atau `layar:XX`, dimana `XX` adalah sebuah nomor yang dihasilkan secara acak.
* `nama` String - Sebuah sumber layar akan dinamai, baik `Seluruh Layar` atau `Layar <index>`, sementara itu nama sumber jendela akan cocok dengan judul jendela.
* `ringkas` [GambarAsli](../native-image.md) - Sebuah gambar ringkas. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.