# Mga bagay ng JumpListItem

* `type` String (optional) - One of the following:
  * `task` - Ang gawain ay maglulunsad ng isang app na may tiyak na mga argumento.
  * `separator` - ay maaaring gamitin para ihiwalay ang mga item sa standard `Tasks` na kategorya.
  * `file` - Isang link ng file na magbubukas sa isang file gamit ang app na gumawa sa Jump List, para gumana ito ang app ay dapat na rehistrado bilang isang tagakuha sa uri ng file (bagamat hindi ito kailangang maging default na tagakuha).
* `path` String (opsyonal) - ang landas ng file para bumukas, ay dapat lamang ihanda kung `type` ay `file`.
* `program` String (opsyonal) - ang landas ng programa para pairalin, kadalasan dapat mong tukuyin `process.execPath` kung saan magbubukas ang kasalukuyang programa. Dapat lamang itakda kung `type` ay `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (opsyonal) - Ang tiyak na landas patungo sa icon na ipinapakita sa isang Jump List, kung saan ay puwedeng maging isang makatuwirang sanggunian ng file na naglalaman ng isang icon (hal. `.ico`, `.exe`, `.dll`). Karaniwang maaari mong tukuyin `process.execPath` para ipakita ang icon ng programa.
* `iconIndex` Number (opsyonal) - Ang index ng icon sa sanggunian ng file. Kung ang sanggunian ng file ay naglalaman ng maraming mga icon ang halaga nito ay maaaring magamit para tukuyin ang zero-based icon na dapat ipapakita sa task na ito. Kung ang sangguniang file ay naglalaman ng isang icon lamang, ang uri na ito ay dapat ilagay sa zero.
* `workingDirectory` String (optional) - The working directory. Default is empty.
