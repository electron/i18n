---
title: مستندات إلكترون
author: سيد
date: '2015-06-04'
---

هذا الأسبوع أعطينا مستندات شركة Electron's منزل على [electronjs.org](https://electronjs.org). يمكنك زيارة [/docs/latest](https://electronjs.org/docs/latest) لأحدث مجموعة من المستندات. سنحتفظ بإصدارات من المستندات القديمة، أيضًا، حتى تتمكن من زيارة [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) للمستندات التي ترتبط بالإصدار الذي تستخدمه.

---

يمكنك زيارة [/docs](https://electronjs.org/docs) لمعرفة ما هي الإصدارات المتاحة أو [/docs/all](https://electronjs.org/docs/all) لمشاهدة أحدث إصدار من المستندات على صفحة واحدة (لطيف ل `cmd` + `f` البحث).

إذا كنت ترغب في المساهمة في محتوى الوثائق، يمكنك القيام بذلك في [مستودع إلكترون](https://github.com/electron/electron/tree/master/docs)، حيث يتم جلب المستندات منه. نحصل عليها لكل إصدار ثانوي ونضيفها إلى [مستودع موقع إلكترون](http://github.com/electron/electronjs.org)، والذي تم صنعه مع [جيكل](http://jekyllrb.com).

إذا كنت مهتما بمعرفة المزيد عن كيفية سحب المستندات من مستودع إلى آخر يواصل القراءة أدناه. خلاف ذلك، استمتع بمستندات [](https://electronjs.org/latest)!

## الكتل التقنية

نحن نحافظ على الوثائق داخل مستودع قلب إلكترون كما هي. هذا يعني أن [electron/electron](http://github.com/electron/electron) سيكون لديه دائما أحدث إصدار من المستندات. عند إصدار إصدارات جديدة من إلكترون، نقوم بتكرارها على مستودع موقع إلكترون [electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

لجلب المستندات نقوم بتشغيل [سكريبت](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) مع واجهة سطر أمر `سكريبت/docs vX.XX.` مع أو بدون `--أحدث خيار` (اعتماداً على ما إذا كان الإصدار الذي تستورده هو الإصدار الأحدث). يستخدم البرنامج النصي [لجلب المستندات](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) بعض وحدات العقدة المثيرة للاهتمام:

- [`nugget`](http://npmjs.com/nugget) مقابل [الحصول على مربع الإصدار](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) وحفظه إلى دليل مؤقت.
- [`بندقية-ربما`](http://npmsjs.com/gunzip-maybe) إلى [فك كتلة القار](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) من أجل [البث فقط مجلد `/docs`](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) من كرة القار و [تصفية الملفات ومعالجتها](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (بمساعدة [`حتى 2`](http://npmjs.com/through2)) بحيث تعمل بشكل جيد مع موقع جيكل الخاص بنا (المزيد على ذلك أدناه).

[الاختبارات](https://github.com/electron/electronjs.org/tree/gh-pages/spec) تساعدنا على معرفة أن جميع القطع والقطع قد هبطت كما هو متوقع.

### جيكل

موقع إلكترون هو موقع جيكيل، ونحن نستخدم خاصية [مجموعات](http://jekyllrb.com/docs/collections/) للمستندات ذات بنية مثل هذا:

```bash
electron.atom.io
└── _docs
    ├── latest
    ├── v0.27.0
    ├── v0.26.0
    ├── so on
    └── so forth
```

#### المادة الأمامية

لكي تجعل جيكل كل صفحة تحتاج على الأقل إلى مادة أمامية فارغة. سوف نستخدم المادة الأمامية على جميع صفحاتنا لذلك بينما نبث الدليل `/docs` الذي نقوم بالتحقق منه لمعرفة ما إذا كان الملف هو `README. (د)` ملف (وفي هذه الحالة يتلقى تكوين أمر واجهة واحد) أو إذا كان أي ملف آخر له امتداد علامات (وفي هذه الحالة يتلقى مسألة واجهة مختلفة قليلا).

كل صفحة تتلقى هذه المجموعة من متغيرات المادة الأمامية:

```yaml
---
الإصدار: v0.27.0
الفئة التعليمية:
العنوان: 'البداية السريعة'
المصدر: 'https://github.com/electron/blob/master/docs/tutorial/quick-start.md'
---
```

`README. (د)` يحصل على `رابط ثابت إضافي` بحيث أن عنوان URL له جذر مشترك من فهرس `. tml` وليس غير محرج `/readme/`.

```yaml
الرابط الدائم: /docs/v0.27.0/index.html
```

#### ضبط وإعادة توجيه

في الموقع `_config. ml` ملف متغير `latest_version` يتم تعيينه في كل مرة يتم فيها استخدام `- أحدث` علم عند جلب المستندات. كما أننا نضيف قائمة بجميع الإصدارات التي أضيفت إلى الموقع وكذلك الرابط الثابت الذي نريده لكامل مجموعة المستندات.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
مجموعة:
    وثيقة: {output: true, permalink: '/docs/:path/'}
```

الملف `الأخر. (د)` في موقعنا الجذر فارغ باستثناء هذه المادة الأمامية التي تسمح للمستخدمين برؤية الفهرس (الملك `README`) من أحدث إصدار من المستندات عن طريق زيارة هذا الرابط، [إلكترون. tom.io/docs/latest](https://electronjs.org/docs/latest)، بدلاً من استخدام أحدث رقم إصدار محدد (وإن كنت تستطيع فعل ذلك أيضاً).

```yaml
---
دائمة: /docs/latest/
إعادة توجيه_إلى: /docs/{{ site.data.releases[0].version }}
---
```

#### المخططات

في قالب تخطيط `docs.html` نستخدم الشروط إما لإظهار أو إخفاء المعلومات في رأس و ترويج.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

لإنشاء صفحة تظهر الإصدارات المتاحة نقوم فقط بالدوران من خلال القائمة في الإعدادات الخاصة بنا على ملف، `إصدارات (د)`في جذور الموقع. نحن أيضا نعطي هذه الصفحة رابط دائم: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

أتمنى أن تستمتع بهذه القطع التقنية! إذا كنت مهتما بالحصول على مزيد من المعلومات حول استخدام جيكيل لمواقع التوثيق، قم بالتحقق من كيفية نشر فريق مستندات جيتهوب [مستندات جيتهوب على جيكيل](https://github.com/blog/1939-how-github-uses-github-to-document-github).

