# JumpListItem Object

* `tipo` String (opcional) - Um dos seguintes: 
  * `task` - Uma tarefa iniciará um aplicativo com argumentos específicos.
  * `separador` - pode ser usado para separar itens na categoria de `tarefas` padrão.
  * `arquivo` - um arquivo link será aberto um arquivo usando o app que criou a lista de atalhos, para isso funcionar o app deve ser registrado como um manipulador para o tipo de arquivo (embora não precisa ser o manipulador padrão).
* `caminho` String (opcional) - caminho do arquivo para abrir, só deve ser definido se o `tipo` é o `arquivo`.
* `programa` String (opcional) - caminho do programa para executar, geralmente você deve especificar `process.execPath` que abre o programa atual. Só deve ser definido se o `type` é `task`.
* `args` String (opcional) - Os argumentos de linha de comando quando o `program` é executado. Só deve ser definido se o `type` é `task`.
* `título` String (opcional) - O texto a ser exibido para o item na lista de salto. Só deve ser definido se o `type` é `task`.
* `Descrição` String (opcional) - Descrição da tarefa (exibida em uma dica de ferramenta). Só deve ser definido se o `type` é `task`.
* `iconPath` String (opcional) - O caminho absoluto para um ícone a ser exibido em uma lista de atalhos, que pode ser um recurso arbitrário do arquivo que contém um ícone (exemplo: `.ico`, `.exe` e `.dll`). Geralmente, você pode especificar `process.execPath` para mostrar o ícone do programa.
* `iconIndex` Número (opcional) - O índice do ícone no arquivo de recurso. Se um arquivo de recurso contém vários ícones esse valor pode ser usado para especificar o índice baseado em zero do ícone a ser exibido para esta tarefa. Se um arquivo de recurso contém apenas um ícone, esta propriedade deve ser definida como zero.