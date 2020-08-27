# ملف تعريف ارتباط كائن

* <; 0>; الاسم<;/0>; السلسلة--اسم ملف تعريف الارتباط.
* <; 0>; القيمة<;/0>; السلسلة--قيمة ملف تعريف الارتباط.
* `التطاق - domain` نص (اختياري) - نطاق ملفات تعريف الارتباط. سيتم اضافة نقطة في بداية نص النطاق من اجل ان يكون صالحًا للنطاقات المتشعبة.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* <;; 0>;; الاسم<;;/0>;; السلسلة--اسم ملف تعريف الارتباط.
* <;; 0>;; هوستونلي<;;/0>;; قيمة منطقية (اختياري)--ما إذا كان ملف تعريف الارتباط ملف تعريف ارتباط المضيف فقط.
* <;;; 0>;;; هوستونلي<;;;/0>;;; قيمة منطقية (اختياري)--ما إذا كان ملف تعريف الارتباط ملف تعريف ارتباط المضيف فقط.
* <;0>;الجلسة<;/0>; قيمة منطقية (اختياري)--إذا كان ملف تعريف الارتباط هو ملف تعريف ارتباط جلسة أو ملف تعريف ارتباط دائم مع تاريخ انتهاء صلاحية.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
* `sameSite` String - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie.  Can be `unspecified`, `no_restriction`, `lax` or `strict`.
