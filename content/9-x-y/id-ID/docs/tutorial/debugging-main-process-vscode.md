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

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Berikut adalah proyek pra-konfigurasi yang dapat Anda unduh dan langsung debug di VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
