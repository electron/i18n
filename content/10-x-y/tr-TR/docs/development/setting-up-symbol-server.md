# Hata Ayıklayıcıda Sembol Sunucusunu Kurma

Hata ayıklama simgeleri daha iyi hata ayıklama oturumları yapmanızı sağlar. Çalıştırılabilir ve dinamik kütüphanelerde bulunan işlevler hakkında bilgi sahibidirler ve size temiz çağrı yığınları elde etmek için bilgi sağlarlar. Bir sembol sunucu doğru sembolleri, ikili dosyaları ve kaynakları otomatik olarak yüklemek için hata ayıklayıcı kullanıcıları, büyük hata ayıklama dosyalarını indirmeye zorlar. Sunucu, [Microsoft's symbol server](https://support.microsoft.com/kb/311503) gibi işlev görür, böylece dokümantasyon yararlı olabilir.

Yayınlanan Elektron yapıları ağır şekilde optimize edildiğinden, hata ayıklama her zaman kolay olmaz. Hata ayıklayıcı, tüm değişkenlerin içeriğini görüntüleyemez ve yürütme yolu, satır içi yerleştirme, kuyruğu çağırma ve diğer çizicileri optimize etme nedeniyle garip görünebilir. Tek geçici çözüm, optimize edilmemiş bir yerel yapı oluşturmaktır.

Elektron için resmi simge sunucusu URL'si https://electron-symbols.githubapp.com. Bu URL'yi doğrudan ziyaret edemezsiniz, onu hata ayıklama aracınızın sembol yoluna eklemelisiniz. Aşağıdaki örneklerde, yerel bir önbellek dizini, PDB'nin sunucudan defalarca alınmasını önlemek için kullanılır. `c:\code\symbols`'ü makinenizdeki uygun önbellek diziniyle değiştirin.

## Windbg'de Sembol Sunucusunu Kullanma

Windbg sembol yolu, yıldız işareti karakterleriyle sınırlandırılmış bir dize değeri ile yapılandırılmıştır. Yalnızca Electron simgesi sunucusunu kullanmak için, sembol yolunuza aşağıdaki girişi ekleyin (**Not:** indirilen simgeler için farklı bir konum tercih ederseniz, `c:\code\symbols`'ü bilgisayarınızdaki yazılabilir bir dizinle değiştirebilirsiniz):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Bu dizeyi ortamda, Windbg menülerini kullanarak veya `.sympath` komutunu yazarak `_NT_SYMBOL_PATH` olarak ayarlayın. Microsoft'un sembol sunucusundan sembol almak isterseniz, önce şunu listelemeniz gerekir:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Sembol sunucusunu Visual Studio'da kullanma

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' />
<img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Sorun giderme: Semboller yüklenmeyecektir

Sembollerin neden yüklenmediğini yazdırmak için Windbg'yi aşağıdaki komuta yazın:

```powershell
> !sym noisy
> .reload /f electron.exe
```
