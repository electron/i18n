# Ladění hlavního procesu

DevTools v okně prohlížeče Electron může ladit pouze JavaScript, který je spuštěn v tomto okně (tj. webové stránky). Chcete-li ladit JavaScript, který je spuštěn v hlavním procesu, budete muset použít externí debugger a spustit Electron pomocí přepínače `--inspect` nebo `--inspect-brk`.

## Přepínače příkazového řádku

Použijte jeden z následujících přepínačů příkazové řádky k povolení ladění hlavního procesu:

### `--inspect=[port]`

Electron poslouchá V8 zprávy protokolu inspektora na určeném `portu`, externí debugger se bude muset připojit k tomuto portu. Výchozí `port` je `5858`.

```shell
electron --inspect=5858 tvoje/aplikace
```

### `--inspect-brk=[port]`

Like `--inspect` , ale pauses exekuce na prvním řádku JavaScript.

## Externí ladiče

Budete muset použít debugger, který podporuje protokol inspektora V8.

- Připojte Chrome navštěvováním `chrome://inspect` a výběrem zkontrolovat spuštěnou aplikaci Electron přítomnou.
- [Debugging in VSCode](debugging-vscode.md)
