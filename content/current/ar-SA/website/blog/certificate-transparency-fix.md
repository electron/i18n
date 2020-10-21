---
title: إصلاح شفافية الشهادة
author: kevinsawicki
date: '2016-12-09'
---

إلكترون [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) يحتوي على تصحيح هام يصلح مشكلة في الجزء العلوي من الكروم حيث بعض سيمانتيك ، جيو ترست، وشهادات تاوت SSL/TLS مرفوضة خطأ بعد 10 أسابيع من وقت البناء من [ليبكروم محتوى](https://github.com/electron/libchromiumcontent)، مكتبة إلكرون الأساسية لكروم . لا توجد مشاكل مع الشهادات المستخدمة في المواقع المتأثرة ولن يساعد استبدال هذه الشهادات في ذلك.

---

في إلكترون 1.4.0 &mdash; 1.4.11 طلبات HTTPS إلى المواقع التي تستخدم هذه المواقع المتأثرة ستفشل الشهادات مع أخطاء الشبكة بعد تاريخ معين. يؤثر هذا على طلبات HTTPS التي تم تقديمها باستخدام APIs الشبكات الأساسية لـ Chrome مثل النافذة `. إحضار`طلبات Ajax ، وصافي Electron's `` API ، `متصفح Window. oadURL`، `محتوى. OadURL`، السمة `src` على `<webview>` العلامة وغيرها.

ترقية تطبيقاتك إلى 1.4-12 سيمنع فشل الطلب من الحدوث.

**ملاحظة:** تم عرض هذه المشكلة في Chrome 53 حتى لا تتأثر إصدارات Electron قبل من 1.4.0

### تواريخ التأثير

فيما يلي جدول لكل نسخة إلكترون 1.4 والتاريخ الذي سيبدأ فيه الفشل طلبات المواقع التي تستخدم هذه الشهادات المتأثرة.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>إصدار إلكترون</th>
            <th>تاريخ التأثير</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1-3-س</td>
            <td>غير متأثر</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>فشل بالفعل</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>فشل بالفعل</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>فشل بالفعل</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 ديسمبر 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 ديسمبر 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 ديسمبر 2016 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 يناير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 يناير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 يناير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 يناير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 يناير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 فبراير 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>غير متأثر</td>
        </tr>
    </tbody>
</table>

يمكنك التحقق من تاريخ تأثير التطبيق الخاص بك عن طريق إعداد ساعة الكمبيوتر الخاص بك إلى الأمام ثم تحقق مما إذا كان [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) يحمّل منها بنجاح.

## مزيد من المعلومات

يمكنك قراءة المزيد عن هذا الموضوع، المشكلة الأصلية، والإصلاح في الأماكن التالية:

- [ما هي شفافية الشهادة؟](https://www.certificate-transparency.org/what-is-ct)
- [مقالة قاعدة معارف سيمتانتيك](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [عدد كروم 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [إصلاح كروم للمشكلة 664177](https://codereview.chromium.org/2495583002)
- [تعديل libchromiumcontent للمشكلة 664177](https://github.com/electron/libchromiumcontent/pull/248)

