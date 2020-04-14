# Debugging Proses Utama di VSCode

### 1. Buka proyek Elektron di VSCode.

```sh
$ git clone git@github.com:electron / $ elektron-cepat-start.git kode elektron-cepat-start
```

### 2. Tambahkan file ` .vscode / launch.json </ 0> dengan konfigurasi berikut:</h3>

<pre><code class="json">{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
`</pre> 

### 3. Debugging

Tetapkan beberapa breakpoint di  main.js </ 0> , dan mulai debugging di <a href="https://code.visualstudio.com/docs/editor/debugging"> Debug View </ 1> . Anda harus bisa memukul breakpoints.</p>

<p>Berikut adalah proyek pra-konfigurasi yang dapat Anda unduh dan langsung debug di VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start</p>