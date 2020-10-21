# Using Pepper Flash Plugin

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## إعداد نسخة من الملحق الفلاش

على macOS و Linux، يمكن العثور على تفاصيل البرنامج المساعد Pepper Flash من خلال الانتقال إلى `chrome://version` في متصفح Chrome . موقعه وإصداره مفيدان لدعم فلاش Pepper الخاص بـ Electrons. يمكنك أيضا نسخه إلى موقع آخر.

## إضافة مفتاح إلكترون

يمكنك إضافة `--ppapi-flash-path` و `--ppapi-flash-version` إلى سطر أمر إلكترون أو باستخدام `تطبيق. ommandLine.appendSwitch` method قبل أن يكون التطبيق جاهزا. أيضًا ، قم بتشغيل خيار `الإضافات` `نافذة المتصفح`.

وعلى سبيل المثال:

```javascript
متجر { app, BrowserWindow } = مطلوبة ('electron')
مسار المسار = مطلوبة ('path')

// حدد مسار فلاش، افترض أنه وضع في نفس الدليل مع أساسي. s.
دع pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer. ll'
    استراحة
  حالة 'Darwin':
    pluginName = 'PepperFlashPlayer. Lugin'
    استراحة
  حالة 'linux':
    pluginName = 'libpepflashplayer. o'
    استراحة
}
تطبيق. ommandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// اختياري: تحديد إصدار فلاش، على سبيل المثال، v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady(). hen(() => {
  const win = BrowserWindow({
    : 800,
    الطول: 600,
    webPreferences: {
      plugins: true
    }
  })
  الفوز. oadURL(`file://${__dirname}/index.html`)
  // شيء آخر
})
```

يمكنك أيضًا محاولة تحميل البرنامج المساعد Pepper فلاش على نطاق النظام بدلاً من شحن المكونات الإضافية بنفسك، يمكن تلقي مساره عن طريق الاتصال بـ `تطبيق. etPath('pepperFlashSystemPlugin')`.

## تمكين إضافة فلاش في وسم `<webview>`

إضافة خاصية `الإضافات` إلى `<webview>` علامة.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## اكتشاف الأخطاء وإصلاحها

يمكنك التحقق مما إذا كان Pepper Flash تم تحميله عن طريق فحص متنقل `Lugins` في وحدة التحكم الخاصة بـ devtools (على الرغم من أنك لا تستطيع معرفة ما إذا كان مسار المكون الإضافي صحيح).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

لبعض العمليات، مثل بث الوسائط باستخدام RTMP ، من الضروري منح أذونات أوسع لملفات اللاعبين `.swf`. إحدى الطرق لتحقيق ذلك، استخدام [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
