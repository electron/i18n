# Debuggen in VSCode

In diesem Handbuch erfahren Sie, wie Sie das VSCode-Debuggen sowohl für Ihr eigenes Electron-Projekt als auch für die native Electron-Codebasis einrichten.

## Debuggen Ihrer Electron-App

### Hauptprozess

#### 1. Öffnen Sie ein Electron Projekt in VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Fügen Sie eine Datei `.vscode/launch.json` mit der folgenden Konfiguration hinzu:

```json
{
  "version": "0.2. ",
  "configurations": [
    {
      "name": "Hauptprozess debug",
      "Typ": "Knoten",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/. in/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron. md"
      },
      "args" : [". ],
      "outputCapture": "std"
    }
  ]
}
```

#### 3. Debugging

Legen Sie einige Haltepunkte in `main.js`fest und starten Sie das Debugging in der [Debug View](https://code.visualstudio.com/docs/editor/debugging). Du solltest in der Lage sein, die Haltepunkte zu treffen.

Hier finden Sie ein vorkonfiguriertes Projekt, dass Sie herunterladen und direkt in VSCode debuggen können: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Debuggen der Electron-Codebasis

Wenn Sie Electron aus der Quelle erstellen und die native Electron-Codebase ändern möchten, hilft Ihnen dieser Abschnitt beim Testen Ihrer Änderungen.

Für diejenigen, die sich nicht sicher sind, wo dieser Code erworben werden soll oder wie er erstellt werden soll, automatisiert [Electron es Build Tools](https://github.com/electron/build-tools) den größten Teil dieses Prozesses und erklärt ihn. Wenn Sie die Umgebung manuell einrichten möchten, können Sie diese [Buildanweisungen](https://www.electronjs.org/docs/development/build-instructions-gn)verwenden.

### Windows (C++)

#### 1. Öffnen Sie ein Electron Projekt in VSCode.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. Fügen Sie eine Datei `.vscode/launch.json` mit der folgenden Konfiguration hinzu:

```json
-
  "version": "0.2.0",
  "Konfigurationen": [
    -
      "Name": "(Windows) Launch",
      "type": "cppvsdbg",
      "request": "launch",
      "program": "
      .exe${workspaceFolder}
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [
          "Name": "ELECTRON_ENABLE_LOGGING", "value": "true",,
          "Name": "ELECTRON_ENABLE_STACK_DUMPING", "value": "true" ,
          "Name": "ELECTRON_RUN_AS_NODE", "wert": ""
      ],
      "externalConsole": false,
      "sourceFileMap":
          "o:": "${workspaceFolder}",
      ,
    ,
  ]
.
```

**Konfigurationshinweise**

* `cppvsdbg` erfordert, dass die [integrierte C/C++-Erweiterung aktiviert werden](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) .
* `${workspaceFolder}` ist der vollständige Pfad zum `src` -Verzeichnis von Chromium.
* `your-executable-location` wird je nach einigen Punkten einer der folgenden sein:
  * `Testing`: Wenn Sie die Standardeinstellungen der build-Tools-</a> von

Electron oder die Standardanweisungen verwenden, wenn [erstellen aus Quell-](https://www.electronjs.org/docs/development/build-instructions-gn#building).</li> 
    
      * `Release`: Wenn Sie einen Release-Build anstelle eines Testing-Builds erstellt haben.
  * `your-directory-name`: Wenn Sie dies während des Buildprozesses von der Standardeinstellung aus geändert haben, ist dies das, was Sie angegeben haben.</ul></li> 

* Die `args` Arrayzeichenfolge `"your-electron-project-path"` sollte der absolute Pfad zum Verzeichnis oder zum `main.js` Datei des Electron-Projekts sein, das Sie zum Testen verwenden. In diesem Beispiel sollte es Ihr Weg zu `electron-quick-start`sein.</ul> 



#### 3. Debugging

Legen Sie einige Haltepunkte in den .cc-Dateien Ihrer Wahl im nativen Electron C++-Code fest, und beginnen Sie mit dem Debuggen im [Debugansicht](https://code.visualstudio.com/docs/editor/debugging).
