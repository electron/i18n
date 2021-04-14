# Usando clang-format em Código C++

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) é uma ferramenta para aplica estilo de codificação em C/C++/Objective-C para que os desenvolvedores não precisem se preocuparem com questões desse tipo, durante as revisões de código.

É altamente recomendável para formatar o seu código alterado em C++, antes de abir uma solicitação de pull requests, que irão salvar você e o tempo de revisores.

Você pode instalar o `clang-format` e `git-clang-format` através do `npm install -g clang-format`.

Para formatar automaticamente um arquivo de acordo com o estilo de código Electron C++, execute `clang-format -i path/to/electron/file.cc`. Ele deve funcionar no macOS/Linux/Windows.

O fluxo de trabalho para formatar o seu código alterado:

1. Fazer alterações de código no repositório do Electron.
2. Use `git add your_changed_file.cc`.
3. Use `git-clang-format`, e você vai provavelmente ver uma notificação em `your_changed_file.cc`, essas modificações são geradas do `clang-format`.
4. Use `git add your_changed_file.cc`, e confirme a sua alteração.
5. Agora a branch está pronto para ser aberto em uma solicitação de pull request.

Se você quiser formatar o código alterado no seu último git commit (HEAD), você pode executar `git-clang-format HEAD~1`. Consulte `git-clang-format -h` para mais detalhes.

## Integração com Editor

Você também pode integrar `clang-format` diretamente em seus editores favoritos. Para obter mais orientações sobre como configurar a integração do editor, consulte essas páginas:

* [Atom](https://atom.io/packages/clang-format)
* [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
* [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
