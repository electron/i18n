# Obyek SumberPenangkapDesktop

* `id` String - Pengenal window atau layar yang dapat digunakan sebagai `chromeMediaSourceId` ketika memanggil [`navigator.webkitGetUserMedia`]. Format pengenal akan menjadi `window:XX` atau `layar:XX`, dimana `XX` adalah sebuah nomor yang dihasilkan secara acak.
* `nama` String - Sebuah sumber layar akan dinamai, setiap`Seluruh Layar` atau `Layar <index>`, sementara itu nama sumber window akan cocok dengan judul window.
* `thumbnail` [NativeImage](../native-image.md) - Sebuah gambar thumbnail. **Catatan:** Tidak ada jaminan bahwa ukuran dari thumbnail sama dengan `thumbnailSize` yang dirincikan didalam `options` melalui `desktopCapturer.getSources`. Ukuran sesungguhnya tergantung pada ukuran dari layar atau window.