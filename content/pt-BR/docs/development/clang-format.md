# Usando clang-format em Código C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) é uma ferramenta para aplica estilo de codificação em C/C++/Objective-C para que os desenvolvedores não precisem se preocuparem com questões desse tipo, durante as revisões de código.

É altamente recomendável para formatar o seu código alterado em C++, antes de abir uma solicitação de pull requests, que irão salvar você e o tempo de revisores.

Você pode instalar o `clang-format` e `git-clang-format` através do `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

O fluxo de trabalho para formatar o seu código alterado:

1. Fazer alterações de código no repositório do Electron.
2. Use `git add your_changed_file.cc`.
3. Use `git-clang-format`, e você vai provavelmente ver uma notificação em `your_changed_file.cc`, essas modificações são geradas do `clang-format`.
4. Use `git add your_changed_file.cc`, e confirme a sua alteração.
5. Agora a branch está pronto para ser aberto em uma solicitação de pull request.

Se você deseja formatar o seu código alterado em seu mais recente git commit (HEAD), você pode usar `git-clang-format HEAD~1` Veja mais detalhes usando `git-clang-format -h`.

## Integração com Editor

Você também pode integrar `clang-format` diretamente em seus editores favoritos. Para outras orientações sobre como configurar em seus editor, consulte estas páginas:

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)