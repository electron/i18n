# ShortcutDetails Object

* `الهدف` String - الهدف من إطلاق هذا الاختصار.
* `cwd`String (اختياري) - دليل العمل. الافتراضي فارغ.
* `args`String (اختياري) - الحجج التي يجب تطبيقها على `الهدف` عند الإطلاق من هذا الطريق المختصر. الافتراضي فارغ.
* `الوصف` String (اختياري) - وصف الطريق المختصر. الإفتراضي فارغ.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.