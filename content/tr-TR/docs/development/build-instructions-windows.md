# İnşaa Talimatları (Windows)

Electron'u windows üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* Windows 7 / Server 2008 R2 veya üzeri
* Visual Studio 2017 - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Tam teşekkül bir dağıtım yaratmayı düşünüyorsanız, `symstore.exe`, `.pdb` dosyalarından sembol pazarı üretmek için kullanılır.

Hali hazırda Windows kurulumunuz mevcut değilse, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) adresinde Windows'un belirli zamanlarda işaretlenmiş versiyonlarını, Electron'u inşaa etmek için kullanabilirsiniz.

Electron'u inşaa etmek tamamen komut satırı betikleri üzerinden yapılır. Visual Studio ile yapmak mümkün değildir. Electron'u herhangi bir editör ile geliştirebilirsiniz ama VisualStudio ile inşaa desteği ileride gelecek.

**Not:** Visual Studio inşaa için kullanılmasa da **gerekli** çünkü Visual Studio ile gelen inşaa yardımcılarını kullanıyoruz.

## Kodu almak

```powershell
$ git clone https://github.com/electron/electron.git
```

## İlk işleri halletmek

Ilk işleri halleden bootstrap betiği inşaa için gerekli olan bağımlılıkları indirir ve gerekli inşaa dosyalarını hazırlar. Dikkat ederseniz Electron'u inşaa etmek için `ninja` kullandığımız için herhangi bir Visual Studio projesi yaratılmıyor.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## İnşaa

Hem Dağıtım hem Hata Ayıklama hedefleri:

```powershell
$ python script\build.py
```

Sadece hata ayıklama hedeflenerek de inşaa mümkün:

```powershell
$ python script\build.py -c D
```

İnşaa tamamlandıktan sonra, `electron.exe`'yi `out\D` (hata ayıklama hedefi) veya `out\R` (Sürüm hedefi) altında bulabilirsiniz.

## 32bit İnşaa

32bit hedefleyerek inşaa etmek için, `--target_arch=ia32` parametresini bootstrap betiğine geçmeniz gerekir:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Diğer inşaa adımları aynı bu şekilde.

## Visual Studio projesi

Visual Studio projesi yaratmak için `--msvs` parametresini geçin:

```powershell
$ python script\bootstrap.py --msvs
```

## Temizlik

İnşaa dosyalarını temizlemek için:

```powershell
$ npm run clean
```

Sadece `out` and `dist` dizinlerini temizlemek için:

```sh
$ npm run clean-build
```

**Not:** Her iki temizleme komutu inşaa öncesi `bootstrap` çalıştırılmasını şart koşar.

## Testler

Burayı ziyaret edin: [İnşaa Sistemi Genel Görünümü: Testler](build-system-overview.md#tests)

## Arıza giderme

### Command xxxx not found

`Command xxxx not found`, gibi bir hata aldıysanız inşaa betiklerini `VS2015 Command Prompt` kullanarak çalıştırmayı deneyebilirsiniz.

### Fatal internal compiler error: C1001

Visual Studio'nun son sürümüne sahip olduğunuzdan emin olun.

### Assertion failed: ((handle))->activecnt >= 0

Cygwin altında inşaa deniyorsanız, `bootstrap.py`'nin şöyle bir hata çıkardığını görebilirsiniz:

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

Bu hatanın sebebi Cygwin Python ve Win32 Node beraber kullanıldığında oluşan bir hatadır. Çözüm, Win32 Python ile boostrap betiğini çalıştırmaktır. (Python'u `C:\Python27` altına yüklediğinizi varsayarak):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

32bit Node.js'i tekrardan kurmayı deneyin.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

İnşaa için Git Bash kullanıyorsanız, bu hatayı alabilirsiniz. Yerine Powershell veya VS2015 Komut Satırı'nı kullanmalısınız.