# المستندات الحديثة (Windows & macOS)

يوفر Windows و macOS الوصول إلى قائمة بالمستندات الحديثة التي فتحها التطبيق عبر قائمة JumpList أو قائمة الإرساء على التوالي.

__JumpList:__

![قائمة القفز الملفات الأخيرة][1]

__قائمة الإرساء للتطبيق:__

![قائمة منصة macOS][2]

To add a file to recent documents, you can use the [app.addRecentDocument][addrecentdocument] API:

```javascript
const { app } = مطلوب('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments][clearrecentdocuments] API to empty the recent documents list:

```javascript
const { app } = مطلوب('electron')
app.clearentDocuments()
```

## ملاحظات ويندوز

لكي تكون قادر على استخدام هذه الميزة على ويندوز، يجب أن يكون تطبيقك مسجلا كمعالج لنوع الملف من المستند، وإلا فإن الملف لن يظهر في قائمة القفل حتى بعد إضافته. You can find everything on registering your application in [Application Registration][app-registration].

عندما ينقر مستخدم على ملف من قائمة JumpList، سيتم بدء مثيل جديد لتطبيقك مع مسار الملف المضاف كحجة سطر الأوامر.

## ملاحظات macOS

### إضافة قائمة المستندات الأخيرة إلى قائمة التطبيق:

![عنصر قائمة المستندات الحديثة macOS][6]

يمكنك إضافة عناصر القائمة للوصول إلى الوثائق الأخيرة ومسحها عن طريق إضافة كتلة الكود البرمجي التالي إلى قالب القائمة الخاصة بك.

```json
{
  "القائمة":[
    {
      "التسمية":"فتح الحديث"،
      "الدور":"مؤخراً"،
      "القائمة الفرعية": [
        {
          "التسمية":"مسح الحديثة"،
          "الدور": "الوثائق الأخيرة"
        }
      ]
    }
  ]
}
```

عند طلب ملف من قائمة المستندات الأخيرة، سيتم نشر وحدة `فتح الملف` من `التطبيق` من أجله.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
