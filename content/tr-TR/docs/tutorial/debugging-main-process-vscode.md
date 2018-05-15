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

Bazı kesme noktaları ayarla `main.js`, ve hata ayıklamaya başla [Hata Ayıklama Görünümü](https://code.visualstudio.com/docs/editor/debugging) Kesme noktalarına tıklayabilirsiniz.

VsCode'da daha önceden yapılandırılmış indirilebilir ve hata ayıklanabilir bir proje: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start