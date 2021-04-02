# powerMonitor

> Monitore as mudanças do estado de energia.

Processo: [Main](../glossary.md#main-process)

## Eventos

O módulo `powerMonitor` emite os seguintes eventos:

### Evento: 'suspender' __ _do_do Windows

Emitido quando o sistema está suspenso.

### Evento: 'retomar' __ __do Apple

Emitido quando o sistema está retomando.

### Evento: 'on-ac' _macOS_ _Windows_

Emitido quando o sistema muda para a potência CA.

### Evento: 'on-battery' _macOS_  _Windows_

Emitido quando o sistema muda para a energia da bateria.

### Evento: 'shutdown' __ __do MacOS do Linux

Emitido quando o sistema está prestes a reiniciar ou desligar. Se o manipulador de eventos invocar `e.preventDefault()`, a Electron tentará atrasar o desligamento do sistema em pedido para que o aplicativo saia limpo. Se `e.preventDefault()` for chamado, o aplicativo deve sair o mais rápido possível ligando para algo como `app.quit()`.

### Evento: 'tela de bloqueio' __ _do_do Windows

Emitido quando o sistema está prestes a travar a tela.

### Evento: 'tela de desbloqueio' __ _do_do Windows

Emitido assim que a tela do sistema for desbloqueada.

### Evento: 'usuário-did-active' __do macOS

Emitido quando uma sessão de login é ativada. Consulte [documentação](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) para obter mais informações.

### Evento: 'usuário-did-resign-active' __

Emitido quando uma sessão de login é desativada. Consulte [documentação](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) para obter mais informações.

## Métodos

O módulo `powerMonitor` tem os seguintes métodos:

### `powerMonitor.getSystemIdleState(ociosoThreshold)`

* `idleThreshold` Integer

Retornos `String` - O estado atual do sistema. Pode ser `active`, `idle`, `locked` ou `unknown`.

Calcule o estado ocioso do sistema. `idleThreshold` é a quantidade de tempo (em segundos) antes considerada ociosa.  `locked` está disponível apenas em sistemas suportados.

### `powerMonitor.getSystemIdleTime()`

Retorna `Integer` - Tempo ocioso em segundos

Calcule o tempo ocioso do sistema em segundos.

### `powerMonitor.isOnBatteryPower()`

Devoluções `Boolean` - Se o sistema está com bateria.

Para monitorar as alterações nesta propriedade, utilize os eventos `on-battery` e `on-ac` .

## Propriedades

### `powerMonitor.onBatteryPower`

Uma propriedade `Boolean` . Verdade se o sistema estiver ligado à bateria.

Veja [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).
