# Mga bagay sa Task

* `program` String - Ang daan ng programa para paganahin, kadalasan dapat mong tukuyin `process.execPath` kung saan magbubukas ang kasalukuyang programa.
* `arguments` String - Ang mga argumento ng linyang pang-utos kapag `program` ay pinagana na.
* `title` String - Ang hanay na naipakita sa JumpList.
* `description` String - Description of this task.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.