# Windows Uygulama Mağazası'na Gönderme Kılavuzu

Windows 10 ile, iyi eski win32 çalıştırılabilmenin yeni bir kardeşi var: Evrensel Windows Platformu. Yeni ` .appx </ 0> biçimi yalnızca bir dizi yeni
Cortana veya Push Bildirimleri gibi güçlü API'ler, ancak Windows Mağazası aracılığıyla, ayrıca yükleme ve güncellemeyi basitleştirir.</p>

<p>Microsoft <a href="https://github.com/catalystcode/electron-windows-store">, Electron uygulamalarını <code> .appx </ 1> paketleri halinde derleyen bir araç geliştirdi </ 0>, geliştiricilerin yeni uygulamada bulunan özelliklerden yararlanmasını sağlayan bir araç geliştirdi. Bu kılavuz, nasıl kullanılacağını ve bir Electron AppX paketinin özellik ve sınırlamaları hakkında açıklama yapar.</p>

<h2>Arka plan ve Gereksinimler</h2>

<p>Windows 10 "Yıldönümü Güncellemesi", sanal bir dosya sistemi ve kayıt defteri ile başlatarak win32 <code> .exe </ 0> ikili dosyalarını çalıştırabilir . Her ikiside derleme sırasında Windows içinde uygulama ve yükleyiciyi çalıştırarak oluşturulan Konteyner, Windows'un hangi modifikasyonları işletim sistemi kurulum sırasında yapılır. Çalıştırılabilir dosyayı bir sanal dosya sistemi ve bir sanal kayıt defteri ile eşleştirme, Windows'un tek tıklamayla yükleme ve kaldırmayı etkinleştirmesini sağlar.</p>

<p>Buna ek olarak, exe, appx modelinde başlatıldı - Universal Windows Platform'un sunduğu API'ların çoğunu kullanabileceği anlamına geliyor. Daha fazla yetenek kazanmak için, bir Electron uygulaması, görevleri arka planda çalıştırmak, push bildirimleri almak ya da işlehat duyurularını almak için bir yardımcı olarak başlatılan <code> exe </ 0> ile birlikte başlatılan görünmez bir UWP arka plan göreviyle eşleşebilir . Diğer UWP uygulamaları ile iletişim kurun.</p>

<p>Mevcut herhangi bir Electron uygulamasını derlemek için aşağıdaki gereksinimlere sahip olduğunuzdan emin olun:</p>

<ul>
<li>Yıldönümü Güncellemesi ile Windows 10 (2 Ağustos 2016'da piyasaya sürülmüştür)</li>
<li>Windows 10 SDK <a href="https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk"> indirilebilir burada </ 0></li>
<li>En azından Düğüm 4 (kontrol etmek için, <code> düğümünü çalıştırın-v </ 0>)</li>
</ul>

<p>Ardından gidip <code> electron-windows-store ` CLI'yi yükleyin:

```sh
npm yükleme -g elektron-windows-mağaza
```

## 1. Adım: Elektron Uygulamasını Paketleyin

Uygulamayı  elektron paketleyici </ 0> (veya benzer bir alet) kullanarak paketleyin . Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.</p> 

Çıktı kabaca şöyle olmalıdır:

```text
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## 2. Adım: Elektron windows mağazasını çalıştırma

Yüksek bir PowerShell'den ("Yönetici olarak çalıştırın") gerekli parametrelerle `` electron-windows-store </ 0> 'i çalıştırın ; hem giriş ve çıkış dizinlerini, uygulamanın adını ve sürümünü ve
 <0 > node_modules </ 0> düzleştirilmelidir.</p>

<pre><code class="powershell">electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
``</pre> 

Bu araç idam edildikten sonra çalışmaya başlar: Electron uygulamanızı bir giriş olarak kabul eder , ` node_modules </ 0> 'i düzleştirir. Ardından uygulamanızı <code> app.zip </ 0> olarak arşivler.
Araç, bir yükleyici ve bir Windows Konteyner kullanarak , Windows Uygulama Bildirisi'ni ( <code> AppXManifest.xml </ 0> ) ve çıktı dosyanızın sanal dosya sistemini ve sanal kayıt defterini içeren "genişletilmiş" bir AppX paketi oluşturur.</p>

<p>Genişletilmiş AppX dosyaları oluşturulduktan sonra araç , disk üzerindeki bu dosyalardan tek bir dosya AppX paketi oluşturmak için Windows Uygulama Paketleyiciyi ( <code> MakeAppx.exe </ 0> ) kullanır.
Son olarak, araç yeni AppX paketini imzalamak için bilgisayarınızda güvenilir bir sertifika oluşturmak için kullanılabilir. İmzalı AppX paketi ile CLI, otomatik olarak paketi makinenize yükleyebilir.</p>

<h2>3. Adım: AppX Paketini Kullanma</h2>

<p>Paketinizi çalıştırmak için, kullanıcıların gerekir Windows'u sözde "Yıldönümü Güncellemesi" ile 10 - Windows'un nasıl güncelleştirileceği ile ilgili ayrıntılar bulunabilir <a href="https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update">Burada</a>.</p>

<p>Geleneksel UWP uygulamalarına karşı olarak, paketlenmiş uygulamaların şu anda bir elle doğrulama işlemi uygulayabilirsiniz. <a href="https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge">burada</a>.
In the meantime, all users will be able to install your package by double-clicking it,
so a submission to the store might not be necessary if you're looking for an
easier installation method. Yönetilen ortamlarda (genellikle işletmeler), <code>Add-AppxPackage` [PowerShell Cmdlet otomatik olarak yüklemek için kullanılabilir](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Bir diğer önemli kısıtlama, derlenmiş AppX paketinin hala bir win32 yürütülebilir - ve bu nedenle Xbox, HoloLens veya Telefonlar üzerinde çalışmaz.

## İsteğe bağlı: Bir BackgroundTask kullanarak UWP Özellikleri Ekle

Electron uygulamanızı; bildirim gönderme, Cortana entegrasyonu veya canlı karo gibi Windows 10 özelliklerinden tam olarak yararlanmanızı sağlayacak görünmez bir UWP arka plan göreviyle eşleştirebilirsiniz.

Bir arka plan görevini kullanan bir Electron uygulamasının toast bildirimlerini ve canlı karoları nasıl gönderdiğini kontrol etmek için, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## İsteğe bağlı: Konteyner Sanallaştırması'nı kullanarak Dönüştürün

AppX paketi oluşturmak için, `electron-windows-store` CLI'si çoğu Electron uygulamasında çalışması gereken bir şablon kullanır. Bununla birlikte, bir özel kurulumcu kullanıyorsanız veya oluşturulan paketle ilgili herhangi bir sorun yaşarsanız, Windows Container - içinde derleme kullanarak bir paket oluşturmaya çalışabilir, bu modda, CLI yükleme yapar ve uygulamanızı boş Windows Konteynerın'da çalıştırır uygulamanızın hangi işletim modülüne değişiklik yaptığını tam olarak belirleme sistemi.

CLI'yi ilk defa çalıştırmadan önce, "Windows Masaüstü Uygulama Dönüştürücüsü" nü kurmanız gerekmektedir. Bu birkaç dakika alacaktır, ama endişelenmeyin - bunu yalnızca bir defa yapmanız gerekiyor. Karşıdan yükleme ve Masaüstü çeviri uygulaması için [burası](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). İki dosya alacaksınız: `DesktopAppConverter.zip` ve `BaseImage-14316.wim`.

1. Zipten çıkar `DesktopAppConverter.zip`. Yükseltilmiş Powershell' den ( "yönetici olarak çalıştır", sistem yürütme politikanızın bize izin vermesini sağlayın. Bu şekilde Çalıştırmak istediğimiz herşeyi `Set-ExecutionPolicy bypass` çağırarak çalıştırır.
2. Konumdaki windows temel görünümünü görmezden gelerek masaüstü uygulama çeviricisini indir ve çalıştır.
3. Yukarıdaki komutu çalıştırdığınızda yeniden başlatmanız istendiğinde, lütfen makineyi yeniden başlatın ve başarılı gerçekleşen bir yeniden başlatma sonrasında yukarıda bulunan komutu tekrar çalıştırın.

Kurulum başarılı olursa, Electron uygulamanızı derlemek için ilerleyebilirsiniz.