# شئ JumpListCategory

* `type` رشته (اختیاری) - یکی از موارد زیر: 
  * `وظایف` - آیتم های درون این دسته بندی، در دسته بندیِ استانداردِ `وظایف` قرار خواهند گرفت. تنها یک دسته بندی این چنینی می تواند وجود داشته باشد، و همیشه در پایین لیست پرشی نمایش داده خواهد شد.
  * `غالب` - یک لیست از اپ هایی که اغلب باز شده اند نمایش می دهد، نام دسته بندی و آیتم های آن با ویندوز تنظیم می شوند.
  * `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
  * `custom` - Displays tasks or file links, `name` must be set by the app.
* `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.