# Depanarea procesului principal

DevTools într-o fereastră de browser Electron poate să depaneze doar JavaScript care este executat în acea fereastră (adică paginile web). Pentru a depana JavaScript care este executat în procesul principal va trebui să folosești un debugger extern și să lansezi Electron cu comutatorul `--inspectt` sau `--inspect-brk`.

## Comutatoare linie de comandă

Folosește unul dintre următoarele comutatoare ale liniei de comandă pentru a activa depanarea procesului principal:

### `--inspect=[port]`

Electron va asculta mesajele protocolului de inspector V8 pe portul `specificat`, un depanator extern va trebui să se conecteze în acest port. Portul `implicit` este `5858`.

```shell
electron --inspect=5858 dumneavoastră/aplicație
```

### `--inspect-brk=[port]`

Ca `--inspectt` dar pune capăt execuției pe prima linie a JavaScript.

## Depanatori externi

Va trebui să utilizați un depanator care acceptă protocolul de inspector V8.

- Conectați Chrome vizitând `chrome://inspectt` și selectând pentru a inspecta a lansat aplicația Electron prezentă acolo.
- [Debugging in VSCode](debugging-vscode.md)
