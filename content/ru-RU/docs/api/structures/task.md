# Task объект

* `program` String - Путь к исполняемой программы, как правило следует указывать `process.execPath`, который открывает текущую программу.
* `arguments` String - Аргументы командной строки при выполнении `program`.
* `title` String - The string to be displayed in a JumpList.
* `description` String - Описание задания.
* `iconPath` String - Абсолютный пусть к файлу иконок. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - Номер иконки по-порядку. Данное значение стоит устанавливать только если в файле иконок находится более одного изображения. Если файл с иконками содержит только одно изображение, то значение равно 0.