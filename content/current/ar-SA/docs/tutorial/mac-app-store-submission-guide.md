# Mac App Store Submission Guide

منذ v0.34.0، يسمح إلكترون بتقديم تطبيقات حزمة إلى متجر تطبيقات ماك (MAS). يوفر هذا الدليل معلومات عن: كيفية إرسال التطبيق الخاص بك و القيود على بناء MAS.

**ملاحظة:** إرسال تطبيق إلى متجر تطبيقات ماك يتطلب التسجيل في [برنامج مطوري آبل ](https://developer.apple.com/support/compare-memberships/)، والذي يكلف المال.

## كيفية إرسال التطبيق الخاص بك

الخطوات التالية تقدم طريقة بسيطة لإرسال التطبيق الخاص بك إلى متجر تطبيقات Mac . ومع ذلك، فإن هذه الخطوات لا تضمن الموافقة على التطبيق الخاص بك من قبل Apple؛ لا تزال تحتاج إلى قراءة Apple's [تقديم دليل التطبيق](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) الخاص بك في كيفية تلبية متطلبات متجر تطبيقات Mac App.

### الحصول على شهادة

لإرسال تطبيقك إلى متجر تطبيقات Mac ، يجب عليك أولاً الحصول على شهادة من Apple. يمكنك متابعة [هذه الأدلة الموجودة](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) على الويب.

### احصل مُعرّف الفريق

قبل تسجيل تطبيقك، تحتاج إلى معرفة معرف الفريق عن حسابك. لتحديد موقع معرف فريقك، قم بتسجيل الدخول إلى [مركز مطوري Apple](https://developer.apple.com/account/)، وانقر فوق العضوية في الشريط الجانبي. يظهر معرف فريقك في قسم معلومات العضوية تحت اسم الفريق.

### توقيع التطبيق الخاص بك

بعد الانتهاء من أعمال الإعداد، يمكنك حزم التطبيق الخاص بك من خلال متابعة [توزيع التطبيق](application-distribution.md)، ثم انتقل إلى توقيع التطبيق الخاص بك.

أولاً، يجب عليك إضافة مفتاح `ElectronTeamID` إلى معلومات التطبيق `الخاصة بك. قائمة`، التي تحتوي على معرف فريقك كقيمة:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

ثم تحتاج إلى إعداد ثلاثة ملفات للاستحقاقات.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0. td">
<plist version="1.0">
  <dict>
    <key>com.apple.Security pp-sandbox</key>
    <true/>
  </dict>
</plist>
```

يجب عليك استبدال `TEAM_ID` بمعرف فريقك، واستبدال `معرف your.bundle.id` بمعرف الحزمة في التطبيق الخاص بك.

ثم قم بالتوقيع على التطبيق الخاص بك بالنص البرمجي التالي:

```sh
#!/bin/bash

# إسم تطبيقك.
APP="YourApp"
# المسار لتسجيل تطبيقك.
APP_PATH="/path/to/YourApp.app"
# المسار إلى الموقع الذي تريد وضع الحزمة الموقعة.
RESULT_PATH="~/Desktop/$APP.pkg"
# اسم الشهادات التي طلبتها.
APP_KEY="تطبيق مطور Mac الخاص بالطرف الثالث: اسم الشركة (APIDENTITY)"
INSTALLER_KEY="مثبت مطور Mac الخاص بالطرف الثالث: اسم الشركة (APIDENTITY)
# مسار الملفات اللوحية الخاصة بك.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

إذا كنت جديداً على صندوق رملي التطبيق تحت macOS، يجب عليك أيضًا أن تقرأ من خلال Apple's [تمكين التطبيق Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) للحصول على فكرة أساسية، ثم أضف مفاتيح الأذونات التي يحتاجها التطبيق الخاص بك إلى ملفات الاستحقاقات.

بالإضافة إلى توقيع التطبيق يدويًا، يمكنك أيضًا اختيار استخدام وحدة [إلكترون - osx](https://github.com/electron-userland/electron-osx-sign) للقيام بالمهمة.

#### تسجيل وحدات أصلية

الوحدات الأصلية المستخدمة في التطبيق الخاص بك تحتاج أيضا إلى توقيع. في حالة استخدام electron-osx-sign، تأكد من تضمين المسار إلى الثنائية التي تم بناؤها في قائمة الحجج :

```sh
electron-osx-sign YourApp.app YourApp.app/contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

لاحظ أيضًا أن الوحدات الأصلية قد تحتوي على ملفات وسيطة تم إنتاجها والتي يجب عدم تضمينها لأنها تحتاج أيضًا إلى توقيع). إذا كنت تستخدم [electron-packager](https://github.com/electron/electron-packager) قبل الإصدار 8.1.0، أضف `--تجاهل =.+\.o$` إلى خطوة البناء الخاصة بك لتجاهل هذه الملفات. الإصدارات 8.1.0 و في وقت لاحق تجاهل هذه الملفات بشكل افتراضي.

### رفع تطبيقك

بعد توقيع التطبيق الخاص بك، يمكنك استخدام محمل التطبيق لرفعه إلى iTunes الاتصال للمعالجة، تأكد من أنك قمت [بإنشاء سجل](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) قبل التحميل.

### إرسال تطبيقك للمراجعة

بعد هذه الخطوات، يمكنك [إرسال التطبيق الخاص بك للمراجعة](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## المحدودية لبناء MAS

من أجل تلبية جميع المتطلبات لصندوق الرمل التطبيقي، تم تعطيل الوحدات النمطية التالية في إنشاء MAS:

* `crashReporter`
* `تحديث تلقائي`

وقد تم تغيير السلوكيات التالية:

* قد لا يعمل التقاط الفيديو لبعض الآلات.
* قد لا تنجح بعض ميزات الوصول.
* لن تكون التطبيقات على علم بتغييرات DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing](https://developer.apple.com/app-sandboxing/) for more information.

### الاستحقاقات الإضافية

اعتمادًا على تطبيقات إلكترون التي تستخدمها تطبيقك، قد تحتاج إلى إضافة مستحقات إضافية إلى والد `الخاص بك. قائمة` ملف لتتمكن من استخدام هذه التطبيقات من إنشاء Mac App Store الخاص بك.

#### الوصول إلى الشبكة

تمكين اتصالات الشبكة الصادرة للسماح للتطبيق الخاص بك بالاتصال بالخادم:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

تمكين اتصالات الشبكة الواردة للسماح لتطبيقك بفتح مقبس الاستماع للشبكة :

```xml
<key>com.apple.security.network.server</key>
<true/>
```

راجع [وثائق تمكين الوصول إلى الشبكة](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) لمزيد من التفاصيل.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-فقط</key>
<true/>
```

راجع [تمكين وثائق الوصول إلى الملف المحدد للمستخدم](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) للحصول على المزيد من التفاصيل.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

راجع [تمكين وثائق الوصول إلى الملف المحدد للمستخدم](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) للحصول على المزيد من التفاصيل.

## خوارزميات التشفير المستخدمة من قبل إلكترون

اعتماداً على البلدان التي تقوم فيها بإصدار التطبيق الخاص بك، قد تكون مطلوبة لتوفير معلومات عن خوارزميات التشفير المستخدمة في برنامجك الخاص بك. راجع [مستندات الامتثال لتصدير التشفير](https://help.apple.com/app-store-connect/#/devc3f64248f) للحصول على مزيد من المعلومات.

يستخدم إلكترون تتبع خوارزميات التشفير:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf)، [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf)، [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* بلوسمك - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144)، [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "في تصميم وأمن الكتل العلمية" كتاب X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
