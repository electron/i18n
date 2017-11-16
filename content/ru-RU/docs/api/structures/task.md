# Task Object

* `program` String - Path of the program to execute, usually you should specify `process.execPath` which opens the current program.
* `arguments` String - The command line arguments when `program` is executed.
* `title` String - The string to be displayed in a JumpList.
* `description` String - Описание задания.
* `iconPath` String - Абсолютный пусть к файлу иконок. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - Номер иконки по-порядку. Данное значение стоит устанавливать только если в файле иконок находится более одного изображения. Если файл с иконками содержит только одно изображение, то значение равно 0.