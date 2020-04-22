## XCode ile Hata Ayıklama

### Hata ayıklama kaynakları için XCode projesi oluşturmak (XCode'dan derlenemez)
Run `gn gen` with the --ide=xcode argument.
```sh
$ gn gen out/Testing --ide=xcode
```
Bu "electron.ninja.xcworkspace"i oluşturacaktır. Hata noktalarını bulmak ve incelemek için bu workspace'i açmanız gerekecek.

See `gn help gen` for more information on generating IDE projects with GN.

### Hata noktaları ve hata ayıklama

Derleme bittikten sonra Electron uygulamasını açın. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [Nort: Eğer işleyici işlemine hata ayıklama yapmak istiyorsanız Electron Helper'ını da ilişkilendirmeniz gerek.]

Artık endekslenmiş dosyaların herhangi birinde hata noktaları beliryebilirsin. Yine de, direkt olarak Chromium kaynak kodundan hata noktası ekleyemeyeceksin. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. Bu işlem seçtiğin fonksiyon ismine sahip bütün fonksiyonlar ve varsa birden fazla grup için bir hata noktası belirleyecek. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.
