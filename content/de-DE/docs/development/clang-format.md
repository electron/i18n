# clang-format im C++ Code verwenden

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) ist ein Tool, mit dem C/C+++/Objective-C-Code automatisch formatiert , sodass Entwickler sich bei Codeüberprüfungen keine Sorgen über Stilprobleme müssen.

Es wird dringend empfohlen, den geänderten C++-Code vor dem Öffnen von Pull- -Anforderungen zu formatieren, wodurch Sie und die Prüfer Zeit sparen.

Sie können `clang-format` und `git-clang-format` über `npm install -g clang-format`installieren.

Um eine Datei automatisch nach dem Electron C++-Codestil zu formatieren, führen Sie `clang-format -i path/to/electron/file.cc`aus. Es sollte auf macOS/Linux/Windows funktionieren.

Der Workflow zum Formatieren des geänderten Codes:

1. Nehmen Sie Codes im Electron-Repository vor.
2. Führen Sie `git add your_changed_file.cc`aus.
3. Führen Sie `git-clang-format`aus, und Sie werden wahrscheinlich Änderungen in `your_changed_file.cc`sehen, diese Änderungen werden aus `clang-format`generiert.
4. Führen Sie `git add your_changed_file.cc`aus, und übernehmen Sie Ihre Änderung.
5. Jetzt kann die Filiale als Pull-Anforderung geöffnet werden.

Wenn Sie den geänderten Code für Ihren letzten git Commit (HEAD) formatieren möchten, können Sie `git-clang-format HEAD~1`ausführen. Weitere Informationen finden Sie in `git-clang-format -h` .

## Editor Integration

Sie können `clang-format` auch direkt in Ihre Lieblings-Editoren integrieren. Weitere Anleitungen zum Einrichten der Editor-Integration finden Sie auf diesen Seiten:

* [Atom](https://atom.io/packages/clang-format)
* [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
* [Visual Studio-Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
