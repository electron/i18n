## XCode ile Hata Ayıklama

### Libchromiumcontent sürümü ile Electron hata ayıklama sürümü oluşturmak

[macOS kurulum talimatlarını](build-instructions-osx.md) izleyerek Electron'un hata ayıklama sürümünü oluşturabilirsiniz. Bootsrap aşaması otomatik olarak libchromiumcontent'ın son sürümünü yükleyecek, yani Chromium kaynak koduna erişiminiz olmayacak.

### Libchromiumcontent Debug ile Electron hata ayıklama sürümü oluşturmak

Eğer libchromiumcontent erişmek ve hata ayıklama yapmak istiyorsanız, `--build_debug_libcc` argümanı ile bootsrap script'ini çalıştırmanız gerekecek.

```sh
$ cd electron 
$ ./script/bootstrap.py -v --build_debug_libcc
```

Bu işlem bütün libchromium kodunu derleyeceği için, kullandığınız makinaya bağlı olarak, uzun bir süre alabilir.

Once, the lib is built, create a symlink to the built directory under download

`ln -s vendor/libchromiumcontent/dist/main/shared_library vendor/download/libchromiumcontent/shared_library`

Electron debug builds will use this shared library to link against.

```sh
$ ./script/build.py -c D --libcc
```

Bu işlem libchromiumcontent'un debug versiyonu ile Electron hata ayıklama versiyonunu derleyecek.

### Hata ayıklama kaynakları için XCode projesi oluşturmak (XCode'dan derlenemez)

--xcode argümanı ile script'i çalıştırın.

```sh
$ ./script/update.py --xcode
```

Bu "electron.ninjs.xcworkspace"i oluşturacaktır. Hata noktalarını bulmak ve incelemek için bu workspace'i açmanız gerekecek.

### Hata noktaları ve hata ayıklama

Derleme bittikten sonra Electron uygulamasını açın. Şimdi az önce oluşturduğunuz XCode workspace'ini açabilir ve Electron işlemini Hata Ayıklama > Süreci Ekle > Electron hata ayıklama menüsü'nü takip ederek iki işlemi ilişkilendirebilirsiniz. [Nort: Eğer işleyici işlemine hata ayıklama yapmak istiyorsanız Electron Helper'ını da ilişkilendirmeniz gerek.]

Artık endekslenmiş dosyaların herhangi birinde hata noktaları beliryebilirsin. Yine de, direkt olarak Chromium kaynak kodundan hata noktası ekleyemeyeceksin. Chromium kaynak kodundan hata noktası belirlemek için Hata Ayıklama > Hata Noktaları > Sembolik Hata Noktası Belirle kısmına gidebilir ve sembol olarak istediğin fonksiyon ismini ekleyebilirsin. Bu işlem seçtiğin fonksiyon ismine sahip bütün fonksiyonlar ve varsa birden fazla grup için bir hata noktası belirleyecek. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.