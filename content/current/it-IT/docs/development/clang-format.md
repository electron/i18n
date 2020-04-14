# Uso di clang-format nel codice C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) è uno strumento per formattare automaticamente il codice C/C++/Objective-C, così che gli sviluppatori non abbiano bisogno di preoccuparsi di problemi di stile durante le revisioni del codice.

Si raccomanda altamente di formattare il tuo codice modificato C++ prima di aprire le richieste di pull, che salveranno il tuo tempo e quello dei revisori.

Puoi installare `clang-format` e `git-clang-format` tramite `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Il flusso di lavoro per formattare il codice modificato:

1. Apporta modifiche ai codici nel repository Electron.
2. Esegui `git add your_changed_file.cc`.
3. Esegui `git-clang-format`, e probabilmente vorrai vedere le modifiche in `your_changed_file.cc`, queste modifiche sono generate da `clang-format`.
4. Esegui `git add your_changed_file.cc`, e conferma la tua modifica.
5. Ora il ramo è pronto per essere aperto come richiesta di pull.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Integrazione Editor

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Codice Visual Studio](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
