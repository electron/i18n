# Objeto ShortcutDetails

* `target` String - O alvo à ser executado por este atalho.
* `cwd` String (opcional) - O diretório de trabalho. O padrão é vazio.
* `args` String (opcional) - Os argumentos para serem aplicados ao `target` quando executado deste atalho. O padrão é vazio.
* `description` String (opcional) - A descrição do atalho. O padrão é vazio.
* `icon` String (opcional) - O caminho para o ícone, pode ser uma DLL ou EXE. `icon` e `iconIndex` devem ser definidos juntamente. O padrão é vazio e utiliza o ícone do alvo.
* `iconIndex` Number (opcional) - O ID do recurso do icone quando `icon` é uma DLL ou EXE. O padrão é 0.
* `appUserModelId` String (opcional) - O User Model ID da aplicação. O padrão é vazio.