# RemovePassword Object

* `type` String - `كلمة السر`.
* `origin` String (optional) - عند توفرها، ستتم إزالة معلومات التوثيق المتعلقة بالمصدر فقط وإلا سيتم مسح ذاكرة التخزين المؤقت بأكملها.
* `scheme` String (optional) - مخطط التوثيق. يمكن أن يكون `basic`, `digest`, `ntlm`, `negotiate`. يجب تقديمه في حالة الإزالة بواسطة `origin`.
* `realm` String (optional) - Realm of the authentication. يجب تقديمه في حالة الإزالة بواسطة `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
