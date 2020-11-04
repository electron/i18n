# Using Selenium and WebDriver

من [ChromeDriver - WebDriver لـ Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> مشغل الويب هو أداة مفتوحة المصدر للاختبار الآلي لتطبيقات الويب عبر العديد من المتصفحات. يوفر القدرات للتنقل إلى صفحات الويب، ومدخلات المستخدم، تنفيذ جافا سكريبت، وأكثر من ذلك. ChromeDriver هو خادم مستقل يقوم بتنفيذ بروتوكول سلك WebDriver's لـ Chromium. يتم تطويره من قبل أعضاء فرق Chromium و WebDriver.

## وضع Spectron

</> Spectron </ 0> هو إطار اختبار ChromeDriver المدعوم رسميًا للإلكترون. It is built on top of [WebdriverIO](https://webdriver.io/) and has helpers to access Electron APIs in your tests and bundles ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// يتم فتح اختبار بسيط للتحقق من النافذة المرئية بعنوان
تطبيق المنصة = مطلوب('spectron'). التكرار
تأكيد = مطلوب('تأكيد')

const myApp = New Application({
  path: '/Applications/MyApp. pp/contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  بانتظار التطبيق. tart()
  جرب {
    // تحقق مما إذا كانت النافذة مرئية
    isvisible = بانتظار التطبيق. صفوف. sVisible()
    // التحقق من النافذة مرئية
    تأكيد trtEqual(isvisible, true)
    // احصل على عنوان النافذة
    عنوان المتجر = انتظار التطبيق. lient.getTitle()
    // التحقق من عنوان النافذة
    التأكيد. trictEqual(عنوان، 'تطبيقي')
  } اصطياد (خطأ) {
    // سجل أي فشل
    . rror('فشل الاختبار'، خطأ. مقالة)
  }
  // أوقف التطبيق
  في انتظار التطبيق.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## الإعداد مع WebDriverJs

[WebDriverJs](https://www.selenium.dev/selenium/docs/api/javascript/index.html) provides a Node package for testing with web driver, we will use it as an example.

### 1. بدء تشغيل ChromeDriver

أولاً تحتاج إلى تنزيل النهر `الكروميدفر` الثنائي، وتشغيلها:

```sh
$ npm تثبيت electron-chromedriver
$ ./node_modules/.bin/chromedriver
بدء تشغيل ChromeDriver (v2.10.291558) على المنفذ 9515
مسموح فقط بالاتصالات المحلية.
```

تذكر رقم المنفذ `9515`، الذي سيتم استخدامه في وقت لاحق

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. الاتصال بـ ChromeDriver

استخدام `سيلينيوم - ويب مشغل` مع إلكترون هو نفسه مع ما قبل التدفق، باستثناء أنه يجب عليك أن تحدد يدوياً كيفية توصيل سائق الكروم وأين تجد الكلترون ثنائي:

```javascript
const webdriver = require('selenum-webdriver')

const driver = webdriver.Builder()
  // The "9515" هو المنفذ الذي يفتحه سائق كروم.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      / هنا هو الطريق إلى binary الخاص بك.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q').sendKeys('webdriver')
driver. indElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  return driver.getTitle(). hen(title) => {
    Retitle === 'webdriver - Google Search'
  })
}، 1000)

سائق. uit()
```

## الإعداد مع WebdriverIO

[WebdriverIO](https://webdriver.io/) provides a Node package for testing with web driver.

### 1. بدء تشغيل ChromeDriver

أولاً تحتاج إلى تنزيل النهر `الكروميدفر` الثنائي، وتشغيلها:

```sh
$npm تثبيت electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
بدء ChromeDriver (v2.10.291558) على المنفذ 9515
يسمح فقط بالاتصالات المحلية.
```

تذكر رقم المنفذ `9515`، الذي سيتم استخدامه في وقت لاحق

### 2. تثبيت WebdriverIO

```sh
$ npm تثبيت webdriverio
```

### 3. الاتصال بمشغل كروم

```javascript
const webdriverio = مطلوب('webdriverio')
خيارات المتجر = {
  المضيف: 'localhost', // استخدم localhost كخادم مشغل الكروم
  منفذ 9515, // "9515" هو المنفذ الذي فتحه سائق الكروم.
  رغبت في القدرات: {
    المتصفح: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to Your-App/electron', // مسار إلى binary الخاص بك.
      args: [/* cli arguments */] // اختياري، ربما 'app=' + /path/to/your/app/
    }
  }


const client = webdriverio. الرموز التعبيرية (الخيارات)

العميل
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen(title) => {
    console.log('Ttle: ' + title)
  })
  .end()
```

## سير العمل

لاختبار التطبيق الخاص بك دون إعادة بناء إلكترون، [ضع](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) مصدر التطبيق الخاص بك في دليل موارد إلكترون.

بدلاً من ذلك، قم بتمرير حجة للتشغيل مع ثنائيات إلكترون التي تشير إلى مجلد التطبيق الخاص بك. هذا يزيل الحاجة إلى نسخ ولصق التطبيق الخاص بك في دليل موارد Electron.
