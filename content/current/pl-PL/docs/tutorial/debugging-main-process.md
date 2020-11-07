# Debugowanie Głównego Wątku

DevTools w oknie przeglądarki Electron może debugować tylko JavaScript wykonywany w tym oknie (np. strony internetowe). Aby debugować JavaScript wykonany w głównym procesie, musisz użyć zewnętrznego debugera i uruchomić Electron z przełącznikiem `--inspect` lub `--inspect-brk`.

## Przełączniki wiersza poleceń

Użyj jednego z następujących przełączników wiersza poleceń, aby włączyć debugowanie głównego procesu :

### `--inspect=[port]`

Electron będzie słuchał komunikatów protokołu kontrolera V8 na określonym `porcie`, zewnętrzny debugger będzie musiał połączyć się z tym portem. Domyślny `port` to `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Podobnie jak `--inspect` , ale wstrzymuje wykonanie w pierwszej linii JavaScript.

## Zewnętrzne debugowania

Musisz użyć debugera, który obsługuje protokół inspektora V8.

- Połącz Chrome odwiedzając `chrome://check` i wybierając aby sprawdzić uruchomioną tam aplikację Electron.
- [Debugowanie w VSCode](debugging-vscode.md)
