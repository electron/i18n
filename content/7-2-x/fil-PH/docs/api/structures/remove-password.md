# Mga bagay sa RemovePassword

* `type` String - `password`.
* `origin` String (opsyonal) - Kapag naibigay na, ang nagpapatunay na impormasyon na may kaugnayan sa pinagmulan ay tatanggalin lamang kung hindi man ang buong cache ay mabubura.
* `scheme` String (opsyonal) - Ang panukala ng pagpapatunay. Maaaring maging `basic`, `digest`, `ntlm`, `negotiate`. Dapat na ibinigay kung ang pag-alis ay sa pamamagitan ng `origin`.
* `realm` String (optional) - Realm of the authentication. Dapat na ibinigay kung ang pag-alis ay sa pamamagitan ng `origin`.
* `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
* `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
