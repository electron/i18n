# Debugging Proses Utama di VSCode

### 1. Buka proyek Elektron di VSCode.

```sh
$ git clone git@github.com:electron / $ elektron-cepat-start.git kode elektron-cepat-start
```

### 2. Tambahkan file ` .vscode / launch.json </ 0> dengan konfigurasi berikut:</h3>

<pre><code class="json">{"versi": "0.2.0", "konfigurasi": [{"nama": "Debug utama proses", "jenis": "node", "permintaan": "peluncuran", "cwd": "${workspaceRoot}", "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron", "windows": {"runtimeExec utable":"${workspaceRoot}/node_modules/.bin/electron.cmd"},"args": [". "]     }   ] }
`</pre> 

### 3. Debugging

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start