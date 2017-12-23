# RemovePassword 对象

* `type` String - `密码`.
* `origin` String (可选) - 一旦设置origin值，只有与origin相关的认证信息才会被移除，否则整个缓存都将被清空。
* `scheme` String (可选) - 认证的scheme类型。 可选类型有 `basic`, `digest`, `ntlm`, `negotiate`. 如果`origin`被移除，则必须提供此属性值。
* `realm` String (可选) - 认证的Realm域信息。如果`origin`被移除，则必须提供此属性值。
* `username` String (可选) - 认证的Credentials证书信息。如果`origin`被移除，则必须提供此属性值。
* `password` String (可选) - 认证的Credentials证书信息。如果`origin`被移除，则必须提供此属性值。