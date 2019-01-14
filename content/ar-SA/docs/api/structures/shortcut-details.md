# ShortcutDetails Object

* `الهدف` String - الهدف من إطلاق هذا الاختصار.
* `cwd`String (اختياري) - دليل العمل. الافتراضي فارغ.
* `args`String (اختياري) - الحجج التي يجب تطبيقها على `الهدف` عند الإطلاق من هذا الطريق المختصر. الافتراضي فارغ.
* `الوصف` String (اختياري) - وصف الطريق المختصر. الإفتراضي فارغ.
* `أيقونة` String (اختياري) - المسار إلى الأيقونة ، يمكن أن يكون DLL أو EXE. `أيقونة` و `فهرس الأيقونة` يجب أن يكونا معا. الافتراضي فارغ ، وهو يستخدم رمز الهدف.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.