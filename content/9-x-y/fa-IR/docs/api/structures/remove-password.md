# شئ حذف رمزعبور

* `type` String - `password`.
* <;0>;منشاء<;/0>; هنگامی که ارائه اطلاعات تأیید اعتبار مربوط به منشاء تنها حذف خواهد شد در غیر این صورت کل کش پاک خواهد شد (اختیاری) - رشته.
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
