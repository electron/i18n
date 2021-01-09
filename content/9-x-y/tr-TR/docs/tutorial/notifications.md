# Bildirimler (Windows, Linux, macOS)

Tüm üç işletim sistemi, uygulamalar için kullanıcıya bildirim gönderme olanağı sağlar. Elektron, geliştiricilerin [ HTML5 Bildirim API'sı ](https://notifications.spec.whatwg.org/), ile halihazırda çalışan işletim sistemlerinin yerel bildirim API'sini görüntüleme için kullanarak bildirim göndermeleri için elverişlidir.

** Not: ** Bu bir HTML5 API'sı olduğundan, yalnızca oluşturucu işleminde kullanılabilir. Eğer ana süreç içerisinde bildirimleri göstermek istiyorsanız lütfen [Notification](../api/notification.md) modülünü inceleyin.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

İşletim sistemlerinde kod ve kullanıcı deneyimi benzer olduğu halde ince farklılıklar vardır.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Not, ancak başlangıç ekranına tutturulmasına gerek yoktur.
* Windows 7 üzerinde iş tebliğ yolu ile bireysel olarak uygulanan ve gözle görünür biçimde benzerlik gosteren yerli ve yenilikçi sistemlerdir.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Ayrıca, Windows 8'de bildirim gövdesi için maksimum uzunluk 250 karakterken, Windows ekibi, bildirimlerin 200 karakterde tutulması gerektiğini önermektedir. Yani, Windows ekibi geliştiriciler için makul olmak isteyerek bu limiti Windows 10 ile birlikte kaldırıldığını söyledi. API'ya dev miktarlarda metin göndermek (binlerce karakter) dengesizlik yaratabilir.

### Gelişmiş bildirimler

Windows'un daha sonraki sürümleri, gelişmiş bildirimlere, özel şablonlara, görüntüler ve diğer esnek öğelere izin verir. Bu bildirimleri göndermek için (ana işlemde yada oluşturucu işleminde), göndermek için yerel düğüm eklentilerini `ToastNotification` ve `TileNotification` objelerini kullanan userland modülünü kullanın [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications).

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Sessiz Saatler / Sunum modu

Bir bildirim gönderme izninizin olup olmadığını saptamak için, userland modülünü kullanın [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Bu, Windows'un bildirimi sessizce atıp atmayacağını önceden belirlemenizi sağlar.

## macOS

Bildirimler MacOS'ta açıktır; ancak [ Apple'ın İnsan Arayüzü yönerge bildirimlerinin](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/) farkında olmalısınız.

Not, bu bildirimler 256 byte ile sınırlıdır ve bu sınırı aşarsa kesilecektir.

### Gelişmiş bildirimler

MacOS'un daha sonraki sürümleri, kullanıcılara bildirimlere hızlıca cevap verebilmeleri için bildirimler ile bir girdi alanına izin verir. Bildirimleri bir girdi alanıyla göndermek için userland modülünü kullanın [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Rahatsız etmeyin / Seans anı

Bir bildirim gönderme izninizin olup olmadığını saptamak için, userland modülünü kullanın [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Bu, bildirimin görüntülenip görüntülenmeyeceğini önceden tespit etmenize olanak tanır.

## Linux

Bildirimler, `libnotify` kullanılarak gönderilir; bunlar herhangi birinde bildirim gösterebilir [Desktop Notifications Specification][notification-spec], Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
