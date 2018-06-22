# اعلان ها (ویندوز، لینوکس، مک‌اواس)

در هر سه سیستم عامل قابلیت ارسال اعلان ها از برنامه به کاربر فراهم شده است. الکترون این امکان را به توسعه دهندگان میدهد که توسط [API اعلان ها HTML5](https://notifications.spec.whatwg.org/) بتوانند اعلان های خود را در سیستم عامل در حال اجرا به واسطه API اعلان های سیستم عامل به نمایش بگذارند.

**توجه داشته باشید:** از آنجایی که این یک HTML5 API است، فقط در فرآیند رندرینگ موجود می باشد. اگر شما به دنبال نمایش اعلان ها در فرآیند اصلی هستید، لطفا ماژول [اعلان ها](../api/notification.md) بررسی کنید.

```javascript
let myNotification = new Notification('عنوان', {
  body: 'لورم اپسام'
})

myNotification. => {
  console.log('اعلان کلیک خورد')
}
```

در حالی که کد و تجربه کاربر در تمامی سیستم عامل ها مشابه، تفاوت های ظریفی در آن ها وجود دارد.

## ویندوز

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. توجه داشته باشید، با این حال، برنامه شما نیاز نیست به صفحه شروع حتما دوخته شده باشد.
* در ویندوز ۷، اعلان ها با یک شبیه سازی سفارشی مانند سیستم عامل های جدید کار می کند.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

در ویندوز ۸, حداکثر طول متن اعلان ها ۲۵۰ کاراکتر میباشد، با این حال تیم ویندوز توصیه می کند که طول متن شما بیش از ۲۰۰ کاراکتر نباشد. آنها گفته اند که این محدودیت به درخواست توسعه دهندگاند در ویندوز ۱۰ حذف گردیده است. به هر حال ارسال متن های عظیم (هزاران کاراکتر) توسط API میتواند باعث بی ثباتی در آن شود.

### اعلان های پیشرفته

نسخه های جدید ویندوز به شما اجازه میدهد که اعلان های پیشرفته، در قالب های سفارشی، عکس و المنت های منعطف دیگر ارسال کنید. برای ارسال اینگونه اعلان ها (از فرایند اصلی یا فرایند رندرینگ)، شما میتوانید از ماژول [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) استفاده نمیایید که از افزونه های بودی Node برای ارسال اشیاء `ToastNotification` و `TileNotification` استفاده میکند.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### ساعت آرام / حالت ارائه

برای تشخیص آنکه کی یا چه زمانی اجازه ارسال اعلان ها را ندارید، نیاز به استفاده از ماژول [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) خواهید داشت.

این به شما اجازه می دهد تا قبل از زمان تعیین ارسال، مشخص کنید که آیا ویندوز متوجه اطلاعیه شما خواهد شد یا خیر.

## مک‌اواس

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

توجه کنید که اندازه اعلان ها محدود به 256 بایت می باشد و اگر از این محدوده عبور کنید، خودکار متن شما کم می شود.

### اعلان های پیشرفته

نسخه های جدید مک‌اواس به شما اجازه می دهد تا اعلان هایی همراه با فیلد ورودی ایجاد کنید که توسط آن به کاربر اجازه دهید به اعلان شما پاسخ دهد. برای ارسال اعلان با قابلیت فیلد ورودی شما نیاز به ماژول [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier) خواهید داشت.

### مزاحم نشوید / حالت جلسه

برای تشخیص آنکه کی یا چه زمانی اجازه ارسال اعلان ها را ندارید، نیاز به استفاده از ماژول [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) خواهید داشت.

این به شما اجازه میدهد که قبل از ارسال اعلان متوجه شوید که اجازه ارسال اعلان ها را دارید یا خیر.

## لینوکس

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.