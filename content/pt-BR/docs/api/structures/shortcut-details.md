# Objeto ShortcutDetails

* `target` String - O alvo à ser executado por este atalho.
* `cwd` String (opcional) - O diretório de trabalho. O padrão é vazio.
* `args` String (opcional) - Os argumentos a serem aplicados a `target` quando lançamento deste atalho. O padrão é vazio.
* `description` String (opcional) - A descrição do atalho. O padrão está vazio.
* `icon` String (opcional) - O caminho para o ícone pode ser um DLL ou EXE. `icon` e `iconIndex` têm que ser juntos. O padrão está vazio, que usa o ícone alvo.
* `iconIndex` Número (opcional) - O ID de recurso do ícone quando `icon` é um DLL ou EXE . O padrão é 0.
* `appUserModelId` String (opcional) - O ID do modelo de usuário do aplicativo. O padrão está vazio.
* `toastActivatorClsid` String (opcional) - O ativador de torrada de aplicativo CLSID. Necessário para participar do Centro de Ação.
