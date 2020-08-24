# كائن MemoryInfo

* `workingSetSize` عدد صحيح - مقدار الذاكرة المثبتة حالياً لـ ذاكرة الوصول العشوائي الفعلية.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

لاحظ أنه يتم إظهار جميع الإحصائيات بوحدة الكيلوبايت.
