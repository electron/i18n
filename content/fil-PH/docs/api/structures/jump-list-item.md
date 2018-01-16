# Mga bagay ng JumpListItem

* `uri` String (opsyonal) - Isa sa mga sumusunod: 
  * `task` - Ang gawain ay maglulunsad ng isang app na may tiyak na mga argumento.
  * `separator` - ay maaaring gamitin para ihiwalay ang mga item sa standard `Tasks` na kategorya.
  * `file` - Isang link ng file na magbubukas sa isang file gamit ang app na gumawa sa Jump List, para gumana ito ang app ay dapat na rehistrado bilang isang tagakuha sa uri ng file (bagamat hindi ito kailangang maging default na tagakuha).
* `path` String (opsyonal) - ang landas ng file para bumukas, ay dapat lamang ihanda kung `type` ay `file`.
* `program` String (opsyonal) - ang landas ng programa para pairalin, kadalasan dapat mong tukuyin `process.execPath` kung saan magbubukas ang kasalukuyang programa. Dapat lamang itakda kung `type` ay `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.