# RemovePassword Object

* `type` String - `password`.
* `origin` String (optional) - When provided, the authentication info related to the origin will only be removed otherwise the entire cache will be cleared.
* `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Harus disediakan jika mengeluarkan ` asal </ 0> .</li>
<li><code>realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
* ` username </ 0>  String (opsional) - Kredensial otentikasi. Harus disediakan jika mengeluarkan <code> asal </ 0> .</li>
<li><code>password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.