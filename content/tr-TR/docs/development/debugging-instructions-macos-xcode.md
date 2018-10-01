## XCode ile Hata Ayıklama

### Hata ayıklama kaynakları için XCode projesi oluşturmak (XCode'dan derlenemez)

Run `gn gen` with the --ide=xcode argument.

```sh
$ gn gen out/Debug --ide=xcode
```

This will generate the electron.ninja.xcworkspace. Hata noktalarını bulmak ve incelemek için bu workspace'i açmanız gerekecek.

See `gn help gen` for more information on generating IDE projects with GN.

### Hata noktaları ve hata ayıklama

Derleme bittikten sonra Electron uygulamasını açın. Şimdi az önce oluşturduğunuz XCode workspace'ini açabilir ve Electron işlemini Hata Ayıklama > Süreci Ekle > Electron hata ayıklama menüsü'nü takip ederek iki işlemi ilişkilendirebilirsiniz. [Nort: Eğer işleyici işlemine hata ayıklama yapmak istiyorsanız Electron Helper'ını da ilişkilendirmeniz gerek.]

Artık endekslenmiş dosyaların herhangi birinde hata noktaları beliryebilirsin. Yine de, direkt olarak Chromium kaynak kodundan hata noktası ekleyemeyeceksin. Chromium kaynak kodundan hata noktası belirlemek için Hata Ayıklama > Hata Noktaları > Sembolik Hata Noktası Belirle kısmına gidebilir ve sembol olarak istediğin fonksiyon ismini ekleyebilirsin. Bu işlem seçtiğin fonksiyon ismine sahip bütün fonksiyonlar ve varsa birden fazla grup için bir hata noktası belirleyecek. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.