# Obyek SumberPenangkapDesktop

* `id` String - The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling [`navigator.webkitGetUserMedia`]. Format pengenal akan menjadi `window:XX` atau `layar:XX`, dimana `XX` adalah sebuah nomor yang dihasilkan secara acak.
* `nama` String - Sebuah sumber layar akan dinamai, setiap`Seluruh Layar` atau `Layar <index>`, sementara itu nama sumber window akan cocok dengan judul window.
* `thumbnail` [NativeImage](../native-image.md) - Sebuah gambar thumbnail. **Catatan:** Tidak ada jaminan bahwa ukuran dari thumbnail sama dengan `thumbnailSize` yang dirincikan didalam `options` melalui `desktopCapturer.getSources`. Ukuran sesungguhnya tergantung pada ukuran dari layar atau window.
* `display_id` String - Tanda pengenal unik yang berhubungan dengan ` id` yang sesuai dari [Display](display.md) yang dikembalikan oleh [Screen API](../screen.md). Pada beberapa perangkat, hal ini serupa dengan `XX` bagian dari kolom `id` di atas dan lainnya akan berbeda. Ini akan menjadi String kosong bila tidak tersedia.
* `appIcon` [NativeImage](../native-image.md) -sebuah gambar ikon dari aplikasi yang memiliki window atau null jika sumber memiliki sejenis layar. Ukuran ikon tidak diketahui sebelumnya dan tergantung pada apa yang aplikasi sediakan.
