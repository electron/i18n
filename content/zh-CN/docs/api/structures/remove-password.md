# RemovePassword 对象

* `type` String - `password`.
* `origin` String (可选) - 一旦设置origin值，只有与origin相关的认证信息才会被移除，否则整个缓存都将被清空。
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
* `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.