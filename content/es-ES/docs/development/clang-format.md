# Clang-formato en código C++

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) es una herramienta para automáticamente formato de C / C + + / Objective-C del código, para que los desarrolladores no necesitan preocuparse por cuestiones de estilo durante revisiones de código.

Se recomienda formatear el cambiante código de C++ antes de abrir solicitudes de tirón, que ahorrarán usted y el tiempo de los revisores.

`clang-format` y `git-clang-format` via `npm instalación -g clang-format` se pueden instalar.

Para automáticamente formato de un archivo según el estilo de código de C++ de electrón, simplemente ejecute formato de`clang - i path/to/electron/file.cc`. Debería funcionar en Windows/Linux/macOS.

El flujo de trabajo para formatear el código modificado:

  1. Hacer cambios de códigos de repositorio electrónico.
  2. Ejecución `git añadir your_changed_file.cc`.
  3. `git-clang-format` y probablemente verá modificaciones en `your_changed_file.cc`, estas modificaciones se generan de `clang-format`.
  4. Ejecución `git añadir your_changed_file.cc` y cometer su cambio.
  5. Ahora la rama está lista para ser abierto como una solicitud de extracción.

Si desea dar formato el código cambiado en el último commit git (cabeza), puede ejecutar `git-clang-formato cabeza ~ 1`. Ver formato-clang-`git-h` para más detalles.

## Integración de editor

También puede integrar `clang-format` directamente en tus editores favoritos. Para más orientación sobre cómo configurar la integración del editor, consulte estas páginas:

- [Átomo](https://atom.io/packages/clang-format)
- [VIM & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)