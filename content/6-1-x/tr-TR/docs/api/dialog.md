# diyalog

> Dosyaları açma ve kaydetme, uyarı verme, vb için yerel sistem diyaloglarını görüntüleme.

İşlem: [Ana](../glossary.md#main-process)

Birden çok dosya ve dizin seçmek için bir iletişim kutusunu gösteren örnek:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## Yöntemler

`dialog` modülü aşağıdaki yöntemleri içerir:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `title` Dize (isteğe bağlı)
  * `defaultPath` dizi (isteğe bağlı)
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Dosyaların seçilmesine izin ver.
    * `openDirectory` - Dizinlerin seçilmesine izin ver.
    * `multiSelections` - Birden fazla yolun seçilmesine izin ver.
    * `showHiddenFiles` - Gizli dosyaları iletişim kutusuna gösterin.
    * `createDirectory` _macOS_ - Dialog modülünden yeni klasörler oluşturmaya izin verir.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Bu, aslında belirtilen yolda yeni dosyanın oluşturulmasına neden olmaz ancak iletişim kutusundan var olmayan bir yolu döndürmenize izin verir, iletişim kutusundan çıktıktan sonra yeni dosya uygulama tarafından oluşturulmalıdır.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `mesaj` dizi(isteğe bağlı) _macOS_ -Girdi kutularının üstünde görüntülenecek ileti.
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Örneğin:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

` uzantılar </ 0> dizisi, joker karakter içermeyen uzantıları içermelidir veya noktalar (ör.
<code> 'png' </ 0> iyidir ancak <code> '. Png' </ 0> ve <code> '*. Png' </ 0> kötü). Tüm dosyaları göstermek için,
<code> '*' </ 0> joker karakteri kullan (başka bir joker karakter desteklenmiyor).</p>

<p spaces-before="0"><strong x-id="1"> Not: </ 0>Windows ve Linux'ta açık bir iletişim kutusu, hem bir dosya seçici hem de bir dizin seçici olamaz. dolayısıyla <code>özellikleri` için `['openFile', 'openDirectory']` Bu platformlarda bir dizin seçici gösterilir.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `title` Dize (isteğe bağlı)
  * `defaultPath` dizi (isteğe bağlı)
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - Dosyaların seçilmesine izin ver.
    * `openDirectory` - Dizinlerin seçilmesine izin ver.
    * `multiSelections` - Birden fazla yolun seçilmesine izin ver.
    * `showHiddenFiles` - Gizli dosyaları iletişim kutusuna gösterin.
    * `createDirectory` _macOS_ - Dialog modülünden yeni klasörler oluşturmaya izin verir.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Bu, aslında belirtilen yolda yeni dosyanın oluşturulmasına neden olmaz ancak iletişim kutusundan var olmayan bir yolu döndürmenize izin verir, iletişim kutusundan çıktıktan sonra yeni dosya uygulama tarafından oluşturulmalıdır.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `mesaj` dizi(isteğe bağlı) _macOS_ -Girdi kutularının üstünde görüntülenecek ileti.
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Fonksiyonu (opsiyonel)

Returns `Promise<Object>` - Resolve wih an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Örneğin:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

` uzantılar </ 0> dizisi, joker karakter içermeyen uzantıları içermelidir veya noktalar (ör.
<code> 'png' </ 0> iyidir ancak <code> '. Png' </ 0> ve <code> '*. Png' </ 0> kötü). Tüm dosyaları göstermek için,
<code> '*' </ 0> joker karakteri kullan (başka bir joker karakter desteklenmiyor).</p>

<p spaces-before="0"><strong x-id="1"> Not: </ 0>Windows ve Linux'ta açık bir iletişim kutusu, hem bir dosya seçici hem de bir dizin seçici olamaz. dolayısıyla <code>özellikleri` için `['openFile', 'openDirectory']` Bu platformlarda bir dizin seçici gösterilir.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `title` Dize (isteğe bağlı)
  * `defaultPath`dizi (isteğe bağlı) -Varsayılan olarak kullanılacak mutlak dizin yolu, mutlak dosya yolu veya dosya adı.
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `mesaj` dize (isteğe bağlı) _macOS_ - Metin alanlarının üstünde görüntülenecek ileti.
  * `nameFieldLabel` dize (isteğe bağlı) _macOS_ - Dosya adı metin alanının önünde görüntülenen metin için özel etiket.
  * `showsTagField`Boolean (isteğe bağlı) _macOS_ - Etiket giriş kutusunu göster, varsayılan olarak ` doğru </ 0> 'dır.</li>
<li><code>securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

` filtreleri </ 0>, görüntülenebilen dosya türleri dizisini belirtir, bir örnek için <code> dialog.showOpenDialog </ 0> konusuna bakın.</p>

<h3 spaces-before="0"><code>dialog.showSaveDialog([browserWindow, ]options)`</h3>

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `title` Dize (isteğe bağlı)
  * `defaultPath`dizi (isteğe bağlı) -Varsayılan olarak kullanılacak mutlak dizin yolu, mutlak dosya yolu veya dosya adı.
  * `buttonLabel` Dize (isteğe bağlı) - Onay tuşu için özel etiket, boş bırakıldığında varsayılan etiket kullanılacaktır.
  * `filtreler` [FileFilter[]](structures/file-filter.md) (isteğe bağlı)
  * `mesaj` dize (isteğe bağlı) _macOS_ - Metin alanlarının üstünde görüntülenecek ileti.
  * `nameFieldLabel` dize (isteğe bağlı) _macOS_ - Dosya adı metin alanının önünde görüntülenen metin için özel etiket.
  * `showsTagField`Boolean (isteğe bağlı) _macOS_ - Etiket giriş kutusunu göster, varsayılan olarak ` doğru </ 0> 'dır.</li>
<li><code>securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `canceled` Boolean - whether or not the dialog was canceled.
  * `filePath` String (optional) If the dialog is canceled this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

` filtreleri </ 0>, görüntülenebilen dosya türleri dizisini belirtir, bir örnek için <code> dialog.showOpenDialog </ 0> konusuna bakın.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> On macOS, using the asynchronous version is recommended to avoid issues when
expanding and collapsing the dialog.</p>

<h3 spaces-before="0"><code>dialog.showMessageBoxSync([browserWindow, ]options)`</h3>

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `tip` dize(isteğe bağlı) - olabilir `"yok"`, `"bilgi"`, `"hata"`, `"sorun"` ya da `"uyarı"`. Windows üzerinden,` "soru" </ 0>, <code> "bilgi" ` ile aynı simgeyi görüntüler, ` "simgesi" </ 0> seçeneğini kullanarak bir simge belirlemediğiniz sürece. MacOS üzerinden,<code>"uyarı"` ve `"hata"` her ikisi de aynı uyarı simgesini gösterir.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `varsayılan Kimlik` tamsayı(isteğe bağlı)-Düğmeler dizisindeki düğme dizini, ileti kutusu açıldığında varsayılan olarak seçilir.
  * `başlık` dize(isteğe bağlı) - Mesaj kutusunun başlığı, bazı platformlar bunu göstermeyecektir.
  * `mesaj` dize- Mesaj kutusunun içeriği.
  * ` ayrıntı </ 0> Dizge (isteğe bağlı) - Mesajın ek bilgileri.</li>
<li><code>checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı)
  * `cancelId` Integer (isteğe bağlı) - Diyalogu iptal etmek için kullanılacak düğmenin indeksi,` Esc </ 0> tuşu ile. Varsayılan olarak bu, etiket olarak "iptal" veya "hayır" ile ilk düğmeye atanır. Böyle bir etiketli düğme yoksa ve bu seçenek ayarlanmamışsa, <code>0`dönüş değeri veya geri arama yanıtı olarak kullanılacaktır.
  * `noLink` Boolean (isteğe bağlı) - Windows Elektron' da `buttons`' dan hangisinin ortak düğmeler olduğunu ve diğer iletişim kutusundaki komutların bağlantılarını anlamaya çalışacağız ("İptal" veya "Evet" gibi). Bu işlem diyaloğun modern Windows aplikasyonu tarzında çıkmasını sağlar. Bu davranış hoşunuza gitmiyorsa, `noLink` `true` ayarlayabilirsiniz.
  * `normalizeAccessKeys` Boolean (İsteğe Bağlı) - Platformlar arasında klavye erişim anahtarlarını normalize eder. Varsayılan `false`'dur. Bunun etkinleştirilmesi, klavye kısayol erişim anahtarının yerleştirilmesi için düğme etiketlerinde `&` kullanıldığını ve etiketlerin her platformda doğru şekilde çalışacak şekilde dönüştürüleceğini varsayar, `&` karakterler macOS'ta kaldırılır, Linux'ta `_` olarak dönüştürülür ve Windows'ta dokunulmaz bırakılır. Örneğin; `Vie&w` düğme etiketi Linux' ta `Vie_w` ve macOS' ta `View` olarak dönüştürülecektir, Windows ve Linux' ta `Alt-W` yoluyla seçilebilir.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `tip` dize(isteğe bağlı) - olabilir `"yok"`, `"bilgi"`, `"hata"`, `"sorun"` ya da `"uyarı"`. Windows üzerinden,` "soru" </ 0>, <code> "bilgi" ` ile aynı simgeyi görüntüler, ` "simgesi" </ 0> seçeneğini kullanarak bir simge belirlemediğiniz sürece. MacOS üzerinden,<code>"uyarı"` ve `"hata"` her ikisi de aynı uyarı simgesini gösterir.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `varsayılan Kimlik` tamsayı(isteğe bağlı)-Düğmeler dizisindeki düğme dizini, ileti kutusu açıldığında varsayılan olarak seçilir.
  * `başlık` dize(isteğe bağlı) - Mesaj kutusunun başlığı, bazı platformlar bunu göstermeyecektir.
  * `mesaj` dize- Mesaj kutusunun içeriği.
  * ` ayrıntı </ 0> Dizge (isteğe bağlı) - Mesajın ek bilgileri.</li>
<li><code>checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (isteğe bağlı)
  * `cancelId` Integer (isteğe bağlı) - Diyalogu iptal etmek için kullanılacak düğmenin indeksi,` Esc </ 0> tuşu ile. Varsayılan olarak bu, etiket olarak "iptal" veya "hayır" ile ilk düğmeye atanır. Böyle bir etiketli düğme yoksa ve bu seçenek ayarlanmamışsa, <code>0`dönüş değeri veya geri arama yanıtı olarak kullanılacaktır.
  * `noLink` Boolean (isteğe bağlı) - Windows Elektron' da `buttons`' dan hangisinin ortak düğmeler olduğunu ve diğer iletişim kutusundaki komutların bağlantılarını anlamaya çalışacağız ("İptal" veya "Evet" gibi). Bu işlem diyaloğun modern Windows aplikasyonu tarzında çıkmasını sağlar. Bu davranış hoşunuza gitmiyorsa, `noLink` `true` ayarlayabilirsiniz.
  * `normalizeAccessKeys` Boolean (İsteğe Bağlı) - Platformlar arasında klavye erişim anahtarlarını normalize eder. Varsayılan `false`'dur. Bunun etkinleştirilmesi, klavye kısayol erişim anahtarının yerleştirilmesi için düğme etiketlerinde `&` kullanıldığını ve etiketlerin her platformda doğru şekilde çalışacak şekilde dönüştürüleceğini varsayar, `&` karakterler macOS'ta kaldırılır, Linux'ta `_` olarak dönüştürülür ve Windows'ta dokunulmaz bırakılır. Örneğin; `Vie&w` düğme etiketi Linux' ta `Vie_w` ve macOS' ta `View` olarak dönüştürülecektir, Windows ve Linux' ta `Alt-W` yoluyla seçilebilir.

Returns `Promise<Object>` - resolves with a promise containing the following properties:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box, it will block the process until the message box is closed.

`browserWindow` argüman, iletişim kutusunun kendisini bir üst pencereye iliştirmesine izin verir ve onu modal hale getirir.

### `diyalog.showErrorBox(başlık, içerik)`

* `title` dizi - Hata kutusunda görüntülenecek başlığı belirler.
* `content` dizi - Hata kutusunda görüntülenecek olan metnin içeriğini belirler.

Bir hata iletisi gösteren bir kalıcı iletişim kutusu görüntüler.

Bu API daha önce güvenli bir şekilde çağrılabilir `ready` event the `app` module emits, genellikle yıldızın erken safhasındaki hataları bildirmek için kullanılır. Uygulama öncesi aradıysa `ready`event on Linux'ta, mesaj stderr'e gönderilecek.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - Sertifika için güven ve önemi belirtir.
  * `message` String - Kullanıcı tarafından görüntülenecek mesajı belirtir.
* `callback` Function

MacOS'ta, bu, bir ileti ve sertifikayı gösteren bir kalıcı iletişim kutusu görüntüler kullanıcıya aşağıdakilere güven / giriş imkanı verir. `browserWindow` Argümentini sağladığınızda, iletişim kutusu ana pencereye eklenerek kalıcı hale gelir.

Windows işletim sisteminde Win32'de kullnaılan API nedeniyle seçenekler daha kısıtlıdır:

* `message` argümanı İşletim sisteminin kendi onay diyaloğunu kullanması sebebiyle kullanılmıyor,.
* `browserWindow`' ı kalıcı bir onay kutusu haline getirmek mümkün olmadığından argümanı yok sayılır.

**[Deprecated Soon](modernization/promisification.md)**

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (isteğe bağlı)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - Sertifika için güven ve önemi belirtir.
  * `message` String - Kullanıcı tarafından görüntülenecek mesajı belirtir.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

MacOS'ta, bu, bir ileti ve sertifikayı gösteren bir kalıcı iletişim kutusu görüntüler kullanıcıya aşağıdakilere güven / giriş imkanı verir. `browserWindow` Argümentini sağladığınızda, iletişim kutusu ana pencereye eklenerek kalıcı hale gelir.

Windows işletim sisteminde Win32'de kullnaılan API nedeniyle seçenekler daha kısıtlıdır:

* `message` argümanı İşletim sisteminin kendi onay diyaloğunu kullanması sebebiyle kullanılmıyor,.
* `browserWindow`' ı kalıcı bir onay kutusu haline getirmek mümkün olmadığından argümanı yok sayılır.

## Sayfalar

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Sayfalara eklenen Windows çerçevesinden ofset değerini değiştirmek için `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` komutunu çağırabilirsiniz.
