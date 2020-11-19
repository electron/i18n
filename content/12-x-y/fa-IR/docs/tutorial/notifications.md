# اعلان ها (ویندوز، لینوکس، مک‌اواس)

## نمای کلی

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## مثال

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

در حالی که کد و تجربه کاربر در تمامی سیستم عامل ها مشابه، تفاوت های ظریفی در آن ها وجود دارد.

### ویندوز

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. توجه داشته باشید، با این حال، برنامه شما نیاز نیست به صفحه شروع حتما دوخته شده باشد.
* در ویندوز ۷، اعلان ها با یک شبیه سازی سفارشی مانند سیستم عامل های جدید کار می کند.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

در ویندوز ۸, حداکثر طول متن اعلان ها ۲۵۰ کاراکتر میباشد، با این حال تیم ویندوز توصیه می کند که طول متن شما بیش از ۲۰۰ کاراکتر نباشد. آنها گفته اند که این محدودیت به درخواست توسعه دهندگاند در ویندوز ۱۰ حذف گردیده است. به هر حال ارسال متن های عظیم (هزاران کاراکتر) توسط API میتواند باعث بی ثباتی در آن شود.

#### اعلان های پیشرفته

نسخه های جدید ویندوز به شما اجازه میدهد که اعلان های پیشرفته، در قالب های سفارشی، عکس و المنت های منعطف دیگر ارسال کنید. برای ارسال اینگونه اعلان ها (از فرایند اصلی یا فرایند رندرینگ)، شما میتوانید از ماژول [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) استفاده نمیایید که از افزونه های بودی Node برای ارسال اشیاء `ToastNotification` و `TileNotification` استفاده میکند.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### ساعت آرام / حالت ارائه

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### مک‌اواس

اعلان ها در مک‌اواس مستقیم اجرا می شود، با این حال مشا باید از [دستورالعمل رابط کاربری اپل در مورد اعلان ها][apple-notification-guidelines] مطلع شوید.

توجه کنید که اندازه اعلان ها محدود به 256 بایت می باشد و اگر از این محدوده عبور کنید، خودکار متن شما کم می شود.

#### اعلان های پیشرفته

نسخه های جدید مک‌اواس به شما اجازه می دهد تا اعلان هایی همراه با فیلد ورودی ایجاد کنید که توسط آن به کاربر اجازه دهید به اعلان شما پاسخ دهد. برای ارسال اعلان با قابلیت فیلد ورودی شما نیاز به ماژول [node-mac-notifier][node-mac-notifier] خواهید داشت.

#### مزاحم نشوید / حالت جلسه

برای تشخیص آنکه کی یا چه زمانی اجازه ارسال اعلان ها را ندارید، نیاز به استفاده از ماژول [electron-notification-state][electron-notification-state] خواهید داشت.

این به شما اجازه میدهد که قبل از ارسال اعلان متوجه شوید که اجازه ارسال اعلان ها را دارید یا خیر.

### لینوکس

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
