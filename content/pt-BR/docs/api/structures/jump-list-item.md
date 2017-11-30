# JumpListItem Object

* `type` String (opcional) - Um dos seguintes: 
  * `task` - Uma tarefa iniciará um aplicativo com argumentos específicos.
  * `separador` - pode ser usado para separar itens na categoria de `tarefas` padrão.
  * `arquivo` - um arquivo link será aberto um arquivo usando o app que criou a lista de atalhos, para isso funcionar o app deve ser registrado como um manipulador para o tipo de arquivo (embora não precisa ser o manipulador padrão).
* `caminho` String (opcional) - caminho do arquivo para abrir, só deve ser definido se o `tipo` é o `arquivo`.
* `programa` String (opcional) - caminho do programa para executar, geralmente você deve especificar `process.execPath` que abre o programa atual. Só deve ser definido se o `tipo` é `tarefa`.
* `args` String (opcional) - os argumentos de linha de comando quando o `programa` é executado. Só deve ser definido se o `tipo` é `tarefa`.
* `título` String (opcional) - o texto a ser exibido para o item na lista de salto. Só deve ser definido se o `tipo` é `tarefa`.
* `Descrição` String (opcional) - descrição da tarefa (exibida em uma dica de ferramenta). Só deve ser definido se o `tipo` é `tarefa`.
* `iconPath` String (opcional) - o caminho absoluto para um ícone a ser exibido em uma lista de atalhos, que pode ser um recurso arbitrário do arquivo que contém um ícone (e.g. `.ico`, `.exe`, `.dll`). Geralmente, você pode especificar `process.execPath` para mostrar o ícone do programa.
* `iconIndex` Número (opcional) - o índice do ícone no arquivo de recurso. Se um arquivo de recurso contém vários ícones que esse valor pode ser usado para especificar o índice baseado em zero do ícone a ser exibido para esta tarefa. Se um arquivo de recurso contém apenas um ícone, esta propriedade deve ser definida como zero.