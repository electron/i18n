# O Processo Principal de Depuração

O DevTools em uma janela do navegador do Electron, só pode depurar JavaScript que é executado na janela (ex. uma web página). Para depurar JavaScript que é executado no processo principal você precisá usar um depurador externo e fazer o carregamento do Electron com o `--inspect` ou `--inspect-brk`.

## Opções de Linha de Comandos

Use uma das seguintes opções de linha de comando para habilitar a depuração principal processo:

### `--inspect=[porta]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 seu/app
```

### `--inspect-brk=[porta]`

Como o `--inspect` mas pausa a execução na primeira linha de JavaScript.

## Depuradores Externos

Você precisá usar um depurador que suporta o protocolo de inspeção do V8.

- Conecte com o Chrome visitando `chrome://inspect` e selecionando para inspecionar o Electron app.
- [Depuração do Processo Principal em VSCode](debugging-main-process-vscode.md)
