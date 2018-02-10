# Обект Task

* `program` String - Пътя на програмата, която трябва да се изпълни, обикновено трябва да укажете `process.execPath`, което отваря текущата програма.
* `arguments` String - Аргументите от командния ред, когато `program` е изпълнена.
* `title` String - Текстът, който ще бъде изобразен в подскачащия списък/JumpList.
* `description` String - Описание на задачата.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.