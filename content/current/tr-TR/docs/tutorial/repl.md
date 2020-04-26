# REPL

Read-Eval-Print-Loop (REPL) basit, etkileşimli bilgisayar programlama ortamı tek kullanıcı girdisi alır (örn. tek bir ifade), işler ve sonucu kullanıcıya döndürür.

`repl` modülü, aşağıdakileri kullanarak REPL uygulamasına erişilmesini sağlar:

* Yerel proje bağımlılığı olarak `electron` veya `electron-prebuilt` yüklendiği varsayılır:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Global olarak `electron` veya `electron-prebuilt` yüklendiği varsayılır:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Not:** `electron --interactive` Windows üzerinde kullanılabilir değildir.

Daha fazla bilgi  Node.js REPL dokümanlarında </ 0> bulunabilir.</p>
