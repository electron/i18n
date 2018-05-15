# Windowsta hata ayıklama

Eğer Electron'da JavaScriptten kaynaklanmadığını düşündüğünüz Electronun neden olduğu hatalarla karşılaşırsanız, hata ayıklama biraz can sıkıcı olabilir, özellikle yerel / C ++ için kullanılmayan geliştiriciler için hata ayıklama biraz zor olabilir. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## Gereksinimler

* ** A debug build of Electron **: En kolay yol genellikle listelenen araçları ve önkoşulları kullanarak onu inşa etmektir [ build instructions for Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio with C++ Tools**: Visual'in ücretsiz topluluk sürümleri Studio 2013 ve Visual Studio 2015 her ikisi de çalışır. Kurulduktan sonra, [ Visual Studio'yu GitHub Elektron Sembolü sunucusunu kullanacak şekilde yapılandırın ](setting-up-symbol-server.md). Visual Studio Electron'un içinde ne olacağı hakkında daha iyi bilgi sahibi olmasını sağlayacaktır, değişkenlerin insan tarafından okunabilir bir şekilde sunulmasını kolaylaştırır.

* ** ProcMon ** The [ free SysInternals tool ](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) süreç parametrelerini, dosya tutamaçlarını ve kayıt işlemlerini incelemenize olanak tanır.

## Electron'da ekleme yapma ve hata ayıklama

Bir hata ayıklama oturumu başlatmak için, Elektron yapımı, uygulamayı bir parametre olarak kullanarak, PowerShell / CMD'yi açın ve hata ayıklamasını çalıştırın.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Kesme noktalarını ayarlama

Sonra Visual Studio'da açın. Elektron Visual Studio ile oluşturulmaz ve bu nedenle bir proje dosyası içermez - ancak kaynak kod dosyalarını açabilirsiniz "As File", yani Visual Studio kendiliğinden açılacaktır. Hala kesme noktalarını ayarlayabilirsiniz - Visual Studio otomatik olarak kaynak kodu, ekteki işlemde çalışan kodla eşleşir ve buna göre keser.

İlgili kod dosyaları, `./ atom / ` 'da olduğu gibi Brightray'de de bulunabilir `./ brightray / tarayıcı ` ve `./ brightray / common `.

### Ekleme yapma

Visual Studio hata ayıklayıcısına yerel olarak veya bilgisayara uzaktan erişerek ekleme yapabilirsiniz. İşlem çalıştıktan sonra Debug / Attach to Process'e tıklayın. (veya ` CTRL + ALT + P ` tuşlarına basarak) "İşleme Ekle" iletişim kutusunu açın. Bu özelliği yerel veya uzak bir bilgisayarda çalışan uygulamaları ayıklamak için, birden fazla aynı anda hata ayıklama işlemi için kullanabilirsiniz.

Elektron farklı bir kullanıcı hesabı altında çalışıyorsa, ` Tüm kullanıcılardaki işlemleri göster ` onay kutusunu işaretleyin. BrowserWindows uygulamanızı açtığınızda Kaç kişiye bağlı olduğuna dikkat edin, birden fazla işlemi göreceksiniz. Tipik Tek pencere uygulaması, Visual Studio'nun size iki ` Electron.exe ` girdileri ile sunmasına neden olacaktır - birincisi ana işlem için ve bir tane de oluşturucu süreci için. Liste size sadece isimler verdiğinden, şimdilik hangisinin hangisi olduğunu anlamanın bir yolu yok.

### Hangi işlemi eklemeliyim?

Ana süreç içinde çalıştırılan kod (yani, ana JavaScript dosyanız tarafından bulunan veya sonuçta çalışan kod) yanı sıra uzaktan kumanda kullanılarak (` require ('electron'). Remote `) ana işlemin içinde çalışırken, diğer kodu ilgili oluşturucu işleminde yürütülecektir.

Hata ayıklarken birden çok program eklenebilir, ancak yalnızca bir program aynı anda etkin olabilir. Etkin programı `Debug Location` araç çubuğunda veya `Processes window`'da ayarlayabilirsiniz.

## ProcMon'u Bir Süreci Gözlemek İçin Kullanma

Visual Studio spesifik kod yollarını incelemek için harika olsa da, ProcMon'un gücü gerçekten uygulamanızın işletim sistemi ile yaptıklarını gözlemlemektir - süreçlerinizin Dosya, Kayıt Defteri, Ağ, İ şlem, ve Profil detaylarını yakalar. **all** olayları ortaya çıkarmaya çalışır ve oldukça bunaltıcı olabilir, ancak uygulamanızın işletim sistemine ne yaptığını ve nasıl davrandığını anlamaya çalışırsanız değerli bir kaynak olabilir.

ProcMon'un temel ve gelişmiş hata ayıklama özelliklerine giriş için, Microsoft tarafından sağlanan [bu video öğreticisi](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor)'ne bakın.