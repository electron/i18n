# dialog

> Dosyaları açma ve kaydetme, uyarı yapma, vb. için yerel sistem diyaloglarını görüntüle.

İşlem: [Ana](../glossary.md#main-process)

Birden çok dosya ve dizin seçmek için bir iletişim kutusunu gösteren örnek:

```javascript
const{dialog}=ihtiyaç('electron')
console.log(dialog.showOpenDialog({özellikleri: ['openFile', 'openDirectory', 'multiSelections']}))
```

Diyalog, Electron'un ana dizininden açılır. iletişim kutusunu bir oluşturucu işlem nesnesinde kullanmak isterseniz, uzaktan erişim kullanarak erşiebileceğinizi unutmayın:

```javascript
const {dialog} = ihtiyaç('electron').dolaylı
console.log(dialog)
```

## Yöntemler

`dialog` modülü aşağıdaki yöntemleri içerir:

### `dialog.showOpenDialog([browserWindow, ]seçenekleri[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Nesne 
  * `title` Dize (isteğe bağlı)
  * `defaultPath` dizi (isteğe bağlı)
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `özellikler` Dizge[] (isteğe bağlı) - İletişimin hangi özellikleri kullanması gerektiğini içerir. Aşağıdaki değerler desteklenmektedir: 
    * `openFile` - Dosyaların seçilmesine izin ver.
    * `openDirectory` - Dizinlerin seçilmesine izin ver.
    * `multiSelections` - Birden fazla yolun seçilmesine izin ver.
    * `showHiddenFiles` - Gizli dosyaları iletişim kutusuna gösterin.
    * `createDirectory` *macOS* - Allow creating new directories from dialog.
    * `promptToCreate` *Windows* - Prompt for creation if the file path entered in the dialog does not exist. Bu, aslında belirtilen yolda yeni dosyanın oluşturulmasına neden olmaz ancak iletişim kutusundan var olmayan bir yolu döndürmenize izin verir, iletişim kutusundan çıktıktan sonra yeni dosya uygulama tarafından oluşturulmalıdır.
    * `noResolveAliases` *macOS* - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` *macOS* - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `mesaj` dizi(isteğe bağlı) *macOS* -Girdi kutularının üstünde görüntülenecek ileti.
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Fonksiyon (isteğe bağlı) 
  * `filePaths` Dize[] - Kullanıcı tarafından seçilen bir dosya yolu dizisi
  * `bookmarks` String[] *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

İade`dizge[]`, kullanıcı tarafından seçilen dosya yolları dizisi, eğer geri arama sağlanırsa, ` tanımsız </ 0> iade eder.</p>

<p><code>browserWindow` argümanı, iletişim kutusunun kendisini bir üst pencereye eklemesine izin verir ve onu kalıcı hale getirir.

` filtreleri </ 0>, görüntülenebilecek dosya türleri dizisini belirtir veya Kullanıcıyı belirli bir özelliğe sınırlamak istediğinizde seçili. Örneğin:</p>

<pre><code class="javascript">{
 filtreler: [
    {isim: 'görüntüler', uzantılar: ['jpg', 'png', 'gif']},
    {isim: 'filmler', uzantılar: ['mkv', 'avi', 'mp4']},
    {isim: 'Özel Dosya Türü', uzantılar: ['as']},
    {isim: 'Tüm dosyalar', uzantılar: ['*']}
  ]
}
`</pre> 

` uzantılar </ 0> dizisi, joker karakter içermeyen uzantıları içermelidir veya noktalar (ör.
<code> 'png' </ 0> iyidir ancak <code> '. Png' </ 0> ve <code> '*. Png' </ 0> kötü). Tüm dosyaları göstermek için,
<code> '*' </ 0> joker karakteri kullan (başka bir joker karakter desteklenmiyor).</p>

<p>If a <code>callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`.

** Not: </ 0>Windows ve Linux'ta açık bir iletişim kutusu, hem bir dosya seçici hem de bir dizin seçici olamaz. dolayısıyla `özellikleri` için `['openFile', 'openDirectory']` Bu platformlarda bir dizin seçici gösterilir.</p> 

### `dialog.showSaveDialog([browserWindow, ]seçenekleri[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `seçenekler` Nesne 
  * `title` Dize (isteğe bağlı)
  * `defaultPath`dizi (isteğe bağlı) -Varsayılan olarak kullanılacak mutlak dizin yolu, mutlak dosya yolu veya dosya adı.
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `mesaj` dize (isteğe bağlı) *macOS* - Metin alanlarının üstünde görüntülenecek ileti.
  * `nameFieldLabel` dize (isteğe bağlı) *macOS* - Dosya adı metin alanının önünde görüntülenen metin için özel etiket.
  * `showsTagField`Boolean (isteğe bağlı) *macOS* - Etiket giriş kutusunu göster, varsayılan olarak ` doğru </ 0> 'dır.</li>
<li><code>securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `geri aramak` Fonksiyon (isteğe bağlı) 
  * `dosya adı` dize
  * `bookmark` String *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Iade`dize`kullanıcı tarafından seçilen dosyanın yolu, bir geri arama sağlanırsa, ` tanımsız</ 0> değerini iade eder.</p>

<p><code>browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

` filtreleri </ 0>, görüntülenebilen dosya türleri dizisini belirtir, bir örnek için <code> dialog.showOpenDialog </ 0> konusuna bakın.</p>

<p>Bir <code> geri arama </ 0> geçilirse, API çağrısı eş zamansız olur ve sonuç <code> Geri arama (dosya adı) </ 0> üzerinden geçilecek.</p>

<h3><code>dialog.showMessageBox([browserWindow, ]seçenekleri[, callback])`</h3> 

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `seçenekler` Nesne 
  * `tip` dize(isteğe bağlı) - olabilir `"yok"`, `"bilgi"`, `"hata"`, `"sorun"` ya da `"uyarı"`. Windows üzerinden,` "soru" </ 0>, <code> "bilgi" ` ile aynı simgeyi görüntüler, ` "simgesi" </ 0> seçeneğini kullanarak bir simge belirlemediğiniz sürece. MacOS üzerinden,<code>"uyarı"` ve `"hata"` her ikisi de aynı uyarı simgesini gösterir.
  * `düğmeleri` dize[] (isteğe bağlı) -Düğmeler için metin dizisi. Windows'ta, boş bir dizi, "Tamam" etiketli bir düğme ile sonuçlanır.
  * `varsayılan Kimlik` tamsayı(isteğe bağlı)-Düğmeler dizisindeki düğme dizini, ileti kutusu açıldığında varsayılan olarak seçilir.
  * `başlık` dize(isteğe bağlı) - Mesaj kutusunun başlığı, bazı platformlar bunu göstermeyecektir.
  * `mesaj` dize- Mesaj kutusunun içeriği.
  * ` ayrıntı </ 0> Dizge (isteğe bağlı) - Mesajın ek bilgileri.</li>
<li><code>checkboxLabel` dizge(isteğe bağlı) - sağlandıysa, ileti kutusu verilen etiketi içeren bir onay kutusu içerir. Onay kutusu durumu yalnızca ` geri arama </ 0> kullanılırken incelenebilir.</li>
<li><code>checkboxChecked` Boolean (isteğe bağlı) -Onay kutusunun başlangıçta kontrol edilmiş durumu. ` yanlış </ 0> varsayılan olarak.</li>
<li><code>icon` [NativeImage](native-image.md) (isteğe bağlı)
  * `cancelId` Integer (isteğe bağlı) - Diyalogu iptal etmek için kullanılacak düğmenin indeksi,` Esc </ 0> tuşu ile. Varsayılan olarak bu, etiket olarak "iptal" veya "hayır" ile ilk düğmeye atanır. Böyle bir etiketli düğme yoksa ve bu seçenek ayarlanmamışsa, <code>0`dönüş değeri veya geri arama yanıtı olarak kullanılacaktır. Bu seçenek Windows'ta yok sayılır.
  * `noLink` Boolean (isteğe bağlı) - Windows Elektron' da `buttons`' dan hangisinin ortak düğmeler olduğunu ve diğer iletişim kutusundaki komutların bağlantılarını anlamaya çalışacağız ("İptal" veya "Evet" gibi). Bu işlem diyaloğun modern Windows aplikasyonu tarzında çıkmasını sağlar. Bu davranış hoşunuza gitmiyorsa, `noLink` `true` ayarlayabilirsiniz.
  * `normalizeAccessKeys` Boolean (İsteğe Bağlı) - Platformlar arasında klavye erişim anahtarlarını normalize eder. Varsayılan `false`'dur. Bunun etkinleştirilmesi, klavye kısayol erişim anahtarının yerleştirilmesi için düğme etiketlerinde `&` kullanıldığını ve etiketlerin her platformda doğru şekilde çalışacak şekilde dönüştürüleceğini varsayar, `&` karakterler macOS'ta kaldırılır, Linux'ta `_` olarak dönüştürülür ve Windows'ta dokunulmaz bırakılır. Örneğin; `Vie&w` düğme etiketi Linux' ta `Vie_w` ve macOS' ta `View` olarak dönüştürülecektir, Windows ve Linux' ta `Alt-W` yoluyla seçilebilir.
* `geri aramak` Fonksiyon (isteğe bağlı) 
  * `response` Number - Tıklanan düğmenin yolu.
  * `checkboxChecked` Boolean - `checkboxLabel` onay kutusu işaretli olarak ayarlanmış olmalıdır. Aksi halde `false`.

`Integer` tıklanan düğmenin indeksini döndürür, eğer bir geri dönüş sağlanırsa tanımsız bir şekilde geri döndürür.

Bir mesaj kutusu gösterir, ileti kutusu kapanıncaya kadar söz konusu işlemi engeller. Tıklanan düğmenin dizinini döndürür.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

Eğer bir `callback` geçilirse, Sonuç `callback(response)`üzerinden iletilecek ve API çağrısı eş zamansız olacaktır.

### `diyalog.showErrorBox(başlık, içerik)`

* `title` dizi - Hata kutusunda görüntülenecek başlığı belirler.
* `content` dizi - Hata kutusunda görüntülenecek olan metnin içeriğini belirler.

Bir hata iletisi gösteren bir kalıcı iletişim kutusu görüntüler.

Bu API daha önce güvenli bir şekilde çağrılabilir `ready` event the `app` module emits, genellikle yıldızın erken safhasındaki hataları bildirmek için kullanılır. Uygulama öncesi aradıysa `ready`event on Linux'ta, mesaj stderr'e gönderilecek.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `seçenekler` Nesne 
  * `certificate` [Certificate](structures/certificate.md) - Sertifika için güven ve önemi belirtir.
  * `message` String - Kullanıcı tarafından görüntülenecek mesajı belirtir.
* `callback` Function

MacOS'ta, bu, bir ileti ve sertifikayı gösteren bir kalıcı iletişim kutusu görüntüler kullanıcıya aşağıdakilere güven / giriş imkanı verir. `browserWindow` Argümentini sağladığınızda, iletişim kutusu ana pencereye eklenerek kalıcı hale gelir.

Windows işletim sisteminde Win32'de kullnaılan API nedeniyle seçenekler daha kısıtlıdır:

* `message` argümanı İşletim sisteminin kendi onay diyaloğunu kullanması sebebiyle kullanılmıyor,.
* `browserWindow`' ı kalıcı bir onay kutusu haline getirmek mümkün olmadığından argümanı yok sayılır.

## Sayfalar

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Sayfalara eklenen Windows çerçevesinden ofset değerini değiştirmek için `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` komutunu çağırabilirsiniz.