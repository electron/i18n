# VSCode da ki Ana Sürecin Hata Ayıklaması

### VSCode içinde bir Electron projesi aç.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### Takip edilen ayarları uygulayarak `.vscode/launch.json` bir dosya ekle:

```json
{ 
"versiyon": "0.2.0",
"ayarlamalar": [
{
 "isim":Ana süreç hata ayıklama",
 "tip": "düğüm",
 "istek": "başlat"
 "cwd":${workspaceRoot}",
 "çalışmaZamanı": "${workspaceRoot}/node_modules/.bin/electron",
 "windows":{
  "çalışmaZamanı": "${workspaceRoot}/node_modules/.bin/electrın.cmd"
},
 "args" : ["."]
  }
 ]
}
```

### 3. Hata Ayıklama

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start