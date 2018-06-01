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

* Windows 10'da, bildirimler "sadece çalışır".
* Windows 8.1 ve Windows 8'de, uygulamanızın bir kısayolu [ Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) ile, başlangıç ​​ekranına yüklenmelidir. Not, ancak başlangıç ekranına tutturulmasına gerek yoktur.
* Windows 7 üzerinde iş tebliğ yolu ile bireysel olarak uygulanan ve gözle görünür biçimde benzerlik gosteren yerli ve yenilikçi sistemlerdir.

Ayrıca, Windows 8'de bildirim gövdesi için maksimum uzunluk 250 karakterken, Windows ekibi, bildirimlerin 200 karakterde tutulması gerektiğini önermektedir. Yani, Windows ekibi geliştiriciler için makul olmak isteyerek bu limiti Windows 10 ile birlikte kaldırıldığını söyledi. API'ya dev miktarlarda metin göndermek (binlerce karakter) dengesizlik yaratabilir.

### Gelişmiş bildirimler

Windows'un daha sonraki sürümleri, gelişmiş bildirimlere, özel şablonlara, görüntüler ve diğer esnek öğelere izin verir. Bu bildirimleri göndermek için (ana işlemde yada oluşturucu işleminde), göndermek için yerel düğüm eklentilerini `ToastNotification` ve `TileNotification` objelerini kullanan userland modülünü kullanın [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications).

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Sessiz Saatler / Sunum modu

Bir bildirim gönderme izninizin olup olmadığını saptamak için, userland modülünü kullanın [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Bu, Windows'un bildirimi sessizce atıp atmayacağını önceden belirlemenizi sağlar.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Not, bu bildirimler 256 byte ile sınırlıdır ve bu sınırı aşarsa kesilecektir.

### Gelişmiş bildirimler

MacOS'un daha sonraki sürümleri, kullanıcılara bildirimlere hızlıca cevap verebilmeleri için bildirimler ile bir girdi alanına izin verir. Bildirimleri bir girdi alanıyla göndermek için userland modülünü kullanın [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Rahatsız etmeyin / Seans anı

Bir bildirim gönderme izninizin olup olmadığını saptamak için, userland modülünü kullanın [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Bu, bildirimin görüntülenip görüntülenmeyeceğini önceden tespit etmenize olanak tanır.

## Linux

Bildirimler, `libnotify` kullanılarak gönderilir; bunlar herhangi birinde bildirim gösterebilir [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), Cinnamon, Enlightenment, Unity, GNOME, KDE.