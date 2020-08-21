# Mga bagay ng JumplistCategory

* `type` String (optional) - One of the following:
  * `tasks` - Ang mga item sa kategorya na ito ay maaaring ilagay sa mga karaniwang kategorya ng `Tasks`. Maaaring may isa lamang gayong kategorya, at ito ay laging ipinapakita sa ilalim ng Jump List.
  * `frequent` - Nagpapakita ng listahan ng mga file na madalas na binubuksan ng mga app, ang pangalan ng kategorya at ang item nito ay itinakda ng Windows.
  * `recent` - Ilarawan ang listahan ng mga file na nabuksan kamakailan lang sa pamamagitan ng app, ang pangalan ng kategorya at ang gamit na ito ay itinakda sa pamamagitan ng windows. Ang mga item na ito ay maaaring idagdag sa kategoryang ito na hindi deretsa gamit ang `app.addRecentDocument(path)`.
  * `custom` - Nagpapakita ng mga task o mga link ng file `name` dapat na ilabas sa pamamagitan ng app.
* `name` String (opsyonal) - Dapat na ilabas kung ang `type` ay `custom`, kung hindi man ito dapat tanggalin.
* `items` JumpListItem[] (opsyonal) - Ayos ng [`JumpListItem`](jump-list-item.md) mga bagay kung `type` ay `tasks` o `custom`, kung hindi man ito ay dapat tanggalin.

**Note:** Kung ang `JumpListCategory` ang bagay ay hindi ang `type` o ang `name` itinakda ang katangian pagkatapos ito ay `type` ay ipinapalagay na `tasks`. Kung ang `name` ang katangian ay itinakda ngunit ang `type` ang katangian ay tinanggal pagkatapos ang `type` ay ipinalagay na `custom`.
