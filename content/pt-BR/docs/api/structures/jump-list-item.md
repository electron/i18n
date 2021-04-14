# JumpListItem Object

* `type` String (opcional) - Um dos seguintes:
  * `task` - Uma tarefa vai carregar um aplicativo com argumentos específicos.
  * `separator` - Pode ser usado para separar itens na categoria padrão `Tasks`.
  * `file` - O arquivo link será aberto um arquivo usando o app que criou a lista de atalhos, para isso funcionar o app deve ser registrado como um manipulador para o tipo de arquivo (embora não precisa ser o manipulador padrão).
* `path` String (opcional) - Caminho do arquivo para abrir, só deve ser definido se o `type` é `file`.
* `program` String (opcional) - Caminho do programa para executar, geralmente você deve especificar `process.execPath` que abre o programa atual. Só deve ser definido se o `type` é `task`.
* `args` String (opcional) - Os argumentos da linha de comando quando `program` é executado. Deve ser definido somente se `type` é `task`.
* `title` String (opcional) - O texto a ser exibido para o item na Jump List. Deve ser definido somente se `type` é `task`.
* `description` String (opcional) - Descrição da tarefa (exibida em um tooltip). Deve ser definido somente se `type` é `task`. Maximum length 260 characters.
* `iconPath` String (opcional) - O caminho absoluto para um ícone a ser exibido em uma lista de atalhos, que pode ser um recurso arbitrário do arquivo que contém um ícone (exemplo: `.ico`, `.exe` e `.dll`). Geralmente, você pode especificar `process.execPath` para mostrar o ícone do programa.
* `iconIndex` Número (opcional) - O índice do ícone no arquivo de recurso. Se um arquivo de recurso contém vários ícones esse valor pode ser usado para especificar o índice baseado em zero do ícone a ser exibido para esta tarefa. Se um arquivo de recurso contém apenas um ícone, esta propriedade deve ser definida como zero.
* `workingDirectory` String (opcional) - O diretório de trabalho. O padrão é vazio.
