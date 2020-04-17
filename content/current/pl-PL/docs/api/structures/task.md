# Obiekt Task

* `program` String - Ścieżka do otwarcia programu, przeważnie powinieneś podać `process.execPath` który otwiera obecny program.
* `arguments` String - argumenty wiersza polecenia podczas wykonywania `programu`.
* `title` String - Tytuł wyświetlany w JumpList.
* `description` String - opis tego zadania.
* `iconPath` String - bezwzględna ścieżka do ikony która ma być wyświetlona w JumpList, która może być plikiem dowolnego zasobu, który zawiera ikonę. Zazwyczaj można określić `process.execPath`, aby wyświetlić ikonę programu.
* `iconIndex` Number - indeks ikony w pliku ikony. Jeśli plik ikony składa się z dwóch lub więcej ikon, należy ustawić tę wartość, aby określić ikonę. Jeśli plik ikony składa się z jednej ikony, wartość ta jest 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
