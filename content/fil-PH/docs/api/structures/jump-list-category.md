# Mga bagay ng JumplistCategory

* `uri` String (opsyonal) - Isa sa mga sumusunod: 
  * `tasks` - Ang mga item sa kategorya na ito ay maaaring ilagay sa mga karaniwang kategorya ng `Tasks`. Maaaring may isa lamang gayong kategorya, at ito ay laging ipinapakita sa ilalim ng Jump List.
  * `frequent` - Nagpapakita ng listahan ng mga file na madalas na binubuksan ng mga app, ang pangalan ng kategorya at ang item nito ay itinakda ng Windows.
  * `recent` - Nagpapakita ng isang listahan ng mga file na kabubukas lamang ng isang app, ang pangalan ng kategorya at ng item nito ay itinakda ng Windows. Ang mga item na ito ay maaaring idagdag sa kategoryang ito na hindi deretsa gamit ang `app.addRecentDocument(path)`.
  * `custom` - Nagpapakita ng mga task o mga link ng file `name` dapat na ilabas sa pamamagitan ng app.
* `name` String (opsyonal) - Dapat na ilabas kung ang `type` ay `custom`, kung hindi man ito dapat tanggalin.
* `items` JumpListItem[] (optional) - Array of [`JumpListItem`](jump-list-item.md) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.