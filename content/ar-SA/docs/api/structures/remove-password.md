# RemovePassword Object

* `type` String - `كلمة السر`.
* `origin` String (optional) - عند توفرها، ستتم إزالة معلومات التوثيق المتعلقة بالمصدر فقط وإلا سيتم مسح ذاكرة التخزين المؤقت بأكملها.
* `scheme` String (optional) - مخطط التوثيق. يمكن أن يكون `basic`, `digest`, `ntlm`, `negotiate`. يجب تقديمه في حالة الإزالة بواسطة `origin`.
* `realm` String (optional) - نطاق المصادقة. يجب تقديمه في حالة الإزالة بواسطة `origin`.
* `username` String (optional) - أوراق اعتماد المصادقة. يجب تقديمها في حالة الإزالة بواسطة `origin`.
* `password` String (optional) - أوراق اعتماد المصادقة. يجب تقديمها في حالة الإزالة بواسطة `origin`.