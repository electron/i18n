# REPL

[ قراءة-تقييم-طباعة-حلقة ](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) (REPL) هي بيئة برمجة كمبيوتر تفاعلية بسيطة تتطلب مستخدمًا واحدًا المدخلات (أي التعبيرات الفردية) ، وتقييمها ، وإرجاع النتيجة إلى المستخدم.

## Proceso principal

Electron expone el módulo [Node.js `repl`](https://nodejs.org/dist/latest/docs/api/repl.html) a través de la bandera de CLI `--interactiva`. Assuming you have `electron` installed as a local project dependency, you should be able to access the REPL with the following command:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```

**Nota:** `electron --interactive` no está disponible para Windows (consulta [electron/electron#5776](https://github.com/electron/electron/pull/5776) para más detalles).

## Proceso de renderizado

You can use the DevTools Console tab to get a REPL for any renderer process. Para obtener más información, consulta la [documentación de Chrome](https://developer.chrome.com/docs/devtools/console/).
