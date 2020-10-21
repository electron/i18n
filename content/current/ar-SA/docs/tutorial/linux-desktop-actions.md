# إجراءات تشغيل سطح المكتب لـ Linux المخصصة

في العديد من بيئات Linux ، يمكنك إضافة إدخالات مخصصة إلى مشغل عن طريق تعديل ملف `سطح المكتب`. للحصول على وثائق وحدة كانونيكل، انظر [إضافة الاختصارات إلى مشغل](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). للحصول على تفاصيل حول تنفيذ أكثر عمومية، راجع [مواصفات esktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__إطلاق اختصارات مراجعة الحسابات:__

![جريئة](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

بشكل عام، يتم إضافة الاختصارات عن طريق توفير `اسم` و `Exec` لكل إدخال في قائمة الاختصار. الوحدة ستنفذ الحقل `Exec` بمجرد النقر عليه من قبل المستخدم. والشكل كما يلي:

```plaintext
الإجراءات=إيقاف التشغيل؛التالي؛

السابق [إيقاف تشغيل سطح المكتب]
Name=Playy-Pause
Exec=audious -t
فقط على ShowIn=Un;

[إجراء سطح المكتب التالي]
Name=Next
Exec=audious -f
OnlyShowIn=Unity؛

[إجراء سطح المكتب السابق]
Name=سابقا
Exec=audious -r
OnlyShowIn=Un;
```

الطريقة المفضلة للوحدة لإخبار تطبيقك بما يجب فعله هي استخدام المعلمات. يمكنك العثور على هذه في التطبيق الخاص بك في المتغير العالمي `process.argv`.
