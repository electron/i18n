# Task Object

* `program` String - Caminho do programa para executar, geralmente você deve especificar `process.execPath` que abre o programa atual.
* `arguments` String - os argumentos de linha de comando quando o `programa` é executado.
* `title` String - A String a ser exibida em um JumpList.
* `description` String - Descrição desta tarefa.
* `iconPath` String - O caminho absoluto para um ícone a ser exibido em um JumpList, que pode ser um arquivo de recurso arbitrário que contenha um ícone. Geralmente, você pode especificar `process.execPath` para mostrar o ícone do programa.
* `iconIndex` Number - O índice de ícone no arquivo de ícone. Se um arquivo de ícone é composto por dois ou mais ícones, defina esse valor para identificar o ícone. Se um arquivo de ícone consiste em um único ícone, esse valor é 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
