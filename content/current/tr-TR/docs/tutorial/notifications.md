# Bildirimler (Windows, Linux, macOS)

## Genel Bakış

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## Örnek

### Show notifications in the Renderer process

Assuming you have a working Electron application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

After launching the Electron application, you should see the notification:

![Notification in the Renderer process](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Onclick message for the notification](../images/message-notification-renderer.png)

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

After launching the Electron application, you should see the notification:

![Notification in the Main process](../images/notification-main.png)

## Additional information

İşletim sistemlerinde kod ve kullanıcı deneyimi benzer olduğu halde ince farklılıklar vardır.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Not, ancak başlangıç ekranına tutturulmasına gerek yoktur.
* Windows 7 üzerinde iş tebliğ yolu ile bireysel olarak uygulanan ve gözle görünür biçimde benzerlik gosteren yerli ve yenilikçi sistemlerdir.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

Ayrıca, Windows 8'de bildirim gövdesi için maksimum uzunluk 250 karakterken, Windows ekibi, bildirimlerin 200 karakterde tutulması gerektiğini önermektedir. Yani, Windows ekibi geliştiriciler için makul olmak isteyerek bu limiti Windows 10 ile birlikte kaldırıldığını söyledi. API'ya dev miktarlarda metin göndermek (binlerce karakter) dengesizlik yaratabilir.

#### Gelişmiş bildirimler

Windows'un daha sonraki sürümleri, gelişmiş bildirimlere, özel şablonlara, görüntüler ve diğer esnek öğelere izin verir. Bu bildirimleri göndermek için (ana işlemde yada oluşturucu işleminde), göndermek için yerel düğüm eklentilerini `ToastNotification` ve `TileNotification` objelerini kullanan userland modülünü kullanın [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications).

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Sessiz Saatler / Sunum modu

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

Bildirimler MacOS'ta açıktır; ancak [ Apple'ın İnsan Arayüzü yönerge bildirimlerinin](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/) farkında olmalısınız.

Not, bu bildirimler 256 byte ile sınırlıdır ve bu sınırı aşarsa kesilecektir.

#### Gelişmiş bildirimler

MacOS'un daha sonraki sürümleri, kullanıcılara bildirimlere hızlıca cevap verebilmeleri için bildirimler ile bir girdi alanına izin verir. Bildirimleri bir girdi alanıyla göndermek için userland modülünü kullanın [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Rahatsız etmeyin / Seans anı

Bir bildirim gönderme izninizin olup olmadığını saptamak için, userland modülünü kullanın [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Bu, bildirimin görüntülenip görüntülenmeyeceğini önceden tespit etmenize olanak tanır.

### Linux

Bildirimler, `libnotify` kullanılarak gönderilir; bunlar herhangi birinde bildirim gösterebilir [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), Cinnamon, Enlightenment, Unity, GNOME, KDE.
