# Windowsta hata ayıklama

Electron'un kendisinden kaynaklanmadığını düşündüğünüz sizin JavaScript uygulamanızdan kaynaklandığını düşündüğünüz hatalarla karşılaşabilirsiniz fakat buna Electron sebep olmaktadır, hata ayıklama biraz can sıkıcı olabilir, özellikle yerel / C ++ için kullanılmayan geliştiriciler için hata ayıklama biraz zor olabilir. Bununla birlikte, GitHub'ın Barındırdığı Electron Symbol Server olan Visual Studio'yu kullanarak, ve Electron kaynak kodu ile adım adım hata ayıklamayı etkinleştirmek Electron'un kaynak kodundaki kesme noktaları ile oldukça kolaydır.

## Gereksinimler

* ** Electron'un hata ayıklama yapısı **: En kolay yol genellikle listelenen araçları ve önkoşulları kullanarak onu inşa etmektir [ Windows için talimatları oluşturma ](build-instructions-windows.md). Electron hata ayıklamada iken doğrudan indirebilirsiniz ve kolayca ekleyebilirsiniz, büyük çoğunluğunun uygun hale getirildiğini göreceksiniz, hata ayıklama işlemi aslında daha zor: Hata ayıklayıcı size tüm içeriğini gösteremeyecek değişkenleri ve yürütme yolu satırlayıcısı, kuyruk aramaları ve diğerderleyici uygun hale getirilmeleri nedeniyle tuhaf görünebilir.

* **Visual Studio with C++ Tools**: Visual'in ücretsiz topluluk sürümleri Studio 2013 ve Visual Studio 2015 her ikisi de çalışır. Kurulduktan sonra, [ Visual Studio'yu GitHub Elektron Sembolü sunucusunu kullanacak şekilde yapılandırın ](setting-up-symbol-server.md). Visual Studio Electron'un içinde ne olacağı hakkında daha iyi bilgi sahibi olmasını sağlayacaktır, değişkenlerin insan tarafından okunabilir bir şekilde sunulmasını kolaylaştırır.

* ** ProcMon ** The [ free SysInternals tool ](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) süreç parametrelerini, dosya tutamaçlarını ve kayıt işlemlerini incelemenize olanak tanır.

## Electron'da ekleme yapma ve hata ayıklama

Bir hata ayıklama oturumu başlatmak için, Elektron yapımı, uygulamayı bir parametre olarak kullanarak, PowerShell / CMD'yi açın ve hata ayıklamasını çalıştırın.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Kesme noktalarını ayarlama

Sonra Visual Studio'da açın. Elektron Visual Studio ile oluşturulmaz ve bu nedenle bir proje dosyası içermez - ancak kaynak kod dosyalarını açabilirsiniz "As File", yani Visual Studio kendiliğinden açılacaktır. Hala kesme noktalarını ayarlayabilirsiniz - Visual Studio otomatik olarak kaynak kodu, ekteki işlemde çalışan kodla eşleşir ve buna göre keser.

İlgili kod dosyaları, `./ atom / ` 'da olduğu gibi Brightray'de de bulunabilir `./ brightray / tarayıcı ` ve `./ brightray / common `. Eğer kararlı iseniz, Açıkçası ` chromium_src ` 'da bulunan Chromium'u doğrudan hata ayıklayabilirsiniz.

### Ekleme yapma

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.