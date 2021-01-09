# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

وبما أن إلكترون مبني على Chromium، فإنه يحتاج إلى مشغل عرض ليقوم بوظيفته. إذا لم يتمكن Chromium من العثور على مشغل عرض، فسيفشل إلكترون في تشغيله - وبالتالي لن ينفذ أي من اختباراتك، بغض النظر عن كيفية تشغيلك لهم. اختبار التطبيقات القائمة على الإلكترون على Travis, Circle, Jenkins أو أنظمة مماثلة يتطلب قليلا من التكوين. في الأساس، نحن بحاجة إلى استخدام مشغل عرض افتراضي.

## تكوين خادم العرض الظاهري

أولاً، قم بتثبيت [Xvfb](https://en.wikipedia.org/wiki/Xvfb). إنه مخزن افتراضي مؤقت، تنفيذ بروتوكول خادم عرض X11 - يؤدي جميع العمليات الرسومية في الذاكرة دون إظهار أي إخراج الشاشة، الذي هو بالضبط ما نحتاجه.

ثم قم بإنشاء شاشة Xvfb افتراضية وتصدير متغير البيئة يسمى DISPLAY الذي يشير إليه. سيبحث Chromium في Electron تلقائيًا مقابل `$DISPLAY`، لذا لا يتطلب الأمر المزيد من الإعدادات لتطبيقك. يمكن أن تكون هذه الخطوة تلقائيًا مع Anai<unk> s Betts [xvfb-ربما](https://github.com/anaisbetts/xvfb-maybe): إلحاق إختبارك بأوامر مع `xvfb-ربما` والأداة الصغيرة ستشكل تلقائيًا Xvfb, إذا طلب النظام الحالي ذلك. على Windows أو macOS، لن يفعل شيئا.

```sh
## على Windows أو macOS، هذه الإلكترون - موتشا
## على لينوكس، إذا كنا في بيئة بلا رأس، سيكون هذا مكافئ
## لـ xvfb-electron-mocha. اختبار/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### تريفيس سي

على Travis، يجب أن تبدو `.travis.yml` مثل هذا:

```yml
الإضافات:
  apt:
    حزمة:
      - xvfb

مثبت:
  - تصدير DISPLAY=':99. '
  - Xvfb :99 - الشاشة 0 1024x768x24 > /dev/null 2>&1 &
```

### Github Actions

For Github Actions, a [Xvfb action is available](https://github.com/marketplace/actions/gabrielbb-xvfb-action).

### Jenkins

بالنسبة لـ Jenkins، يتوفر [Xvfb plugin](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### دائرة CI

دائرة CI رائعة ولها Xvfb و `$DISPLAY` [تم إعدادها مسبقا، لذلك لا حاجة إلى مزيد من الإعدادات](https://circleci.com/docs/environment#browsers)

### AppVeyor

يعمل AppVeyor على ويندوز، يدعم السيلينيوم، كروميوم، إلكترون وأدوات مشابهة خارج المربع - لا حاجة إلى أي تكوين.
