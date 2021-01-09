# Mga bagay sa Task

* `program` String - Ang daan ng programa para paganahin, kadalasan dapat mong tukuyin `process.execPath` kung saan magbubukas ang kasalukuyang programa.
* `arguments` String - Ang mga argumento ng linyang pang-utos kapag `program` ay pinagana na.
* `title` String - Ang hanay na naipakita sa JumpList.
* `description` String - Ang paglalarawan ng task na ito.
* `iconPath` String - Ang tanging daan patungo sa isang icon na ipinapakita sa isang JumpList, na kung saan ay maaaring maging hindi makatuwirang sangguniang file na naglalaman ng isang icon. Karaniwang maaari mong tukuyin `process.execPath` para ipakita ang icon ng programa.
* `iconIndex` Number - Ang indeks ng icon sa icon file. Kung ang isang icon file ay binubuo ng dalawa o higit pang mga icon, itakda ang bilang nito para matukoy ang mga icon. Kung ang isang icon file ay binubuo ng isang icon, ang halaga nito ay 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
