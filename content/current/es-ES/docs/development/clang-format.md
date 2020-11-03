# Uso de clang-format en Código C++

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) es una herramienta para formatear automáticamente el código C/C++/Objective-C, de modo que los desarrolladores no tengan que preocuparse por los problemas de estilo durante las revisiones del código.

Se recomienda formatear su código C++ modificado antes de abrir solicitudes de extracción, lo que le ahorrará tiempo a usted y a los evaluadores.

Puede instalar `clang-format` y `git-clang-format` a través de `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

El flujo de trabajo para formatear su código modificado:

1. Haga cambios de códigos en el repositorio de Electron.
2. Ejecute `git add your_changed_file.cc`.
3. Ejecute `git-clang-format`, y probablemente verá modificaciones en `your_changed_file.cc`, estas modificaciones se generan a partir de `clang-format`.
4. Ejecute `git agregue su_archivo_registrado.cc` y confirme su cambio.
5. Ahora la rama está lista para abrirse como una solicitud de extracción.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Integración del Editor

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
